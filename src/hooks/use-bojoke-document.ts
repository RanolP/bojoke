import { AnyRemirrorManager } from '@remirror/core';
import { PrimitiveAtom, useAtom, useAtomValue } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import { infoAtom } from '../atoms/info';
import {
  EditorManagerId,
  problemTitleAtom,
  remirrorEditorManagerFamily,
} from '../atoms/remirror-editor';
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
  manager: AnyRemirrorManager | null | undefined,
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

const atoms = Object.values(EditorManagerId).map(
  (id) => [id, remirrorEditorManagerFamily(id)] as const,
);

export function useBojokeDocument(): {
  readDocument: () => BojokeDocument;
  loadDocument: (document: BojokeDocument) => void;
} {
  const [info, dispatch] = useAtom(infoAtom);
  const problemTitleManager = useAtomValue(problemTitleAtom);
  const managers = atoms.map(([id, atom]) => [id, useAtomValue(atom)] as const);

  return {
    readDocument() {
      return {
        info,
        ...(Object.fromEntries(
          managers.map(([id, manager]) => [id, saveContents(manager)]),
        ) as Record<EditorManagerId, RemirrorContent>),
      };
    },
    loadDocument(document: BojokeDocument) {
      dispatch({ type: 'FULL_UPDATE', value: document.info });
      for (const id of Object.values(EditorManagerId)) {
        const manager = managers.find(([managerId]) => id === managerId);
        loadContents(manager?.[1], document[id]);
      }
    },
  };
}
