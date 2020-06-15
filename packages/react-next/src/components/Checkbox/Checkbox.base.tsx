import * as React from 'react';
import { compose, mergeProps } from '@fluentui/react-compose';
import { mergeAriaAttributeValues } from '../../Utilities';
import { ICheckboxProps, ICheckboxSlots, ICheckboxState, ICheckboxSlotProps } from './Checkbox.types';
import { KeytipData } from '../../KeytipData';
import { useCheckbox } from './useCheckbox';

const defaultSlots: Omit<ICheckboxSlots, 'root'> = {
  input: 'input',
  checkmark: 'div',
  container: 'label',
  label: 'span',
  checkbox: 'div',
};

export const CheckboxBase = compose<'div', ICheckboxProps, {}, ICheckboxProps, {}>(
  (props, forwardedRef, composeOptions) => {
    // TODO: improve typing for mergeProps
    const { slotProps, slots, state } = mergeProps<ICheckboxProps, ICheckboxState>(
      composeOptions.state,
      composeOptions,
    ) as {
      state: ICheckboxState;
      slots: ICheckboxSlots;
      slotProps: ICheckboxSlotProps;
    };

    const { disabled, keytipProps } = state;

    const onRenderLabel = (): JSX.Element => {
      return <slots.label {...slotProps.label} />;
    };

    return (
      <KeytipData keytipProps={keytipProps} disabled={disabled}>
        {// tslint:disable-next-line:no-any
        (keytipAttributes: any): JSX.Element => (
          <slots.root {...slotProps.root}>
            <slots.input
              {...slotProps.input}
              data-ktp-execute-target={keytipAttributes['data-ktp-execute-target']}
              aria-describedby={mergeAriaAttributeValues(
                slotProps.input['aria-describedby'],
                keytipAttributes['aria-describedby'],
              )}
            />
            <slots.container {...slotProps.container}>
              <slots.checkbox {...slotProps.checkbox} data-ktp-target={keytipAttributes['data-ktp-target']}>
                <slots.checkmark {...slotProps.checkmark} />
              </slots.checkbox>
              {(props.onRenderLabel || onRenderLabel)(props, onRenderLabel)}
            </slots.container>
          </slots.root>
        )}
      </KeytipData>
    );
  },
  {
    slots: defaultSlots,
    state: useCheckbox,
    displayName: 'CheckboxBase',
    handledProps: [
      'componentRef',
      'onChange',
      'checked',
      'defaultChecked',
      'boxSide',
      'label',
      'disabled',
      'inputProps',
      'boxSide',
      'ariaLabel',
      'ariaLabelledBy',
      'ariaDescribedBy',
      'ariaPositionInSet',
      'ariaSetSize',
      'styles',
      'onRenderLabel',
      'checkmarkIconProps',
      'keytipProps',
      'indeterminate',
      'defaultIndeterminate',
    ],
  },
);

CheckboxBase.defaultProps = {};
