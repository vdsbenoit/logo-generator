import { defineAsyncComponent, type Component } from "vue"
import { createMemoryHistory, createRouter } from "vue-router"

// Import all .vue files from src/pages directory
const pages = import.meta.glob("/src/pages/*.vue")

// Create routes array
const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\/([^\/]+)\.vue$/)?.[1] || "default"
  return {
    path: `/${name.toLowerCase()}`,
    name,
    component: defineAsyncComponent(pages[path] as () => Promise<{ default: Component }>),
  }
})

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
