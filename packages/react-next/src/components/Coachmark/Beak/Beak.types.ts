import * as React from 'react';
import { RectangleEdge } from '@fluentui/react/lib/Positioning';

export interface IBeakProps extends React.RefAttributes<HTMLDivElement> {
  /**
   * Beak width.
   * @defaultvalue 18
   * @deprecated Do not use.
   */
  width?: number;

  /**
   * Beak height.
   * @defaultvalue 18
   * @deprecated Do not use.
   */
  height?: number;

  /**
   * Color of the beak
   */
  color?: string;

  /**
   * Left position of the beak
   */
  left?: string;

  /**
   * Top position of the beak
   */
  top?: string;

  /**
   * Right position of the beak
   */
  right?: string;

  /**
   * Bottom position of the beak
   */
  bottom?: string;

  /**
   * Direction of beak
   */
  direction?: RectangleEdge;
}

export interface IBeakStylesProps {
  left?: string | undefined;
  top?: string | undefined;
  bottom?: string | undefined;
  right?: string | undefined;
  width?: string;
  height?: string;
  transform?: string;
  color?: string;
}
