/**
 * FeaturesGrid - Showcase grid of key features with animated cards
 */

import { motion } from 'framer-motion';
import { 
  Palette, 
  Zap, 
  Globe, 
  Code2, 
  Smartphone, 
  Layers,
  Sparkles,
  Shield,
  Gauge
} from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/card';

const features = [
  {
    icon: Sparkles,
    title: '5 Interactive Phases',
    description: 'Seamless transitions between collapsed, expanded, typing, searching, and results states',
    gradient: 'from-purple-600 to-pink-600',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized performance with Vite, React 19, and efficient rendering strategies',
    gradient: 'from-yellow-600 to-orange-600',
  },
  {
    icon: Globe,
    title: 'Fully Accessible',
    description: 'WCAG 2.1 AA compliant with keyboard navigation and screen reader support',
    gradient: 'from-blue-600 to-cyan-600',
  },
  {
    icon: Code2,
    title: 'TypeScript First',
    description: 'Complete type safety with comprehensive TypeScript definitions',
    gradient: 'from-emerald-600 to-teal-600',
  },
  {
    icon: Smartphone,
    title: 'Responsive Design',
    description: 'Mobile-first approach with adaptive layouts for all screen sizes',
    gradient: 'from-pink-600 to-rose-600',
  },
  {
    icon: Layers,
    title: 'Atomic Design',
    description: 'Modular architecture with reusable atoms, molecules, and organisms',
    gradient: 'from-indigo-600 to-purple-600',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function FeaturesGrid() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built for Modern Development
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every component is crafted with attention to detail, performance, and developer experience
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full border-purple-600/10 bg-background/50 backdrop-blur hover:border-purple-600/30 transition-colors group">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.gradient} bg-opacity-10 group-hover:bg-opacity-20 transition-all`}>
                        <Icon className={`h-6 w-6 bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent`} 
                          style={{ 
                            WebkitTextStroke: '1.5px',
                            WebkitTextStrokeColor: 'currentColor'
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional features badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-wrap gap-3 justify-center"
        >
          {[
            { icon: Shield, label: 'Secure' },
            { icon: Gauge, label: 'Performant' },
            { icon: Palette, label: 'Customizable' },
          ].map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/10 border border-purple-600/20"
              >
                <Icon className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium">{badge.label}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}