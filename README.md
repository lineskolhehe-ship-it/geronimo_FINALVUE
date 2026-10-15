# 🌾 HarvestHub2 – Local Farmer System

A Vue 3 single-page app (plain JavaScript, Vite) for local farmers to manage produce.

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Pages
- `/` Home (landing + dashboard stats)
- `/requirements` Requirements, user stories, FR/NFR
- `/guide` Build guide and JavaScript concepts
- `/produce` Products CRUD (search, filter, sort, validation)
- `/farm-info` API calls: weather (Open-Meteo) and farmer directory (JSONPlaceholder)

## Structure
```
src/
  main.js              app entry (createApp + router)
  App.vue              layout + navigation
  router/index.js      Vue Router routes
  stores/products.js   reactive store + CRUD + localStorage
  composables/         useToast
  components/          ProductForm.vue (props, emits, validation)
  views/               Home, Requirements, Guide, Produce, FarmInfo
```
