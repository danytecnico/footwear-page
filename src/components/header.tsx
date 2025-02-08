"use client"

import { ShoppingCart, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCart } from "./cart-provider";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/AuthContext";
import { useLanguage } from "@/components/LanguageProvider"; // Importamos el contexto

export function Header() {
    const { cart } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated } = useAuth();
    const { language, toggleLanguage } = useLanguage(); // Obtenemos idioma y función para cambiarlo

    const translations = {
        en: {
            storeName: "Footwear Store",
            home: "Home",
            products: "Products",
            about: "About",
            contact: "Contact",
            cart: "Cart",
            login: "Login"
        },
        es: {
            storeName: "Tienda de Calzado",
            home: "Inicio",
            products: "Productos",
            about: "Nosotros",
            contact: "Contacto",
            cart: "Carrito",
            login: "Iniciar Sesión"
        }
    };

    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-gray-800">
                    {translations[language].storeName}
                </Link>

                <div className="hidden md:flex items-center space-x-4">
                    <nav>
                        <ul className="flex space-x-4">
                            <li><Link to="/" className="text-gray-600 hover:text-gray-800">{translations[language].home}</Link></li>
                            <li><Link to="/products" className="text-gray-600 hover:text-gray-800">{translations[language].products}</Link></li>
                            <li><Link to="/about" className="text-gray-600 hover:text-gray-800">{translations[language].about}</Link></li>
                            <li><Link to="/contact" className="text-gray-600 hover:text-gray-800">{translations[language].contact}</Link></li>
                        </ul>
                    </nav>

                    <Button variant="outline" size="icon" asChild>
                        <Link to="/cart" className="relative">
                            <ShoppingCart className="h-5 w-5" />
                            {itemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </Link>
                    </Button>

                    <Button variant="default" size="icon" asChild>
                        <Link to={isAuthenticated ? "/account" : "/login"}>
                            <User className="h-5 w-5" />
                        </Link>
                    </Button>

                    {/* Botón para cambiar idioma */}
                    <Button onClick={toggleLanguage} className="ml-4">
                        {language === "en" ? "EN" : "ES"}
                    </Button>
                </div>

                <div className="md:hidden">
                    <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>
            </div>

            {isMenuOpen && (
                <nav className="mt-4 md:hidden">
                    <ul className="flex flex-col space-y-2">
                        <li><Link to="/" className="text-gray-600 hover:text-gray-800">{translations[language].home}</Link></li>
                        <li><Link to="/products" className="text-gray-600 hover:text-gray-800">{translations[language].products}</Link></li>
                        <li><Link to="/about" className="text-gray-600 hover:text-gray-800">{translations[language].about}</Link></li>
                        <li><Link to="/contact" className="text-gray-600 hover:text-gray-800">{translations[language].contact}</Link></li>
                        <li>
                            <Link to="/cart" className="flex items-center text-gray-600 hover:text-gray-800">
                                <ShoppingCart className="h-5 w-5 mr-2" />
                                {translations[language].cart} ({itemCount})
                            </Link>
                        </li>
                        <li><Link to="/login" className="text-gray-600 hover:text-gray-800">{translations[language].login}</Link></li>
                    </ul>
                </nav>
            )}
        </header>
    );
}
