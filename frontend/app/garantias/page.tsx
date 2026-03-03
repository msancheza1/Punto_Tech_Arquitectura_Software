"use client"

import {
  ShieldCheck,
  FileCheck,
  Clock,
  Headphones,
  CheckCircle,
  ArrowRight,
  Smartphone,
  Laptop,
  Speaker,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CartProvider } from "@/lib/cart-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const plans = [
  {
    name: "Basica",
    duration: "1 ano",
    price: "10%",
    description: "Cobertura esencial contra defectos de fabrica.",
    features: [
      "Defectos de fabrica",
      "Soporte por chat",
      "Gestion digital",
      "Reemplazo en 15 dias",
    ],
    popular: false,
  },
  {
    name: "Plus",
    duration: "2 anos",
    price: "15%",
    description: "Proteccion extendida con soporte prioritario.",
    features: [
      "Defectos de fabrica",
      "Danos accidentales",
      "Soporte prioritario",
      "Gestion digital",
      "Reemplazo en 7 dias",
      "1 revision preventiva",
    ],
    popular: true,
  },
  {
    name: "Premium",
    duration: "3 anos",
    price: "20%",
    description: "Proteccion total con beneficios exclusivos.",
    features: [
      "Defectos de fabrica",
      "Danos accidentales",
      "Desgaste prematuro",
      "Soporte 24/7",
      "Gestion digital",
      "Reemplazo en 3 dias",
      "2 revisiones preventivas",
      "Producto temporal mientras reparan",
    ],
    popular: false,
  },
]

const steps = [
  {
    step: "01",
    title: "Elige tu producto",
    desc: "Selecciona el producto que quieres proteger al momento de la compra.",
    icon: Smartphone,
  },
  {
    step: "02",
    title: "Selecciona el plan",
    desc: "Escoge el plan de garantia que mejor se adapte a tus necesidades.",
    icon: ShieldCheck,
  },
  {
    step: "03",
    title: "Gestion digital",
    desc: "Registra y gestiona tus garantias desde tu cuenta, sin papeles.",
    icon: FileCheck,
  },
  {
    step: "04",
    title: "Soporte cuando lo necesites",
    desc: "Contactanos y resolveremos tu caso de forma rapida y eficiente.",
    icon: Headphones,
  },
]

const coveredDevices = [
  { name: "Celulares", icon: Smartphone },
  { name: "Computadores", icon: Laptop },
  { name: "Bafles y audifonos", icon: Speaker },
]

export default function GarantiasPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          {/* Hero */}
          <section className="border-b border-border bg-card/30 py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Garantias digitales
                </span>
              </div>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
                Protege tu tecnologia
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
                Nuestras garantias extendidas digitales te dan tranquilidad total.
                Sin papeles, sin complicaciones, todo desde tu cuenta.
              </p>
            </div>
          </section>

          {/* Plans */}
          <section className="py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
                Planes de garantia
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {plans.map((plan) => (
                  <div
                    key={plan.name}
                    className={`relative flex flex-col rounded-2xl border p-6 ${
                      plan.popular
                        ? "border-primary bg-card"
                        : "border-border bg-card"
                    }`}
                  >
                    {plan.popular && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                        Mas popular
                      </Badge>
                    )}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-foreground">
                        {plan.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {plan.description}
                      </p>
                    </div>
                    <div className="mb-6">
                      <span className="text-3xl font-bold text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {" "}
                        del valor del producto
                      </span>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Cobertura por {plan.duration}
                      </p>
                    </div>
                    <div className="mb-6 flex-1 space-y-3">
                      {plan.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
                          <span className="text-sm text-muted-foreground">
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                    <Button
                      className={
                        plan.popular
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }
                    >
                      Seleccionar plan
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How it works */}
          <section className="border-y border-border bg-card/30 py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <h2 className="mb-12 text-center text-2xl font-bold text-foreground">
                Como funciona
              </h2>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {steps.map((s) => (
                  <div key={s.step} className="text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                      <s.icon className="h-7 w-7 text-primary" />
                    </div>
                    <span className="text-xs font-bold text-primary">
                      PASO {s.step}
                    </span>
                    <h3 className="mt-2 text-base font-semibold text-foreground">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Covered devices */}
          <section className="py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
              <h2 className="mb-8 text-2xl font-bold text-foreground">
                Dispositivos cubiertos
              </h2>
              <div className="mx-auto flex max-w-md justify-center gap-6">
                {coveredDevices.map((d) => (
                  <div
                    key={d.name}
                    className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6"
                  >
                    <d.icon className="h-8 w-8 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      {d.name}
                    </span>
                  </div>
                ))}
              </div>
              <Button
                size="lg"
                className="mt-10 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Explorar productos con garantia
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}
