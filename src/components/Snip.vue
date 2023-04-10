<template>
  <div>
    <div class="font-bold text-3xl text-center container mx-auto mb-4">
      Snips
    </div>
    <div v-if="loading">
      <div></div>
    </div>
    <div v-else class="grid lg:grid-cols-2 gap-8 sm:grid-cols-1">
      <div @click="onClick(index)" v-for="(file, index) in files" :key="file._id" class="flex justify-center items-center border-2 border-slate-400 rounded-lg">
        <img :src="file.url" alt="">
      </div>
    </div>
  </div>
</template>

<script lang="js">
import {useFileStore} from '@/stores/snips'
import router from "@/router";

export default {
  name: "Snip",
  data() {
    return {
      files: [],
      loading: false,
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      const fileStore = useFileStore();
      fileStore.getFiles().then(response => {
        this.files = response
        this.loading = false
        console.log(this.files[1]._id)
      })
    },
    onClick(index) {
      const fileStore = useFileStore();
      fileStore.setCur(index)
      console.log(index)
      router.push('/detail')
    }
  }
}
</script>
