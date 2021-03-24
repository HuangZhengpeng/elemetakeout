<template>
    <div class="cartcontrol">
        <div class="iconfont icon-remove_circle_outline" v-if="food.count" @click.stop="update_count(false)"></div>
        <div class="cart-count" v-if="food.count">{{food.count}}</div>
        <div class="iconfont icon-add_circle" @click.stop="update_count(true)"></div>
    </div>
</template>
<script>
export default {
    props:["food"],
    methods:{
        update_count(isAdd){
            this.$store.dispatch("update_count",{isAdd,food:this.food})
        },
        add(){
            if(this.food.count ){
            this.food.count++;
            }else{
            this.food.count=1
            }
            this.$forceUpdate()
        },
        remove(){
            this.food.count--
            this.$forceUpdate()

        }
    }
    
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

    .icon-remove_circle_outline
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color $green
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .icon-add_circle
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color $green
</style>