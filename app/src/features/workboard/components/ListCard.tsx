import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ListCardHeader from "./ListCardHeader";
import ListCardItem from "./ListCardItem";

function ListCard() {
  return (
    <div className="flex w-72 shrink-0 flex-col gap-2 rounded-xl border border-border bg-secondary px-2 py-3">
      <ListCardHeader />

      <ListCardItem title="Task #1" />

      <ListCardItem
        title="Task #2"
        coverUrl="https://images.unsplash.com/photo-1526779259212-939e64788e3c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D"
      />

      {/* Додати картку */}
      <Button variant="ghost" size="lg" className="justify-start">
        <Plus />
        Add a card
      </Button>
    </div>
  );
}

export default ListCard;
