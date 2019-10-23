<template>
  <div class="footer">
    <div class="custom-container">
      <v-layout fill-height row wrap>
        <v-flex class="footer__item" xs12 md4>
          <div>
            <div class="brand">
              <img src="@/assets/WebPage/logo.png" alt="Astrorg" />
            </div>
            <div class="copyright hidden-sm-and-down">Copyright © 2019 Astrorg. All rights reserved</div>
          </div>
        </v-flex>
        <v-flex class="footer__item other" xs12 md4>
          <div class="other__link">
            <div @click="$router.push({ name: 'web-index' })">ASTRORG 官網</div>
            <div @click="$vuetify.goTo('#about')">活動規則</div>
            <div @click="$vuetify.goTo('#faq')">常見問題</div>
          </div>
        </v-flex>
        <v-flex class="footer__item" xs12 md4>
          <div>
            <div class="icons">
              <a href="http://nav.cx/bfVg6A9" target="_blank" >
                <font-awesome-icon class="icon line" :icon="['fab', 'line']"></font-awesome-icon>
              </a>
              <a href="https://www.facebook.com/astrorg.tw" target="_blank"  >
                <font-awesome-icon class="icon fb" :icon="['fab', 'facebook']"></font-awesome-icon>
              </a>
              <a href="https://www.instagram.com/astrorg.tw" target="_blank"  >
                <font-awesome-icon class="icon ins" :icon="['fab', 'instagram']"></font-awesome-icon>
              </a>
              <a href="mailto:service@astrorg.com"  >
                <font-awesome-icon class="icon mail" :icon="['fas', 'envelope']"></font-awesome-icon>
              </a>
            </div>
            <div class="copyright hidden-md-and-up">Copyright © 2019 Astrorg. All rights reserved</div>
          </div>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
    methods:{
        toTop(){
            let options = {
                duration: 500,
                offset: 0,
                easing: 'easeInOutQuad',
            };
            this.$vuetify.goTo(0, options);
        }
    }
};
</script>
<style lang="scss" scoped>
@import "../../scss/_mixin.scss";
.footer {
  position: relative;
  height: 220px;
  background-color: #000;

  .footer__item {
    @include center;
  }

  .brand {
    img {
      width: 176px;
    }
  }

  .copyright {
    margin-top: 14px;
    font-size: 12px;
  }

  .con__tell {
    margin: 10px 0 14px;
  }

  .other {
    @include flex;
    justify-content: space-around;
    align-items: center;

    .other__link {
      opacity: 0.5;
      font-size: 16px;
      line-height: 2.5;
      cursor: pointer;
    }
  }

  .icons {
    text-align: center;

    a {
      color: #fff;
    }

    .icon {
      font-size: 30px;
      margin: 0 16px;
      cursor: pointer;

      &.line:hover {
        color: #00c300;
      }

      &.fb:hover {
        color: #3b5998;
      }

      &.ins:hover {
        color: #e1306c;
      }

      &.mail:hover {
        color: #ffd900;
      }
    }
  }
}

@media (max-width: 959px) {
  .footer {
    height: 300px;

    .con__wrap {
      margin: 36px 0;
    }

    .other {
      //   margin: 36px 0;
      @include flex;
      justify-content: center;
      align-items: center;

      .other__link {
        @include flex;
        justify-content: center;
        font-size: 16px;
        line-height: 2.5;
        cursor: pointer;

        & > div {
          margin: 0 10px;
        }
      }
    }
  }
}
@media (max-width: 599px) {
  .footer {
    height: 260px;
    .brand {
      img {
        width: 88px;
      }
    }

    .other {
      .other__link {
        width: 100%;
        justify-content: space-around;

        & > div {
          margin: 0 4px;
        }
      }
    }
  }
}
</style>