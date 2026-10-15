import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RequirementsView from '../views/RequirementsView.vue'
import GuideView from '../views/GuideView.vue'
import ProduceView from '../views/ProduceView.vue'
import FarmInfoView from '../views/FarmInfoView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/requirements', name: 'requirements', component: RequirementsView },
  { path: '/guide', name: 'guide', component: GuideView },
  { path: '/produce', name: 'produce', component: ProduceView },
  { path: '/farm-info', name: 'farm-info', component: FarmInfoView },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: (to, from, saved) => saved || { top: 0 }
})
