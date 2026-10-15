import { reactive } from 'vue'

const KEY = 'hh2-products'
const seed = [
  { id: 1, name: 'Sweet Corn', farmer: 'Mang Tonyo', category: 'Vegetables', price: 35, stock: 120, unit: 'kg', notes: 'Harvested this morning' },
  { id: 2, name: 'Carabao Mango', farmer: 'Ate Linda', category: 'Fruits', price: 90, stock: 8, unit: 'kg', notes: 'Extra sweet' },
  { id: 3, name: 'Free-range Eggs', farmer: 'Kuya Ben', category: 'Dairy & Eggs', price: 12, stock: 200, unit: 'pc', notes: '' },
  { id: 4, name: 'Red Rice', farmer: 'Mang Tonyo', category: 'Grains', price: 65, stock: 15, unit: 'kg', notes: 'Organic' }
]

function load() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY))
    if (Array.isArray(data)) return data
  } catch (e) { /* fall back to seed */ }
  return JSON.parse(JSON.stringify(seed))
}

export const store = reactive({
  products: load(),
  categories: ['Vegetables', 'Fruits', 'Grains', 'Dairy & Eggs', 'Livestock'],

  save() {
    try { localStorage.setItem(KEY, JSON.stringify(this.products)) } catch (e) { /* ignore */ }
  },
  // CREATE
  add(product) {
    this.products.unshift({ ...product, id: Date.now() })
    this.save()
  },
  // UPDATE
  update(product) {
    const i = this.products.findIndex(p => p.id === product.id)
    if (i > -1) this.products[i] = { ...product }
    this.save()
  },
  // DELETE
  remove(id) {
    this.products = this.products.filter(p => p.id !== id)
    this.save()
  },
  reset() {
    this.products = JSON.parse(JSON.stringify(seed))
    this.save()
  }
})
