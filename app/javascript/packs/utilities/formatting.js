export const readableDecimal = (float) => {
  return (Math.round(float * 100) / 100).toFixed(2);
};

export const readablePercent = (float) => {
  return float * 100;
};
