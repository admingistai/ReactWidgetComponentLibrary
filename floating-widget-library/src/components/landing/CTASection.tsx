/**
 * CTASection - Call to action section with navigation to widget showcase
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Github, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-purple-600/10 to-emerald-400/20" />
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-400/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container relative mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-gradient-to-r from-purple-600/10 to-emerald-400/10 border border-purple-600/20"
          >
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">Open Source & Production Ready</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Ready to build{' '}
            <span className="bg-gradient-to-r from-purple-600 to-emerald-400 bg-clip-text text-transparent">
              amazing search experiences
            </span>
            ?
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Join developers worldwide using our widget library to create beautiful, accessible, and performant search interfaces
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 mb-10"
          >
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-emerald-400 bg-clip-text text-transparent">
                50+
              </span>
              <span className="text-sm text-muted-foreground">Components</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-emerald-400 bg-clip-text text-transparent">
                100%
              </span>
              <span className="text-sm text-muted-foreground">TypeScript</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-emerald-400 bg-clip-text text-transparent">
                A11y
              </span>
              <span className="text-sm text-muted-foreground">Compliant</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-emerald-400 bg-clip-text text-transparent">
                5
              </span>
              <span className="text-sm text-muted-foreground">Widget Phases</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              onClick={() => navigate('/showcase')}
              className="bg-gradient-to-r from-purple-600 to-emerald-400 text-white hover:opacity-90 transition-all group shadow-lg shadow-purple-600/25"
            >
              Browse Components
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open('https://github.com/admingistai/ReactWidgetComponentLibrary/blob/main/README.md', '_blank')}
              className="border-purple-600/20 hover:bg-purple-600/10"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Read Documentation
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={() => window.open('https://github.com/admingistai/ReactWidgetComponentLibrary', '_blank')}
              className="hover:bg-purple-600/10"
            >
              <Github className="mr-2 h-4 w-4" />
              Star on GitHub
            </Button>
          </motion.div>

          {/* Footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-10 text-sm text-muted-foreground"
          >
            MIT Licensed • Free and Open Source • Contributions Welcome
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}