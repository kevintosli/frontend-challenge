import Vue from "vue";
import App from "@/App.vue";
import router from "@routes/router";

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/^d3-/];

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
