import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Target, Eye, ChevronDown, Sparkles, Shield, Award } from "lucide-react";
import Footer from "@/components/footer/Footer";

const pillars = [
  { label: "Mayank's Vision", color: "bg-amber-100 text-amber-800 border-amber-300" },
  { label: "Trisha's Creativity", color: "bg-rose-100 text-rose-800 border-rose-300" },
  { label: "Women Artisans", color: "bg-emerald-100 text-emerald-800 border-emerald-300" },
];

const storySections = [
  {
    id: "about",
    icon: Heart,
    title: "About Us",
    accentColor: "text-rose-600",
    bgAccent: "bg-rose-50",
    borderAccent: "border-rose-200",
    heading: "The Dream of Three: One Motive, Many Hands",
    body: [
      "Triyank began with a question: Can we create something beautiful while doing something good?",
      "The name Triyank represents a powerful trinity—the pillar of three. It is the union of Mayank's vision, Trisha's creativity, and the skilled hands of our Women Artisans. We believed that when a few unite for a shared purpose, magic happens. Together, we saw beauty where others saw waste, transforming scraps of leather and fabric into wearable art.",
      "We created a space where unemployed women in our community could turn their hard work into masterpieces. When you wear a piece from Triyank, you aren't just wearing jewellery—you are wearing the strength, the skill, and the shared dream of the entire Triyank family.",
    ],
  },
  {
    id: "mission",
    icon: Target,
    title: "Our Mission",
    accentColor: "text-amber-700",
    bgAccent: "bg-amber-50",
    borderAccent: "border-amber-200",
    heading: "Crafting a Sustainable Future",
    body: [
      "To create a sustainable future for fashion by transforming discarded materials into handcrafted masterpieces. We aim to empower unemployed women through skill-building and fair opportunities, ensuring that TRIYANK remains a brand built by the community, for the community.",
    ],
  },
  {
    id: "vision",
    icon: Eye,
    title: "Our Vision",
    accentColor: "text-emerald-700",
    bgAccent: "bg-emerald-50",
    borderAccent: "border-emerald-200",
    heading: "A Global Leader in Conscious Jewelry",
    body: [
      "To become a global leader in conscious jewelry, known for our \"Pillar of Three\" philosophy. We envision a world where every woman is celebrated through our designs, and where the bond between the creator, the craft, and the wearer creates a more beautiful, inclusive world.",
    ],
  },
];

const About = () => {
  const [openSection, setOpenSection] = useState<string>("about");

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="relative pt-36 py-20 px-6 bg-gradient-to-b from-[#f5f0e8] to-background">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-wider text-[#1a1410] mb-6">
              ABOUT TRIYANK
            </h1>
            <div className="w-24 h-px bg-[#c9a86c] mx-auto mb-8" />
            <p className="text-lg md:text-xl text-[#1a1410]/70 max-w-2xl mx-auto leading-relaxed">
              Where tradition meets modern elegance. We curate exquisite jewelry
              that tells your unique story.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tagline + Story Accordion */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Tagline banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-western-accent px-8 py-10 text-center mb-10"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-3">Brand Tagline</p>
            <h2 className="text-3xl md:text-4xl font-light tracking-wide text-white mb-6">
              Handcrafted to Connect
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {pillars.map((p, i) => (
                <motion.span
                  key={p.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  viewport={{ once: true }}
                  className={`px-4 py-1.5 rounded-full border text-sm font-medium ${p.color}`}
                >
                  {p.label}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Accordion */}
          <div className="space-y-4">
            {storySections.map((sec, idx) => {
              const Icon = sec.icon;
              const isOpen = openSection === sec.id;
              return (
                <motion.div
                  key={sec.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className={`rounded-xl border ${isOpen ? sec.borderAccent : "border-border"} overflow-hidden transition-colors duration-300`}
                >
                  <button
                    onClick={() => setOpenSection(isOpen ? "" : sec.id)}
                    className={`w-full flex items-center justify-between px-6 py-5 text-left transition-colors duration-300 ${isOpen ? sec.bgAccent : "bg-white hover:bg-muted/40"}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isOpen ? sec.bgAccent : "bg-muted"} border ${isOpen ? sec.borderAccent : "border-border"}`}>
                        <Icon className={`w-5 h-5 ${isOpen ? sec.accentColor : "text-muted-foreground"}`} />
                      </div>
                      <span className={`text-lg font-medium ${isOpen ? sec.accentColor : "text-foreground"}`}>
                        {sec.title}
                      </span>
                    </div>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown className={`w-5 h-5 ${isOpen ? sec.accentColor : "text-muted-foreground"}`} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-8 pt-4">
                          <h3 className="text-xl font-light text-foreground mb-4">{sec.heading}</h3>
                          <div className="space-y-4">
                            {sec.body.map((para, i) => (
                              <motion.p
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="text-muted-foreground leading-relaxed"
                              >
                                {para}
                              </motion.p>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6 bg-[#f5f0e8]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-medium tracking-wider text-[#1a1410] mb-4">
              Our Values
            </h2>
            <div className="w-16 h-px bg-[#c9a86c] mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Heart, title: "Passion", description: "We pour our heart into every piece we create, ensuring each item reflects dedication and love for the craft." },
              { icon: Sparkles, title: "Quality", description: "Using only the finest materials - 92.5 sterling silver, genuine gemstones, and premium gold plating." },
              { icon: Shield, title: "Trust", description: "BIS hallmarked jewelry with lifetime warranty and authenticity certificates for complete peace of mind." },
              { icon: Award, title: "Excellence", description: "Meticulously handcrafted by skilled artisans with decades of experience in traditional jewelry making." },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white rounded-lg shadow-sm"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-[#c9a86c]/10 rounded-full flex items-center justify-center">
                  <value.icon className="w-6 h-6 text-[#c9a86c]" />
                </div>
                <h3 className="text-lg font-medium text-[#1a1410] mb-2">{value.title}</h3>
                <p className="text-sm text-[#1a1410]/60 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-medium tracking-wider text-[#1a1410] mb-4">
              Contact Us
            </h2>
            <div className="w-16 h-px bg-[#c9a86c] mx-auto mb-8" />
            <p className="text-[#1a1410]/70 mb-2">
              <span className="font-medium">Phone:</span> +91 9967676817
            </p>
            <p className="text-[#1a1410]/70">
              <span className="font-medium">Email:</span> triyankweb@gmail.com
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
