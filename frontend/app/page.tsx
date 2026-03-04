"use client"
import { Navbar } from "@/components/navbar"
import { Home } from "@/components/home"

import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Home />
        </main>
        <Footer />
      </div>
  )
}
