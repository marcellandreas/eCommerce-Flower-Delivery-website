// import aos for animation
import Aos from "aos";
import "aos/dist/aos.css";

// import react dependencies
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// import components
import UserSync from "./components/auth/UserSync";
import { ThemeProvider } from "./context/ThemeContext";

// lazy load pages for admin
const Dashboard = lazy(() => import("./pages/Admin/Dashboard"));
const Categories = lazy(() => import("./pages/Admin/Categories"));
const AdminLayout = lazy(() => import("./components/organisms/Layout/AdminLayout"));
const Products = lazy(() => import("./pages/Admin/Products"));
const Users = lazy(() => import("./pages/Admin/Users"));
const Orders = lazy(() => import("./pages/Admin/Orders"));
const Carts = lazy(() => import("./pages/Admin/Carts"));
const ExampleProducts = lazy(() => import("./pages/ExampleProducts"));


// Lazy load pages for user
const LandingPage = lazy(() => import("./pages/Landing"));
const CategoryProductsPage = lazy(() => import("./pages/shopProducts/Category"));
const ShopProductsPage = lazy(() => import("./pages/shopProducts"));
const AboutPage = lazy(() => import("./pages/AboutUs"));
const SubscribePage = lazy(() => import("./pages/Subscribe"));
const ContactPage = lazy(() => import("./pages/Contact"));
const CheckOutPage = lazy(() => import("./pages/CheckOut"));
const SignInPage = lazy(() => import("./pages/auth/SignInPage"));
const SignUpPage = lazy(() => import("./pages/auth/SignUpPage"));

// AOS Configuration
const AOS_CONFIG = {
  duration: 800,
  easing: "ease-in-out",
  once: true,
  offset: 100,
};

// Loading Component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300">
    <div className="flex flex-col items-center gap-4">
      <div className="w-16 h-16 border-4 border-black dark:border-white border-t-transparent rounded-full animate-spin" />
      <p className="text-gray-600 dark:text-dark-textSecondary">Loading...</p>
    </div>
  </div>
);

const App = () => {
  // Initialize AOS
  useEffect(() => {
    Aos.init(AOS_CONFIG);

    // Refresh AOS on route change
    return () => {
      Aos.refresh();
    };
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <UserSync />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* not found */}
            <Route path="*" element={<Navigate to="/" replace />} />

            {/* Home */}
            <Route path="/" element={<LandingPage />} />

            {/* Shop Routes */}
            <Route path="/shop">
              <Route index element={<ShopProductsPage />} />
              <Route path=":name" element={<CategoryProductsPage />} />
            </Route>

            {/* Other Pages */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/subcribe-now" element={<SubscribePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/check-out" element={<CheckOutPage />} />
            <Route path="/check-out" element={<CheckOutPage />} />
            <Route path="/example-products" element={<ExampleProducts />} />

            {/* Auth Routes */}
            <Route path="/sign-in/*" element={<SignInPage />} />
            <Route path="/sign-up/*" element={<SignUpPage />} />

            {/* 404 - Redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />

            {/* Admin Routes */}
            <Route path="/admin/*" element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="categories" element={<Categories />} />
              <Route path="users" element={<Users />} />
              <Route path="orders" element={<Orders />} />
              <Route path="products" element={<Products />} />
              <Route path="carts" element={<Carts />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;