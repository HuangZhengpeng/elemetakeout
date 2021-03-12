<template>
  <div>
    <router-view />
    <footer-guide v-show="$route.meta.showFooter" />
  </div>
</template>
<script>
import FooterGuide from "./components/FooterGuide/FooterGuide";
export default {
  components: { FooterGuide },
};
</script>
<style lang="stylus" rel="stylesheet/stylus"></style>
