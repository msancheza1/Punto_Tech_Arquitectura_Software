"use client"

import { Activity, BarChart3, TrendingUp, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { featuredProducts, getStockStatus } from "@/lib/data"

const stats = [
  { label: "Productos activos", value: "583", icon: BarChart3 },
  { label: "Disponibilidad", value: "99.2%", icon: TrendingUp },
  { label: "Alertas stock", value: "3", icon: AlertTriangle },
]

export function SmartStockSection() {
  return (
    <section className="py-16 lg:py-20" aria-label="Sistema de stock inteligente">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left */}
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/8 px-3 py-1">
              <Activity className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium tracking-wide text-primary">
                Stock inteligente
              </span>
            </div>
            <h2 className="text-balance font-mono text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
              Control de inventario en tiempo real
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
              Nuestro sistema de stock inteligente controla la disponibilidad de cada
              producto en tiempo real. Evitamos sobreventas y garantizamos que cada
              pedido tenga inventario real disponible.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-1 rounded-xl border border-border bg-card p-4"
                >
                  <stat.icon className="h-4 w-4 text-primary" />
                  <p className="mt-1.5 font-mono text-xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-[11px] text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Live Stock */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-mono text-sm font-semibold text-foreground">
                Estado del inventario
              </h3>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-[11px] text-muted-foreground">En vivo</span>
              </div>
            </div>
            <div className="space-y-3">
              {featuredProducts.map((product) => {
                const stock = getStockStatus(product.stock)
                const percentage = Math.min((product.stock / 50) * 100, 100)
                return (
                  <div key={product.id} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">
                        {product.name}
                      </span>
                      <Badge
                        variant="outline"
                        className={`border-transparent text-[11px] ${stock.color}`}
                      >
                        {stock.label}
                      </Badge>
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
