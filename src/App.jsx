import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import AboutUsPage from "./pages/AboutUs";
import Aos from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
import ShopProducts from "./pages/shopProducts";
import Subcription from "./pages/Subscribe";
import CategoryPage from "./pages/shopProducts/Category";

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
          <Route index element={<Landing />} />
        </Route>
        <Route path="/shop/:name" element={<CategoryPage />} />
        <Route path="/shop" element={<ShopProducts />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/subcribe-now" element={<Subcription />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
