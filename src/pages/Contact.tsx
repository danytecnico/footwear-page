import { useLanguage } from "@/components/LanguageProvider";

export default function Contact() {
    const { language } = useLanguage();

    const translations = {
        en: {
            title: "Contact Us",
            name: "Name",
            email: "Email",
            message: "Message",
            send: "Send Message"
        },
        es: {
            title: "Contáctanos",
            name: "Nombre",
            email: "Correo Electrónico",
            message: "Mensaje",
            send: "Enviar Mensaje"
        }
    };

    return (
        <div
            className="min-h-screen bg-gray-100"
            style={{
                backgroundImage: 'url("https://media.discordapp.net/attachments/1327774922591703161/1332353032578662431/muro-hormigon-negro_24972-1046.png?ex=67a80fb4&is=67a6be34&hm=94bdcf119d8dd2084668bafccbe5672987eb96180929ed5bf35f500259c98585&=&format=webp&quality=lossless&width=782&height=521")',
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
        >
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    {translations[language].title}
                </h1>
                <div className="bg-white bg-opacity-90 rounded-lg shadow-md p-6">
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                {translations[language].name}
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                {translations[language].email}
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                {translations[language].message}
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            ></textarea>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                            >
                                {translations[language].send}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
