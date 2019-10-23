<template>
  <div class="setup">
    <v-layout class="header" align-center>
      <div class="header__img">
        <img src="@/assets/WebPage/setup-n.png" alt />
      </div>
      <span class="header__title">星盤設置</span>
      <v-spacer></v-spacer>
      <div class="header__btn" @click="defaultClick()">預設值</div>
    </v-layout>

    <div class="setup__content">
      <!--行星-->
      <div class="item-box planet-list">
        <div class="item-title">
          <span class="item-title__left">行星設置</span>
          <span class="item-title__right">容許度</span>
        </div>
        <!--(測試)-->
        <!--        <v-layout class="item" align-center justify-space-between fill-height>-->
        <!--          <div class="item__name">-->
        <!--            <img class="item__name__image" src="@/assets/Line/astral/astral_1.svg" alt/>-->
        <!--            <span class="item__name__text">太陽</span>-->
        <!--          </div>-->
        <!--          <span class="item__num">15</span>-->
        <!--          <img class="item__btn" src="@/assets/Line/eye.svg" alt/>-->
        <!--        </v-layout>-->
        <v-layout
          v-for="(item, index) in mainPlanetList"
          :key="'A' + index"
          class="item"
          @click="mainSelectItemClick(item, index, true)"
          align-center
          justify-space-between
          fill-height
        >
          <div class="item__name">
            <img class="item__name__image" :src="item.imageUrl" alt />
            <span class="item__name__text">{{item.name}}</span>
          </div>
          <span class="item__num" @click.stop="editPhaseClick(item, index, true)">{{item.val}}</span>
          <img class="item__btn" :src="item.toggleImg" alt />
        </v-layout>
        <!--其他行星-->
        <!--(測試)-->
        <!--        <v-layout class="item" align-center justify-space-between fill-height>-->
        <!--          <div class="item__name">-->
        <!--            <img class="item__name__image" src="@/assets/Line/astral/astral_8.svg" alt/>-->
        <!--            <span class="item__name__text">天王</span>-->
        <!--          </div>-->
        <!--          <img class="item__btn" src="@/assets/Line/closed-eye.svg" alt/>-->
        <!--        </v-layout>-->
        <v-layout
          v-for="(item, index) in planetList"
          :key="index"
          class="item"
          @click="planetSelectItemClick(index)"
          align-center
          justify-space-between
          fill-height
        >
          <div class="item__name">
            <img class="item__name__image" :src="item.imageUrl" alt />
            <span class="item__name__text">{{item.name}}</span>
          </div>
          <img class="item__btn" :src="item.toggleImg" alt />
        </v-layout>
      </div>

      <!--相位-->
      <div class="item-box phase-list">
        <div class="item-title">
          <span class="item-title__left">相位設置</span>
          <span class="item-title__right">容許度</span>
        </div>
        <!--(測試)-->
        <!--        <v-layout class="item" align-center justify-space-between fill-height>-->
        <!--          <div class="item__name">-->
        <!--            <span class="item__name__text">合 (0度)</span>-->
        <!--          </div>-->
        <!--          <span class="item__num">15</span>-->
        <!--          <img class="item__btn" src="@/assets/Line/closed-eye.svg" alt/>-->
        <!--        </v-layout>-->
        <v-layout
          v-for="(item, index) in selPhase"
          :key="'B' + index"
          class="item"
          @click="selPhaseSelectItemClick(item, index)"
          align-center
          justify-space-between
          fill-height
        >
          <div class="item__name">
            <span class="item__name__text">{{item.name}}</span>
          </div>
          <span class="item__num" @click.stop="editPhaseClick(item, index)">{{item.val}}</span>
          <img class="item__btn" :src="item.toggleImg" alt />
        </v-layout>
      </div>
    </div>

    <!--容許度Box-->
    <div v-if="selPhaseModel" id="showbox" @click="selPhaseModel = false">
      <div class="showbox-wrapper">
        <ul class="phase_sel_list">
          <div class="item__title">容許度</div>
          <li class="item" v-for="item in phaseSelList" @click.stop="phaseSelVal(item)">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "astrolabe-setup",
  data() {
    return {
      mainSelList: null, // 7个主星
      selPhase: null,
      phaseSelList: [0.5, 1, 1.5],
      editPhaseIndex: 0,
      selPhaseModel: false,
      mainClick: false, // 主星修改容许度
      selNumList: null,
      saveBox: false,
      mainPlanetList: null,
      planetList: null
    };
  },
  computed: {
    storePlanetSet() {
      return this.$store.state.panConfig.planetSet;
    },
    storeMainPlanetList() {
      return this.$store.state.mainPlanetList;
    },
    storePlanetList() {
      return this.$store.state.planetList;
    }
  },
  created: function() {
    this.selNumList = Object.assign([], this.storePlanetSet.configItem);
    this.mainPlanetList = Object.assign([], this.storeMainPlanetList).slice(
      0,
      7
    );
    this.selPhase = Object.assign([], this.storeMainPlanetList).slice(7);
    this.planetList = this.storePlanetList;
    console.log(this.selNumList + "   12");
  },
  methods: {
    //主星列表點擊切換store設定, 0 1切換並將眼睛圖更改
    mainSelectItemClick(item, index, type) {
      if (type) {
        if (index === 0 || index === 1) {
          return;
        }
        //console.log(this.selNumList);
        this.selNumList.splice(index, 1, this.selNumList[index] ? 0 : 1);
        //console.log("after "+ this.selNumList);
        this.$store.dispatch("setPanConfig", {
          planetSet: {
            configModel: "默认设置",
            configItem: this.selNumList
          }
        });
      }

      //console.log(this.$store.state.panConfig.planetSet.configItem);
      this.mainPlanetList[index].toggleSelect = !this.mainPlanetList[index]
        .toggleSelect;
      if (this.mainPlanetList[index].toggleSelect) {
        this.mainPlanetList[index].toggleImg = require("@/assets/Line/eye.svg");
      } else {
        this.mainPlanetList[
          index
        ].toggleImg = require("@/assets/Line/closed-eye.svg");
      }
    },
    //副星列表點擊切換store設定並將眼睛圖更改
    selPhaseSelectItemClick(item, index) {
      this.selPhase[index].toggleSelect = !this.selPhase[index].toggleSelect;
      if (this.selPhase[index].toggleSelect) {
        this.selPhase[index].toggleImg = require("@/assets/Line/eye.svg");
      } else {
        this.selPhase[
          index
        ].toggleImg = require("@/assets/Line/closed-eye.svg");
      }
      // console.log(this.selPhase);
      this.$store.commit(
        "setPanConfigPhase",
        this.mainPlanetList.concat(this.selPhase)
      );

      // console.log(this.$store.state.mainPlanetList);
    },
    //相位列表點擊切換store設定, 0 1切換並將眼睛圖更改
    planetSelectItemClick(index) {
      this.planetList[index].toggleSelect = !this.planetList[index]
        .toggleSelect;
      if (this.planetList[index].toggleSelect) {
        this.planetList[index].toggleImg = require("@/assets/Line/eye.svg");
      } else {
        this.planetList[
          index
        ].toggleImg = require("@/assets/Line/closed-eye.svg");
      }

      index = index + 7;
      this.selNumList.splice(index, 1, this.selNumList[index] ? 0 : 1);

      this.$store.dispatch("setPanConfig", {
        planetSet: {
          configModel: "默认设置",
          configItem: this.selNumList
        }
      });
      console.log("planet" + this.$store.state.panConfig.planetSet.configItem);
    },
    //預設
    defaultClick() {
      let setArr = [];
      for (var i = 0; i < 12; i++) {
        setArr[i] = 1;
      }
      for (var i = 12; i < 25; i++) {
        setArr[i] = 0;
      }
      this.mainPlanetList.forEach((item, index) => {
        item.toggleSelect = true;
        if (index > 1) {
          item.toggleImg = require("@/assets/Line/eye.svg");
        }
      });
      this.planetList.forEach((item, index) => {
        if (index < 5) {
          item.toggleSelect = true;
          item.toggleImg = require("@/assets/Line/eye.svg");
        } else {
          item.toggleSelect = false;
          item.toggleImg = require("@/assets/Line/closed-eye.svg");
        }
      });
      let defaultMainEditPhaseIndex = [15, 12, 7, 7, 7, 5, 5];
      for (let i = 0; i < defaultMainEditPhaseIndex.length; i++) {
        this.mainPlanetList[i].val = defaultMainEditPhaseIndex[i];
      }

      this.selNumList = setArr;
      // console.log(this.selNumList + "   12332");

      this.$store.dispatch("setPanConfig", {
        planetSet: {
          configModel: "默认设置",
          configItem: this.selNumList
        }
      });
      // console.log("after Default " + this.$store.state.panConfig.planetSet.configItem);
      this.selPhase.forEach((item, index) => {
        if (index < 5) {
          item.toggleSelect = true;
          item.toggleImg = require("@/assets/Line/eye.svg");
        } else {
          item.toggleSelect = false;
          item.toggleImg = require("@/assets/Line/closed-eye.svg");
        }
      });
      let defaultEditPhaseIndex = [7, 6, 5, 5, 5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5];
      for (let i = 0; i < defaultEditPhaseIndex.length; i++) {
        this.selPhase[i].val = defaultEditPhaseIndex[i];
      }
      // console.log(this.selPhase);

      this.$store.commit(
        "setPanConfigPhase",
        this.mainPlanetList.concat(this.selPhase)
      );
      // console.log(this.$store.state.mainPlanetList);
    },
    //容許度Box，type判斷是哪個section
    editPhaseClick(item, index, type) {
      this.editPhaseIndex = index;
      if (type) {
        this.mainClick = true;
      } else {
        this.mainClick = false;
        this.editPhaseIndex = index;
      }
      if (this.phaseSelList.length < 15) {
        for (let i = 2; i <= item.range; i++) {
          this.phaseSelList.push(i);
        }
      }
      this.selPhaseModel = true;
    },
    //點選容許度觸發並將value塞入store內
    phaseSelVal(value) {
      if (this.mainClick) {
        this.mainPlanetList[this.editPhaseIndex].val = value;
        this.$store.commit(
          "setPanConfigPhase",
          this.mainPlanetList.concat(this.selPhase)
        );
      } else {
        this.selPhase[this.editPhaseIndex].val = value;
        this.$store.commit(
          "setPanConfigPhase",
          this.mainPlanetList.concat(this.selPhase)
        );
      }
      this.selPhaseModel = false;
    },

    //版本更動後不使用此function了
    saveOk() {
      this.$store.dispatch("setPanConfig", {
        planetSet: {
          configModel: "默认设置",
          configItem: this.selNumList
        }
      });
      this.$store.commit(
        "setPanConfigPhase",
        this.mainPlanetList.concat(this.selPhase)
      );
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../scss/_mixin.scss";

.setup {
  position: relative;
  z-index: 98;
  width: 375px;
  height: 520px;
  box-shadow: 0 2px 8px 0 rgba(255, 255, 255, 0.5);
  background-color: #19112b;
  box-shadow: 0 2px 13px 0 rgba(255, 255, 255, 0.4);
  border: solid 1px rgba(255, 255, 255, 0.8);
  border-radius: 4px;
}

//容許度box
#showbox {
  position: absolute;
  z-index: 9999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 290px;
  height: 290px;
  // background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
  .showbox-wrapper {
    display: table-cell;
    vertical-align: middle;
    color: #19112b;
    .phase_sel_list {
      overflow-x: hidden;
      overflow-y: scroll;
      // width: 87%;
      height: 313px;
      background: #fff;
      border-radius: 8px;
      // margin: 0 auto;
      padding: 1rem 0;
      // overflow: scroll;
      .item__title {
        @include sub-title-4;
        height: 25px;
        padding: 0 16px;
        position: fixed;
      }
      .item {
        height: 40px;
        line-height: 40px;
        text-align: center;
      }
      &::-webkit-scrollbar {
        width: 2px;
      }

      &::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #000000;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: #ee6daf;
        box-shadow: 3px 2px 10px 0 rgba(238, 161, 201, 0.66);
      }
    }
  }
}

.header {
  padding: 10px 14px;
  height: 47px;
  background-color: rgba(255, 255, 255, 0.4);


  .header__img {
    @include center;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    // background-color: rgba($color: #eea1c9, $alpha: 0.5);

    img {
      width: 20px;
      height: 20px;
    }
  }

  .header__title {
    margin-left: 10px;
    font-size: 20px;
    font-weight: 500;
    // color: #19112b;
    color: #fff;
  }

  .header__btn {
    width: 68px;
    height: 30px;
    border-radius: 4px;
    border: solid 1px #fff;
    color: #fff;
    @include center;
    cursor: pointer;
  }
}

.setup__content {
  overflow-x: hidden;
  overflow-y: scroll;
  height: 473px;

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #000000;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #ee6daf;
    box-shadow: 3px 2px 10px 0 rgba(238, 161, 201, 0.66);
  }

  .item-box {
    @include sub-title;

    .item-title {
      padding: 0 16px; //
      line-height: 30px;
      width: 100%;
      height: 30px;
      background-color: #ee6daf;

      .item-title__right {
        //margin-left: 75px;
        margin-left: 105px;
      }
    }

    .item {
      width: 100%;
      height: 42px;
      margin-top: 1px;
      padding: 0 16px;

      &:nth-child(even) {
        background-color: rgba($color: #ffffff, $alpha: 0.2);
      }

      &:nth-child(odd) {
        background-color: rgba($color: #ffffff, $alpha: 0.05);
      }

      .item__btn {
        width: 20px;
        height: 20px;
      }
    }

    &.planet-list {
      .item__name {
        display: flex;
        align-items: center;

        .item__name__image {
          margin-right: 10px;
          width: 20px;
          height: 20px;
        }
      }
    }

    &.phase-list {
      .item__name {
        flex: 1;
      }

      .item__num {
        flex: 1;
        padding-left: 48px;
      }
    }
  }
}

@media (max-width: 959px) {
}

@media (max-width: 599px) {
  .setup {
    overflow-x: hidden;
    overflow-y: scroll;
    z-index: 105;
    width: 90%;
    height: 520px;
  }
}
</style>

