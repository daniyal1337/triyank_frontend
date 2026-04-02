import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import RouteWrapper from "./components/RouteWrapper";
import WhatsAppSubscribePopup from "./components/WhatsAppSubscribePopup";
import WhatsAppFloatingButton from "./components/WhatsAppFloatingButton";
import PromoTicker from "./components/header/PromoTicker";
import Header from "./components/header/Header";
import Index from "./pages/Index";
import Category from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import About from "./pages/about/About";
import Blog from "./pages/blog/Blog";
import BlogPost from "./pages/blog/BlogPost";
import Contact from "./pages/contact/Contact";
import OurStory from "./pages/about/OurStory";
import Sustainability from "./pages/about/Sustainability";
import SizeGuide from "./pages/about/SizeGuide";
import CustomerCare from "./pages/about/CustomerCare";
import StoreLocator from "./pages/about/StoreLocator";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import WesternCollection from "./pages/WesternCollection";
import TraditionalCollection from "./pages/TraditionalCollection";
import AdminDashboard from "./pages/admin/AdminDashboard";
import OccasionCollection from "./pages/OccasionCollection";
import LeatherCollection from "./pages/LeatherCollection";
import NewArrivals from "./pages/NewArrivals";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-background overflow-x-hidden">
        {!isAdminRoute && <PromoTicker />}
        {!isAdminRoute && <Header />}
        <RouteWrapper>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/collection/western" element={<WesternCollection />} />
            <Route path="/collection/traditional" element={<TraditionalCollection />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/our-story" element={<OurStory />} />
            <Route path="/about/sustainability" element={<Sustainability />} />
            <Route path="/about/size-guide" element={<SizeGuide />} />
            <Route path="/about/customer-care" element={<CustomerCare />} />
            <Route path="/about/store-locator" element={<StoreLocator />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/occasion/:occasion" element={<OccasionCollection />} />
            <Route path="/collection/leather" element={<LeatherCollection />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </RouteWrapper>
        <ScrollToTopButton />
        <WhatsAppFloatingButton />
        <WhatsAppSubscribePopup />
      </div>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <WishlistProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </WishlistProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
