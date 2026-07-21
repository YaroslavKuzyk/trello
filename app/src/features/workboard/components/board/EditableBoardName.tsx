import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  MAX_WORKBOARD_NAME_LENGTH,
  DEFAULT_WORKBOARD_NAME,
} from "@/features/workboard/constants";

function EditableBoardName() {
  const [workboardName, setWorkboardName] = useState(DEFAULT_WORKBOARD_NAME);
  const [workboardNameDraft, setWorkboardNameDraft] = useState(
    DEFAULT_WORKBOARD_NAME,
  );
  const [isEditing, setIsEditing] = useState(false);

  const saveWorkboardName = () => {
    if (!workboardNameDraft.trim()) {
      setWorkboardNameDraft(workboardName);
      setIsEditing(false);
      return;
    }
    setWorkboardName(workboardNameDraft.trim());
    setIsEditing(false);
  };

  const cancelWorkboardName = () => {
    setWorkboardNameDraft(workboardName);
    setIsEditing(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      saveWorkboardName();
    }
    if (e.key === "Escape") {
      cancelWorkboardName();
    }
  };

  return (
    <h1 className="inline-flex">
      {isEditing ? (
        <Input
          value={workboardNameDraft}
          onChange={(e) => setWorkboardNameDraft(e.target.value)}
          onBlur={saveWorkboardName}
          onKeyDown={onKeyDown}
          autoFocus
          aria-label="Workboard name"
          className="h-10 text-lg font-semibold"
          maxLength={MAX_WORKBOARD_NAME_LENGTH}
        />
      ) : (
        <Button
          onClick={() => {
            setWorkboardNameDraft(workboardName);
            setIsEditing(true);
          }}
          variant="surface"
          size="lg"
          className="h-10 bg-transparent text-lg font-semibold"
          aria-label={`Rename workboard: ${workboardName}`}
        >
          {workboardName}
        </Button>
      )}
    </h1>
  );
}

export default EditableBoardName;
