import { ACHROMATOPSIA, DEUTERANOMALY, DEUTERANOPIA, MONOCHROMACY, PROTANOMALY, PROTANOPIA, TRITANOMALY, TRITANOPIA } from '../constants/buttons';

const applyMatrix = (ctx, matrix) => {
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];

    data[i] = red * matrix[0] + green * matrix[1] + blue * matrix[2] + matrix[4];
    data[i + 1] = red * matrix[5] + green * matrix[6] + blue * matrix[7] + matrix[9];
    data[i + 2] = red * matrix[10] + green * matrix[11] + blue * matrix[12] + matrix[14];
  }

  ctx.putImageData(imageData, 0, 0);
};

export const applyFilterToCtx = async (ctx, filter) => {
  if (filter === 'default') {
    const matrix = [
      1, 0, 0, 0, 0,
      0, 1, 0, 0, 0,
      0, 0, 1, 0, 0,
      0, 0, 0, 1, 0
    ];
    applyMatrix(ctx, matrix);
  } else if (filter === MONOCHROMACY) {
    const matrix = [
      0.299, 0.587, 0.114, 0, 0,
      0.299, 0.587, 0.114, 0, 0,
      0.299, 0.587, 0.114, 0, 0,
      0, 0, 0, 1, 0
    ];
    applyMatrix(ctx, matrix);
  } else if (filter === ACHROMATOPSIA) {
    const matrix = [
      0.299, 0.587, 0.114, 0,
      0.299, 0.587, 0.114, 0,
      0.299, 0.587, 0.114, 0,
      0, 0, 0, 1,
    ];
    applyMatrix(ctx, matrix);
  } else if (filter === TRITANOMALY) {
    const matrix = [
      0.967, 0.033, 0, 0, 0,
      0, 0.733, 0.267, 0, 0,
      0, 0.183, 0.817, 0, 0,
      0, 0, 0, 1, 0,
    ];
    applyMatrix(ctx, matrix);
  } else if (filter === TRITANOPIA) {
    const matrix = [
      0.95, 0.05, 0, 0, 0,
      0, 0.433, 0.567, 0, 0,
      0, 0.475, 0.525, 0, 0,
      0, 0, 0, 1, 0,
    ];
    applyMatrix(ctx, matrix);
  } else if (filter === DEUTERANOMALY) {
    const matrix = [
      0.8, 0.2, 0, 0, 0,
      0.258, 0.742, 0, 0, 0,
      0, 0.142, 0.858, 0, 0,
      0, 0, 0, 1, 0,
    ];
    applyMatrix(ctx, matrix);
  } else if (filter === PROTANOMALY) {
    const matrix = [
      0.817, 0.183, 0, 0, 0,
      0.333, 0.667, 0, 0, 0,
      0, 0.125, 0.875, 0, 0,
      0, 0, 0, 1, 0,
    ];
    applyMatrix(ctx, matrix);
  } else if (filter === PROTANOPIA) {
    const matrix = [
      0.567, 0.433, 0, 0, 0,
      0.558, 0.442, 0, 0, 0,
      0, 0.242, 0.758, 0, 0,
      0, 0, 0, 1, 0
    ];
    applyMatrix(ctx, matrix);
  } else if (filter === DEUTERANOPIA) {
    const matrix = [
      0.625, 0.375, 0, 0, 0,
      0.7, 0.3, 0, 0, 0,
      0, 0.3, 0.7, 0, 0,
      0, 0, 0, 1, 0
    ];
    applyMatrix(ctx, matrix);
  }
};
