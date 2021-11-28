import {
  createMathView,
  makeInlineMathInputRule,
  MathView,
  REGEX_INLINE_MATH_DOLLARS,
} from '@benrbray/prosemirror-math';
import {
  ApplySchemaAttributes,
  EditorView,
  extension,
  ExtensionTag,
  InputRule,
  joinStyles,
  LEAF_NODE_REPLACING_CHARACTER,
  NodeExtension,
  NodeExtensionSpec,
  nodeInputRule,
  NodeSpecOverride,
  NodeViewMethod,
  ProsemirrorNode,
} from '@remirror/core';

export interface MathInlineOptions {}

@extension({})
export class MathInlineExtension extends NodeExtension {
  get name(): 'math-inline' {
    return 'math-inline';
  }

  createTags(): Array<ExtensionTag[keyof ExtensionTag]> {
    return [ExtensionTag.InlineNode, ExtensionTag.ExcludeInputRules];
  }

  createNodeSpec(
    extra: ApplySchemaAttributes,
    override: NodeSpecOverride
  ): NodeExtensionSpec {
    return {
      group: 'inline math',
      content: 'text*',
      inline: true,
      atom: true,
      ...override,
      attrs: extra.defaults(),
      parseDOM: [{ tag: 'math-inline' }, ...(override.parseDOM ?? [])],
      toDOM: () => {
        return ['math-inline', { class: 'math-node' }, 0];
      },
    };
  }

  createInputRules(): InputRule[] {
    return [makeInlineMathInputRule(REGEX_INLINE_MATH_DOLLARS, this.type)];
  }

  createNodeViews(): NodeViewMethod | Record<string, NodeViewMethod> {
    return createMathView(true);
  }
}
