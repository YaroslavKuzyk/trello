import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { useState, useCallback } from "react";
import {
  MAX_LIST_NAME_LENGTH,
  LIST_WIDTH,
} from "@/features/workboard/constants";
import useClickOutside from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";

function CreateList() {
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");

  const cancelCreating = useCallback(() => {
    setTitle("");
    setIsCreating(false);
  }, []);

  const formRef = useClickOutside<HTMLFormElement>(isCreating, cancelCreating);

  const submitList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) {
      return;
    }
    // TODO: створення списку, коли з'явиться джерело даних
    setTitle("");
  };

  if (!isCreating) {
    return (
      <Button
        variant="secondary"
        className={cn(
          "h-auto shrink-0 justify-start rounded-xl border border-dashed border-border px-4 py-3 text-muted-foreground hover:text-foreground",
          LIST_WIDTH,
        )}
        onClick={() => setIsCreating(true)}
      >
        <Plus />
        Add a list
      </Button>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={submitList}
      onKeyDown={(e) => e.key === "Escape" && cancelCreating()}
      className={cn(
        "flex shrink-0 flex-col gap-2 rounded-xl border border-border bg-secondary p-3",
        LIST_WIDTH,
      )}
    >
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter list title..."
        aria-label="List title"
        maxLength={MAX_LIST_NAME_LENGTH}
        autoFocus
      />
      <div className="flex items-center gap-2">
        <Button type="submit" disabled={!title.trim()}>
          Add list
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={cancelCreating}
          aria-label="Cancel"
        >
          <X />
        </Button>
      </div>
    </form>
  );
}

export default CreateList;
