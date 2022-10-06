import { NativeModules } from 'react-native';
import type { Options, ResizeFormat, ResizeMode, Response } from './types';
export type { ResizeFormat, ResizeMode, Response } from './types';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const ImageResizer = isTurboModuleEnabled
  ? require('./NativeImageResizer').default
  : NativeModules.ImageResizer;

const defaultOptions: Options = {
  mode: 'contain',
  onlyScaleDown: false,
};

function createResizedImage(
  uri: string,
  width: number,
  height: number,
  format: ResizeFormat,
  quality: number,
  rotation?: number,
  outputPath?: string,
  keepMeta?: boolean,
  options: Options = defaultOptions
): Promise<Response> {
  const { mode, onlyScaleDown } = { ...defaultOptions, ...options };

  return ImageResizer.createResizedImage(
    uri,
    width,
    height,
    format,
    quality,
    mode,
    onlyScaleDown,
    rotation,
    outputPath,
    keepMeta
  );
}

export default {
  createResizedImage,
};
