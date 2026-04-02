import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const WhatsAppFloatingButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent("Hi! I'm interested in Triyank Jewelry.")}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className={cn(
        "fixed bottom-6 right-6 z-50 p-4 rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:bg-[#1ebe5d] hover:scale-110 hover:shadow-xl",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      )}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={24} />
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
    </button>
  );
};

export default WhatsAppFloatingButton;
