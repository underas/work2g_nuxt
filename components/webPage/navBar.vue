<template>
  <div>
    <v-toolbar
      class="nav-bar"
      dark
      app
      height="60px"
      :class="{scrollActive: scrollPosition > 60}"
    >
      <div class="custom-bar">
        <v-toolbar-side-icon
          class="hidden-md-and-up"
          @click="showMenu = !showMenu"
          :class="{ activeIcon : showMenu }"
        ></v-toolbar-side-icon>
        <div class="brand" @click="$router.push({ name: 'web-index' })">
          <img src="@/assets/WebPage/logo.png" alt="ASTRORG" />
        </div>

        <v-spacer></v-spacer>

        <v-toolbar-items class="menu hidden-sm-and-down">
          <div class="menu__btn" @click="toSinglePan()">個人星盤</div>
          <div class="menu__btn" @click="toDoublePan()">雙人合盤</div>
          <div class="menu__btn" @click.stop="devDialog = true">占星百科</div>
          <div class="menu__btn" @click.stop="devDialog = true">星聞專欄</div>
          <div class="menu__btn" @click.stop="devDialog = true">占星諮詢</div>
        </v-toolbar-items>

        <div class="login" v-if="!afterL" @click.stop="loginDialog = true">登入</div>
        <!-- User -->
        <div class="user" v-if="afterL">
          <!-- 登出 mobile -->
          <img
            class="logout-m hidden-sm-and-up"
            @click="logout()"
            src="@/assets/WebPage/logout.png"
            alt
          />
          <v-avatar size="40" class="user__avatar">
            <img :src="iconUrl" />
          </v-avatar>
          <span class="user__name hidden-xs-only">{{ name }}</span>
          <!-- 登出 -->
          <!-- <div class="logout " @click="logout()">登出</div> -->
          <img
            class="logout hidden-xs-only"
            @click="logout()"
            src="@/assets/WebPage/logout.png"
            alt
          />
        </div>
      </div>
    </v-toolbar>

    <!-- 登入Box -->
    <v-dialog v-model="loginDialog" max-width="560">
      <v-card class="login__box">
        <v-card-title>
          <v-layout class="login__header" align-center>
            <div class="header__img">
              <font-awesome-icon class="icon mail" :icon="['fas', 'user-circle']"></font-awesome-icon>
            </div>
            <span>登入</span>
          </v-layout>
        </v-card-title>
        <v-container class="login__content">
          <v-layout column align-center>
            <div class="login__content__title">
              登入以開始使用專屬星盤服務，
              <br />你可以選擇以下方式登入：
            </div>
            <div class="login__content__btn fb" @click="fbLogin()">
              <img src="@/assets/WebPage/fb-login.png" alt />
            </div>
            <div class="login__content__btn line" @click="lineLogin()">
              <img src="@/assets/WebPage/line-login.png" alt />
            </div>
            <div class="login__content__notice">
              登入即代表您同意 ASTRORG
              <span @click="toService()">服務及隱私條款</span>
            </div>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>

    <v-slide-y-reverse-transition>
      <div class="menu-m hidden-md-and-up" v-if="showMenu">
        <div class="menu__space"></div>
        <div class="menu__item" @click="toSinglePan()">個人星盤</div>
        <div class="menu__item" @click="toDoublePan()">雙人合盤</div>
        <div class="menu__item" @click.stop="devDialog = true">占星百科</div>
        <div class="menu__item" @click.stop="devDialog = true">星聞專欄</div>
        <div class="menu__item" @click.stop="devDialog = true">占星諮詢</div>
      </div>
    </v-slide-y-reverse-transition>

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
  </div>
</template>

<script>
import login from "@/components/webPage/login.vue";
import { astrolabeAPI } from "../../api/AstrolabeAPI";

export default {
  name: "nav-bar",
  components: {},
  props: {
    afterLogin: null
  },
  data() {
    return {
      scrollPosition: null,
      devDialog: false,
      loginDialog: false,
      showMenu: false,
      iconUrl: null,
      name: null,
      afterL: null
    };
  },
  mounted() {
    this.afterL = this.afterLogin;
    if (this.$cookie.get("al")) {
      this.afterL = true;
      this.$nextTick(() => {
        this.iconUrl = this.$cookie.get("imgUrl");
        this.name = this.$cookie.get("name");
      });
    }

    window.addEventListener("scroll", this.updateScroll);
  },
  methods: {
    //navbar change on scroll
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
    lineLogin() {
      var URL = "https://access.line.me/oauth2/v2.1/authorize?";
      URL += "response_type=code";
      URL += "&client_id=" + process.env.VUE_APP_client_id; //正式
      URL += "&redirect_uri=" + process.env.VUE_APP_return_url; //正式
      URL += "&state=abcde";
      URL += "&scope=openid%20profile";
      window.location.href = URL;
    },
    fbLogin() {
      let vm = this;
      FB.login(
        function(response) {
          // console.log("res when login", response);
          vm.getProfile();
        },
        {
          scope: "email, public_profile",
          return_scopes: true
        }
      );
    },
    getProfile() {
      let vm = this;
      FB.api("/me?fields=name,id,email", function(response) {
        // console.log("res in graphAPI", response);
        vm.$cookie.delete("name");
        vm.$cookie.delete("imgUrl");
        vm.$cookie.delete("al");
        vm.$cookie.delete("utd");
        vm.$cookie.delete("LM");

        vm.$cookie.set("name", response.name, 7);
        vm.$cookie.set("al", true, 7);
        vm.$cookie.set("LM", "Facebook", 7);

        let imgUrl =
          "http://graph.facebook.com/" + response.id + "/picture?type=square";
        vm.$cookie.set("imgUrl", imgUrl, 7);
        vm.$cookie.set("utd", response.id, 7); // user token id
        if (vm.$cookie.get("utd") === "undefined") {
          vm.$cookie.delete("name");
          vm.$cookie.delete("imgUrl");
          vm.$cookie.delete("al");
          vm.$cookie.delete("utd");
          vm.$cookie.delete("LM");
          alert("facebook登入有誤");
        } else {
          vm.$cookie.set("afterFB", true, 1);
          window.location.reload();
        }
      });
    },
    logout() {
      this.$cookie.delete("name");
      this.$cookie.delete("imgUrl");
      this.$cookie.delete("al");
      this.$cookie.delete("utd");
      this.$cookie.delete("LM");
      window.location.replace(process.env.VUE_APP_return_url); //上線或測試改網址
      //window.location.replace("http://localhost:8080"); //本機
      //window.location.replace("https://astrorg-dev.azurewebsites.net/"); //測試機
    },
    //個人星盤
    toSinglePan() {
      if (this.$cookie.get("al")) {
        astrolabeAPI
          .Login(this.$cookie.get("utd"))
          .then(data => {
            this.$router.push({ path: "/astrolabe" });
          })
          .catch(err => {
            this.$store.commit("updateLoadingStatus", { Loading: false });
          });
      } else {
        // this.$router.push({ path: "/addSelfFile" });
          this.loginDialog = true
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
          this.loginDialog = true
      }
    },
    //隱私條款
    toService() {
      this.loginDialog = false;
      this.$router.push({ path: "/rule" });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../scss/_mixin.scss";

.custom-bar {
  height: 100%;
  display: flex;
  align-items: center;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
}
@media (max-width: 1263px) {
  .custom-bar {
    width: 100%;
  }
}

.nav-bar {
  z-index: 100;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.2);
  transition: 0.5s;

  &.scrollActive {
    background-color: #352852;
  }

  .brand {
    @include center;
    cursor: pointer;

    img {
      width: 120px;
    }
  }

  .menu {
    // margin-left: 30px;
    margin-right: 30px;

    .menu__btn {
      transition: 0.2s;
      width: 100px;
      @include center;
      font-size: 16px;
      cursor: pointer;

      &:hover {
        border-bottom: #ee6daf 4px solid;
        color: #ee6daf;
      }
    }
  }

  .login {
    text-align: center;
    line-height: 40px;
    color: #fff;
    width: 100px;
    height: 40px;
    border-radius: 24px;
    border: solid 1px rgba(255, 255, 255, 0.8);
    background-image: linear-gradient(110deg, #fa71cd, #c471f5);
    cursor: pointer;
  }

  .user {
    @include center;

    .user__name {
      margin-left: 16px;
      font-size: 20px;
    }

    .user__avatar {
      img {
        border: solid 1px #ffffff;
        background: #312150;
      }
    }

    .logout {
      width: 20px;
      height: 20px;
      margin-left: 32px;
      cursor: pointer;
      // color: #9b9b9b;
    }

    .logout-m {
      width: 16px;
      height: 16px;
      margin-right: 16px;
      cursor: pointer;
    }
  }
}

.login__box {
  font-family: "Microsoft JhengHei", "Helvetica", sans-serif;
  border-radius: 4px;
  //border: solid 1px #ffffff;
  background-color: #757180;
  box-shadow: 0 2px 13px 0 rgba(255, 255, 255, 0.4);
  border: solid 1px rgba(255, 255, 255, 0.2);

  .login__header {
    font-size: 24px;
    color: #19112b;
    font-weight: 600;

    .header__img {
      @include center;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: rgba($color: #eea1c9, $alpha: 0.5);
    }

    span {
      margin-left: 20px;
    }
  }

  .login__content {
    padding: 40px 34px 20px;
    color: #ffffff;
    background-color: #19112b;

    .login__content__title {
      font-size: 24px;
      opacity: 0.5;
      text-align: center;
    }

    .login__content__btn {
      @include flex;
      align-items: center;
      justify-content: flex-start;
      cursor: pointer;
      font-size: 18px;
      width: 250px;
      height: 40px;
      border-radius: 3px;
      margin-top: 40px;
      padding-left: 9px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .login__content__notice {
      margin-top: 70px;
      font-size: 16px;

      span {
        color: #ee6daf;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}

//開發中
.v-overlay::before {
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  background-color: rgba(25, 17, 43, 0.52);
}

.v-overlay--active:before {
  opacity: 1;
}

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

@media (max-width: 959px) {
  .nav-bar {
    .activeIcon {
      transform: rotate(90deg);
      color: #ee6daf;
    }

    .brand {
      img {
        width: 80px;
      }
    }

    .login {
      line-height: 32px;
      width: 80px;
      height: 32px;
    }
  }

  .menu-m {
    position: fixed;
    z-index: 99;

    .menu__space {
      width: 100vw;
      height: 59px;
      background-color: #19112b;
    }

    .menu__item {
      @include center;
      background-color: #19112b;
      width: 100vw;
      height: 40px;
      box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.5);

      &:hover {
        background-color: #ee6daf;
      }
    }
  }
}

@media (max-width: 599px) {
  .menu {
    .menu__space {
      height: 59px;
    }

    .menu__item {
    }
  }
  .login__box {
    .login__content {
      .login__content__title {
        font-size: 16px;
      }

      .login__content__notice {
        font-size: 12px;
      }
    }
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

