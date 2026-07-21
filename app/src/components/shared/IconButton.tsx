import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function IconButton({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="surface"
      className={cn("size-9", className)}
      {...props}
    />
  );
}

export default IconButton;
