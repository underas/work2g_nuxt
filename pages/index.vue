<template>
  <div class="ladding web-bg">
    <div class="header">
      <navBar :afterLogin="afterLogin"></navBar>
      <div class="custom-container">
        <v-layout row wrap fill-height align-center>
          <v-flex class="header__wrap" xs12 md5>
            <div class="header__text">
              <div class="header__title">ASTRORG</div>
              <div class="header__sub">INTERCONNECTED ECOSYSTEM</div>
              <div class="header__content">專屬於你的隨身占星師</div>
              <div class="header__btn cta-btn" @click="toPan">深入了解</div>
            </div>
          </v-flex>
          <v-flex xs12 md7 fill-height class="header-pan hidden-sm-and-down">
            <img src="@/assets/WebPage/header-pan.svg" alt />
          </v-flex>
        </v-layout>
      </div>
    </div>
    <div class="services">
      <!-- <v-container fill-height> -->
      <v-layout row wrap fill-height align-center class="px-3">
        <v-flex class="services__wrap" xs4>
          <v-layout class="services__item" align-center justify-center column>
            <a @click="$vuetify.goTo('#singlePan')">
              <img class="services__item__img" src="@/assets/WebPage/service_1.svg" alt />
            </a>
            <div class="services__item__title">個人星盤</div>
            <p
              class="services__item__content hidden-sm-and-down"
            >想知道自己上升、太陽、月亮星座等分別在哪？十二宮位又落在何處？「個人星盤」帶你深入探索自己。</p>
          </v-layout>
        </v-flex>
        <v-flex class="services__wrap" xs4>
          <v-layout class="services__item" align-center justify-center column>
            <a @click="$vuetify.goTo('#doublePan')">
              <img class="services__item__img" src="@/assets/WebPage/service_2.svg" alt />
            </a>
            <div class="services__item__title">雙人合盤</div>
            <p
              class="services__item__content hidden-sm-and-down"
            >你和他適合嗎？我們該怎麼相處呢？「星座合盤」為你解讀每一段關係中的奧妙。</p>
          </v-layout>
        </v-flex>
        <v-flex class="services__wrap" xs4>
          <v-layout class="services__item" align-center justify-center column>
            <a @click="$vuetify.goTo('#astrology')">
              <img class="services__item__img" src="@/assets/WebPage/service_3.svg" alt />
            </a>
            <div class="services__item__title">占星百科</div>
            <p
              class="services__item__content hidden-sm-and-down"
            >提供豐富有趣的十二星座知識、解析及運勢，讓你更深入讀懂自己與身邊的人最真實的面貌。</p>
          </v-layout>
        </v-flex>
      </v-layout>
      <!-- </v-container> -->
    </div>
    <section class="spaceout">
      <v-layout column align-center justify-center fill-height>
        <div class="spaceout__title">ASTRORG Bar surfing</div>
        <img class="spaceout__spaceout" src="@/assets/WebPage/space-out.png" alt="spaceout" />
        <div class="spaceout__date">2019.09.26-2019.10.06</div>
        <a href="https://spaceout.astrorg.com" target="_blank">
          <div class="spaceout__btn">了解更多 Space out !</div>
        </a>
      </v-layout>
    </section>
    <div class="about">
      <div class="about__wrap">
        <div class="about__title">ASTRORG</div>
        <p
          class="about__content"
        >結合科技與星座，在傳統的星座領域突破與創新，打造前所未有的占星體驗，讓所有人都能一手掌握自己的「星盤」，探討星座、星體與人之間的互動關係。</p>
        <!-- <div class="about__sub">星座不再只是遙不可及的恆星</div> -->
        <div class="pan__btn cta-btn" @click="$router.push({ name: 'aboutUs' })">認識 ASTRORG</div>
      </div>
    </div>
    <!-- 1 -->
    <div id="singlePan" class="section sec-1">
      <div class="custom-container">
        <v-layout row wrap fill-height align-center>
          <v-flex class="sec__box" xs12 md5>
            <img class="hidden-md-and-up" src="@/assets/WebPage/title.svg" alt />
            <div class="sec__title">
              <img class="hidden-sm-and-down" src="@/assets/WebPage/title.svg" alt />
              <span>個人星盤</span>
            </div>
            <!-- <div class="sec__sub">比你更懂你，探索自我的無限可能</div> -->
            <p class="sec__content">線上創建本命盤，提供詳盡的個人星座、宮位、相位等資訊，深入剖析個人特質與優劣勢，從中探索並挖掘自己的無限可能！</p>
            <div class="sec__btn" @click="toPan()">馬上使用</div>
          </v-flex>
          <v-flex class="sec__space sec__space-1" xs12 md7>
            <img class="hidden-md-and-up" src="@/assets/WebPage/sec1-m.png" alt />
          </v-flex>
        </v-layout>
      </div>
    </div>
    <!-- 2 -->
    <div id="doublePan" class="section sec-2">
      <div class="custom-container">
        <v-layout row wrap fill-height align-center>
          <v-flex class="sec__box" xs12 md5 order-md2>
            <img class="hidden-md-and-up" src="@/assets/WebPage/title.svg" alt />
            <div class="sec__title">
              <img class="hidden-sm-and-down" src="@/assets/WebPage/title.svg" alt />
              <span>雙人合盤</span>
            </div>
            <!-- <div class="sec__sub">比你更懂你，探索自我的無限可能</div> -->
            <p class="sec__content">結合兩人本命盤進行組合與占算，分析兩人的契合度與存在問題， 獨有的評等功能，揭露兩人的互動關係與速配指數！</p>
            <div class="sec__btn" @click="toDoublePan()">馬上占算</div>
          </v-flex>
          <v-flex class="sec__space sec__space-2" xs12 md7 order-md1>
            <img class="hidden-md-and-up" src="@/assets/WebPage/sec2-m.svg" alt />
          </v-flex>
        </v-layout>
      </div>
    </div>
    <!-- 3 -->
    <div id="astrology" class="section sec-3">
      <div class="custom-container">
        <v-layout row wrap fill-height align-center>
          <v-flex class="sec__box" xs12 md5>
            <img class="hidden-md-and-up" src="@/assets/WebPage/title.svg" alt />
            <div class="sec__title">
              <img class="hidden-sm-and-down" src="@/assets/WebPage/title.svg" alt />
              <span>占星百科</span>
            </div>
            <!-- <div class="sec__sub">比你更懂你，探索自我的無限可能</div> -->
            <p class="sec__content">精心彙整占星相關解讀資料，從基礎入門到中高階知識一應俱全，提供占星同好們快速學習與查詢，是占星路上必備的百科全書！</p>
            <div class="sec__btn" @click.stop="devDialog = true">學習更多</div>
          </v-flex>
          <v-flex class="sec__space sec__space-3" xs12 md7>
            <img class="hidden-md-and-up" src="@/assets/WebPage/sec3-m.svg" alt />
          </v-flex>
        </v-layout>
      </div>
    </div>
    <!-- Line -->
    <div class="add-line">
      <div class="add-line__bg custom-container">
        <v-layout row wrap fill-height align-center>
          <v-flex class="line__box" xs12 md6 order-md2>
            <div class="line__wrap">
              <div class="line__title">加入 ASTRORG Line！</div>
              <div class="line__sub">加入ASTRORG 官方帳號，免下載星盤帶著走！</div>
              <div class="line__add">
                <a href="http://nav.cx/bfVg6A9" target="_blank">
                  <img src="@/assets/WebPage/line-btn.png" alt />
                </a>
              </div>
            </div>
          </v-flex>
          <v-flex class="line__img" xs12 md6 order-md1>
            <img src="@/assets/WebPage/line-phone.png" alt />
          </v-flex>
        </v-layout>
      </div>
    </div>
    <!-- pan -->
    <div class="pan">
      <div class="custom-container">
        <v-layout row wrap fill-height align-center>
          <v-flex class="pan__box" xs12 md6>
            <div class="pan__wrap">
              <div class="pan__title">連結科技與星座，</div>
              <div class="pan__title">帶你探索前所未有的占星體驗</div>
              <div class="pan__sub hidden-sm-and-down">星盤免下載，加入好友直接使用！</div>
              <div class="pan__btn cta-btn" @click="toPan">線上探索</div>
            </div>
          </v-flex>
          <v-flex class="pan__img" xs12 md6>
            <img src="@/assets/WebPage/phone.png" alt />
          </v-flex>
        </v-layout>
      </div>
    </div>
    <!-- footer -->
    <footerSec></footerSec>

    <!-- 開發中Box -->
    <v-dialog v-model="devDialog" max-width="560">
      <v-card class="dev__box">
        <v-container fill-height class="dev__content">
          <v-layout fill-height column align-center justify-center>
            <img class="dev__img" src="@/assets/WebPage/shovel.svg" alt />
            <div class="dev__title">功能開發中！請稍候！</div>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>

    <!-- 請先登入 -->
    <v-dialog v-model="loginDialog" max-width="290">
      <v-card class="login__box">
        <v-container fill-height class="login__content">
          <v-layout fill-height column align-center justify-center>
            <div class="login__title">請先登入！</div>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import navBar from "@/components/webPage/navBar.vue";
  import footerSec from "@/components/webPage/footer.vue";
  import {astrolabeAPI} from "../api/AstrolabeAPI";

  export default {

    components: {
      navBar,
      footerSec
    },
    data() {
      return {
        devDialog: false,
        loginDialog: false,
      }
    },
    computed: {
      afterLogin() {
        return this.$store.state.afterLogin;
      }
    },
    mounted() {
      //判斷是否line登入取消
      if (this.$route.query.error === "access_denied") {
        this.$router.push({ path: "/" });
      }

      //判斷是有登入
      if (this.$cookie.get("al")) {
        this.$store.dispatch("setLoginStatus", true);
        //判斷使用者有無帳號在本系統
        astrolabeAPI
          .Login(this.$cookie.get("utd"))
          .then(data => {
            this.$store.state.lineAccount = this.$cookie.get("utd");
            window.localStorage["token"] = data.Data.Token;
            // fb登入後第一次有資料直接導向星盤
            if (this.$cookie.get("afterFB")) {
              this.$cookie.delete("afterFB");
              this.$router.push({ path: "/astrolabe" });
            }
          })
          .catch(err => {
            //沒帳號 去新增
            this.$router.push({ path: "/addSelfFile" });
          });
      }

      //fitchData是在line回來時才會觸發
      this.fitchData();
      //---------------------------------------------------------------------
      //facebook部分
      window.fbAsyncInit = function() {
        FB.init({
          appId: process.env.VUE_APP_appId, //正式
          //appId: "404578130169469", //本機
          //appId: "2187905221507692", //測試機
          cookie: true,
          xfbml: true,
          version: "v2.9"
        });
        FB.AppEvents.logPageView();
        // Get FB Login Status
        FB.getLoginStatus(response => {
          // console.log("res", response); // 這裡可以得到 fb 回傳的結果
        });
      };
    },

    methods: {
      toPan() {
        if (this.$cookie.get("al")) {
          // console.log(this.$cookie.get("al"));
          this.$router.push({ path: "/astrolabe" });
        } else {
          // console.log(this.$cookie.get("al"));
          // this.$router.push({ path: "/addSelfFile" });
          this.loginDialog = true;
        }
      },
      toDoublePan() {
        if (this.$cookie.get("al")) {
          astrolabeAPI
            .Login(this.$cookie.get("utd"))
            .then(data => {
              this.$router.push({ path: "/astrolabeDBL" });
            })
            .catch(err => {
              this.$store.commit("updateLoadingStatus", { Loading: false });
            });
        } else {
          // this.$router.push({ path: "/addSelfFile" });
          this.loginDialog = true;
        }
      },
      //-----------------------------------------------------------------------------
      fitchData() {
        if (this.$route.query.state === "abcde" && !this.$cookie.get("al")) {
          let lineData = {
            grant_type: "authorization_code",
            redirect_uri: process.env.VUE_APP_return_url, //正式
            client_id: process.env.VUE_APP_client_id, // 正式
            client_secret: process.env.VUE_APP_client_secret, //正式
            code: this.$route.query.code
          };
          let passData = this.Qs.stringify(lineData);

          astrolabeAPI.Line_LoginAuth(passData).then(data => {
            window.localStorage["LT"] = data.access_token;

            astrolabeAPI.Get_Line_data().then(data => {
              // console.log(data);
              this.$cookie.set("name", data.displayName, 7);
              this.$cookie.set("imgUrl", data.pictureUrl, 7);
              this.$cookie.set("al", true, 7);
              this.$cookie.set("utd", data.userId, 7); // user token id
              this.$cookie.set("LM", "Line", 7);

              this.$store.dispatch("setLoginStatus", true);

              astrolabeAPI
                .Login(this.$cookie.get("utd"))
                .then(data => {
                  this.$store.state.lineAccount = this.$cookie.get("utd");
                  window.localStorage["token"] = data.Data.Token;
                  this.$router.push({ path: "/astrolabe" }); //上限或測試改網址
                })
                .catch(err => {
                  this.$router.push({ path: "/addSelfFile" });
                });
            });
          });
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import url("https://fonts.googleapis.com/css?family=Orbitron&display=swap");
  @import "../scss/_mixin.scss";

  //spaceout
  .spaceout {
    background: url("../assets/WebPage/spaceoutbg.jpg") no-repeat center;
    background-size: cover;
    height: 925px;

    .spaceout__title {
      background: url("../assets/WebPage/titlebg.svg") no-repeat center;
      background-size: cover;
      width: 550px;
      height: 105px;
      @include center;
      color: rgba($color: #d5cadc, $alpha: 0.76);
      font-size: 32px;
      font-family: "Orbitron";
    }

    .spaceout__spaceout {
      margin: 35px 0 20px;
    }

    .spaceout__date {
      font-size: 32px;
      color: rgba($color: #d5cadc, $alpha: 0.76);
      font-family: "Orbitron";
    }

    a {
      text-decoration: none;
      color: #fff;
    }

    .spaceout__btn {
      @include center;
      font-family: "Noto Sans TC";
      width: 300px;
      height: 60px;
      border-radius: 40px;
      border: solid 3px rgba(255, 255, 255, 0.71);
      background-image: linear-gradient(101deg, #96acf1, #be96f1 42%, #fc5cae);
      font-size: 24px;
      margin-top: 40px;
      cursor: pointer;
    }
  }

  .ladding {
    overflow: hidden;
  }

  .header {
    position: relative;
    height: 800px;
    background: url("../assets/WebPage/header2.png") no-repeat center;
    background-size: cover;
    // padding-left: 90px;

    .header__wrap {
      position: relative;
      z-index: 2;
      @include center;

      .header__text {
        margin-top: 220px;

        .header__title {
          font-size: 80px;
          font-weight: bold;
          font-family: "Orbitron";
          letter-spacing: 1px;
        }

        .header__sub {
          font-size: 24px;
          letter-spacing: 4.5px;
        }

        .header__content {
          font-size: 24px;
          margin-top: 16px;
        }

        .header__btn {
          margin-top: 64px;
        }
      }
    }

    .header-pan {
      @include flex;
      justify-content: flex-end;
      align-items: flex-end;

      img {
        width: 710px;
        height: 710px;
      }
    }
  }

  .services {
    background: #19112b url("../assets/WebPage/service.png") no-repeat center;
    background-size: cover;
    width: 100%;
    height: 465px;
    //height: 335px;

    .services__item {
      color: #fff;

      .services__item__img {
        width: 160px;
        height: 160px;
      }

      .services__item__title {
        font-size: 24px;
        margin: 40px 0 32px;
      }

      .services__item__content {
        font-size: 16px;
        max-width: 288px;
        padding: 0 8px;
      }
    }
  }

  .about {
    position: relative;
    background: #19112b url("../assets/WebPage/about.png") no-repeat center;
    background-size: cover;
    //background-attachment: fixed;
    @include center;
    height: 415px;

    &::before {
      content: "";
      position: absolute;
      background: url("../assets/WebPage/wave.svg") no-repeat top;
      background-size: cover;
      height: 100px;
      width: 100%;
      bottom: -1px;
    }

    .about__wrap {
      width: 720px;
      color: #fff;
      text-align: center;
      @include center;
      flex-direction: column;

      .about__title {
        font-size: 32px;
        font-family: "Orbitron";
      }

      .about__content {
        font-size: 16px;
        margin: 40px 0;
      }

      .about__sub {
        font-size: 20px;
      }
    }
  }

  .section {
    overflow: hidden; //
    @include center;
    height: 800px;

    &.sec-1 {
      background: #19112b url("../assets/WebPage/sec1.png") no-repeat center;
      background-size: cover;
    }

    &.sec-2 {
      background: #19112b url("../assets/WebPage/sec2.svg") no-repeat center;
      background-size: cover;
    }

    &.sec-3 {
      background: #19112b url("../assets/WebPage/sec3.svg") no-repeat center;
      background-size: cover;
    }

    .sec__box {
      .sec__title {
        position: relative;
        display: flex;
        align-items: center;

        img {
          position: absolute;
          width: 33px;
          height: 56px;
          left: -50px;
        }

        span {
          font-size: 40px;
        }
      }

      .sec__sub {
        font-size: 24px;
        //width: 440px;
      }

      .sec__content {
        // width: 440px;
        margin-top: 26px;
        font-size: 16px;
      }

      .sec__btn {
        margin-top: 50px;
        @include center;
        font-size: 24px;
        width: 240px;
        height: 64px;
        border-radius: 32px;
        border: solid 1px #979797;
        background-image: linear-gradient(103deg, #de44c7, #f66ca7);
        cursor: pointer;
      }
    }
  }

  .add-line {
    background: #19112b url("../assets/WebPage/add-line.svg") no-repeat center;
    background-size: cover;
    height: 440px;

    .line__img {
      @include flex;
      justify-content: flex-end;

      img {
        position: relative;
        top: 20px;
      }
    }

    .line__box {
      .line__wrap {
        @include center;
        flex-direction: column;

        .line__title {
          font-size: 40px;
          font-weight: 600;
          text-align: center;
        }

        .line__sub {
          text-align: center;
          font-size: 20px;
          margin: 24px 0 30px;
        }

        .line__add {
          .img {
            width: 275px;
            height: 68px;
          }
        }
      }
    }
  }

  .pan {
    background: #19112b url("../assets/WebPage/pan-bg.svg") no-repeat center;
    background-size: cover;
    height: 800px;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      background: url("../assets/WebPage/footer.svg") no-repeat top;
      background-size: cover;
      height: 337px;
      width: 100%;
      bottom: -180px;
    }

    .pan__box {
      position: relative;
      z-index: 2;

      .pan__wrap {
        .pan__title {
          font-size: 40px;
        }

        .pan__sub {
          opacity: 0.5;
          font-size: 16px;
          margin: 16px 0 40px;
        }
      }
    }

    .pan__img {
      @include center;
      height: 100%;

      img {
      }
    }
  }

  .cta-btn {
    width: 271px;
    height: 64px;
    border-radius: 32px;
    border: solid 2px rgba(255, 255, 255, 0.81);
    background-image: linear-gradient(102deg, #fa71cd, #c471f5);
    font-size: 24px;
    @include center;
    cursor: pointer;
  }

  //開發中
  .dev__box {
    height: 447px;
    border-radius: 4px;
    font-family: "Microsoft JhengHei", "Helvetica", sans-serif;
    box-shadow: 0 2px 13px 0 rgba(255, 255, 255, 0.4);
    border: solid 1px rgba(255, 255, 255, 0.2);
    background-color: rgba(255, 255, 255, 0.9);

    .dev__img {
      width: 216px;
      height: 203px;
    }

    .dev__title {
      font-size: 20px;
      font-weight: 600;
      color: #19112b;
      margin-top: 86px;
    }
  }

  //登入
  .login__box {
    font-family: "Microsoft JhengHei", "Helvetica", sans-serif;
    border-radius: 4px;
    background-color: #19112b;
    box-shadow: 0 2px 13px 0 rgba(255, 255, 255, 0.4);
    border: solid 1px rgba(255, 255, 255, 0.2);
    font-weight: 600;
    color: #fff;
    height: 150px;
    font-size: 24px;
  }

  @media (max-width: 959px) {
    //spaceout
    .spaceout {
      position: relative;
      background: url("../assets/WebPage/spaceout-m.jpg") no-repeat center;
      background-size: cover;
      height: 92vh;

      .spaceout__title {
        position: absolute;
        background: url("../assets/WebPage/titlebg-m.svg") no-repeat center;
        width: 246px;
        height: 58px;
        font-size: 16px;
        left: 0;
        top: 20%;
      }

      .spaceout__spaceout {
        margin: 35px 0 20px;
        width: 88%;
      }

      .spaceout__date {
        position: absolute;
        font-size: 14px;
        right: 25px;
        bottom: 30%;
      }

      .spaceout__btn {
        width: 180px;
        height: 36px;
        border-radius: 24px;
        font-size: 14.5px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 15%;
      }
    }
    .header {
      background: url("../assets/WebPage/header-m_2.png") no-repeat center;
      background-size: cover;
      height: 100vh;
      padding: 0;

      .header__wrap {
        @include center;

        height: 100vh;

        .header__text {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 0px;

          .header__sub {
            text-align: center;
          }

          .header__content {
            margin-top: 16px;
          }

          .header__btn {
            margin-top: 64px;
          }
        }
      }
    }
    .services {
      //background: none;
      height: 182px;

      .services__item {
        .services__item__img {
          width: 83px;
          height: 83px;
        }

        .services__item__title {
          margin: 20px 0 0 0;
        }
      }
    }
    .about {
      //height: 310px;
      .about__wrap {
        width: 90vw;
      }
    }
    .section {
      height: auto;

      &.sec-1,
      &.sec-2,
      &.sec-3 {
        background: none;
      }

      .sec__box {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;

        .sec__title {
          span {
            margin: 25px 0 16px;
          }
        }

        .sec__content {
          width: 90vw;
          margin-top: 24px;
        }

        .sec__btn {
          margin-top: 32px;
        }
      }

      .sec__space {
        img {
          position: relative;
          width: 100vw;
        }

        &.sec__space-1 {
          img {
            left: -16px;
            top: 0px;
          }
        }

        &.sec__space-2 {
          img {
            left: -16px;
            // top: -20px;
          }
        }

        &.sec__space-3 {
          img {
            left: -16px;
            // top: -35px;
          }
        }
      }
    }
    .add-line {
      background: none;
      height: auto;

      .add-line__bg {
        background-color: rgba(255, 255, 255, 0.15);
      }

      .line__box {
        padding: 30px 0;

        .line__wrap {
          .line__sub {
            margin: 16px 0 46px;
          }
        }
      }

      .line__img {
        padding: 30px 0;
        @include flex;
        justify-content: center;

        img {
          position: relative;
          top: 0px;
        }
      }
    }
    .pan {
      background: url("../assets/WebPage/pan-bg-m.svg") no-repeat top;
      height: auto;
      background-size: contain;
      padding-bottom: 50px;

      .pan__box {
        .pan__wrap {
          margin: 112px 0;
          @include flex;
          flex-direction: column;
          align-items: center;

          .pan__btn {
            margin-top: 34px;
          }
        }
      }

      .pan__img {
        @include center;

        img {
          margin-bottom: 60px;
          width: 70vw;
          height: auto;
        }
      }
    }
  }

  @media (max-width: 599px) {
    .header {
      .header__wrap {
        .header__text {
          .header__title {
            font-size: 48px;
          }

          .header__sub {
            font-size: 16px;
            letter-spacing: 3px;
          }

          .header__content {
            font-size: 16px;
          }
        }
      }
    }
    .services {
      .services__item {
        .services__item__title {
          font-size: 16px;
        }
      }
    }
    .about {
      //height: 310px;
      .about__wrap {
        .about__title {
          font-size: 24px;
        }

        .about__content {
          font-size: 16px;
        }
      }
    }
    .section {
      .sec__box {
        .sec__title {
          span {
            font-size: 32px;
          }
        }

        .sec__sub {
          font-size: 16px;
        }

        .sec__btn {
          margin-top: 32px;
          font-size: 16px;
          width: 160px;
          height: 40px;
        }
      }
    }
    .add-line {
      .line__box {
        .line__wrap {
          .line__title {
            font-size: 24px;
          }

          .line__sub {
            font-size: 16px;
          }

          .line__add {
            img {
              width: 165px;
              height: 41px;
            }
          }
        }
      }
    }
    .pan {
      //height: 800px;
      .pan__box {
        .pan__wrap {
          .pan__title {
            font-size: 24px;
          }
        }
      }

      .pan__img {
        img {
          width: 90vw;
          height: auto;
        }
      }
    }
    .cta-btn {
      width: 160px;
      height: 40px;
      font-size: 16px;
    }

    //開發中
    .dev__box {
      height: 447px;

      .dev__img {
        width: 130px;
        height: 122px;
      }
    }
  }
</style>
