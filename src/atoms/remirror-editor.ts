import { AnyRemirrorManager } from '@remirror/core';
import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';

export const remirrorEditorManagerFamily = atomFamily((id: string) =>
  atom<AnyRemirrorManager | null>(null),
);

export const problemTitleAtom = remirrorEditorManagerFamily('problem-title');
