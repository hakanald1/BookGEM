import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import Logo from "./logo"
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react"
import { 
  LayoutDashboard, 
  BookOpen, 
  Utensils, 
  Bookmark, 
  ChevronLeft, 
  ChevronRight, 
  Settings,
  Plus
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  disabled?: boolean
}

interface SidebarProps {
  className?: string
  onCreateProject?: () => void
}

const mainNavItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Cookbooks", href: "/cookbooks", icon: BookOpen, disabled: true, badge: "Disabled" },
  { title: "Recipes", href: "/recipes", icon: Utensils },
  { title: "Saved Gems", href: "/saved", icon: Bookmark },
]

export function Sidebar({ className, onCreateProject }: SidebarProps) {
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(true)
  const { user } = useUser()

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r bg-card text-card-foreground transition-all duration-300 h-screen sticky top-0 z-30 select-none",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b">
        <Link to="/dashboard" className="flex items-center gap-3 overflow-hidden">
          <Logo className="h-10 w-auto shrink-0" />
          {!isCollapsed && (
            <span className="font-bold text-lg tracking-tight text-foreground truncate">
              Book<span className="text-[#CBA328]">GEM</span>
            </span>
          )}
        </Link>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Main Navigation Content */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
        {/* Create Project Button on top of Menu */}
        {onCreateProject && (
          <button
            onClick={onCreateProject}
            title={isCollapsed ? "Create Project" : undefined}
            className={cn(
              "w-full flex items-center justify-center gap-2 rounded-xl bg-[#CBA328] hover:bg-[#b58f20] text-black font-bold shadow-md transition-all active:scale-95 cursor-pointer",
              isCollapsed ? "p-3" : "px-4 py-3 text-sm"
            )}
          >
            <Plus className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span className="truncate">Create Project</span>}
          </button>
        )}

        {/* Main Section */}
        <div>
          {!isCollapsed && (
            <h2 className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Menu
            </h2>
          )}
          <nav className="space-y-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href

              if (item.disabled) {
                return (
                  <div
                    key={item.href}
                    title={isCollapsed ? `${item.title} (Disabled)` : undefined}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium opacity-50 cursor-not-allowed text-muted-foreground/60 select-none"
                  >
                    <Icon className="h-5 w-5 shrink-0 text-muted-foreground/50" />
                    {!isCollapsed && <span className="truncate">{item.title}</span>}
                  </div>
                )
              }

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  title={isCollapsed ? item.title : undefined}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                    isActive
                      ? "bg-[#CBA328]/15 text-[#CBA328] font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                  )}
                >
                  <Icon className={cn("h-5 w-5 shrink-0 transition-colors", isActive ? "text-[#CBA328]" : "group-hover:text-foreground")} />
                  {!isCollapsed && <span className="truncate">{item.title}</span>}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Footer / Settings & User Profile */}
      <div className="p-3 border-t space-y-1 justify-start flex  flex-col">
        <Link
          to="/settings"
          title={isCollapsed ? "Settings" : undefined}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors w-full"
        >
          <Settings className="h-5 w-5 shrink-0" />
          {!isCollapsed && <span>Settings</span>}
        </Link>

        <div className={cn("pt-1 flex items-center gap-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors w-full", isCollapsed ? "justify-center" : "px-3 py-1.5")}>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            {!isCollapsed && user && (
              <span className="text-sm font-medium truncate text-foreground">
                {user.fullName || user.firstName || user.primaryEmailAddress?.emailAddress}
              </span>
            )}
          </SignedIn>
        </div>
      </div>
    </aside>
  )
}

// Backwards compatibility export alias
export { Sidebar as sidebar }
