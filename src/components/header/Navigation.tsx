import { ArrowRight, X, Plus, Minus, Heart, MessageCircle, Search, ShoppingBag as ShoppingBagIcon, ChevronDown, Trash2, ShoppingCart, ArrowUpRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ShoppingBag from "./ShoppingBag";
import triyanLogoSmall from "@/assets/triyank-logo-small.png";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice, allProducts } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

const Navigation = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof allProducts>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = allProducts.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.collection.toLowerCase().includes(query) ||
      (product.material && product.material.toLowerCase().includes(query)) ||
      (product.occasion && product.occasion.toLowerCase().includes(query)) ||
      (product.description && product.description.toLowerCase().includes(query))
    );
    setSearchResults(filtered);
  }, [searchQuery]);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      navigate(`/product/${searchResults[0].id}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleResultClick = (productId: string) => {
    navigate(`/product/${productId}`);
    setIsSearchOpen(false);
    setSearchQuery("");
  };
  const [offCanvasType, setOffCanvasType] = useState<'favorites' | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShoppingBagOpen, setIsShoppingBagOpen] = useState(false);
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [expandedWesternCategories, setExpandedWesternCategories] = useState<string[]>([]);
  const [expandedTraditionalCategories, setExpandedTraditionalCategories] = useState<string[]>([]);
  const [expandedLeatherCategories, setExpandedLeatherCategories] = useState<string[]>([]);
  
  const { cartItems, updateQuantity, totalItems, addToCart } = useCart();
  const { items: wishlistItems, removeFromWishlist, totalItems: wishlistCount } = useWishlist();
  const { toast } = useToast();

  const bagItems = cartItems.map(item => ({
    id: Number(item.id.replace(/\D/g, '')) || Math.random(),
    name: item.name,
    price: formatPrice(item.price),
    image: item.image,
    quantity: item.quantity,
    category: item.category,
  }));

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    const cartItem = cartItems.find(item => {
      const numId = Number(item.id.replace(/\D/g, '')) || 0;
      return numId === id;
    });
    if (cartItem) {
      updateQuantity(cartItem.id, newQuantity);
    }
  };

  const popularSearches = [
    "Gold Necklaces", "Kundan Jewelry", "Minimalist Rings",
    "Bridal Sets", "Jhumka Earrings", "Chain Bracelets"
  ];
  
  const navItems = [
    { 
      name: "Western", 
      href: "/collection/western", 
      submenuItems: [],
      hasSubcategories: true
    },
    { 
      name: "Traditional", 
      href: "/collection/traditional", 
      submenuItems: [],
      hasSubcategories: true
    },
    { 
      name: "Leather", 
      href: "/collection/leather", 
      submenuItems: [],
      hasSubcategories: true
    },
    { name: "About", href: "/about", submenuItems: [] },
    { name: "Contact Us", href: "/contact", submenuItems: [] },
  ];

  const westernSubcategories = [
    { name: "Earrings", items: ["Studs", "Hoops", "Drop", "Ear cuff", "Statement"] },
    { name: "Necklace", items: ["Chokers", "Pendant Necklace", "Layered Necklace", "Statement Necklace", "Necklace Set", "Neck Cuff"] },
    { name: "Ring", items: ["Raw Stone", "Adjustable", "Band Rings"] },
    { name: "Cuffs & Bracelet", items: ["Chain Bracelets", "Cuff Bracelet"] },
    { name: "Anklets", items: ["Evil Eye Anklets"] },
    { name: "Hair Accessories", items: ["Head bands", "Scrunchies", "Bow clips", "Hair bands"] }
  ];

  const traditionalSubcategories = [
    { name: "Earrings", items: ["Chandbali", "Jhumka", "Hoop", "Studs", "Danglers & Drops", "View all"] },
    { name: "Necklace", items: ["Choker Set", "Long Set", "Pendant Set", "Handmade Necklace Set", "Chain Pendant Set"] },
    { name: "Rings", items: ["Adjustable", "Raw Stone", "Fusion", "Kundan", "Jadau"] },
    { name: "Bangles", items: ["Kada", "Thread Bangles", "Oxidised", "Meenakari", "Anti-Tarnish"] },
    { name: "Anklets & Toe Ring", items: ["Payal", "Toe Bands", "Nazar Anklet"] },
    { name: "Hair Accessory", items: ["Clutchers"] }
  ];

  const leatherSubcategories = [
    { name: "Earrings", items: ["Leaf & Teardrop", "Tassel Dangles", "Studs", "Laced Earrings", "Bohemian Earrings"] },
    { name: "Necklace", items: ["Choker", "Neckband", "Pendant Neck", "Tie Neckpiece", "Bohemian Neck"] },
    { name: "Bracelets", items: ["Wrist band", "Stack Ring", "Beaded", "Bohemian"] },
    { name: "Hair Accessory", items: ["Hair Barrette", "Hair Ties", "Hair Claw", "Head Band", "Hair Wraps"] }
  ];

 

  const categoryMenuItems = [
    {
      name: "WESTERN JEWELLERY",
      subcategories: ["Western Necklaces", "Western Earrings", "Western Bracelets", "Western Rings", "Western Anklets", "Western Hair Accessories"]
    },
    {
      name: "TRADITIONAL JEWELLERY", 
      subcategories: ["Traditional Necklaces", "Traditional Earrings", "Traditional Bangles", "Traditional Rings", "Traditional Toe Rings", "Traditional Hair Accessories"]
    },
    {
      name: "LEATHER JEWELLERY",
      subcategories: ["Leather Necklaces", "Leather Earrings", "Leather Bracelets", "Leather Rings", "Leather Anklets", "Leather Hair Accessories"]
    }
  ];

  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent("Hi! I'm interested in Triyank Jewelry.")}`;

  return (
    <nav className="relative" style={{ backgroundColor: 'rgb(182, 165, 153)' }}>
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Left: Hamburger + Logo + Brand Name */}
        <div className="flex items-center gap-1.5 md:gap-3">
          {/* Hamburger - visible on ALL screen sizes now - Increased size for mobile */}
          <button
            className="p-2 md:p-2 text-black hover:text-black/70 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-5 md:w-3.5 md:h-3.5 relative flex flex-col justify-center items-center">
              <span className={`absolute block w-5 md:w-3.5 h-0.5 bg-current transform transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45' : '-translate-y-1.5'
              }`}></span>
              <span className={`absolute block w-5 md:w-3.5 h-0.5 bg-current transform transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`absolute block w-5 md:w-3.5 h-0.5 bg-current transform transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45' : 'translate-y-1.5'
              }`}></span>
            </div>
          </button>

          {/* Small Logo - Increased size for mobile */}
          <Link to="/" className="flex items-center">
            <img src={triyanLogoSmall} alt="Triyank" className="h-8 w-8 md:h-8 md:w-8 object-contain" />
          </Link>

          {/* Brand Name - left aligned - Bigger for mobile */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl md:text-2xl mt-1 font-extrabold tracking-[0.28em] text-[#1a1410] drop-shadow-sm">
              TRIYANK
            </h1>
          </Link>
        </div>

        {/* Center Navigation Menu */}
        <div className="hidden lg:flex items-center gap-8">
          <Link 
            to="/" 
            className="text-black font-medium hover:text-[#1a1410] transition-colors duration-200 tracking-wide"
          >
            HOME
          </Link>
          
          {/* SHOP BY CATEGORY with Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsCategoryDropdownOpen(true)}
            onMouseLeave={() => setIsCategoryDropdownOpen(false)}
          >
            <button 
              className="flex items-center gap-1 text-black font-medium hover:text-[#1a1410] transition-colors duration-200 tracking-wide"
              aria-expanded={isCategoryDropdownOpen}
              aria-haspopup="true"
            >
              SHOP BY CATEGORY
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Dropdown Menu */}
            {isCategoryDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[800px] z-50">
                <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-6">
                  <div className="grid grid-cols-3 gap-6">
                    {categoryMenuItems.map((category) => (
                      <div key={category.name}>
                        <Link
                          to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block text-sm font-bold text-[#1a1410] hover:text-primary transition-colors duration-200 mb-4 uppercase tracking-wide"
                        >
                          {category.name}
                        </Link>
                        <div className="space-y-2">
                          {category.subcategories.map((subcategory) => (
                            <Link
                              key={subcategory}
                              to={`/category/${subcategory.toLowerCase().replace(/\s+/g, '-')}`}
                              className="block text-sm text-gray-600 hover:text-[#1a1410] hover:font-medium transition-colors duration-200 py-1"
                            >
                              {subcategory}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <Link 
            to="/category/bestsellers" 
            className="text-black font-medium hover:text-[#1a1410] transition-colors duration-200 tracking-wide"
          >
            BESTSELLERS
          </Link>
        </div>

        {/* Right icons */}
        <div className="flex items-center space-x-3 md:space-x-3">
          {/* Search - Increased icon size for mobile */}
          <button 
            className="group relative p-2 md:p-2.5 rounded-full bg-sky-100 hover:bg-sky-200 transition-all duration-300 transform hover:scale-110 hover:rotate-12 shadow-sm hover:shadow-md"
            aria-label="Search"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="w-5 h-5 md:w-5 md:h-5 text-sky-600 group-hover:text-sky-700 transition-colors duration-300" strokeWidth={2} />
            <div className="absolute inset-0 rounded-full bg-sky-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </button>

          {/* Wishlist - Increased icon size for mobile */}
          <button 
            className="group relative p-2 md:p-2.5 rounded-full bg-red-100 hover:bg-red-200 transition-all duration-300 transform hover:scale-110 hover:rotate-12 shadow-sm hover:shadow-md"
            aria-label="Wishlist"
            onClick={() => setOffCanvasType('favorites')}
          >
            <Heart className="w-5 h-5 md:w-5 md:h-5 text-red-500 group-hover:text-red-600 transition-colors duration-300" strokeWidth={2} fill={wishlistCount > 0 ? "currentColor" : "none"} />
            <div className="absolute inset-0 rounded-full bg-red-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 md:w-5 md:h-5 bg-red-500 text-white text-[9px] md:text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Bag - Increased icon size for mobile */}
          <button 
            className="group relative p-2 md:p-2.5 rounded-full bg-orange-100 hover:bg-orange-200 transition-all duration-300 transform hover:scale-110 hover:rotate-12 shadow-sm hover:shadow-md"
            aria-label="Shopping bag"
            onClick={() => setIsShoppingBagOpen(true)}
          >
            <ShoppingBagIcon className="w-5 h-5 md:w-5 md:h-5 text-orange-600 group-hover:text-orange-700 transition-colors duration-300" strokeWidth={2} />
            <div className="absolute inset-0 rounded-full bg-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 md:w-5 md:h-5 bg-orange-500 text-white text-[9px] md:text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setIsSearchOpen(false)}>
          <div className="absolute top-0 left-0 right-0 bg-background border-b border-border" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-8 max-h-[80vh] overflow-y-auto">
              <div className="max-w-2xl mx-auto">
                <form onSubmit={handleSearchSubmit} className="relative mb-8">
                  <div className="flex items-center border-b border-border pb-2">
                    <Search className="w-5 h-5 text-foreground mr-3" />
                    <input 
                      ref={searchInputRef}
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for jewelry..." 
                      className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-lg" 
                    />
                    {searchQuery && (
                      <button 
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="p-1 hover:bg-muted rounded-full"
                      >
                        <X className="w-4 h-4 text-muted-foreground" />
                      </button>
                    )}
                  </div>
                </form>

                {/* Search Results */}
                {searchQuery.trim() !== "" && (
                  <div className="mb-6">
                    {searchResults.length > 0 ? (
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-muted-foreground mb-3">
                          {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {searchResults.slice(0, 8).map((product) => (
                            <button
                              key={product.id}
                              onClick={() => handleResultClick(product.id)}
                              className="group text-left"
                            >
                              <div className="relative aspect-square rounded-lg overflow-hidden bg-muted mb-2">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                />
                              </div>
                              <h4 className="text-sm font-medium text-foreground truncate group-hover:text-primary">
                                {product.name}
                              </h4>
                              <p className="text-sm text-muted-foreground">{formatPrice(product.price)}</p>
                              <p className="text-xs text-muted-foreground capitalize">{product.category}</p>
                            </button>
                          ))}
                        </div>
                        {searchResults.length > 8 && (
                          <p className="text-center text-sm text-muted-foreground">
                            +{searchResults.length - 8} more results
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No products found for &quot;{searchQuery}&quot;</p>
                        <p className="text-sm text-muted-foreground mt-2">Try searching for: necklace, earrings, ring, bracelet...</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Popular Searches */}
                {searchQuery.trim() === "" && (
                  <div>
                    <h3 className="text-foreground text-sm font-light mb-4">Popular Searches</h3>
                    <div className="flex flex-wrap gap-3">
                      {popularSearches.map((search, index) => (
                        <button 
                          key={index} 
                          onClick={() => setSearchQuery(search)}
                          className="text-foreground hover:text-primary text-sm font-light py-2 px-4 border border-border rounded-full transition-colors duration-200 hover:border-primary"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide-out menu - works on ALL screen sizes */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 h-screen">
          <div className="absolute inset-0 bg-black/50 h-screen" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute left-0 top-8 h-[calc(100vh-32px)] w-80 md:w-96 bg-background border-r border-border animate-slide-in flex flex-col overflow-y-auto">
            {/* Menu header */}
            <div className="flex items-center justify-between p-5 border-b border-border" style={{ backgroundColor: 'rgb(182, 165, 153)' }}>
              <div className="flex items-center gap-2">
                <img src={triyanLogoSmall} alt="Triyank" className="h-7 w-7 object-contain" />
                <span className="text-lg font-bold tracking-[0.22em] text-[#1a1410] drop-shadow-sm">TRIYANK</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-black hover:text-black/70 transition-colors" aria-label="Close">
                <X size={20} />
              </button>
            </div>

            {/* Collection links */}
            <div className="border-b border-border">
              {navItems.map((item) => (
                <div key={item.name}>
                  {(item.name === "Western" || item.name === "Traditional" || item.name === "Leather") && item.hasSubcategories ? (
                    <div>
                      <button
                        onClick={() =>
                          setExpandedMobileSection(
                            expandedMobileSection === item.name ? null : item.name
                          )
                        }
                        className={`flex items-center justify-between w-full px-6 py-3.5 text-foreground text-lg font-semibold hover:bg-opacity-80 transition-colors ${
                          item.name === "Western" ? "bg-[#c9a86c]/20 text-[#3d3425]" :
                          item.name === "Traditional" ? "bg-[#8b4513]/15 text-[#5c1a1a]" :
                          item.name === "Leather" ? "bg-[#8b6f47]/20 text-[#4a3728]" :
                          "bg-[#b6a599]/30"
                        }`}
                      >
                        <span>{item.name}</span>
                        {expandedMobileSection === item.name ? (
                          <Minus size={18} className="text-muted-foreground" />
                        ) : (
                          <Plus size={18} className="text-muted-foreground" />
                        )}
                      </button>
                      {expandedMobileSection === item.name && (
                        <div className="bg-muted/30">
                          {(() => {
                            const categories = item.name === "Western" ? westernSubcategories : 
                                             item.name === "Traditional" ? traditionalSubcategories : leatherSubcategories;
                            return categories.map((category) => (
                            <div key={category.name} className="border-b border-border/50">
                              <button
                                onClick={() => {
                                  let expandedList: string[];
                                  let setExpanded: React.Dispatch<React.SetStateAction<string[]>>;
                                  
                                  if (item.name === "Western") {
                                    expandedList = expandedWesternCategories;
                                    setExpanded = setExpandedWesternCategories;
                                  } else if (item.name === "Traditional") {
                                    expandedList = expandedTraditionalCategories;
                                    setExpanded = setExpandedTraditionalCategories;
                                  } else {
                                    expandedList = expandedLeatherCategories;
                                    setExpanded = setExpandedLeatherCategories;
                                  }
                                  
                                  if (expandedList.includes(category.name)) {
                                    setExpanded(expandedList.filter(cat => cat !== category.name));
                                  } else {
                                    setExpanded([...expandedList, category.name]);
                                  }
                                }}
                                className={`flex items-center justify-between w-full px-10 py-3 text-foreground text-base font-semibold hover:bg-opacity-60 transition-colors ${
                                  item.name === "Western" ? "bg-[#c9a86c]/10" :
                                  item.name === "Traditional" ? "bg-[#8b4513]/10" :
                                  item.name === "Leather" ? "bg-[#8b6f47]/10" :
                                  "bg-muted/30"
                                }`}
                              >
                                <span>{category.name}</span>
                                {(() => {
                                  const expandedList = item.name === "Western" ? expandedWesternCategories : 
                                                     item.name === "Traditional" ? expandedTraditionalCategories : expandedLeatherCategories;
                                  return expandedList.includes(category.name) ? (
                                    <Minus size={16} className="text-muted-foreground" />
                                  ) : (
                                    <Plus size={16} className="text-muted-foreground" />
                                  );
                                })()}
                              </button>
                              {(() => {
                                const expandedList = item.name === "Western" ? expandedWesternCategories : 
                                                   item.name === "Traditional" ? expandedTraditionalCategories : expandedLeatherCategories;
                                if (expandedList.includes(category.name)) {
                                  return (
                                    <div className={`${
                                      item.name === "Western" ? "bg-[#c9a86c]/5" :
                                      item.name === "Traditional" ? "bg-[#8b4513]/5" :
                                      item.name === "Leather" ? "bg-[#8b6f47]/5" :
                                      "bg-muted/10"
                                    }`}>
                                      <div className="px-12 py-2">
                                        <div className={`text-xs font-semibold mb-2 ${
                                          item.name === "Western" ? "text-[#c9a86c]" :
                                          item.name === "Traditional" ? "text-[#8b4513]" :
                                          item.name === "Leather" ? "text-[#8b6f47]" :
                                          "text-[#1a1410]"
                                        }`}>
                                          {item.name.toUpperCase()} JEWELLERY
                                        </div>
                                      </div>
                                      {category.items.map((subItem) => {
                                        const subItemPath = subItem.toLowerCase().split(" ").join("-");
                                        const linkPath = "/category/" + subItemPath;
                                        let linkClass = "text-muted-foreground hover:text-foreground";
                                        if (item.name === "Western") {
                                          linkClass = "text-[#3d3425]/80 hover:text-[#3d3425] hover:bg-[#c9a86c]/10";
                                        } else if (item.name === "Traditional") {
                                          linkClass = "text-[#5c1a1a]/80 hover:text-[#5c1a1a] hover:bg-[#8b4513]/10";
                                        } else if (item.name === "Leather") {
                                          linkClass = "text-[#4a3728]/80 hover:text-[#4a3728] hover:bg-[#8b6f47]/10";
                                        }
                                        return (
                                          <Link
                                            key={subItem}
                                            to={linkPath}
                                            className={`block px-12 py-2 text-base font-medium transition-colors ${linkClass}`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                          >
                                            {subItem}
                                          </Link>
                                        );
                                      })}
                                    </div>
                                  );
                                }
                                return null;
                              })()}
                            </div>
                          ))
                          })()}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className="flex items-center justify-between px-6 py-3.5 text-foreground text-lg font-semibold bg-[#b6a599]/20 hover:bg-[#b6a599]/40 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                      <ArrowRight size={16} className="text-muted-foreground" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile WhatsApp Floating Button - Bottom Right */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="md:hidden fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <svg
          viewBox="0 0 32 32"
          className="w-7 h-7 text-white"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M19.11 17.53c-.25-.13-1.47-.72-1.7-.81-.23-.08-.4-.12-.57.13-.16.25-.65.81-.8.98-.15.16-.29.19-.54.06-.25-.13-1.05-.38-2-.1-.74-.2-1.24-1.12-1.39-1.31-.14-.2-.02-.31.1-.44.12-.12.25-.29.38-.44.13-.15.16-.25.25-.41.08-.16.04-.31-.02-.44-.06-.13-.57-1.38-.78-1.9-.2-.48-.41-.41-.57-.42h-.48c-.16 0-.44.06-.67.31-.23.25-.88.86-.88 2.09 0 1.23.9 2.42 1.02 2.59.12.16 1.78 2.72 4.31 3.81.6.26 1.07.42 1.43.54.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.57.21-1.06.15-1.18-.06-.11-.23-.18-.48-.31zM16 3C8.83 3 3 8.76 3 15.86c0 2.25.61 4.45 1.78 6.39L3 29l6.9-1.8c1.88 1.02 4 1.55 6.16 1.55 7.17 0 13-5.76 13-12.86C29 8.76 23.17 3 16 3zm0 23.46c-2.02 0-3.99-.55-5.68-1.6l-.41-.25-4.1 1.07 1.1-3.97-.27-.4a10.42 10.42 0 0 1-1.73-5.74C4.91 9.98 10.02 4.9 16 4.9s11.09 5.08 11.09 10.97S21.98 26.46 16 26.46z" />
        </svg>
      </a>

      {/* Shopping Bag Component */}
      <ShoppingBag 
        isOpen={isShoppingBagOpen}
        onClose={() => setIsShoppingBagOpen(false)}
        cartItems={bagItems}
        updateQuantity={handleUpdateQuantity}
        onViewFavorites={() => {
          setIsShoppingBagOpen(false);
          setOffCanvasType('favorites');
        }}
      />
      
      {/* Favorites Off-canvas overlay */}
      {offCanvasType === 'favorites' && (
        <div className="fixed inset-0 z-50 h-screen">
          <div className="absolute inset-0 bg-black/50 h-screen" onClick={() => setOffCanvasType(null)} />
          <div className="absolute right-0 top-0 h-screen w-80 md:w-96 bg-background border-l border-border animate-slide-in-right flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-lg font-light text-foreground">Your Wishlist ({wishlistCount})</h2>
              <button onClick={() => setOffCanvasType(null)} className="p-2 text-foreground hover:text-muted-foreground transition-colors" aria-label="Close">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {wishlistItems.length === 0 ? (
                <div className="p-6">
                  <p className="text-muted-foreground text-sm mb-6">
                    You haven't added any items to your wishlist yet. Browse our collection and click the heart icon to save items you love.
                  </p>
                  <Link 
                    to="/collection/western" 
                    onClick={() => setOffCanvasType(null)}
                    className="inline-block px-6 py-3 bg-foreground text-background text-sm tracking-wider hover:bg-foreground/90 transition-colors"
                  >
                    Browse Collection
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="p-4 flex gap-4">
                      <Link to={`/product/${item.id}`} onClick={() => setOffCanvasType(null)} className="shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link to={`/product/${item.id}`} onClick={() => setOffCanvasType(null)}>
                          <h3 className="text-sm font-medium text-foreground truncate hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground mt-1">{item.category}</p>
                        <p className="text-sm font-medium mt-1">{formatPrice(item.price)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => {
                              addToCart(item, 1);
                              toast({ title: "Added to bag", description: `${item.name} added to your bag.` });
                            }}
                            className="flex items-center gap-1 text-xs bg-foreground text-background px-3 py-1.5 rounded hover:bg-foreground/90 transition-colors"
                          >
                            <ShoppingCart size={12} />
                            Add to Cart
                          </button>
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={12} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {wishlistItems.length > 0 && (
              <div className="p-4 border-t border-border bg-muted/30">
                <Link 
                  to="/collection/western"
                  onClick={() => setOffCanvasType(null)}
                  className="block w-full text-center py-3 border border-foreground text-foreground text-sm tracking-wider hover:bg-foreground hover:text-background transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
