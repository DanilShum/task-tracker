import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

import { i18n, setI18nLanguage } from "@/plugins/i18n";

const app = createApp(App);

app.config.globalProperties.setI18nLanguage = setI18nLanguage;

app.use(i18n as any);
app.use(createPinia());
app.use(router);

app.mount("#app");
