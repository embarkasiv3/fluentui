/* tslint:disable:no-unused-variable no-unused-imports */
import * as React from 'react';
/* tslint:enable:no-unused-variable no-unused-imports*/
import { IButtonProps } from '../Button.Props';

export interface IIconButtonProps extends IButtonProps {
  /**
 * The button icon shown in command or hero type.
 */
  icon: string;
}