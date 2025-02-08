"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/AuthContext";
import { useNavigate } from "react-router-dom";
import { Alert } from "@/components/ui/alert";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const { login } = useAuth();
    const router = useNavigate();
    const [language, setLanguage] = useState<"en" | "es">("en");

    const translations = {
        en: {
            loginTitle: "Login",
            loginDescription: "Enter your credentials to access the footwear page.",
            email: "Email",
            emailPlaceholder: "Enter your email",
            password: "Password",
            passwordPlaceholder: "Enter your password",
            loginButton: "Login",
            register: "Register",
            errorMessage: "Invalid credentials. Please try again.",
            switchLanguage: "EN",
        },
        es: {
            loginTitle: "Iniciar Sesión",
            loginDescription: "Ingresa tus credenciales para acceder a la página de calzado.",
            email: "Correo Electrónico",
            emailPlaceholder: "Ingresa tu correo",
            password: "Contraseña",
            passwordPlaceholder: "Ingresa tu contraseña",
            loginButton: "Iniciar Sesión",
            register: "Registrarse",
            errorMessage: "Credenciales inválidas. Inténtalo de nuevo.",
            switchLanguage: "ES",
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setError(false);
            login(username, password);
            router("/"); // Redirige al Home después de iniciar sesión exitosamente
        } catch (error) {
            console.error(error);
            setError(true);
        }
    };

    return (
        <div 
            className="flex items-center flex-col justify-center min-h-screen bg-gray-100"
            style={{ backgroundImage: "url('https://media.discordapp.net/attachments/1327774922591703161/1337662011944996884/fondos-artisticos-6oahrpaq8z5pto1a.png?ex=67a84254&is=67a6f0d4&hm=55381d14184bfd4d9ab24e95f726024e3362832c3753f533ff2c3085e38a274f&=&format=webp&quality=lossless&width=687&height=386')", backgroundSize: "cover", backgroundPosition: "center" }}>

            {/* Botón para cambiar de idioma */}
            <Button onClick={() => setLanguage(language === "en" ? "es" : "en")} className="absolute top-5 right-5">
                {translations[language].switchLanguage}
            </Button>

            <Card className="w-[350px] bg-white bg-opacity-75 backdrop-blur-lg shadow-lg">
                <CardHeader>
                    <CardTitle>{translations[language].loginTitle}</CardTitle>
                    <CardDescription>{translations[language].loginDescription}</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            {error && <Alert variant="destructive">{translations[language].errorMessage}</Alert>}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">{translations[language].email}</Label>
                                <Input
                                    id="email"
                                    placeholder={translations[language].emailPlaceholder}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">{translations[language].password}</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder={translations[language].passwordPlaceholder}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">
                            {translations[language].loginButton}
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            <Button onClick={() => router("/register")} variant="link" className="m-5 w-48">
                {translations[language].register}
            </Button>
        </div>
    );
}

