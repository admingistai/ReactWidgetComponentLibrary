import { useState } from "react";
import { MainFlow } from "@/components/widget";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, RefreshCw, Maximize2, Minimize2, Code2, Package } from "lucide-react";
// Import your custom component here
import CustomComponent from "@/components/custom/CustomComponent";

export function SandboxPage() {
  const [widgetKey, setWidgetKey] = useState(0);
  const [initialExpanded, setInitialExpanded] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("bg-slate-900");
  const [showGrid, setShowGrid] = useState(false);
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [lastAction, setLastAction] = useState<string>("");
  const [activeView, setActiveView] = useState<"widget" | "custom">("widget");

  const handleSuggestionSelect = (suggestion: string) => {
    setLastAction(`Suggestion selected: ${suggestion}`);
    console.log("Suggestion selected:", suggestion);
  };

  const resetWidget = () => {
    setWidgetKey(prev => prev + 1);
    setLastAction("Widget reset");
  };

  const backgroundOptions = [
    { value: "bg-white", label: "Light", color: "white" },
    { value: "bg-slate-900", label: "Dark", color: "#0f172a" },
    { value: "bg-gradient-to-br from-purple-600 to-blue-500", label: "Gradient", color: "linear-gradient(to bottom right, #9333ea, #3b82f6)" },
    { value: "bg-zinc-950", label: "Black", color: "#09090b" },
  ];

  return (
    <div className={`min-h-screen ${backgroundColor} transition-colors duration-300 relative`}>
      {/* Grid Overlay */}
      {showGrid && (
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      )}

      {/* Control Panel */}
      <div className="absolute top-4 left-4 right-4 z-40">
        <Card className="max-w-6xl mx-auto bg-background/95 backdrop-blur">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                <CardTitle>Widget Sandbox</CardTitle>
              </div>
              <div className="flex gap-2">
                {/* View Toggle Buttons */}
                <div className="flex gap-1 p-1 bg-muted rounded-lg">
                  <Button
                    variant={activeView === "widget" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveView("widget")}
                  >
                    <Package className="h-4 w-4 mr-1" />
                    Widget
                  </Button>
                  <Button
                    variant={activeView === "custom" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveView("custom")}
                  >
                    <Code2 className="h-4 w-4 mr-1" />
                    Custom
                  </Button>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowGrid(!showGrid)}
                  title="Toggle Grid"
                >
                  {showGrid ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  Grid
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetWidget}
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Reset
                </Button>
              </div>
            </div>
            <CardDescription>
              {activeView === "widget"
                ? "Test the New York Times widget in different environments"
                : "Test your custom React components in isolation"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="settings" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="background">Background</TabsTrigger>
                <TabsTrigger value="debug">Debug</TabsTrigger>
              </TabsList>

              <TabsContent value="settings" className="space-y-4">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Initial State</p>
                      <p className="text-xs text-muted-foreground">
                        Start with widget expanded or collapsed
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant={!initialExpanded ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setInitialExpanded(false);
                          resetWidget();
                        }}
                      >
                        Collapsed
                      </Button>
                      <Button
                        variant={initialExpanded ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setInitialExpanded(true);
                          resetWidget();
                        }}
                      >
                        Expanded
                      </Button>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    <p>• Click the widget button to toggle expand/collapse</p>
                    <p>• Focus the search bar to enter typing phase</p>
                    <p>• Click outside to return to idle state</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="background" className="space-y-4">
                <div className="grid grid-cols-4 gap-2">
                  {backgroundOptions.map(option => (
                    <button
                      key={option.value}
                      className={`relative h-20 rounded-lg border-2 transition-all ${
                        backgroundColor === option.value
                          ? 'border-primary ring-2 ring-primary/20'
                          : 'border-muted hover:border-muted-foreground/50'
                      }`}
                      style={{
                        background: option.color
                      }}
                      onClick={() => setBackgroundColor(option.value)}
                    >
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-medium px-2 py-0.5 bg-background/90 rounded">
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="debug" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Debug Info</p>
                    <p className="text-xs text-muted-foreground">
                      Show widget interaction logs
                    </p>
                  </div>
                  <Button
                    variant={showDebugInfo ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowDebugInfo(!showDebugInfo)}
                  >
                    {showDebugInfo ? "Hide" : "Show"} Debug
                  </Button>
                </div>

                {showDebugInfo && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs font-mono text-muted-foreground">
                      Last Action: {lastAction || "No actions yet"}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        Widget Key: {widgetKey}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Initial: {initialExpanded ? "Expanded" : "Collapsed"}
                      </Badge>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Component Display Area */}
      <div className="min-h-screen flex items-center justify-center pt-48">
        <div className="relative">
          {/* Shadow/Glow Effect */}
          <div className="absolute inset-0 blur-3xl opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
          </div>

          {/* Component Display */}
          <div className="relative z-10">
            {activeView === "widget" ? (
              <MainFlow
                key={widgetKey}
                initialExpanded={initialExpanded}
                onSuggestionSelect={handleSuggestionSelect}
              />
            ) : (
              <CustomComponent key={`custom-${widgetKey}`} />
            )}
          </div>
        </div>
      </div>

      {/* Debug Overlay */}
      {showDebugInfo && lastAction && (
        <div className="fixed bottom-4 right-4 z-50">
          <Card className="bg-background/95 backdrop-blur">
            <CardContent className="p-3">
              <p className="text-xs font-mono">{lastAction}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}