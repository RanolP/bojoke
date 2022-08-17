import { mathPlugin, mathSelectPlugin } from '@benrbray/prosemirror-math';
import { AnyExtension } from '@remirror/core';
import { Remirror, useRemirror } from '@remirror/react';
import { FiEdit3 } from 'react-icons/fi';
import { PlaceholderExtension } from 'remirror/extensions';
import { useGlobalFocus } from '../hooks/use-global-focus';
import { useLocked } from '../hooks/useLocked';
import { MathInlineExtension } from '../lib/vendors/remirror/extension-math/math-inline-extension';
import { MathSelectExtension } from '../lib/vendors/remirror/extension-math/math-select-extension';
import { css, styled } from '../stitches.config';

const Heading = styled('h1', {
  margin: 'calc(40px - 2 * var(--rmr-space-3)) 0 0',
  fontSize: '28px',
  lineHeight: '35px',
  position: 'relative',
});

const Editor = css({
  boxShadow: 'none !important',
  overflowY: 'hidden !important',
  display: 'inline-block',
  width: '100%',
  minHeight: 'unset !important',
  marginLeft: '-16px',
  '& .math-render': {
    fontSize: '109%',
  },
  overflowX: 'hidden',
  maxWidth: '100%',
  maxHeight: '100%',
});

const EditableIcon = styled(FiEdit3, {
  position: 'absolute',
  left: '-16px',
  top: 'calc(50% + 8px)',
  transform: 'translate(-100%, -50%)',
  paddingRight: '4px',
  borderLeft: 'none',
  border: '1px solid black',
  borderImage:
    'linear-gradient(to right, transparent 75%, black 75%, black 100%) 1',
  fontSize: '1.2rem',
});

export function ProblemTitleEditor(): JSX.Element {
  const readonly = useLocked();
  const { manager, state } = useRemirror({
    extensions: () =>
      [
        new MathInlineExtension(),
        new MathSelectExtension(),
        new PlaceholderExtension('A+B'),
      ] as any,
    plugins: [mathPlugin],
    content: {
      type: 'paragraph',
      content: [
        {
          type: 'math-inline',
          content: [
            {
              type: 'text',
              text: String.raw`\text{Con} + \cfrac{\text{tin}}{\text{ued} + \cfrac{\text{Frac}}{\text{tions}}}`,
            },
          ],
        },
      ],
    },
    stringHandler: 'html',
  });

  const { onFocus } = useGlobalFocus('title', manager.store);

  return (
    <Heading className="remirror-theme">
      {!readonly && <EditableIcon />}
      <Remirror
        classNames={[Editor()]}
        manager={manager}
        initialContent={state}
        onFocus={onFocus}
        editable={!readonly}
      />
    </Heading>
  );
}
