import Link from "next/link"
import { Zap } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const footerLinks = {
  Productos: [
    { label: "Celulares", href: "/productos?cat=phones" },
    { label: "Computadores", href: "/productos?cat=laptops" },
    { label: "Bafles", href: "/productos?cat=speakers" },
    { label: "Audifonos", href: "/productos?cat=headphones" },
    { label: "Accesorios", href: "/productos?cat=accessories" },
  ],
  Servicios: [
    { label: "Combos", href: "/combos" },
    { label: "Garantias digitales", href: "/garantias" },
    { label: "Stock inteligente", href: "#" },
    { label: "Recomendaciones", href: "#" },
  ],
  Empresa: [
    { label: "Sobre nosotros", href: "#" },
    { label: "Contacto", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Trabaja con nosotros", href: "#" },
  ],
  Legal: [
    { label: "Terminos y condiciones", href: "#" },
    { label: "Politica de privacidad", href: "#" },
    { label: "Politica de devoluciones", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Punto<span className="text-primary">tech</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Tu tienda de tecnologia con stock inteligente, recomendaciones
              personalizadas y garantias digitales.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-border" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            2026 Puntotech. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Instagram
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Facebook
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              X
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
