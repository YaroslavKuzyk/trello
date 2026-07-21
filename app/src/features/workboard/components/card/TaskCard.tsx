import { cn } from "@/lib/utils";
import TaskCardCover from "./TaskCardCover";
import TaskCardLabels from "./TaskCardLabels";
import TaskCardTitle from "./TaskCardTitle";
import TaskCardMeta from "./TaskCardMeta";
import TaskCardDropdown from "./TaskCardDropdown";

type TaskCardProps = {
  title: string;
  coverUrl?: string;
};

function TaskCard({ title, coverUrl }: TaskCardProps) {
  const hasCover = Boolean(coverUrl);

  return (
    <div className="group/task relative overflow-hidden rounded-lg border border-border bg-card">
      <div className="absolute top-1.5 right-1.5 z-10">
        <TaskCardDropdown title={title} />
      </div>

      <div className={cn(hasCover && "grid")}>
        {coverUrl && <TaskCardCover src={coverUrl} />}

        <div
          className={cn(
            "flex flex-col gap-2 p-3",
            hasCover &&
              "[grid-area:1/1] self-end bg-linear-to-t from-black/85 via-black/60 to-transparent pt-12 text-white",
          )}
        >
          <TaskCardLabels />
          <TaskCardTitle title={title} hasCover={hasCover} />
          <TaskCardMeta hasCover={hasCover} />
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
