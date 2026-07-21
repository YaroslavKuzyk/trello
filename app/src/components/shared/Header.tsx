import { Button } from "@/components/ui/button";
import { LayoutGrid } from "lucide-react";
import { Link } from "react-router";

function Header() {
  return (
    <header className="relative z-20 flex items-center justify-between border-b border-border bg-app-header px-6 py-3 text-app-header-foreground">
      <Link to="/" className="flex items-center gap-2">
        <LayoutGrid />
        <span className="text-xl font-bold">Trello</span>
      </Link>
      <div className="flex gap-2">
        <Button variant="surface" className="rounded-full px-4" asChild>
          <Link to="/login">Login</Link>
        </Button>
        <Button className="rounded-full px-4" asChild>
          <Link to="/register">Register</Link>
        </Button>
      </div>
    </header>
  );
}

export default Header;
