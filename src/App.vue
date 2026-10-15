<script setup>
import { useToast } from './composables/useToast'
const { toast } = useToast()
</script>

<template>
  <header>
    <div class="bar">
      <router-link class="logo" to="/">🌾 HarvestHub</router-link>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/requirements">Requirements</router-link>
        <router-link to="/guide">Build Guide</router-link>
        <router-link to="/produce">Produce</router-link>
        <router-link to="/farm-info">Farm Info</router-link>
      </nav>
    </div>
  </header>
  <main><router-view /></main>
  <div class="toast" v-if="toast.msg">{{ toast.msg }}</div>
</template>
