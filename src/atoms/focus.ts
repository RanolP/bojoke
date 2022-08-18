import { atom } from 'jotai';

export type Focus =
  | null
  | 'title'
  | 'problem-id'
  | 'tier'
  | 'main-text/description'
  | 'main-text/input'
  | 'main-text/output'
  | 'main-text/example'
  | 'info/time-limit'
  | 'info/memory-limit'
  | 'info/submission-count'
  | 'info/submission-ac-count'
  | 'info/user-ac-count'
  | 'info/ac-percentage'
  | `sample/${number}/in`
  | `sample/${number}/out`;

export const focusAtom = atom<Focus>(null);
