import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Link2, Paperclip, Plus, X } from "lucide-react";
import TaskCardDialogSection from "./TaskCardDialogSection";
import type { TaskCardDraft } from "./useTaskCardDraft";

type TaskCardDialogMaterialsProps = {
  draft: TaskCardDraft;
  canEdit?: boolean;
};

function TaskCardDialogMaterials({
  draft,
  canEdit,
}: TaskCardDialogMaterialsProps) {
  const id = useId();
  const [link, setLink] = useState("");

  function addMaterial() {
    const name = link.trim();
    if (!name) return;

    draft.addMaterial(name);
    setLink("");
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key !== "Enter") return;

    event.preventDefault();
    addMaterial();
  }

  return (
    <TaskCardDialogSection
      title="Materials"
      icon={<Paperclip className="size-4" />}
      canEdit={canEdit}
    >
      {(editing) => (
        <div className="flex flex-col gap-3">
          {draft.materials.length ? (
            <ul className="flex flex-col gap-2">
              {draft.materials.map((material) => (
                <li
                  key={material.id}
                  className="flex items-center gap-3 rounded-lg border border-border p-2"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    {material.type === "link" ? (
                      <Link2 className="size-4" />
                    ) : (
                      <FileText className="size-4" />
                    )}
                  </span>

                  <div className="flex min-w-0 flex-col">
                    <span className="truncate text-sm">{material.name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {material.meta}
                    </span>
                  </div>

                  {editing && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      className="ml-auto"
                      aria-label={`Remove "${material.name}"`}
                      onClick={() => draft.removeMaterial(material.id)}
                    >
                      <X />
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-lg border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
              No materials attached yet.
            </p>
          )}

          {editing && (
            <div className="flex items-center gap-2">
              <Label htmlFor={`${id}-new`} className="sr-only">
                New material link
              </Label>
              <Input
                id={`${id}-new`}
                value={link}
                onChange={(event) => setLink(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Paste a link"
              />
              <Button
                type="button"
                variant="outline"
                disabled={!link.trim()}
                onClick={addMaterial}
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

export default TaskCardDialogMaterials;
