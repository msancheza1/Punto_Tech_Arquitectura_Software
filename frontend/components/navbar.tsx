"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  Menu,
  X,
  User,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/combos", label: "Combos" },
  { href: "/garantias", label: "Garantias" },
]

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="font-mono text-lg font-bold tracking-tight text-foreground">
            punto<span className="text-primary">tech</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
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
                className="w-56 bg-secondary text-foreground"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
          >
            <User className="h-4 w-4" />
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-72 bg-card">
              <div className="flex flex-col gap-4 pt-8">
                <Input
                  placeholder="Buscar productos..."
                  className="bg-secondary text-foreground"
                />

                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-md px-4 py-3 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
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
    </header>
  )
}