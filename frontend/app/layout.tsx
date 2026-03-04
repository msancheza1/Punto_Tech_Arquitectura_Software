import type { Metadata, Viewport } from 'next'
import './globals.css'


export const viewport: Viewport = {
  themeColor: '#0d1117',
  userScalable: true,
}

export const metadata: Metadata = {
  title: 'Puntotech - Tu Tienda de Tecnologia',
  description: 'Tienda virtual de tecnologia especializada en celulares, computadores, bafles, audifonos y accesorios. Recomendaciones inteligentes, combos y garantias digitales.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
