"use client"

import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/components/LanguageProvider"; // Importamos el contexto de idioma

export default function Cart() {
    const { cart, addToCart, removeFromCart, clearCart } = useCart();
    const { language } = useLanguage(); // Obtenemos el idioma actual
    const router = useNavigate();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Traducciones para los textos del carrito
    const translations = {
        en: {
            title: "Your Cart",
            empty: "Your cart is empty.",
            continueShopping: "Continue Shopping",
            total: "Total",
            clearCart: "Clear Cart",
            checkout: "Proceed to Checkout",
        },
        es: {
            title: "Tu Carrito",
            empty: "Tu carrito está vacío.",
            continueShopping: "Seguir Comprando",
            total: "Total",
            clearCart: "Vaciar Carrito",
            checkout: "Ir a Pagar",
        }
    };

    return (
        <div
            className="min-h-screen bg-gray-100"
            style={{
                backgroundImage: "url('https://media.discordapp.net/attachments/1327774922591703161/1332353032578662431/muro-hormigon-negro_24972-1046.png?ex=67a80fb4&is=67a6be34&hm=94bdcf119d8dd2084668bafccbe5672987eb96180929ed5bf35f500259c98585&=&format=webp&quality=lossless&width=782&height=521')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    {translations[language].title}
                </h1>
                {cart.length === 0 ? (
                    <div className="text-center">
                        <p className="text-gray-600 mb-4">{translations[language].empty}</p>
                        <Link to="/products">
                            <Button>{translations[language].continueShopping}</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white bg-opacity-90 rounded-lg shadow-md p-6">
                        <ul className="divide-y divide-gray-200">
                            {cart.map((item) => (
                                <li key={item.id} className="py-4 flex items-center">
                                    <img
                                        src={item.image || "/placeholder.svg"}
                                        alt={item.title}
                                        width={80}
                                        height={80}
                                        className="rounded-md mr-4"
                                    />
                                    <div className="flex-grow">
                                        <h3 className="text-lg font-semibold">{item.title}</h3>
                                        <p className="text-gray-600">
                                            {new Intl.NumberFormat(undefined, {
                                                style: "currency",
                                                currency: "USD",
                                            }).format(item.price / 100)}{" "}
                                            x {item.quantity}
                                        </p>
                                    </div>
                                    <div className="flex items-center">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            -
                                        </Button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => addToCart(item)}
                                        >
                                            +
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="ml-4"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            <Trash2 className="h-5 w-5 text-red-500" />
                                        </Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
                            <p className="text-xl font-semibold mb-4 sm:mb-0">
                                {translations[language].total}:{" "}
                                {new Intl.NumberFormat(undefined, {
                                    style: "currency",
                                    currency: "USD",
                                }).format(total / 100)}
                            </p>
                            <div className="flex space-x-4">
                                <Button variant="outline" onClick={clearCart}>
                                    {translations[language].clearCart}
                                </Button>
                                <Button onClick={() => router("/checkout")}>
                                    {translations[language].checkout}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

