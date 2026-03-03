"use client"

import Image from "next/image"
import { Package, Tag, ShoppingCart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CartProvider } from "@/lib/cart-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { combos, formatPrice } from "@/lib/data"

export default function CombosPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1">
              <Package className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Combos exclusivos
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Combos tecnologicos
            </h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Ahorra comprando productos que se complementan perfectamente. Todos
              nuestros combos incluyen envio gratis y garantia en cada producto.
            </p>
          </div>

          {/* Combos Grid */}
          <div className="grid gap-8">
            {combos.map((combo, index) => (
              <div
                key={combo.id}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div
                  className={`grid gap-0 lg:grid-cols-2 ${
                    index % 2 !== 0 ? "lg:direction-rtl" : ""
                  }`}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] lg:aspect-auto">
                    <Image
                      src={combo.image}
                      alt={combo.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/30 lg:bg-gradient-to-t" />
                    <Badge className="absolute left-4 top-4 bg-emerald-500/90 text-card-foreground">
                      <Tag className="mr-1 h-3 w-3" />
                      Ahorra {formatPrice(combo.savings)}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center gap-6 p-6 lg:p-10">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">
                        {combo.name}
                      </h2>
                      <p className="mt-2 leading-relaxed text-muted-foreground">
                        {combo.description}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-muted-foreground">
                        Incluye:
                      </p>
                      {combo.products.map((p) => (
                        <div key={p} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm text-foreground">{p}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground line-through">
                          {formatPrice(combo.originalPrice)}
                        </p>
                        <p className="text-3xl font-bold text-foreground">
                          {formatPrice(combo.price)}
                        </p>
                      </div>
                      <Button
                        size="lg"
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Agregar combo
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}
