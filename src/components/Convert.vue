<template>
    <div class="relative z-10">
      <Alert v-if="alert"></Alert>
    </div>
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
                    <img alt="image" v-if="url" :src="url" class="object-cover">
                  </div>
                  <p v-if="!url" class="text-gray-500 pointer-none">Select a file from your computer</p>
                </div>
                <input class="hidden" accept="image/*" type="file" @change="($event) => onFileChange($event)">
              </label>
            </div>
          </div>
          <p class="text-sm text-gray-300">
            <span>File type: jpg, png</span>
          </p>
          <div>
            <button
              class="flex justify-center p-5 my-5 w-full font-semibold tracking-wide text-gray-100 bg-blue-500 rounded-full shadow-lg transition duration-300 ease-in cursor-pointer hover:bg-blue-600 focus:outline-none focus:shadow-outline"
              @click="capture">
              Capture
            </button>
            <button :disabled="url === ''" v-if="wait === false"
              class="flex justify-center p-4 my-5 w-full font-semibold tracking-wide text-gray-100 bg-blue-500 rounded-full shadow-lg transition duration-300 ease-in cursor-pointer hover:bg-blue-600 focus:outline-none focus:shadow-outline disabled:bg-blue-300"
              type="submit" @click="convert">
              Convert to Docs
            </button>
            <button v-else disabled
              class="flex justify-center p-4 my-5 w-full font-semibold tracking-wide text-gray-100 bg-blue-300 rounded-full shadow-lg transition duration-300 ease-in cursor-pointer">
              Converting...
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Alert from "@/components/Alert.vue";
const electron = require('electron');
const fs = require('fs');
const { exec } = require("child_process");

export default defineComponent({
  name: "Convert",
  components: { Alert },
  data() {
    return {
      image: '',
      url: '',
      wait: false,
      alert: false
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
      exec(`mkdir imgs`, (error: { message: any; }, stdout: any, stderr: any) => {
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
      exec(`cp ${file[0].path} ./imgs/`, (error: { message: any; }, stdout: any, stderr: any) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        let img = file[0].path.split("/")
        this.image = `./test/${img[img.length - 1]}`
        console.log(`stdout: ${stdout}`);
      });
    },
    convert(e: Event) {
      e.preventDefault()
      e.stopPropagation()
      this.wait = true
      // let command = `docker run -i -v "$(pwd)"/imgs:/usr/src/app/test --rm --name my-app hainv01/img2latex:0.0.4 ${this.image}`
      let command = `docker run -i -v "$(pwd)"/imgs:/usr/src/app/test --rm --name my-app hainv01/img2latex:0.0.4 a`
      exec(command, (error: { message: any; }, stdout: any, stderr: any) => {
        if (error) {
          this.alert = true;
          console.log(`error: ${error.message}`);
          setTimeout(() => {
            this.alert = false;
          }, 5000);
          this.wait = false
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`);
        let blob = new Blob([stdout], { "type": "text/plain" });
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'output.txt'
        link.click()
        this.wait = false
      });
    },
    capture(e: Event) {
      // e.stopPropagation();
      e.preventDefault();
      exec(`mkdir imgs`, (error: { message: any; }, stdout: any, stderr: any) => {
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
      let r = Date.now()
      electron.ipcRenderer.send('minimize-win')
      exec(`xfce4-screenshooter -r -s ./imgs/${r}.png`, (error: { message: any; }, stdout: any, stderr: any) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
        }

        this.url = `./imgs/${r}.png`
        this.image = `./test/${r}.png`
        console.log(`stdout: ${this.url}`);
        electron.ipcRenderer.send('unhide-win')
      });
    },
  }
})
</script>
