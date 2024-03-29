import { atomWithReducer } from 'jotai/utils';
import { BojokeDocument } from '../lib/bojoke-document';

type Action =
  | {
      type: 'SET_PROBLEM_ID';
      value: string;
    }
  | {
      type: 'SET_TIME_LIMIT';
      value: string;
    }
  | {
      type: 'SET_MEMORY_LIMIT';
      value: string;
    }
  | {
      type: 'SET_SUBMISSION_COUNT';
      value: string;
    }
  | {
      type: 'SET_SUBMISSION_AC_COUNT';
      value: string;
    }
  | {
      type: 'SET_USER_AC_COUNT';
      value: string;
    }
  | {
      type: 'SET_AC_PERCENTAGE';
      value: string;
    }
  | {
      type: 'FULL_UPDATE';
      value: Partial<BojokeDocument['info']> | undefined;
    };

function reducer(
  state: BojokeDocument['info'],
  action: Action,
): BojokeDocument['info'] {
  switch (action.type) {
    case 'SET_PROBLEM_ID':
      return {
        ...state,
        problemId: action.value,
      };
    case 'SET_TIME_LIMIT':
      return {
        ...state,
        timeLimit: {
          ...state.timeLimit,
          content: action.value,
        },
      };
    case 'SET_MEMORY_LIMIT':
      return {
        ...state,
        memoryLimit: {
          ...state.timeLimit,
          content: action.value,
        },
      };
    case 'SET_SUBMISSION_COUNT':
      return {
        ...state,
        submissionCount: action.value,
      };
    case 'SET_SUBMISSION_AC_COUNT':
      return {
        ...state,
        submissionAcCount: action.value,
      };
    case 'SET_USER_AC_COUNT':
      return {
        ...state,
        userAcCount: action.value,
      };
    case 'SET_AC_PERCENTAGE':
      return {
        ...state,
        acPercentage: action.value,
      };
    case 'FULL_UPDATE':
      return {
        ...state,
        ...(action.value ?? {}),
        timeLimit: {
          ...state.timeLimit,
          ...(action.value?.timeLimit ?? {}),
        },
        memoryLimit: {
          ...state.memoryLimit,
          ...(action.value?.memoryLimit ?? {}),
        },
      };
  }
}

export const infoAtom = atomWithReducer(
  {
    problemId: '1000',
    timeLimit: {
      content: '3',
    },
    memoryLimit: {
      content: '256',
    },
    submissionCount: '219',
    submissionAcCount: '40',
    userAcCount: '37',
    acPercentage: '21.893',
  },
  reducer,
);
