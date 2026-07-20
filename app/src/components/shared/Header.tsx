import { Button } from "@/components/ui/button";
import { LayoutGrid } from "lucide-react";
import { Link } from "react-router";

function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-muted">
      <div className="flex items-center gap-2">
        <LayoutGrid />
        <span className="text-xl font-bold">Trello</span>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" asChild>
          <Link to="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link to="/register">Register</Link>
        </Button>
      </div>
    </header>
  );
}

export default Header;
