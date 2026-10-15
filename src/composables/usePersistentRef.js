import { ref, watch } from 'vue'

// A ref that is saved in localStorage, so its value survives a page refresh.
export function usePersistentRef(key, initial) {
  let value = initial
  try {
    const raw = localStorage.getItem(key)
    if (raw !== null) value = JSON.parse(raw)
  } catch (e) { /* use the initial value */ }

  const state = ref(value)
  watch(state, (v) => {
    try { localStorage.setItem(key, JSON.stringify(v)) } catch (e) { /* ignore */ }
  }, { deep: true })
  return state
}
