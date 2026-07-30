import { Funnel } from "lucide-react";
import IconButton from "@/components/shared/IconButton";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

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

const LABELS = [
  { value: "design", label: "Design", color: "bg-green-400" },
  { value: "bug", label: "Bug", color: "bg-red-400" },
  { value: "feature", label: "Feature", color: "bg-blue-400" },
  { value: "research", label: "Research", color: "bg-purple-400" },
  { value: "docs", label: "Docs", color: "bg-yellow-400" },
];

const DUE_DATES = [
  { value: "no_date", label: "No due date" },
  { value: "overdue", label: "Overdue" },
  { value: "day", label: "Due in the next day" },
  { value: "week", label: "Due in the next week" },
];

function BoardFilters() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <IconButton aria-label="Filter">
          <Funnel />
        </IconButton>
      </DrawerTrigger>
      <DrawerContent className="overflow-hidden">
        <DrawerHeader className="shrink-0">
          <DrawerTitle className="text-lg">Filters</DrawerTitle>
          <DrawerDescription>
            Show only the cards that match every selected filter.
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-4 pb-4">
          <Input placeholder="Search cards" aria-label="Search cards" />

          <FilterGroup title="Members">
            {MEMBERS.map((member) => (
              <FilterOption
                key={member.value}
                id={`member-${member.value}`}
                label={member.label}
              >
                <Avatar size="sm">
                  <AvatarImage src={member.image} alt="" />
                  <AvatarFallback>
                    {member.label.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </FilterOption>
            ))}
          </FilterGroup>

          <FilterGroup title="Labels">
            {LABELS.map((item) => (
              <FilterOption
                key={item.value}
                id={`label-${item.value}`}
                label={item.label}
              >
                <span
                  className={cn("h-2 w-8 rounded-2xl", item.color)}
                  aria-hidden
                />
              </FilterOption>
            ))}
          </FilterGroup>

          <FilterGroup title="Due date">
            {DUE_DATES.map((item) => (
              <FilterOption
                key={item.value}
                id={`due-${item.value}`}
                label={item.label}
              />
            ))}
          </FilterGroup>
        </div>

        <DrawerFooter className="shrink-0 flex-row justify-between border-t border-border">
          <Button variant="ghost">Clear all</Button>
          <DrawerClose asChild>
            <Button>Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {title}
      </h4>
      {children}
    </div>
  );
}

function FilterOption({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <Checkbox id={id} />
      <Label htmlFor={id} className="font-normal">
        {children}
        {label}
      </Label>
    </div>
  );
}

export default BoardFilters;
