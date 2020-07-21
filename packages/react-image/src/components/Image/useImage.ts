import { ComposePreparedOptions } from '@fluentui/react-compose';
import { getStyleFromPropsAndOptions } from '@fluentui/react-theme-provider';
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore Typings require esModuleInterop
import objectFitImages from 'object-fit-images';
/* eslint-enable @typescript-eslint/ban-ts-comment */
import * as React from 'react';

import { ImageProps, ImageState } from './Image.types';

const isFitSupported = (function() {
  const testImg = new Image();

  return 'object-fit' in testImg.style && 'object-position' in testImg.style;
})();

/**
 * The useImage hook processes the Image component props and returns state.
 */
export const useImage = (
  props: ImageProps,
  ref: React.Ref<HTMLElement>,
  options: ComposePreparedOptions,
): ImageState => {
  const imageRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (!isFitSupported) {
      objectFitImages(imageRef.current);
    }
  }, []);

  return {
    ...props,
    imageRef,
    style: getStyleFromPropsAndOptions(props, options, '--image'),
  };
};
