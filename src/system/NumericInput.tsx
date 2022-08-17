import { useEffect, useRef } from 'preact/hooks';
import { Focus } from '../atoms/focus';
import { useGlobalFocus } from '../hooks/use-global-focus';
import { useLocked } from '../hooks/useLocked';
import { styled } from '../stitches.config';

const HiddenSpan = styled('span', {
  visibility: 'hidden',
  position: 'absolute',

  ':invalid + &': {
    fontWeight: 'bold',
  },
});

export interface NumericInputProps
  extends Omit<
    JSX.HTMLAttributes<HTMLInputElement>,
    'type' | 'onInput' | 'ref' | 'id'
  > {
  id: Focus;
  value: string;
  setValue(value: string): void;
}
function UnstyledNumericInput({
  id,
  value,
  setValue,
  ...props
}: NumericInputProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  const readonly = useLocked();

  const { onFocus } = useGlobalFocus(id);

  function onInput(e: JSX.TargetedEvent<HTMLInputElement>) {
    setValue(e.currentTarget.value);
  }

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
        type="text"
        value={value}
        onInput={onInput}
        onFocus={onFocus}
        ref={inputRef}
        readOnly={readonly}
        {...props}
      />
      <HiddenSpan ref={spanRef}>{value}</HiddenSpan>
    </>
  );
}

export const NumericInput = styled(UnstyledNumericInput, {
  border: 'none',
  background: 'transparent',

  boxSizing: 'border-box',
  padding: 0,

  color: 'inherit',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  outline: 'none',

  overflow: 'visible',

  '-moz-appearance': 'textfield',
  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    display: 'none',
  },

  width: 'var(--width)',

  '&:focus:not([readonly])': {
    borderBottom: '2px solid blue',
    padding: '0 2px',
    margin: '0 -2px -2px -2px',
    width: 'calc(var(--width) + 4px)',
  },

  '&:invalid': {
    color: 'white',
    fontWeight: 'bold',
    background: 'red',
    border: '2px solid red',
    borderBottomColor: 'blue',
    padding: '0 2px',
    margin: '-2px -4px -2px -4px',
    width: 'calc(var(--width) + 8px)',
  },

  variants: {
    context: {
      'problem-id': {
        '&:focus': {
          borderBottomColor: '#e2e2a2',
        },
      },
    },
  },
});
