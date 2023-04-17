<template>
  <Suspense>
      <template #default>
          <Snip/>
      </template>
      <template #fallback>
          <h1>Snip</h1>
      </template>
  </Suspense>
</template>

<script>
import Snip from "@/components/Snip.vue";

export default {
    name: "Sup",
    components: {Snip}
}
</script>
