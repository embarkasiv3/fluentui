import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import { LabelBasicExample } from './examples/Label.Basic.Example';

const LabelBasicExampleCode = require('./examples/Label.Basic.Example.tsx');

export class LabelPage extends React.Component<any, any> {
  public render() {
    return (
      <div className='ms-LabelExample'>
        <h1 className='ms-font-xxl'>Label</h1>
        <div>
          <Link target='_blank' href='http://dev.office.com/fabric/components/label'>Labels</Link>
          <span> render a text string, styled as a label.</span>
        </div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='Label' code={ LabelBasicExampleCode }>
          <LabelBasicExample/>
        </ExampleCard>
        <PropertiesTableSet componentName='Label' />
      </div>
    );
  }
}
