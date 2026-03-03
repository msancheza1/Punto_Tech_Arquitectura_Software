/**
 * Puntotech API Service Layer
 * Connects the React frontend with the Django REST backend.
 *
 * In development, the frontend uses local mock data (lib/data.ts).
 * In production, set NEXT_PUBLIC_API_URL to point to your Django server.
 *
 * Django API endpoints:
 *   GET  /api/products/categories/         - Categorias
 *   GET  /api/products/items/              - Productos (filtrable)
 *   GET  /api/products/items/{slug}/       - Detalle producto
 *   GET  /api/products/items/featured/     - Destacados
 *   GET  /api/products/items/stock-status/ - Stock inteligente
 *   GET  /api/products/items/recommendations/ - Recomendaciones
 *   GET  /api/products/combos/             - Combos
 *   POST /api/orders/                      - Crear pedido
 *   GET  /api/warranties/plans/            - Planes de garantia
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'

type ApiProducto = {
  id: string
  nombre: string
  marca: string
  precio: string | number
  descripcion: string
  categoria: string | null
  stock_disponible: number | null
}

interface FetchOptions extends RequestInit {
  params?: Record<string, string>
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { params, ...fetchOptions } = options
    let url = `${this.baseUrl}${endpoint}`

    if (params) {
      const searchParams = new URLSearchParams(params)
      url += `?${searchParams.toString()}`
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
      ...fetchOptions,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  private mapProductoToUi(p: ApiProducto) {
    const rawCategory = (p.categoria ?? '').toString().toLowerCase()
    const category =
      rawCategory.includes('cel') || rawCategory.includes('phone')
        ? 'phones'
        : rawCategory.includes('comp') || rawCategory.includes('laptop')
          ? 'laptops'
          : rawCategory.includes('aud') || rawCategory.includes('head')
            ? 'headphones'
            : rawCategory.includes('baf') || rawCategory.includes('speak')
              ? 'speakers'
              : 'accessories'

    return {
      id: p.id,
      name: p.nombre,
      description: p.descripcion ?? '',
      price: typeof p.precio === 'string' ? Number(p.precio) : Number(p.precio),
      category,
      image: '/images/product-phone.jpg',
      stock: p.stock_disponible ?? 0,
      rating: 4.7,
      reviews: 100,
      warrantyAvailable: true,
    }
  }

  // Productos
  async getAllProducts() {
    const data = await this.request<ApiProducto[]>(`/api/productos/`)
    return data.map((p) => this.mapProductoToUi(p))
  }

  async getProductsByCategory(categoriaId: string) {
    const data = await this.request<ApiProducto[]>(`/api/categorias/${categoriaId}/productos/`)
    return data.map((p) => this.mapProductoToUi(p))
  }

  async getProductById(productoId: string) {
    const data = await this.request<ApiProducto>(`/api/productos/${productoId}/`)
    return this.mapProductoToUi(data)
  }

  // Usuarios
  async registerUser(userData: {
    nombre: string
    email: string
    password: string
    presupuesto?: number
    tipo_uso?: string
    marcas_preferidas?: string
  }) {
    return this.request('/api/usuarios/registrar/', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  async updateProfile(usuarioId: string, profileData: {
    presupuesto?: number
    tipo_uso?: string
    marcas_preferidas?: string
  }) {
    return this.request(`/api/usuarios/${usuarioId}/perfil/`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    })
  }

  // Carrito
  async getCart(usuarioId: string) {
    return this.request(`/api/usuarios/${usuarioId}/carrito/`)
  }

  async addToCart(usuarioId: string, data: { producto_id: string; cantidad: number }) {
    return this.request(`/api/usuarios/${usuarioId}/carrito/agregar/`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async removeFromCart(usuarioId: string, productoId: string) {
    return this.request(`/api/usuarios/${usuarioId}/carrito/${productoId}/`, {
      method: 'DELETE',
    })
  }

  // Pedidos
  async createOrder(data: { usuario_id: string; direccion_envio: string }) {
    return this.request('/api/pedidos/crear/', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async listOrders(usuarioId: string) {
    return this.request(`/api/usuarios/${usuarioId}/pedidos/`)
  }

  // Recomendaciones
  async getRecommendations(usuarioId: string) {
    return this.request(`/api/usuarios/${usuarioId}/recomendaciones/`)
  }
}

export const api = new ApiClient(API_BASE_URL)
