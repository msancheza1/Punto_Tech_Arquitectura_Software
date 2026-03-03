"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Package, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { combos, formatPrice } from "@/lib/data"

export function CombosSection() {
  return (
    <section className="border-y border-border bg-card/30 py-16 lg:py-20" aria-label="Combos tecnologicos">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/8 px-3 py-1">
              <Package className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium tracking-wide text-primary">
                Combos exclusivos
              </span>
            </div>
            <h2 className="text-balance font-mono text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
              Combos tecnologicos
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Ahorra mas comprando en combo. Productos que se complementan.
            </p>
          </div>
          <Button
            asChild
            variant="ghost"
            className="hidden text-sm text-primary hover:text-primary/80 md:flex"
          >
            <Link href="/combos">
              Ver todos
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {combos.map((combo) => (
            <div
              key={combo.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/25"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                <Image
                  src={combo.image}
                  alt={combo.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <Badge className="absolute left-3 top-3 bg-emerald-500/90 text-foreground text-[11px]">
                  <Tag className="mr-1 h-3 w-3" />
                  Ahorra {formatPrice(combo.savings)}
                </Badge>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="font-mono text-base font-bold text-foreground">
                  {combo.name}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {combo.description}
                </p>
                <div className="flex flex-col gap-1.5">
                  {combo.products.map((p) => (
                    <div key={p} className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-primary" />
                      <span className="text-sm text-muted-foreground">{p}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-auto flex items-end justify-between pt-3">
                  <div>
                    <p className="text-xs text-muted-foreground line-through">
                      {formatPrice(combo.originalPrice)}
                    </p>
                    <p className="text-xl font-bold text-foreground">
                      {formatPrice(combo.price)}
                    </p>
                  </div>
                  <Button className="h-9 bg-primary px-4 text-xs text-primary-foreground hover:bg-primary/90">
                    Agregar combo
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
