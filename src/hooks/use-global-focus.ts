import {
  AnyManagerStore,
  AnyRemirrorManager,
  EditorState,
} from '@remirror/core';
import { useAtom } from 'jotai';
import { useCallback, useEffect } from 'preact/hooks';
import { Focus, focusAtom } from '../atoms/focus';

export function useGlobalFocus(id: Focus, store?: AnyManagerStore) {
  const [focus, setFocus] = useAtom(focusAtom);
  useEffect(() => {
    if (focus !== id) {
      store?.commands.selectText(0);
    }
  }, [focus, id, store]);

  const onFocus = useCallback(() => setFocus(id), []);
  return onFocus;
}
