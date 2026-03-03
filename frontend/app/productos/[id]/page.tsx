"use client"

import { use } from "react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  ShieldCheck,
  Truck,
  RefreshCw,
  Check,
  Minus,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { CartProvider, useCart } from "@/lib/cart-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { featuredProducts, formatPrice, getStockStatus } from "@/lib/data"

function ProductDetailContent({ id }: { id: string }) {
  const product = featuredProducts.find((p) => p.id === id) || featuredProducts[0]
  const relatedProducts = featuredProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)
  const otherProducts = featuredProducts.filter((p) => p.id !== product.id).slice(0, 3)
  const recommendations = relatedProducts.length > 0 ? relatedProducts : otherProducts

  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [withWarranty, setWithWarranty] = useState(false)
  const stockStatus = getStockStatus(product.stock)

  const warrantyPrice = product.price * 0.1
  const totalPrice = (product.price + (withWarranty ? warrantyPrice : 0)) * quantity

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/productos"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a productos
        </Link>
      </div>

      {/* Product Main */}
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-card">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
          {product.badge && (
            <Badge className="absolute left-4 top-4 bg-primary text-primary-foreground">
              {product.badge}
            </Badge>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              {product.category === "phones"
                ? "Celulares"
                : product.category === "laptops"
                  ? "Computadores"
                  : product.category === "headphones"
                    ? "Audifonos"
                    : product.category === "speakers"
                      ? "Bafles"
                      : "Accesorios"}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">
                {product.rating}
              </span>
              <span className="text-sm text-muted-foreground">
                ({product.reviews} resenas)
              </span>
            </div>
          </div>

          {/* Price */}
          <div>
            {product.originalPrice && (
              <p className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
            <p className="text-3xl font-bold text-foreground">
              {formatPrice(product.price)}
            </p>
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {/* Specs */}
          {product.specs && (
            <div className="flex flex-wrap gap-2">
              {product.specs.map((spec) => (
                <span
                  key={spec}
                  className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm text-foreground"
                >
                  {spec}
                </span>
              ))}
            </div>
          )}

          {/* Stock */}
          <div className="flex items-center gap-2">
            <div
              className={`h-2.5 w-2.5 rounded-full ${
                product.stock > 0 ? "bg-emerald-400" : "bg-destructive"
              }`}
            />
            <span className={`text-sm font-medium ${stockStatus.color}`}>
              {stockStatus.label}
            </span>
            {product.stock > 0 && product.stock <= 15 && (
              <span className="text-xs text-muted-foreground">
                - Solo {product.stock} unidades
              </span>
            )}
          </div>

          <Separator className="bg-border" />

          {/* Warranty Option */}
          {product.warrantyAvailable && (
            <div className="rounded-xl border border-border bg-secondary p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Garantia extendida
                    </p>
                    <p className="text-xs text-muted-foreground">
                      +{formatPrice(warrantyPrice)} por {quantity > 1 ? "unidad" : "producto"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="warranty" className="text-sm text-muted-foreground">
                    {withWarranty ? "Incluida" : "Agregar"}
                  </Label>
                  <Switch
                    id="warranty"
                    checked={withWarranty}
                    onCheckedChange={setWithWarranty}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-lg border border-border">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center text-sm font-medium text-foreground">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10"
                onClick={() =>
                  setQuantity(Math.min(product.stock, quantity + 1))
                }
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button
              size="lg"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => {
                for (let i = 0; i < quantity; i++) {
                  addItem(product, withWarranty)
                }
              }}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Agregar al carrito - {formatPrice(totalPrice)}
            </Button>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Truck, text: "Envio gratis" },
              { icon: RefreshCw, text: "30 dias devolucion" },
              { icon: Check, text: "Garantia oficial" },
            ].map((b) => (
              <div
                key={b.text}
                className="flex flex-col items-center gap-1.5 rounded-lg border border-border bg-card p-3 text-center"
              >
                <b.icon className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="bg-secondary">
            <TabsTrigger value="description">Descripcion</TabsTrigger>
            <TabsTrigger value="specs">Especificaciones</TabsTrigger>
            <TabsTrigger value="warranty">Garantia</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="leading-relaxed text-muted-foreground">
                {product.description} Este producto ha sido seleccionado por nuestros
                expertos por su excelente relacion calidad-precio y las mejores
                valoraciones de nuestros clientes. Incluye todos los accesorios
                originales del fabricante y una guia de inicio rapido.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="specs" className="mt-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="space-y-3">
                {product.specs?.map((spec, i) => (
                  <div
                    key={spec}
                    className="flex items-center justify-between border-b border-border py-2 last:border-0"
                  >
                    <span className="text-sm text-muted-foreground">
                      Caracteristica {i + 1}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {spec}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="warranty" className="mt-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <ShieldCheck className="h-8 w-8 shrink-0 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Garantia extendida digital
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    Agrega la garantia extendida por solo un 10% adicional del
                    valor del producto. Cubre danos accidentales, defectos de
                    fabrica y desgaste prematuro por hasta 3 anos. Gestion
                    completamente digital desde tu cuenta.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {recommendations.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-foreground">
            Tambien te puede interesar
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </main>
  )
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <ProductDetailContent id={id} />
        <Footer />
      </div>
    </CartProvider>
  )
}
