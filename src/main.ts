import { createApp } from 'vue'
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import "./samples/node-api";
import router from "./router";

createApp(App)
  .use(createPinia())
  .use(router)
  .mount("#app")
  .$nextTick(() => {
    postMessage({ payload: "removeLoading" }, "*");
  });

