import { BoardHeader } from "@/features/workboard/components/board";
import { List, CreateList } from "@/features/workboard/components/list";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function WorkboardPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-board text-board-foreground">
      <BoardHeader />

      <div className="bg-grid flex min-h-0 flex-1 flex-col items-center gap-4 p-6">
        <div className="flex min-h-0 w-full flex-1 items-start gap-4 overflow-x-auto">
          <List />
          <CreateList />
        </div>

        <div className="flex items-center gap-2 rounded-md bg-accent p-2 text-accent-foreground">
          <ButtonGroup>
            <Button>Kanban</Button>
            <Button variant="outline">Table</Button>
            <Button variant="outline">Calendar</Button>
          </ButtonGroup>
          <Separator orientation="vertical" />
          <Button variant="outline">Switch workboard</Button>
        </div>
      </div>
    </div>
  );
}

export default WorkboardPage;
