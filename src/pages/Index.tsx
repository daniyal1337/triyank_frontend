import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import SplitHero from "../components/home/SplitHero";
import ShopByOccasion from "../components/home/ShopByOccasion";
import ShopByMetal from "../components/home/ShopByMetal";
import ShopByStone from "../components/home/ShopByStone";
import CollectionsGrid from "../components/home/CollectionsGrid";
import ChooseByCelebs from "../components/home/ChooseByCelebs";
import FeaturedProducts from "../components/home/FeaturedProducts";
import NewArrivals from "../components/home/NewArrivals";
import CuratedForYou from "../components/home/CuratedForYou";
import PersonalizedGift from "../components/home/PersonalizedGift";
import Testimonials from "../components/home/Testimonials";
import WhatMakesSpecial from "../components/home/WhatMakesSpecial";
import InstaReels from "../components/home/InstaReels";
import OurBlogs from "../components/home/OurBlogs";
import ContactUs from "../components/home/ContactUs";
import LeatherJewelry from "../components/home/LeatherJewelry";


const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="mt-16">
        <SplitHero />
        <NewArrivals />
        <CuratedForYou />
        <PersonalizedGift />
        <LeatherJewelry />
        <ChooseByCelebs />
        <ShopByOccasion />
        <ShopByMetal />
        <ShopByStone />
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
