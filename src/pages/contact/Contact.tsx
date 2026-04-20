import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Clock, Send, Instagram, Facebook, MessageCircle } from "lucide-react";
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

  const apiBaseUrl = (import.meta.env.VITE_BACKEND_API_URL as string | undefined) || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`${apiBaseUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

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
    } catch {
      toast({
        title: "Something went wrong",
        description: "Could not send your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 9967676817"],
      description: "Mon-Sat, 10am - 7pm"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["triyankweb@gmail.com"],
      description: "We reply within 24 hours"
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
      <section className="relative pt-32 pb-20 md:pt-36 px-6 bg-gradient-to-b from-[#f5f0e8] to-background">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-10 border border-border hover:shadow-lg transition-shadow duration-300 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <info.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-medium text-foreground mb-3">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-foreground font-medium text-lg">{detail}</p>
                ))}
                <p className="text-sm text-muted-foreground mt-3">{info.description}</p>
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
              {/* Additional Info */}
              <div className="bg-white rounded-lg p-8 border border-border flex flex-col items-center justify-center text-center space-y-4">
                <Phone className="w-10 h-10 text-primary" />
                <h3 className="text-lg font-medium text-foreground">Reach Us Directly</h3>
                <p className="text-foreground font-medium">+91 9967676817</p>
                <p className="text-foreground font-medium">triyankweb@gmail.com</p>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-lg p-6 border border-border">
                <h3 className="text-lg font-medium text-foreground mb-4">Connect With Us</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Follow us on social media for updates, styling inspiration, and direct support.
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com/triyank"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#E1306C]/10 flex items-center justify-center hover:bg-[#E1306C]/20 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5 text-[#E1306C]" />
                  </a>
                  <a
                    href="https://facebook.com/triyank"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#1877F2]/10 flex items-center justify-center hover:bg-[#1877F2]/20 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5 text-[#1877F2]" />
                  </a>
                  <a
                    href={`https://wa.me/919967676817?text=${encodeURIComponent("Hi! I'm interested in Triyank Jewelry.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center hover:bg-[#25D366]/20 transition-colors"
                    aria-label="WhatsApp"
                  >
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  </a>
                </div>
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
