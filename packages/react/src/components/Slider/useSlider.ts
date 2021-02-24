import * as React from 'react';
import { ISliderProps, ISliderStyleProps, ISliderStyles } from './Slider.types';
import { useId, useBoolean, useControllableValue } from '@fluentui/react-hooks';
import {
  KeyCodes,
  css,
  getRTL,
  getRTLSafeKeyCode,
  on,
  classNamesFunction,
  getNativeProps,
  divProperties,
} from '@fluentui/utilities';

export const ONKEYDOWN_TIMEOUT_DURATION = 1000;

const getClassNames = classNamesFunction<ISliderStyleProps, ISliderStyles>();

type Dimension = 'height' | 'width';
type Position = 'bottom' | 'left' | 'right';
type PositionOrDimension = Dimension | Position;

const getSlotStyleFn = (sty: PositionOrDimension) => {
  return (value: number) => {
    return {
      [sty]: `${value}%`,
    };
  };
};
const getPositionStyleFn = (vertical: boolean = false, rtl: boolean = false) => {
  if (vertical) {
    return getSlotStyleFn('bottom');
  }
  return getSlotStyleFn(rtl ? 'right' : 'left');
};

const getPercent = (value: number, sliderMin: number, sliderMax: number) => {
  return sliderMax === sliderMin ? 0 : ((value! - sliderMin!) / (sliderMax! - sliderMin!)) * 100;
};

const getLineSectionStylesFn = (vertical: boolean = false) => {
  const lengthString = vertical ? 'height' : 'width';
  return getSlotStyleFn(lengthString);
};

const useComponentRef = (
  props: ISliderProps,
  thumb: React.RefObject<HTMLSpanElement>,
  value: number | undefined,
  range?: [number, number],
) => {
  React.useImperativeHandle(
    props.componentRef,
    () => ({
      get value() {
        return value;
      },
      get range() {
        return props.ranged ? range : undefined;
      },
      focus() {
        if (thumb.current) {
          thumb.current.focus();
        }
      },
    }),
    [thumb, value, props.ranged, range],
  );
};

export const useSlider = (props: ISliderProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    step = 1,
    className,
    disabled = false,
    label,
    max = 10,
    min = 0,
    showValue = true,
    buttonProps = {},
    vertical = false,
    valueFormat,
    styles,
    theme,
    originFromZero,
    'aria-label': ariaLabel,
    ranged,
  } = props;

  const disposables = React.useRef<(() => void)[]>([]);
  const sliderLine = React.useRef<HTMLDivElement>(null);

  const [unclampedValue, setValue] = useControllableValue(
    props.value,
    props.defaultValue,
    (ev: React.FormEvent<HTMLElement> | undefined, v: ISliderProps['value']) =>
      props.onChange?.(v!, ranged ? [lowerValue, v!] : undefined),
  );
  const [unclampedLowerValue, setLowerValue] = useControllableValue(
    props.lowerValue,
    props.defaultLowerValue,
    (ev: React.FormEvent<HTMLElement> | undefined, lv: ISliderProps['lowerValue']) =>
      props.onChange?.(value, [lv!, value]),
  );

  const isAdjustingLowerValueRef = React.useRef<boolean>(false);

  // Ensure that value is always a number and is clamped by min/max.
  const value = Math.max(min, Math.min(max, unclampedValue || 0));
  const lowerValue = Math.max(min, Math.min(value, unclampedLowerValue || 0));

  const id = useId('Slider');
  const [useShowTransitions, { toggle: toggleUseShowTransitions }] = useBoolean(true);
  const classNames = getClassNames(styles, {
    className,
    disabled,
    vertical,
    showTransitions: useShowTransitions,
    showValue,
    ranged,
    theme: theme!,
  });

  const [timerId, setTimerId] = React.useState(0);
  const steps: number = (max! - min!) / step!;

  const clearOnKeyDownTimer = (): void => {
    clearTimeout(timerId);
  };

  const setOnKeyDownTimer = (event: KeyboardEvent) => {
    clearOnKeyDownTimer();
    setTimerId(
      setTimeout(() => {
        if (props.onChanged) {
          props.onChanged(event, value as number);
        }
      }, ONKEYDOWN_TIMEOUT_DURATION) as any,
    );
  };

  const getAriaValueText = (valueProps: number | undefined): string | undefined => {
    const { ariaValueText } = props;
    if (valueProps !== undefined) {
      return ariaValueText ? ariaValueText(valueProps) : valueProps.toString();
    }
    return undefined;
  };

  const updateValue = (valueProp: number, renderedValueProp: number): void => {
    const { snapToStep } = props;
    let numDec = 0;
    if (isFinite(step!)) {
      while (Math.round(step! * Math.pow(10, numDec)) / Math.pow(10, numDec) !== step!) {
        numDec++;
      }
    }
    // Make sure value has correct number of decimal places based on number of decimals in step
    const roundedValue = parseFloat(valueProp.toFixed(numDec));

    if (snapToStep) {
      renderedValueProp = roundedValue;
    }

    if (ranged) {
      // decided which thumb value to change
      if (isAdjustingLowerValueRef.current && (originFromZero ? roundedValue <= 0 : roundedValue <= value)) {
        setLowerValue(roundedValue);
      } else if (
        !isAdjustingLowerValueRef.current &&
        (originFromZero ? roundedValue >= 0 : roundedValue >= lowerValue)
      ) {
        setValue(roundedValue);
      }
    } else {
      setValue(roundedValue);
    }
  };

  const onKeyDown = (event: KeyboardEvent): void => {
    let newCurrentValue: number | undefined = isAdjustingLowerValueRef.current ? lowerValue : value;
    let diff: number | undefined = 0;
    // eslint-disable-next-line deprecation/deprecation
    switch (event.which) {
      case getRTLSafeKeyCode(KeyCodes.left, props.theme):
      case KeyCodes.down:
        diff = -(step as number);
        clearOnKeyDownTimer();
        setOnKeyDownTimer(event);
        break;
      case getRTLSafeKeyCode(KeyCodes.right, props.theme):
      case KeyCodes.up:
        diff = step;
        clearOnKeyDownTimer();
        setOnKeyDownTimer(event);
        break;
      case KeyCodes.home:
        newCurrentValue = min;
        break;
      case KeyCodes.end:
        newCurrentValue = max;
        break;
      default:
        return;
    }
    const newValue: number = Math.min(max as number, Math.max(min as number, newCurrentValue! + diff!));
    updateValue(newValue, newValue);
    event.preventDefault();
    event.stopPropagation();
  };

  const getPosition = (event: MouseEvent | TouchEvent, verticalProp: boolean | undefined): number | undefined => {
    let currentPosition: number | undefined;
    switch (event.type) {
      case 'mousedown':
      case 'mousemove':
        currentPosition = !verticalProp ? (event as MouseEvent).clientX : (event as MouseEvent).clientY;
        break;
      case 'touchstart':
      case 'touchmove':
        currentPosition = !verticalProp
          ? (event as TouchEvent).touches[0].clientX
          : (event as TouchEvent).touches[0].clientY;
        break;
    }
    return currentPosition;
  };

  const calculateCurrentSteps = (event: MouseEvent | TouchEvent) => {
    if (!sliderLine.current) {
      return;
    }
    const sliderPositionRect: ClientRect = sliderLine.current.getBoundingClientRect();
    const sliderLength: number = !props.vertical ? sliderPositionRect.width : sliderPositionRect.height;
    const stepLength: number = sliderLength / steps;
    let currentSteps: number | undefined;
    let distance: number | undefined;
    if (!props.vertical) {
      const left: number | undefined = getPosition(event, props.vertical);
      distance = getRTL(props.theme) ? sliderPositionRect.right - left! : left! - sliderPositionRect.left;
      currentSteps = distance / stepLength;
    } else {
      const bottom: number | undefined = getPosition(event, props.vertical);
      distance = sliderPositionRect.bottom - bottom!;
      currentSteps = distance / stepLength;
    }
    return currentSteps;
  };

  const onMouseMoveOrTouchMove = (event: MouseEvent | TouchEvent, suppressEventCancelation?: boolean): void => {
    const currentSteps = calculateCurrentSteps(event);
    let newCurrentValue: number | undefined;
    let newRenderedValue: number | undefined;
    // The value shouldn't be bigger than max or be smaller than min.
    if (currentSteps! > Math.floor(steps)) {
      newRenderedValue = newCurrentValue = max as number;
    } else if (currentSteps! < 0) {
      newRenderedValue = newCurrentValue = min as number;
    } else {
      newRenderedValue = min! + step! * currentSteps!;
      newCurrentValue = min! + step! * Math.round(currentSteps!);
    }
    updateValue(newCurrentValue, newRenderedValue);
    if (!suppressEventCancelation) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const onMouseDownOrTouchStart = (event: MouseEvent | TouchEvent): void => {
    if (ranged) {
      const currentSteps = calculateCurrentSteps(event);
      const newRenderedValue = min! + step! * currentSteps!;

      if (newRenderedValue <= lowerValue || newRenderedValue - lowerValue <= value - newRenderedValue) {
        isAdjustingLowerValueRef.current = true;
      } else {
        isAdjustingLowerValueRef.current = false;
      }
    }

    if (event.type === 'mousedown') {
      disposables.current.push(
        on(window, 'mousemove', onMouseMoveOrTouchMove as (ev: Event) => void, true),
        on(window, 'mouseup', onMouseUpOrTouchEnd as (ev: Event) => void, true),
      );
    } else if (event.type === 'touchstart') {
      disposables.current.push(
        on(window, 'touchmove', onMouseMoveOrTouchMove as (ev: Event) => void, true),
        on(window, 'touchend', onMouseUpOrTouchEnd as (ev: Event) => void, true),
      );
    }
    toggleUseShowTransitions();
    onMouseMoveOrTouchMove(event, true);
  };

  const onMouseUpOrTouchEnd = (event: MouseEvent | TouchEvent): void => {
    if (props.onChanged) {
      props.onChanged(event, value as number);
    }
    toggleUseShowTransitions();
    disposeListeners();
  };

  const onThumbFocus = (event: MouseEvent | TouchEvent): void => {
    isAdjustingLowerValueRef.current = event.target === lowerValueThumbRef.current;
  };

  const disposeListeners = (): void => {
    disposables.current.forEach(dispose => dispose());
    disposables.current = [];
  };

  const onMouseDownProp: {} = disabled ? {} : { onMouseDown: onMouseDownOrTouchStart };
  const onTouchStartProp: {} = disabled ? {} : { onTouchStart: onMouseDownOrTouchStart };
  const onKeyDownProp: {} = disabled ? {} : { onKeyDown: onKeyDown };
  const onFocusProp: {} = disabled ? {} : { onFocus: onThumbFocus };

  const lowerValueThumbRef = React.useRef<HTMLSpanElement>(null);
  const thumbRef = React.useRef<HTMLSpanElement>(null);
  useComponentRef(props, ranged && !vertical ? lowerValueThumbRef : thumbRef, value, [lowerValue, value]);
  const getPositionStyles = getPositionStyleFn(vertical, getRTL(props.theme));
  const getTrackStyles = getLineSectionStylesFn(vertical);
  const originValue = originFromZero ? 0 : min;
  const valuePercent = getPercent(value, min, max);
  const lowerValuePercent = getPercent(lowerValue, min, max);
  const originPercentOfLine = getPercent(originValue, min, max);
  const activeSectionWidth = ranged ? valuePercent - lowerValuePercent : Math.abs(originPercentOfLine - valuePercent);
  const topSectionWidth = Math.min(100 - valuePercent, 100 - originPercentOfLine);
  const bottomSectionWidth = ranged ? lowerValuePercent : Math.min(valuePercent, originPercentOfLine);

  const rootProps = {
    className: classNames.root,
    ref: ref,
  };

  const divButtonProps = buttonProps
    ? getNativeProps<React.HTMLAttributes<HTMLDivElement>>(buttonProps, divProperties)
    : undefined;

  const labelProps = {
    className: classNames.titleLabel,
    children: label,
    disabled,
    htmlFor: ariaLabel ? undefined : id,
  };

  const valueLabelProps = showValue && {
    className: classNames.valueLabel,
    children: valueFormat ? valueFormat(value!) : value,
    disabled,
  };

  const lowerValueLabelProps = ranged &&
    showValue && {
      className: classNames.valueLabel,
      children: valueFormat ? valueFormat(lowerValue!) : lowerValue,
      disabled,
    };

  const zeroTickProps = originFromZero && {
    className: classNames.zeroTick,
    style: getPositionStyles(originPercentOfLine),
  };

  const trackActiveProps = {
    className: css(classNames.lineContainer, classNames.activeSection),
    style: getTrackStyles(activeSectionWidth),
  };

  const trackTopInactiveProps = {
    className: css(classNames.lineContainer, classNames.inactiveSection),
    style: getTrackStyles(topSectionWidth),
  };

  const trackBottomInactiveProps = {
    className: css(classNames.lineContainer, classNames.inactiveSection),
    style: getTrackStyles(bottomSectionWidth),
  };

  const eventProps = {
    ...onMouseDownProp,
    ...onTouchStartProp,
    ...onKeyDownProp,
    ...divButtonProps,
  };

  const sliderProps = {
    'aria-disabled': disabled,
    role: 'slider',
    tabIndex: disabled ? undefined : 0,
    'data-is-focusable': !disabled,
  };

  const sliderBoxProps = {
    id,
    className: css(classNames.slideBox, buttonProps!.className),
    ...eventProps,
    ...(!ranged && {
      ...sliderProps,
      'aria-valuemin': min,
      'aria-valuemax': max,
      'aria-valuenow': value,
      'aria-valuetext': getAriaValueText(value),
      'aria-label': ariaLabel || label,
    }),
  };

  const thumbProps = {
    ref: thumbRef,
    className: classNames.thumb,
    style: getPositionStyles(valuePercent),
    ...(ranged && {
      ...sliderProps,
      ...eventProps,
      ...onFocusProp,
      id: `max-${id}`,
      'aria-valuemin': lowerValue,
      'aria-valuemax': max,
      'aria-valuenow': value,
      'aria-valuetext': getAriaValueText(value),
      'aria-label': `max ${ariaLabel || label}`,
    }),
  };

  const lowerValueThumbProps = ranged
    ? {
        ref: lowerValueThumbRef,
        className: classNames.thumb,
        style: getPositionStyles(lowerValuePercent),
        ...sliderProps,
        ...eventProps,
        ...onFocusProp,
        id: `min-${id}`,
        'aria-valuemin': min,
        'aria-valuemax': value,
        'aria-valuenow': lowerValue,
        'aria-valuetext': getAriaValueText(lowerValue),
        'aria-label': `min ${ariaLabel || label}`,
      }
    : undefined;

  const containerProps = {
    className: classNames.container,
  };
  const sliderLineProps = {
    ref: sliderLine,
    className: classNames.line,
  };

  return {
    root: rootProps,
    label: labelProps,
    sliderBox: sliderBoxProps,
    container: containerProps,
    valueLabel: valueLabelProps,
    lowerValueLabel: lowerValueLabelProps,
    thumb: thumbProps,
    lowerValueThumb: lowerValueThumbProps,
    zeroTick: zeroTickProps,
    activeTrack: trackActiveProps,
    topInactiveTrack: trackTopInactiveProps,
    bottomInactiveTrack: trackBottomInactiveProps,
    sliderLine: sliderLineProps,
  };
};
