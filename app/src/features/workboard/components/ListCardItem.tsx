import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { SquarePen } from "lucide-react";
import { useState } from "react";

const REVEAL_ON_HOVER =
  "opacity-0 transition-opacity group-hover/task:opacity-100 " +
  "group-focus-within/task:opacity-100 max-md:opacity-100";
const REVEAL_CHECKBOX =
  "w-0 opacity-0 transition-[width,opacity] " +
  "group-hover/task:w-4 group-hover/task:opacity-100 " +
  "group-focus-within/task:w-4 group-focus-within/task:opacity-100 " +
  "data-[state=checked]:w-4 data-[state=checked]:opacity-100 " +
  "max-md:w-4 max-md:opacity-100";

type ListCardItemProps = {
  title: string;
  coverUrl?: string;
};

function ListCardItem({ title, coverUrl }: ListCardItemProps) {
  const [checked, setChecked] = useState(false);
  const hasCover = Boolean(coverUrl);

  return (
    <div className="group/task relative overflow-hidden rounded-lg border border-border bg-card">
      {coverUrl && (
        <img src={coverUrl} alt="" className="h-40 w-full object-cover" />
      )}

      <div
        className={cn(
          "flex items-center justify-between gap-2 p-3",
          hasCover &&
            "absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/60 to-transparent pt-12 text-white",
        )}
      >
        <div className="flex items-center gap-2">
          <Checkbox
            checked={checked}
            onCheckedChange={(value) => setChecked(value === true)}
            aria-label={`Mark "${title}" as done`}
            className={cn(REVEAL_CHECKBOX, hasCover && "border-white/70")}
          />
          <span
            className={cn(
              "text-sm transition-colors line-clamp-2",
              checked && "line-through",
              checked && (hasCover ? "text-white/60" : "text-muted-foreground"),
            )}
          >
            {title}
          </span>
        </div>

        <Button
          variant="secondary"
          size="icon"
          aria-label={`Edit "${title}"`}
          className={REVEAL_ON_HOVER}
        >
          <SquarePen />
        </Button>
      </div>
    </div>
  );
}

export default ListCardItem;
