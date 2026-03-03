"use client"

import Link from "next/link"
import {
  Smartphone,
  Laptop,
  Speaker,
  Headphones,
  Cable,
} from "lucide-react"
import { categories } from "@/lib/data"

const iconMap: Record<string, React.ElementType> = {
  smartphone: Smartphone,
  laptop: Laptop,
  speaker: Speaker,
  headphones: Headphones,
  cable: Cable,
}

export function CategoriesSection() {
  return (
    <section className="py-16 lg:py-20" aria-label="Categorias de productos">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10">
          <h2 className="text-balance font-mono text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
            Explora por categoria
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Encuentra lo que necesitas en cada seccion
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Cable
            return (
              <Link
                key={cat.id}
                href={cat.href}
                className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:bg-secondary"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/15">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-foreground">
                    {cat.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {cat.count} productos
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
