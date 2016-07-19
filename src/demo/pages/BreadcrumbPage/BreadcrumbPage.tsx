import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import { BreadcrumbBasicExample } from './examples/Breadcrumb.Basic.Example';

const BreadcrumbBasicExampleCode = require('./examples/Breadcrumb.Basic.Example.tsx');

export class BreadcrumbPage extends React.Component<any, any> {
  public render() {
    return (
      <div className='BreadcrumbExample'>
        <h1 className='ms-font-xxl'>Breadcrumb</h1>
        <div>
          <Link target='_blank' href='http://dev.office.com/fabric/components/breadcrumb'>Breadcrumbs</Link>
          <span> are used to represent a given path.</span>
        </div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='Simple breadcrumb' code={ BreadcrumbBasicExampleCode }>
          <BreadcrumbBasicExample />
        </ExampleCard>
        <PropertiesTableSet componentName='Breadcrumb' />
      </div>
    );
  }

}
