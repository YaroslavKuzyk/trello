import { Textarea } from "@/components/ui/textarea";
import { AlignLeft } from "lucide-react";
import TaskCardDialogSection from "./TaskCardDialogSection";
import type { TaskCardDraft } from "./useTaskCardDraft";

type TaskCardDialogContentProps = {
  draft: TaskCardDraft;
  canEdit?: boolean;
};

function TaskCardDialogContent({ draft, canEdit }: TaskCardDialogContentProps) {
  return (
    <TaskCardDialogSection
      title="Content"
      icon={<AlignLeft className="size-4" />}
      canEdit={canEdit}
    >
      {(editing) =>
        editing ? (
          <div className="flex flex-col gap-2">
            <Textarea
              value={draft.content}
              onChange={(event) => draft.setContent(event.target.value)}
              rows={6}
              placeholder="Add a more detailed description…"
              aria-label="Card content"
              autoFocus
            />
            <p className="text-xs text-muted-foreground">
              Plain text for now — this becomes a Tiptap editor later.
            </p>
          </div>
        ) : draft.content ? (
          <p className="text-sm whitespace-pre-line text-muted-foreground">
            {draft.content}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground italic">No content yet.</p>
        )
      }
    </TaskCardDialogSection>
  );
}

export default TaskCardDialogContent;
