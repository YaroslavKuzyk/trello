import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";

function ListHeader() {
  return (
    <div className="flex items-center justify-between px-2">
      <h2 className="text-sm font-semibold">List Title</h2>

      <div className="flex items-center gap-1">
        <span className="text-sm text-muted-foreground">0</span>

        <Button variant="ghost" size="icon" aria-label="List options">
          <Ellipsis />
        </Button>
      </div>
    </div>
  );
}

export default ListHeader;
