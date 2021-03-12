<template>
  <footer class="footer_guide border-1px">
    <span v-for="(item, index) in items" :key="index"  class="guide_item" :class="{on: isCurrent(item.router_path)}"  @click="goto(item.router_path)">
      <span class="item_icon">
        <i :class="item.iconname"></i>
      </span>
      <span>{{item.name}}</span>
    </span>
    <!-- <a href="javascript:;" class="guide_item"> 
      <span class="item_icon">
        <i class="iconfont icon-search"></i>
      </span>
      <span>搜索</span>
    </a>
    <a href="javascript:;" class="guide_item">
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>订单</span>
    </a>
    <a href="javascript:;" class="guide_item">
      <span class="item_icon">
        <i class="iconfont icon-geren"></i>
      </span>
      <span>我的</span>
    </a> -->
  </footer>
</template>
<script>
export default {
    data(){return{
        items:[
            {name:"外卖", iconname:"iconfont icon-waimai", router_path:"/msite"},
            {name:"搜索", iconname:"iconfont icon-search", router_path:"/search"},
            {name:"订单", iconname:"iconfont icon-dingdan", router_path:"/order"},
            {name:"我的", iconname:"iconfont icon-geren", router_path:"/profile"},
        ],
    }},
    methods:{
        goto(path){
            this.$router.replace(path)
            // console.log();
        },
        isCurrent(path){
            return path==this.$route.path
        },
    },
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixins.styl"
  .footer_guide
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 50px
    display flex
    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      margin 5px
      color #999999
      &.on
        color #02a774
      span
        font-size 12px
        margin-top 2px
        margin-bottom 2px
        .iconfont
          font-size 22px
</style>