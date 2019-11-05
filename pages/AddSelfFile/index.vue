<template>
  <div class="web-bg">
    <navBar :afterLogin="afterLogin"></navBar>
    <div class="web-space"></div>
    <div class="custom-container-a">
      <v-layout class="header" align-center>
        <img class="header__img" src="@/assets/WebPage/title.svg" alt />
        <div class="header__title">個人星盤</div>
        <span class="header__subtitle hidden-sm-and-down">比你更懂你，探索自我的無限可能</span>
        <v-spacer></v-spacer>
      </v-layout>
    </div>
    <div class="layout-wrap">
      <img class="bgimg hidden-sm-and-down" src="@/assets/WebPage/addselfbg.png" alt />
      <v-layout class="selfFile__wrap custom-container-a" row wrap align-center>
        <div class="selfFile__bg">
          <div class="selfFile">
            <div class="selfFile__header">
              <div class="selfFile__title">請輸入你的個人資料，獲取專屬個人星盤</div>
              <div class="selfFile__subtitle">※ 提醒您，時間填寫愈清楚，測算結果愈精準喔！</div>
            </div>
            <div class="userfile__box">
              <v-layout class="userfile__item" align-center>
                <span>姓名</span>
                <v-spacer></v-spacer>
                <div class="userfile__item__input">
                  <input type="text" value placeholder="請輸入姓名" v-model="name" />
                  <label class="errorMsg" v-if="showNameErr">請輸入內容！</label>
                </div>
              </v-layout>
              <v-layout class="userfile__item" align-center>
                <span>性別</span>
                <v-spacer></v-spacer>
                <div class="userfile__item__sex">
                  <div class="sex-box male" :class="{activeSex : isMale}" @click="choseMale">男</div>
                  <div class="sex-box female" :class="{activeSex : isFemale}" @click="choseFemale">女</div>
                </div>
              </v-layout>
              <v-layout class="userfile__item" align-center v-if="false">
                <span>關係</span>
                <v-spacer></v-spacer>
                <div class="userfile__item__input">
                  <!-- <span>自己</span> -->
                  <v-select :items="relationItems" v-model="relation" color hide-details dark></v-select>
                </div>
              </v-layout>
              <v-layout class="userfile__item" align-center>
                <span>出生日期</span>
                <v-spacer></v-spacer>
                <div class="userfile__item__input" @click.stop="dateModal = true">
                  <span>{{ date }}</span>
                  <!-- <v-text-field  @click.stop="dateModal = true" v-model="date" single-line readonly></v-text-field> -->
                  <v-dialog
                    ref="dialog"
                    v-model="dateModal"
                    :return-value.sync="date"
                    persistent
                    lazy
                    full-width
                    width="290px"
                  >
                    <v-date-picker
                      class="picker"
                      v-model="date"
                      :first-day-of-week="0"
                      locale="zh-cn"
                      full-width
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="dateModal = false">取消</v-btn>
                      <v-btn flat color="primary" @click="$refs.dialog.save(date)">確認</v-btn>
                    </v-date-picker>
                  </v-dialog>
                </div>
              </v-layout>
              <v-layout class="userfile__item" align-center>
                <span>出生時間</span>
                <v-spacer></v-spacer>
                <div class="userfile__item__input input-time">
                  <span @click.stop="timeModal = true">{{ time }}</span>
                  <v-dialog
                    ref="dialog2"
                    v-model="timeModal"
                    :return-value.sync="time"
                    persistent
                    lazy
                    full-width
                    width="290px"
                  >
                    <v-time-picker class="picker" v-model="time" v-if="timeModal" full-width scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="timeModal = false">取消</v-btn>
                      <v-btn flat color="primary" @click="$refs.dialog2.save(time)">確認</v-btn>
                    </v-time-picker>
                  </v-dialog>
                  <v-spacer></v-spacer>
                  <label class="checkbox-wrap">
                    我不知道
                    <input type="checkbox" v-model="DoNotKnowTime" @change="check()" />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </v-layout>
              <v-layout class="userfile__item" align-center>
                <span>出生地點</span>
                <v-spacer></v-spacer>
                <div class="userfile__item__input">
                  <!-- <span>台北市</span> -->
                  <v-select :items="locationItems" v-model="location" hide-details dark></v-select>
                </div>
              </v-layout>

              <!-- 新增其他地點 -->
              <v-layout class="userfile__item" align-center v-if="showOtherPlace">
                <span></span>
                <v-spacer></v-spacer>
                <div class="userfile__item__input">
                  <input type="text" placeholder="請輸入國家名" v-model="otherPlace" />
                  <label class="errorMsg" v-if="showOtherPlaceErr">請輸入內容！</label>
                </div>
              </v-layout>
              <v-layout class="userfile__item" align-center v-if="showOtherPlace">
                <span></span>
                <v-spacer></v-spacer>
                <div class="userfile__item__input">
                  <input type="text" placeholder="請輸入城市名" v-model="otherPlaceCity" />
                  <label class="errorMsg" v-if="showOtherPlaceCityErr">請輸入內容！</label>
                </div>
              </v-layout>
              <!-- 新增其他地點end -->
            </div>
            <div class="selfFile__btn" @click="addFile">開始探索</div>
          </div>
        </div>
      </v-layout>
    </div>

    <!-- footer -->
    <footerSec></footerSec>
  </div>
</template>

<script>
import navBar from "@/components/webPage/navBar.vue";
import footerSec from "@/components/webPage/footer.vue";
import { astrolabeAPI } from "../../api/AstrolabeAPI";

export default {
  name: "addSelfFile",
  components: {
    navBar,
    footerSec
  },
  data() {
    return {
      isMale: true,
      isFemale: false,
      name: null,
      avator: null,
      Gender: "M",
      // date: new Date().toISOString().substr(0, 10),
      date: "1990-05-30",
      dateModal: false,
      time: "12:00",
      timeModal: false,
      rwd: false,
      showOtherPlace: false,
      DoNotKnowTime: false,
      otherCheck: true,
      relation: "婚戀",
      showNameErr: false,
      passRelation: "R1",
      relationItems: ["親子", "婚戀", "職場", "其他"],
      location: "台北",
      passLocation: "Taipei",
      otherPlace: null,
      otherPlaceCity: null,
      showOtherPlaceErr: false,
      showOtherPlaceCityErr: false,
      otherCheckCity: true,
      locationItems: [
        "基隆",
        "台北",
        "新北",
        "桃園",
        "新竹",
        "苗栗",
        "台中",
        "彰化",
        "南投",
        "雲林",
        "嘉義",
        "台南",
        "高雄",
        "屏東",
        "台東",
        "花蓮",
        "宜蘭",
        "澎湖",
        "金門",
        "其他"
      ],
      checklist: [
        { text: "基隆", value: "Keelung" },
        { text: "台北", value: "Taipei" },
        { text: "新北", value: "New Taipei" },
        { text: "桃園", value: "Taoyuan" },
        { text: "新竹", value: "Hsinchu" },
        { text: "苗栗", value: "Miaoli" },
        { text: "台中", value: "Taichung" },
        { text: "彰化", value: "Changhua" },
        { text: "南投", value: "Nantou" },
        { text: "雲林", value: "Yunlin" },
        { text: "嘉義", value: "Chiayi" },
        { text: "台南", value: "Tainan" },
        { text: "高雄", value: "Kaohsiung" },
        { text: "屏東", value: "Pingtung" },
        { text: "台東", value: "Taitung" },
        { text: "花蓮", value: "Hualien" },
        { text: "宜蘭", value: "Yilan" },
        { text: "澎湖", value: "Penghu" },
        { text: "金門", value: "Kinmen" },
        { text: "其他", value: "Other" }
      ]
    };
  },
  watch: {
    location: function(value) {
      this.checklist.forEach(item => {
        if (item.text === value) {
          this.passLocation = item.value;
        }
      });
      if (value === "其他") {
        this.showOtherPlace = true;
      } else {
        this.showOtherPlace = false;
        this.otherPlace = null;
        this.otherPlaceCity = null;
      }
    },
    name: function(value) {
      // console.log(value);
      if (value === null || value === "") {
        this.showNameErr = true;
      } else {
        this.showNameErr = false;
      }
    },
    otherPlace: function(value) {
      if (value === null || value === "") {
        this.showOtherPlaceErr = true;
      } else {
        this.showOtherPlaceErr = false;
      }
    },
    otherPlaceCity: function(value) {
      if (value === null || value === "") {
        this.showOtherPlaceCityErr = true;
      } else {
        this.showOtherPlaceCityErr = false;
      }
    }
  },
  computed: {
    afterLogin() {
      return this.$store.state.afterLogin;
    }
  },
  created() {
  },
  mounted() {
    if (this.$cookie.get("al")) {ㄋ
      this.$store.commit("updateLoadingStatus", { Loading: false });
    } else {
      alert("請先登入");
      this.$router.push({ path: "/" });
    }
  },
  methods: {
    check() {
      this.time = "12:00";
    },
    choseMale() {
      this.Gender = "M";
      this.isMale = true;
      this.isFemale = false;
    },
    choseFemale() {
      this.Gender = "F";
      this.isMale = false;
      this.isFemale = true;
    },
    PlaceCheck() {
      if (this.location === "其他") {
        if (this.otherPlace === null || this.otherPlace === "") {
          this.otherCheck = false;
        } else {
          this.otherCheck = true;
        }
      } else {
        this.otherCheck = true;
      }
    },
    PlaceCheckCity() {
      if (this.location === "其他") {
        if (this.otherPlaceCity === null || this.otherPlaceCity === "") {
          this.otherCheckCity = false;
        } else {
          this.otherCheckCity = true;
        }
      } else {
        this.otherCheckCity = true;
      }
    },
    addFile() {
      if (this.name === null || this.name === "") {
        this.showNameErr = true;
      } else {
        this.showNameErr = false;
      }

      if (this.otherPlace === null || this.otherPlace === "") {
        this.showOtherPlaceErr = true;
      } else {
        this.showOtherPlaceErr = false;
      }

      if (this.otherPlaceCity === null || this.otherPlaceCity === "") {
        this.showOtherPlaceCityErr = true;
      } else {
        this.showOtherPlaceCityErr = false;
      }

      if (this.name !== "" && this.name !== null) {
        if (this.DoNotKnowTime) {
          this.time = "12:00";
        }

        this.PlaceCheck();
        this.PlaceCheckCity();

        if (this.otherCheck && this.otherCheckCity) {
          let relationBeSent = null;
          if (this.relation === "自己") {
            relationBeSent = "R0";
          }
          if (this.relation === "親子") {
            relationBeSent = "R1";
          }
          if (this.relation === "婚戀") {
            relationBeSent = "R2";
          }
          if (this.relation === "職場") {
            relationBeSent = "R3";
          }
          if (this.relation === "其他") {
            relationBeSent = "R4";
          }

          let dateBeSent = this.date.split("");
          dateBeSent =
            dateBeSent[0] +
            dateBeSent[1] +
            dateBeSent[2] +
            dateBeSent[3] +
            "/" +
            dateBeSent[5] +
            dateBeSent[6] +
            "/" +
            dateBeSent[8] +
            dateBeSent[9];

          astrolabeAPI
            .Add_MemberInfo({
              PlatformId: this.$cookie.get("utd"),
              Platform: this.$cookie.get("LM"),
              Name: this.name,
              Gender: this.Gender,
              BirthTime: dateBeSent + " " + this.time,
              City: this.passLocation,
              BirthCountry: this.otherPlace,
              BirthCity: this.otherPlaceCity,
              ProfilePhotoSrc: null,
              FromNode: "Website"
            })
            .then(data => {
              // console.log("add member success!");
              window.localStorage["token"] = data.Data.Token;
              this.$router.push({ path: "/astrolabe" });
            });
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/webPage/addSelfFile.scss";
</style>

