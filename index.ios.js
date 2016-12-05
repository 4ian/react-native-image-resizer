import {
  NativeModules,
} from 'react-native';

export default {
  createResizedImage: (path, width, height, format, quality, rotation = 0, outputPath) => {
    if (format !== 'JPEG' && format !== 'PNG') {
      throw new Error('Only JPEG and PNG format are supported by createResizedImage');
    }

    return new Promise((resolve, reject) => {
      NativeModules.ImageResizer.createResizedImage(path, width, height, format, quality, rotation, outputPath, (err, resizedPath) => {
        if (err) {
          return reject(err);
        }

        resolve(resizedPath);
      });
    });
  },
  createCompressedImage: (path, quality, outputPath) => {

    return new Promise((resolve, reject) => {
      NativeModules.ImageResizer.createCompressedImage(path, quality, outputPath, (err, compressedPath) => {
        if (err) {
          return reject(err);
        }

        resolve(compressedPath);
      });
    });
  },
};
