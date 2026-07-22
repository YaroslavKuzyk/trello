import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateEntityForm from "@/features/workboard/components/CreateEntityForm";
import { MAX_CARD_NAME_LENGTH } from "./constants";

function CreateCard() {
  const [isCreating, setIsCreating] = useState(false);

  if (!isCreating) {
    return (
      <Button
        variant="ghost"
        size="lg"
        className="justify-start"
        onClick={() => setIsCreating(true)}
      >
        <Plus />
        Add a card
      </Button>
    );
  }

  return (
    <CreateEntityForm
      variant="card"
      placeholder="Enter a title for this card..."
      ariaLabel="Card title"
      submitLabel="Add card"
      maxTitleLength={MAX_CARD_NAME_LENGTH}
      onCancel={() => setIsCreating(false)}
    />
  );
}

export default CreateCard;
