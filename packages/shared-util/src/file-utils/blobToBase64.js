
// @ts-nocheck
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject('Expected result to be a string');
      }
    };

    reader.onerror = (e) => reject("FileReader error: " + e);

    reader.readAsDataURL(blob);
  });
}

export default blobToBase64;
