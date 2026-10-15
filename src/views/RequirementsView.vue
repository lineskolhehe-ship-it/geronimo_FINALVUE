<script setup>
import { computed } from 'vue'
import { usePersistentRef } from '../composables/usePersistentRef'

const stories = usePersistentRef('hh2-stories', [
  { t: 'As a farmer, I can add a product with price and stock.', done: true },
  { t: 'As a farmer, I can edit a product when prices change.', done: true },
  { t: 'As a farmer, I can delete a product that is sold out.', done: true },
  { t: 'As a buyer, I can search products by name or farmer.', done: true },
  { t: 'As a buyer, I can filter products by category.', done: true },
  { t: 'As an admin, I can see low-stock warnings.', done: true },
  { t: 'As a farmer, I can see a weather forecast to plan my work.', done: true },
  { t: 'As a buyer, I can browse a farmer directory loaded from an API.', done: true },
  { t: 'As a user, I can log in with my own account.', done: false }
])
const doneCount = computed(() => stories.value.filter(s => s.done).length)
const pct = computed(() => Math.round((doneCount.value / stories.value.length) * 100))
const fr = ['Create, view, update and delete products', 'Search and filter the product list', 'Validate form input (name, price, stock)', 'Dashboard totals on the landing page', 'Navigate between pages without reload', 'Fetch weather and farmer data from public APIs (with loading and error states)']
const nfr = ['Responsive on phones and desktops', 'Fast: no full page reloads (SPA)', 'Data persists in the browser (localStorage)', 'Readable in light and dark mode', 'Maintainable, component-based code']
</script>

<template>
  <h1>📋 Requirements</h1>
  <p class="mute">Step 1: understand the problem and write down what the system must do.</p>
  <h2>Problem &amp; goal</h2>
  <div class="card">Small local farmers lack a simple way to list produce and track stock. <strong>HarvestHub</strong> gives them one place to manage listings.</div>
  <h2>Users</h2>
  <div class="grid">
    <div class="card"><strong>👩‍🌾 Farmer</strong><div class="mute">Adds and maintains produce and stock.</div></div>
    <div class="card"><strong>🛒 Buyer</strong><div class="mute">Searches and filters available produce.</div></div>
    <div class="card"><strong>🧑‍💼 Admin</strong><div class="mute">Reviews listings and keeps data clean.</div></div>
  </div>
  <h2>User stories</h2>
  <div class="card">
    <label class="us" v-for="s in stories" :key="s.t" :class="{ done: s.done }">
      <input type="checkbox" v-model="s.done" /><span>{{ s.t }}</span>
    </label>
    <div class="mute" style="margin-top:10px">{{ doneCount }} / {{ stories.length }} complete ({{ pct }}%)</div>
  </div>
  <div class="grid">
    <div><h2>Functional</h2><div class="card"><ul><li v-for="f in fr" :key="f">{{ f }}</li></ul></div></div>
    <div><h2>Non-functional</h2><div class="card"><ul><li v-for="f in nfr" :key="f">{{ f }}</li></ul></div></div>
  </div>
</template>
