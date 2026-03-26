import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook } from "lucide-react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you within 24 hours.",
    });
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 98765 43210"],
      description: "Mon-Sat, 10am - 7pm"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["hello@triyank.com"],
      description: "We reply within 24 hours"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Jewelry Lane, Mumbai"],
      description: "Maharashtra, India - 400001"
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon - Sat: 10AM - 7PM"],
      description: "Sunday: Closed"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-[#f5f0e8] to-background">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-wider text-[#1a1410] mb-6">
              CONTACT US
            </h1>
            <div className="w-24 h-px bg-[#c9a86c] mx-auto mb-8" />
            <p className="text-lg text-[#1a1410]/70 max-w-2xl mx-auto leading-relaxed">
              We'd love to hear from you. Whether you have a question about our products, 
              need styling advice, or just want to say hello.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-6 border border-border hover:shadow-lg transition-shadow duration-300 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-foreground font-medium">{detail}</p>
                ))}
                <p className="text-sm text-muted-foreground mt-2">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-6" style={{ backgroundColor: 'hsl(42.17deg 39.37% 21.05%)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-medium text-white mb-6">Send Us a Message</h2>
              <p className="text-white/80 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Your Name *</label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Email Address *</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="bg-white"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Phone Number</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Subject *</label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="How can we help?"
                      className="bg-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Your Message *</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us more about your inquiry..."
                    className="bg-white resize-none"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-6 bg-[#1a1410] hover:bg-[#2a2420] text-white font-medium tracking-wider"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Map Placeholder */}
              <div className="bg-white rounded-lg overflow-hidden border border-border h-[300px] flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                  <p className="text-lg font-medium text-foreground">Triyank Store Location</p>
                  <p className="text-muted-foreground">123 Jewelry Lane, Mumbai, Maharashtra</p>
                  <a
                    href="https://maps.google.com/?q=Mumbai,India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-primary hover:underline"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-lg p-6 border border-border">
                <h3 className="text-lg font-medium text-foreground mb-4">Connect With Us</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Follow us on social media for the latest updates, styling tips, and exclusive offers.
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com/triyank"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#E1306C]/10 flex items-center justify-center hover:bg-[#E1306C]/20 transition-colors"
                  >
                    <Instagram className="w-5 h-5 text-[#E1306C]" />
                  </a>
                  <a
                    href="https://facebook.com/triyank"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#1877F2]/10 flex items-center justify-center hover:bg-[#1877F2]/20 transition-colors"
                  >
                    <Facebook className="w-5 h-5 text-[#1877F2]" />
                  </a>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="bg-primary/10 rounded-lg p-6">
                <h3 className="text-lg font-medium text-foreground mb-2">Prefer WhatsApp?</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Chat with us directly for quick responses and personalized assistance.
                </p>
                <a
                  href={`https://wa.me/919876543210?text=${encodeURIComponent("Hi! I'm interested in Triyank Jewelry.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-full font-medium hover:bg-[#1ebe5d] transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
