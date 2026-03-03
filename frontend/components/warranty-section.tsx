"use client"

import Link from "next/link"
import { ShieldCheck, FileCheck, Clock, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"

const warrantyFeatures = [
  {
    icon: ShieldCheck,
    title: "Proteccion total",
    desc: "Cubre danos accidentales, defectos de fabrica y desgaste prematuro.",
  },
  {
    icon: FileCheck,
    title: "Gestion digital",
    desc: "Registra, consulta y gestiona tus garantias desde tu cuenta, sin papeles.",
  },
  {
    icon: Clock,
    title: "Hasta 3 anos",
    desc: "Extiende la garantia del fabricante y ten tranquilidad total.",
  },
  {
    icon: Headphones,
    title: "Soporte prioritario",
    desc: "Atencion preferencial con tiempos de respuesta reducidos.",
  },
]

export function WarrantySection() {
  return (
    <section
      className="border-y border-border bg-card/30 py-16 lg:py-20"
      aria-label="Garantias digitales"
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/8 px-3 py-1">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium tracking-wide text-primary">
              Garantias digitales
            </span>
          </div>
          <h2 className="text-balance font-mono text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
            Protege tu inversion
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Con nuestras garantias extendidas digitales, manejas todo desde tu cuenta.
            Sin papeles, sin complicaciones.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {warrantyFeatures.map((feat) => (
            <div
              key={feat.title}
              className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 text-center transition-all hover:border-primary/25"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                <feat.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">
                {feat.title}
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button asChild size="lg" className="bg-primary px-6 text-primary-foreground hover:bg-primary/90">
            <Link href="/garantias">
              Conocer mas sobre garantias
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
