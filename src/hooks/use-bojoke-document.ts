import { AnyRemirrorManager } from '@remirror/core';
import { useAtom, useAtomValue } from 'jotai';
import { infoAtom } from '../atoms/info';
import { problemTitleAtom } from '../atoms/remirror-editor';
import { BojokeDocument } from '../lib/bojoke-document';
import { RemirrorContent } from '../lib/vendors/remirror/content';

function saveContents(
  manager: AnyRemirrorManager | null,
): RemirrorContent | null {
  if (!manager) {
    return null;
  }
  return manager.view.state.doc.content.toJSON();
}

function loadContents(
  manager: AnyRemirrorManager | null,
  value: RemirrorContent[] | null,
) {
  if (!manager) {
    return;
  }
  if (!value) {
    return;
  }
  manager.view.updateState({
    doc: {
      content: value.map((node) => manager.schema.nodeFromJSON(node)),
    },
  });
}

export function useBojokeDocument(): {
  readDocument: () => BojokeDocument;
  loadDocument: (document: BojokeDocument) => void;
} {
  const [info, dispatch] = useAtom(infoAtom);
  const problemTitleManager = useAtomValue(problemTitleAtom);

  return {
    readDocument() {
      return { info, title: saveContents(problemTitleManager) };
    },
    loadDocument(document: BojokeDocument) {
      dispatch({ type: 'FULL_UPDATE', value: document.info });
      loadContents(problemTitleManager, document.title);
    },
  };
}
