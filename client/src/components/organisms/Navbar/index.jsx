import { useState, useCallback, useMemo } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiShoppingBagFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import usePopUp from "../../../utils/usePopUp";
import { CardMediaSosial, CartPopUp, LoginPopUp } from "../../molecules";
import DarkModeToggle from "../../atoms/DarkModeToggle";

// Navigation Items Configuration
const NAV_ITEMS = [
  { path: '/shop', label: 'Shop' },
  { path: '/contact', label: 'Contact' },
];

const MOBILE_MENU_ITEMS = [
  { path: '/service', label: 'Service' },
  { path: '/contact', label: 'Contact' },
  { path: '/about', label: 'About Us' },
];

const NavLink = ({ to, label, className = "" }) => (
  <Link
    to={to}
    className={`flex justify-center items-center transition-colors duration-200 ${className}`}
  >
    {label}
  </Link>
);

const MobileMenuItem = ({ to, label, onClick }) => (
  <div className="border-b p-5 dark:border-dark-border">
    <Link to={to} onClick={onClick}>{label}</Link>
  </div>
);

const Navbar = () => {
  const [activeToggle, setActiveToggle] = useState(false);
  const { pathname } = useLocation();

  const {
    showPopUp: showLogin,
    handleOpenPopUp: openLogin,
    handleClosePopUp: closeLogin,
  } = usePopUp();

  const {
    showPopUp: showCart,
    handleOpenPopUp: openCart,
    handleClosePopUp: closeCart,
  } = usePopUp();

  const handleActiveToggle = useCallback(() => {
    setActiveToggle(prev => !prev);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setActiveToggle(false);
  }, []);

  const getNavItem = useCallback((path, label) => ({
    to: pathname.startsWith(path) ? "/" : path,
    label: pathname.startsWith(path) ? "Home" : label,
  }), [pathname]);

  const shouldShowCart = useMemo(() => pathname !== "/check-out", [pathname]);

  return (
    <nav className="border sticky top-0 z-50 bg-white dark:bg-dark-bg dark:border-dark-border transition-colors duration-300">
      {/* Desktop Navigation */}
      <article className="hidden lg:flex justify-between h-16 items-center text-black dark:text-dark-text">
        <section className="flex h-full w-1/4">
          {NAV_ITEMS.map(({ path, label }) => {
            const navItem = getNavItem(path, label);
            return (
              <NavLink
                key={path}
                to={navItem.to}
                label={navItem.label}
                className="w-1/2 border-r dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-surface"
              />
            );
          })}
        </section>

        <section className="flex h-full items-center gap-4">
          {/* Dark Mode Toggle */}
          <div className="px-4">
            <DarkModeToggle />
          </div>

          <button
            onClick={openLogin}
            className="h-full px-6 border-l dark:border-dark-border flex justify-center items-center hover:bg-gray-50 dark:hover:bg-dark-surface transition-colors duration-200"
            aria-label="Sign in"
          >
            Sign In
          </button>

          {shouldShowCart && (
            <button
              onClick={openCart}
              className="h-full px-6 border-l dark:border-dark-border flex justify-center items-center hover:bg-gray-50 dark:hover:bg-dark-surface transition-colors duration-200"
              aria-label="Open shopping cart"
            >
              Cart
            </button>
          )}
        </section>
      </article>

      {/* Mobile Navigation */}
      <article className="lg:hidden flex justify-between h-16 items-center text-black dark:text-dark-text">
        <button
          onClick={handleActiveToggle}
          className="flex border-r dark:border-dark-border h-full w-16 justify-center items-center hover:bg-gray-50 dark:hover:bg-dark-surface transition-colors duration-200"
          aria-label="Toggle menu"
          aria-expanded={activeToggle}
        >
          <GiHamburgerMenu />
        </button>

        {/* Mobile Dark Mode Toggle */}
        <div className="flex items-center gap-4">
          <DarkModeToggle />
          
          <button
            onClick={openCart}
            className="flex border-l dark:border-dark-border h-16 w-16 justify-center items-center hover:bg-gray-50 dark:hover:bg-dark-surface transition-colors duration-200"
            aria-label="Open shopping cart"
          >
            <RiShoppingBagFill />
          </button>
        </div>
      </article>

      {/* Popups */}
      <LoginPopUp show={showLogin} onClose={closeLogin} />
      <CartPopUp show={showCart} onClose={closeCart} />

      {/* Mobile Menu */}
      {activeToggle && (
        <div className="lg:hidden absolute top-0 md:w-1/2 w-full h-screen bg-white dark:bg-dark-bg z-50 shadow-2xl transition-colors duration-300">
          <div className="flex flex-col h-full">
            <button
              onClick={handleCloseMenu}
              className="p-5 cursor-pointer border-b dark:border-dark-border text-left hover:bg-gray-50 dark:hover:bg-dark-surface"
              aria-label="Close menu"
            >
              ✕
            </button>

            <button
              onClick={() => {
                openLogin();
                handleCloseMenu();
              }}
              className="border-b dark:border-dark-border p-5 flex items-center text-left hover:bg-gray-50 dark:hover:bg-dark-surface"
            >
              Sign In
            </button>

            {MOBILE_MENU_ITEMS.map(({ path, label }) => {
              const navItem = getNavItem(path, label);
              return (
                <MobileMenuItem
                  key={path}
                  to={navItem.to}
                  label={navItem.label}
                  onClick={handleCloseMenu}
                />
              );
            })}

            <div className="border-b dark:border-dark-border p-5 flex flex-col gap-2">
              <span className="hover:underline cursor-pointer">Shipping & Returns</span>
              <span className="hover:underline cursor-pointer">Terms & Conditions</span>
              <span className="hover:underline cursor-pointer">Privacy Policy</span>
            </div>

            <CardMediaSosial className="p-5" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;