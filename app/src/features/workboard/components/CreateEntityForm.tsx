import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import useClickOutside from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";
import { useState, useCallback } from "react";

// Форма створення списку чи картки. Тексти передає батько, `variant` впливає
// лише на оформлення: список виглядає як колонка, картка — як картка в ній.
function CreateEntityForm({
  variant,
  placeholder,
  ariaLabel,
  submitLabel,
  maxTitleLength,
  onCancel,
}: {
  variant: "list" | "card";
  placeholder: string;
  ariaLabel: string;
  submitLabel: string;
  maxTitleLength?: number;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState("");

  const cancelCreating = useCallback(() => {
    setTitle("");
    onCancel();
  }, [onCancel]);

  const formRef = useClickOutside<HTMLFormElement>(true, cancelCreating);

  const submitEntity = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) {
      return;
    }
    // TODO: створення сутності, коли з'явиться джерело даних
    setTitle("");
  };

  return (
    <form
      ref={formRef}
      onSubmit={submitEntity}
      onKeyDown={(e) => e.key === "Escape" && cancelCreating()}
      className={cn(
        "flex w-full flex-col gap-2 border border-border p-3",
        variant === "list" ? "rounded-xl bg-secondary" : "rounded-lg bg-card",
      )}
    >
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        maxLength={maxTitleLength}
        autoFocus
      />
      <div className="flex items-center gap-2">
        <Button type="submit" disabled={!title.trim()}>
          {submitLabel}
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

export default CreateEntityForm;
