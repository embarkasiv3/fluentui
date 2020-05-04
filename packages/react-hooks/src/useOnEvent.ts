import { on } from '@uifabric/utilities';
import * as React from 'react';

/**
 * Hook to attach an event handler on mount and handle cleanup.
 * @param element- Element (or ref to an element) to attach the event handler to
 * @param eventName- The event to attach a handler for
 * @param callback- The handler for the event
 * @param useCapture- Whether or not to attach the handler for the capture phase
 */
export function useOnEvent<TElement extends Element, TEvent extends Event>(
  element: React.RefObject<TElement | undefined | null> | TElement | Window | undefined | null,
  eventName: string,
  callback: (ev: TEvent) => void,
  useCapture?: boolean,
) {
  // Use a ref for the callback to prevent repeatedly attaching/unattaching callbacks that are unstable across renders
  const callbackRef = React.useRef(callback);
  callbackRef.current = callback;

  React.useEffect(() => {
    if (element && 'current' in element) {
      element = element.current;
    }
    if (!element) {
      return;
    }

    const dispose = on(element, eventName, (ev: TEvent) => callbackRef.current(ev), useCapture);
    return dispose;
  }, [element, eventName, useCapture]);
}
