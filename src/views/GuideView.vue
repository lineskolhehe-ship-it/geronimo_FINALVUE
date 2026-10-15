<script setup>
import { usePersistentRef } from '../composables/usePersistentRef'

const ans = usePersistentRef('hh2-quiz', '')
const opts = ['computed', 'v-pre', 'createApp']
const steps = [
  { t: 'Gather requirements', d: 'Users, user stories, functional and non-functional needs.' },
  { t: 'Set up the project', d: 'Use Vite. Choose plain JavaScript (No TypeScript).', c: 'npm create vue@latest harvesthub2\ncd harvesthub2 && npm install && npm run dev' },
  { t: 'Plan the structure', d: 'Views (pages), components, router and store.', c: 'src/\n  views/ components/ router/ stores/ composables/' },
  { t: 'Create the app & mount', d: 'Entry point installs the router and mounts the app.', c: "createApp(App).use(router).mount('#app')" },
  { t: 'Add Vue Router', d: 'Map URLs to pages; navigate with router-link.', c: "{ path: '/produce', component: ProduceView }" },
  { t: 'Reactivity & templates', d: 'ref / reactive / computed with v-model, v-for, v-if, @click.', c: 'const shown = computed(() => list.filter(...))' },
  { t: 'Components, props & emits', d: 'ProductForm gets data by props and sends results with emit.', c: "emit('save', { ...f })" },
  { t: 'Shared state', d: 'A reactive store shared by all pages.' },
  { t: 'Implement CRUD', d: 'Create, Read, Update, Delete in stores/products.js.' },
  { t: 'Call an API', d: 'fetch data with async/await; show loading and error states with v-if / v-else-if / v-else.', c: "const res = await fetch(url)\nconst data = await res.json()" },
  { t: 'Validate & persist', d: 'Check inputs; save to localStorage.' },
  { t: 'Build & deploy', d: 'Create the production build.', c: 'npm run build' }
]
const js = [
  { t: 'Arrow functions', c: 'products.filter(p => p.stock < 20)' },
  { t: 'Array methods', c: 'findIndex, reduce, map, sort' },
  { t: 'Spread & destructuring', c: 'const copy = { ...item }' },
  { t: 'Template literals', c: 'confirm(`Delete "${p.name}"?`)' },
  { t: 'JSON & localStorage', c: 'JSON.stringify(list)' },
  { t: 'try / catch', c: 'try { JSON.parse(x) } catch (e) {}' },
  { t: 'async / await & fetch', c: 'const res = await fetch(url)\nconst data = await res.json()' },
  { t: 'Promises & errors', c: 'try { await fetch(url) } catch (e) {}' },
  { t: 'ES modules', c: "import { store } from '../stores/products'" }
]
</script>

<template>
  <h1>🛠️ Build Guide</h1>
  <div class="step" v-for="(s, i) in steps" :key="s.t">
    <div class="num">{{ i + 1 }}</div>
    <div style="flex:1;min-width:0">
      <strong>{{ s.t }}</strong>
      <div class="mute">{{ s.d }}</div>
      <pre v-if="s.c">{{ s.c }}</pre>
    </div>
  </div>
  <h2>JavaScript used</h2>
  <div class="grid">
    <div class="card" v-for="j in js" :key="j.t"><strong>{{ j.t }}</strong><pre>{{ j.c }}</pre></div>
  </div>
  <h2>Quick concept check</h2>
  <div class="card">
    <p>Which Vue feature keeps the product list in sync with the search box?</p>
    <div class="row">
      <button v-for="o in opts" :key="o" @click="ans = o" :class="{ p: ans === o }">{{ o }}</button>
    </div>
    <p v-if="ans" :class="{ err: ans !== 'computed' }">
      {{ ans === 'computed' ? '✅ Correct: computed re-evaluates when its reactive dependencies change.' : '❌ Not quite, try again.' }}
    </p>
  </div>
</template>
