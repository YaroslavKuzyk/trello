import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Ellipsis,
  Plus,
  Copy,
  ArrowRightLeft,
  Layers,
  Trash2,
} from "lucide-react";

function ListHeaderDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="List options">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-auto">
        <DropdownMenuItem>
          <Plus />
          Add new card
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy />
          Copy list
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ArrowRightLeft />
          Move list
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Layers />
          Move all cards to another list
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive">
          <Trash2 />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ListHeaderDropdown;
