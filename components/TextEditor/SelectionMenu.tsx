import { BubbleMenu, Editor } from "@tiptap/react";
import { ToolbarInlineAdvanced } from "./TextInlineAdvanced";
import { ToolbarInline } from "./ToolbarInline";
import { ToolbarThread } from "./ToolbarThread";
import styles from "./TextEditor.module.css";

type Props = {
  editor: Editor;
};

export function SelectionMenu({ editor }: Props) {
  return (
    <BubbleMenu editor={editor} tippyOptions={{ zIndex: 99 }}>
      {shouldShowBubbleMenu(editor) ? (
        <div className={styles.bubbleMenuWrapper}>
          <ToolbarInline editor={editor} />
          <ToolbarInlineAdvanced editor={editor} />
          <ToolbarThread editor={editor} />
        </div>
      ) : null}
    </BubbleMenu>
  );
}

export function shouldShowBubbleMenu(editor: Editor) {
  // Show bubble menu if text is selected and editor is editable
  const { from, to } = editor.state.selection;
  const isTextSelected = from !== to;
  return isTextSelected && editor.isEditable;
}
