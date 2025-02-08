"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";
import { getUser } from "@/lib/api";
import { CreditCard } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/components/LanguageProvider"; // Importamos el contexto de idioma

// Definimos los tipos para mayor seguridad
type PaymentMethod = {
  id: string;
  number: string;
};

export function PaymentSummary() {
    const { language } = useLanguage(); // Obtenemos el idioma actual
    const [payments, setPayments] = useState<PaymentMethod[]>([]);
    const [user, setUser] = useState<string | null>(null);

    const { cart } = useCart();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    useEffect(() => {
        const storedUser = localStorage.getItem("user_id");
        if (storedUser) {
            setUser(storedUser);
            getUser(storedUser).then((r) => {
                setPayments(r.paymentMethods || []);
            });
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Payment submitted");
    };

    // Traducciones
    const translations = {
        en: {
            orderSummary: "Order Summary",
            total: "Total",
            selectPayment: "Select a payment method",
            registeredCards: "Registered cards",
            noPayments: "No payments found.",
            pay: "Pay"
        },
        es: {
            orderSummary: "Resumen del Pedido",
            total: "Total",
            selectPayment: "Selecciona un método de pago",
            registeredCards: "Tarjetas registradas",
            noPayments: "No se encontraron métodos de pago.",
            pay: "Pagar"
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto my-24">
            <CardHeader>
                <CardTitle>{translations[language].orderSummary}</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    {cart.map((item, index) => (
                        <li key={index} className="flex justify-between">
                            <span>{item.title}</span>
                            <span>
                                {new Intl.NumberFormat(language === "en" ? "en-US" : "es-ES", {
                                    style: "currency",
                                    currency: "USD",
                                }).format(item.price / 100)}
                            </span>
                        </li>
                    ))}
                </ul>
                <div className="mt-4 pt-4 border-t flex justify-between font-bold">
                    <span>{translations[language].total}</span>
                    <span>
                        {new Intl.NumberFormat(language === "en" ? "en-US" : "es-ES", {
                            style: "currency",
                            currency: "USD",
                        }).format(total / 100)}
                    </span>
                </div>
            </CardContent>
            <CardFooter>
                <form onSubmit={handleSubmit} className="w-full space-y-4">
                    <div className="space-y-2">
                        {payments.length > 0 ? (
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={translations[language].selectPayment} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>{translations[language].registeredCards}</SelectLabel>
                                        {payments.map((payment) => (
                                            <SelectItem key={payment.id} value={payment.number}>
                                                <div className="flex items-center">
                                                    <CreditCard className="mr-2" />
                                                    {`•••• ${payment.number.slice(-4)}`}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        ) : (
                            <p>{translations[language].noPayments}</p>
                        )}
                    </div>
                    <Button type="submit" className="w-full">
                        {translations[language].pay}{" "}
                        {new Intl.NumberFormat(language === "en" ? "en-US" : "es-ES", {
                            style: "currency",
                            currency: "USD",
                        }).format(total / 100)}
                    </Button>
                </form>
            </CardFooter>
        </Card>
    );
}