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

