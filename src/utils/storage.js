import Utils from "@/utils/utils";

class Storage {
    constructor() {
        this.isWx = Utils.isMiniProgram;
    }

    /**
     * @description 读取本地存储，
     * @param { string } 要读取的key
     * @todo 读取本地存储
     */
    getStorage(key) {
        let result = null;
        if (this.isWx) {
            result = Megalo.getStorageSync(key);
        } else if (window.localStorage) {
            result = localStorage.getItem(key);
        }
        return result;
    }
    /**
     * @description 设置本地存储，
     * @param { string } 存储的key
     * @param { * } 存储的内容
     * @todo 设置本地存储
     */
    setStorage(key, value) {
        if (this.isWx) {
            Megalo.setStorageSync(key, value);
        } else if (window.localStorage) {
            localStorage.setItem(key, value);
        }
    }
    /**
     * @description 清理所有本地存储，
     * @param { string } 存储的key（为空将清空所有）
     */
    clearStorage() {
        if (this.isWx) {
            Megalo.clearStorageSync();
        } else if (window.localStorage) {
            localStorage.clear();
        }
    }
    /**
     * @description 清理本地存储，
     * @param { string } 存储的key
     */
    removeStorage(key) {
        if (this.isWx) {
            Megalo.removeStorageSync(key);
        } else if (window.localStorage) {
            localStorage.removeItem(key);
        }
    }
}

export default Storage;
