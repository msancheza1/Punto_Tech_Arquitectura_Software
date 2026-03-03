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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

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

  // Products
  async getCategories() {
    return this.request('/api/products/categories/')
  }

  async getProducts(filters?: {
    category?: string
    priceMin?: number
    priceMax?: number
    search?: string
    ordering?: string
  }) {
    const params: Record<string, string> = {}
    if (filters?.category) params['category__slug'] = filters.category
    if (filters?.priceMin) params['price__gte'] = String(filters.priceMin)
    if (filters?.priceMax) params['price__lte'] = String(filters.priceMax)
    if (filters?.search) params['search'] = filters.search
    if (filters?.ordering) params['ordering'] = filters.ordering
    return this.request('/api/products/items/', { params })
  }

  async getProduct(slug: string) {
    return this.request(`/api/products/items/${slug}/`)
  }

  async getFeaturedProducts() {
    return this.request('/api/products/items/featured/')
  }

  async getStockStatus() {
    return this.request('/api/products/items/stock-status/')
  }

  async getRecommendations() {
    return this.request('/api/products/items/recommendations/')
  }

  // Combos
  async getCombos() {
    return this.request('/api/products/combos/')
  }

  // Orders
  async createOrder(orderData: {
    customer_name: string
    customer_email: string
    customer_phone: string
    shipping_address: string
    city: string
    items: Array<{
      product_id: number
      quantity: number
      with_warranty: boolean
    }>
    notes?: string
  }) {
    return this.request('/api/orders/', {
      method: 'POST',
      body: JSON.stringify(orderData),
    })
  }

  // Warranties
  async getWarrantyPlans() {
    return this.request('/api/warranties/plans/')
  }
}

export const api = new ApiClient(API_BASE_URL)
