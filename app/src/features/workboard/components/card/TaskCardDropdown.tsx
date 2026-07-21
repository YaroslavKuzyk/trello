import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  SquarePen,
  Eye,
  Tag,
  Users,
  Image,
  Calendar,
  Trash2,
} from "lucide-react";
import { REVEAL_ON_HOVER } from "./constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function TaskCardDropdown({ title }: { title: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          aria-label={`More actions for "${title}"`}
          className={cn(REVEAL_ON_HOVER, "data-[state=open]:opacity-100")}
        >
          <SquarePen />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-auto">
        <DropdownMenuItem>
          <Eye />
          Open card
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Tag />
          Edit tags
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Users />
          Change members
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Image />
          Change Cover
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Calendar />
          Edit Date
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive">
          <Trash2 />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TaskCardDropdown;
