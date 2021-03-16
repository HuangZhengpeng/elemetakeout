<template>
  <div class="msite">
    <!--首页头部-->
    <header-top :title="address.name">
      <router-link class="header_search" slot="left" to='/search'>
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link class="header_login" slot="right" :to="user._id ? '/userinfo' : '/login'">
        <span class="header_login_text" v-if="user._id">
          <i class="iconfont icon-person" ></i>
        </span>
        <span class="header_login_text" v-else>
          <span>登录|注册</span>
        </span>
      </router-link>
    </header-top>
    <!--首页导航-->
    <nav class="msite_nav border-1px">
      <div class="swiper-container" v-if="foodCategorys.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(category, index1) in categorys2D" :key="index1">
            <span
              v-for="(foodtype, index2) in category"
              :key="index2"
              class="link_to_food"
            >
              <div class="food_container">
                <img :src="imgbase + foodtype.image_url" />
              </div>
              <span>{{ foodtype.title }}</span>
            </span>
          </div>
          <!-- <div class="swiper-slide">
            <span
              v-for="(category, index) in foodCategorys.slice(0, 8)"
              :key="index"
              class="link_to_food"
            >
              <div class="food_container">
                <img :src="category.image_url" />
              </div>
              <span>{{ category.title }}</span>
            </span>
          </div>
          <div class="swiper-slide">
            <span
              v-for="(category, index) in foodCategorys.slice(8, 16)"
              :key="index"
              class="link_to_food"
            >
              <div class="food_container">
                <img :src="category.image_url" />
              </div>
              <span>{{ category.title }}</span>
            </span>
          </div> -->
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list border-1px">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <shop-list />
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";

import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import ShopList from "../../components/ShopList/ShopList.vue";

// import {reqCategorys} from "../../api"
import { mapState } from "vuex";
export default {
  components: {
    HeaderTop,
    ShopList,
  },
  computed: {
    ...mapState([
      "address",
      "longitude",
      "latitude",
      "foodCategorys",
      "imgbase",
      "user"
    ]),
    // pages_list: function () {
    //   let length = Math.ceil(this.foodCategorys.length / 8);
    //   let arr = [];
    //   // console.log(length);
    //   for (let i = 0; i < length; i++) {
    //     arr.push(i);
    //   }
    //   return arr;
    // },
    categorys2D: function () {
      let n = 8;
      let length = Math.ceil(this.foodCategorys.length / n);
      let arr = [];
      for (let i = 0; i < length; i++) {
        arr.push(this.foodCategorys.slice(i * n, i * n + n));
      }
      return arr;
    },
  },
  watch: {
    // pages_list: {
    //   deep: true,
    //   handler: function (value) {
    //     this.$nextTick(() => {
    //       new Swiper(".swiper-container", {
    //         loop: true, // 循环模式选项
    //         // 如果需要分页器
    //         pagination: {
    //           el: ".swiper-pagination",
    //         },
    //       });
    //     });
    //   },
    // },
    categorys2D(value) {
      //更新界面后
      this.$nextTick(() => {
        new Swiper(".swiper-container", {
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination",
          },
        });
      });
    },
  },
  // methods:{
  //   async test(){
  //     console.log(111);
  //     const a=await reqCategorys();
  //     console.log(a);

  //   }
  // }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';

.msite {
  width: 100%;

  .msite_nav {
    bottom-border-1px(#e4e4e4);
    margin-top: 45px;
    height: 200px;
    background: #fff;

    .swiper-container {
      width: 100%;
      height: 100%;

      .swiper-wrapper {
        width: 100%;
        height: 100%;

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;

          .link_to_food {
            width: 25%;

            .food_container {
              display: block;
              width: 100%;
              text-align: center;
              padding-bottom: 10px;
              font-size: 0;

              img {
                display: inline-block;
                width: 50px;
                height: 50px;
              }
            }

            span {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 13px;
              color: #666;
            }
          }
        }
      }

      .swiper-pagination {
        >span.swiper-pagination-bullet-active {
          background: #02a774;
        }
      }
    }
  }
}
</style>