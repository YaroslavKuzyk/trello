import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { LIST_WIDTH } from "@/features/workboard/constants";
import { TaskCard } from "@/features/workboard/components/card";
import ListHeader from "./ListHeader";

function List() {
  return (
    <div
      className={cn(
        "flex max-h-full shrink-0 flex-col gap-2 rounded-xl border border-border bg-secondary px-2 py-3",
        LIST_WIDTH,
      )}
    >
      <ListHeader />

      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
        <TaskCard title="Task #1" />

        <TaskCard
          title="Task #2"
          coverUrl="https://images.unsplash.com/photo-1526779259212-939e64788e3c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D"
        />

        <TaskCard title="Task #3" />
      </div>

      {/* Додати картку */}
      <Button variant="ghost" size="lg" className="justify-start">
        <Plus />
        Add a card
      </Button>
    </div>
  );
}

export default List;
