function generateNewBarcodeData(int, options) {
  let { color, min, max } = options;
  min = Math.ceil(min);
  max = Math.floor(max);
  let data = [];
  for (let i = 0, len = int; i < len; i++) {
    data.push({
      width: Math.floor(Math.random() * (max - min) + min),
      color: color
    });
  }
  return data;
}

export default generateNewBarcodeData;
