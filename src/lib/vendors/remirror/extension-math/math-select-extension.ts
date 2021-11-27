import {
  ApplySchemaAttributes,
  extension,
  MarkExtension,
  MarkExtensionSpec,
  MarkSpecOverride,
} from '@remirror/core';

@extension({})
export class MathSelectExtension extends MarkExtension {
  get name(): 'math_select' {
    return 'math_select';
  }
  createMarkSpec(
    extra: ApplySchemaAttributes,
    override: MarkSpecOverride
  ): MarkExtensionSpec {
    return {
      ...override,
      attrs: extra.defaults(),
      toDOM() {
        return ['math-select', 0];
      },
      parseDOM: [{ tag: 'math-select' }],
    };
  }
}
