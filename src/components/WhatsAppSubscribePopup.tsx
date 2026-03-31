import { useState, useEffect } from "react";
import { X, MessageCircle, Gift, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

const WhatsAppSubscribePopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if user has already subscribed or closed the popup
    const hasSubscribed = localStorage.getItem("whatsapp-subscribed");
    const hasClosed = localStorage.getItem("whatsapp-popup-closed");
    
    if (hasSubscribed || hasClosed) return;

    // Show popup after 10 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem("whatsapp-popup-closed", "true");
    }, 300);
  };

  const handleSubscribe = () => {
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent("Hi! I want to subscribe to deals and offers.")}`;
    window.open(whatsappUrl, "_blank");
    localStorage.setItem("whatsapp-subscribed", "true");
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-black/50">
      <div
        className={cn(
          "relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300",
          isClosing ? "opacity-0 scale-95" : "opacity-100 scale-100"
        )}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors z-10"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-[#25D366] to-[#128C7E] p-6 text-center">
          <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-3 shadow-lg">
            <MessageCircle className="w-8 h-8 text-[#25D366]" />
          </div>
          <h2 className="text-xl font-bold text-white">Get Exclusive Deals!</h2>
          <p className="text-white/90 text-sm mt-1">Subscribe to our WhatsApp updates</p>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                <Tag className="w-5 h-5 text-orange-600" />
              </div>
              <p className="text-sm">Get notified about <span className="font-semibold text-orange-600">exclusive discounts</span> & offers</p>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Gift className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-sm">Be the first to know about <span className="font-semibold text-purple-600">new arrivals</span></p>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleSubscribe}
            className="w-full py-3.5 px-6 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02]"
          >
            <MessageCircle className="w-5 h-5" />
            Subscribe on WhatsApp
          </button>

          <p className="text-center text-xs text-gray-500 mt-4">
            No spam, we promise! Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppSubscribePopup;
