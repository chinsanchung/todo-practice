import Vue from "vue";
import { store } from "./store/store";
import "./reset.css";
import "./css/filter-btn.css";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faChevronDown,
    faCheckCircle,
    faTimes,
    faCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faChevronDown, faCheckCircle, faTimes, faCircle);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
    store: store,
    render: h => h(App)
}).$mount("#app");
