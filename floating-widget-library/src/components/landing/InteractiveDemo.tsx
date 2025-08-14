/**
 * InteractiveDemo - Live widget demonstration with code snippets
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Code, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MainFlow } from '@/components/widget/templates/MainFlow';
import { Badge } from '@/components/ui/badge';

const codeSnippets = {
  basic: `import { MainFlow } from '@nytimes/widget-library';

function App() {
  return (
    <MainFlow 
      initialExpanded={false}
      onSuggestionSelect={(suggestion) => {
        console.log('Selected:', suggestion);
      }}
    />
  );
}`,
  advanced: `import { MainFlow } from '@nytimes/widget-library';
import { useState } from 'react';

function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleSuggestionSelect = (suggestion) => {
    // Handle suggestion selection
    console.log('Selected:', suggestion);
    // Trigger your search API
    searchAPI(suggestion);
  };

  return (
    <MainFlow 
      initialExpanded={isExpanded}
      onSuggestionSelect={handleSuggestionSelect}
      className="custom-widget-styles"
    />
  );
}`,
  typescript: `import { MainFlow } from '@nytimes/widget-library';
import type { FC } from 'react';

interface AppProps {
  userId?: string;
  apiKey?: string;
}

const App: FC<AppProps> = ({ userId, apiKey }) => {
  const handleSuggestionSelect = (suggestion: string): void => {
    // Type-safe suggestion handling
    console.log('Selected:', suggestion);
  };

  return (
    <MainFlow 
      initialExpanded={false}
      onSuggestionSelect={handleSuggestionSelect}
    />
  );
};

export default App;`,
};

export function InteractiveDemo() {
  const [widgetKey, setWidgetKey] = useState(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activePhase, setActivePhase] = useState('idle');

  const resetWidget = () => {
    setWidgetKey(prev => prev + 1);
    setActivePhase('idle');
  };

  const copyToClipboard = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(type);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-purple-600/5">
      <div className="container mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gradient-to-r from-purple-600/10 to-emerald-400/10 border-purple-600/20">
            Interactive Demo
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Try It Yourself
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the widget's smooth transitions and explore the implementation code
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - Live widget demo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Live Preview</h3>
              
              {/* Phase controls */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Button
                  size="sm"
                  variant={activePhase === 'idle' ? 'default' : 'outline'}
                  onClick={() => setActivePhase('idle')}
                  className="text-xs"
                >
                  <Play className="h-3 w-3 mr-1" />
                  Idle State
                </Button>
                <Button
                  size="sm"
                  variant={activePhase === 'typing' ? 'default' : 'outline'}
                  onClick={() => setActivePhase('typing')}
                  className="text-xs"
                >
                  Typing State
                </Button>
                <Button
                  size="sm"
                  variant={activePhase === 'searching' ? 'default' : 'outline'}
                  onClick={() => setActivePhase('searching')}
                  className="text-xs"
                >
                  Searching State
                </Button>
                <Button
                  size="sm"
                  variant={activePhase === 'results' ? 'default' : 'outline'}
                  onClick={() => setActivePhase('results')}
                  className="text-xs"
                >
                  Results State
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={resetWidget}
                  className="text-xs ml-auto"
                >
                  Reset
                </Button>
              </div>
            </div>

            {/* Widget container with glass effect */}
            <div className="relative flex-1 min-h-[500px] rounded-2xl bg-gradient-to-br from-purple-600/5 to-emerald-400/5 border border-purple-600/10 p-8 flex items-center justify-center">
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-purple-600/50" />
              <div className="absolute top-4 left-8 w-2 h-2 rounded-full bg-emerald-400/50" />
              <div className="absolute top-4 left-12 w-2 h-2 rounded-full bg-pink-600/50" />
              
              {/* Widget instance */}
              <div key={widgetKey} className="transform scale-90">
                <MainFlow initialExpanded={true} />
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-6 p-4 rounded-lg bg-purple-600/5 border border-purple-600/10">
              <p className="text-sm text-muted-foreground">
                💡 <strong>Tip:</strong> Click on the widget to interact with it. Try searching for "Top Stories" or "Breaking News"!
              </p>
            </div>
          </motion.div>

          {/* Right side - Code snippets */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Implementation</h3>
            </div>

            <Tabs defaultValue="basic" className="flex-1">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
                <TabsTrigger value="typescript">TypeScript</TabsTrigger>
              </TabsList>
              
              {Object.entries(codeSnippets).map(([key, code]) => (
                <TabsContent key={key} value={key} className="flex-1">
                  <div className="relative">
                    <div className="absolute top-4 right-4 z-10">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(code, key)}
                        className="h-8 px-2"
                      >
                        {copiedCode === key ? (
                          <>
                            <Check className="h-4 w-4 mr-1 text-emerald-500" />
                            <span className="text-xs">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-1" />
                            <span className="text-xs">Copy</span>
                          </>
                        )}
                      </Button>
                    </div>
                    
                    <div className="rounded-lg bg-zinc-950 p-6 overflow-x-auto">
                      <pre className="text-sm">
                        <code className="language-tsx text-zinc-300">
                          {code}
                        </code>
                      </pre>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            {/* Installation instructions */}
            <div className="mt-6 space-y-4">
              <div className="p-4 rounded-lg bg-emerald-600/5 border border-emerald-600/10">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium">Quick Install</span>
                </div>
                <code className="text-xs text-muted-foreground">
                  npm install @nytimes/widget-library
                </code>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}