import { Editor } from "@tiptap/react";
import {
  BlockquoteIcon,
  CheckboxIcon,
  ListOrderedIcon,
  ListUnorderedIcon,
} from "@/icons";
import { Button } from "@/primitives/Button";
import styles from "./Toolbar.module.css";

type Props = {
  editor: Editor;
};

export function ToolbarBlock({ editor }: Props) {
  return (
    <>
      <Button
        className={styles.toolbarButton}
        variant="subtle"
        onClick={() => (editor.chain().focus() as any).toggleBulletList().run()}
        disabled={
          !(editor.can().chain().focus() as any).toggleBulletList().run()
        }
        data-active={editor.isActive("bulletList") ? "is-active" : undefined}
        aria-label="Unordered list"
      >
        <ListUnorderedIcon />
      </Button>

      <Button
        className={styles.toolbarButton}
        variant="subtle"
        onClick={() =>
          (editor.chain().focus() as any).toggleOrderedList().run()
        }
        disabled={
          !(editor.can().chain().focus() as any).toggleOrderedList().run()
        }
        data-active={editor.isActive("orderedList") ? "is-active" : undefined}
        aria-label="Ordered list"
      >
        <ListOrderedIcon />
      </Button>

      <Button
        className={styles.toolbarButton}
        variant="subtle"
        onClick={() => (editor.chain().focus() as any).toggleBlockquote().run()}
        disabled={
          !(editor.can().chain().focus() as any).toggleBlockquote().run()
        }
        data-active={editor.isActive("blockquote") ? "is-active" : undefined}
        aria-label="Blockquote"
      >
        <BlockquoteIcon />
      </Button>

      <Button
        className={styles.toolbarButton}
        variant="subtle"
        onClick={() => (editor.chain().focus() as any).toggleTaskList().run()}
        disabled={!(editor.can().chain().focus() as any).toggleTaskList().run()}
        data-active={editor.isActive("taskList") ? "is-active" : undefined}
        aria-label="Task list"
      >
        <CheckboxIcon style={{ width: "16px" }} />
      </Button>
    </>
  );
}
