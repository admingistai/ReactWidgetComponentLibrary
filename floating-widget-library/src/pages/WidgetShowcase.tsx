import { useState, useMemo, useEffect } from "react";
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

// Widget Components for Showcase - Complete Set
import {
  // Atoms - Icons
  SparkleIcon,
  MicIcon,
  PlusIcon,
  PlusButtonIcon,
  GradientIcon,
  ProgressIndicator,
  SourceIcon,
  // Atoms - Typography
  Text,
  SearchingText,
  // Atoms - Logos
  NYTimesLogo,
  PoweredByLogo,
  // Atoms - Containers
  GlassContainer,
  IconButton as WidgetIconButton,
  // Molecules - Buttons
  CompactButton,
  ExpandButton,
  MoreButton,
  PlusButton,
  PoweredByButton,
  // Molecules - Search
  SearchBar,
  SearchingAnimation,
  // Molecules - Content
  AnswerHeader,
  AnswerText,
  SuggestionItem,
  TabBar,
  // Molecules - Sources
  PercentageSourceItem,
  PlusSourceItem,
  GlassSourceItem,
  // Molecules - Effects
  FadeOverlay,
  // Organisms
  Header,
  SuggestionsList,
  PoweredByFooter,
  AutocompleteDropdown,
  SourcesBar,
  StackedSources,
  // Phases
  ExpandedAnswerTab,
  TypingPhase,
  SearchingPhase,
  ResultsPhase,
  // Templates
  MainFlow,
} from "@/components/widget";
import { tokens } from "@/lib/design-tokens";

export function WidgetShowcase() {
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
  const [activeTab, setActiveTab] = useState("primitives");

  // Handle hash routing
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && ['primitives', 'composite', 'widget', 'playground'].includes(hash)) {
      setActiveTab(hash);
    }
  }, []);
  
  // Phase demonstration states
  const [phase2SearchValue, setPhase2SearchValue] = useState("");
  const [phase3SearchValue, setPhase3SearchValue] = useState("");
  const [phase3Suggestions, setPhase3Suggestions] = useState<string[]>([]);
  const [phase4SearchQuery, setPhase4SearchQuery] = useState("What did Trump say?");
  
  // Phase 5: Results state
  const [phase5IsLoadingSources, setPhase5IsLoadingSources] = useState(true);
  const [phase5FollowUpValue, setPhase5FollowUpValue] = useState("");
  
  // Interactive demo states for component showcase
  const [autocompleteValue, setAutocompleteValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [expandButtonState, setExpandButtonState] = useState(false);
  const [sourcesLoading, setSourcesLoading] = useState(true);
  const [demoSearchValue, setDemoSearchValue] = useState("");
  
  // Filtered suggestions for autocomplete demo
  const filteredSuggestions = useMemo(() => {
    if (!autocompleteValue) return [];
    return [
      "What's happening in politics?",
      "What are today's top stories?",
      "What did the president say?",
      "What's the weather forecast?",
      "What's trending on social media?"
    ].filter(s => s.toLowerCase().includes(autocompleteValue.toLowerCase()));
  }, [autocompleteValue]);
  
  // Mock sources for demos
  const mockSourcesDemo = [
    { title: "Trump impeachment article", percentage: "85" },
    { title: "Fed interest rate announcement", percentage: "72" },
    { title: "Elon Musk vs Trump debate", percentage: "60" },
    { title: "Election coverage 2024", percentage: "45" }
  ];

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
  
  // Phase demonstration handlers
  const handlePhase3SearchChange = (value: string) => {
    setPhase3SearchValue(value);
    // Simulate autocomplete suggestions
    const mockSuggestions = [
      "What did Trump say about the economy?",
      "What did Biden announce today?",
      "What's happening in Ukraine?",
      "What are the latest COVID updates?"
    ].filter(suggestion => 
      value.length > 0 && suggestion.toLowerCase().includes(value.toLowerCase())
    );
    setPhase3Suggestions(mockSuggestions.slice(0, 4));
  };
  
  // Mock data for Phase 5 (Results)
  const mockAnswerText = "Based on recent reporting from The New York Times, artificial intelligence is transforming multiple sectors of the economy. Companies are implementing AI solutions to improve efficiency, reduce costs, and enhance customer experiences. However, concerns about job displacement and ethical implications remain significant challenges that need to be addressed through thoughtful policy and regulation.";
  
  const mockSourcesPhase5 = [
    { title: "Trump impeachment", percentage: "75" },
    { title: "Fed interest rate announcement", percentage: "65" },
    { title: "Elon Musk vs Trump", percentage: "50" }
  ];

  const resetPhases = () => {
    setPhase2SearchValue("");
    setPhase3SearchValue("");
    setPhase3Suggestions([]);
    setPhase4SearchQuery("What did Trump say?");
    setPhase5IsLoadingSources(true);
    setPhase5FollowUpValue("");
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
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

        {/* Component Showcase */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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

            {/* Widget Phase Examples Section */}
            <Card>
              <CardHeader>
                <CardTitle>Widget Phase Examples</CardTitle>
                <CardDescription>
                  Interactive demonstration of each widget phase and state transition
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Explore each phase of the widget lifecycle with interactive examples
                  </p>
                  <Button variant="outline" size="sm" onClick={resetPhases}>
                    Reset All Phases
                  </Button>
                </div>

                {/* Phase 1: Collapsed State */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Phase 1: Collapsed State</h4>
                    <Badge variant="outline">COLLAPSED</Badge>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg flex justify-center">
                    <CompactButton 
                      onClick={() => console.log("Phase 1: Compact button clicked")}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Initial collapsed state with gradient button. Click to expand the widget.
                  </p>
                </div>

                {/* Phase 2: Expanded/Idle State */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Phase 2: Expanded/Idle State</h4>
                    <Badge variant="outline">EXPANDED</Badge>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg flex justify-center">
                    <ExpandedAnswerTab
                      searchValue={phase2SearchValue}
                      suggestions={["Top Stories", "Breaking News", "Generate a new Wordle"]}
                      onSearchChange={setPhase2SearchValue}
                      onSuggestionClick={(text) => {
                        console.log("Phase 2: Suggestion clicked:", text);
                        setPhase2SearchValue(text);
                      }}
                      onMoreClick={() => console.log("Phase 2: More clicked")}
                      onMicClick={() => console.log("Phase 2: Mic clicked")}
                      onSearchFocus={() => console.log("Phase 2: Search focused")}
                      onSearchBlur={() => console.log("Phase 2: Search blurred")}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Expanded interface with search bar, suggestions, and footer. Try typing in the search bar or clicking suggestions.
                  </p>
                </div>

                {/* Phase 3: Typing State */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Phase 3: Typing State</h4>
                    <Badge variant="outline">TYPING</Badge>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg flex justify-center">
                    <TypingPhase
                      searchValue={phase3SearchValue}
                      onSearchChange={handlePhase3SearchChange}
                      onSearch={(query) => console.log("Phase 3: Search triggered:", query)}
                      onMicClick={() => console.log("Phase 3: Mic clicked")}
                      onPlusClick={() => console.log("Phase 3: Plus clicked")}
                      autocompleteSuggestions={phase3Suggestions}
                      onAutocompleteSuggestionSelect={(suggestion) => {
                        console.log("Phase 3: Autocomplete selected:", suggestion);
                        setPhase3SearchValue(suggestion);
                        setPhase3Suggestions([]);
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Focused typing state with "Ask New York Times Anything!" header and autocomplete. Try typing "what" to see suggestions.
                  </p>
                </div>

                {/* Phase 4: Searching State */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Phase 4: Searching State</h4>
                    <Badge variant="outline">SEARCHING</Badge>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg flex justify-center">
                    <SearchingPhase
                      searchQuery={phase4SearchQuery}
                      onMicClick={() => console.log("Phase 4: Mic clicked")}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Active search state showing the query header with animated "Searching through..." text cycling through different content types.
                  </p>
                </div>

                {/* Phase 5: Results State */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Phase 5: Results State</h4>
                    <Badge variant="outline">RESULTS</Badge>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg flex justify-center">
                    <ResultsPhase
                      searchQuery="What did Trump say?"
                      answerText={mockAnswerText}
                      isLoadingSources={phase5IsLoadingSources}
                      sources={mockSourcesPhase5}
                      onSourceClick={(source) => console.log("Phase 5: Source clicked:", source)}
                      followUpValue={phase5FollowUpValue}
                      onFollowUpChange={setPhase5FollowUpValue}
                      onFollowUpSubmit={(query) => {
                        console.log("Phase 5: Follow-up search:", query);
                        setPhase5FollowUpValue("");
                      }}
                      onMicClick={() => console.log("Phase 5: Mic clicked")}
                      onPlusClick={() => console.log("Phase 5: Plus clicked")}
                      suggestions={["Top Stories", "Breaking News", "Generate a new Wordle"]}
                      onSuggestionClick={(text) => console.log("Phase 5: Suggestion clicked:", text)}
                      onMoreClick={() => console.log("Phase 5: More clicked")}
                    />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPhase5IsLoadingSources(!phase5IsLoadingSources)}
                    >
                      {phase5IsLoadingSources ? "Show Sources" : "Show Loading"}
                    </Button>
                    <span>Toggle loading state</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Results phase with complete expanded layout showing search query, answer, sources, follow-up input, suggestions, and footer. Try the loading toggle above.
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2">Phase Transition Flow</h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary">Phase 1</Badge>
                    <ArrowRight className="h-3 w-3" />
                    <Badge variant="secondary">Phase 2</Badge>
                    <ArrowRight className="h-3 w-3" />
                    <Badge variant="secondary">Phase 3</Badge>
                    <ArrowRight className="h-3 w-3" />
                    <Badge variant="secondary">Phase 4</Badge>
                    <ArrowRight className="h-3 w-3" />
                    <Badge variant="secondary">Phase 5</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Collapsed → Click → Expanded → Focus Search → Typing → Enter/Select → Searching → Results
                  </p>
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
                    Icons (7 components)
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
                    <div className="flex flex-col items-center gap-2">
                      <ProgressIndicator />
                      <span className="text-xs text-muted-foreground">
                        ProgressIndicator
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <SourceIcon />
                      <span className="text-xs text-muted-foreground">
                        SourceIcon
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <strong>Used in:</strong> Various UI components for visual feedback and actions. ProgressIndicator shows loading states, SourceIcon marks content sources.
                  </p>
                </div>

                {/* Typography */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Typography (3 components)
                  </h4>
                  <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <Text variant="placeholder">Ask anything...</Text>
                      <span className="text-xs text-muted-foreground">
                        variant="placeholder"
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
                    <div className="flex items-center gap-4">
                      <Text variant="body">Regular body text for content display</Text>
                      <span className="text-xs text-muted-foreground">
                        variant="body"
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <SearchingText 
                        previousItem="books"
                        currentItem="articles"
                        nextItem="videos"
                      />
                      <span className="text-xs text-muted-foreground">
                        SearchingText (animated)
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <strong>Used in:</strong> Phase 3 (Typing), Phase 4 (Searching). SearchingText provides animated text for loading states.
                  </p>
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
                {/* Buttons Section */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Buttons (5 components)</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">CompactButton</h5>
                      <div className="p-4 bg-muted/50 rounded-lg flex justify-center">
                        <CompactButton
                          onClick={() => console.log("Compact clicked")}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Phase 1 collapsed state button with gradient border
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">ExpandButton</h5>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex gap-4 justify-center">
                          <ExpandButton 
                            isExpanded={false} 
                            onClick={() => setExpandButtonState(!expandButtonState)}
                          />
                          <ExpandButton 
                            isExpanded={true} 
                            onClick={() => setExpandButtonState(!expandButtonState)}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Toggle button showing buttonopen.png / buttonclose.png
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">MoreButton</h5>
                      <div className="p-4 bg-muted/50 rounded-lg flex justify-center">
                        <MoreButton
                          onClick={() => console.log("More clicked")}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        "More" button with wand icon
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">PlusButton</h5>
                      <div className="p-4 bg-muted/50 rounded-lg flex justify-center">
                        <PlusButton
                          onClick={() => console.log("Plus clicked")}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Circular plus button for actions
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">PoweredByButton</h5>
                      <div className="p-4 bg-muted/50 rounded-lg flex justify-center">
                        <PoweredByButton />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Footer branding button
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Content (4 components)</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">AnswerHeader</h5>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <AnswerHeader searchQuery="What did Trump say?" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Displays user query in results phase
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">AnswerText</h5>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <AnswerText>
                          This is a sample answer text that would be displayed in the results phase. 
                          It can contain multiple sentences and paragraphs.
                        </AnswerText>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Formatted text for AI responses
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">SuggestionItem (Default)</h5>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <SuggestionItem
                          text="Sample suggestion"
                          onClick={() => console.log("Suggestion clicked")}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Default with 2-star icon
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">SuggestionItem (Search)</h5>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <SuggestionItem
                          text="Search query example"
                          onClick={() => console.log("Search suggestion clicked")}
                          variant="search"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Search variant with magnifying glass
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">TabBar</h5>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <TabBar
                          title="Results"
                          isExpanded={expandButtonState}
                          onClick={() => setExpandButtonState(!expandButtonState)}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Navigation tabs for multi-view interfaces
                      </p>
                    </div>
                  </div>
                </div>

                {/* Search Section */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Search (2 components)</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">SearchBar (Complete with dependencies)</h5>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <SearchBar
                          value={demoSearchValue}
                          onChange={setDemoSearchValue}
                          onMicClick={() => console.log("Mic clicked")}
                          onPlusClick={() => console.log("Plus clicked")}
                          placeholder="Ask anything..."
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        <strong>Includes:</strong> GlassContainer, PlusButton, MicIcon, NYTimesLogo. Used in all phases for search input.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">SearchingAnimation</h5>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <SearchingAnimation 
                          isActive={true}
                          interval={2000}
                          items={["articles", "books", "videos", "podcasts", "archives", "newsletters"]}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Vertical text carousel for Phase 4 searching state
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sources Section - NEW Glass Morphism Design */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Sources - Glass Morphism Design 🆕</h4>
                  <div className="space-y-4">
                    {/* Individual GlassSourceItem Demo */}
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">GlassSourceItem (All 4 Lengths)</h5>
                      <div className="p-6 bg-slate-900 rounded-lg space-y-6">
                        {/* NYT - First source (80px expanded) */}
                        <div className="space-y-2">
                          <p className="text-xs text-gray-400 font-medium">1. NYT (40px → 73px)</p>
                          <div className="flex gap-4 items-center">
                            <GlassSourceItem
                              logo="/nytlogo.png"
                              percentage="34%"
                              backgroundColor={tokens.colors.sources.nyt}
                              isExpanded={false}
                              index={0}
                              width={40}
                              onClick={() => window.open('https://www.nytimes.com/', '_blank')}
                            />
                            <span className="text-xs text-gray-500">→</span>
                            <GlassSourceItem
                              logo="/nytlogo.png"
                              percentage="34%"
                              backgroundColor={tokens.colors.sources.nyt}
                              isExpanded={true}
                              index={0}
                              width={73}
                              onClick={() => window.open('https://www.nytimes.com/', '_blank')}
                            />
                          </div>
                        </div>

                        {/* Daily Mail - Second source (160px expanded) */}
                        <div className="space-y-2">
                          <p className="text-xs text-gray-400 font-medium">2. Daily Mail (73px → 146px)</p>
                          <div className="flex gap-4 items-center">
                            <GlassSourceItem
                              logo="/dmlogo.png"
                              percentage="25%"
                              backgroundColor={tokens.colors.sources.dailyMail}
                              isExpanded={false}
                              index={1}
                              width={73}
                              onClick={() => window.open('https://www.dailymail.co.uk/ushome/index.html', '_blank')}
                            />
                            <span className="text-xs text-gray-500">→</span>
                            <GlassSourceItem
                              logo="/dmlogo.png"
                              percentage="25%"
                              backgroundColor={tokens.colors.sources.dailyMail}
                              isExpanded={true}
                              index={1}
                              width={146}
                              onClick={() => window.open('https://www.dailymail.co.uk/ushome/index.html', '_blank')}
                            />
                          </div>
                        </div>

                        {/* AW - Third source (240px expanded) */}
                        <div className="space-y-2">
                          <p className="text-xs text-gray-400 font-medium">3. AW (106px → 212px)</p>
                          <div className="flex gap-4 items-center">
                            <GlassSourceItem
                              logo="/awlogo.png"
                              percentage="10%"
                              backgroundColor={tokens.colors.sources.aw}
                              isExpanded={false}
                              index={2}
                              width={106}
                              onClick={() => window.open('https://aws.amazon.com/co-marketing/', '_blank')}
                            />
                            <span className="text-xs text-gray-500">→</span>
                            <GlassSourceItem
                              logo="/awlogo.png"
                              percentage="10%"
                              backgroundColor={tokens.colors.sources.aw}
                              isExpanded={true}
                              index={2}
                              width={212}
                              onClick={() => window.open('https://aws.amazon.com/co-marketing/', '_blank')}
                            />
                          </div>
                        </div>

                        {/* More - Fourth source (300px expanded) */}
                        <div className="space-y-2">
                          <p className="text-xs text-gray-400 font-medium">4. More (140px → 284px)</p>
                          <div className="flex gap-4 items-center">
                            <GlassSourceItem
                              logo="/morelogo.png"
                              percentage="10%"
                              backgroundColor={tokens.colors.sources.more}
                              isExpanded={false}
                              index={3}
                              width={140}
                              onClick={() => console.log("More sources clicked")}
                            />
                            <span className="text-xs text-gray-500">→</span>
                            <GlassSourceItem
                              logo="/morelogo.png"
                              percentage="10%"
                              backgroundColor={tokens.colors.sources.more}
                              isExpanded={true}
                              index={3}
                              width={284}
                              onClick={() => console.log("More sources clicked")}
                            />
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        <strong>All 4 source lengths:</strong> Collapsed (40px, 73px, 106px, 140px) → Expanded (73px, 146px, 212px, 284px) for progressive reveal.
                        <br />
                        <strong>Colors:</strong> NYT (#6E5FBC), Daily Mail (#594495), AW (#603C75), More (#333333)
                      </p>
                    </div>

                    {/* Legacy Source Components (keeping for backward compatibility) */}
                    <details className="group">
                      <summary className="text-sm font-medium text-muted-foreground cursor-pointer hover:text-foreground">
                        Legacy Source Components (deprecated) ▼
                      </summary>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <PercentageSourceItem 
                            title="NYT Article"
                            percentage="85"
                            onClick={() => console.log("Source clicked")}
                          />
                          <p className="text-xs text-muted-foreground mt-2">
                            PercentageSourceItem (old design)
                          </p>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <PlusSourceItem
                            title="Add Source"
                            onClick={() => console.log("Add source clicked")}
                          />
                          <p className="text-xs text-muted-foreground mt-2">
                            PlusSourceItem (old design)
                          </p>
                        </div>
                      </div>
                    </details>
                  </div>
                </div>

                {/* Effects Section */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">Effects (1 component)</h4>
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">FadeOverlay</h5>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="relative h-20 overflow-hidden">
                        <div className="text-sm">
                          This is a long text that would normally overflow the container. 
                          The FadeOverlay component creates a gradient fade effect at the bottom
                          to indicate there's more content below. This is commonly used for
                          truncating long answer texts in the collapsed state.
                        </div>
                        <FadeOverlay />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Creates gradient fade for content truncation in Phase 5 collapsed state
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Organisms Section */}
            <Card>
              <CardHeader>
                <CardTitle>🧬 Organisms - Complex UI Sections</CardTitle>
                <CardDescription>
                  Complex components that combine multiple molecules and atoms with full dependencies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Header</h4>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <Header />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Main header component for widget phases
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">AutocompleteDropdown (with SearchBar)</h4>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="relative">
                        <SearchBar
                          value={autocompleteValue}
                          onChange={(value) => {
                            setAutocompleteValue(value);
                            setShowDropdown(value.length > 0);
                          }}
                          onFocus={() => setShowDropdown(autocompleteValue.length > 0)}
                          placeholder="Try typing 'what'..."
                        />
                        {showDropdown && filteredSuggestions.length > 0 && (
                          <AutocompleteDropdown
                            suggestions={filteredSuggestions}
                            searchValue={autocompleteValue}
                            onSuggestionSelect={(item: string) => {
                              setAutocompleteValue(item);
                              setShowDropdown(false);
                              console.log("Selected:", item);
                            }}
                          />
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <strong>Complete search with dropdown</strong> - Try typing "what" to see suggestions. 
                      <br />
                      <strong>Requires:</strong> SearchBar for input, SuggestionItem for each suggestion
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">SourcesBar (with Loading States)</h4>
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-xs font-medium mb-2">Loading State:</p>
                        <SourcesBar isLoading={true} sources={[]} />
                      </div>
                      
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-xs font-medium mb-2">Loaded State with Sources:</p>
                        <SourcesBar 
                          isLoading={false}
                          sources={mockSourcesDemo}
                          onSourceClick={(source) => console.log("Source clicked:", source)}
                        />
                        <div className="mt-2 flex justify-end">
                          <button
                            className="text-xs text-muted-foreground hover:text-foreground"
                            onClick={() => setSourcesLoading(!sourcesLoading)}
                          >
                            Toggle Loading State
                          </button>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <strong>Uses:</strong> PercentageSourceItem for each source, ProgressIndicator for loading, SourceIcon for icons
                      <br />
                      <strong>Used in:</strong> Phase 5 (Results) to display content sources
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">SuggestionsList (with SuggestionItems)</h4>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <SuggestionsList
                        suggestions={[
                          "What's happening today?",
                          "Top Stories",
                          "Breaking News",
                          "Generate a new Wordle",
                        ]}
                        onSuggestionClick={(text) =>
                          console.log("Suggestion clicked:", text)
                        }
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <strong>Creates:</strong> SuggestionItem for each suggestion with 2-star icons
                      <br />
                      <strong>Used in:</strong> Phases 2 and 5 for quick action suggestions
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">PoweredByFooter</h4>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <PoweredByFooter />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Footer component with branding, used in multiple phases
                    </p>
                  </div>

                  {/* NEW StackedSources Component */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">StackedSources (NEW Glass Morphism Design) 🆕</h4>
                    <div className="p-6 bg-slate-900 rounded-lg">
                      <div className="flex justify-center">
                        <StackedSources
                          sources={[
                            { 
                              id: 'nyt', 
                              logo: '/nytlogo.png', 
                              name: 'NY Times', 
                              percentage: '34%',
                              color: tokens.colors.sources.nyt,
                              url: 'https://www.nytimes.com/'
                            },
                            { 
                              id: 'dailymail', 
                              logo: '/dmlogo.png', 
                              name: 'Daily Mail', 
                              percentage: '25%',
                              color: tokens.colors.sources.dailyMail,
                              url: 'https://www.dailymail.co.uk/ushome/index.html'
                            },
                            { 
                              id: 'aw', 
                              logo: '/awlogo.png',
                              name: 'AW', 
                              percentage: '10%',
                              color: tokens.colors.sources.aw,
                              url: 'https://aws.amazon.com/co-marketing/'
                            },
                            { 
                              id: 'more', 
                              logo: '/morelogo.png', 
                              name: 'More', 
                              percentage: '10%',
                              color: tokens.colors.sources.more
                            }
                          ]}
                          onSourceClick={(source) => console.log('Source clicked:', source)}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <strong>Hover to expand!</strong> Stacked source pills with overlapping layout. 
                      All sources expand together on hover to show percentages.
                      <br />
                      <strong>Colors:</strong> NYT (#6E5FBC), Daily Mail (#594495), AW (#603C75), More (#333333)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Component Dependencies Map */}
            <Card>
              <CardHeader>
                <CardTitle>🔗 Component Dependencies Map</CardTitle>
                <CardDescription>
                  Understanding which components require others to function properly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* SearchBar Dependencies */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">SearchBar requires:</h4>
                      <div className="ml-4 space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="text-xs">•</span>
                          <span>GlassContainer</span>
                          <Badge variant="outline" className="text-xs">container</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="text-xs">•</span>
                          <span>PlusButton + PlusButtonIcon</span>
                          <Badge variant="outline" className="text-xs">action</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="text-xs">•</span>
                          <span>MicIcon + IconButton</span>
                          <Badge variant="outline" className="text-xs">input</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="text-xs">•</span>
                          <span>NYTimesLogo</span>
                          <Badge variant="outline" className="text-xs">branding</Badge>
                        </div>
                      </div>
                    </div>
                    
                    {/* AutocompleteDropdown Dependencies */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">AutocompleteDropdown requires:</h4>
                      <div className="ml-4 space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="text-xs">•</span>
                          <span>SearchBar</span>
                          <Badge variant="outline" className="text-xs">input</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="text-xs">•</span>
                          <span>SuggestionItem</span>
                          <Badge variant="outline" className="text-xs">list items</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="text-xs">•</span>
                          <span>Text component</span>
                          <Badge variant="outline" className="text-xs">typography</Badge>
                        </div>
                      </div>
                    </div>
                    
                    {/* SourcesBar Dependencies */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">SourcesBar requires:</h4>
                      <div className="ml-4 space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="text-xs">•</span>
                          <span>PercentageSourceItem</span>
                          <Badge variant="outline" className="text-xs">items</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="text-xs">•</span>
                          <span>SourceIcon</span>
                          <Badge variant="outline" className="text-xs">icon</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="text-xs">•</span>
                          <span>ProgressIndicator</span>
                          <Badge variant="outline" className="text-xs">loading</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="text-xs">•</span>
                          <span>Text component</span>
                          <Badge variant="outline" className="text-xs">labels</Badge>
                        </div>
                      </div>
                    </div>
                    
                    {/* ResultsPhase Dependencies */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">ResultsPhase requires:</h4>
                      <div className="ml-4 space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="text-xs">•</span>
                          <span>GlassContainer</span>
                          <Badge variant="outline" className="text-xs">container</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="text-xs">•</span>
                          <span>AnswerHeader + ExpandButton</span>
                          <Badge variant="outline" className="text-xs">header</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="text-xs">•</span>
                          <span>AnswerText + FadeOverlay</span>
                          <Badge variant="outline" className="text-xs">content</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="text-xs">•</span>
                          <span>SourcesBar (all sub-components)</span>
                          <Badge variant="outline" className="text-xs">sources</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="text-xs">•</span>
                          <span>SearchBar</span>
                          <Badge variant="outline" className="text-xs">follow-up</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="text-xs">•</span>
                          <span>SuggestionsList</span>
                          <Badge variant="outline" className="text-xs">suggestions</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="text-xs">•</span>
                          <span>MoreButton + PoweredByButton</span>
                          <Badge variant="outline" className="text-xs">footer</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium text-sm mb-3">Component Hierarchy Summary</h4>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <pre className="text-xs text-muted-foreground">
{`Atoms (15 components) → Foundation layer
├── Icons (7): Visual indicators and actions
├── Typography (3): Text styling and animation
├── Logos (2): Brand identity
└── Containers (3): Layout and structure

Molecules (14 components) → Composed atoms
├── Buttons (5): User interactions
├── Search (2): Input and animation
├── Content (4): Information display
├── Sources (2): Attribution items
└── Effects (1): Visual enhancements

Organisms (6 components) → Complex sections
├── Header, Footer: Layout structure
├── AutocompleteDropdown: Search enhancement
├── SourcesBar: Content attribution
└── SuggestionsList: Quick actions

Phases (4 components) → Complete states
└── Each phase combines multiple organisms

Templates (1 component) → Full widget
└── MainFlow: Manages all phases and state`}
                      </pre>
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