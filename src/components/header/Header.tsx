import StatusBar from "./StatusBar";
import Navigation from "./Navigation";
import CategoryBar from "./CategoryBar";

const Header = () => {
  return (
    <header className="fixed top-8 left-0 right-0 z-40">
        {/* <StatusBar /> */}
        <Navigation />
      </header>
  );
};

export default Header;