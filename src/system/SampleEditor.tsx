import { Remirror, useRemirror } from '@remirror/react';
import { useEffect, useRef, useState } from 'preact/hooks';
import { Focus } from '../atoms/focus';
import { useGlobalFocus } from '../hooks/use-global-focus';
import { useLocked } from '../hooks/useLocked';
import { styled } from '../stitches.config';
import { Headline } from './Headline';

const Wrap = styled('div', {
  variants: {
    mode: {
      both: {
        display: 'grid',

        gridTemplateRows: '1fr 1fr',
        gridTemplateColumns: '1fr',
        '@media screen and (min-width: 992px)': {
          gridTemplateRows: '1fr',
          gridTemplateColumns: '1fr 1fr',
        },
      },
      'output-only': {},
    },
  },

  margin: '0 -15px',
});
const SectionWrap = styled('div', {
  padding: '0 15px',
});
const StyledPre = styled('pre', {
  fontFamily: 'Menlo, Monaco, "Source Code Pro", consolas, monospace',
  background: '#f7f7f9',
  border: '1px solid #e1e1e8',
  overflowX: 'scroll',
  overflowY: 'visible',

  '&[data-focus=true]': {
    border: '2px solid blue',
  },
});

const StyledTextarea = styled('textarea', {
  padding: '8px',

  border: 'none',
  background: 'transparent',
  resize: 'none',
  outline: 'none',

  fontFamily: 'inherit',
  fontSize: 'inherit',

  minWidth: '100%',
  boxSizing: 'border-box',

  whiteSpace: 'pre',

  overflowY: 'visible',

  '&::placeholder': {
    fontStyle: 'italic',
    opacity: 0.25,
  },
});

interface GracefulTextareaProps
  extends Omit<
    JSX.HTMLAttributes<HTMLTextAreaElement>,
    'value' | 'onInput' | 'readOnly' | 'onFocus' | 'ref'
  > {
  focus: Focus;
}
function GracefulTextarea({
  focus,
  ...props
}: GracefulTextareaProps): JSX.Element {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState('');
  const { hasFocus, onFocus, blur } = useGlobalFocus(focus);
  const readonly = useLocked();

  function onInput(e: JSX.TargetedEvent<HTMLTextAreaElement>) {
    setText(e.currentTarget.value);
  }

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'unset';
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + 'px';
    }
  }, [text]);

  return (
    <StyledPre data-focus={!readonly && hasFocus}>
      <StyledTextarea
        value={text}
        onInput={onInput}
        readOnly={readonly}
        onFocus={onFocus}
        onBlur={blur}
        ref={textAreaRef}
        {...props}
      />
    </StyledPre>
  );
}

const Bar = styled('div', {
  marginTop: '2rem',
  marginBottom: '-0.5rem',
});

export interface SampleEditorProps {
  sampleId: number;
}

export function SampleEditor({ sampleId }: SampleEditorProps): JSX.Element {
  const [hasInput, setHasInput] = useState(true);
  const readonly = useLocked();

  function onHideInputInput(e: JSX.TargetedEvent<HTMLInputElement>) {
    setHasInput(!e.currentTarget.checked);
  }

  return (
    <>
      {!readonly && (
        <Bar>
          <div>
            <input
              id={`hide-${sampleId}-input`}
              type="checkbox"
              onInput={onHideInputInput}
            />
            <label for={`hide-${sampleId}-input`}>입력란 숨기기</label>
          </div>
        </Bar>
      )}
      <Wrap mode={hasInput ? 'both' : 'output-only'}>
        {hasInput && (
          <SectionWrap>
            <Headline>예제 입력 {sampleId}</Headline>
            <GracefulTextarea
              focus={`sample/${sampleId}/in`}
              placeholder="1 2"
            />
          </SectionWrap>
        )}
        <SectionWrap>
          <Headline>예제 출력 {sampleId}</Headline>
          <GracefulTextarea focus={`sample/${sampleId}/out`} placeholder="3" />
        </SectionWrap>
      </Wrap>
    </>
  );
}
