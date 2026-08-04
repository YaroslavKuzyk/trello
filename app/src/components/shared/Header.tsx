import { Button } from "@/components/ui/button";
import { LayoutGrid, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useMe } from "@/features/auth/hooks/useMe";
import { useLogout } from "@/features/auth/hooks/useLogout";

function Header() {
  const navigate = useNavigate();
  const { data: user, isPending } = useMe();
  const logout = useLogout();

  const onLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        navigate("/login", { replace: true });
      },
    });
  };

  return (
    <header className="relative z-20 flex items-center justify-between border-b border-border bg-app-header px-6 py-3 text-app-header-foreground">
      <Link to="/" className="flex items-center gap-2">
        <LayoutGrid />
        <span className="text-xl font-bold">Trello</span>
      </Link>

      {isPending ? (
        <div></div>
      ) : user ? (
        <div className="flex items-center gap-2">
          <span>Hello, {user.name}!</span>
          <Button
            variant="surface"
            onClick={onLogout}
            disabled={logout.isPending}
          >
            <LogOut />
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button variant="surface" className="rounded-full px-4" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button className="rounded-full px-4" asChild>
            <Link to="/register">Register</Link>
          </Button>
        </div>
      )}
    </header>
  );
}

export default Header;
