import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Send } from "lucide-react";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const apiBaseUrl = (import.meta.env.VITE_BACKEND_API_URL as string | undefined) || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) return;

    try {
      setIsSubmitting(true);
      const res = await fetch(`${apiBaseUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      toast.success("Thank you for reaching out! We'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Could not send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-14 px-6 text-background" style={{ backgroundColor: 'hsl(45.52deg 54.87% 17.09%)' }}>
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-medium tracking-wider mb-2 text-center">
            CONTACT US
          </h2>
          <p className="text-background/70 mb-10 text-center text-sm">
            Have a question or need help? Drop us a message and we'll get back to you shortly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-transparent border-background/30 text-background placeholder:text-background/50 focus:border-background"
                required
                maxLength={100}
              />
              <Input
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-transparent border-background/30 text-background placeholder:text-background/50 focus:border-background"
                required
                maxLength={255}
              />
            </div>
            <Textarea
              placeholder="Write your message here..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="bg-transparent border-background/30 text-background placeholder:text-background/50 focus:border-background min-h-[120px] resize-none"
              required
              maxLength={1000}
            />
            <div className="text-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-background text-foreground hover:bg-background/90 tracking-wider gap-2 border-none"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;
