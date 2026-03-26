import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Product, formatPrice } from "@/data/products";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  variant?: "western" | "indian";
}

const ProductCard = ({ product, variant = "western" }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const isIndian = variant === "indian";
  
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
        
        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className={cn(
            "absolute top-3 right-3 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300",
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
