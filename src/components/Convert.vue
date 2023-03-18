<template>

  <div>
    <div class="container mx-auto mb-4 text-3xl font-bold text-center">
      Convert
    </div>
    <div class="flex relative justify-center items-center bg-no-repeat bg-cover sm:px-6 lg:px-8">
      <form action="#" class="space-y-3" method="POST">
        <div class="grid grid-cols-1 space-y-2">
          <div class="flex justify-center items-center w-full">
            <label class="flex flex-col p-10 w-full  text-center rounded-lg border-4 border-dashed group">
              <div class="flex flex-col justify-center items-center w-full h-full text-center">
                <div class="flex flex-auto mx-auto ">
                  <img alt="image"
                       v-if="url"
                       :src="url" class="object-contain object-cover"
                  >
                </div>
                <p v-if="!url" class="text-gray-500 pointer-none">Select a file from your computer</p>
              </div>
              <input
                  class="hidden"
                  accept="image/*"
                  type="file"
                  @change="($event) => onFileChange($event)">
            </label>
          </div>
        </div>
        <p class="text-sm text-gray-300">
          <span>File type: jpg, png</span>
        </p>
        <div>
          <button
              class="flex justify-center p-4 my-5 w-full font-semibold tracking-wide text-gray-100 bg-blue-500 rounded-full shadow-lg transition duration-300 ease-in cursor-pointer hover:bg-blue-600 focus:outline-none focus:shadow-outline"
              type="submit">
            Convert to Docs
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
const fs = require('fs');
const { exec } = require("child_process");

export default defineComponent({
  name: "Convert",
  data() {
    return {
      image: '',
      url: '',
    }
  },
  methods: {
    onFileChange(e: Event) {
      e.stopPropagation();
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      if (!target) return
      const file = target.files;
      if (!file) return
      this.url = URL.createObjectURL(file[0]);
      console.log(file[0], "url", this.url)
//      fs.writeFileSync('./test', file[0]);
      exec(`mkdir test`, (error: { message: any; }, stdout: any, stderr: any) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      });
      exec(`cp ${file[0].path} ./test/`, (error: { message: any; }, stdout: any, stderr: any) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      });
    }
  }
})


</script>
