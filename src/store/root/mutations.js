import * as TYPES from "../mutation-types";

const mutations = {
    [TYPES.INIT_DATA](state, data){
        state.initData = data;
    },
};

export default mutations;
