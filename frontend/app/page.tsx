"use client"

import { CartProvider } from "@/lib/cart-context"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { CategoriesSection } from "@/components/categories-section"
import { FeaturedProducts } from "@/components/featured-products"
import { CombosSection } from "@/components/combos-section"
import { SmartStockSection } from "@/components/smart-stock-section"
import { WarrantySection } from "@/components/warranty-section"
import { RecommendationsSection } from "@/components/recommendations-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <CategoriesSection />
          <FeaturedProducts />
          <CombosSection />
          <SmartStockSection />
          <WarrantySection />
          <RecommendationsSection />
          <NewsletterSection />
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}
