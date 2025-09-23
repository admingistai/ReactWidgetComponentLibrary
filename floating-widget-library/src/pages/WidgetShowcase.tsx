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
  ShareIcon,
  // Atoms - Buttons
  IconButtonWrapper,
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
  NewsArticleCard,
  ShareThreadCard,
  ShareThreadModal,
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
  const [showShareModal, setShowShareModal] = useState(false);

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

                {/* Icon Buttons Section */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Icon Buttons (Light Theme Collection - Complete Set)
                  </h4>
                  <div className="p-4 bg-muted/50 rounded-lg overflow-y-auto max-h-[600px]">
                    <div className="grid grid-cols-10 gap-3">
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Clock clicked')}
                          title="Clock"
                          ariaLabel="Clock button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#7A7A7A"/>
                            <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Clock</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Mic clicked')}
                          title="Microphone"
                          ariaLabel="Microphone button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" fill="#7A7A7A"/>
                            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Mic</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Plus clicked')}
                          title="Plus"
                          ariaLabel="Plus button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Plus</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Share clicked')}
                          title="Share"
                          ariaLabel="Share button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Share</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Copy clicked')}
                          title="Copy"
                          ariaLabel="Copy button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Copy</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Settings clicked')}
                          title="Settings"
                          ariaLabel="Settings button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Settings</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Volume clicked')}
                          title="Volume"
                          ariaLabel="Volume button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Volume</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Search clicked')}
                          title="Search"
                          ariaLabel="Search button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Search</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('User clicked')}
                          title="User"
                          ariaLabel="User button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">User</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Calendar clicked')}
                          title="Calendar"
                          ariaLabel="Calendar button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z" fill="#7A7A7A"/>
                            <path d="M7 10h5v5H7z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Calendar</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Edit clicked')}
                          title="Edit"
                          ariaLabel="Edit button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Edit</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Help clicked')}
                          title="Help"
                          ariaLabel="Help button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Help</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Home clicked')}
                          title="Home"
                          ariaLabel="Home button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Home</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Star clicked')}
                          title="Star"
                          ariaLabel="Star button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Star</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Download clicked')}
                          title="Download"
                          ariaLabel="Download button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Download</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Sparkle clicked')}
                          title="Sparkle"
                          ariaLabel="Sparkle button"
                        >
                          <SparkleIcon />
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Sparkle</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Bell clicked')}
                          title="Bell"
                          ariaLabel="Bell button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Bell</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Archive clicked')}
                          title="Archive"
                          ariaLabel="Archive button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Archive</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Trash clicked')}
                          title="Trash"
                          ariaLabel="Trash button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Trash</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Mail clicked')}
                          title="Mail"
                          ariaLabel="Mail button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Mail</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Lock clicked')}
                          title="Lock"
                          ariaLabel="Lock button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Lock</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Link clicked')}
                          title="Link"
                          ariaLabel="Link button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Link</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Tag clicked')}
                          title="Tag"
                          ariaLabel="Tag button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Tag</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Bookmark clicked')}
                          title="Bookmark"
                          ariaLabel="Bookmark button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Bookmark</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Camera clicked')}
                          title="Camera"
                          ariaLabel="Camera button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="3.2" fill="#7A7A7A"/>
                            <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Camera</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Eye clicked')}
                          title="Eye"
                          ariaLabel="Eye button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Eye</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Eye Off clicked')}
                          title="Eye Off"
                          ariaLabel="Eye Off button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Eye Off</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Layers clicked')}
                          title="Layers"
                          ariaLabel="Layers button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Layers</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Target clicked')}
                          title="Target"
                          ariaLabel="Target button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" fill="#7A7A7A"/>
                            <circle cx="12" cy="12" r="5" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Target</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Compass clicked')}
                          title="Compass"
                          ariaLabel="Compass button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Compass</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Globe clicked')}
                          title="Globe"
                          ariaLabel="Globe button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Globe</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Info clicked')}
                          title="Info"
                          ariaLabel="Info button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Info</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Alert clicked')}
                          title="Alert"
                          ariaLabel="Alert button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Alert</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Check clicked')}
                          title="Check"
                          ariaLabel="Check button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Check</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('X clicked')}
                          title="X"
                          ariaLabel="X button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">X</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Minus clicked')}
                          title="Minus"
                          ariaLabel="Minus button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 13H5v-2h14v2z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Minus</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Play clicked')}
                          title="Play"
                          ariaLabel="Play button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 5v14l11-7z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Play</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Pause clicked')}
                          title="Pause"
                          ariaLabel="Pause button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Pause</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Stop clicked')}
                          title="Stop"
                          ariaLabel="Stop button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 6h12v12H6z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Stop</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Menu clicked')}
                          title="Menu"
                          ariaLabel="Menu button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Menu</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('More clicked')}
                          title="More"
                          ariaLabel="More button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">More</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Chevron Up clicked')}
                          title="Chevron Up"
                          ariaLabel="Chevron Up button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Up</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Chevron Down clicked')}
                          title="Chevron Down"
                          ariaLabel="Chevron Down button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Down</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Chevron Left clicked')}
                          title="Chevron Left"
                          ariaLabel="Chevron Left button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Left</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Chevron Right clicked')}
                          title="Chevron Right"
                          ariaLabel="Chevron Right button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Right</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Arrow Up clicked')}
                          title="Arrow Up"
                          ariaLabel="Arrow Up button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Ar Up</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Arrow Down clicked')}
                          title="Arrow Down"
                          ariaLabel="Arrow Down button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Ar Down</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Arrow Left clicked')}
                          title="Arrow Left"
                          ariaLabel="Arrow Left button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Ar Left</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Arrow Right clicked')}
                          title="Arrow Right"
                          ariaLabel="Arrow Right button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Ar Right</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Refresh clicked')}
                          title="Refresh"
                          ariaLabel="Refresh button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Refresh</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Code clicked')}
                          title="Code"
                          ariaLabel="Code button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Code</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('File clicked')}
                          title="File"
                          ariaLabel="File button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">File</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Document clicked')}
                          title="Document"
                          ariaLabel="Document button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Document</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Folder clicked')}
                          title="Folder"
                          ariaLabel="Folder button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Folder</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Credit Card clicked')}
                          title="Credit Card"
                          ariaLabel="Credit Card button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Card</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Money clicked')}
                          title="Money"
                          ariaLabel="Money button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Money</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Graph clicked')}
                          title="Graph"
                          ariaLabel="Graph button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Graph</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Percent clicked')}
                          title="Percent"
                          ariaLabel="Percent button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.5 11C9.43 11 11 9.43 11 7.5S9.43 4 7.5 4 4 5.57 4 7.5 5.57 11 7.5 11zm0-5C8.33 6 9 6.67 9 7.5S8.33 9 7.5 9 6 8.33 6 7.5 6.67 6 7.5 6zM16.5 13c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0 5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5.41 20L4 18.59 18.59 4 20 5.41z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Percent</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Bug clicked')}
                          title="Bug"
                          ariaLabel="Bug button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5c-.49 0-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Bug</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Smile clicked')}
                          title="Smile"
                          ariaLabel="Smile button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Smile</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Thumbs Up clicked')}
                          title="Thumbs Up"
                          ariaLabel="Thumbs Up button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.85-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Thumbs Up</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <IconButtonWrapper
                          onClick={() => console.log('Thumbs Down clicked')}
                          title="Thumbs Down"
                          ariaLabel="Thumbs Down button"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 3H6c-.83 0-1.54.5-1.85 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" fill="#7A7A7A"/>
                          </svg>
                        </IconButtonWrapper>
                        <span className="text-xs text-muted-foreground">Thumbs Dn</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <strong>IconButtonWrapper:</strong> Transparent background buttons matching ExpandButton style.
                    48x48px with hover effects (opacity 0.7, scale 1.05). All SVG icons from /assets/icons/light/ directory.
                  </p>
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

                  {/* NEW NewsArticleCard Component */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">NewsArticleCard (NEW Gradient Design) 🆕</h4>
                    <div className="p-6 bg-slate-900 rounded-lg">
                      <div className="flex flex-wrap gap-4 justify-center">
                        <NewsArticleCard
                          articleTitle="Trump Says He Doesn't 'Draw Pictures.' But Many of His Sketches Sold at Auction."
                          percentage="24%"
                          onClick={() => console.log('Article clicked')}
                        />
                        <NewsArticleCard
                          articleTitle="Fed Cuts Interest Rates by Quarter Point in Final 2024 Meeting"
                          percentage="18%"
                          sourceName="Financial Times"
                          onClick={() => console.log('Article clicked')}
                        />
                        <NewsArticleCard
                          articleTitle="Climate Summit Reaches Historic Agreement on Carbon Pricing"
                          percentage="31%"
                          sourceName="The Guardian"
                          onClick={() => console.log('Article clicked')}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <strong>News article cards with gradient backgrounds!</strong> Displays news articles with source, percentage, and title.
                      <br />
                      <strong>Features:</strong> Purple gradient header (#BB61EF to #6700A2), background gradient overlay, percentage badge with blur effect
                      <br />
                      <strong>Props:</strong> articleTitle, sourceName, percentage, logoSrc, backgroundImage, onClick
                    </p>
                  </div>

                  {/* ShareThreadCard Component */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">ShareThreadCard 🎨</h4>
                    <div className="p-6 bg-slate-900 rounded-lg">
                      <div className="flex justify-center">
                        <ShareThreadCard
                          profileImage="https://via.placeholder.com/150"
                          question="What did Trump Say?"
                          answer="...He also introduced a new 'AI Action Plan' aimed at accelerating U.S. dominance in artificial intelligence by easing regulations on data centers, encouraging global tech exports, and ensuring benefits for American workers."
                          onPoweredByClick={() => console.log('Powered by clicked')}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <strong>Share Thread Q&A card with gradient border!</strong> Displays question and answer in a styled card.
                      <br />
                      <strong>Features:</strong> Purple to mint gradient border (#C081FF → #B8FFE3), profile image, GistAnswers branding
                      <br />
                      <strong>Dimensions:</strong> 351px width, asymmetric padding (L: 19.4px, R: 35.3px, T/B: 35.3px)
                    </p>
                  </div>

                  {/* ShareThreadModal Component */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">ShareThreadModal 🎭</h4>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex justify-center">
                        <Button
                          onClick={() => setShowShareModal(true)}
                          className="flex items-center gap-2"
                        >
                          <ShareIcon size={16} />
                          Open Share Thread Modal
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <strong>Modal presentation of Share Thread!</strong> Full-screen modal with progress animation.
                      <br />
                      <strong>Features:</strong> Backdrop blur, progress bar animation, close button, responsive design
                      <br />
                      <strong>Contains:</strong> ShareThreadHeader, ProgressBar, and ShareThreadCard
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

      {/* Share Thread Modal */}
      <ShareThreadModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        profileImage="https://via.placeholder.com/150"
        question="What did Trump Say?"
        answer="...He also introduced a new 'AI Action Plan' aimed at accelerating U.S. dominance in artificial intelligence by easing regulations on data centers, encouraging global tech exports, and ensuring benefits for American workers."
        onPoweredByClick={() => console.log('Powered by clicked from modal')}
      />
    </div>
  );
}