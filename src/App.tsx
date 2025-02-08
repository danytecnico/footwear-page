import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Products from "./pages/Products"
import Contact from "./pages/Contact"
import Cart from "./pages/Cart"
import LoginPage from "./pages/Login"
import RegisterPage from "./pages/Register"
import Account from "./pages/Account"
import { PaymentSummary } from "./pages/PaymentSummary"

import { Header } from "./components/header"
import { Footer } from "./components/footer"

import { CartProvider } from "./components/cart-provider"
import { AuthProvider } from "./hooks/AuthContext"
import { LanguageProvider } from "./components/LanguageProvider"

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

function App() {
  return (
    <LanguageProvider> {/* Proveedor de idioma envuelve toda la app */}
      <CartProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/products" element={<Layout><Products /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/cart" element={<Layout><Cart /></Layout>} />
            <Route path="/checkout" element={<Layout><PaymentSummary /></Layout>} />
            <Route path="/account" element={<Layout><Account /></Layout>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </AuthProvider>
      </CartProvider>
    </LanguageProvider>
  )
}

export default App
