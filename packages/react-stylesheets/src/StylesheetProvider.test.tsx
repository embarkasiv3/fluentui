import * as React from 'react';
import { StylesheetProvider } from './StylesheetProvider';
import { useStylesheet } from './useStylesheet';
import { StylesheetContext, StylesheetContextType, registerStyles } from './StylesheetContext';
import { mount } from 'enzyme';

const FooStylesheet = 'Foo';
const ParentRenderingFooStylesheet = 'ParentRenderingFoo';

const Foo = () => {
  useStylesheet(FooStylesheet);

  return <div className="foo" />;
};

const ParentRenderingFoo = () => {
  useStylesheet(ParentRenderingFooStylesheet);

  return (
    <div className="foo">
      <Foo />
    </div>
  );
};

describe('StylesheetProvider', () => {
  let result: string[] = [];
  let customContext: StylesheetContextType;

  const mountWithContext = (content: JSX.Element) =>
    mount(<StylesheetContext.Provider value={customContext}>{content}</StylesheetContext.Provider>);

  beforeEach(() => {
    result = [];
    customContext = {
      registerStyles,
      target: document,
      styleCache: new WeakMap(),
      enqueuedSheets: [],
      renderStyles: (sheets: string[]) => {
        result.push(...sheets);
      },
    };
  });

  it('can render to a string', () => {
    const allSheets: string[] = [];
    const customRenderer = (sheets: string[]) => {
      allSheets.push(...sheets);
    };

    mountWithContext(
      <StylesheetProvider renderStyles={customRenderer}>
        <Foo />
        <Foo />
      </StylesheetProvider>,
    );

    expect(allSheets).toEqual([FooStylesheet]);
  });

  it('can register nested components in the correct order (leafs first)', () => {
    mountWithContext(
      <StylesheetProvider>
        <ParentRenderingFoo />
      </StylesheetProvider>,
    );
    expect(result).toEqual([FooStylesheet, ParentRenderingFooStylesheet]);
  });
});
