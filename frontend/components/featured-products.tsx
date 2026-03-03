"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "./product-card"
import { featuredProducts } from "@/lib/data"

export function FeaturedProducts() {
  return (
    <section className="py-16 lg:py-20" aria-label="Productos destacados">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-balance font-mono text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
              Productos destacados
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Seleccionados por nuestros expertos para ti
            </p>
          </div>
          <Button
            asChild
            variant="ghost"
            className="hidden text-sm text-primary hover:text-primary/80 md:flex"
          >
            <Link href="/productos">
              Ver todos
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <Button asChild variant="outline" className="border-border text-foreground hover:bg-secondary">
            <Link href="/productos">
              Ver todos los productos
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
