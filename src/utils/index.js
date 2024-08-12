import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import { ACHROMATOMALY, ACHROMATOPSIA, BUTTONS, DEUTERANOMALY, DEUTERANOPIA, PROTANOMALY, PROTANOPIA, TRITANOMALY, TRITANOPIA } from '../constants/buttons';
import toast from 'react-hot-toast';

const applyMatrix = (ctx, matrix) => {
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];

    data[i] = Math.min(255, Math.max(0, red * matrix[0] + green * matrix[1] + blue * matrix[2]));
    data[i + 1] = Math.min(255, Math.max(0, red * matrix[3] + green * matrix[4] + blue * matrix[5]));
    data[i + 2] = Math.min(255, Math.max(0, red * matrix[6] + green * matrix[7] + blue * matrix[8]));
  }

  ctx.putImageData(imageData, 0, 0);
};

export const applyFilterToCtx = async (ctx, filter) => {
  if (filter === 'Default') {
    const matrix = [1,0,0,0,1,0,0,0,1];
    applyMatrix(ctx, matrix);
  } else if (filter === ACHROMATOMALY) {
    const matrix = [0.618, 0.320, 0.062, 0.163, 0.775, 0.062, 0.163, 0.320, 0.516];
    applyMatrix(ctx, matrix);
  } else if (filter === ACHROMATOPSIA) {
    const matrix = [0.299, 0.587, 0.114, 0.299, 0.587, 0.114, 0.299, 0.587,0.114];
    applyMatrix(ctx, matrix);
  } else if (filter === TRITANOMALY) {
    const matrix = [0.967, 0.033, 0.000, 0.000, 0.733, 0.267, 0.000, 0.183, 0.817];
    applyMatrix(ctx, matrix);
  } else if (filter === TRITANOPIA) {
    const matrix = [0.950, 0.050, 0.000, 0.000, 0.433, 0.567, 0.000, 0.475, 0.525];
    applyMatrix(ctx, matrix);
  } else if (filter === DEUTERANOMALY) {
    const matrix = [0.800, 0.200, 0.000, 0.258, 0.742, 0.000, 0.000, 0.142, 0.858];
    applyMatrix(ctx, matrix);
  } else if (filter === PROTANOMALY) {
    const matrix = [0.817, 0.183, 0.000, 0.333, 0.667, 0.000, 0.000, 0.125, 0.875];
    applyMatrix(ctx, matrix);
  } else if (filter === PROTANOPIA) {
    const matrix = [0.567, 0.433, 0.000, 0.558, 0.442, 0.000, 0.000, 0.242, 0.758];    
    applyMatrix(ctx, matrix);
  } else if (filter === DEUTERANOPIA) {
    const matrix = [0.625, 0.375, 0.000, 0.700, 0.300, 0.000, 0.000, 0.300, 0.700];
    applyMatrix(ctx, matrix);
  }
};

export const downloadAll = async (originalImage, setIsLoading) => {
  setIsLoading(true);
  const zip = new JSZip();
  const colorBlindness = BUTTONS.map(({ text }) => text);

  for (const element of colorBlindness) {
    const canvasCopy = document.createElement('canvas');
    const ctxCopy = canvasCopy.getContext('2d');

    const img = new Image();
    img.src = originalImage;

    await new Promise((resolve) => {
      img.onload = async () => {
        canvasCopy.width = img.width;
        canvasCopy.height = img.height;
        ctxCopy.drawImage(img, 0, 0, img.width, img.height);

        await applyFilterToCtx(ctxCopy, element);

        const dataUrl = canvasCopy.toDataURL();
        const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
        zip.file(`filteredImage_${element}.png`, base64Data, { base64: true });

        resolve();
      };
    });
  }

  zip.generateAsync({ type: 'blob' }).then((content) => {
    saveAs(content, 'kromaFilteredImages.zip');
    setIsLoading(false);
    toast.success('All filtered images have been downloaded successfully.');
  });
};
