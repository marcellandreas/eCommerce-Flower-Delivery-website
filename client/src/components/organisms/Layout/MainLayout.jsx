
import { memo } from "react";
import PropTypes from "prop-types";
import { Navbar, Footer } from "../../organisms";

const MainLayout = memo(({ children }) => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-white dark:bg-dark-bg text-black dark:text-dark-text transition-colors duration-300">
      <Navbar />
      
      <main className="bg-white dark:bg-dark-bg w-full min-h-screen grid grid-cols-12 flex-1 transition-colors duration-300">
        {children}
      </main>
      
      <Footer />
    </div>
  );
});

MainLayout.displayName = "MainLayout";

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export {  MainLayout };
