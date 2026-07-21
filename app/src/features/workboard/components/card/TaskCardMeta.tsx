import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { SquareCheck, Paperclip } from "lucide-react";

const META_ITEM = "flex items-center gap-1 text-xs text-muted-foreground";

type TaskCardMetaProps = {
  hasCover?: boolean;
};

function TaskCardMeta({ hasCover = false }: TaskCardMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="destructive" className="text-xs">
        20 July - 21 July
      </Badge>

      <span className={cn(META_ITEM, hasCover && "text-white/80")}>
        <SquareCheck className="size-4" /> 0/1
      </span>

      <span className={cn(META_ITEM, hasCover && "text-white/80")}>
        <Paperclip className="size-4" /> 1
      </span>

      <AvatarGroup className="ml-auto">
        <Avatar size="sm">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
    </div>
  );
}

export default TaskCardMeta;
