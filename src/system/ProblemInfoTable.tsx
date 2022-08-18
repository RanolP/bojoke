import { useAtom } from 'jotai';
import { selectAtom, useReducerAtom } from 'jotai/utils';
import { useMemo, useState } from 'preact/hooks';
import { infoAtom } from '../atoms/info';
import { styled } from '../stitches.config';
import { NumericInput } from './NumericInput';

const Table = styled('table', {
  padding: '15px 0',
  width: '100%',
  '& th': {
    textAlign: 'left',
  },
  '& tbody td': {
    borderTop: '1px solid #ddd',
  },
  '& thead th, & tbody td': {
    fontSize: '13px',
    padding: '8px',
  },
});

export function ProblemInfoTable(): JSX.Element {
  const [info, dispatch] = useAtom(infoAtom);

  function setter(type: Parameters<typeof dispatch>[0]['type']) {
    return (value: string) => dispatch({ type, value });
  }

  return (
    <Table>
      <thead>
        <tr>
          <th style={{ width: '16%' }}>시간 제한</th>
          <th style={{ width: '16%' }}>메모리 제한</th>
          <th style={{ width: '17%' }}>제출</th>
          <th style={{ width: '17%' }}>정답</th>
          <th style={{ width: '17%' }}>맞힌 사람</th>
          <th style={{ width: '17%' }}>정답 비율</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <NumericInput
              id="info/time-limit"
              value={info.timeLimit.content}
              pattern="-?(0|[1-9][0-9]*)(\.[0-9]*[1-9])?"
              title="부호 있는 정수 혹은 실수, 소수점은 간결하게 적음"
              setValue={setter('SET_TIME_LIMIT')}
            />{' '}
            초
          </td>
          <td>
            <NumericInput
              id="info/memory-limit"
              value={info.memoryLimit.content}
              pattern="(0|[1-9][0-9]*)"
              title="음이 아닌 정수"
              setValue={setter('SET_MEMORY_LIMIT')}
            />{' '}
            MB
          </td>
          <td>
            <NumericInput
              id="info/submission-count"
              value={info.submissionCount}
              pattern="(0|[1-9][0-9]*)"
              title="음이 아닌 정수"
              setValue={setter('SET_SUBMISSION_COUNT')}
            />
          </td>
          <td>
            <NumericInput
              id="info/submission-ac-count"
              value={info.submissionAcCount}
              pattern="(0|[1-9][0-9]*)"
              title="음이 아닌 정수"
              setValue={setter('SET_SUBMISSION_AC_COUNT')}
            />
          </td>
          <td>
            <NumericInput
              id="info/user-ac-count"
              value={info.userAcCount}
              pattern="(0|[1-9][0-9]*)"
              title="음이 아닌 정수"
              setValue={setter('SET_USER_AC_COUNT')}
            />
          </td>
          <td>
            <NumericInput
              id="info/ac-percentage"
              value={info.acPercentage}
              pattern="((0|[1-9][0-9]{0,1})\.[0-9]{3}|100.000)"
              title="0 ~ 100 사이 백분율, 소수점 3자리까지 표시"
              setValue={setter('SET_AC_PERCENTAGE')}
            />
            %
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
