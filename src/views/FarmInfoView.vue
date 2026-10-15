<script setup>
import { usePersistentRef } from '../composables/usePersistentRef'
import { ref, computed, watch, onMounted } from 'vue'

/* ---------- API 1: Open-Meteo weather (no API key needed) ---------- */
const cities = [
  { name: 'Manila', lat: 14.6, lon: 121.0 },
  { name: 'Cebu City', lat: 10.32, lon: 123.89 },
  { name: 'Davao City', lat: 7.07, lon: 125.61 },
  { name: 'Baguio', lat: 16.41, lon: 120.6 }
]
const cityName = usePersistentRef('hh2-city', cities[0].name)
const city = ref(cities.find(c => c.name === cityName.value) || cities[0])
const weather = ref(null)
const wLoading = ref(false)
const wError = ref('')

async function loadWeather() {
  wLoading.value = true
  wError.value = ''
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.value.lat}&longitude=${city.value.lon}` +
      '&current=temperature_2m,relative_humidity_2m,wind_speed_10m' +
      '&daily=temperature_2m_max,precipitation_sum&timezone=auto&forecast_days=5'
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Request failed (${res.status})`)
    weather.value = await res.json()
  } catch (e) {
    wError.value = e.message
    weather.value = null
  } finally {
    wLoading.value = false
  }
}

const days = computed(() => {
  if (!weather.value) return []
  const d = weather.value.daily
  return d.time.map((t, i) => ({ date: t, max: d.temperature_2m_max[i], rain: d.precipitation_sum[i] }))
})
const tip = computed(() => {
  if (!days.value.length) return ''
  return days.value[0].rain > 5
    ? '🌧️ Rain expected today: delay spraying and harvesting.'
    : '☀️ Dry day: good for harvesting and drying crops.'
})

/* ---------- API 2: JSONPlaceholder (sample farmer directory) ---------- */
const farmers = ref([])
const fLoading = ref(false)
const fError = ref('')
const search = usePersistentRef('hh2-farmer-search', '')

async function loadFarmers() {
  fLoading.value = true
  fError.value = ''
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!res.ok) throw new Error(`Request failed (${res.status})`)
    farmers.value = await res.json()
  } catch (e) {
    fError.value = e.message
  } finally {
    fLoading.value = false
  }
}
const filtered = computed(() =>
  farmers.value.filter(f => f.name.toLowerCase().includes(search.value.toLowerCase())))

onMounted(() => { loadWeather(); loadFarmers() })
watch(city, () => { cityName.value = city.value.name; loadWeather() })
</script>

<template>
  <h1>🌦️ Farm Info</h1>
  <p class="mute">Data fetched from public APIs using <code>fetch</code> with <code>async/await</code>.</p>

  <h2>Weather forecast</h2>
  <div class="card">
    <label>City</label>
    <select v-model="city"><option v-for="c in cities" :key="c.name" :value="c">{{ c.name }}</option></select>

    <p v-if="wLoading" class="mute">Loading weather…</p>
    <div v-else-if="wError" class="err">
      Could not load weather: {{ wError }} <button @click="loadWeather">Retry</button>
    </div>
    <div v-else-if="weather">
      <p>
        <span class="stat">{{ weather.current.temperature_2m }}°C</span>
        <span class="mute"> now · humidity {{ weather.current.relative_humidity_2m }}% · wind {{ weather.current.wind_speed_10m }} km/h</span>
      </p>
      <p><strong>{{ tip }}</strong></p>
      <div class="grid">
        <div class="card" v-for="d in days" :key="d.date">
          <strong>{{ d.date }}</strong>
          <div>High {{ d.max }}°C</div>
          <div class="mute">Rain {{ d.rain }} mm</div>
        </div>
      </div>
    </div>
  </div>

  <h2>Farmer directory (sample API data)</h2>
  <input v-model="search" placeholder="Search by name…" style="margin-bottom:12px" />
  <p v-if="fLoading" class="mute">Loading farmers…</p>
  <div v-else-if="fError" class="err">
    Could not load farmers: {{ fError }} <button @click="loadFarmers">Retry</button>
  </div>
  <p v-else-if="!filtered.length" class="mute">No farmers found.</p>
  <div v-else class="grid">
    <div class="card" v-for="f in filtered" :key="f.id">
      <strong>👩‍🌾 {{ f.name }}</strong>
      <div class="mute">{{ f.email }}</div>
      <div class="mute">{{ f.address.city }} · {{ f.company.name }}</div>
    </div>
  </div>
</template>
