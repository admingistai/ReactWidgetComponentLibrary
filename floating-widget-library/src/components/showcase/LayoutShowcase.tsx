/**
 * LayoutShowcase - Interactive examples of all layout components
 */

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Monitor, Smartphone, Tablet } from "lucide-react";

export function LayoutShowcase() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Card Examples */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Card</h3>
          <p className="text-sm text-muted-foreground">
            Displays a card with header, content, and footer
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Basic Card */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Card</CardTitle>
              <CardDescription>Card with all sections</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is the card content. You can put any content here.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Action</Button>
            </CardFooter>
          </Card>

          {/* Card without Footer */}
          <Card>
            <CardHeader>
              <CardTitle>Without Footer</CardTitle>
              <CardDescription>Simple content card</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Cards don't always need footers. This one focuses on content.</p>
            </CardContent>
          </Card>

          {/* Interactive Card */}
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Interactive Card</CardTitle>
              <CardDescription>Click me!</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This card has hover effects and could be clickable.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Accordion Example */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Accordion</h3>
          <p className="text-sm text-muted-foreground">
            A vertically stacked set of interactive headings
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that match the other components' aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It's animated by default, but you can disable it if you prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Tabs Example */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Tabs</h3>
          <p className="text-sm text-muted-foreground">
            A set of layered sections of content
          </p>
        </div>
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you're done.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Account settings content goes here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Password change form would go here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                  Manage your general settings and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>General settings would be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Collapsible Example */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Collapsible</h3>
          <p className="text-sm text-muted-foreground">
            An interactive component which expands/collapses a panel
          </p>
        </div>
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-full space-y-2"
        >
          <div className="flex items-center justify-between space-x-4 px-4">
            <h4 className="text-sm font-semibold">
              @peduarte starred 3 repositories
            </h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <div className="rounded-md border px-4 py-3 font-mono text-sm">
            @radix-ui/primitives
          </div>
          <CollapsibleContent className="space-y-2">
            <div className="rounded-md border px-4 py-3 font-mono text-sm">
              @radix-ui/colors
            </div>
            <div className="rounded-md border px-4 py-3 font-mono text-sm">
              @stitches/react
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Aspect Ratio Example */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Aspect Ratio</h3>
          <p className="text-sm text-muted-foreground">
            Displays content within a desired ratio
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">16:9 Ratio</p>
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <div className="flex h-full items-center justify-center">
                <Monitor className="h-12 w-12 text-muted-foreground" />
              </div>
            </AspectRatio>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">4:3 Ratio</p>
            <AspectRatio ratio={4 / 3} className="bg-muted">
              <div className="flex h-full items-center justify-center">
                <Tablet className="h-12 w-12 text-muted-foreground" />
              </div>
            </AspectRatio>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">1:1 Ratio</p>
            <AspectRatio ratio={1 / 1} className="bg-muted">
              <div className="flex h-full items-center justify-center">
                <Smartphone className="h-12 w-12 text-muted-foreground" />
              </div>
            </AspectRatio>
          </div>
        </div>
      </div>

      {/* Separator Example */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Separator</h3>
          <p className="text-sm text-muted-foreground">
            Visually or semantically separates content
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <div className="space-y-1">
              <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
              <p className="text-sm text-muted-foreground">
                An open-source UI component library.
              </p>
            </div>
            <Separator className="my-4" />
            <div className="flex h-5 items-center space-x-4 text-sm">
              <div>Blog</div>
              <Separator orientation="vertical" />
              <div>Docs</div>
              <Separator orientation="vertical" />
              <div>Source</div>
            </div>
          </div>
        </div>
      </div>

      {/* Resizable Example */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Resizable</h3>
          <p className="text-sm text-muted-foreground">
            Accessible resizable panel groups and layouts
          </p>
        </div>
        <div className="h-[200px] rounded-lg border">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            <ResizablePanel defaultSize={25} minSize={20}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Panel 1</span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Panel 2</span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={25} minSize={20}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Panel 3</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
}