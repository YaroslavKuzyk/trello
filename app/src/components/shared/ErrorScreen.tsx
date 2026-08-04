import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

type ErrorScreenProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
};

function ErrorScreen({
  title = "Something went wrong",
  description = "We could not reach the server. Check your connection and try again.",
  onRetry,
}: ErrorScreenProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <TriangleAlert className="size-12 text-destructive" />
      <div className="space-y-1">
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {onRetry && (
        <Button variant="surface" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}

export default ErrorScreen;
