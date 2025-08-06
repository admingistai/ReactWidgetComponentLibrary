/**
 * OverlayShowcase - Interactive examples of all overlay components
 */

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Home, Inbox, Search, Settings, User, ChevronRight, Info } from "lucide-react";

export function OverlayShowcase() {
  const [open, setOpen] = useState(false);

  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  );

  const sidebarItems = [
    {
      title: "Home",
      icon: Home,
      href: "#",
    },
    {
      title: "Inbox",
      icon: Inbox,
      href: "#",
    },
    {
      title: "Search",
      icon: Search,
      href: "#",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "#",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Popover Examples */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Popover</h3>
          <p className="text-sm text-muted-foreground">
            Displays rich content in a portal, triggered by a button
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          {/* Basic Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Open Popover</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Dimensions</h4>
                  <p className="text-sm text-muted-foreground">
                    Set the dimensions for the layer.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">Width</Label>
                    <Input
                      id="width"
                      defaultValue="100%"
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="maxWidth">Max. width</Label>
                    <Input
                      id="maxWidth"
                      defaultValue="300px"
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="height">Height</Label>
                    <Input
                      id="height"
                      defaultValue="25px"
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="maxHeight">Max. height</Label>
                    <Input
                      id="maxHeight"
                      defaultValue="none"
                      className="col-span-2 h-8"
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Popover with custom align */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Align Start</Button>
            </PopoverTrigger>
            <PopoverContent align="start">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Documentation</h4>
                <p className="text-sm text-muted-foreground">
                  You can customize the popover position using the align prop.
                </p>
              </div>
            </PopoverContent>
          </Popover>

          {/* Controlled Popover */}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline">
                Controlled: {open ? "Open" : "Closed"}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Controlled Popover</h4>
                <p className="text-sm text-muted-foreground">
                  This popover's open state is controlled.
                </p>
                <Button size="sm" onClick={() => setOpen(false)}>
                  Close
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Tooltip Examples */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Tooltip</h3>
          <p className="text-sm text-muted-foreground">
            A popup that displays information on hover
          </p>
        </div>
        <TooltipProvider>
          <div className="flex flex-wrap gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>This is a tooltip</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>More information</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button>Top tooltip</Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>This tooltip appears on top</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="secondary">Left tooltip</Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>This tooltip appears on the left</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="destructive">Bottom tooltip</Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>This tooltip appears on the bottom</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>

      {/* Hover Card Examples */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Hover Card</h3>
          <p className="text-sm text-muted-foreground">
            For previewing content available behind a link
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link">@nextjs</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <Avatar>
                  <AvatarImage src="https://github.com/vercel.png" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">@nextjs</h4>
                  <p className="text-sm">
                    The React Framework – created and maintained by @vercel.
                  </p>
                  <div className="flex items-center pt-2">
                    <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                    <span className="text-xs text-muted-foreground">
                      Joined December 2021
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>

          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link">Hover for user info</Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">shadcn</p>
                    <p className="text-xs text-muted-foreground">@shadcn</p>
                  </div>
                </div>
                <Separator />
                <div className="text-sm">
                  <p>Creator of shadcn/ui</p>
                  <p className="text-muted-foreground">
                    Building design systems with Radix UI and Tailwind CSS.
                  </p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>

      {/* Sheet Examples */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Sheet</h3>
          <p className="text-sm text-muted-foreground">
            Extends the Dialog component to display content from screen edges
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["top", "right", "bottom", "left"] as const).map((side) => (
            <Sheet key={side}>
              <SheetTrigger asChild>
                <Button variant="outline">
                  Open {side}
                </Button>
              </SheetTrigger>
              <SheetContent side={side}>
                <SheetHeader>
                  <SheetTitle>Edit profile</SheetTitle>
                  <SheetDescription>
                    Make changes to your profile here. Click save when you're done.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" value="Pedro Duarte" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input id="username" value="@peduarte" className="col-span-3" />
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="submit">Save changes</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </div>

      {/* Scroll Area Examples */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Scroll Area</h3>
          <p className="text-sm text-muted-foreground">
            Augments native scroll functionality with custom scrollbars
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {/* Vertical Scroll */}
          <div>
            <h4 className="text-sm font-medium mb-2">Vertical Scroll</h4>
            <ScrollArea className="h-72 w-full rounded-md border">
              <div className="p-4">
                <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
                {tags.map((tag) => (
                  <div key={tag} className="text-sm py-2">
                    {tag}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Horizontal Scroll */}
          <div>
            <h4 className="text-sm font-medium mb-2">Horizontal Scroll</h4>
            <ScrollArea className="w-full whitespace-nowrap rounded-md border">
              <div className="flex w-max space-x-4 p-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <figure key={i} className="shrink-0">
                    <div className="overflow-hidden rounded-md">
                      <div className="h-32 w-48 bg-muted flex items-center justify-center">
                        <span className="text-2xl font-semibold text-muted-foreground">
                          Image {i + 1}
                        </span>
                      </div>
                    </div>
                    <figcaption className="pt-2 text-xs text-muted-foreground">
                      Photo by{" "}
                      <span className="font-semibold text-foreground">
                        Artist {i + 1}
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {/* Both Scrollbars */}
          <div>
            <h4 className="text-sm font-medium mb-2">Both Scrollbars</h4>
            <ScrollArea className="h-48 w-full rounded-md border">
              <div className="p-4 w-[600px]">
                <h4 className="mb-4 text-sm font-medium leading-none">
                  Large Content Area
                </h4>
                {Array.from({ length: 20 }).map((_, i) => (
                  <p key={i} className="text-sm py-2">
                    This is a very long line of text that extends beyond the width of the container to demonstrate horizontal scrolling. Line {i + 1}
                  </p>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {/* Custom Styled */}
          <div>
            <h4 className="text-sm font-medium mb-2">Custom Styled</h4>
            <ScrollArea className="h-48 w-full rounded-md border bg-gradient-to-b from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
              <div className="p-4">
                <h4 className="mb-4 text-sm font-medium leading-none">
                  Gradient Background
                </h4>
                {Array.from({ length: 15 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-lg bg-white/50 dark:bg-black/20 p-2 mb-2 text-sm"
                  >
                    Item {i + 1}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>

      {/* Sidebar Example */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Sidebar</h3>
          <p className="text-sm text-muted-foreground">
            A composable, themeable and customizable sidebar component
          </p>
        </div>
        <div className="rounded-lg border overflow-hidden">
          <SidebarProvider>
            <div className="flex h-[400px] w-full">
              <Sidebar>
                <SidebarHeader>
                  <div className="flex items-center gap-2 px-4 py-2">
                    <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                      A
                    </div>
                    <div>
                      <p className="text-sm font-medium">Acme Inc</p>
                      <p className="text-xs text-muted-foreground">Enterprise</p>
                    </div>
                  </div>
                </SidebarHeader>
                <SidebarContent>
                  <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {sidebarItems.map((item) => (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                              <a href={item.href}>
                                <item.icon className="h-4 w-4" />
                                <span>{item.title}</span>
                              </a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                  <SidebarGroup>
                    <SidebarGroupLabel>Favorites</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <a href="#">
                              <ChevronRight className="h-4 w-4" />
                              <span>Project Alpha</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <a href="#">
                              <ChevronRight className="h-4 w-4" />
                              <span>Project Beta</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#">
                          <User className="h-4 w-4" />
                          <span>John Doe</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarFooter>
              </Sidebar>
              <SidebarInset>
                <header className="flex items-center gap-2 border-b px-4 py-2">
                  <SidebarTrigger />
                  <Separator orientation="vertical" className="h-4" />
                  <h2 className="text-sm font-medium">Main Content</h2>
                </header>
                <div className="flex-1 p-4">
                  <p className="text-sm text-muted-foreground">
                    This is the main content area. The sidebar can be toggled using the trigger button.
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="h-4 w-3/4 bg-muted rounded" />
                    <div className="h-4 w-1/2 bg-muted rounded" />
                    <div className="h-4 w-5/6 bg-muted rounded" />
                  </div>
                </div>
              </SidebarInset>
            </div>
          </SidebarProvider>
        </div>
      </div>
    </div>
  );
}