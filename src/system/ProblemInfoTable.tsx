import { useEffect, useRef, useState } from 'preact/hooks';
import { Focus } from '../atoms/focus';
import { useGlobalFocus } from '../hooks/use-global-focus';
import { styled } from '../stitches.config';

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

interface NumericInputProps
  extends Omit<
    JSX.HTMLAttributes<HTMLInputElement>,
    'type' | 'onInput' | 'ref' | 'id'
  > {
  id: Focus;
  value: number;
  setValue(value: number): void;
}

const HiddenSpan = styled('span', {
  visibility: 'hidden',
  position: 'absolute',
});

function NumericInput({
  id,
  value,
  setValue,
  ...props
}: NumericInputProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  const onFocus = useGlobalFocus(id);

  function update(value: number) {
    setValue(value);
  }
  function onInput(e: JSX.TargetedEvent<HTMLInputElement>) {
    update(e.currentTarget.valueAsNumber);
  }

  useEffect(() => {
    update(value);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (!spanRef.current || !inputRef.current) {
        return;
      }
      const width = spanRef.current.clientWidth;
      inputRef.current.style.setProperty('--width', `${width}px`);
    }, 10);
  }, [value]);

  return (
    <>
      <input
        type="number"
        value={value}
        onInput={onInput}
        onFocus={onFocus}
        ref={inputRef}
        {...props}
      />
      <HiddenSpan ref={spanRef}>{value}</HiddenSpan>
    </>
  );
}

const StyledNumericInput = styled(NumericInput, {
  border: 'none',
  boxSizing: 'border-box',
  padding: 0,
  fontFamily: 'inherit',
  outline: 'none',

  '-moz-appearance': 'textfield',
  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    display: 'none',
  },

  width: 'var(--width)',

  '&:focus': {
    borderBottom: '2px solid blue',
    padding: '0 2px',
    margin: '0 -2px -2px -2px',
    width: 'calc(var(--width) + 4px)',
  },
});

export function ProblemInfoTable(): JSX.Element {
  const [timeLimit, setTimeLimit] = useState(3);
  const [memoryLimit, setMemoryLimit] = useState(256);
  const [submissionCount, setSubmissionCount] = useState(219);
  const [submissionAcCount, setSubmissionAcCount] = useState(40);
  const [userAcCount, setUserAcCount] = useState(37);
  const [acPercentage, setAcPercentage] = useState(21.893);

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
            <StyledNumericInput
              id="info/time-limit"
              value={timeLimit}
              setValue={setTimeLimit}
            />{' '}
            초
          </td>
          <td>
            <StyledNumericInput
              id="info/memory-limit"
              value={memoryLimit}
              setValue={setMemoryLimit}
            />{' '}
            MB
          </td>
          <td>
            <StyledNumericInput
              id="info/submission-count"
              value={submissionCount}
              setValue={setSubmissionCount}
            />
          </td>
          <td>
            <StyledNumericInput
              id="info/submission-count"
              value={submissionAcCount}
              setValue={setSubmissionAcCount}
            />
          </td>
          <td>
            <StyledNumericInput
              id="info/submission-count"
              value={userAcCount}
              setValue={setUserAcCount}
            />
          </td>
          <td>
            <StyledNumericInput
              id="info/submission-count"
              value={acPercentage}
              setValue={setAcPercentage}
            />
            %
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
