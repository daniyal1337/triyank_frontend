import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import SplitHero from "../components/home/SplitHero";
import ShopByOccasion from "../components/home/ShopByOccasion";
import CollectionsGrid from "../components/home/CollectionsGrid";
import ChooseByCelebs from "../components/home/ChooseByCelebs";
import FeaturedProducts from "../components/home/FeaturedProducts";
import NewArrivals from "../components/home/NewArrivals";
import Testimonials from "../components/home/Testimonials";
import WhatMakesSpecial from "../components/home/WhatMakesSpecial";
import InstaReels from "../components/home/InstaReels";
import OurBlogs from "../components/home/OurBlogs";
import ContactUs from "../components/home/ContactUs";
import LeatherJewelry from "../components/home/LeatherJewelry";
import CustomerReview from "../components/home/CustomerReview";


const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="mt-16">
        <SplitHero />
        <LeatherJewelry />
        <NewArrivals />
        <ChooseByCelebs />
        <ShopByOccasion />
        <CollectionsGrid />
        <InstaReels />
        <FeaturedProducts />
     
        <Testimonials />
        <WhatMakesSpecial />
        <OurBlogs />
        <ContactUs />
        <CustomerReview />
      </main>
      <Footer />
   
    </div>
  );
};

export default Index;
