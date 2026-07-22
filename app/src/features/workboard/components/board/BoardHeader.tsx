import { Button } from "@/components/ui/button";
import IconButton from "@/components/shared/IconButton";
import { Funnel, Star, UserRoundPlus } from "lucide-react";
import EditableBoardName from "./EditableBoardName";
import BoardMembers from "./BoardMembers";
import BoardDropdown from "./BoardDropdown";

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

        <Button className="px-4" size="lg">
          <UserRoundPlus />
          Invite
        </Button>

        <BoardDropdown />
      </div>
    </div>
  );
}

export default BoardHeader;
