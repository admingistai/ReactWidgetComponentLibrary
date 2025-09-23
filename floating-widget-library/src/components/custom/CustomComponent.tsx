import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShareThreadExperience } from "@/components/widget/organisms/modals/ShareThreadExperience";
import { PoweredByButton } from "@/components/widget/molecules/buttons/PoweredByButton";
import {
  StackedSources,
  type SourceData,
} from "@/components/widget/organisms/StackedSources";

/**
 * CustomComponent - Share Thread Card Design Workspace
 *
 * Workspace for designing and testing share thread cards
 */
export const CustomComponent: React.FC = () => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [activeCard, setActiveCard] = useState<"image" | "text">("image");

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Modal Test Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Share Thread Experience</CardTitle>
              <CardDescription>
                Enhanced sharing with dual views, AI customization, and social
                platforms
              </CardDescription>
            </div>
            <Badge
              variant="outline"
              className="bg-gradient-to-r from-purple-500/10 to-cyan-400/10"
            >
              Testing Phase
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-4 p-6">
            <Button
              onClick={() => setIsShareOpen(true)}
              size="lg"
              className="bg-gradient-to-r from-[#C081FF] to-[#B8FFE3] text-black font-medium px-8 py-6 rounded-full hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Open Share Experience
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Card Design Workspace */}
      <Card className="min-h-[800px]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Share Thread Card Design Workspace</CardTitle>
              <CardDescription>
                Design and test card layouts for the share experience
              </CardDescription>
            </div>
            <Badge
              variant="outline"
              className="bg-gradient-to-r from-purple-500/10 to-cyan-400/10"
            >
              Design Mode
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Card Type Selector */}
            <div className="flex gap-2 p-1 bg-muted rounded-lg w-fit">
              <Button
                variant={activeCard === "image" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveCard("image")}
              >
                Image Card
              </Button>
              <Button
                variant={activeCard === "text" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveCard("text")}
              >
                Text Card
              </Button>
            </div>

            {/* Design Canvas */}
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 min-h-[600px] bg-black/5">
              <div className="flex justify-center">
                {/* Card Container with Gradient Border */}
                <div
                  className="relative rounded-3xl overflow-hidden"
                  style={{
                    width: "277px",
                    height: "350px",
                    background:
                      "linear-gradient(135deg, #C081FF 0%, #B8FFE3 100%)",
                    padding: "2px",
                  }}
                >
                  <div className="relative w-full h-full rounded-3xl overflow-hidden bg-[#2A2A2A]">
                    {/* Background Image */}
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          activeCard === "image"
                            ? `url('https://images.unsplash.com/photo-1580128660010-fd027e1e587a?w=800')`
                            : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        opacity: activeCard === "image" ? 0.9 : 0,
                      }}
                    />

                    {/* Gradient Overlay */}
                    {activeCard === "image" && (
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)",
                        }}
                      />
                    )}

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col p-4">
                      {/* Top Spacer */}
                      <div style={{ height: "180px" }}></div>

                      {/* Question Button - Compact Container */}
                      <div className="flex justify-center mb-auto">
                        <button
                          className="flex items-center"
                          style={{
                            paddingTop: "8px",
                            paddingBottom: "8px",
                            paddingLeft: "16px",
                            paddingRight: "16px",
                            background: "rgba(42, 42, 42, 0.85)",
                            backdropFilter: "blur(20px)",
                            borderRadius: "41px",
                            border: "1px solid rgba(192, 129, 255, 0.3)",
                            gap: "8px",
                            cursor: "pointer",
                          }}
                        >
                          {/* Sparkle Icon */}
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"
                              fill="url(#gradient-sparkle)"
                            />
                            <defs>
                              <linearGradient
                                id="gradient-sparkle"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                              >
                                <stop offset="0%" stopColor="#B8FFE3" />
                                <stop offset="100%" stopColor="#C081FF" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <span
                            style={{
                              color: "white",
                              fontSize: "14px",
                              fontFamily: "Work Sans, sans-serif",
                              fontWeight: 400,
                              lineHeight: "20px",
                            }}
                          >
                            {activeCard === "image"
                              ? "What did Trump say?"
                              : "Your Question Here"}
                          </span>
                        </button>
                      </div>

                      {/* Bottom Section - Footer */}
                      <div className="mt-auto">
                        {/* Stacked Sources */}
                        <div
                          className="flex justify-center"
                          style={{ marginBottom: "3px" }}
                        >
                          <div className="scale-75 origin-center">
                            <StackedSources
                              sources={
                                [
                                  {
                                    id: "1",
                                    logo: "📰",
                                    name: "NYT",
                                    percentage: "34%",
                                    color: "#6E5FBC",
                                  },
                                  {
                                    id: "2",
                                    logo: "📧",
                                    name: "Daily Mail",
                                    percentage: "25%",
                                    color: "#594495",
                                  },
                                  {
                                    id: "3",
                                    logo: "📊",
                                    name: "AW",
                                    percentage: "10%",
                                    color: "#603C75",
                                  },
                                  {
                                    id: "4",
                                    logo: "...",
                                    name: "More",
                                    percentage: "10%",
                                    color: "#333333",
                                  },
                                ] as SourceData[]
                              }
                            />
                          </div>
                        </div>

                        {/* Footer Text */}
                        <div className="text-center space-y-1">
                          <div
                            className="text-white"
                            style={{
                              fontSize: "18px",
                              fontFamily: "Work Sans, sans-serif",
                              fontWeight: 400,
                              lineHeight: "24px",
                              wordWrap: "break-word",
                            }}
                          >
                            Ask Anything
                          </div>
                          <div className="flex justify-center">
                            <PoweredByButton
                              onClick={() => console.log("Powered by clicked")}
                              className="scale-90"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Design Tools */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-semibold mb-2">🎨 Colors</h4>
                <p className="text-sm text-muted-foreground">
                  Background: #1C1C1C
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-semibold mb-2">📐 Dimensions</h4>
                <p className="text-sm text-muted-foreground">
                  402px × 600px mobile
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-semibold mb-2">🔲 Borders</h4>
                <p className="text-sm text-muted-foreground">
                  Rounded corners, gradient option
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Share Thread Experience Modal */}
      <ShareThreadExperience
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        profileImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
        backgroundImage="https://images.unsplash.com/photo-1557683316-973673baf926?w=800"
        question="What did Trump Say?"
        answer="Former President Donald Trump made headlines at a recent rally where he outlined his vision for the country's future. He emphasized economic policies, border security, and technological innovation. He also introduced a new 'AI Action Plan' that aims to position America as a global leader in artificial intelligence development."
        onPoweredByClick={() => console.log("Powered by clicked")}
      />
    </div>
  );
};

export default CustomComponent;
