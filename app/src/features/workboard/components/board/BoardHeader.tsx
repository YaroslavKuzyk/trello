import IconButton from "@/components/shared/IconButton";
import { Funnel, Star } from "lucide-react";
import EditableBoardName from "./EditableBoardName";
import BoardMembers from "./BoardMembers";
import BoardDropdown from "./BoardDropdown";
import BoardInvite from "./BoardInvite";

function BoardHeader() {
  return (
    <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-border bg-board-header px-6 py-2.5 text-board-header-foreground">
      <EditableBoardName />

      <div className="flex items-center gap-2">
        <BoardMembers />

        <IconButton aria-label="Filter">
          <Funnel />
        </IconButton>

        <IconButton aria-label="Favorite">
          <Star />
        </IconButton>

        <BoardInvite />

        <BoardDropdown />
      </div>
    </div>
  );
}

export default BoardHeader;
