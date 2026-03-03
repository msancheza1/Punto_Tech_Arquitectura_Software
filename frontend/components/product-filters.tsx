"use client"

import { SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { categories } from "@/lib/data"
import { formatPrice } from "@/lib/data"

interface ProductFiltersProps {
  selectedCategories: string[]
  onCategoryChange: (categories: string[]) => void
  priceRange: [number, number]
  onPriceChange: (range: [number, number]) => void
  onReset: () => void
}

export function ProductFilters({
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceChange,
  onReset,
}: ProductFiltersProps) {
  function handleCategoryToggle(catId: string) {
    if (selectedCategories.includes(catId)) {
      onCategoryChange(selectedCategories.filter((c) => c !== catId))
    } else {
      onCategoryChange([...selectedCategories, catId])
    }
  }

  return (
    <aside className="space-y-6" aria-label="Product filters">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Filtros</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-muted-foreground hover:text-foreground"
          onClick={onReset}
        >
          Limpiar
        </Button>
      </div>

      <Separator className="bg-border" />

      {/* Categories */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Categoria</h3>
        <div className="space-y-2.5">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-2.5">
              <Checkbox
                id={`cat-${cat.id}`}
                checked={selectedCategories.includes(cat.id)}
                onCheckedChange={() => handleCategoryToggle(cat.id)}
              />
              <Label
                htmlFor={`cat-${cat.id}`}
                className="flex-1 cursor-pointer text-sm text-muted-foreground"
              >
                {cat.name}
              </Label>
              <span className="text-xs text-muted-foreground">{cat.count}</span>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-border" />

      {/* Price Range */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">
          Rango de precio
        </h3>
        <div className="px-1">
          <Slider
            min={0}
            max={15000000}
            step={100000}
            value={priceRange}
            onValueChange={(val) => onPriceChange(val as [number, number])}
          />
        </div>
        <div className="mt-3 flex justify-between text-xs text-muted-foreground">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>

      <Separator className="bg-border" />

      {/* Stock Filter */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">
          Disponibilidad
        </h3>
        <div className="space-y-2.5">
          <div className="flex items-center gap-2.5">
            <Checkbox id="in-stock" defaultChecked />
            <Label
              htmlFor="in-stock"
              className="cursor-pointer text-sm text-muted-foreground"
            >
              En stock
            </Label>
          </div>
          <div className="flex items-center gap-2.5">
            <Checkbox id="warranty-available" />
            <Label
              htmlFor="warranty-available"
              className="cursor-pointer text-sm text-muted-foreground"
            >
              Con garantia extendida
            </Label>
          </div>
        </div>
      </div>
    </aside>
  )
}
