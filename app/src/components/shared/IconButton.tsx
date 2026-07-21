import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function IconButton({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="secondary"
      className={cn("rounded-full size-9", className)}
      {...props}
    />
  );
}

export default IconButton;
