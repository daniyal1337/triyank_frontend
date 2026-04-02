import { ArrowRight, X, Plus, Minus, Heart, MessageCircle, Search, ShoppingBag as ShoppingBagIcon, ChevronDown, Trash2, ShoppingCart, ArrowUpRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ShoppingBag from "./ShoppingBag.tsx";
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
  const [offCanvasType, setOffCanvasType] = useState<'favorites' | 'cart' | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      subcategories: ["Necklaces", "Earrings", "Bracelets", "Rings", "Anklets", "Hair Accessories"]
    },
    {
      name: "TRADITIONAL JEWELLERY", 
      subcategories: ["Necklaces", "Earrings", "Bangles", "Rings", "Toe Rings", "Hair Accessories"]
    },
    {
      name: "LEATHER JEWELLERY",
      subcategories: ["Necklaces", "Earrings", "Bracelets", "Rings", "Anklets", "Hair Accessories"]
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
                <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                  <div className="grid grid-cols-3">
                    {categoryMenuItems.map((category, index) => (
                      <div 
                        key={category.name} 
                        className={`p-6 ${index < 2 ? 'border-r border-gray-200' : ''} ${
                          category.name.includes('WESTERN') ? 'bg-[#c9a86c]/10' :
                          category.name.includes('TRADITIONAL') ? 'bg-[#8b4513]/10' :
                          'bg-[#8b6f47]/10'
                        }`}
                      >
                        <Link
                          to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                          className={`block text-sm font-bold hover:opacity-80 transition-opacity duration-200 mb-4 uppercase tracking-wide ${
                            category.name.includes('WESTERN') ? 'text-[#3d3425]' :
                            category.name.includes('TRADITIONAL') ? 'text-[#5c1a1a]' :
                            'text-[#4a3728]'
                          }`}
                        >
                          {category.name}
                        </Link>
                        <div className="space-y-2">
                          {category.subcategories.map((subcategory) => (
                            <Link
                              key={subcategory}
                              to={`/category/${subcategory.toLowerCase().replace(/\s+/g, '-')}`}
                              className={`block text-sm transition-colors duration-200 py-1 ${
                                category.name.includes('WESTERN') ? 'text-[#3d3425]/70 hover:text-[#3d3425]' :
                                category.name.includes('TRADITIONAL') ? 'text-[#5c1a1a]/70 hover:text-[#5c1a1a]' :
                                'text-[#4a3728]/70 hover:text-[#4a3728]'
                              }`}
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
            onClick={() => {
              setOffCanvasType('favorites');
            }}
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
            onClick={() => setOffCanvasType('cart')}
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
          <div className="absolute top-0 left-0 right-0 border-b border-border" style={{ backgroundColor: 'rgb(182, 165, 153)' }} onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-8 max-h-[80vh] overflow-y-auto">
              <div className="max-w-2xl mx-auto">
                <form onSubmit={handleSearchSubmit} className="relative mb-8">
                  <div className="flex items-center border-b border-[#1a1410]/30 pb-2">
                    <Search className="w-5 h-5 text-[#1a1410] mr-3" />
                    <input 
                      ref={searchInputRef}
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for jewelry..." 
                      className="flex-1 bg-transparent text-[#1a1410] placeholder:text-[#1a1410]/50 outline-none text-lg" 
                    />
                    {searchQuery && (
                      <button 
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="p-1 hover:bg-[#1a1410]/10 rounded-full"
                      >
                        <X className="w-4 h-4 text-[#1a1410]" />
                      </button>
                    )}
                  </div>
                </form>

                {/* Search Results */}
                {searchQuery.trim() !== "" && (
                  <div className="mb-6">
                    {searchResults.length > 0 ? (
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-[#1a1410]/70 mb-3">
                          {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {searchResults.slice(0, 8).map((product) => (
                            <button
                              key={product.id}
                              onClick={() => handleResultClick(product.id)}
                              className="group text-left"
                            >
                              <div className="relative aspect-square rounded-lg overflow-hidden bg-[#1a1410]/10 mb-2">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                />
                              </div>
                              <h4 className="text-sm font-medium text-[#1a1410] truncate group-hover:opacity-80">
                                {product.name}
                              </h4>
                              <p className="text-sm text-[#1a1410]/70">{formatPrice(product.price)}</p>
                              <p className="text-xs text-[#1a1410]/60 capitalize">{product.category}</p>
                            </button>
                          ))}
                        </div>
                        {searchResults.length > 8 && (
                          <p className="text-center text-sm text-[#1a1410]/70">
                            +{searchResults.length - 8} more results
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-[#1a1410]/70">No products found for &quot;{searchQuery}&quot;</p>
                        <p className="text-sm text-[#1a1410]/60 mt-2">Try searching for: necklace, earrings, ring, bracelet...</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Popular Searches */}
                {searchQuery.trim() === "" && (
                  <div>
                    <h3 className="text-[#1a1410] text-sm font-light mb-4">Popular Searches</h3>
                    <div className="flex flex-wrap gap-3">
                      {popularSearches.map((search, index) => (
                        <button 
                          key={index} 
                          onClick={() => setSearchQuery(search)}
                          className="text-[#1a1410] hover:text-[#1a1410]/80 text-sm font-light py-2 px-4 border border-[#1a1410]/30 rounded-full transition-colors duration-200 hover:border-[#1a1410]/60"
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
                                className={`flex items-center justify-between w-full px-10 py-3 text-foreground text-lg font-normal hover:bg-opacity-60 transition-colors ${
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
                                          JEWELLERY
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

            {/* Track Order Section */}
            <div className="border-b border-border">
              <button
                className="flex items-center justify-between w-full px-6 py-3.5 text-foreground text-lg font-semibold bg-[#b6a599]/20 hover:bg-[#b6a599]/40 transition-colors"
                aria-label="Track Order"
              >
                <span>Track Order</span>
                <ArrowRight size={16} className="text-muted-foreground" />
              </button>
            </div>

            {/* Give Feedback Section */}
            <div className="border-b border-border">
              <Link
                to="/#feedback"
                className="flex items-center justify-between px-6 py-3.5 text-foreground text-lg font-semibold bg-[#b6a599]/20 hover:bg-[#b6a599]/40 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Give a Feedback</span>
                <ArrowRight size={16} className="text-muted-foreground" />
              </Link>
            </div>

            {/* Social Media Section */}
            <div className="p-6 border-t border-border bg-[#f5f5f5]">
              <p className="text-sm text-muted-foreground mb-4 text-center font-medium">Connect With Us</p>
              <div className="flex justify-center gap-6">
                {/* Instagram */}
                <a
                  href="https://instagram.com/triyank"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 hover:scale-110 transition-transform duration-300"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                {/* WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] hover:scale-110 transition-all duration-300"
                  aria-label="WhatsApp"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
                {/* Facebook */}
                <a
                  href="https://facebook.com/triyank"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-[#1877F2] hover:bg-[#166fe5] hover:scale-110 transition-all duration-300"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
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
        isOpen={offCanvasType === 'cart' || offCanvasType === 'favorites'}
        onClose={() => setOffCanvasType(null)}
        cartItems={bagItems}
        updateQuantity={handleUpdateQuantity}
        onViewFavorites={() => setOffCanvasType('favorites')}
        showWishlist={offCanvasType === 'favorites'}
      />
    </nav>
  );
};

export default Navigation;
