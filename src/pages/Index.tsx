import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import SplitHero from "../components/home/SplitHero";
import ShopByOccasion from "../components/home/ShopByOccasion";
import CollectionsGrid from "../components/home/CollectionsGrid";
import ChooseByCelebs from "../components/home/ChooseByCelebs";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Testimonials from "../components/home/Testimonials";
import WhatMakesSpecial from "../components/home/WhatMakesSpecial";
import InstaReels from "../components/home/InstaReels";
import OurBlogs from "../components/home/OurBlogs";
import ContactUs from "../components/home/ContactUs";
import LeatherJewelry from "../components/home/LeatherJewelry";


const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mt-16">
        <SplitHero />
        <LeatherJewelry />
        <ChooseByCelebs />
        <ShopByOccasion />
        <CollectionsGrid />
        <FeaturedProducts />
     
        <Testimonials />
        <WhatMakesSpecial />
        <InstaReels />
        <OurBlogs />
        <ContactUs />
      </main>
      <Footer />
   
    </div>
  );
};

export default Index;
