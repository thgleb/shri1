import Vue from "vue";
import App from "./App";

import router from './router';

Vue.config.productionTip = false

// Filters
Vue.filter("fDate", function(value) {
  let d = new Date(value);
  return d.getDate() + " " + [
    "января", "февраля", "марта",
    "апреля", "мая", "июня", "июля",
    "августа", "сентября", "октября",
    "ноября", "декабря"
  ][d.getMonth()];
});

Vue.filter("fTime", function(value) {
  let d = value.split(":"),
    h = parseInt(d[0]),
    m = parseInt(d[1]);

  return (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m);
});

Vue.filter("shortify", function(value) {
  return value[0];
});

new Vue({
  el: '#app',
  router,
  template: "<App />",
  components: { App }
})
