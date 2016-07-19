import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard
} from '../../components/index';

import { LinkBasicExample } from './examples/Link.Basic.Example';
let LinkBasicExampleCode = require('./examples/Link.Basic.Example.tsx');

export class LinkPage extends React.Component<any, any> {
  public render() {
    return (
      <div className='LinkExample'>
        <h1 className='ms-font-xxl'>Link</h1>
        <div>
          <Link target='_blank' href='http://dev.office.com/fabric/components/link'>Links</Link>
          <span> are used as a styled replacement for A tags. All attributes valid on A tags will be passed through.</span>
        </div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='Link' code={ LinkBasicExampleCode }>
          <LinkBasicExample />
        </ExampleCard>
      </div>
    );
  }

}
