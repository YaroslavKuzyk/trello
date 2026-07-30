import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { REVEAL_CHECKBOX, RESERVE_ACTION } from "./constants";

type TaskCardTitleProps = {
  title: string;
  done: boolean;
  onDoneChange: (done: boolean) => void;
  hasCover?: boolean;
};

function TaskCardTitle({
  title,
  done,
  onDoneChange,
  hasCover = false,
}: TaskCardTitleProps) {
  return (
    <div className={cn("flex items-center gap-2", !hasCover && RESERVE_ACTION)}>
      <Checkbox
        checked={done}
        onCheckedChange={(value) => onDoneChange(value === true)}
        aria-label={`Mark "${title}" as done`}
        className={cn(
          "relative z-30",
          REVEAL_CHECKBOX,
          hasCover && "border-white/70",
        )}
      />
      <span
        className={cn(
          "line-clamp-2 text-sm transition-colors",
          done && "line-through",
          done && (hasCover ? "text-white/60" : "text-muted-foreground"),
        )}
      >
        {title}
      </span>
    </div>
  );
}

export default TaskCardTitle;
