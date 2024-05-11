import { Button } from "./components/atoms/Button";
import { InputDate, InputText } from "./components/atoms/Input";
import Banner from "./components/templates/Banner";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Landing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
