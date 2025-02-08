import { useLanguage } from "@/components/LanguageProvider";

export default function About() {
    const { language } = useLanguage();

    const translations = {
        en: {
            title: "About Us",
            intro: "Welcome to Footwear Store, your one-stop shop for all your footwear needs. We are passionate about providing our customers with the best quality shoes that combine style, comfort, and durability.",
            history: "Founded in 2010, we have grown from a small local shop to a nationwide online retailer. Our mission is to help you put your best foot forward, whether you're running a marathon, hiking a trail, or attending a formal event.",
            commitment: "We pride ourselves on our wide selection of shoes from top brands, excellent customer service, and our commitment to helping you find the perfect fit. Our team of experienced professionals is always ready to assist you in making the right choice for your feet.",
            thanks: "Thank you for choosing Footwear Store. We look forward to serving you and being a part of your journey, one step at a time."
        },
        es: {
            title: "Sobre Nosotros",
            intro: "Bienvenido a Tienda de Calzado, tu tienda única para todas tus necesidades de calzado. Nos apasiona ofrecer a nuestros clientes zapatos de la mejor calidad que combinan estilo, comodidad y durabilidad.",
            history: "Fundada en 2010, hemos crecido de una pequeña tienda local a un minorista en línea a nivel nacional. Nuestra misión es ayudarte a dar lo mejor de ti, ya sea corriendo un maratón, explorando un sendero o asistiendo a un evento formal.",
            commitment: "Nos enorgullecemos de nuestra amplia selección de zapatos de las mejores marcas, un excelente servicio al cliente y nuestro compromiso de ayudarte a encontrar el ajuste perfecto. Nuestro equipo de profesionales experimentados está siempre listo para ayudarte a tomar la mejor decisión para tus pies.",
            thanks: "Gracias por elegir Tienda de Calzado. Esperamos poder servirte y ser parte de tu viaje, paso a paso."
        }
    };

    return (
        <div 
            className="min-h-screen bg-gray-100 bg-cover bg-center" 
            style={{ backgroundImage: "url('https://media.discordapp.net/attachments/1327774922591703161/1332353032578662431/muro-hormigon-negro_24972-1046.png?ex=67a80fb4&is=67a6be34&hm=94bdcf119d8dd2084668bafccbe5672987eb96180929ed5bf35f500259c98585&=&format=webp&quality=lossless&width=782&height=521')" }}
        >
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">{translations[language].title}</h1>
                <div className="bg-white bg-opacity-90 rounded-lg shadow-md p-6">
                    <p className="text-gray-600 mb-4">{translations[language].intro}</p>
                    <p className="text-gray-600 mb-4">{translations[language].history}</p>
                    <p className="text-gray-600 mb-4">{translations[language].commitment}</p>
                    <p className="text-gray-600">{translations[language].thanks}</p>
                </div>
            </main>
        </div>
    );
}
