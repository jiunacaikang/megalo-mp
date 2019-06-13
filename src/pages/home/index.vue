<template lang="pug">
    .container
        .we-row 
            .we-row-item 这是一段文字
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
.container{
    width: 7.5rem;
    display: flex;
    flex-direction: column;
    .we-row{
        display: flex;
        flex-direction: row;
        .we-row-item{
            color: blue;
            font-size:0.32rem;
        }
    }
}
</style>

