import { AnyRemirrorManager } from '@remirror/core';
import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';

export const EditorManagerId = Object.freeze({
  ProblemTitle: 'problem-title',
  MainTextDescription: 'main-text/description',
  MainTextInput: 'main-text/input',
  MainTextOutput: 'main-text/output',
  MainTextExample: 'main-text/example',
});
export type EditorManagerId =
  typeof EditorManagerId[keyof typeof EditorManagerId];

export const remirrorEditorManagerFamily = atomFamily((id: EditorManagerId) =>
  atom<AnyRemirrorManager | null>(null),
);

export const problemTitleAtom = remirrorEditorManagerFamily('problem-title');
