import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/product-list";
import ShoppingCart from "./pages/shopping-cart";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<ShoppingCart />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
