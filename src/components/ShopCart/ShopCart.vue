<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper" @click="toggle">
            <div class="logo" :class="{ highlight: totalnumber }">
              <i class="iconfont icon-shopping_cart" :class="{ highlight: totalnumber }"></i>
            </div>
            <div class="num" v-show="totalnumber">{{ totalnumber }}</div>
          </div>
          <div class="price" :class="{ highlight: foodcharge }">
            ￥{{ foodcharge }}
          </div>
          <div class="desc">另需配送费￥{{ info.deliveryPrice }}元</div>
        </div>
        <div class="content-right">
          <div class="pay not-enough" v-if="info.minPrice > foodcharge">
            {{foodcharge ? "还差" : ""}}￥{{ info.minPrice - foodcharge }}元起送
          </div>
          <div class="pay enough" v-else>结算</div>
        </div>
      </div>
      <div class="shopcart-list"  ref="shopcartlist">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="clearcart">清空</span>
        </div>
        <div class="list-content">
          <ul>
            <li
              class="food"
              v-for="(cartfood, index) in cartfoods"
              :key="index"
            >
              <span class="name">{{ cartfood.name }}</span>
              <div class="price">
                <span>￥{{ cartfood.price }}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cart-control :food="cartfood"></cart-control>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="isShow" @click="toggle"></div>
    </transition>
  </div>
</template>

<script>
import {MessageBox} from "mint-ui"
// import BetterScroll from "better-scroll";
import BetterScroll from '@better-scroll/core'
import { mapState } from "vuex";
import CartControl from "../CartControl/CartControl.vue";
export default {
  components: {
    CartControl,
  },
  mounted(){
    this.bs=new BetterScroll(".list-content",{
      click:true,
    })
  },
  data() {
    return {
      isShow: false,
      bs:{},
    };
  },
  computed: {
    ...mapState(["goods", "info"]),
    cartfoods() {//应该放在vuex管理
      let list = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            list.push(food);
          }
        });
      });
      return list;
    },
    totalnumber() {//应该放在vuex管理
      return this.cartfoods.reduce((n, food) => {
        n += food.count;
        return n;
      }, 0);
    },
    foodcharge() {//应该放在vuex管理
      return this.cartfoods.reduce((n, food) => {
        n += food.count * food.price;
        return n;
      }, 0);
    },
    // bottomstart(){
    //   return -(this.cartfoods.length * 48) + "px";
    // }
    righttop(){
      let pos=0;
      if(this.cartfoods.length==0){
        this.isShow=false;
        return pos
      }else{
        pos=-(this.cartfoods.length * 48+36)
        // console.log(this.cartfoods.length);
        this.bs.refresh()//刷新bs
        if(pos<-257){
          return "-257px"
        }else{
          return pos+"px"
        }
      }
    }
  },
  methods: {
    showcart() {
      this.show = !this.show;
      // this.$refs.shopcartlist.style.bottom="48px"
      if(this.show){
      this.$refs.shopcartlist.style.bottom="48px"

      }else{
              this.$refs.shopcartlist.style.bottom = bottomstart;
      }
      // this.$refs.shopcartlist.style.top=this.topvalue
    },
    clearcart() {
      MessageBox.confirm("确定清空购物车？").then(()=>{
        this.$store.dispatch("clearcart", this.cartfoods);
      },()=>{})
    },
    toggle(){
      // console.log("shit");
      if(this.cartfoods.length==0){
        this.isShow=false
      }else{
        this.isShow=!this.isShow
      }
    }
  },
  watch:{
    isShow(value){
      if(value){
        this.bs.refresh()//刷新bs
        this.$refs.shopcartlist.style.top=this.righttop
      }else{
        this.$refs.shopcartlist.style.top=0
      }
    },
    righttop(value){
      if(this.isShow){
        this.$refs.shopcartlist.style.top=value
      }else{
        this.$refs.shopcartlist.style.top=0
      }
    },
    // cartfoods(){
    //   this.bs.refresh()
    // }
  }
  // watch: {
  //   cartfoods(value) {
  //     this.$refs.shopcartlist.style.bottom = -(value.length * 48) + "px";
  //     if (value.length == 0) {
  //       this.show = false;
  //     }
  //   },
  // },
  // watch: {
  //   cartfoods(value) {
  //     this.$refs.shopcartlist.style.top = -(value.length * 48 + 36) + "px";
  //     if (value.length == 0) {
  //       this.show = false;
  //     }
  //   },
  // },
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl';

.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;

  .content {
    display: flex;
    background: #141d27;
    font-size: 0;
    color: rgba(255, 255, 255, 0.4);

    .content-left {
      flex: 1;

      .logo-wrapper {
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        background: #141d27;

        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          background: #2b343c;

          &.highlight {
            background: $green;
          }

          .icon-shopping_cart {
            line-height: 44px;
            font-size: 24px;
            color: #80858a;

            &.highlight {
              color: #fff;
            }
          }
        }

        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          color: #ffffff;
          background: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
      }

      .price {
        display: inline-block;
        vertical-align: top;
        margin-top: 12px;
        line-height: 24px;
        padding-right: 12px;
        box-sizing: border-box;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 16px;
        font-weight: 700;

        &.highlight {
          color: #fff;
        }
      }

      .desc {
        display: inline-block;
        vertical-align: top;
        margin: 12px 0 0 12px;
        line-height: 24px;
        font-size: 10px;
      }
    }

    .content-right {
      flex: 0 0 105px;
      width: 105px;

      .pay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;

        &.not-enough {
          background: #2b333b;
        }

        &.enough {
          background: #00b43c;
          color: #fff;
        }
      }
    }
  }

  .shopcart-list {
    position: absolute;
    left: 0;
    top: 0;
    // bottom :0;
    z-index: -1;
    width: 100%;

    transition: top 0.3s;
    .list-header {
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);

      .title {
        float: left;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }

      .empty {
        float: right;
        font-size: 12px;
        color: rgb(0, 160, 220);
      }
    }

    .list-content {
      padding: 0 18px;
      max-height: 217px;
      overflow: hidden;
      background: #fff;

      .food {
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        bottom-border-1px(rgba(7, 17, 27, 0.1));

        .name {
          line-height: 24px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .price {
          position: absolute;
          right: 90px;
          bottom: 12px;
          line-height: 24px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 6px;
        }
      }
    }
  }
}

.list-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  backdrop-filter: blur(10px);
  opacity: 1;
  background: rgba(7, 17, 27, 0.6);

  &.fade-enter-active, &.fade-leave-active {
    transition: all 0.5s;
  }

  &.fade-enter, &.fade-leave-to {
    opacity: 0;
  }
}
</style>