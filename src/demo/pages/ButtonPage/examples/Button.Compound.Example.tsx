import * as React from 'react';
import {
  Button,
  ButtonType,
  Label
} from '../../../../index';

export class ButtonCompoundExample extends React.Component<any, any> {
  public constructor() {
    super();
  }

  public render() {
    let { isDisabled } = this.props;

    return (
      <div className='ms-BasicButtonsExample'>
        <Label>Compound button</Label>
        <Button
          disabled={ isDisabled }
          buttonType={ ButtonType.compound }
          description='You can create a new account here.'>
          Create account
        </Button>
      </div>
    );
  }
}