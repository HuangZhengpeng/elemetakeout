<template>
  <div>
    <router-view />
    <!-- <keep-alive>
      
    </keep-alive> -->
    <footer-guide v-show="$route.meta.showFooter" />
  </div>
</template>
<script>
import FooterGuide from "./components/FooterGuide/FooterGuide";
// import {reqtest} from "./api"
export default {
  components: { FooterGuide },
  mounted() {
    this.$store.dispatch("getaddress");
    // this.$store.dispatch("getUserinfo");
    // let captch = await reqCaptcha()
    // console.log(captch);
    // let rlog=await reqtest("aaa","123")
    // console.log(rlog);
  },
};
</script>
<style lang="stylus" rel="stylesheet/stylus"></style>
