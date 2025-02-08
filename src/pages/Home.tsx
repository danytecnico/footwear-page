import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/components/LanguageProvider';

export default function Home() {
    const { language } = useLanguage();

    const translations = {
        en: {
            title: "Step into Comfort and Style",
            description: "Discover our collection of premium footwear for every occasion.",
            shopNow: "Shop Now",
            whyChooseUs: "Why Choose Us",
            features: [
                { title: "Quality Materials", description: "We use only the finest materials to ensure comfort and durability." },
                { title: "Wide Selection", description: "Find the perfect pair for any occasion from our extensive collection." },
                { title: "Expert Craftsmanship", description: "Each pair is crafted with care by skilled artisans." }
            ]
        },
        es: {
            title: "Entra en Comodidad y Estilo",
            description: "Descubre nuestra colección de calzado premium para cada ocasión.",
            shopNow: "Comprar Ahora",
            whyChooseUs: "¿Por qué elegirnos?",
            features: [
                { title: "Materiales de Calidad", description: "Usamos solo los mejores materiales para garantizar comodidad y durabilidad." },
                { title: "Amplia Selección", description: "Encuentra el par perfecto para cualquier ocasión en nuestra extensa colección." },
                { title: "Artesanía Experta", description: "Cada par está elaborado con cuidado por artesanos expertos." }
            ]
        }
    };

    return (
        <div
            className="bg-gray-100"
            style={{
                backgroundImage: "url('https://media.discordapp.net/attachments/1327774922591703161/1332353032578662431/muro-hormigon-negro_24972-1046.png?ex=67a80fb4&is=67a6be34&hm=94bdcf119d8dd2084668bafccbe5672987eb96180929ed5bf35f500259c98585&=&format=webp&quality=lossless&width=782&height=521')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
            }}
        >
            <section className="container mx-auto px-4 py-16 bg-white bg-opacity-80 rounded-lg">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            {translations[language].title}
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            {translations[language].description}
                        </p>
                        <Link to="/products">
                            <Button size="lg">{translations[language].shopNow}</Button>
                        </Link>
                    </div>
                    <div className="flex gap-4">
                        <img
                            src="https://static.nike.com/a/images/t_PDP_1728_v1/jh6reovam9b46yxagds3/air-force-1-07-shoe-4hDbSc.jpg"
                            alt="Featured Footwear"
                            width={300}
                            height={300}
                            className="rounded-lg object-contain"
                        />
                        <img
                            src="https://static.nike.com/a/images/t_PDP_1728_v1/g1mvb8eem32rmjnfm4ga/epic-phantom-react-air-cody-hudson-running-shoe-ctX7Zl.jpg"
                            alt="Featured Footwear"
                            width={300}
                            height={300}
                            className="rounded-lg object-contain"
                        />
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 py-16 bg-white bg-opacity-80 rounded-lg mt-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    {translations[language].whyChooseUs}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {translations[language].features.map((item, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                            <p className="text-gray-600">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
