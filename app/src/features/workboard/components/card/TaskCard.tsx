import { useState } from "react";
import { cn } from "@/lib/utils";
import TaskCardCover from "./TaskCardCover";
import TaskCardLabels from "./TaskCardLabels";
import TaskCardTitle from "./TaskCardTitle";
import TaskCardMeta from "./TaskCardMeta";
import TaskCardDropdown from "./TaskCardDropdown";
import TaskCardDialog from "./TaskCardDialog";
import { useTaskCardDraft } from "./useTaskCardDraft";

type TaskCardProps = {
  title: string;
  coverUrl?: string;
};

function TaskCard({ title, coverUrl }: TaskCardProps) {
  const [open, setOpen] = useState(false);
  // Чернетка живе тут, а не в діалозі: Radix розмонтовує вміст діалогу при
  // закритті, і разом з ним зникали б усі незбережені правки.
  const draft = useTaskCardDraft({ title, coverUrl });

  const hasCover = Boolean(draft.cover);

  return (
    <div className="group/task relative shrink-0 overflow-hidden rounded-lg border border-border bg-card">
      {/* Клікабельна вся картка. Лежить над контентом, а чекбокс і дропдаун
          підняті ще вище, тож вони лишаються самостійними кнопками. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Open "${draft.title}"`}
        className="absolute inset-0 z-20 cursor-pointer rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      />

      <div className="absolute top-1.5 right-1.5 z-30">
        <TaskCardDropdown
          title={draft.title}
          onOpenCard={() => setOpen(true)}
        />
      </div>

      <div className={cn(hasCover && "grid")}>
        {draft.cover && <TaskCardCover src={draft.cover} />}

        <div
          className={cn(
            "flex flex-col gap-2 p-3",
            hasCover &&
              "[grid-area:1/1] self-end bg-linear-to-t from-black/85 via-black/60 to-transparent pt-12 text-white",
          )}
        >
          <TaskCardLabels />
          <TaskCardTitle
            title={draft.title}
            done={draft.done}
            onDoneChange={draft.setDone}
            hasCover={hasCover}
          />
          <TaskCardMeta hasCover={hasCover} />
        </div>
      </div>

      <TaskCardDialog draft={draft} open={open} onOpenChange={setOpen} />
    </div>
  );
}

export default TaskCard;
