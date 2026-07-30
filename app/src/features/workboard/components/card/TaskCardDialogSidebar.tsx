import { useId } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CalendarDays, Tag, UserRound } from "lucide-react";
import TaskCardDialogSection from "./TaskCardDialogSection";
import type { TaskCardDraft } from "./useTaskCardDraft";

const MEMBERS = [
  { value: "shadcn", label: "shadcn", image: "https://github.com/shadcn.png" },
  {
    value: "maxleiter",
    label: "Max Leiter",
    image: "https://github.com/maxleiter.png",
  },
  {
    value: "evilrabbit",
    label: "Evil Rabbit",
    image: "https://github.com/evilrabbit.png",
  },
];

const TAGS = [
  { value: "design", label: "Design", color: "bg-green-400" },
  { value: "bug", label: "Bug", color: "bg-red-400" },
  { value: "feature", label: "Feature", color: "bg-blue-400" },
  { value: "research", label: "Research", color: "bg-purple-400" },
  { value: "docs", label: "Docs", color: "bg-yellow-400" },
];

// Значення з <input type="date"> — це рядок "YYYY-MM-DD" у локальному часі,
// тож збираємо дату вручну: new Date(рядок) розпарсив би її як UTC і на
// від'ємних зсувах з'їдав би день.
function formatDate(value: string) {
  if (!value) return null;

  const [year, month, day] = value.split("-").map(Number);

  return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
  });
}

type TaskCardDialogSidebarProps = {
  draft: TaskCardDraft;
  canEdit?: boolean;
};

function TaskCardDialogSidebar({ draft, canEdit }: TaskCardDialogSidebarProps) {
  const id = useId();

  const assignedMember = MEMBERS.find(
    (member) => member.value === draft.assignee,
  );
  const selectedTags = TAGS.filter((tag) => draft.tags.includes(tag.value));
  const dateRange = [formatDate(draft.startDate), formatDate(draft.dueDate)]
    .filter(Boolean)
    .join(" – ");

  return (
    <div className="flex flex-col gap-4 md:w-64 md:shrink-0">
      <TaskCardDialogSection
        title="Assignee"
        icon={<UserRound className="size-4" />}
        canEdit={canEdit}
      >
        {(editing) =>
          editing ? (
            <>
              <Label htmlFor={`${id}-assignee`} className="sr-only">
                Assignee
              </Label>
              <Select value={draft.assignee} onValueChange={draft.setAssignee}>
                <SelectTrigger id={`${id}-assignee`} className="w-full">
                  <SelectValue placeholder="Unassigned" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {MEMBERS.map((member) => (
                      <SelectItem key={member.value} value={member.value}>
                        <Avatar size="sm">
                          <AvatarImage src={member.image} alt="" />
                          <AvatarFallback>
                            {member.label.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {member.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </>
          ) : assignedMember ? (
            <div className="flex items-center gap-2 text-sm">
              <Avatar size="sm">
                <AvatarImage src={assignedMember.image} alt="" />
                <AvatarFallback>
                  {assignedMember.label.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {assignedMember.label}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">Unassigned</p>
          )
        }
      </TaskCardDialogSection>

      <TaskCardDialogSection
        title="Due date"
        icon={<CalendarDays className="size-4" />}
        canEdit={canEdit}
      >
        {(editing) =>
          editing ? (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={`${id}-start-date`}>Start</Label>
                <Input
                  id={`${id}-start-date`}
                  type="date"
                  value={draft.startDate}
                  max={draft.dueDate || undefined}
                  onChange={(event) => draft.setStartDate(event.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={`${id}-due-date`}>Due</Label>
                <Input
                  id={`${id}-due-date`}
                  type="date"
                  value={draft.dueDate}
                  min={draft.startDate || undefined}
                  onChange={(event) => draft.setDueDate(event.target.value)}
                />
              </div>
            </div>
          ) : dateRange ? (
            <p className="text-sm">{dateRange}</p>
          ) : (
            <p className="text-sm text-muted-foreground italic">No dates set.</p>
          )
        }
      </TaskCardDialogSection>

      <TaskCardDialogSection
        title="Tags"
        icon={<Tag className="size-4" />}
        canEdit={canEdit}
      >
        {(editing) =>
          editing ? (
            <div className="flex flex-col gap-2">
              {TAGS.map((tag) => (
                <div key={tag.value} className="flex items-center gap-3">
                  <Checkbox
                    id={`${id}-tag-${tag.value}`}
                    checked={draft.tags.includes(tag.value)}
                    onCheckedChange={(value) =>
                      draft.toggleTag(tag.value, value === true)
                    }
                  />
                  <Label
                    htmlFor={`${id}-tag-${tag.value}`}
                    className="font-normal"
                  >
                    <span
                      className={cn("h-2 w-8 rounded-2xl", tag.color)}
                      aria-hidden
                    />
                    {tag.label}
                  </Label>
                </div>
              ))}
            </div>
          ) : selectedTags.length ? (
            <div className="flex flex-wrap gap-1.5">
              {selectedTags.map((tag) => (
                <span
                  key={tag.value}
                  className="flex items-center gap-2 rounded-md border border-border px-2 py-1 text-xs"
                >
                  <span
                    className={cn("h-2 w-6 rounded-2xl", tag.color)}
                    aria-hidden
                  />
                  {tag.label}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">No tags.</p>
          )
        }
      </TaskCardDialogSection>
    </div>
  );
}

export default TaskCardDialogSidebar;
