import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import {
  LIST_WIDTH,
  MAX_LIST_NAME_LENGTH,
} from "@/features/workboard/constants";
import { cn } from "@/lib/utils";
import CreateEntityForm from "@/features/workboard/components/CreateEntityForm";

function CreateList() {
  const [isCreating, setIsCreating] = useState(false);

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
    <div className={cn("shrink-0", LIST_WIDTH)}>
      <CreateEntityForm
        variant="list"
        placeholder="Enter list title..."
        ariaLabel="List title"
        submitLabel="Add list"
        maxTitleLength={MAX_LIST_NAME_LENGTH}
        onCancel={() => setIsCreating(false)}
      />
    </div>
  );
}

export default CreateList;
