import {createApp} from 'vue'
import {createPinia} from "pinia";
import "./style.css";
import App from "./App.vue";
import "./samples/node-api";
import router from "./router";
import {VueClipboard} from '@soerenmartius/vue3-clipboard'


createApp(App)
    .use(createPinia())
    .use(router)
    .use(VueClipboard)
    .mount("#app")
    .$nextTick(() => {
        postMessage({payload: "removeLoading"}, "*");
    });

