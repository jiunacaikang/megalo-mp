<template lang="pug">
    div
        .title mine页面
</template>

<script>
    export default {  
        name: "index",
        components:{},
        data() {
            return {
            }
        },
        computed: {
        },
        onShow(){
            //console.log(dd === my)
            this.toast();
        },
        onHide(){
        },
        onReady() {
        },
        onLoad(){
        },
        methods: {
        },
        onPageScroll(){
        },
        onReachBottom() {
        },
        onPullDownRefresh() {
        },
        onShareAppMessage(res){
        },
    };
</script>
<style lang="less">
.title{
    width: 80%;
    height: 1rem;
    line-height: 1rem;
    background: #efefef;
    color:#000;
    border-radius: 0.1rem;
    margin:1rem auto;
    font-size: 0.4rem;
    text-align: center;
}
</style>

