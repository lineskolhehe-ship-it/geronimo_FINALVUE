<script setup>
import { reactive, watch } from 'vue'
import { store } from '../stores/products'

const props = defineProps({ item: Object })
const emit = defineEmits(['save', 'close'])

const f = reactive(props.item ? { ...props.item } : { name: '', farmer: '', category: 'Vegetables', unit: 'kg', price: 0, stock: 0, notes: '' })
const e = reactive({})

// Keep what the user typed (a draft) so a page refresh does not lose it
const DRAFT = 'hh2-draft'
const draftId = props.item ? props.item.id : 'new'
try {
  const d = JSON.parse(localStorage.getItem(DRAFT))
  if (d && d.id === draftId) Object.assign(f, d.values)
} catch (err) { /* no draft */ }
watch(f, () => {
  try { localStorage.setItem(DRAFT, JSON.stringify({ id: draftId, values: f })) } catch (err) { /* ignore */ }
}, { deep: true })
const clearDraft = () => { try { localStorage.removeItem(DRAFT) } catch (err) { /* ignore */ } }
function close() { clearDraft(); emit('close') }

function submit() {
  e.name = f.name ? '' : 'Name is required'
  e.farmer = f.farmer ? '' : 'Farmer is required'
  e.price = f.price > 0 ? '' : 'Price must be above 0'
  e.stock = Number.isInteger(f.stock) && f.stock >= 0 ? '' : 'Stock must be 0 or more'
  if (!Object.values(e).some(Boolean)) { clearDraft(); emit('save', { ...f }) }
}
</script>

<template>
  <div class="modal" @click.self="close()">
    <div class="card">
      <h2 style="margin-top:0">{{ item ? 'Edit product' : 'Add product' }}</h2>
      <label>Product name</label><input v-model.trim="f.name" placeholder="e.g. Tomatoes" />
      <div class="err" v-if="e.name">{{ e.name }}</div>
      <label>Farmer</label><input v-model.trim="f.farmer" placeholder="Farmer name" />
      <div class="err" v-if="e.farmer">{{ e.farmer }}</div>
      <div class="row">
        <div><label>Category</label><select v-model="f.category"><option v-for="c in store.categories" :key="c">{{ c }}</option></select></div>
        <div><label>Unit</label><select v-model="f.unit"><option>kg</option><option>pc</option><option>bundle</option></select></div>
      </div>
      <div class="row">
        <div><label>Price (₱)</label><input type="number" min="0" v-model.number="f.price" /><div class="err" v-if="e.price">{{ e.price }}</div></div>
        <div><label>Stock</label><input type="number" min="0" v-model.number="f.stock" /><div class="err" v-if="e.stock">{{ e.stock }}</div></div>
      </div>
      <label>Notes</label><textarea rows="2" v-model="f.notes"></textarea>
      <div class="row" style="margin-top:14px">
        <button @click="close()">Cancel</button>
        <button class="p" @click="submit">Save</button>
      </div>
    </div>
  </div>
</template>
