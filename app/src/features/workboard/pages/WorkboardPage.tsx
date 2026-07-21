import { BoardHeader } from "@/features/workboard/components/board";
import { List, CreateList } from "@/features/workboard/components/list";

function WorkboardPage() {
  return (
    <div className="flex flex-1 flex-col bg-board text-board-foreground">
      <BoardHeader />

      <div className="bg-grid flex flex-1 items-start gap-4 overflow-x-auto p-6">
        {/* Колонки дошки */}
        <List />
        <CreateList />
      </div>
    </div>
  );
}

export default WorkboardPage;
