import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import TaskCardDialogChecklist from "./TaskCardDialogChecklist";
import TaskCardDialogContent from "./TaskCardDialogContent";
import TaskCardDialogCover from "./TaskCardDialogCover";
import TaskCardDialogHeading from "./TaskCardDialogHeading";
import TaskCardDialogMaterials from "./TaskCardDialogMaterials";
import TaskCardDialogSidebar from "./TaskCardDialogSidebar";
import type { TaskCardDraft } from "./useTaskCardDraft";

type TaskCardDialogProps = {
  draft: TaskCardDraft;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  canEdit?: boolean;
};

function TaskCardDialog({
  draft,
  open,
  onOpenChange,
  canEdit = true,
}: TaskCardDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="grid-rows-[auto_1fr_auto] gap-0 overflow-hidden p-0 sm:max-w-3xl max-h-[85vh]">
        <DialogDescription className="sr-only">
          Card details. {canEdit ? "Use the pencil on a block to edit it." : ""}
        </DialogDescription>

        <TaskCardDialogCover draft={draft} canEdit={canEdit} />

        <div className="flex min-h-0 flex-col gap-4 overflow-y-auto p-4 md:flex-row md:gap-6">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <TaskCardDialogHeading draft={draft} canEdit={canEdit} />
            <TaskCardDialogContent draft={draft} canEdit={canEdit} />
            <TaskCardDialogChecklist draft={draft} canEdit={canEdit} />
            <TaskCardDialogMaterials draft={draft} canEdit={canEdit} />
          </div>

          <TaskCardDialogSidebar draft={draft} canEdit={canEdit} />
        </div>

        <DialogFooter className="mx-0 mb-0">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default TaskCardDialog;
