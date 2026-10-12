import { Extension } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    paragraphLineHeight: {
      setParagraphLineHeight: (lineHeight: string) => ReturnType
      unsetParagraphLineHeight: () => ReturnType
    }
  }
}

export const ParagraphLineHeight = Extension.create({
  name: 'paragraphLineHeight',

  addOptions() {
    return { types: ['paragraph', 'heading'] }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: null,
            parseHTML: (element) => element.style.lineHeight || null,
            renderHTML: (attributes) =>
              attributes.lineHeight
                ? { style: `line-height: ${attributes.lineHeight}` }
                : {},
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setParagraphLineHeight:
        (lineHeight) =>
        ({ commands }) =>
          this.options.types.every((type: string) =>
            commands.updateAttributes(type, { lineHeight })
          ),
      unsetParagraphLineHeight:
        () =>
        ({ commands }) =>
          this.options.types.every((type: string) =>
            commands.resetAttributes(type, 'lineHeight')
          ),
    }
  },
})
