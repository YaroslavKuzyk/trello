import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Plus, SquareCheck, X } from "lucide-react";
import TaskCardDialogSection from "./TaskCardDialogSection";
import type { TaskCardDraft } from "./useTaskCardDraft";

type TaskCardDialogChecklistProps = {
  draft: TaskCardDraft;
  canEdit?: boolean;
};

function TaskCardDialogChecklist({
  draft,
  canEdit,
}: TaskCardDialogChecklistProps) {
  const id = useId();
  const [item, setItem] = useState("");

  const items = draft.checklist;
  const doneCount = items.filter((entry) => entry.done).length;
  const progress = items.length ? (doneCount / items.length) * 100 : 0;

  function addItem() {
    const label = item.trim();
    if (!label) return;

    draft.addChecklistItem(label);
    setItem("");
  }

  // Секція не має власного <form>, тож Enter обробляємо руками.
  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key !== "Enter") return;

    event.preventDefault();
    addItem();
  }

  return (
    <TaskCardDialogSection
      title="Checklist"
      icon={<SquareCheck className="size-4" />}
      canEdit={canEdit}
      meta={
        <span className="text-xs text-muted-foreground">
          {doneCount}/{items.length}
        </span>
      }
    >
      {(editing) => (
        <div className="flex flex-col gap-3">
          <div
            className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={doneCount}
            aria-valuemin={0}
            aria-valuemax={items.length || 1}
            aria-label="Checklist progress"
          >
            <div
              className="h-full rounded-full bg-primary transition-[width]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {items.length ? (
            <ul className="flex flex-col gap-2">
              {items.map((entry) => (
                <li key={entry.id} className="flex items-center gap-3">
                  <Checkbox
                    id={`${id}-${entry.id}`}
                    checked={entry.done}
                    disabled={!editing}
                    onCheckedChange={(value) =>
                      draft.toggleChecklistItem(entry.id, value === true)
                    }
                  />
                  <Label
                    htmlFor={`${id}-${entry.id}`}
                    className={cn(
                      "flex-1 font-normal",
                      entry.done && "text-muted-foreground line-through",
                    )}
                  >
                    {entry.label}
                  </Label>
                  {editing && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      aria-label={`Remove "${entry.label}"`}
                      onClick={() => draft.removeChecklistItem(entry.id)}
                    >
                      <X />
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              No items yet.
            </p>
          )}

          {editing && (
            <div className="flex items-center gap-2">
              <Label htmlFor={`${id}-new`} className="sr-only">
                New checklist item
              </Label>
              <Input
                id={`${id}-new`}
                value={item}
                onChange={(event) => setItem(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add an item"
              />
              <Button
                type="button"
                variant="outline"
                disabled={!item.trim()}
                onClick={addItem}
              >
                <Plus />
                Add
              </Button>
            </div>
          )}
        </div>
      )}
    </TaskCardDialogSection>
  );
}

export default TaskCardDialogChecklist;
