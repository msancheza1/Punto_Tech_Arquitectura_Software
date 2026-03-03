export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  image: string
  stock: number
  rating: number
  reviews: number
  badge?: string
  specs?: string[]
  warrantyAvailable: boolean
}

export interface Combo {
  id: string
  name: string
  description: string
  products: string[]
  price: number
  originalPrice: number
  image: string
  savings: number
}

export interface Category {
  id: string
  name: string
  icon: string
  count: number
  href: string
}

export const categories: Category[] = [
  { id: "phones", name: "Celulares", icon: "smartphone", count: 128, href: "/productos?cat=phones" },
  { id: "laptops", name: "Computadores", icon: "laptop", count: 85, href: "/productos?cat=laptops" },
  { id: "speakers", name: "Bafles", icon: "speaker", count: 64, href: "/productos?cat=speakers" },
  { id: "headphones", name: "Audifonos", icon: "headphones", count: 96, href: "/productos?cat=headphones" },
  { id: "accessories", name: "Accesorios", icon: "cable", count: 210, href: "/productos?cat=accessories" },
]

export const featuredProducts: Product[] = [
  {
    id: "1",
    name: "iPhone 16 Pro Max",
    description: "El smartphone mas avanzado con chip A18 Pro y sistema de camaras revolucionario.",
    price: 5499000,
    originalPrice: 5999000,
    category: "phones",
    image: "/images/product-phone.jpg",
    stock: 12,
    rating: 4.9,
    reviews: 234,
    badge: "Mas vendido",
    specs: ["256GB", "Titanio Natural", "Super Retina XDR"],
    warrantyAvailable: true,
  },
  {
    id: "2",
    name: "MacBook Pro 16\" M4 Pro",
    description: "Potencia profesional con el chip M4 Pro, pantalla Liquid Retina XDR.",
    price: 12999000,
    originalPrice: 13999000,
    category: "laptops",
    image: "/images/product-laptop.jpg",
    stock: 5,
    rating: 4.8,
    reviews: 156,
    badge: "Nuevo",
    specs: ["512GB SSD", "18GB RAM", "18h bateria"],
    warrantyAvailable: true,
  },
  {
    id: "3",
    name: "Sony WH-1000XM5",
    description: "Cancelacion de ruido lider en la industria con sonido excepcional.",
    price: 1599000,
    originalPrice: 1899000,
    category: "headphones",
    image: "/images/product-headphones.jpg",
    stock: 28,
    rating: 4.7,
    reviews: 412,
    badge: "-16%",
    specs: ["30h bateria", "Bluetooth 5.3", "LDAC"],
    warrantyAvailable: true,
  },
  {
    id: "4",
    name: "JBL Boombox 3",
    description: "Sonido potente y profundo con IP67, ideal para cualquier aventura.",
    price: 2299000,
    category: "speakers",
    image: "/images/product-speaker.jpg",
    stock: 15,
    rating: 4.6,
    reviews: 189,
    specs: ["24h bateria", "IP67", "PartyBoost"],
    warrantyAvailable: true,
  },
  {
    id: "5",
    name: "Samsung Galaxy S25 Ultra",
    description: "Productividad y creatividad con S Pen integrado y Galaxy AI.",
    price: 5199000,
    originalPrice: 5699000,
    category: "phones",
    image: "/images/product-phone.jpg",
    stock: 8,
    rating: 4.8,
    reviews: 198,
    badge: "Galaxy AI",
    specs: ["256GB", "Titanio", "200MP Camara"],
    warrantyAvailable: true,
  },
  {
    id: "6",
    name: "Kit Carga Rapida USB-C",
    description: "Cargador 65W GaN + cable trenzado USB-C de 2m. Compatible con todo.",
    price: 189000,
    originalPrice: 249000,
    category: "accessories",
    image: "/images/product-accessories.jpg",
    stock: 142,
    rating: 4.5,
    reviews: 567,
    badge: "-24%",
    specs: ["65W GaN", "USB-C", "Cable 2m"],
    warrantyAvailable: false,
  },
]

export const combos: Combo[] = [
  {
    id: "combo-1",
    name: "Combo Productividad Pro",
    description: "MacBook Pro + Audifonos Sony + Cargador 65W. Todo lo que necesitas para trabajar.",
    products: ["MacBook Pro 16\"", "Sony WH-1000XM5", "Cargador GaN 65W"],
    price: 14499000,
    originalPrice: 16497000,
    image: "/images/combo-tech.jpg",
    savings: 1998000,
  },
  {
    id: "combo-2",
    name: "Combo Gaming Mobile",
    description: "Samsung Galaxy S25 Ultra + JBL Boombox 3 + Accesorios gaming.",
    products: ["Samsung Galaxy S25 Ultra", "JBL Boombox 3", "Kit Gaming Mobile"],
    price: 7199000,
    originalPrice: 8197000,
    image: "/images/combo-tech.jpg",
    savings: 998000,
  },
  {
    id: "combo-3",
    name: "Combo Estudiante",
    description: "iPhone 16 Pro Max + Audifonos + Kit de carga. Ideal para el estudio.",
    products: ["iPhone 16 Pro Max", "Sony WH-1000XM5", "Kit Carga Rapida"],
    price: 6899000,
    originalPrice: 7747000,
    image: "/images/combo-tech.jpg",
    savings: 848000,
  },
]

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function getStockStatus(stock: number): {
  label: string
  color: string
} {
  if (stock === 0) return { label: "Agotado", color: "text-destructive" }
  if (stock <= 5) return { label: `Quedan ${stock}`, color: "text-orange-400" }
  if (stock <= 15) return { label: "Stock limitado", color: "text-yellow-400" }
  return { label: "Disponible", color: "text-emerald-400" }
}
