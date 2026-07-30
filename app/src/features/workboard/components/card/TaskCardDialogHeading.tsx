import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Check, Pencil } from "lucide-react";
import { REVEAL_ON_SECTION_HOVER } from "./constants";
import type { TaskCardDraft } from "./useTaskCardDraft";

type TaskCardDialogHeadingProps = {
  draft: TaskCardDraft;
  canEdit?: boolean;
};

const TITLE_ROW = "flex shrink-0 items-center";

function TaskCardDialogHeading({
  draft,
  canEdit = false,
}: TaskCardDialogHeadingProps) {
  const inputId = useId();
  const [editing, setEditing] = useState(false);

  return (
    <div className="group/section -mx-2 flex items-start gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted/40">
      <span className={cn(TITLE_ROW, editing ? "h-9" : "h-7")}>
        <Checkbox
          checked={draft.done}
          disabled={!editing}
          onCheckedChange={(state) => draft.setDone(state === true)}
          aria-label={`Mark "${draft.title}" as done`}
        />
      </span>

      {editing ? (
        <>
          {/* Radix посилається на DialogTitle через aria-labelledby, тож він
              має існувати і поки назву редагують. */}
          <DialogTitle className="sr-only">{draft.title}</DialogTitle>
          <Label htmlFor={inputId} className="sr-only">
            Card title
          </Label>
          <Input
            id={inputId}
            value={draft.title}
            onChange={(event) => draft.setTitle(event.target.value)}
            className="h-9 font-medium md:text-base"
            autoFocus
          />
        </>
      ) : (
        <DialogTitle
          className={cn(
            "flex-1 py-1.5 text-base transition-colors",
            draft.done && "text-muted-foreground line-through",
          )}
        >
          {draft.title}
        </DialogTitle>
      )}

      {canEdit && (
        <span className={cn(TITLE_ROW, editing ? "h-9" : "h-7")}>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            className={cn(!editing && REVEAL_ON_SECTION_HOVER)}
            aria-label={editing ? "Done editing title" : "Edit title"}
            onClick={() => setEditing((current) => !current)}
          >
            {editing ? <Check /> : <Pencil />}
          </Button>
        </span>
      )}
    </div>
  );
}

export default TaskCardDialogHeading;
