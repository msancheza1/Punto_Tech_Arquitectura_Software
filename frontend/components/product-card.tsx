"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { type Product, formatPrice, getStockStatus } from "@/lib/data"

interface ProductCardProps {
  product: Product
}

const categoryLabels: Record<string, string> = {
  phones: "Celulares",
  laptops: "Computadores",
  headphones: "Audifonos",
  speakers: "Bafles",
  accessories: "Accesorios",
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const stockStatus = getStockStatus(product.stock)

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/25">
      {/* Image */}
      <Link href={`/productos/${product.id}`} className="relative aspect-square overflow-hidden bg-secondary">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground text-[11px]">
            {product.badge}
          </Badge>
        )}
        {product.warrantyAvailable && (
          <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            {categoryLabels[product.category] || product.category}
          </p>
          <Link href={`/productos/${product.id}`}>
            <h3 className="mt-1 text-sm font-semibold leading-snug text-foreground transition-colors hover:text-primary">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Specs */}
        {product.specs && (
          <div className="flex flex-wrap gap-1">
            {product.specs.map((spec) => (
              <span
                key={spec}
                className="rounded bg-secondary px-1.5 py-0.5 text-[11px] text-muted-foreground"
              >
                {spec}
              </span>
            ))}
          </div>
        )}

        {/* Rating + Stock */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium text-foreground">
              {product.rating}
            </span>
          </div>
          <span className="text-[11px] text-muted-foreground">
            ({product.reviews})
          </span>
          <span className={`ml-auto text-[11px] font-medium ${stockStatus.color}`}>
            {stockStatus.label}
          </span>
        </div>

        {/* Price + Action */}
        <div className="mt-auto flex items-end justify-between pt-1.5">
          <div>
            {product.originalPrice && (
              <p className="text-[11px] text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
            <p className="text-base font-bold text-foreground">
              {formatPrice(product.price)}
            </p>
          </div>
          <Button
            size="sm"
            className="h-8 bg-primary px-3 text-xs text-primary-foreground hover:bg-primary/90"
            onClick={() => addItem(product)}
            disabled={product.stock === 0}
            aria-label={`Agregar ${product.name} al carrito`}
          >
            <ShoppingCart className="mr-1 h-3.5 w-3.5" />
            Agregar
          </Button>
        </div>
      </div>
    </div>
  )
}
