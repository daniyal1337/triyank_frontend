import { motion } from "framer-motion";
import { Heart, Sparkles, Shield, Award } from "lucide-react";
import Footer from "@/components/footer/Footer";

const About = () => {
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

      {/* Our Story Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop"
                alt="Triyank Jewelry Craftsmanship"
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-medium tracking-wider text-[#1a1410] mb-6">
                Our Story
              </h2>
              <div className="w-16 h-px bg-[#c9a86c] mb-6" />
              <p className="text-[#1a1410]/70 leading-relaxed mb-4">
                Founded with a passion for preserving traditional craftsmanship while embracing 
                contemporary design, Triyank has become a trusted name in fine jewelry. Our journey 
                began in the heart of Delhi&apos;s jewelry district, where skilled artisans have 
                perfected their craft over generations.
              </p>
              <p className="text-[#1a1410]/70 leading-relaxed mb-4">
                Every piece in our collection reflects our commitment to quality, authenticity, and 
                timeless beauty. From delicate everyday pieces to statement bridal jewelry, we 
                create treasures that become part of your most cherished moments.
              </p>
              <p className="text-[#1a1410]/70 leading-relaxed">
                Today, Triyank stands as a symbol of elegance and trust, serving customers 
                across India who seek jewelry that combines heritage with modern sophistication.
              </p>
            </motion.div>
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
              {
                icon: Heart,
                title: "Passion",
                description: "We pour our heart into every piece we create, ensuring each item reflects dedication and love for the craft."
              },
              {
                icon: Sparkles,
                title: "Quality",
                description: "Using only the finest materials - 92.5 sterling silver, genuine gemstones, and premium gold plating."
              },
              {
                icon: Shield,
                title: "Trust",
                description: "BIS hallmarked jewelry with lifetime warranty and authenticity certificates for complete peace of mind."
              },
              {
                icon: Award,
                title: "Excellence",
                description: "Meticulously handcrafted by skilled artisans with decades of experience in traditional jewelry making."
              }
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
              Visit Us
            </h2>
            <div className="w-16 h-px bg-[#c9a86c] mx-auto mb-8" />
            <p className="text-[#1a1410]/70 mb-6">
              Karol Bagh, New Delhi, India - 110005
            </p>
            <p className="text-[#1a1410]/70 mb-2">
              <span className="font-medium">Phone:</span> +91 98765 43210
            </p>
            <p className="text-[#1a1410]/70">
              <span className="font-medium">Email:</span> hello@triyank.com
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
