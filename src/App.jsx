import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Category from "./pages/shopProducts/Category";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Landing />} />
        </Route>
        <Route path="/shop" element={<Category />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
