function spiralize(size) {
  const matrix = Array.from({length: size}, () =>
    Array.from({length: size}, () => Number((Math.floor(size + 1) / 2) % 2 === 1))
  );

  let spiral = 1;

  for (let i = 0; i < Math.floor(size / 2); i++) {
    for (let u = 0; u < size - i * 2; u++) {
      matrix[i][u + i] = spiral;
      matrix[u + i][i] = spiral;
      matrix[size - i - 1][u + i] = spiral;
      matrix[u + i][size - i - 1] = spiral;

      if (size % 4 === 0) {
        if (i !== Math.floor(size / 2) - 1) {
          matrix[i + 1][i] = 1 - spiral;
        }
      } else {
        matrix[i + 1][i] = 1 - spiral;
      }
    }
    spiral = 1 - spiral;
  }
  return matrix;
}
