import { Link } from "react-router-dom";
import { useLanguage } from "@/components/LanguageProvider";

export function Footer() {
    const { language } = useLanguage();

    const translations = {
        en: {
            aboutUs: "About Us",
            aboutText: "Footwear Store is your one-stop shop for all your shoe needs. We offer a wide range of high-quality footwear for every occasion.",
            quickLinks: "Quick Links",
            home: "Home",
            products: "Products",
            about: "About",
            contact: "Contact",
            contactUs: "Contact Us",
            address: "123 Shoe Street, Footwear City, FC 12345",
            email: "Email: info@footwearstore.com",
            phone: "Phone: (123) 456-7890",
            copyright: "© 2023 Footwear Store. All rights reserved."
        },
        es: {
            aboutUs: "Sobre Nosotros",
            aboutText: "Tienda de Calzado es tu destino único para todas tus necesidades de calzado. Ofrecemos una amplia gama de calzado de alta calidad para cada ocasión.",
            quickLinks: "Enlaces Rápidos",
            home: "Inicio",
            products: "Productos",
            about: "Nosotros",
            contact: "Contacto",
            contactUs: "Contáctanos",
            address: "123 Calle Zapato, Ciudad del Calzado, FC 12345",
            email: "Correo: info@footwearstore.com",
            phone: "Teléfono: (123) 456-7890",
            copyright: "© 2023 Tienda de Calzado. Todos los derechos reservados."
        }
    };

    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">{translations[language].aboutUs}</h3>
                        <p className="text-gray-300">{translations[language].aboutText}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">{translations[language].quickLinks}</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-300 hover:text-white">{translations[language].home}</Link></li>
                            <li><Link to="/products" className="text-gray-300 hover:text-white">{translations[language].products}</Link></li>
                            <li><Link to="/about" className="text-gray-300 hover:text-white">{translations[language].about}</Link></li>
                            <li><Link to="/contact" className="text-gray-300 hover:text-white">{translations[language].contact}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">{translations[language].contactUs}</h3>
                        <p className="text-gray-300">{translations[language].address}</p>
                        <p className="text-gray-300">{translations[language].email}</p>
                        <p className="text-gray-300">{translations[language].phone}</p>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
                    <p>{translations[language].copyright}</p>
                </div>
            </div>
        </footer>
    );
}

