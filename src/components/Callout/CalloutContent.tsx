/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { ICalloutProps } from './Callout.Props';
import { DirectionalHint } from '../../common/DirectionalHint';
import {
  autobind,
  css,
  elementContains
} from '../../Utilities';
import { getRelativePositions, IPositionInfo } from '../../utilities/positioning';
import { IRectangle } from '../../common/IRectangle';
import { focusFirstChild } from '../../utilities/focus';
import { assign } from '../../Utilities';
import { Popup } from '../Popup/index';
import { BaseComponent } from '../../common/BaseComponent';
import './Callout.scss';

const BEAK_ORIGIN_POSITION = { top: 0, left: 0 };
const OFF_SCREEN_POSITION = { top: -9999, left: 0 };
const BORDER_WIDTH: number = 1;
const SPACE_FROM_EDGE: number = 8;
export interface ICalloutState {
  positions?: any;
  slideDirectionalClassName?: string;
  calloutElementRect?: ClientRect;
}

export class CalloutContent extends BaseComponent<ICalloutProps, ICalloutState> {

  public static defaultProps = {
    isBeakVisible: true,
    beakWidth: 28,
    gapSpace: 0,
    directionalHint: DirectionalHint.bottomAutoEdge
  };

  private _didSetInitialFocus: boolean;
  private _hostElement: HTMLDivElement;
  private _calloutElement: HTMLDivElement;
  private _targetWindow: Window;
  private _bounds: IRectangle;
  private _maxHeight: number;
  private _positionAttempts: number;

  constructor(props: ICalloutProps) {
    super(props, {'beakStyle': 'beakWidth'});

    this._didSetInitialFocus = false;
    this.state = {
      positions: null,
      slideDirectionalClassName: null,
      calloutElementRect: null
    };
    // This is used to allow the Callout to appear on a window other than the one the javascript is running in.
    if (props.targetElement && props.targetElement.ownerDocument && props.targetElement.ownerDocument.defaultView) {
      this._targetWindow = props.targetElement.ownerDocument.defaultView;
    } else {
      this._targetWindow = window;
    }
    this._positionAttempts = 0;
  }

  public componentDidUpdate() {
    this._setInitialFocus();
    this._updatePosition();
  }

  public componentDidMount() {
    this._onComponentDidMount();
  }

  public render() {
    let { className, targetElement, isBeakVisible, beakStyle, children, beakWidth } = this.props;
    let { positions, slideDirectionalClassName } = this.state;
    let beakStyleWidth = beakWidth;

    // This is here to support the old way of setting the beak size until version 1.0.0.
    // beakStyle is now deprecated and will be be removed at version 1.0.0
    if (beakStyle === 'ms-Callout-smallbeak') {
      beakStyleWidth = 16;
    }

    let beakReactStyle: React.CSSProperties = {
      top: positions && positions.beak ? positions.beak.top : BEAK_ORIGIN_POSITION.top,
      left: positions && positions.beak ? positions.beak.left : BEAK_ORIGIN_POSITION.left,
      height: beakStyleWidth,
      width: beakStyleWidth
    };

    let contentMaxHeight: number = this._getMaxHeight();
    let beakVisible: boolean = isBeakVisible && !!targetElement;
    let content = (
      <div ref={ this._resolveRef('_hostElement') } className={ 'ms-Callout-container' }>
        <div
          className={
            css(
              'ms-Callout',
              className,
              slideDirectionalClassName ? `ms-u-${slideDirectionalClassName}` : ''
            ) }
          style={ positions ? positions.callout : OFF_SCREEN_POSITION }
          ref={ this._resolveRef('_calloutElement') }
          >

          { beakVisible ? (
            <div
              className={ 'ms-Callout-beak' }
              style={ beakReactStyle }
              />) : (null) }

          { beakVisible ?
            (<div className='ms-Callout-beakCurtain' />) :
            (null) }

          <Popup
            className='ms-Callout-main'
            onDismiss={ (ev: any) => this.dismiss() }
            shouldRestoreFocus={ true }
            style={ { maxHeight: contentMaxHeight } }>
            { children }
          </Popup>
        </div>
      </div>
    );
    return content;
  }

  public dismiss() {
    let { onDismiss } = this.props;

    if (onDismiss) {
      onDismiss();
    }
  }

  protected _dismissOnLostFocus(ev: Event) {
    let { targetElement } = this.props;
    let target = ev.target as HTMLElement;

    if (ev.target !== this._targetWindow &&
      this._hostElement &&
      !elementContains(this._hostElement, target) &&
      (!targetElement || !elementContains(targetElement, target))) {
      this.dismiss();
    }
  }

  @autobind
  protected _setInitialFocus() {
    if (this.props.setInitialFocus && !this._didSetInitialFocus && this.state.positions) {
      this._didSetInitialFocus = true;
      focusFirstChild(this._calloutElement);
    }
  }

  @autobind
  protected _onComponentDidMount() {
    // This is added so the callout will dismiss when the window is scrolled
    // but not when something inside the callout is scrolled.
    this._events.on(this._targetWindow, 'scroll', this._dismissOnLostFocus, true);
    this._events.on(this._targetWindow, 'resize', this.dismiss, true);
    this._events.on(this._targetWindow, 'focus', this._dismissOnLostFocus, true);
    this._events.on(this._targetWindow, 'click', this._dismissOnLostFocus, true);

    if (this.props.onLayerMounted) {
      this.props.onLayerMounted();
    }

    this._updatePosition();
  }

  private _updatePosition() {
    let { positions } = this.state;
    let hostElement: HTMLElement = this._hostElement;
    let calloutElement: HTMLElement = this._calloutElement;

    if (hostElement && calloutElement) {
      let currentProps: ICalloutProps;
      currentProps = assign(currentProps, this.props);
      currentProps.bounds = this._getBounds();
      let positionInfo: IPositionInfo = getRelativePositions(currentProps, hostElement, calloutElement);

      // Set the new position only when the positions are not exists or one of the new callout positions are different.
      // The position should not change if the position is within 2 decimal places.
      if ((!positions && positionInfo) ||
        (positions && positionInfo &&
          (positions.callout.top.toFixed(2) !== positionInfo.calloutPosition.top.toFixed(2) ||
            positions.callout.left.toFixed(2) !== positionInfo.calloutPosition.left.toFixed(2))
          && this._positionAttempts < 5)) {
        // We should not reposition the callout more than a few times, if it is then the content is likely resizing
        // and we should stop trying to reposition to prevent a stack overflow.
        this._positionAttempts++;
        this.setState({
          positions: {
            callout: positionInfo.calloutPosition,
            beak: positionInfo.beakPosition,
          },
          slideDirectionalClassName: positionInfo.directionalClassName
        });
      }
    } else {
      this._positionAttempts = 0;
    }
  }

  private _getBounds(): IRectangle {
    if (!this._bounds) {
      let currentBounds = this.props.bounds;

      if (!currentBounds) {
        currentBounds = {
          top: 0 + SPACE_FROM_EDGE,
          left: 0 + SPACE_FROM_EDGE,
          right: this._targetWindow.innerWidth - SPACE_FROM_EDGE,
          bottom: this._targetWindow.innerHeight - SPACE_FROM_EDGE,
          width: this._targetWindow.innerWidth - SPACE_FROM_EDGE * 2,
          height: this._targetWindow.innerHeight - SPACE_FROM_EDGE * 2
        };
      }
      this._bounds = currentBounds;
    }
    return this._bounds;
  }

  private _getMaxHeight(): number {
    if (!this._maxHeight) {
      this._maxHeight = this._getBounds().height - BORDER_WIDTH * 2;
    }
    return this._maxHeight;
  }
}
