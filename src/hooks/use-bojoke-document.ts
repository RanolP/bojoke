import { AnyRemirrorManager } from '@remirror/core';
import { useAtom, useAtomValue } from 'jotai';
import { infoAtom } from '../atoms/info';
import { problemTitleAtom } from '../atoms/remirror-editor';
import { BojokeDocument } from '../lib/bojoke-document';
import { RemirrorContent } from '../lib/vendors/remirror/content';

function serializeNodes(
  manager: AnyRemirrorManager | null,
): RemirrorContent | null {
  if (!manager) {
    return null;
  }
  return manager.view.state.doc.content.toJSON();
}

export function useBojokeDocument(): {
  readDocument: () =>BojokeDocument;
  loadDocument: (document: BojokeDocument) => void;
} {
  const [info, dispatch] = useAtom(infoAtom);
  const problemTitleManager = useAtomValue(problemTitleAtom);

  return {
    readDocument() {
      return { info, title: serializeNodes(problemTitleManager) };
    },
    loadDocument(document: BojokeDocument) {
      dispatch({ type: 'FULL_UPDATE', value: document.info });
    },
  };
}
