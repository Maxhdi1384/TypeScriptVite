import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

import CartProvider from "./components/CartProvider";
import ToastProvider from "./components/ToastProvider";

import FavoriteProvider from "./components/FavoriteProvider";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <FavoriteProvider>
          <ToastProvider>

            <Navbar onSearch={() => {}} />

            <Routes>
              <Route
                path="/"
                element={<Home />}
              />

              <Route
                path="/products"
                element={<Products />}
              />

              <Route
                path="/products/:id"
                element={<ProductDetails />}
              />

              <Route
                path="/cart"
                element={<Cart />}
              />
            </Routes>

            <Footer />

          </ToastProvider>
        </FavoriteProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;