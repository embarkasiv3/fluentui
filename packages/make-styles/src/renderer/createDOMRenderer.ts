import { MakeStylesRenderer } from '../types';
import { RTL_PREFIX } from '../constants';

interface MakeStylesDOMRenderer extends MakeStylesRenderer {
  insertionCache: Record<string, true>;
  index: number;

  styleElement: HTMLStyleElement;
}

const renderers = new WeakMap<Document, MakeStylesDOMRenderer>();
let lastIndex = 0;

/* eslint-disable guard-for-in */

export function createDOMRenderer(targetDocument: Document = document): MakeStylesDOMRenderer {
  const value: MakeStylesDOMRenderer | undefined = renderers.get(targetDocument);

  if (value) {
    return value;
  }

  const styleElement = targetDocument.createElement('style');

  styleElement.setAttribute('make-styles', 'RULE');
  targetDocument.head.appendChild(styleElement);

  const renderer: MakeStylesDOMRenderer = {
    insertionCache: {},
    index: 0,
    styleElement,

    id: `d${lastIndex++}`,
    insertDefinitions: function insertStyles(definitions, rtl): string {
      let classes = '';

      for (const propName in definitions) {
        const definition = definitions[propName];
        // className || css || rtlCSS

        const className = definition[0];
        const rtlCSS = definition[2];

        const ruleClassName = rtl ? (rtlCSS ? RTL_PREFIX + className : className) : className;

        // Should be done always to return classes
        classes += ruleClassName + ' ';

        if (renderer.insertionCache[ruleClassName]) {
          continue;
        }

        const css = definition[1];
        const ruleCSS = rtl ? rtlCSS || css : css;

        renderer.insertionCache[ruleClassName] = true;

        (renderer.styleElement.sheet as CSSStyleSheet).insertRule(ruleCSS, renderer.index);
        renderer.index++;
      }

      return classes.slice(0, -1);
    },
  };

  renderers.set(targetDocument, renderer);

  return renderer;
}
