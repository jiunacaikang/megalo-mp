<script>
    import {
        mapActions as rootActions,
        mapState as rootState,
        mapGetters as rootGetters,
        mapMutations as rootMutations,
        createNamespacedHelpers
    } from "vuex";
    import Storage from "@/utils/storage";
    import * as TYPES from "@/store/mutation-types";
    const storage = new Storage();

    const {windowWidth, windowHeight, screenHeight, statusBarHeight} = Megalo.getSystemInfoSync();

    export default {
        mpType: 'app',
        onLaunch: function (options) {
        },
        methods: {
        },
        onShow: function (options) {
        },
        onHide: function () {
        },
        onError: function (msg) {
        },
        globalData() {
            return {
                a: 'I am global data',
            }
        }

    }
</script>
