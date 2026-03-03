"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  User,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/lib/cart-context"
import { CartDrawer } from "./cart-drawer"

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/combos", label: "Combos" },
  { href: "/garantias", label: "Garantias" },
]

export function Navbar() {
  const { totalItems, setIsOpen } = useCart()
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-mono text-lg font-bold tracking-tight text-foreground">
            punto<span className="text-primary">tech</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Navegacion principal">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5">
          {searchOpen ? (
            <div className="hidden items-center gap-2 md:flex">
              <Input
                placeholder="Buscar productos..."
                className="w-56 bg-secondary text-foreground placeholder:text-muted-foreground"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(false)}
                aria-label="Cerrar busqueda"
                className="h-9 w-9 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="hidden h-9 w-9 text-muted-foreground hover:text-foreground md:flex"
              onClick={() => setSearchOpen(true)}
              aria-label="Abrir busqueda"
            >
              <Search className="h-4 w-4" />
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="hidden h-9 w-9 text-muted-foreground hover:text-foreground md:flex"
            aria-label="Cuenta de usuario"
          >
            <User className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9 text-muted-foreground hover:text-foreground"
            onClick={() => setIsOpen(true)}
            aria-label={`Carrito con ${totalItems} items`}
          >
            <ShoppingCart className="h-4 w-4" />
            {totalItems > 0 && (
              <Badge className="absolute -right-0.5 -top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-primary p-0 text-[10px] text-primary-foreground">
                {totalItems}
              </Badge>
            )}
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-muted-foreground hover:text-foreground md:hidden"
                aria-label="Abrir menu"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-card">
              <div className="flex flex-col gap-4 pt-8">
                <Input
                  placeholder="Buscar productos..."
                  className="bg-secondary text-foreground placeholder:text-muted-foreground"
                />
                <nav className="flex flex-col gap-1" aria-label="Navegacion movil">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-md px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <CartDrawer />
    </header>
  )
}
