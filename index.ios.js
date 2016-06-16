import {
  NativeModules,
} from 'react-native';

export default {
  createResizedImage: (path, outputPath, width, height, format, quality) => {
    if (format !== 'JPEG') {
      throw new Error('Only JPEG format is supported by createResizedImage');
    }

    return new Promise((resolve, reject) => {
      NativeModules.ImageResizer.createResizedImage(path, outputPath, width, height, quality, (err, resizedPath) => {
        if (err) {
          return reject(err);
        }

        resolve(resizedPath);
      });
    });
  },
};
