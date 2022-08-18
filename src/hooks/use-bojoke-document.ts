import { useAtom } from 'jotai';
import { infoAtom } from '../atoms/info';
import { BojokeDocument } from '../lib/bojoke-document';

export function useBojokeDocument(): [BojokeDocument] {
  const [info, setinfo] = useAtom(infoAtom);

  return [{ info }];
}
