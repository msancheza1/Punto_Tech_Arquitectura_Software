"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: Truck,
    label: "Envio gratis",
    desc: "En compras +$200.000",
  },
  {
    icon: ShieldCheck,
    label: "Garantia digital",
    desc: "Gestion 100% online",
  },
  {
    icon: RefreshCw,
    label: "Devoluciones",
    desc: "30 dias sin costo",
  },
]

export function Home() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[560px] lg:min-h-[660px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/fondoHome.jpg"
            alt="Technology workspace with premium devices"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-background/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right, var(--tw-gradient-stops))] from-primary/8 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative mx-auto flex max-w-7xl items-center px-4 py-20 lg:px-8 lg:py-28">
          <div className="max-w-2xl">
            <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span className="text-sm font-medium tracking-wide text-primary">
                Stock inteligente en tiempo real
              </span>
            </div>
            <h1 className="text-balance font-mono text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Tu tecnologia,{" "}
              <span className="text-primary">un paso adelante</span>
            </h1>
            <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground lg:text-lg">
              Descubre celulares, computadores, audifonos y mas con recomendaciones
              inteligentes, combos exclusivos y garantias digitales. Sin sobreventas, siempre con stock real.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary px-6 text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/productos">
                  Explorar productos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border px-6 text-foreground hover:bg-secondary"
              >
                <Link href="/combos">Ver combos</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Strip */}
      <div className="border-y border-border bg-card/60 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
          {features.map((feat) => (
            <div
              key={feat.label}
              className="flex items-center gap-4 px-6 py-5 lg:px-8"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <feat.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{feat.label}</p>
                <p className="text-xs text-muted-foreground">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
