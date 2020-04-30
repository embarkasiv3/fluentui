import { pxToRem } from '../../../../utils';
import { CarouselItemStylesProps } from '../../../../components/Carousel/CarouselItem';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { CarouselVariables } from './carouselVariables';

const carouselItemStyles: ComponentSlotStylesPrepared<CarouselItemStylesProps, CarouselVariables> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    width: pxToRem(v.width),
    ':focus': {
      outline: 'none',
    },
  }),
};

export default carouselItemStyles;
