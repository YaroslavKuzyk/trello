import { cn } from "@/lib/utils";
import { RESERVE_ACTION } from "./constants";

const LABELS = [
  "bg-green-400",
  "bg-orange-400",
  "bg-red-400",
  "bg-blue-400",
  "bg-yellow-400",
  "bg-purple-400",
];

function TaskCardLabels() {
  return (
    <div className={cn("flex flex-wrap gap-1", RESERVE_ACTION)} aria-hidden>
      {LABELS.map((color) => (
        <div key={color} className={cn("h-2 w-11 rounded-2xl", color)} />
      ))}
    </div>
  );
}

export default TaskCardLabels;
