import Vue from "vue";
import Vuex from "vuex";

import homeModule from "./home";
import mineModule from "./mine";
import root from "./root";

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
    ...root,
    modules: {
        homeModule,
        mineModule,
    },
    strict: debug,
});
