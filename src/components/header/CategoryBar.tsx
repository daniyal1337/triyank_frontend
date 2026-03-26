import { Link } from "react-router-dom";
import categoryAll from "@/assets/category-all.jpg";
import categoryEarrings from "@/assets/category-earrings.jpg";
import categoryNecklaces from "@/assets/category-necklaces.jpg";
import categoryRings from "@/assets/category-rings.jpg";
import categoryBracelets from "@/assets/category-bracelets.jpg";
import categoryBangles from "@/assets/category-bangles.jpg";
import categoryNewarrivals from "@/assets/category-newarrivals.jpg";
import categoryBestsellers from "@/assets/category-bestsellers.jpg";
import categoryHairaccessory from "@/assets/category-hairaccessory.jpg";

const categories = [
  { name: "New Arrivals", image: categoryNewarrivals, link: "/category/new-arrivals" },
  { name: "Best Sellers", image: categoryBestsellers, link: "/category/best-sellers" },
  { name: "Necklace", image: categoryNecklaces, link: "/category/necklaces" },
  { name: "Earrings", image: categoryEarrings, link: "/category/earrings" },
  { name: "Bangles", image: categoryBangles, link: "/category/bangles" },
  { name: "Rings", image: categoryRings, link: "/category/rings" },
  { name: "Anklets", image: categoryBangles, link: "/category/anklets" },
  { name: "Hair Accessories", image: categoryHairaccessory, link: "/category/hair-accessories" },
];

const CategoryBar = () => {
  return (
    <div className="w-full bg-background border-b border-border py-1.5 overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-4 md:gap-6 px-4 md:px-6 min-w-max md:justify-center">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={cat.link}
            className="group flex flex-col items-center gap-1.5 shrink-0"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-primary/30 group-hover:border-primary transition-colors duration-300">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="text-[0.65rem] md:text-xs font-medium tracking-wider text-foreground uppercase leading-tight text-center max-w-[70px]">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
