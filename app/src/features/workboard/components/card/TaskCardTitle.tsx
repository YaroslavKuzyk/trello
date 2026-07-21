import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { REVEAL_CHECKBOX, RESERVE_ACTION } from "./constants";

type TaskCardTitleProps = {
  title: string;
  hasCover?: boolean;
};

function TaskCardTitle({ title, hasCover = false }: TaskCardTitleProps) {
  const [checked, setChecked] = useState(false);

  return (
    <div className={cn("flex items-center gap-2", !hasCover && RESERVE_ACTION)}>
      <Checkbox
        checked={checked}
        onCheckedChange={(value) => setChecked(value === true)}
        aria-label={`Mark "${title}" as done`}
        className={cn(REVEAL_CHECKBOX, hasCover && "border-white/70")}
      />
      <span
        className={cn(
          "line-clamp-2 text-sm transition-colors",
          checked && "line-through",
          checked && (hasCover ? "text-white/60" : "text-muted-foreground"),
        )}
      >
        {title}
      </span>
    </div>
  );
}

export default TaskCardTitle;
