import { motion } from "framer-motion";
import { Truck, Banknote, Award, Headphones } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping on Prepaid Orders",
    description: "Enjoy free delivery when you pay online. No hidden fees, just smooth service.",
  },
  {
    icon: Banknote,
    title: "Cash on Delivery Available",
    description: "Prefer to pay when your order arrives? We offer COD across India for your convenience.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Every piece is crafted with high-quality materials, designed to last and make you shine.",
  },
  {
    icon: Headphones,
    title: "24/7 Live Support",
    description: "Need help? We're always here to answer your queries and assist you anytime.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 md:py-20 px-6 bg-muted/20 border-y border-border">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-light tracking-wider text-foreground text-center mb-12"
        >
          What Makes Triyank Special
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-sm font-medium text-foreground tracking-wider mb-2">
                {feature.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
