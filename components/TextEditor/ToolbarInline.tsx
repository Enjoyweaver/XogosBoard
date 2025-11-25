import { Editor } from "@tiptap/react";
import { BoldIcon, ItalicIcon, StrikethroughIcon } from "@/icons";
import { Button } from "@/primitives/Button";
import styles from "./Toolbar.module.css";

type Props = {
  editor: Editor;
};

export function ToolbarInline({ editor }: Props) {
  return (
    <>
      <Button
        variant="subtle"
        className={styles.toolbarButton}
        onClick={() => (editor.chain().focus() as any).toggleBold().run()}
        disabled={!(editor.can().chain().focus() as any).toggleBold().run()}
        data-active={editor.isActive("bold") ? "is-active" : undefined}
        aria-label="Bold"
      >
        <BoldIcon />
      </Button>

      <Button
        variant="subtle"
        className={styles.toolbarButton}
        onClick={() => (editor.chain().focus() as any).toggleItalic().run()}
        disabled={!(editor.can().chain().focus() as any).toggleItalic().run()}
        data-active={editor.isActive("italic") ? "is-active" : undefined}
        aria-label="Italic"
      >
        <ItalicIcon />
      </Button>

      <Button
        variant="subtle"
        className={styles.toolbarButton}
        onClick={() => (editor.chain().focus() as any).toggleStrike().run()}
        disabled={!(editor.can().chain().focus() as any).toggleStrike().run()}
        data-active={editor.isActive("strike") ? "is-active" : undefined}
        aria-label="Strikethrough"
      >
        <StrikethroughIcon />
      </Button>
    </>
  );
}
