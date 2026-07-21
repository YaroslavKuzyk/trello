import EditableWorkboardName from "@/features/workboard/components/EditableWorkboardName";
import WorkboardMembers from "@/features/workboard/components/WorkboardMembers";
import { Funnel, Star, UserRoundPlus, Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import IconButton from "@/components/shared/IconButton";

function WorkboardPage() {
  return (
    <div className="flex items-center justify-between p-3">
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
  );
}

export default WorkboardPage;
