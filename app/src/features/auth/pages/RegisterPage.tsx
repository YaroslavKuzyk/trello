import { LayoutGrid } from "lucide-react";
import RegisterForm from "@/features/auth/components/RegisterForm";
import { Link } from "react-router";

function RegisterPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <LayoutGrid className="size-4" />
          </div>
          Trello
        </Link>
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;
