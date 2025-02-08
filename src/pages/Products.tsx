import { useCart } from "@/components/cart-provider";
import { StarRating } from "@/components/rating";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import getProducts from "@/lib/api";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider"; // Importamos el contexto de idioma

interface Product {
    id: number;
    title: string;
    price: number;
    image?: string;
    category: string;
    rating: number;
}

export default function Products() {
    const { addToCart } = useCart();
    const [products, setProducts] = useState<Product[]>([]);
    const [sortBy, setSortBy] = useState("title");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const { language } = useLanguage(); // Obtenemos el idioma actual

    const translations = {
        en: {
            title: "Our Products",
            selectCategory: "Select category",
            sortBy: "Sort by",
            name: "Name",
            priceAsc: "Price: Low to High",
            priceDesc: "Price: High to Low",
            addToCart: "Add to Cart",
            added: "Added",
            cart: "Cart",
            currency: "USD",
        },
        es: {
            title: "Nuestros Productos",
            selectCategory: "Seleccionar categoría",
            sortBy: "Ordenar por",
            name: "Nombre",
            priceAsc: "Precio: Menor a Mayor",
            priceDesc: "Precio: Mayor a Menor",
            addToCart: "Añadir al Carrito",
            added: "Añadido",
            cart: "Carrito",
            currency: "USD",
        }
    };

    const t = translations[language]; // Accedemos a las traducciones según el idioma actual

    const categories = ["All", ...new Set(products.map((product) => product.category))];

    const filteredProducts = products
        .filter((product) => selectedCategory === "All" || product.category === selectedCategory)
        .sort((a, b) => {
            if (sortBy === "name") return a.title.localeCompare(b.title);
            if (sortBy === "price_asc") return a.price - b.price;
            if (sortBy === "price_desc") return b.price - a.price;
            return 0;
        });

    useEffect(() => {
        getProducts().then((data) => {
            setProducts(data);
        });
    }, []);

    const handleAddToCart = (product: Product) => {
        setAddedToCart((prev) => ({ ...prev, [product.id]: true }));
        addToCart(product);
    };

    const [addedToCart, setAddedToCart] = useState<Record<number, boolean>>({});

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
                <h1 className="text-3xl font-bold text-gray-800 mb-6">{t.title}</h1>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                    <div className="mb-4 sm:mb-0">
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={t.selectCategory} />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={t.sortBy} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="name">{t.name}</SelectItem>
                                <SelectItem value="price_asc">{t.priceAsc}</SelectItem>
                                <SelectItem value="price_desc">{t.priceDesc}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.title}
                                width={300}
                                height={300}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="flex text-xl font-semibold text-gray-800">{product.title}</h2>
                                <p className="text-gray-600 mt-2">
                                    {new Intl.NumberFormat(undefined, { style: "currency", currency: t.currency }).format(product.price / 100)}
                                </p>
                                <StarRating rating={product.rating} />
                                <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                                <Button
                                    className={`mt-4 w-full transition duration-200 ease-in-out hover:scale-105 ${
                                        addedToCart[product.id] ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 hover:bg-gray-600"
                                    }`}
                                    onClick={() => handleAddToCart(product)}
                                    disabled={addedToCart[product.id]}
                                >
                                    {addedToCart[product.id] ? <Check className="h-4 w-4" /> : t.addToCart}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

