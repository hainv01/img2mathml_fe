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
                  <img v-if="url" :src="url" alt="image" class="object-cover">
                </div>
                <p v-if="!url" class="text-gray-500 pointer-none">Select a file from your computer</p>
              </div>
              <input accept="image/*" class="hidden" type="file" @change="($event) => onFileChange($event)">
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
          <button v-if="wait === false" :disabled="url === ''"
                  class="flex justify-center p-4 my-5 w-full font-semibold tracking-wide text-gray-100 bg-blue-500 rounded-full shadow-lg transition duration-300 ease-in cursor-pointer hover:bg-blue-600 focus:outline-none focus:shadow-outline disabled:bg-blue-300"
                  type="submit" @click="convert">
            Convert to Docs
          </button>
          <button v-else class="flex justify-center p-4 my-5 w-full font-semibold tracking-wide text-gray-100 bg-blue-300 rounded-full shadow-lg transition duration-300 ease-in cursor-pointer"
                  disabled>
            Converting...
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import Alert from "@/components/Alert.vue";
import axios from "axios";
import {authApi} from "@/stores/auth";

const electron = require('electron');
const fs = require('fs');
const {exec} = require("child_process");

export default defineComponent({
  name: "Convert",
  components: {Alert},
  data() {
    return {
      image: '',
      url: '',
      file: null,
      wait: false,
      alert: false
    }
  },
  methods: {
    onFileChange(e) {
      e.stopPropagation();
      e.preventDefault();
      const target = e.target;
      if (!target) return
      const file = target.files;
      if (!file) return
      this.file = file[0]
      console.log(this.file)
      this.url = URL.createObjectURL(file[0]);
      console.log(file[0], "url", this.url)
      exec(`mkdir imgs`, (error, stdout, stderr) => {
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
      exec(`cp ${file[0].path} ./imgs/`, (error, stdout, stderr) => {
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
    async convert(e) {
      e.preventDefault()
      e.stopPropagation()
      this.wait = true
      const up_file = this.file
      let formData = new FormData();
      formData.append('file', up_file)
      const res = await authApi.post('/files/upload-image/', formData, {headers: {
          "Content-Type": "multipart/form-data"
        },})
      console.log("1")
      if (res.data.mathml.length !== 0) {
        console.log("0")
        let blob = new Blob([res.data.mathml.length], {"type": "text/plain"});
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'output.txt'
        link.click()
        this.wait = false
        return
      }
      console.log("2")
      let command = `docker run -i -v "$(pwd)"/imgs:/usr/src/app/test --rm --name my-app hainv01/img2latex:0.0.4 ${this.image}`
      // let command = `docker run -i -v "$(pwd)"/imgs:/usr/src/app/test --rm --name my-app hainv01/img2latex:0.0.4 a`
      exec(command, (error, stdout, stderr) => {
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
        console.log("3")
        console.log(`stdout: ${stdout}`);
        authApi.patch(`/files/${res.data._id}`, {mathml: stdout})
        let blob = new Blob([stdout], {"type": "text/plain"});
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'output.txt'
        link.click()
        this.wait = false
      });
      console.log("4")
    },
    capture(e) {
      // e.stopPropagation();
      e.preventDefault();
      exec(`mkdir imgs`, (error, stdout, stderr) => {
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
      exec(`xfce4-screenshooter -r -s ./imgs/${r}.png`, (error, stdout, stderr) => {
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
