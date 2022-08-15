import { useEffect, useRef, useState } from 'preact/hooks';
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
  extends Exclude<
    JSX.HTMLAttributes<HTMLInputElement>,
    'type' | 'onInput' | 'ref'
  > {
  value: number;
  setValue(value: number): void;
}

const HiddenSpan = styled('span', {
  visibility: 'hidden',
  position: 'absolute',
});

function NumericInput({
  value,
  setValue,
  ...props
}: NumericInputProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

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
      inputRef.current.style.width = `${width}px`;
    }, 10);
  }, [value]);

  return (
    <>
      <input
        type="number"
        value={value}
        onInput={onInput}
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

  '-moz-appearance': 'textfield',
  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    display: 'none',
  },
});

export function ProblemInfoTable(): JSX.Element {
  const [timeLimit, setTimeLimit] = useState(3);

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
            <StyledNumericInput value={timeLimit} setValue={setTimeLimit} /> 초
          </td>
          <td>256 MB</td>
          <td>219</td>
          <td>40</td>
          <td>37</td>
          <td>21.893%</td>
        </tr>
      </tbody>
    </Table>
  );
}
