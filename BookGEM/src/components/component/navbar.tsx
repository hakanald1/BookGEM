import Logo from "./logo"
import * as React from "react"
import { Link } from "react-router-dom"
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"

import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleDashedIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink render={<a href={href}><div className="flex flex-col gap-1 text-sm">
          <div className="leading-none font-medium text-md text-gray-600">{title}</div>
          <div className="line-clamp-2 text-muted-foreground">{children}</div>
        </div></a>} />
    </li>
  )
}

export function NavigationMenuComponent() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex w-full items-center justify-between px-6 py-3 bg-background h-16 border-b border-border/40">
      <Link to="/" className="flex items-center gap-3 overflow-hidden">
        <Logo className="h-9 w-auto shrink-0" />
        <span className="font-bold text-xl tracking-tight text-foreground truncate">
          Book<span className="text-[#CBA328]">GEM</span>
        </span>
      </Link>
    <NavigationMenu className="hidden">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            
            <ul className="w-96">
              <ListItem href="/docs" title="Introduction">
                Re-usable components built with Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:flex">
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px]">
              <li>
                <NavigationMenuLink render={<a href="#" className="flex-row items-center gap-2"><CircleAlertIcon />Backlog</a>} />
                <NavigationMenuLink render={<a href="#" className="flex-row items-center gap-2"><CircleDashedIcon />To Do</a>} />
                <NavigationMenuLink render={<a href="#" className="flex-row items-center gap-2"><CircleCheckIcon />Done</a>} />
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<a href="/docs">Docs</a>} />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>


    <div className="flex items-center gap-3">
      <SignedOut>
        <Link to="/login">
          <Button variant="ghost" size="lg" className="px-[20px] py-[10px] text-gray-600 text-md">
            Login
          </Button>
        </Link>
        <Link to="/signup">
          <Button className="rounded-md px-[20px] py-[10px]">Sign Up</Button>
        </Link>
      </SignedOut>
      <SignedIn>
        <UserButton showName afterSignOutUrl="/" />
      </SignedIn>
    </div>
    </header>
  )
}

