/**
 * TechStack - Showcase of technologies used in the widget library
 */

import { motion } from 'framer-motion';

const technologies = [
  {
    name: 'React',
    version: '19.1',
    logo: '⚛️',
    color: 'from-cyan-400 to-cyan-600',
    description: 'Latest React with concurrent features',
  },
  {
    name: 'TypeScript',
    version: '5.8',
    logo: '🔷',
    color: 'from-blue-500 to-blue-700',
    description: 'Full type safety and IntelliSense',
  },
  {
    name: 'Vite',
    version: '7.0',
    logo: '⚡',
    color: 'from-purple-500 to-purple-700',
    description: 'Lightning-fast HMR and builds',
  },
  {
    name: 'Tailwind CSS',
    version: '3.4',
    logo: '🎨',
    color: 'from-teal-400 to-teal-600',
    description: 'Utility-first CSS framework',
  },
  {
    name: 'Radix UI',
    version: '1.2',
    logo: '📦',
    color: 'from-pink-500 to-pink-700',
    description: 'Accessible component primitives',
  },
  {
    name: 'Framer Motion',
    version: '12.2',
    logo: '🎬',
    color: 'from-orange-400 to-orange-600',
    description: 'Production-ready animations',
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
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export function TechStack() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-purple-600/5 to-background">
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
            Powered by Modern Tech
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built with the latest and most reliable technologies in the React ecosystem
          </p>
        </motion.div>

        {/* Tech grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.2 }
              }}
              className="group"
            >
              <div className="flex flex-col items-center text-center">
                {/* Logo container */}
                <div className="relative mb-4">
                  <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity`} />
                  <div className="relative w-20 h-20 bg-background/80 backdrop-blur border border-purple-600/10 rounded-2xl flex items-center justify-center group-hover:border-purple-600/30 transition-colors">
                    <span className="text-3xl">{tech.logo}</span>
                  </div>
                </div>
                
                {/* Tech name and version */}
                <h3 className="font-semibold mb-1">{tech.name}</h3>
                <span className="text-xs text-muted-foreground mb-2">v{tech.version}</span>
                
                {/* Description (hidden on mobile, shown on hover for desktop) */}
                <p className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                  {tech.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-gradient-to-r from-purple-600/5 to-emerald-400/5 border border-purple-600/10">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📊</span>
              <div className="text-left">
                <p className="text-sm font-semibold">Bundle Size</p>
                <p className="text-xs text-muted-foreground">~45KB gzipped</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-purple-600/20" />
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              <div className="text-left">
                <p className="text-sm font-semibold">Performance</p>
                <p className="text-xs text-muted-foreground">98 Lighthouse score</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-purple-600/20" />
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛡️</span>
              <div className="text-left">
                <p className="text-sm font-semibold">Type Coverage</p>
                <p className="text-xs text-muted-foreground">100% TypeScript</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}