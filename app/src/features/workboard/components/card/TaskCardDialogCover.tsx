import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Image, Pencil, Trash2 } from "lucide-react";
import { REVEAL_ON_SECTION_HOVER } from "./constants";
import type { TaskCardDraft } from "./useTaskCardDraft";

type TaskCardDialogCoverProps = {
  draft: TaskCardDraft;
  canEdit?: boolean;
};

function TaskCardDialogCover({ draft, canEdit }: TaskCardDialogCoverProps) {
  const [editing, setEditing] = useState(false);
  const cover = draft.cover;

  return (
    <div className="group/section relative h-40 shrink-0 bg-muted">
      {cover ? (
        <img src={cover} alt="" className="size-full object-cover" />
      ) : (
        <div className="flex size-full items-center justify-center gap-2 text-sm text-muted-foreground">
          <Image className="size-4" />
          No cover yet
        </div>
      )}

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-linear-to-b from-black/40 to-transparent"
        aria-hidden
      />

      {canEdit && (
        <>
          {/* Правий верхній кут зайнятий хрестиком DialogContent
              (right-2 + size-7), тож олівець стає ліворуч від нього. */}
          <Button
            type="button"
            variant="secondary"
            size="icon-xs"
            className={cn(
              "absolute top-2 right-11",
              !editing && REVEAL_ON_SECTION_HOVER,
            )}
            aria-label={editing ? "Done editing cover" : "Edit cover"}
            onClick={() => setEditing((current) => !current)}
          >
            {editing ? <Check /> : <Pencil />}
          </Button>

          {editing && (
            <div className="absolute bottom-2 left-2 flex gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={draft.changeCover}
              >
                <Image />
                {cover ? "Change cover" : "Add cover"}
              </Button>
              {cover && (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={draft.removeCover}
                >
                  <Trash2 />
                  Remove
                </Button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default TaskCardDialogCover;
