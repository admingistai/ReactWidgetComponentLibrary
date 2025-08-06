/**
 * ShadcnShowcase - Complete showcase of all shadcn/ui components
 * Organized by category with interactive examples
 */

import { useState, lazy, Suspense } from "react";
import { 
  Search, 
  Layout,
  FormInput,
  Database,
  MessageSquare,
  Navigation,
  Layers
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/toaster";

// Lazy load showcase components
const FormShowcase = lazy(() => import("@/components/showcase/FormShowcase").then(m => ({ default: m.FormShowcase })));
const LayoutShowcase = lazy(() => import("@/components/showcase/LayoutShowcase").then(m => ({ default: m.LayoutShowcase })));
const DataDisplayShowcase = lazy(() => import("@/components/showcase/DataDisplayShowcase").then(m => ({ default: m.DataDisplayShowcase })));
const FeedbackShowcase = lazy(() => import("@/components/showcase/FeedbackShowcase").then(m => ({ default: m.FeedbackShowcase })));
const NavigationShowcase = lazy(() => import("@/components/showcase/NavigationShowcase").then(m => ({ default: m.NavigationShowcase })));
const OverlayShowcase = lazy(() => import("@/components/showcase/OverlayShowcase").then(m => ({ default: m.OverlayShowcase })));

// Component categories with metadata
const COMPONENT_CATEGORIES = {
  form: {
    label: "Form",
    icon: FormInput,
    description: "Input controls and form elements",
    component: FormShowcase,
    components: [
      "Button", "Input", "Textarea", "Label", "Select", 
      "Checkbox", "Radio Group", "Switch", "Form", 
      "Input OTP", "Slider", "Toggle", "Toggle Group"
    ]
  },
  layout: {
    label: "Layout",
    icon: Layout,
    description: "Structure and container components",
    component: LayoutShowcase,
    components: [
      "Card", "Accordion", "Tabs", "Collapsible",
      "Aspect Ratio", "Separator", "Resizable"
    ]
  },
  dataDisplay: {
    label: "Data Display",
    icon: Database,
    description: "Components for displaying data",
    component: DataDisplayShowcase,
    components: [
      "Table", "Badge", "Avatar", "Progress",
      "Calendar", "Carousel", "Chart", "Skeleton"
    ]
  },
  feedback: {
    label: "Feedback",
    icon: MessageSquare,
    description: "User feedback and notifications",
    component: FeedbackShowcase,
    components: [
      "Alert", "Alert Dialog", "Toast", "Dialog", "Drawer"
    ]
  },
  navigation: {
    label: "Navigation",
    icon: Navigation,
    description: "Navigation and menu components",
    component: NavigationShowcase,
    components: [
      "Breadcrumb", "Dropdown Menu", "Menubar",
      "Navigation Menu", "Pagination", "Command", "Context Menu"
    ]
  },
  overlay: {
    label: "Overlay",
    icon: Layers,
    description: "Overlay and floating components",
    component: OverlayShowcase,
    components: [
      "Popover", "Tooltip", "Hover Card",
      "Sheet", "Scroll Area", "Sidebar"
    ]
  }
};

export function ShadcnShowcase() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("form");

  // Filter components based on search
  const filterComponents = (components: string[]) => {
    if (!searchQuery) return components;
    return components.filter(component =>
      component.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Get total component count
  const totalComponents = Object.values(COMPONENT_CATEGORIES).reduce(
    (acc, category) => acc + category.components.length,
    0
  );

  // Get filtered component count
  const filteredComponents = Object.values(COMPONENT_CATEGORIES).reduce(
    (acc, category) => acc + filterComponents(category.components).length,
    0
  );

  const ShowcaseComponent = COMPONENT_CATEGORIES[selectedCategory as keyof typeof COMPONENT_CATEGORIES]?.component;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                shadcn/ui Component Showcase
              </h1>
              <p className="text-muted-foreground mt-1">
                Interactive examples of all {totalComponents} components
                {searchQuery && ` (${filteredComponents} matching "${searchQuery}")`}
              </p>
            </div>
            
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          {/* Category Tabs */}
          <TabsList className="grid grid-cols-3 lg:grid-cols-6 h-auto">
            {Object.entries(COMPONENT_CATEGORIES).map(([key, category]) => {
              const Icon = category.icon;
              const filteredCount = filterComponents(category.components).length;
              
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="flex flex-col gap-1 py-3"
                  disabled={filteredCount === 0}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-xs">{category.label}</span>
                  <Badge variant="secondary" className="h-5 px-1 text-xs">
                    {filteredCount}
                  </Badge>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Component Display */}
          {Object.entries(COMPONENT_CATEGORIES).map(([key, category]) => (
            <TabsContent key={key} value={key} className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>{category.label} Components</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {ShowcaseComponent ? (
                    <Suspense fallback={<LoadingState />}>
                      <ShowcaseComponent />
                    </Suspense>
                  ) : (
                    <ComingSoon category={category.label} />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Toast notifications */}
      <Toaster />
    </div>
  );
}

// Loading state component
function LoadingState() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-4 w-2/3" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Coming soon component
function ComingSoon({ category }: { category: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h3 className="text-lg font-semibold text-muted-foreground mb-2">
        {category} Components Coming Soon
      </h3>
      <p className="text-sm text-muted-foreground max-w-md">
        We're working on creating interactive examples for all {category.toLowerCase()} components. 
        Check back soon!
      </p>
    </div>
  );
}