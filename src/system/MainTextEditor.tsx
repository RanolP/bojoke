import { mathPlugin } from '@benrbray/prosemirror-math';
import { RemirrorContentType } from '@remirror/core';
import { Schema } from '@remirror/pm/model';
import { useRemirror, Remirror } from '@remirror/react';
import { FiEdit2, FiEdit3 } from 'react-icons/fi';
import {
  BlockquoteExtension,
  BoldExtension,
  BulletListExtension,
  CodeBlockExtension,
  CodeExtension,
  FontSizeExtension,
  HistoryExtension,
  IframeExtension,
  ImageExtension,
  ItalicExtension,
  LinkExtension,
  NodeFormattingExtension,
  OrderedListExtension,
  PlaceholderExtension,
  StrikeExtension,
  SubExtension,
  SupExtension,
  TableExtension,
  TextColorExtension,
  UnderlineExtension,
} from 'remirror/extensions';
import { Focus } from '../atoms/focus';
import { useGlobalFocus } from '../hooks/use-global-focus';
import { useLocked } from '../hooks/useLocked';
import { RemirrorContent } from '../lib/vendors/remirror/content';
import { MathInlineExtension } from '../lib/vendors/remirror/extension-math/math-inline-extension';
import { MathSelectExtension } from '../lib/vendors/remirror/extension-math/math-select-extension';
import { css, styled } from '../stitches.config';

const Wrap = styled('div', {
  position: 'relative',
});

const Editor = css({
  boxShadow: 'none !important',
  overflowY: 'hidden !important',
  minHeight: 'unset !important',
  fontSize: 'medium',
  lineHeight: '30px',
  marginLeft: '-16px',
  paddingBottom: '4px',
  fontFamily: '$default',
});

const EditableIcon = styled(FiEdit3, {
  position: 'absolute',
  left: '-16px',
  top: '28px',
  transform: 'translate(-100%, 50%)',
  paddingRight: '4px',
  borderLeft: 'none',
  border: '1px solid black',
  borderImage:
    'linear-gradient(to right, transparent 75%, black 75%, black 100%) 1',
  fontSize: '1.2rem',
});

export interface MainTextEditorProps {
  id: Focus;
  placeholder: RemirrorContent;
}

export function MainTextEditor({
  id,
  placeholder,
}: MainTextEditorProps): JSX.Element {
  const readonly = useLocked();

  // TODO: Using positioner extension for text actions
  const { manager, state } = useRemirror({
    extensions: () =>
      [
        new PlaceholderExtension({ placeholder }),

        new BlockquoteExtension(),
        new BoldExtension(),
        new CodeBlockExtension(),
        new CodeExtension(),
        new IframeExtension(),
        new FontSizeExtension(),
        new HistoryExtension(),
        new ImageExtension(),
        new ItalicExtension(),
        new LinkExtension(),
        new BulletListExtension(),
        new OrderedListExtension(),
        new NodeFormattingExtension(),
        new StrikeExtension(),
        new SubExtension(),
        new SupExtension(),
        new TableExtension(),
        new TextColorExtension(),
        new UnderlineExtension(),

        // TODO: new MathBlockExtension(),
        new MathInlineExtension(),
        new MathSelectExtension(),
      ] as any,
    plugins: [mathPlugin],
    stringHandler: 'html',
  });

  const { onFocus } = useGlobalFocus(id, manager.store);

  return (
    <Wrap className="remirror-theme">
      {!readonly && <EditableIcon />}
      <Remirror
        classNames={[Editor()]}
        manager={manager}
        initialContent={state}
        onFocus={onFocus}
        editable={!readonly}
      />
    </Wrap>
  );
}
