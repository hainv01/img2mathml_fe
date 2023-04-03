<template>
  <button aria-controls="default-sidebar"
    class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
    data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" type="button">
    <span class="sr-only">Open sidebar</span>
    <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
        fill-rule="evenodd"></path>
    </svg>
  </button>

  <aside id="default-sidebar" aria-label="Sidebar"
    class="fixed top-0 left-0 z-40 w-48 h-screen transition-transform -translate-x-full sm:translate-x-0">
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50">
      <ul class="space-y-2">
        <li>
          <router-link to="/"
            class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
            <svg aria-hidden="true" class="w-6 h-6 text-gray-500 transition duration-750 group-hover:text-gray-900"
              fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
            </svg>
            <span class="ml-3">Image to Docs</span>
          </router-link>
        </li>
        <li>
          <router-link to="/snip"
            class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100">
            <svg aria-hidden="true"
              class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
              fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z">
              </path>
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap">Snips</span>
          </router-link>
        </li>
        <li>
          <router-link to="/login"
            class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100">
            <svg aria-hidden="true"
              class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clip-rule="evenodd"></path>
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap">Login</span>
          </router-link>
        </li>
        <li>
          <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
            <svg aria-hidden="true"
              class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900"
              fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                clip-rule="evenodd"></path>
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>
  <div class="p-4 sm:ml-48">
    <!-- <component :is="currentView"/> -->
    <RouterView />
  </div>
</template>

<script lang="ts">
import { Component, defineComponent } from 'vue'
import Snip from '@/components/Snip.vue'
import Convert from '@/components/Convert.vue'
import Register from "@/components/Register.vue";
import { RouterView } from 'vue-router';

// const routes: { [Key: string]: Component } = {
//   '/snip': Snip,
//   '/convert': Convert,
//   '/register': Register

// }
export default defineComponent({
  name: "NavSide",
  // components: { Snip, Convert },
  // data() {
  //   return {
  //     currentPath: '#/snip'
  //   }
  // },
  // computed: {
  //   currentView(): Component {
  //     const path = this.currentPath.slice(1)
  //     return routes[path]
  //   }
  // },
  // mounted() {
  //   window.addEventListener('hashchange', () => {
  //     this.currentPath = window.location.hash
  //   })
  // }
})

// console.log("[App.vue]", `Hello world from Electron ${process.versions.electron}!`)
</script>
