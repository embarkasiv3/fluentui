/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { IIconProps, IconType, IIconStyleProps, IIconStyles } from './Icon.types';
import { Image } from '../Image/Image';
import { ImageLoadState } from '../Image/Image.types';
import {
  getNativeProps,
  htmlElementProperties,
  BaseComponent,
  classNamesFunction
} from '../../Utilities';
import { getIcon } from '../../Styling';

export interface IIconState {
  imageLoadError: boolean;
}

const getClassNames = classNamesFunction<IIconStyleProps, IIconStyles>();

export class IconBase extends BaseComponent<IIconProps, IIconState> {
  constructor(props: IIconProps) {
    super(props);
    this.state = {
      imageLoadError: false,
    };
  }

  public render() {
    const {
      ariaLabel,
      className,
      getStyles,
      iconName,
      imageErrorAs,
    } = this.props;
    const isPlaceholder = typeof iconName === 'string' && iconName.length === 0;
    const isImage = this.props.iconType === IconType.image || this.props.iconType === IconType.Image;
    const { iconClassName, children } = this._getIconContent(iconName);

    const classNames = getClassNames(getStyles, { className, isPlaceholder, isImage, iconClassName });

    const containerProps = ariaLabel ? { 'aria-label': ariaLabel, 'data-icon-name': iconName, } : {
      role: 'presentation',
      'aria-hidden': true,
      'data-icon-name': iconName,
    };

    if (this.props.iconType === IconType.image || this.props.iconType === IconType.Image) {

      const { imageLoadError } = this.state;
      const imageProps = { ...this.props.imageProps, onLoadingStateChange: this.onImageLoadingStateChange };
      const ImageType = imageLoadError && imageErrorAs || Image;
      return (
        <div
          { ...containerProps }
          className={ classNames.root }
        >
          <ImageType { ...imageProps } />
        </div>
      );
    } else {
      return (
        <i
          { ...containerProps }
          { ...getNativeProps(this.props, htmlElementProperties, ['name', 'iconName']) }
          className={ classNames.root }
        >
          { children }
        </i>
      );
    }
  }

  private onImageLoadingStateChange = (state: ImageLoadState): void => {
    if (this.props.imageProps && this.props.imageProps.onLoadingStateChange) {
      this.props.imageProps.onLoadingStateChange(state);
    }
    if (state === ImageLoadState.error) {
      this.setState({ imageLoadError: true });
    }
  }

  private _getIconContent(name?: string) {
    const iconDefinition = getIcon(name) || {
      subset: {
        className: undefined
      },
      code: undefined
    };

    return {
      children: iconDefinition.code,
      iconClassName: iconDefinition.subset.className
    };
  }
}
