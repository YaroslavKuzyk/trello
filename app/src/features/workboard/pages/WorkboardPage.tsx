import EditableWorkboardName from "@/features/workboard/components/EditableWorkboardName";
import WorkboardMembers from "@/features/workboard/components/WorkboardMembers";
import { Funnel, Star, UserRoundPlus, Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import IconButton from "@/components/shared/IconButton";
import CreateListCard from "@/features/workboard/components/CreateListCard";
import ListCard from "@/features/workboard/components/ListCard";

function WorkboardPage() {
  return (
    <div className="flex flex-1 flex-col bg-board text-board-foreground">
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-border bg-board-header px-6 py-2.5 text-board-header-foreground">
        <EditableWorkboardName />

        <div className="flex items-center gap-2">
          <WorkboardMembers />

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

          <IconButton aria-label="More options">
            <Ellipsis />
          </IconButton>
        </div>
      </div>

      <div className="bg-grid flex flex-1 items-start gap-4 overflow-x-auto p-6">
        {/* Колонки дошки */}
        <ListCard />
        <CreateListCard />
      </div>
    </div>
  );
}

export default WorkboardPage;
