import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const navLinkCls = ({ isActive }: { isActive: boolean }) =>
  cn(
    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
    isActive
      ? "bg-primary/10 text-primary"
      : "text-muted-foreground hover:text-foreground hover:bg-muted",
  );

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-base sm:text-lg font-semibold tracking-tight">
            Ayusandhi
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" className={navLinkCls} end>
            Home
          </NavLink>
          <NavLink to="/search" className={navLinkCls}>
            Search
          </NavLink>

          <NavLink to="/about" className={navLinkCls}>
            About
          </NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link to="/search">Search Terminology</Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
      <div className="md:hidden border-t">
        <nav className="container flex items-center gap-1 overflow-x-auto py-2">
          <NavLink to="/" className={navLinkCls} end>
            Home
          </NavLink>
          <NavLink to="/search" className={navLinkCls}>
            Search
          </NavLink>

          <NavLink to="/about" className={navLinkCls}>
            About
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
