"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
    });

    const { register } = useAuth();
    const router = useNavigate();

    const [language, setLanguage] = useState<"en" | "es">("en"); // Estado para el idioma

    // Diccionario de traducciones
    const translations = {
        en: {
            register: "Register",
            description: "Create a new account to access the footwear page.",
            username: "Username",
            password: "Password",
            firstName: "First Name",
            lastName: "Last Name",
            email: "Email",
            phone: "Phone",
            address: "Address",
            placeholderUsername: "Choose a username",
            placeholderPassword: "Choose a password",
            placeholderFirstName: "Enter your first name",
            placeholderLastName: "Enter your last name",
            placeholderEmail: "Enter your email",
            placeholderPhone: "Enter your phone number",
            placeholderAddress: "Enter your address",
            buttonRegister: "Register",
            alreadyHaveAccount: "Already have an account?",
            login: "Login",
            changeLanguage: "EN",
        },
        es: {
            register: "Registrarse",
            description: "Crea una nueva cuenta para acceder a la página de calzado.",
            username: "Usuario",
            password: "Contraseña",
            firstName: "Nombre",
            lastName: "Apellido",
            email: "Correo Electrónico",
            phone: "Teléfono",
            address: "Dirección",
            placeholderUsername: "Elige un nombre de usuario",
            placeholderPassword: "Elige una contraseña",
            placeholderFirstName: "Ingresa tu nombre",
            placeholderLastName: "Ingresa tu apellido",
            placeholderEmail: "Ingresa tu correo electrónico",
            placeholderPhone: "Ingresa tu número de teléfono",
            placeholderAddress: "Ingresa tu dirección",
            buttonRegister: "Registrarse",
            alreadyHaveAccount: "¿Ya tienes una cuenta?",
            login: "Iniciar sesión",
            changeLanguage: "ES",
        },
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        register(formData);
        router("/login");
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-gray-100 relative"
            style={{
                backgroundImage: "url('https://media.discordapp.net/attachments/1327774922591703161/1337662011944996884/fondos-artisticos-6oahrpaq8z5pto1a.png?ex=67a84254&is=67a6f0d4&hm=55381d14184bfd4d9ab24e95f726024e3362832c3753f533ff2c3085e38a274f&=&format=webp&quality=lossless&width=1177&height=662')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Botón de cambio de idioma en la parte superior derecha */}
            <div className="absolute top-4 right-4">
                <Button onClick={() => setLanguage(language === "en" ? "es" : "en")}>
                    {translations[language].changeLanguage}
                </Button>
            </div>

            <Card className="w-[450px] bg-white bg-opacity-80 backdrop-blur-lg shadow-lg">
                <CardHeader>
                    <CardTitle>{translations[language].register}</CardTitle>
                    <CardDescription>{translations[language].description}</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="username">{translations[language].username}</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    placeholder={translations[language].placeholderUsername}
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">{translations[language].password}</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder={translations[language].placeholderPassword}
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="firstName">{translations[language].firstName}</Label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    placeholder={translations[language].placeholderFirstName}
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="lastName">{translations[language].lastName}</Label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    placeholder={translations[language].placeholderLastName}
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">{translations[language].email}</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder={translations[language].placeholderEmail}
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="phone">{translations[language].phone}</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder={translations[language].placeholderPhone}
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="address">{translations[language].address}</Label>
                                <Input
                                    id="address"
                                    name="address"
                                    placeholder={translations[language].placeholderAddress}
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-2">
                        <Button type="submit" className="w-full">
                            {translations[language].buttonRegister}
                        </Button>
                        <div className="text-sm text-center">
                            {translations[language].alreadyHaveAccount}{" "}
                            <Link to="/login" className="text-blue-500 hover:underline">
                                {translations[language].login}
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
