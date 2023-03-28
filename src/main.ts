import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "@/plugins/vuetify";
import { loadFonts } from "@/plugins/webfontloader";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { createPinia } from "pinia";
import { useGlobalStore } from "@/stores/global";

const app = createApp(App);
const pinia = createPinia();

loadFonts();

app.component("DeleteIcon", ElementPlusIconsVue.Delete);
app.component("MoreFilled", ElementPlusIconsVue.MoreFilled);
app.use(router).use(pinia).use(vuetify);
app.config.globalProperties.globalStore = useGlobalStore();

app.mount("#app");
