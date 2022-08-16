import { useState } from 'preact/hooks';
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
  const [timeLimit, setTimeLimit] = useState('3');
  const [memoryLimit, setMemoryLimit] = useState('256');
  const [submissionCount, setSubmissionCount] = useState('219');
  const [submissionAcCount, setSubmissionAcCount] = useState('40');
  const [userAcCount, setUserAcCount] = useState('37');
  const [acPercentage, setAcPercentage] = useState('21.893');

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
              value={timeLimit}
              pattern="-?(0|[1-9][0-9]*)(\.[0-9]*[1-9])?"
              title="부호 있는 정수 혹은 실수, 소수점은 간결하게 적음"
              setValue={setTimeLimit}
            />{' '}
            초
          </td>
          <td>
            <NumericInput
              id="info/memory-limit"
              value={memoryLimit}
              pattern="(0|[1-9][0-9]*)"
              title="음이 아닌 정수"
              setValue={setMemoryLimit}
            />{' '}
            MB
          </td>
          <td>
            <NumericInput
              id="info/submission-count"
              value={submissionCount}
              pattern="(0|[1-9][0-9]*)"
              title="음이 아닌 정수"
              setValue={setSubmissionCount}
            />
          </td>
          <td>
            <NumericInput
              id="info/submission-count"
              value={submissionAcCount}
              pattern="(0|[1-9][0-9]*)"
              title="음이 아닌 정수"
              setValue={setSubmissionAcCount}
            />
          </td>
          <td>
            <NumericInput
              id="info/submission-count"
              value={userAcCount}
              pattern="(0|[1-9][0-9]*)"
              title="음이 아닌 정수"
              setValue={setUserAcCount}
            />
          </td>
          <td>
            <NumericInput
              id="info/submission-count"
              value={acPercentage}
              pattern="((0|[1-9][0-9]{0,1})\.[0-9]{3}|100.000)"
              title="0 ~ 100 사이 백분율, 소수점 3자리까지 표시"
              setValue={setAcPercentage}
            />
            %
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
