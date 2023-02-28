<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'

console.log("[App.vue]", `Hello world from Electron ${process.versions.electron}!`)
</script>

<template>
  <div class="flex">
    <aside class="w-1/10 fixed left-0 top-0 h-screen bg-slate-700 p-10 text-center">
      <h1 class="text-white text-4xl">Sidebar</h1>
    </aside>
    <main class="flex-1 ml-44">
      <div class="h-96 bg-white p-4">
        <HelloWorld />
      </div>
    </main>
  </div>
</template>

