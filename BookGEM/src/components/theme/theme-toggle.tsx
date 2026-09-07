import { Sun, Moon, Laptop } from "lucide-react";
import { useTheme } from "./theme-context";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  variant?: "icon" | "pill" | "dropdown";
  showLabel?: boolean;
}

export function ThemeToggle({
  className,
  variant = "icon",
  showLabel = false,
}: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  if (variant === "pill") {
    return (
      <div
        className={cn(
          "inline-flex items-center p-1 rounded-xl bg-muted/80 border border-border text-muted-foreground",
          className
        )}
      >
        <button
          type="button"
          onClick={() => setTheme("light")}
          title="Light Theme"
          aria-label="Light Theme"
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer",
            theme === "light"
              ? "bg-card text-foreground shadow-xs font-semibold"
              : "hover:text-foreground"
          )}
        >
          <Sun className="h-3.5 w-3.5 text-[#CBA328]" />
          <span>Light</span>
        </button>
        <button
          type="button"
          onClick={() => setTheme("dark")}
          title="Dark Theme"
          aria-label="Dark Theme"
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer",
            theme === "dark"
              ? "bg-card text-foreground shadow-xs font-semibold"
              : "hover:text-foreground"
          )}
        >
          <Moon className="h-3.5 w-3.5 text-[#DFC15D]" />
          <span>Dark</span>
        </button>
        <button
          type="button"
          onClick={() => setTheme("system")}
          title="System Theme"
          aria-label="System Theme"
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer",
            theme === "system"
              ? "bg-card text-foreground shadow-xs font-semibold"
              : "hover:text-foreground"
          )}
        >
          <Laptop className="h-3.5 w-3.5" />
          <span>Auto</span>
        </button>
      </div>
    );
  }

  // Quick 1-click icon toggle between Light and Dark
  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={
        resolvedTheme === "dark"
          ? "Switch to Light theme"
          : "Switch to Dark theme"
      }
      aria-label={
        resolvedTheme === "dark"
          ? "Switch to Light theme"
          : "Switch to Dark theme"
      }
      className={cn(
        "relative flex items-center justify-center p-2 rounded-xl border border-border/80 bg-card/80 hover:bg-muted text-foreground hover:border-[#CBA328]/40 shadow-xs transition-all duration-300 active:scale-95 cursor-pointer group",
        className
      )}
    >
      <div className="relative h-5 w-5 flex items-center justify-center">
        {/* Sun Icon (visible when dark, clicking switches to light) */}
        <Sun
          className={cn(
            "h-4 w-4 text-[#CBA328] transition-all duration-300 absolute",
            resolvedTheme === "dark"
              ? "scale-100 rotate-0 opacity-100"
              : "scale-0 rotate-90 opacity-0"
          )}
        />
        {/* Moon Icon (visible when light, clicking switches to dark) */}
        <Moon
          className={cn(
            "h-4 w-4 text-foreground/80 group-hover:text-[#CBA328] transition-all duration-300 absolute",
            resolvedTheme === "dark"
              ? "scale-0 -rotate-90 opacity-0"
              : "scale-100 rotate-0 opacity-100"
          )}
        />
      </div>

      {showLabel && (
        <span className="ml-2 text-xs font-medium capitalize text-muted-foreground group-hover:text-foreground">
          {resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
        </span>
      )}
    </button>
  );
}
