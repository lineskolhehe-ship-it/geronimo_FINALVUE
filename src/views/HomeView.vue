<script setup>
import { computed } from 'vue'
import { store } from '../stores/products'

const farmers = computed(() => new Set(store.products.map(p => p.farmer)).size)
const value = computed(() => Math.round(store.products.reduce((s, p) => s + p.price * p.stock, 0)))
const low = computed(() => store.products.filter(p => p.stock < 20).length)
const cards = [
  { i: '📋', t: 'Requirements', d: 'Goals, user stories, functional & non-functional needs.', to: '/requirements' },
  { i: '🛠️', t: 'Build Guide', d: 'From requirements to CRUD: setup, components, router, state.', to: '/guide' },
  { i: '🥕', t: 'Produce (CRUD)', d: 'Create, read, update, delete farm products.', to: '/produce' }
]
</script>

<template>
  <section class="hero">
    <span class="tag">Local Farmer System</span>
    <h1>🌾 HarvestHub</h1>
    <p>A single-page Vue app connecting local farmers with their community. Manage produce with a full CRUD module.</p>
    <router-link class="btn p" to="/produce">Manage produce</router-link>
    <router-link class="btn" to="/requirements">View requirements</router-link>
  </section>
  <div class="grid">
    <div class="card"><div class="stat">{{ store.products.length }}</div><div class="mute">Listed products</div></div>
    <div class="card"><div class="stat">{{ farmers }}</div><div class="mute">Local farmers</div></div>
    <div class="card"><div class="stat">₱{{ value.toLocaleString() }}</div><div class="mute">Total stock value</div></div>
    <div class="card"><div class="stat">{{ low }}</div><div class="mute">Low stock (&lt; 20)</div></div>
  </div>
  <h2>Explore</h2>
  <div class="grid">
    <router-link v-for="c in cards" :key="c.to" :to="c.to" class="card" style="text-decoration:none;color:inherit">
      <div style="font-size:1.8rem">{{ c.i }}</div><strong>{{ c.t }}</strong><div class="mute">{{ c.d }}</div>
    </router-link>
  </div>
</template>
