import { useState, useEffect } from "react";
import { X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const FeedbackPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Please select a rating",
        variant: "destructive",
      });
      return;
    }

    if (!feedback.trim()) {
      toast({
        title: "Please enter your feedback",
        variant: "destructive",
      });
      return;
    }

    // Submit feedback
    toast({
      title: "Thank you for your feedback!",
      description: "Your review has been submitted successfully.",
    });

    // Reset and close
    setRating(0);
    setFeedback("");
    setName("");
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-300">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-medium tracking-wider text-foreground mb-2">
            Share Your Experience
          </h2>
          <p className="text-muted-foreground text-sm">
            We value your feedback. Rate your experience and help us improve.
          </p>
          <div className="w-16 h-px bg-primary mx-auto mt-4" />
        </div>

        {/* Rating Stars */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-3 text-center">
            How would you rate your experience? *
          </label>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1 transition-transform hover:scale-110"
                aria-label={`Rate ${star} stars`}
              >
                <Star
                  className={`w-8 h-8 transition-colors ${
                    star <= (hoverRating || rating)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-gray-200 text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-2">
            {rating > 0 && (
              <span className="text-primary font-medium">
                {rating === 5 && "Excellent!"}
                {rating === 4 && "Very Good!"}
                {rating === 3 && "Good"}
                {rating === 2 && "Fair"}
                {rating === 1 && "Poor"}
              </span>
            )}
          </p>
        </div>

        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-foreground mb-2">
            Your Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name (optional)"
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:border-primary text-sm"
          />
        </div>

        {/* Feedback Textarea */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-2">
            Your Feedback *
          </label>
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Tell us about your experience..."
            className="min-h-[100px] resize-none text-sm"
          />
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          className="w-full bg-foreground text-background hover:bg-foreground/90 font-medium tracking-wider"
        >
          Submit Feedback
        </Button>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-4">
          Your feedback helps us serve you better
        </p>
      </div>
    </div>
  );
};

export default FeedbackPopup;
