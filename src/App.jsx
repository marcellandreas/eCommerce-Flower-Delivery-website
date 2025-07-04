import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AboutPage,
  CategoryProductsPage,
  CheckOutPage,
  ContactPage,
  LandingPage,
  ShopProductsPage,
  SubscribePage,
} from "./pages";

const App = () => {
  useEffect(() => {
    Aos.init({
      duration: 800, // Durasi animasi dalam milidetik
      easing: "ease-in-out", // Jenis easing (e.g., 'ease', 'linear', 'ease-in-out', 'ease-in', 'ease-out')
      once: true, // Animasi hanya terjadi sekali saat halaman dimuat
    });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<LandingPage />} />
        </Route>
        <Route path="/shop/:name" element={<CategoryProductsPage />} />
        <Route path="/shop" element={<ShopProductsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/subcribe-now" element={<SubscribePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/check-out" element={<CheckOutPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
