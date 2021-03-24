<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <li
            class="menu-item"
            v-for="(good, index) in goods"
            :key="index"
            :class="{ current: current_index == index }"
            @click="jumpto(index)"
          >
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon" alt="" />
              {{ good.name }}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul>
          <li
            class="food-list-hook"
            v-for="(good, index) in goods"
            :key="index"
            ref="goodlist"
          >
            <h1 class="title">{{ good.name }}</h1>
            <ul>
              <li
                class="food-item bottom-border-1px"
                v-for="(food, index) in good.foods"
                :key="index"
                @click="showfood(food)"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.image" />
                </div>
                <div class="content">
                  <h2 class="name">{{ food.name }}</h2>
                  <p class="desc">{{ food.description }}</p>
                  <div class="extra">
                    <span class="count">月售{{ food.sellCount }}份</span>
                    <span>好评率{{ food.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{ food.price }}</span>
                    <span class="old" v-if="food.oldPrice"
                      >￥{{ food.oldPrice }}</span
                    >
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cart-control :food="food"></cart-control>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <food ref="food" :food="currentfood"></food>
    <shop-cart></shop-cart>
  </div>
</template>
<script>
import { mapState } from "vuex";
// import BetterScroll from "better-scroll";
import BetterScroll from '@better-scroll/core'
import CartControl from "../../../components/CartControl/CartControl.vue";
import Food from '../../../components/Food/Food.vue';
import ShopCart from '../../../components/ShopCart/ShopCart.vue';
export default {
  components: {
    CartControl,
    Food,
    ShopCart,
  },
  computed: {
    ...mapState(["goods"]),
    current_index() {
      var y = -this.bsf.y;
      var l = 0;
      while (l < this.goodspositions.length && this.goodspositions[l] <= y) {
        l = l + 1;
      }
      return l ? l - 1 : l;
    },
  },
  mounted() {
    this.$store.dispatch("getGoods").then(() => {
      this.$nextTick(() => {
        this.goodspositions = this.$refs.goodlist.map((good) => good.offsetTop);

        this.bsm = new BetterScroll(".menu-wrapper", {
          click: true,
        });

        this.bsf = new BetterScroll(".foods-wrapper", {
          click: true,
          bounce: {
            top: true,
            bottom: false,
          },
          //   probeType: 2,
        });
        // this.bsf.on("scroll");
      });
    });
  },
  data() {
    return {
      bsf: {},
      //   bsm: {},
      goodspositions: [],
      currentfood:{},
    };
  },
  methods: {
    jumpto(index) {
      this.bsf.scrollTo(0, -this.goodspositions[index], 300);
    },
    showfood(food){
        // console.log(11);
        this.currentfood=food;
        // console.log(this.$refs.food);
        this.$refs.food.togglefood();
    }
  },
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl';

.goods {
  display: flex;
  position: absolute;
  top: 225px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        color: $green;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      bottom-border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>