/**
 * HeroSection - Eye-catching hero section with animated gradient and widget preview
 */

import { useNavigate } from "react-router-dom";
import { ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainFlow } from "@/components/widget/templates/MainFlow";
import { motion } from "framer-motion";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-emerald-400/20 animate-gradient-shift" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-600/10 via-transparent to-transparent" />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 -z-10" style={{ pointerEvents: 'none' }}>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full"
            style={{
              background: `radial-gradient(circle, ${
                i % 2 === 0 ? "#C081FF" : "#B8FFE3"
              }20 0%, transparent 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              pointerEvents: 'none',
            }}
            animate={{
              x: [0, 30, -30, 0],
              y: [0, -30, 30, 0],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-purple-600/10 to-emerald-400/10 border border-purple-600/20"
            >
              <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-emerald-400 bg-clip-text text-transparent">
                ✨ Modern Search Experience
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-[#C081FF] to-[#B8FFE3] bg-clip-text text-transparent">
                NYTimes
              </span>
              <br />
              <span className="text-foreground">Widget Library</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Beautiful, accessible React components for modern search
              experiences
            </motion.p>

            {/* Feature list */}
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-8 text-sm text-muted-foreground justify-center lg:justify-start"
            >
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> TypeScript First
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> Fully Accessible
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> Production Ready
              </li>
            </motion.ul>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start relative z-10"
            >
              <Button
                size="lg"
                onClick={() => {
                  console.log('Explore Components clicked');
                  navigate("/showcase#widget");
                }}
                className="bg-gradient-to-r from-[#C081FF] to-[#B8FFE3] text-black hover:opacity-90 transition-opacity group"
              >
                Explore Components
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  console.log('GitHub button clicked');
                  window.open(
                    "https://github.com/admingistai/ReactWidgetComponentLibrary",
                    "_blank"
                  );
                }}
                className="border-purple-600/20 hover:bg-purple-600/10"
              >
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </Button>
            </motion.div>
          </motion.div>

          {/* Right side - Widget Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center items-center"
          >
            {/* Glow effect behind widget */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-96 bg-gradient-to-r from-purple-600/30 to-emerald-400/30 rounded-full blur-3xl" />
            </div>

            {/* Floating widget animation wrapper */}
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10"
            >
              {/* Widget shadow */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/20 rounded-full blur-xl" />

              {/* Actual widget component */}
              <div className="transform scale-90 md:scale-100">
                <MainFlow initialExpanded={false} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-purple-600/30 rounded-full flex justify-center"
        >
          <div className="w-1 h-2 bg-purple-600/50 rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  );
}
