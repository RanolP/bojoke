import { useAtomValue } from 'jotai';
import { lockAtom } from '../atoms/lock';

export function useLocked(): boolean {
  const isLocked = useAtomValue(lockAtom);
  return isLocked;
}
