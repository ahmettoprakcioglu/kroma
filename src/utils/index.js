import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import { 
  ACHROMATOPSIA, 
  DEUTERANOMALY, 
  DEUTERANOPIA, 
  PROTANOMALY, 
  PROTANOPIA, 
  TRITANOMALY, 
  TRITANOPIA,
  BLUE_CONE_MONOCHROMACY 
} from '../constants/buttons';
import toast from 'react-hot-toast';

// Prepare gamma look-up table used by Pilestone
const powGammaLookup = Array(256);
for (let i = 0; i < 256; i++) {
  powGammaLookup[i] = Math.pow(i / 255, 2.2);
}

// Color blindness parameters (Pilestone's original values)
const rBlind = {
  protan: {
    cpu: 0.735,
    cpv: 0.265,
    am: 1.273463,
    ayi: -0.073894
  },
  deutan: {
    cpu: 1.14,
    cpv: -0.14,
    am: 0.968437,
    ayi: 0.003331
  },
  tritan: {
    cpu: 0.171,
    cpv: -0.003,
    am: 0.062921,
    ayi: 0.292119
  }
};

/**
 * Inverse gamma correction (Pilestone's inversePow function)
 */
const inversePow = (a) => {
  return 255 * (a <= 0 ? 0 : a >= 1 ? 1 : Math.pow(a, 1 / 2.2));
};

/**
 * Pilestone's blindMK function - Brettel algorithm
 * Main algorithm for color blindness simulation
 */
const blindMK = (rgb, type) => {
  const d = 0.312713;
  const e = 0.329016;
  const f = 0.358271;
  
  const b = rgb[2]; // Blue
  const g = rgb[1]; // Green
  const r = rgb[0]; // Red
  
  // RGB with gamma correction
  const j = powGammaLookup[r];
  const k = powGammaLookup[g];
  const l = powGammaLookup[b];
  
  // RGB to LMS (Long-Medium-Short) conversion
  const m = 0.430574 * j + 0.34155 * k + 0.178325 * l;
  const n = 0.222015 * j + 0.706655 * k + 0.07133 * l;
  const o = 0.020183 * j + 0.129553 * k + 0.93918 * l;
  
  const p = m + n + o;
  let q = 0;
  let s = 0;
  
  if (p !== 0) {
    q = m / p;
    s = n / p;
  }
  
  const t = d * n / e;
  const u = f * n / e;
  let v = 0;
  
  let w;
  if (q < rBlind[type].cpu) {
    w = (rBlind[type].cpv - s) / (rBlind[type].cpu - q);
  } else {
    w = (s - rBlind[type].cpv) / (q - rBlind[type].cpu);
  }
  
  const x = s - q * w;
  const y = (rBlind[type].ayi - x) / (w - rBlind[type].am);
  const z = w * y + x;
  
  const A = y * n / z;
  const B = n;
  const C = (1 - (y + z)) * n / z;
  
  const D = 3.063218 * A - 1.393325 * B - 0.475802 * C;
  const E = -0.969243 * A + 1.875966 * B + 0.041555 * C;
  const F = 0.067871 * A - 0.228834 * B + 1.069251 * C;
  
  const G = t - A;
  const H = u - C;
  
  const dr = 3.063218 * G - 1.393325 * v - 0.475802 * H;
  const dg = -0.969243 * G + 1.875966 * v + 0.041555 * H;
  const db = 0.067871 * G - 0.228834 * v + 1.069251 * H;
  
  const mdr = dr ? ((D < 0 ? 0 : 1) - D) / dr : 0;
  const mdg = dg ? ((E < 0 ? 0 : 1) - E) / dg : 0;
  const mdb = db ? ((F < 0 ? 0 : 1) - F) / db : 0;
  
  const factor = Math.max(
    mdr > 1 || mdr < 0 ? 0 : mdr,
    mdg > 1 || mdg < 0 ? 0 : mdg,
    mdb > 1 || mdb < 0 ? 0 : mdb
  );
  
  // Calculate new color values
  const resD = D + factor * dr;
  const resE = E + factor * dg;
  const resF = F + factor * db;
  
  // Apply gamma correction to convert to 0-255 range
  return [
    inversePow(resD),
    inversePow(resE),
    inversePow(resF)
  ];
};

/**
 * Pilestone's anomylize function
 * For partial color blindness
 */
const anomylize = (normal, blind) => {
  const c = 1.75; // Anomaly coefficient
  const d = 1 * c + 1;
  
  return [
    (c * blind[0] + 1 * normal[0]) / d,
    (c * blind[1] + 1 * normal[1]) / d,
    (c * blind[2] + 1 * normal[2]) / d
  ];
};

/**
 * Monochrome function for complete colorless vision
 */
const monochrome = (rgb) => {
  const gray = Math.round(0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]);
  return [gray, gray, gray];
};

/**
 * Selects the appropriate function based on the filter type to be applied
 */
const getFilterFunction = (filter) => {
  switch (filter) {
  case PROTANOPIA:
    return (rgb) => blindMK(rgb, 'protan');
  case PROTANOMALY:
    return (rgb) => anomylize(rgb, blindMK(rgb, 'protan'));
  case DEUTERANOPIA:
    return (rgb) => blindMK(rgb, 'deutan');
  case DEUTERANOMALY:
    return (rgb) => anomylize(rgb, blindMK(rgb, 'deutan'));
  case TRITANOPIA:
    return (rgb) => blindMK(rgb, 'tritan');
  case TRITANOMALY:
    return (rgb) => anomylize(rgb, blindMK(rgb, 'tritan'));
  case ACHROMATOPSIA:
    return monochrome;
  case BLUE_CONE_MONOCHROMACY:
    // Using Pilestone's Achromatomaly matrix for Blue Cone Monochromacy
    // This matrix is found in Pilestone's own code
    return (rgb) => {
      // Pilestone's Achromatomaly matrix (from ColorMatrixMatrixes)
      const bcmMatrix = {
        R: [61.8, 32.0, 6.2],
        G: [16.3, 77.5, 6.2],
        B: [16.3, 32.0, 51.6]
      };
      
      // Get RGB values
      const r = rgb[0];
      const g = rgb[1];
      const b = rgb[2];
      
      // Apply Pilestone's matrix multiplication (from matrixFunction method)
      return [
        r * bcmMatrix.R[0] / 100 + g * bcmMatrix.R[1] / 100 + b * bcmMatrix.R[2] / 100,
        r * bcmMatrix.G[0] / 100 + g * bcmMatrix.G[1] / 100 + b * bcmMatrix.G[2] / 100,
        r * bcmMatrix.B[0] / 100 + g * bcmMatrix.B[1] / 100 + b * bcmMatrix.B[2] / 100
      ];
    };
  default:
    // In default case, return colors unchanged
    return (rgb) => rgb;
  }
};

/**
 * Applies the specified filter to the canvas.
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D context
 * @param {string} filter - Filter name to be applied
 */
export const applyFilterToCtx = async (ctx, filter) => {
  if (!ctx) {
    console.error('Invalid canvas context');
    return;
  }
  
  if (filter === 'Default') {
    // Restore canvas to its original state for the default filter
    try {
      const img = new Image();
      img.src = ctx.canvas.toDataURL();
      
      await new Promise((resolve, reject) => {
        img.onload = () => {
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          ctx.drawImage(img, 0, 0);
          resolve();
        };
        img.onerror = err => {
          console.error('Failed to load default image', err);
          reject(err);
        };
      });
    } catch (error) {
      console.error('Error while applying default filter:', error);
    }
    return;
  }
  
  try {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const data = imageData.data;
    
    // Select the filter function
    const filterFunction = getFilterFunction(filter);
    
    // Apply filter to each pixel
    for (let i = 0; i < data.length; i += 4) {
      // Get original RGB values
      const rgb = [data[i], data[i + 1], data[i + 2]];
      
      // Apply the filter function
      const [r, g, b] = filterFunction(rgb);
      
      // Limit and assign the new color values
      data[i] = Math.max(0, Math.min(255, Math.round(r)));
      data[i + 1] = Math.max(0, Math.min(255, Math.round(g)));
      data[i + 2] = Math.max(0, Math.min(255, Math.round(b)));
      // Alpha channel remains unchanged
    }
    
    // Write changes to canvas
    ctx.putImageData(imageData, 0, 0);
  } catch (error) {
    console.error('Error while applying filter:', error);
  }
};

/**
 * Downloads all images with all filters applied as a ZIP.
 */
export const downloadAll = async (originalImage, setIsLoading) => {
  setIsLoading(true);
  const zip = new JSZip();
  
  // Use fixed filter values
  const colorBlindnessFilters = [
    PROTANOMALY, 
    DEUTERANOMALY, 
    TRITANOMALY, 
    PROTANOPIA, 
    DEUTERANOPIA, 
    TRITANOPIA, 
    ACHROMATOPSIA, 
    BLUE_CONE_MONOCHROMACY
  ];

  for (const filter of colorBlindnessFilters) {
    try {
      const canvasCopy = document.createElement('canvas');
      const ctxCopy = canvasCopy.getContext('2d');

      const img = new Image();
      img.src = originalImage;

      await new Promise((resolve) => {
        img.onload = async () => {
          canvasCopy.width = img.width;
          canvasCopy.height = img.height;
          ctxCopy.drawImage(img, 0, 0, img.width, img.height);

          await applyFilterToCtx(ctxCopy, filter);

          const dataUrl = canvasCopy.toDataURL();
          const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
          zip.file(`filteredImage_${filter}.png`, base64Data, { base64: true });

          resolve();
        };
        img.onerror = () => {
          console.error(`Failed to load image: ${filter}`);
          resolve(); // Continue despite error
        };
      });
    } catch (error) {
      console.error(`Error while applying filter: ${filter}`, error);
    }
  }

  try {
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'kromaFilteredImages.zip');
    toast.success('All filtered images have been downloaded successfully.');
  } catch (error) {
    console.error('Error creating ZIP file:', error);
    toast.error('Error generating ZIP file.');
  } finally {
    setIsLoading(false);
  }
};
