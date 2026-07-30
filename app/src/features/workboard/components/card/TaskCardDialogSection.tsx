import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Pencil } from "lucide-react";
import { DIALOG_SECTION_TITLE, REVEAL_ON_SECTION_HOVER } from "./constants";

type TaskCardDialogSectionProps = {
  title: string;
  icon: React.ReactNode;
  canEdit?: boolean;
  meta?: React.ReactNode;
  children: (editing: boolean) => React.ReactNode;
};

function TaskCardDialogSection({
  title,
  icon,
  canEdit = false,
  meta,
  children,
}: TaskCardDialogSectionProps) {
  const headingId = useId();
  const [editing, setEditing] = useState(false);

  return (
    <section
      aria-labelledby={headingId}
      className="group/section -mx-2 flex flex-col gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-muted/40"
    >
      <div className="flex min-h-7 items-center gap-2">
        <h3 id={headingId} className={DIALOG_SECTION_TITLE}>
          {icon}
          {title}
        </h3>

        {meta && <div className="ml-auto">{meta}</div>}

        {canEdit && (
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            className={cn(
              !meta && "ml-auto",
              !editing && REVEAL_ON_SECTION_HOVER,
            )}
            aria-label={editing ? `Done editing ${title}` : `Edit ${title}`}
            onClick={() => setEditing((current) => !current)}
          >
            {editing ? <Check /> : <Pencil />}
          </Button>
        )}
      </div>

      {children(editing)}
    </section>
  );
}

export default TaskCardDialogSection;
