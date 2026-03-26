import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you for subscribing!");
      setEmail("");
    }
  };

  return (
    <section className="py-14 px-6 bg-foreground text-background">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-medium tracking-wider mb-4">
            STAY IN TOUCH
          </h2>
          <p className="text-background/70 mb-8">
            Subscribe to receive updates on new collections, exclusive offers, and styling inspiration.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent border-background/30 text-background placeholder:text-background/50 focus:border-background"
              required
            />
            <Button
              type="submit"
              variant="outline"
              className="border-background text-background hover:bg-background hover:text-foreground tracking-wider"
            >
              SUBSCRIBE
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
