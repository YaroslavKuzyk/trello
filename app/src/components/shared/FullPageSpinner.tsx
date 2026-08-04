import { Loader } from "lucide-react";

function FullPageSpinner() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-background">
      <Loader className="animate-spin size-12 text-primary" />
    </div>
  );
}

export default FullPageSpinner;
