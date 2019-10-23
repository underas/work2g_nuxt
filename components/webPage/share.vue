<template>
  <div class="share__box" overflow-hidden>
    <v-layout class="header" align-center>
      <div class="header__img">
        <font-awesome-icon class="icon" :icon="['fas', 'share-alt']"></font-awesome-icon>
      </div>
      <span class="header__title">分享星盤</span>
    </v-layout>
    <div class="share__content">
      <v-container>
        <div class="share__sec">
          <v-layout class="user" align-center>
            <v-avatar size="60" class="user__avatar">
              <img src="@/assets/Line/cat.png" />
            </v-avatar>
            <span class="user__name">Chloe Lo</span>
          </v-layout>
          <div class="astrolabe__wrap">
            <div class="astrolabe__bg">
              <!-- <canvasAstrolabe
              class="canvas-pan"
              :width="paramPan.width"
              :configItem="panConfigItem"
              :panStyle="item.name"
              :type="paramPan.type"
              :data1="nowPanData.data1"
              :data2="nowPanData.data2"
              ></canvasAstrolabe>-->
            </div>
          </div>
        </div>
        <div class="share">
          <a class="share__item" href target="_blank">
            <img id="line" src="@/assets/Line/line.svg" />
          </a>
          <a class="share__item" href target="_blank">
            <img id="fb" src="@/assets/Line/fb.svg" />
          </a>
          <a class="share__item" href>
            <img id="download" src="@/assets/Line/download.svg" />
          </a>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
@import "../../scss/_mixin.scss";
.share__box {
  width: 560px;
  height: 682px;
  border-radius: 4px;
  border: solid 1px rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 2px 13px 0 rgba(255, 255, 255, 0.4);

  .header {
    width: 100%;
    height: 60px;
    padding: 16px;
    // color: #19112b;
    color: #ffffff;
    .header__img {
      @include center;
      border-radius: 50%;
      width: 35px;
      height: 35px;
      // background-color: rgba($color: #eea1c9, $alpha: 0.5);
      // font-size: 20px;
      font-size: 24px;
    }
    .header__title {
      font-size: 24px;
      font-weight: 500;
      margin-left: 20px;
    }
  }

  .share__content {
    height: calc(100% - 60px);
    background-color: #19112b;
    width: 100%;
    .user {
      margin-top: 22px;
      .user__avatar {
        img {
          border: solid 1px #ffffff;
          background: #312150;
        }
      }
      .user__name {
        color: #ffffff;
        font-size: 16px;
        margin: 0 10px 0 16px;
      }
    }
    .astrolabe__wrap {
      @include center;
      padding: 26px 0;
      .astrolabe__bg {
        width: 320px;
        height: 320px;
        border-radius: 50%;
        background-image: radial-gradient(
          circle at 50% 50%,
          rgba(255, 255, 255, 0.07),
          rgba(255, 255, 255, 0.07) 96%,
          #ffffff
        );
        .canvas-pan {
          position: absolute;
          top: 12px;
          left: 12px;
        }
      }
    }

    .share {
      @include center;
      padding: 16px;
      .share__item {
        margin: 0 10px;
        #line:hover {
          content: url("../../assets/Line/line-hover.svg");
        }
        #fb:hover {
          content: url("../../assets/Line/fb-hover.svg");
        }
        #download:hover {
          content: url("../../assets/Line/download-hover.svg");
        }
      }
    }
  }
}

@media (max-width: 599px) {
  .share__box {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
    border: 0;
    .share__content {
      .share__sec {
        margin: 0 auto;
        //max-width: 343px;
        //height: 343px;
        padding: 16px;
        border: solid 1px rgba(255, 255, 255, 0.47);
        background: #312150;
        .user {
          margin-top: 0;
          .user__avatar {
            width: 48px !important;
            height: 48px !important;
            img {
              border: solid 1px #ffffff;
              background: #312150;
            }
          }
          .user__name {
            color: #ffffff;
            font-size: 16px;
            margin: 0 10px 0 16px;
          }
        }
        .astrolabe__wrap {
          @include center;
          padding: 26px 0;
          .astrolabe__bg {
            width: 320px;
            height: 320px;
            border-radius: 50%;
            background-image: radial-gradient(
              circle at 50% 50%,
              rgba(255, 255, 255, 0.07),
              rgba(255, 255, 255, 0.07) 96%,
              #ffffff
            );
            .canvas-pan {
              position: absolute;
              top: 12px;
              left: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
