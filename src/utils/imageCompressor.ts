import imageCompressor from "browser-image-compression";

const imgSize = (file: File) => {
  return file.size / 1024 / 1024;
};

export const compressImage = (
  image: File,
  maxSizeInMB: number
): Promise<Blob> => {
  return new Promise(async (resolve, reject) => {
    if (imgSize(image) <= maxSizeInMB) return resolve(image);
    const options = {
      maxSizeMB: maxSizeInMB,
    };
    try {
      resolve(await imageCompressor(image, options));
    } catch (error) {
      reject(new Error("Image compression Failed! " + error));
    }
  });
};
