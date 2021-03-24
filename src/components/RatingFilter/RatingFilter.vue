<template>
  <div class="ratings-filter">
    <div class="rating-type border-1px">
      <span class="block" :class="{ active: type==2}" @click="typechange(2)">
        全部<span class="count" >{{all_num}}</span>
      </span>
      <span class="block" :class="{ active: type==0}" @click="typechange(0)">
        推荐<span class="count" >{{recommend_num}}</span>
      </span>
      <span class="block" :class="{ active: type==1}" @click="typechange(1)">
        吐槽<span class="count" >{{disrec_num}}</span>
      </span>
    </div>
    <div class="switch" :class="{ on: needText}">
      <span class="iconfont icon-check_circle" @click="needTextchange"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
import {mapState} from "vuex" 
export default {
    data(){return{
        type:2,//2:全部, 1:吐槽, 0:推荐
        needText:false,
    }},
    computed:{
        ...mapState(["ratings"]),
        chosenRates(){
            let {ratings, type, needText,} =this
            return ratings.filter(rating => {
                if(needText){
                    if(!rating.text){
                        return false
                    }
                    if(type==2){
                        return true
                    }else if(type==rating.rateType){
                        return true
                    }else{
                        return false
                    }

                }else{
                    if(type==2){
                        return true
                    }else if(type==rating.rateType){
                        return true
                    }else{
                        return false
                    }

                }
            });
        },
        disrec_num(){
            return this.ratings.reduce((disrec,rating) => {
                return disrec+=rating.rateType
            },0);
        },
        all_num(){
            return this.ratings.length
        },
        recommend_num(){
            return this.all_num-this.disrec_num
        },


    },
    watch:{
        chosenRates(value){
            this.send(value)
        }
    },
    methods:{
        send(chosenRates){
            this.$emit("receive",chosenRates)
        },
        typechange(type){
            this.type=type;
        },
        needTextchange(){
            this.needText=!this.needText
        },
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"

  .ratings-filter
    .rating-type
      padding: 18px 0
      margin: 0 18px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size: 0
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        line-height: 16px
        border-radius: 1px
        font-size: 12px
        color: rgb(77, 85, 93)
        background: rgba(77, 85, 93, 0.2)
        &.active
          background: $green
          color: #fff
        .count
          margin-left: 2px
          font-size: 8px
    .switch
      padding: 12px 18px
      line-height: 24px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      color: rgb(147, 153, 159)
      font-size: 0
      &.on
        .icon-check_circle
          color: $green
      .icon-check_circle
        display: inline-block
        vertical-align: top
        margin-right: 4px
        font-size: 24px
      .text
        display: inline-block
        vertical-align: top
        font-size: 12px
</style>