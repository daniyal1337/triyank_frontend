import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import { Product, formatPrice } from "@/data/products";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  variant?: "western" | "indian";
  showAddToCart?: boolean;
}

const ProductCard = ({ product, variant = "western", showAddToCart = true }: ProductCardProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const isIndian = variant === "indian";
  const isWishlisted = isInWishlist(product.id);
  
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.name} removed from your wishlist.`
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Added to wishlist",
        description: `${product.name} added to your wishlist.`
      });
    }
  };
  
  return (
    <Link 
      to={`/product/${product.id}`}
      className="group block"
    >
      <div className={cn(
        "relative overflow-hidden mb-4 rounded-lg p-4",
        isIndian ? "bg-indian-card" : "bg-western-card"
      )}>
        <img 
          src={product.image}
          alt={product.name}
          className="w-full aspect-square object-contain transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className={cn(
              "px-2 py-1 text-xs font-medium text-white rounded",
              isIndian ? "bg-indian-accent" : "bg-western-accent"
            )}>
              NEW
            </span>
          )}
          {product.isBestseller && (
            <span className={cn(
              "px-2 py-1 text-xs font-medium text-white rounded",
              isIndian ? "bg-indian-gold" : "bg-western-gold"
            )}>
              BESTSELLER
            </span>
          )}
        </div>
        
        {/* Action buttons */}
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
          {showAddToCart && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product, 1);
                setIsAdding(true);
                toast({ 
                  title: "Added to bag", 
                  description: `${product.name} added to your bag.` 
                });
                setTimeout(() => setIsAdding(false), 1500);
              }}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded text-xs font-medium transition-all duration-200",
                isIndian 
                  ? "bg-indian-accent text-white hover:bg-indian-accent/90" 
                  : "bg-western-accent text-white hover:bg-western-accent/90",
                isAdding && "bg-green-600"
              )}
            >
              {isAdding ? (
                <><Check size={14} /> Added</>
              ) : (
                <><ShoppingBag size={14} /> Add to Cart</>
              )}
            </button>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlistClick}
          className={cn(
            "absolute top-3 right-3 p-2 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300",
            isIndian ? "bg-indian-card" : "bg-white/90"
          )}
        >
          <Heart 
            size={18} 
            className={isWishlisted ? "fill-red-500 text-red-500" : isIndian ? "text-indian-muted" : "text-gray-600"}
          />
        </button>
      </div>
      
      <div className="text-center">
        <h3 className={cn(
          "text-sm font-medium mb-1 transition-colors",
          isIndian 
            ? "text-indian-text group-hover:text-indian-gold" 
            : "text-western-text group-hover:text-western-gold"
        )}>
          {product.name}
        </h3>
        <p className={cn(
          "text-sm",
          isIndian ? "text-indian-muted" : "text-western-muted"
        )}>
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
