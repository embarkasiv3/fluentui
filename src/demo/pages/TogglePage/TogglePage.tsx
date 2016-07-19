import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import { ToggleBasicExample } from './examples/Toggle.Basic.Example';
const ToggleBasicExampleCode = require('./examples/Toggle.Basic.Example.tsx');

export class TogglePage extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <h1 className='ms-font-xxl'>Toggle</h1>
        <div>
          <Link target='_blank' href='http://dev.office.com/fabric/components/Toggle'>Toggles</Link>
          <span> allow the user to turn an option on/off.</span>
        </div>

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='Toggle' code={ ToggleBasicExampleCode }>
          <ToggleBasicExample />
        </ExampleCard>
        <PropertiesTableSet componentName='Toggle' />
      </div>
    );
  }
}
