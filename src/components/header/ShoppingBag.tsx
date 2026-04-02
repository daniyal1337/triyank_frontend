import { X, Minus, Plus, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/data/products";

interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
  category: string;
}

interface ShoppingBagProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  updateQuantity: (id: number, newQuantity: number) => void;
  onViewWishlist?: () => void;
  onViewCart?: () => void;
  showWishlist?: boolean;
}

const ShoppingBag = ({ isOpen, onClose, cartItems, updateQuantity, onViewWishlist, onViewCart, showWishlist = false }: ShoppingBagProps) => {
  const { items: wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const panelBackgroundColor = "rgb(221, 212, 205)";
  
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('₹', '').replace(',', ''));
    return sum + (price * item.quantity);
  }, 0);

  return (
    <div className="fixed inset-0 z-50 h-screen">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 h-screen"
        onClick={onClose}
      />
      
      {/* Off-canvas panel */}
      <div className="absolute right-0 top-0 h-screen w-96 border-l border-border animate-slide-in-right flex flex-col" style={{ backgroundColor: panelBackgroundColor }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1a1410]/20">
          <h2 className="text-lg font-light text-[#1a1410]">Shopping Bag</h2>
          <button
            onClick={onClose}
            className="p-2 text-[#1a1410] hover:text-[#1a1410]/70 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 flex flex-col p-6">
          {/* Tab Navigation */}
          <div className="flex border-b border-[#1a1410]/20 mb-6">
            <button
              onClick={() => onViewWishlist?.()}
              className={`flex-1 py-3 text-sm font-light transition-colors ${
                showWishlist
                  ? "text-[#1a1410] border-b-2 border-[#1a1410]"
                  : "text-[#1a1410]/60 hover:text-[#1a1410]"
              }`}
            >
              Wishlist ({wishlistItems.length})
            </button>
            <button
              onClick={() => onViewCart?.()}
              className={`flex-1 py-3 text-sm font-light transition-colors ${
                !showWishlist
                  ? "text-[#1a1410] border-b-2 border-[#1a1410]"
                  : "text-[#1a1410]/60 hover:text-[#1a1410]"
              }`}
            >
              Shopping Bag ({cartItems.length})
            </button>
          </div>
          
          {showWishlist ? (
            // Wishlist Content
            wishlistItems.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-[#1a1410]/70 text-sm text-center">
                  Your wishlist is empty.<br />
                  Browse our collection and add items you love!
                </p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto space-y-4 mb-6">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 bg-[#1a1410]/10 rounded-lg overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-sm font-light text-[#1a1410]/60">{item.category}</p>
                            <h3 className="text-sm font-medium text-[#1a1410]">{item.name}</h3>
                            <p className="text-sm font-medium text-[#1a1410] mt-1">{formatPrice(item.price)}</p>
                          </div>
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            className="p-1 text-[#1a1410]/60 hover:text-red-500 transition-colors"
                            aria-label="Remove from wishlist"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            addToCart(item, 1);
                            removeFromWishlist(item.id);
                            toast({ 
                              title: "Added to bag", 
                              description: `${item.name} added to your bag.`,
                              duration: 3000
                            });
                          }}
                          className="flex items-center gap-2 px-3 py-2 bg-[#1a1410] text-white text-xs font-light rounded hover:bg-[#1a1410]/90 transition-colors"
                        >
                          <ShoppingCart size={14} />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#1a1410]/20 pt-4">
                  <Button 
                    variant="outline" 
                    className="w-full rounded-none border-[#1a1410]/30 hover:bg-[#1a1410]/10" 
                    size="lg"
                    onClick={onClose}
                    asChild
                  >
                    <Link to="/collection/western">
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
              </>
            )
          ) : (
            // Shopping Bag Content
            <>
              {cartItems.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-[#1a1410]/70 text-sm text-center">
                    Your shopping bag is empty.<br />
                    Continue shopping to add items to your bag.
                  </p>
                </div>
              ) : (
                <>
                  {/* Cart items */}
                  <div className="flex-1 overflow-y-auto space-y-6 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-20 h-20 bg-[#1a1410]/10 rounded-lg overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="text-sm font-light text-[#1a1410]/60">{item.category}</p>
                              <h3 className="text-sm font-medium text-[#1a1410]">{item.name}</h3>
                            </div>
                            <p className="text-sm font-light text-[#1a1410]">{item.price}</p>
                          </div>
                          <div className="flex items-center gap-2 mt-3">
                            <div className="flex items-center border border-[#1a1410]/20">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-[#1a1410]/10 transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={14} className="text-[#1a1410]" />
                              </button>
                              <span className="px-3 py-2 text-sm font-light min-w-[40px] text-center text-[#1a1410]">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-[#1a1410]/10 transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus size={14} className="text-[#1a1410]" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Subtotal and checkout */}
                  <div className="border-t border-[#1a1410]/20 pt-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-light text-[#1a1410]">Subtotal</span>
                      <span className="text-sm font-medium text-[#1a1410]">₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                    
                    <p className="text-xs text-[#1a1410]/60">
                      Shipping and taxes calculated at checkout
                    </p>
                    
                    <Button 
                      asChild 
                      className="w-full rounded-none bg-[#1a1410] hover:bg-[#1a1410]/90" 
                      size="lg"
                      onClick={onClose}
                    >
                      <Link to="/checkout">
                        Proceed to Checkout
                      </Link>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full rounded-none border-[#1a1410]/30 hover:bg-[#1a1410]/10" 
                      size="lg"
                      onClick={onClose}
                      asChild
                    >
                      <Link to="/category/shop">
                        Continue Shopping
                      </Link>
                    </Button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingBag;
