import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const DEFAULT_NAME = "New Workboard";
const MAX_NAME_LENGTH = 50;

function EditableWorkboardName() {
  const [workboardName, setWorkboardName] = useState(DEFAULT_NAME);
  const [workboardNameDraft, setWorkboardNameDraft] = useState(DEFAULT_NAME);
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
          className="h-9 font-medium"
          maxLength={MAX_NAME_LENGTH}
        />
      ) : (
        <Button
          onClick={() => {
            setWorkboardNameDraft(workboardName);
            setIsEditing(true);
          }}
          variant="ghost"
          size="lg"
          className="cursor-pointer font-medium"
          aria-label={`Rename workboard: ${workboardName}`}
        >
          {workboardName}
        </Button>
      )}
    </h1>
  );
}

export default EditableWorkboardName;
