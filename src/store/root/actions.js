import INTERFACE from "@/api/interface"
import * as TYPES from "../mutation-types";

const actions = {
    async initData({commit}) {
        const res = await INTERFACE.initData();
        if(res.code == 200){
            commit(TYPES.INIT_DATA,res)
        }
        return res;
    },
};

export default actions;
