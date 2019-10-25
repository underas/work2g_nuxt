<template>
  <v-app dark>
        <nuxt />
  </v-app>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style lang="scss">
  #bg {
    background: #3a0458 url("~assets/Line/background.png") no-repeat fixed;
    background-size: cover;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .custom-container {
    width: 80%;
    // max-width: 1440px;
    height: 100%;
    margin: 0 auto;
    padding: 16px;
  }
  @media (max-width: 959px) {
    .custom-container {
      width: 100%;
    }
  }
  .web-bg {
    width: 100%;
    min-height: 100vh;
    background-color: #19112b;
    color: #fff;
  }
  .web-space {
    width: 100%;
    height: 60px;
  }
  .my-bullet {
    margin: 0 4px;
    width: 8px;
    height: 8px;
    display: inline-block;
    border-radius: 100%;
    background: #fff;
    opacity: 0.2;
  }

  .my-bullet-w {
    margin: 0 8px;
    width: 10px;
    height: 10px;
    display: inline-block;
    border-radius: 100%;
    background: #fff;
    opacity: 0.2;
  }

  .my-bullet-active {
    opacity: 1;
    background: #ee6daf;
  }

  .picker {
    font-family: "Noto Sans TC", "Arial", "PingFang TC", "Microsoft JhengHei",
    "Helvetica", sans-serif;
  }
</style>
