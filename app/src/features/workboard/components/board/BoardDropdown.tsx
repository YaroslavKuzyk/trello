import { Ellipsis, Image, Info, Star, Trash2 } from "lucide-react";
import IconButton from "@/components/shared/IconButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function BoardDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton aria-label="More options">
          <Ellipsis />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-auto">
        <DropdownMenuItem>
          <Info />
          Information
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Star />
          Favorite
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Image />
          Change background
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive">
          <Trash2 />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default BoardDropdown;
