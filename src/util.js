export const arrayChunk = (arr, size) => {

  const temporal = [];

  for (let i = 0; i < arr.length; i += size) {
    temporal.push(arr.slice(i, i + size));
  }

  return temporal;
};
