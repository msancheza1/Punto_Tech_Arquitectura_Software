"use client"

import { useEffect, useState, useMemo } from "react"
import { Grid3X3, List, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CartProvider } from "@/lib/cart-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { type Product } from "@/lib/data"
import { api } from "@/lib/api"
import { SlidersHorizontal } from "lucide-react"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000000])
  const [sortBy, setSortBy] = useState("featured")

  useEffect(() => {
    let mounted = true
    api
      .getAllProducts()
      .then((data) => {
        if (mounted) setProducts(data)
      })
      .catch(() => {
        if (mounted) setProducts([])
      })
    return () => {
      mounted = false
    }
  }, [])

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Search
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    }

    // Category
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category))
    }

    // Price
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    )

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    return result
  }, [products, search, selectedCategories, priceRange, sortBy])

  function resetFilters() {
    setSearch("")
    setSelectedCategories([])
    setPriceRange([0, 15000000])
    setSortBy("featured")
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Todos los productos
            </h1>
            <p className="mt-1 text-muted-foreground">
              {filteredProducts.length} productos disponibles
            </p>
          </div>

          {/* Search and Sort */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar productos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-secondary pl-9 text-foreground placeholder:text-muted-foreground"
                aria-label="Search products"
              />
            </div>
            <div className="flex items-center gap-3">
              {/* Mobile Filter */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-border text-foreground lg:hidden"
                  >
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filtros
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 bg-card">
                  <div className="pt-6">
                    <ProductFilters
                      selectedCategories={selectedCategories}
                      onCategoryChange={setSelectedCategories}
                      priceRange={priceRange}
                      onPriceChange={setPriceRange}
                      onReset={resetFilters}
                    />
                  </div>
                </SheetContent>
              </Sheet>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-secondary text-foreground">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent className="bg-card text-card-foreground">
                  <SelectItem value="featured">Destacados</SelectItem>
                  <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
                  <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
                  <SelectItem value="rating">Mejor valorados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden w-64 shrink-0 lg:block">
              <div className="sticky top-24 rounded-2xl border border-border bg-card p-5">
                <ProductFilters
                  selectedCategories={selectedCategories}
                  onCategoryChange={setSelectedCategories}
                  priceRange={priceRange}
                  onPriceChange={setPriceRange}
                  onReset={resetFilters}
                />
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-20 text-center">
                  <Grid3X3 className="mb-4 h-12 w-12 text-muted-foreground" />
                  <p className="text-lg font-semibold text-foreground">
                    No se encontraron productos
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Intenta ajustar los filtros o buscar otra cosa
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 border-border text-foreground hover:bg-secondary"
                    onClick={resetFilters}
                  >
                    Limpiar filtros
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}
