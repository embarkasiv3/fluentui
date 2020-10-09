import * as React from 'react';
import { Alert, Ref, Dropdown, DropdownProps } from '@fluentui/react-northstar';
import { IAriaElement } from './../narration/NarrationComputer';
import { DescendantsNarrationsComputer } from './../narration/DescendantsNarrationsComputer';

const computer: DescendantsNarrationsComputer = new DescendantsNarrationsComputer();
let narrationTexts: Record<string, string> = {};
const aomMissing = !(window as any).getComputedAccessibleNode;

export type ReaderNarrationProps = {
  selector: string;
};

export const ReaderNarration: React.FunctionComponent<ReaderNarrationProps> = ({ selector }) => {
  const ref = React.useRef<HTMLElement>();
  const [narrationText, setNarrationText] = React.useState('');
  const [narrationPath, setNarrationPath] = React.useState('');
  const [narrationPaths, setNarrationPaths] = React.useState([]);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (aomMissing) {
      return;
    }

    const element = ref.current.ownerDocument.querySelector(selector) as IAriaElement;

    // Compute and store the narrations for the element and its focusable descendants
    computer.compute(element, 'Win/JAWS').then(narrations => {
      const paths: string[] = [];
      narrationTexts = {};
      narrations.forEach(narration => {
        // Begin forEach 1
        const path = narration.path.join(' > ');
        paths.push(path);
        narrationTexts[path] = narration.text;
      }); // End forEach 1

      // Update the narration paths dropdown values
      setNarrationPaths(paths);

      // If some narration has been retrieved, choose the first one as the narration to be displayed
      const text = narrations[0]?.text || null;
      setCompleteText(text);
    }); // End compute
  }, [setNarrationText, setNarrationPath, setNarrationPaths, ref, selector]);

  // Composes and sets the complete screen reader narration text to be displayed
  const setCompleteText = text => {
    setNarrationText(`Narration: ${text}`);
  }; // End setCompleteText

  const handleNarrationPathChange = (event: any, props: DropdownProps) => {
    setNarrationPath(props.value as string);
    const text = narrationTexts[props.value as string];
    setCompleteText(text);
  }; // End handleNarrationPathChange

  if (!selector) {
    return null;
  }

  return (
    <>
      {narrationPaths.length > 1 && (
        <Dropdown
          items={narrationPaths}
          defaultValue={narrationPath}
          value={narrationPath}
          onChange={handleNarrationPathChange}
          getA11ySelectionMessage={{
            onAdd: item => `${item} has been selected.`,
          }}
          placeholder="Select a descendant element"
        />
      )}
      <Ref innerRef={ref}>
        <Alert
          warning
          content={
            aomMissing ? (
              <>
                AOM is not available.{' '}
                <a target="_blank" href="http://wicg.github.io/aom/caniuse.html">
                  Enable AOM
                </a>
              </>
            ) : narrationText !== null ? (
              narrationText
            ) : (
              'The selected component has no focusable elements.'
            )
          }
        />
      </Ref>
    </>
  );
};
