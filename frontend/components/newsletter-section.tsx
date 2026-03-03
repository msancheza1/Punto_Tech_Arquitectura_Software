"use client"

import { useState } from "react"
import { Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail("")
    }
  }

  return (
    <section className="py-16 lg:py-20" aria-label="Suscripcion al newsletter">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="relative px-6 py-10 text-center sm:px-12 lg:py-14">
            <div className="relative">
              <h2 className="text-balance font-mono text-xl font-bold text-foreground sm:text-2xl">
                No te pierdas ninguna oferta
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
                Suscribete y recibe ofertas exclusivas, lanzamientos y combos especiales
                directamente en tu correo.
              </p>
              {submitted ? (
                <div className="mt-8 flex items-center justify-center gap-2 text-primary">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Te has suscrito exitosamente</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="mx-auto mt-8 flex max-w-md gap-3"
                >
                  <Input
                    type="email"
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 bg-secondary text-foreground placeholder:text-muted-foreground"
                    aria-label="Direccion de email"
                  />
                  <Button
                    type="submit"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Suscribirse
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
