import {
  AnyManagerStore,
  AnyRemirrorManager,
  EditorState,
} from '@remirror/core';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useRef } from 'preact/hooks';
import { Focus, focusAtom } from '../atoms/focus';

export function useGlobalFocus(id: Focus, store?: AnyManagerStore) {
  const [focus, setFocus] = useAtom(focusAtom);
  useEffect(() => {
    if (focus !== id) {
      store?.commands.selectText(0);
    }
  }, [focus, id, store]);

  const hasFocus = focus === id;

  const onFocus = useCallback(() => setFocus(id), []);
  const blur = useCallback(() => {
    if (focusRef.current === id) {
      setFocus(null);
    }
  }, [id]);

  const focusRef = useRef<Focus>(null);
  useEffect(() => {
    focusRef.current = focus;
  }, [focus]);
  useEffect(() => {
    return blur;
  }, []);

  return { hasFocus, onFocus, blur };
}
