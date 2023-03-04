<template>
  <div class="">
    <button aria-controls="default-sidebar"
            class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            data-drawer-target="default-sidebar"
            data-drawer-toggle="default-sidebar"
            type="button">
      <span class="sr-only">Open sidebar</span>
      <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
           xmlns="http://www.w3.org/2000/svg">
        <path clip-rule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              fill-rule="evenodd"></path>
      </svg>
    </button>

    <aside id="default-sidebar"
           aria-label="Sidebar"
           class="fixed top-0 left-0 z-40 w-48 h-screen transition-transform -translate-x-full sm:translate-x-0">
      <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50">
        <ul class="space-y-2">
          <li>
            <a class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
               href="#/convert">
              <svg aria-hidden="true" class="w-6 h-6 text-gray-500 transition duration-750 group-hover:text-gray-900"
                   fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span class="ml-3">Image to Docs</span>
            </a>
          </li>
          <li>
            <a class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100"
               href="#/snip">
              <svg aria-hidden="true"
                   class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                   fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              <span class="flex-1 ml-3 whitespace-nowrap">Snips</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
    <div class="p-4 sm:ml-48">
      <component :is="currentView"/>
    </div>

  </div>
</template>

<script lang="ts">
import {Component, defineComponent} from 'vue'
import Snip from '@/components/Snip.vue'
import Convert from '@/components/Convert.vue'

const routes: { [Key: string]: Component } = {
  '/snip': Snip,
  '/convert': Convert
}
export default defineComponent({
  components: {Snip, Convert},
  data() {
    return {
      currentPath: '#/snip'
    }
  },
  computed: {
    currentView(): Component {
      const path = this.currentPath.slice(1)
      return routes[path]
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash
    })
  }
})

// console.log("[App.vue]", `Hello world from Electron ${process.versions.electron}!`)
</script>
