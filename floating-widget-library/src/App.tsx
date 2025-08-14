import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Home, Package, Palette, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";

// Import pages
import { LandingPage } from "./pages/LandingPage";
import { WidgetShowcase } from "./pages/WidgetShowcase";
import { ShadcnShowcase } from "./pages/ShadcnShowcase";

function App() {
  const location = useLocation();

  const navItems = [
    {
      path: "/",
      label: "Home",
      icon: Sparkles,
    },
    {
      path: "/showcase",
      label: "Widget Showcase",
      icon: Home,
    },
    {
      path: "/shadcn",
      label: "shadcn/ui Components",
      icon: Palette,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <Package className="h-6 w-6" />
              <span className="font-bold">Component Library</span>
            </Link>
          </div>
          
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-2 transition-colors hover:text-foreground/80",
                    location.pathname === item.path 
                      ? "text-foreground" 
                      : "text-foreground/60"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/showcase" element={<WidgetShowcase />} />
          <Route path="/shadcn" element={<ShadcnShowcase />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;