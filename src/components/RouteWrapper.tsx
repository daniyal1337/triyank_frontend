import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

interface RouteWrapperProps {
  children: React.ReactNode;
}

const RouteWrapper = ({ children }: RouteWrapperProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show loading when location changes
    setIsLoading(true);

    // Simulate a small delay to show the loading animation
    // This ensures the loading screen is visible during navigation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      {children}
    </>
  );
};

export default RouteWrapper;
