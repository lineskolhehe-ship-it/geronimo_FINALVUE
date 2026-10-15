<script setup>
import { usePersistentRef } from '../composables/usePersistentRef'
import { ref, computed } from 'vue'
import { store } from '../stores/products'
import { useToast } from '../composables/useToast'
import ProductForm from '../components/ProductForm.vue'

const { notify } = useToast()
const q = usePersistentRef('hh2-q', '')
const cat = usePersistentRef('hh2-cat', '')
const sort = usePersistentRef('hh2-sort', 'new')
const show = usePersistentRef('hh2-form-open', false)
const editingId = usePersistentRef('hh2-form-id', null)
const editing = computed(() => store.products.find(p => p.id === editingId.value) || null)

// If the product being edited no longer exists, close the form
if (show.value && editingId.value !== null && !editing.value) {
  show.value = false
  editingId.value = null
}

// READ: search + filter + sort
const shown = computed(() => {
  let list = store.products.filter(p =>
    (!cat.value || p.category === cat.value) &&
    (p.name + ' ' + p.farmer).toLowerCase().includes(q.value.toLowerCase()))
  if (sort.value === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
  if (sort.value === 'price') list = [...list].sort((a, b) => a.price - b.price)
  if (sort.value === 'stock') list = [...list].sort((a, b) => a.stock - b.stock)
  return list
})

const openNew = () => { editingId.value = null; show.value = true }
const openEdit = (p) => { editingId.value = p.id; show.value = true }

function save(p) {
  if (editing.value) { store.update(p); notify('Product updated') }
  else { store.add(p); notify('Product added') }
  show.value = false
}
function del(p) {
  if (confirm(`Delete "${p.name}"?`)) { store.remove(p.id); notify('Product deleted') }
}
function reset() {
  if (confirm('Restore sample data?')) { store.reset(); notify('Data reset') }
}
</script>

<template>
  <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">
    <h1 style="margin:0">🥕 Produce</h1>
    <div><button @click="reset">Reset demo data</button> <button class="p" @click="openNew">+ Add product</button></div>
  </div>
  <div class="tools">
    <input v-model="q" placeholder="Search by product or farmer…" />
    <select v-model="cat"><option value="">All categories</option><option v-for="c in store.categories" :key="c">{{ c }}</option></select>
    <select v-model="sort"><option value="new">Newest</option><option value="name">Name A–Z</option><option value="price">Price ↑</option><option value="stock">Stock ↑</option></select>
  </div>
  <div class="card wrap" style="padding:6px">
    <table>
      <thead><tr><th>Product</th><th>Farmer</th><th>Category</th><th>Price</th><th>Stock</th><th></th></tr></thead>
      <tbody>
        <tr v-for="p in shown" :key="p.id">
          <td><strong>{{ p.name }}</strong><div class="mute" v-if="p.notes">{{ p.notes }}</div></td>
          <td>{{ p.farmer }}</td>
          <td><span class="tag">{{ p.category }}</span></td>
          <td>₱{{ p.price }}/{{ p.unit }}</td>
          <td><span class="tag" :class="{ low: p.stock < 20 }">{{ p.stock }} {{ p.unit }}</span></td>
          <td style="white-space:nowrap"><button @click="openEdit(p)">Edit</button> <button class="d" @click="del(p)">Delete</button></td>
        </tr>
        <tr v-if="!shown.length"><td colspan="6" class="mute" style="text-align:center;padding:24px">No products found.</td></tr>
      </tbody>
    </table>
  </div>
  <p class="mute">Showing {{ shown.length }} of {{ store.products.length }}. Data is saved in your browser.</p>
  <ProductForm v-if="show" :key="editing ? editing.id : 'new'" :item="editing" @save="save" @close="show = false" />
</template>
