import { globalCss } from '../../../../stitches.config';

export const mathSelectStyle = globalCss({
  '.math-src .ProseMirror': {
    boxShadow: 'none !important',
    padding: 0,
  },
  '.math-node.ProseMirror-selectednode': {
    boxShadow: 'var(--rmr-color-outline) 0px 0px 0px 0.2em',
    borderRadius: 'var(--rmr-radius-border)',
    padding: 'var(--rmr-space-3)',
  },
});
