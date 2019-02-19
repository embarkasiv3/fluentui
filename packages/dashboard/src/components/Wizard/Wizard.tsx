import * as React from 'react';
import { IWizardProps, IWizardStyles } from './Wizard.types';
import { SubwayNav } from '../SubwayNav/SubwayNav';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { getWizardStyles } from './Wizard.styles';
import { getStepContentToShow } from './Wizard.utils';

const getClassNames = classNamesFunction<IWizardProps, IWizardStyles>();

/** Component for Wizard */
export class Wizard extends React.Component<IWizardProps, {}> {
  constructor(props: IWizardProps) {
    super(props);
  }

  public render(): React.ReactNode {
    const { steps } = this.props;

    if (steps.length === 0) {
      throw new Error('Wizard must have atleast one step.');
    }

    const classNames = getClassNames(getWizardStyles!);

    // if the step to render is already passed in, use that
    const wizardStepProps = this.props.stepToShow ? this.props.stepToShow : getStepContentToShow(this.props);

    return (
      <div className={classNames.wizardContentNavContainer}>
        <div className={classNames.subwayNavSection}>
          <SubwayNav steps={steps} wizardComplete={this.props.wizardComplete} />
        </div>
        <div className={classNames.contentSection}>
          <div>{wizardStepProps.wizardContent!.contentTitle}</div>
          <div className={classNames.content}>{wizardStepProps.wizardContent!.content}</div>
        </div>
      </div>
    );
  }
}
