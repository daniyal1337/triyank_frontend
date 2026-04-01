import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Minus, Plus, Check, Heart, Truck, Gem, Shield, RefreshCw, Clock, Wallet, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { allProducts, formatPrice } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

const ProductFeatures = () => (
  <div className="bg-[#f5f5f5] py-4 px-4">
    <div className="flex justify-around items-center">
      <div className="flex flex-col items-center gap-2">
        <Truck className="w-6 h-6 text-[#666]" strokeWidth={1.5} />
        <span className="text-xs text-[#666] text-center leading-tight">
          <span className="md:hidden">Free<br/>Shipping</span>
          <span className="hidden md:inline">Free Shipping</span>
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Shield className="w-6 h-6 text-[#666]" strokeWidth={1.5} />
        <span className="text-xs text-[#666] text-center leading-tight">
          <span className="md:hidden">Skin Safe<br/>Jewellery</span>
          <span className="hidden md:inline">Skin Safe Jewellery</span>
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Gem className="w-6 h-6 text-[#666]" strokeWidth={1.5} />
        <span className="text-xs text-[#666] text-center leading-tight">
          <span className="md:hidden">18K Gold<br/>Tone Plated</span>
          <span className="hidden md:inline">18K Gold Tone Plated</span>
        </span>
      </div>
    </div>
  </div>
);

const ProductServices = () => (
  <div className="border-t border-border">
    <div className="grid grid-cols-3 divide-x divide-border">
      <div className="flex flex-col items-center gap-2 py-4 px-2">
        <RefreshCw className="w-5 h-5 text-[#666]" strokeWidth={1.5} />
        <span className="text-xs text-[#666] text-center">2 Days Return</span>
      </div>
      <div className="flex flex-col items-center gap-2 py-4 px-2">
        <Clock className="w-5 h-5 text-[#666]" strokeWidth={1.5} />
        <span className="text-xs text-[#666] text-center">10 Days Exchange</span>
      </div>
      <div className="flex flex-col items-center gap-2 py-4 px-2">
        <Wallet className="w-5 h-5 text-[#666]" strokeWidth={1.5} />
        <span className="text-xs text-[#666] text-center">Cash On Delivery</span>
      </div>
    </div>
  </div>
);

const ProductInfo = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const [added, setAdded] = useState(false);

  const product = allProducts.find(p => p.id === productId);
  const isWishlisted = product ? isInWishlist(product.id) : false;

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setAdded(true);
    toast({ title: "Added to bag", description: `${quantity}x ${product.name} added to your bag.` });
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast({ title: "Removed from wishlist", description: `${product.name} removed from your wishlist.` });
    } else {
      addToWishlist(product);
      toast({ title: "Added to wishlist", description: `${product.name} added to your wishlist.` });
    }
  };

  const displayName = product?.name || "Product Name";
  const displayCategory = product?.category || "Category";
  const displayPrice = product ? formatPrice(product.price) : "₹0";

  const handleGoToTestimonials = () => {
    const el = document.getElementById("testimonials");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    navigate("/#testimonials");
  };

  return (
    <div className="space-y-0">
      {/* Breadcrumb - Show only on desktop */}
      <div className="hidden lg:block mb-6">
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
      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-1">{displayCategory}</p>
        <h1 className="text-2xl md:text-3xl font-light text-foreground mb-2">{displayName}</h1>
        <button
          type="button"
          onClick={handleGoToTestimonials}
          className="flex items-center gap-2 mb-2 cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="View testimonials"
        >
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <Star className="w-4 h-4 fill-amber-200 text-amber-400" />
          <span className="text-sm text-muted-foreground ml-1">4.5</span>
        </button>
        <p className="text-xl font-light text-foreground">{displayPrice}</p>
      </div>

      {/* Quantity and Add to Cart */}
      <div className="space-y-4 mb-6">
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
            className={`h-12 w-12 rounded-none border-border shrink-0 ${isWishlisted ? 'bg-red-50 border-red-300' : ''}`}
            onClick={handleWishlistToggle}
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-foreground'}`} />
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <ProductFeatures />

      {/* Accordion Sections */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="description" className="border-b border-border">
          <AccordionTrigger className="text-sm font-medium py-4 hover:no-underline">
            Description
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground pb-4">
            {product?.description || "No description available."}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="specification" className="border-b border-border">
          <AccordionTrigger className="text-sm font-medium py-4 hover:no-underline">
            Specification
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="space-y-3 text-sm">
              {product?.material && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Material</span>
                  <span>{product.material}</span>
                </div>
              )}
              {product?.weight && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Weight</span>
                  <span>{product.weight}</span>
                </div>
              )}
              {product?.dimensions && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dimensions</span>
                  <span>{product.dimensions}</span>
                </div>
              )}
              {product?.occasion && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Occasion</span>
                  <span>{product.occasion}</span>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="supplier" className="border-b border-border">
          <AccordionTrigger className="text-sm font-medium py-4 hover:no-underline">
            Supplier Information
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground pb-4">
            <p>Manufactured by Triyank Jewelry Pvt. Ltd.</p>
            <p className="mt-2">Karol Bagh, New Delhi - 110005, India</p>
            <p className="mt-2">Contact: +91 98765 43210</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="returns" className="border-b border-border">
          <AccordionTrigger className="text-sm font-medium py-4 hover:no-underline">
            Returns
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground pb-4">
            <p>We offer easy returns within 2 days of delivery.</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Item must be unused and in original packaging</li>
              <li>Return shipping is free for defective items</li>
              <li>Refunds processed within 5-7 business days</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Services Section */}
      <ProductServices />
    </div>
  );
};

export default ProductInfo;
