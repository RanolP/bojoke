import { mathPlugin, mathSelectPlugin } from '@benrbray/prosemirror-math';
import { Remirror, useRemirror } from '@remirror/react';
import { PlaceholderExtension } from 'remirror/extensions';
import { MathInlineExtension } from '../lib/vendors/remirror/extension-math/math-inline-extension';
import { MathSelectExtension } from '../lib/vendors/remirror/extension-math/math-select-extension';
import { css, styled } from '../stitches.config';

const Heading = styled('h1', {
  margin: 'calc(40px - var(--rmr-space-3)) 0 0',
  fontSize: '28px',
  lineHeight: '35px',
});

const Editor = css({
  boxShadow: 'none !important',
  overflowY: 'hidden !important',
  display: 'inline-block',
  minHeight: 'unset !important',
  '& .math-render': {
    fontSize: '109%',
  },
});

export function ProblemTitleEditor(): JSX.Element {
  const { manager, state } = useRemirror({
    extensions: () => [
      new MathInlineExtension(),
      new MathSelectExtension(),
      new PlaceholderExtension('A+B'),
    ],
    plugins: [mathPlugin],
    content: {
      type: 'paragraph',
      content: [
        {
          type: 'math-inline',
          content: [
            {
              type: 'text',
              text: String.raw`\mathrm{Con + \frac{tin}{ued + \frac{Frac}{tions}}}`,
            },
          ],
        },
      ],
    },
    stringHandler: 'html',
  });

  return (
    <Heading className="remirror-theme">
      <Remirror
        classNames={[Editor()]}
        manager={manager}
        initialContent={state}
        onChange={({ state }) => {
          console.log(JSON.stringify(state.doc.content));
        }}
      />
    </Heading>
  );
}
