import * as React from 'react';
import { IColorPickerProps } from './ColorPicker.Props';
import { TextField } from '../../TextField';
import { ColorRectangle } from './ColorRectangle';
import { ColorSlider } from './ColorSlider';
import {
  IColor,
  MAX_COLOR_HUE,
  getColorFromString,
  updateA,
  updateH,
  updateSV
} from './colors';
import './ColorPicker.scss';

export interface IColorPickerState {
  isOpen: boolean;
  color: IColor;
}

export interface IColor {
  r: number;
  g: number;
  b: number;
  a: number;
  h: number;
  s: number;
  v: number;
  hex: string;
  str: string;
}

export class ColorPicker extends React.Component<IColorPickerProps, any> {
  constructor(props: IColorPickerProps) {
    super(props);

    this._onPickerClick = this._onPickerClick.bind(this);
    this._onSVChanged = this._onSVChanged.bind(this);
    this._onHChanged = this._onHChanged.bind(this);
    this._onAChanged = this._onAChanged.bind(this);

    this.state = {
      color: getColorFromString(props.color)
    };
  }

  public render() {
    let { color } = this.state;

    return (
      <div className='ms-ColorPicker'>
        <div className='ms-ColorPicker-panel'>
          <ColorRectangle color={ color } onSVChanged={ this._onSVChanged }/>
          <ColorSlider
            className='is-hue'
            minValue={ 0 }
            maxValue={ MAX_COLOR_HUE }
            initialValue={ color.h }
            onChanged={ this._onHChanged }
          />
          <ColorSlider
            className='is-alpha'
            overlayStyle={ { background: `linear-gradient(to right, transparent 0, ${color.str} 100%)` } }
            minValue={ 0 }
            maxValue={ 100 }
            initialValue={ color.a }
            onChanged={ this._onAChanged }
          />
          <table className='ms-ColorPicker-table' cellPadding='0' cellSpacing='0'>
            <thead>
              <tr className='ms-font-s'>
                <td>Hex</td>
                <td>Red</td>
                <td>Green</td>
                <td>Blue</td>
                <td>Alpha</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><TextField className='ms-ColorPicker-input' value={ color.hex } /></td>
                <td style={ { width: '18%' } }><TextField className='ms-ColorPicker-input' value={ color.r }/></td>
                <td style={ { width: '18%' } }><TextField className='ms-ColorPicker-input' value={ color.g } /></td>
                <td style={ { width: '18%' } }><TextField className='ms-ColorPicker-input' value={ color.b } /></td>
                <td style={ { width: '18%' } }><TextField className='ms-ColorPicker-input' value={ color.a } /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  private _onPickerClick() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  private _onSVChanged(s: number, v: number) {
    this._updateColor(updateSV(this.state.color, s, v));
  }

  private _onHChanged(h: number) {
    this._updateColor(updateH(this.state.color, h));
  }

  private _onAChanged(a: number) {
    this._updateColor(updateA(this.state.color, a));
  }

  private _updateColor(newColor: IColor) {
    let { onColorChanged } = this.props;

    if (newColor.str !== this.state.color.str) {
      this.setState({
        color: newColor
      });

      if (onColorChanged) {
        onColorChanged(newColor.str);
      }
    }
  }

}
