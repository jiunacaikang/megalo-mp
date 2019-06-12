import App from "./App";
import Vue from "vue";
import store from "@/store";
import VHtmlPlugin from "@megalo/vhtml-plugin";
import "@/css/reset.less";
import Storage from "@/utils/storage";

const storage = new Storage();

const {windowWidth} = Megalo.getSystemInfoSync();
const rem2px = rem => rem * windowWidth / 7.5;

Vue.use(VHtmlPlugin);
Vue.mixin({
    methods: {
        switchTab(url) {
            Megalo.switchTab({url: url});
        },
        navigatePageTo(url) {
            Megalo.navigateTo({url: url});
        },
        showLoading(msg = '加载中') {
            Megalo.showLoading({
                title: msg,
                mask: true
            });
        },
        hideLoading() {
            Megalo.hideLoading();
        },
        toast(msg, icon = 'none', duration = 2000) {
            Megalo.showToast({
                title: msg || 'toast',
                icon: icon,
                duration: duration
            })
        },
        noNetToast() {
            this.toast('无网络，请检查您的网络连接是否正常')
        },
        navigateBack(num) {
            Megalo.navigateBack({delta: Math.abs(num)});
        },
        setStorage(key, val) {
            storage.setStorage(key, val)
        },
        getStorage(key) {
            return storage.getStorage(key)
        },
        removeStorage(key) {
            storage.removeStorage(key)
        },
        rem2px,
        //高亮词分割
        splitHightlight(str, keyName) {
            if (!keyName) return str;
            if(/^\w*$/.test(keyName)){//数字字母下划线
                str = str.replace(new RegExp(`${keyName}`, 'g'), `_;;_${keyName}_;;_`).replace(/^_;;_|_;;_$/g, '');
                return str.split('_;;_');
            }else{
                keyName = encodeURIComponent(keyName);
                str = encodeURIComponent(str).replace(new RegExp(`${keyName}`, 'g'), `_;;_${keyName}_;;_`).replace(/^_;;_|_;;_$/g, '');
                return decodeURIComponent(str).split('_;;_');
            }
        },
    }
});
Object.defineProperty(Vue.prototype, "$store", {
    get: function get() {
        return store;
    }
});
const app = new Vue(App);

app.$mount();export default {
    config: {
        // pages的第一个页面会被编译成首页
        pages: [
            'pages/home/index',
            'pages/mine/index',
        ],
        tabBar: {
            color: "#333",
            selectedColor: "#007d37",
            list:[
                {
                    iconPath: "static/assets/images/tabIcon/home.png",
                    selectedIconPath: "static/assets/images/tabIcon/home_on.png",
                    pagePath: 'pages/home/index',
                    text: 'index'
                },
                {
                    iconPath: "static/assets/images/tabIcon/mine.png",
                    selectedIconPath: "static/assets/images/tabIcon/mine_on.png",
                    pagePath: 'pages/mine/index',
                    text: 'mine'
                }
            ]
        },
        networkTimeout: {
            request: 10000, // 请求超时时间设置
        },
    }
};

