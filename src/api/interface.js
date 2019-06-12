import request from "@/api/request";
import API from "@/api/api";

const Interface = {
    //获取initData
    getInitData() {
        return request.get(`${API.initData}`)
    },

}
export default Interface;

