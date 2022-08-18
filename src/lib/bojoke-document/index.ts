import { RemirrorContent } from '../vendors/remirror/content';

export interface BojokeDocument {
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
  title: RemirrorContent[];
}
