import { useState } from "react";
import { Button } from "@/components/primitives/Button";
import { Button as ShadcnButton } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  ArrowRight,
  Check,
  Download,
  Heart,
  Settings,
  X,
  MessageCircle,
  Palette,
} from "lucide-react";
import {
  WIDGET_STATES,
  WIDGET_POSITIONS,
  type WidgetState,
  type WidgetPosition,
} from "@/lib/constants";
import { FloatingWidget } from "@/components/widget";
import { ChatWidget } from "@/components/composite/ChatWidget";
import { ThemeToggle } from "@/components/ui/theme-toggle";

// Widget Components for Showcase
import {
  // Atoms
  SparkleIcon,
  MicIcon,
  PlusIcon,
  PlusButtonIcon,
  GradientIcon,
  Text,
  NYTimesLogo,
  PoweredByLogo,
  GlassContainer,
  IconButton as WidgetIconButton,
  // Molecules
  CompactButton,
  SearchBar,
  SuggestionItem,
  MoreButton,
  PlusButton,
  PoweredByButton,
  // Organisms
  Header,
  SuggestionsList,
  PoweredByFooter,
  // Templates
  MainFlow,
} from "@/components/widget";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [widgetState, setWidgetState] = useState<WidgetState>(
    WIDGET_STATES.FLOATING
  );
  const [widgetPosition, setWidgetPosition] = useState<WidgetPosition>(
    WIDGET_POSITIONS.BOTTOM_RIGHT
  );
  const [showChatWidget, setShowChatWidget] = useState(false);
  const [showDemoWidget, setShowDemoWidget] = useState(false);
  const [chatMessages, setChatMessages] = useState<any[]>([]);

  const handleLoadingClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleSendMessage = (text: string) => {
    const newMessage = {
      id: Date.now().toString(),
      text,
      sender: "user" as const,
      timestamp: new Date(),
      status: "sent" as const,
    };
    setChatMessages([...chatMessages, newMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: `You said: "${text}"`,
        sender: "bot" as const,
        timestamp: new Date(),
        status: "delivered" as const,
      };
      setChatMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with Theme Toggle */}
        <div className="relative">
          {/* Theme Toggle in top-right */}
          <div className="absolute top-0 right-0">
            <ThemeToggle />
          </div>

          {/* Header Content */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Floating Widget Component Library
            </h1>
            <p className="text-xl text-muted-foreground">
              A comprehensive React component library for building floating
              widgets
            </p>
            <div className="flex gap-2 justify-center">
              <Badge>React</Badge>
              <Badge>TypeScript</Badge>
              <Badge>Tailwind CSS</Badge>
              <Badge>shadcn/ui</Badge>
              <Badge>Framer Motion</Badge>
            </div>
          </div>
        </div>

        {/* Component Showcase */}
        <Tabs defaultValue="primitives" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="primitives">Primitives</TabsTrigger>
            <TabsTrigger value="composite">Composite</TabsTrigger>
            <TabsTrigger value="widget">Widget</TabsTrigger>
            <TabsTrigger value="playground">Playground</TabsTrigger>
          </TabsList>

          {/* Primitives Tab */}
          <TabsContent value="primitives" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Button Component</CardTitle>
                <CardDescription>
                  Enhanced button with loading states, icons, and animations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Variants</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="default">Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">With Icons</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button leftIcon={<Settings />}>Settings</Button>
                    <Button rightIcon={<ArrowRight />}>Continue</Button>
                    <Button leftIcon={<Download />} rightIcon={<Check />}>
                      Download
                    </Button>
                    <Button variant="destructive" leftIcon={<X />}>
                      Delete
                    </Button>
                    <Button variant="outline" leftIcon={<Heart />}>
                      Like
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Loading States</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button isLoading loadingText="Loading...">
                      Click me
                    </Button>
                    <Button
                      isLoading={isLoading}
                      onClick={handleLoadingClick}
                      loadingText="Processing..."
                    >
                      Click to load
                    </Button>
                    <Button variant="outline" isLoading>
                      Outline Loading
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Sizes & States</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button disabled>Disabled</Button>
                    <Button fullWidth>Full Width</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Animation Control</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button animate={true}>With Animation</Button>
                    <Button animate={false}>Without Animation</Button>
                    <Button
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      Custom Animation
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Composite Tab */}
          <TabsContent value="composite">
            <Card>
              <CardHeader>
                <CardTitle>Composite Components</CardTitle>
                <CardDescription>
                  Complex components built from primitives
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertTitle>Coming Soon</AlertTitle>
                  <AlertDescription>
                    Composite components combining multiple primitives will be
                    added here.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Widget Tab */}
          <TabsContent value="widget" className="space-y-4">
            {/* Widget Examples Section */}
            <Card>
              <CardHeader>
                <CardTitle>Widget Examples</CardTitle>
                <CardDescription>
                  Live widget examples and interactive demos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Button
                    onClick={() => setShowChatWidget(!showChatWidget)}
                    leftIcon={<MessageCircle />}
                  >
                    {showChatWidget ? "Hide" : "Show"} Chat Widget
                  </Button>
                  <Button
                    onClick={() => setShowDemoWidget(!showDemoWidget)}
                    leftIcon={<Palette />}
                    variant="outline"
                  >
                    {showDemoWidget ? "Hide" : "Show"} Demo Widget
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Atoms Section */}
            <Card>
              <CardHeader>
                <CardTitle>🔬 Atoms - Basic Building Blocks</CardTitle>
                <CardDescription>
                  Pure presentational components with no state - the foundation
                  of our widget system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Icons */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Icons
                  </h4>
                  <div className="flex flex-wrap gap-4 items-center p-4 bg-muted/50 rounded-lg">
                    <div className="flex flex-col items-center gap-2">
                      <SparkleIcon />
                      <span className="text-xs text-muted-foreground">
                        SparkleIcon
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <MicIcon />
                      <span className="text-xs text-muted-foreground">
                        MicIcon
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <PlusIcon />
                      <span className="text-xs text-muted-foreground">
                        PlusIcon
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <PlusButtonIcon />
                      <span className="text-xs text-muted-foreground">
                        PlusButtonIcon
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <GradientIcon />
                      <span className="text-xs text-muted-foreground">
                        GradientIcon
                      </span>
                    </div>
                  </div>
                </div>

                {/* Typography */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Typography
                  </h4>
                  <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <Text variant="placeholder">Ask anything...</Text>
                      <span className="text-xs text-muted-foreground">
                        variant="ask"
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Text variant="suggestion">Top Stories</Text>
                      <span className="text-xs text-muted-foreground">
                        variant="suggestion"
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Text variant="powered">Powered by</Text>
                      <span className="text-xs text-muted-foreground">
                        variant="powered"
                      </span>
                    </div>
                  </div>
                </div>

                {/* Logos */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Logos
                  </h4>
                  <div className="flex flex-wrap gap-6 items-center p-4 bg-muted/50 rounded-lg">
                    <div className="flex flex-col items-center gap-2">
                      <NYTimesLogo />
                      <span className="text-xs text-muted-foreground">
                        NYTimesLogo
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <PoweredByLogo />
                      <span className="text-xs text-muted-foreground">
                        PoweredByLogo
                      </span>
                    </div>
                  </div>
                </div>

                {/* Containers */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Containers
                  </h4>
                  <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                    <div className="space-y-2">
                      <div className="flex items-center gap-4">
                        <GlassContainer variant="compact">
                          <span className="text-sm">Compact Container</span>
                        </GlassContainer>
                        <span className="text-xs text-muted-foreground">
                          variant="compact"
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <GlassContainer variant="searchBar">
                          <span className="text-sm px-4">
                            SearchBar Container
                          </span>
                        </GlassContainer>
                        <span className="text-xs text-muted-foreground">
                          variant="searchBar"
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <WidgetIconButton>
                        <Settings className="h-4 w-4" />
                      </WidgetIconButton>
                      <span className="text-xs text-muted-foreground">
                        IconButton
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Molecules Section */}
            <Card>
              <CardHeader>
                <CardTitle>🧪 Molecules - Composed Components</CardTitle>
                <CardDescription>
                  Components composed of multiple atoms - still pure
                  presentational but more complex
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">CompactButton</h4>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <CompactButton
                          onClick={() => console.log("Compact clicked")}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">MoreButton</h4>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <MoreButton
                          onClick={() => console.log("More clicked")}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">PlusButton</h4>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <PlusButton
                          onClick={() => console.log("Plus clicked")}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">SuggestionItem</h4>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <SuggestionItem
                          text="Sample suggestion"
                          onClick={() => console.log("Suggestion clicked")}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">PoweredByButton</h4>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <PoweredByButton />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">SearchBar</h4>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <SearchBar
                      value=""
                      onChange={(value) => console.log("Search:", value)}
                      onMicClick={() => console.log("Mic clicked")}
                      onPlusClick={() => console.log("Plus clicked")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Organisms Section */}
            <Card>
              <CardHeader>
                <CardTitle>🧬 Organisms - Complex UI Sections</CardTitle>
                <CardDescription>
                  Complex components that combine multiple molecules and atoms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Header</h4>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <Header />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">SuggestionsList</h4>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <SuggestionsList
                        suggestions={[
                          "Top Stories",
                          "Breaking News",
                          "Generate a new Wordle",
                        ]}
                        onSuggestionClick={(text) =>
                          console.log("Suggestion:", text)
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">PoweredByFooter</h4>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <PoweredByFooter />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Templates Section */}
            <Card>
              <CardHeader>
                <CardTitle>🏗️ Templates - Complete Components</CardTitle>
                <CardDescription>
                  Page-level components that combine organisms with state
                  management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">
                    MainFlow (Complete Widget)
                  </h4>
                  <div className="p-6 bg-muted/50 rounded-lg flex justify-center">
                    <MainFlow
                      initialExpanded={false}
                      onSuggestionSelect={(suggestion) =>
                        console.log("Template suggestion:", suggestion)
                      }
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Click to expand and test the complete widget functionality
                    including click-outside behavior
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Playground Tab */}
          <TabsContent value="playground">
            <Card>
              <CardHeader>
                <CardTitle>Widget Playground</CardTitle>
                <CardDescription>
                  Test and configure widget behavior
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Widget State</h3>
                    <div className="flex flex-col gap-2">
                      {Object.values(WIDGET_STATES).map((state) => (
                        <ShadcnButton
                          key={state}
                          variant={
                            widgetState === state ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setWidgetState(state)}
                        >
                          {state}
                        </ShadcnButton>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Widget Position
                    </h3>
                    <div className="flex flex-col gap-2">
                      {Object.values(WIDGET_POSITIONS).map((position) => (
                        <ShadcnButton
                          key={position}
                          variant={
                            widgetPosition === position ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setWidgetPosition(position)}
                        >
                          {position}
                        </ShadcnButton>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg bg-muted">
                  <p className="text-sm text-muted-foreground">
                    Current State: <Badge>{widgetState}</Badge>
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Current Position: <Badge>{widgetPosition}</Badge>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Widgets */}
      {showChatWidget && (
        <ChatWidget
          messages={chatMessages}
          onSendMessage={handleSendMessage}
          title="Support Chat"
          subtitle="We're here to help"
          onClose={() => setShowChatWidget(false)}
          position={WIDGET_POSITIONS.BOTTOM_RIGHT}
          size="SMALL"
        />
      )}

      {/* NYTimes Floating Widget */}
      {showDemoWidget && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <FloatingWidget
            initialExpanded={false}
            onSuggestionSelect={(suggestion) => {
              console.log("Suggestion selected:", suggestion);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
