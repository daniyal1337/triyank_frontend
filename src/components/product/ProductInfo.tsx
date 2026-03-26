import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { Minus, Plus, Check, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { allProducts, formatPrice } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

const ProductInfo = () => {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const product = allProducts.find(p => p.id === productId);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setAdded(true);
    toast({ title: "Added to bag", description: `${quantity}x ${product.name} added to your bag.` });
    setTimeout(() => setAdded(false), 2000);
  };

  const displayName = product?.name || "Pantheon";
  const displayCategory = product?.category || "Earrings";
  const displayPrice = product ? formatPrice(product.price) : "€2,850";

  return (
    <div className="space-y-6">
      {/* Breadcrumb - Show only on desktop */}
      <div className="hidden lg:block">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/category/${displayCategory.toLowerCase()}`}>{displayCategory}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{displayName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Product title and price */}
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-light text-muted-foreground mb-1">{displayCategory}</p>
            <h1 className="text-2xl md:text-3xl font-light text-foreground">{displayName}</h1>
          </div>
          <div className="text-right">
            <p className="text-xl font-light text-foreground">{displayPrice}</p>
          </div>
        </div>
      </div>

      {/* Product details */}
      <div className="space-y-4 py-4 border-b border-border">
        {product?.material && (
          <div className="space-y-2">
            <h3 className="text-sm font-light text-foreground">Material</h3>
            <p className="text-sm font-light text-muted-foreground">{product.material}</p>
          </div>
        )}
        {product?.dimensions && (
          <div className="space-y-2">
            <h3 className="text-sm font-light text-foreground">Dimensions</h3>
            <p className="text-sm font-light text-muted-foreground">{product.dimensions}</p>
          </div>
        )}
        {product?.weight && (
          <div className="space-y-2">
            <h3 className="text-sm font-light text-foreground">Weight</h3>
            <p className="text-sm font-light text-muted-foreground">{product.weight}</p>
          </div>
        )}
        {product?.occasion && (
          <div className="space-y-2">
            <h3 className="text-sm font-light text-foreground">Occasion</h3>
            <p className="text-sm font-light text-muted-foreground">{product.occasion}</p>
          </div>
        )}
        {product?.description && (
          <div className="space-y-2">
            <h3 className="text-sm font-light text-foreground">Description</h3>
            <p className="text-sm font-light text-muted-foreground">{product.description}</p>
          </div>
        )}
      </div>

      {/* Quantity and Add to Cart */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-light text-foreground">Quantity</span>
          <div className="flex items-center border border-border">
            <Button variant="ghost" size="sm" onClick={decrementQuantity} className="h-10 w-10 p-0 hover:bg-transparent hover:opacity-50 rounded-none border-none">
              <Minus className="h-4 w-4" />
            </Button>
            <span className="h-10 flex items-center px-4 text-sm font-light min-w-12 justify-center border-l border-r border-border">
              {quantity}
            </span>
            <Button variant="ghost" size="sm" onClick={incrementQuantity} className="h-10 w-10 p-0 hover:bg-transparent hover:opacity-50 rounded-none border-none">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            className="flex-1 h-12 bg-foreground text-background hover:bg-foreground/90 font-light rounded-none gap-2"
            onClick={handleAddToCart}
          >
            {added ? <><Check className="h-4 w-4" /> Added to Bag</> : "Add to Bag"}
          </Button>
          <Button
            variant="outline"
            className={`h-12 w-12 rounded-none border-border shrink-0 ${wishlisted ? 'bg-red-50 border-red-300' : ''}`}
            onClick={() => {
              setWishlisted(!wishlisted);
              toast({ title: wishlisted ? "Removed from wishlist" : "Added to wishlist", description: `${displayName} ${wishlisted ? 'removed from' : 'added to'} your wishlist.` });
            }}
          >
            <Heart className={`h-5 w-5 ${wishlisted ? 'fill-red-500 text-red-500' : 'text-foreground'}`} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
