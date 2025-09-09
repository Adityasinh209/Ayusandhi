import { useTheme } from "next-themes";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Monitor } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const icon = resolvedTheme === "dark" ? (
    <Moon className="h-4 w-4" />
  ) : (
    <Sun className="h-4 w-4" />
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="relative overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            {mounted && (
              <motion.span
                key={resolvedTheme}
                initial={{ y: 8, opacity: 0, rotate: -10, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
                exit={{ y: -8, opacity: 0, rotate: 10, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className="flex items-center gap-2"
              >
                {icon}
                <span className="hidden sm:inline">{resolvedTheme === "dark" ? "Dark" : "Light"}</span>
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={theme ?? "system"} onValueChange={(v) => setTheme(v)}>
          <DropdownMenuRadioItem value="light">
            <div className="flex items-center gap-2"><Sun className="h-4 w-4" /> Light</div>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            <div className="flex items-center gap-2"><Moon className="h-4 w-4" /> Dark</div>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">
            <div className="flex items-center gap-2"><Monitor className="h-4 w-4" /> System</div>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
