import INTERFACE from "@/api/interface"

const actions = {
    async initData({commit}) {
        const res = await INTERFACE.initData();
        if(res.code == 200){
            commit(res)
        }
        return res;
    },
};

export default actions;
