import * as React from 'react';
import { ResizeGroup } from './ResizeGroup';

export interface IResizeGroup {

}

export interface IResizeGroupProps extends React.HTMLAttributes<ResizeGroup | HTMLElement> {

  /**
   * Optional callback to access the IResizeGroup interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IResizeGroup) => void;

  /**
   * Initial data to be passed to the onRenderData function. This data should represent what will be passed to the
   * render function when the parent container of the ResizeGroup is at it's maximum supported width.
  */
  data?: any;

  /**
   * Function to render the data. Called when rendering the contents to the screen and when
   * rendering in a hidden div to measure the size of the contents.
  */
  onRenderData: (data: any) => JSX.Element;

  /**
   * Function to be performed on the data in order to make it fit into the given space.
   * If there are no more scaling steps to apply, it should return undefined to prevent
   * an infinite render loop.
  */
  onReduceData: (prevData: any) => any;

  /**
   * Function to be called every time data is rendered. It provides the data that was actually rendered.
   * A use case would be adding telemetry when a particular control is shown in an overflow well or
   * dropped as a result of onReduceData or to count the number of renders that an implementation of
   * onReduceData triggers.
   */
  dataDidRender?: (renderedData: any) => void;
}
