<template>
  <div class="web-bg">
    <div class="header">
      <navBar></navBar>
      <v-layout row wrap fill-height justify-center align-center>
        <div class="header__box">
          <img src="@/assets/WebPage/logo.png" alt />
          <div class="header__title">/ 關 於 我 們 /</div>
        </div>
      </v-layout>
    </div>
    <div class="content">
      <div class="content__title">ASTRO + ORG = ASTRORG</div>
      <!-- <v-container> -->
      <div class="custom-container">
        <div class="content__detail">
          <div class="content__detail-wrap">
            <img class="content__detail-img hidden-xs-only" src="@/assets/WebPage/title.svg" alt />
            <p class="content__detail-p">
              我們是由一群熱愛新科技的人所組成的團隊，處在萬物互聯的時代，如何提供便捷且易於使用的服務，
              賦能大眾獲取知識一直以來是我們團隊的使命。 我們提供的服務包括：
            </p>
          </div>
          <v-layout wrap row class="content__detail-services">
            <v-flex class="content__detail-service" xs12 sm4>
              <img src="@/assets/WebPage/service_1.svg" alt />
              <span>個人星盤</span>
            </v-flex>
            <v-flex class="content__detail-service" xs12 sm4>
              <img src="@/assets/WebPage/service_2.svg" alt />
              <span>雙人合盤</span>
            </v-flex>
            <v-flex class="content__detail-service" xs12 sm4>
              <img src="@/assets/WebPage/service_3.svg" alt />
              <span>占星百科</span>
            </v-flex>
          </v-layout>
          <p class="content__detail-p">
            ASTRORG 作為一個占星知識共享平台，我們期望結合資訊科技與專業的占星知識，
            傾力打造顛覆傳統的占星工具，藉由細膩完整的個人星盤、簡便易讀的雙人合盤、豐富有趣的占星百科等服務，
            將占星知識融入日常，力求為占星同好及大眾提供另一種解決生活中各種疑難雜症的方法，期望能為大家的生活帶來一些啟發，
            讓所有人都能一手掌握自己的「星盤」，探索自己並理解他人，擴大自己的占星視界！
          </p>
        </div>
      </div>
      <!-- </v-container> -->
    </div>
    <v-layout wrap row class="actions">
      <v-flex class="action left" xs12 sm6>
        <img class="action__img left-img hidden-xs-only" src="@/assets/WebPage/about-pan.svg" alt />
        <img class="left-img-m hidden-sm-and-up" src="@/assets/WebPage/about-pan-m.svg" alt />
        <div class="action__box">
          <p>
            連結科技與星座，
            <br />帶你探索前所未有的占星體驗，
            <br />線上免費占算！
          </p>
          <div class="action__btn left" @click="toPan">馬上使用</div>
        </div>
      </v-flex>
      <v-flex class="action right" xs12 sm6>
        <img class="action__img right-img hidden-xs-only" src="@/assets/WebPage/line-phone.png" alt />
        <img class="right-img-m hidden-sm-and-up" src="@/assets/WebPage/line-phone.png" alt />
        <div class="action__box right-box">
          <p>免下載、免註冊、免費加入LINE好友，占星排盤不求人，解盤合盤一次滿足！</p>
          <a href="http://nav.cx/bfVg6A9" target="_blank">
            <div class="action__btn right">加入Line好友</div>
          </a>
        </div>
      </v-flex>
    </v-layout>

    <!-- footer -->
    <footerSec></footerSec>
  </div>
</template>

<script>
import navBar from "@/components/webPage/navBar.vue";
import footerSec from "@/components/webPage/footer.vue";

export default {
  name: "aboutUs",
  components: {
    navBar,
    footerSec
  },
  created: function() {},
  mounted() {
    let options = {
      duration: 500,
      offset: 0,
      easing: "easeInOutQuad"
    };
    this.$vuetify.goTo(0, options);
  },
  data() {
    return {};
  },
  methods: {
    toPan() {
      if (this.$cookie.get("al")) {
        // console.log(this.$cookie.get("al"));
        this.$router.push({ path: "/astrolabe" });
      } else {
        // console.log(this.$cookie.get("al"));
        this.$router.push({ path: "/addSelfFile" });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Orbitron&display=swap");
@import "../../scss/_mixin.scss";

.header {
  height: 800px;
  background: url("../../assets/WebPage/about-bg.png") no-repeat center;
  background-size: cover;

  .header__box {
    @include center;
    flex-direction: column;

    img {
      width: 450px;
    }

    .header__title {
      margin-top: 60px;
      color: rgba($color: #fff, $alpha: 0.5);
      font-size: 48px;
    }
  }
}

.content {
  .content__title {
    @include center;
    height: 295px;
    background: url("../../assets/WebPage/about-title.svg") no-repeat center;
    background-size: cover;
    color: rgba($color: #fff, $alpha: 0.8);
    font-family: Orbitron;
    font-size: 48px;
    font-weight: bold;
    text-align: center;
  }

  .content__detail {
    margin-top: 70px;

    .content__detail-wrap {
      position: relative;

      .content__detail-img {
        position: absolute;
        left: -55px;
        width: 33px;
        height: 56px;
      }
    }

    .content__detail-p {
      font-size: 24px;
    }

    .content__detail-services {
      margin: 54px 0 48px 0;

      .content__detail-service {
        @include center;
        font-size: 24px;

        img {
          width: 80px;
          height: 80px;
          margin-right: 32px;
        }
      }
    }
  }
}

.actions {
  margin-top: 24px;

  .action {
    overflow: hidden;
    @include flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    width: 50%;
    height: 450px;
    padding: 20px;

    &.left {
      background-image: linear-gradient(119deg, #fa71cd, #c471f5);
    }

    &.right {
      background-image: linear-gradient(123deg, #7163ff, #cfccf0);
    }

    .action__img {
      position: absolute;
      z-index: 0;

      &.left-img {
        left: 0;
        bottom: 0;
        width: 49%;
      }

      &.right-img {
        left: 0px;
        bottom: -52px;
        width: 55%;
      }
    }

    .action__box {
      a {
        text-decoration: none;
        color: #fff;
      }

      position: relative;
      z-index: 1;
      @include flex;
      flex-direction: column;
      align-items: flex-start;
      width: 338px;
      font-size: 24px;

      .action__btn {
        margin-top: 32px;
        @include center;
        cursor: pointer;
        width: 240px;
        height: 64px;
        border-radius: 32px;
        border: solid 2px #ffffff;

        &.left {
          background-image: linear-gradient(103deg, #de44c7, #f66ca7);
        }

        &.right {
          background-color: #00c300;
        }
      }
    }
  }
}
@media (max-width: 959px) {
  .content {
    .content__title {
      height: 220px;
      background: url("../../assets/WebPage/about-title.svg") no-repeat center;
      background-size: cover;
      font-size: 24px;
    }
  }
}
@media (max-width: 599px) {
  .header {
    height: 100vh;
    background: url("../../assets/WebPage/about-bg-m.png") no-repeat center;
    background-size: cover;

    .header__box {
      img {
        width: 230px;
      }

      .header__title {
        margin-top: 60px;
        font-size: 24px;
      }
    }
  }

  .content {
    .content__title {
      height: 137px;
      background: url("../../assets/WebPage/about-title.svg") no-repeat center;
      background-size: cover;
      font-size: 24px;
    }

    .content__detail {
      margin-top: 40px;

      .content__detail-p {
        font-size: 16px;
      }

      .content__detail-services {
        margin: 0 0 40px 0;

        .content__detail-service {
          margin-top: 40px;
          @include center;
          font-size: 24px;

          img {
            width: 80px;
            height: 80px;
            margin-right: 32px;
          }
        }
      }
    }
  }
  .actions {
    margin-top: 24px;

    .action {
      width: 100%;
      height: 233px;
      padding: 20px;

      &.left {
        justify-content: flex-start;
      }

      &.right {
      }

      .left-img-m {
        position: absolute;
        right: 0;
        bottom: 0;
        height: 180px;
      }

      .right-img-m {
        position: absolute;
        left: -10px;
        top: 5px;
        height: 230px;
      }

      .action__box {
        font-size: 16px;

        &.right-box {
          width: 180px;
        }

        .action__btn {
          margin-top: 30px;
          width: 160px;
          height: 40px;
        }
      }
    }
  }
}
</style>