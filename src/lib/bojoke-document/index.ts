import { EditorManagerId } from '../../atoms/remirror-editor';
import { RemirrorContent } from '../vendors/remirror/content';

export interface BojokeDocument
  extends Record<EditorManagerId, RemirrorContent[]> {
  info: {
    problemId: string;

    timeLimit: {
      content: string;
    };
    memoryLimit: {
      content: string;
    };

    submissionCount: string;
    submissionAcCount: string;
    userAcCount: string;
    acPercentage: string;
  };
}
