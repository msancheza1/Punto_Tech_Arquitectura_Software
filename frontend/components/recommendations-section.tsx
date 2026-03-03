"use client"

import { Sparkles } from "lucide-react"
import { ProductCard } from "./product-card"
import { featuredProducts } from "@/lib/data"

export function RecommendationsSection() {
  const recommended = featuredProducts.slice(0, 3)

  return (
    <section className="py-16 lg:py-20" aria-label="Recomendaciones inteligentes">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/8 px-3 py-1">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium tracking-wide text-primary">
              Recomendado para ti
            </span>
          </div>
          <h2 className="text-balance font-mono text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
            Recomendaciones inteligentes
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Basado en tendencias y preferencias de usuarios similares
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
