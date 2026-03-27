import { motion } from "framer-motion";
import { Shield, Sparkles, Heart, Star } from "lucide-react";

const specialties = [
  {
    icon: Shield,
    title: "Lifetime Warranty",
    description: "Against manufacturing defects.",
  },
  {
    icon: Sparkles,
    title: "Premium Materials",
    description: "92.5 silver, 18kt gold & gemstones.",
  },
  {
    icon: Heart,
    title: "Handcrafted",
    description: "By skilled artisans with decades of experience.",
  },
  {
    icon: Star,
    title: "Certified Authentic",
    description: "BIS hallmarked with authenticity certificates.",
  },
];

const WhatMakesSpecial = () => {
  return (
    <section className="py-10 md:py-14 px-4 md:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold tracking-wider text-foreground text-center mb-3 md:mb-12">
            What Makes Triyank Special
          </h2>
          <div className="w-16 md:w-20 h-px bg-primary mx-auto" />
          <p className="hidden md:block mt-6 text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            Discover the exceptional qualities that set Triyank apart in the world of fine jewelry
          </p>
        </motion.div>

        {/* Mobile: compact 2×2 grid with horizontal cards */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {specialties.map((specialty, index) => (
            <motion.div
              key={specialty.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center bg-primary/5 rounded-xl p-4 gap-2"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <specialty.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xs font-bold tracking-wide text-foreground uppercase leading-tight mb-1">
                  {specialty.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-snug">
                  {specialty.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop: original 4-column layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {specialties.map((specialty, index) => (
            <motion.div
              key={specialty.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <specialty.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-wider text-foreground mb-3 uppercase">
                {specialty.title}
              </h3>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-sm mx-auto font-medium">
                {specialty.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 md:mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-primary/10 rounded-full">
            <Star className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            <span className="text-foreground font-medium tracking-wider text-sm md:text-base">
              Trusted by 50,000+ Happy Customers
            </span>
            <Star className="w-4 h-4 md:w-5 md:h-5 text-primary" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatMakesSpecial;
