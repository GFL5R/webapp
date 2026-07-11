import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('@/views/HomePage.vue') },
  { path: '/approaches-and-derived-attributes', name: 'approaches', component: () => import('@/views/ApproachesPage.vue') },
  { path: '/attribution', name: 'attribution', component: () => import('@/views/AttributionPage.vue') },
  { path: '/building-a-commander', name: 'build-commander', component: () => import('@/views/BuildCommanderPage.vue') },
  { path: '/building-your-t-doll', name: 'build-tdoll', component: () => import('@/views/BuildTDollPage.vue') },
  { path: '/a-boy-and-his-doll', name: 'boy-doll', component: () => import('@/views/BoyDollPage.vue') },
  { path: '/collapse-radiation', name: 'collapse', component: () => import('@/views/CollapsePage.vue') },
  { path: '/conditions', name: 'conditions', component: () => import('@/views/ConditionsPage.vue') },
  { path: '/crime', name: 'crime', component: () => import('@/views/CrimePage.vue') },
  { path: '/remoulding', name: 'remoulding', component: () => import('@/views/RemouldingPage.vue') },
  { path: '/remoulding-failure-table', name: 'remoulding-failure-table', component: () => import('@/views/RemouldingFailureTablePage.vue') },
  { path: '/transhumanism', name: 'transhumanism', component: () => import('@/views/TranshumanismPage.vue') },
  { path: '/disciplines', name: 'disciplines', component: () => import('@/views/DisciplinesPage.vue') },
  { path: '/driving-and-vehicles', name: 'driving', component: () => import('@/views/DrivingPage.vue') },
  { path: '/electronic-warfare', name: 'ewar', component: () => import('@/views/EWarPage.vue') },
  { path: '/experience', name: 'experience', component: () => import('@/views/ExperiencePage.vue') },
  { path: '/factions', name: 'factions', component: () => import('@/views/FactionsPage.vue') },
  { path: '/harm-and-healing', name: 'harm', component: () => import('@/views/HarmPage.vue') },
  { path: '/humanity-and-fame', name: 'humanity', component: () => import('@/views/HumanityPage.vue') },
  { path: '/making-a-check', name: 'making-check', component: () => import('@/views/MakingCheckPage.vue') },
  { path: '/npcs', name: 'npcs', component: () => import('@/views/NpcsPage.vue') },
  { path: '/disadvantages', name: 'disadvantages', component: () => import('@/views/DisadvantagesPage.vue') },
  { path: '/passions', name: 'passions', component: () => import('@/views/PassionsPage.vue') },
  { path: '/advantages', name: 'advantages', component: () => import('@/views/AdvantagesPage.vue') },
  { path: '/anxieties', name: 'anxieties', component: () => import('@/views/AnxietiesPage.vue') },
  { path: '/techniques/:type', name: 'techniques-type', component: () => import('@/views/techniques/TechniqueTypePage.vue') },
  { path: '/techniques', name: 'techniques', component: () => import('@/views/TechniquesPage.vue') },
  { path: '/weapons', name: 'weapons-compendium', component: () => import('@/views/WeaponsCompendiumPage.vue') },
  { path: '/armor', name: 'armor', component: () => import('@/views/ArmorPage.vue') },
  { path: '/items', name: 'items', component: () => import('@/views/ItemsPage.vue') },
  { path: '/modules', name: 'modules', component: () => import('@/views/ModulesPage.vue') },
  { path: '/vehicles', name: 'vehicles', component: () => import('@/views/VehiclesPage.vue') },
  { path: '/perks', name: 'perks', component: () => import('@/views/PerksPage.vue') },
  { path: '/capstones', name: 'capstones', component: () => import('@/views/CapstonesPage.vue') },
  { path: '/poisons-and-drugs', name: 'poisons', component: () => import('@/views/PoisonsPage.vue') },
  { path: '/range-bands', name: 'range-bands', component: () => import('@/views/RangeBandsPage.vue') },
  { path: '/scenes', name: 'scenes', component: () => import('@/views/ScenesPage.vue') },
  { path: '/setting-and-t-dolls', name: 'setting', component: () => import('@/views/SettingPage.vue') },
  { path: '/skills', name: 'skills', component: () => import('@/views/SkillsPage.vue') },
  { path: '/strife', name: 'strife', component: () => import('@/views/StrifePage.vue') },
  { path: '/weapons-and-armor', name: 'weapons', component: () => import('@/views/WeaponsPage.vue') },
  { path: '/going-solo', name: 'going-solo', component: () => import('@/views/GoingSoloPage.vue') },
  { path: '/search', name: 'search', component: () => import('@/views/SearchPage.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from) {
    // Don't scroll on hash-only changes (database item expand/collapse)
    if (to.path === from.path && to.hash !== from.hash) {
      return false
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  }
})

export default router
