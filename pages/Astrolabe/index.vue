<template>
  <div class="web-bg" :class="{ overhidden : activeFileList || activeShare || activeSetupM}">
    <navBar :afterLogin="afterLogin"></navBar>
    <div class="web-space"></div>
    <div class="custom-container-pan">
      <v-layout class="header" row wrap align-center>
        <img class="header__img" src="@/assets/WebPage/title.svg" alt/>
        <div class="header__title">個人星盤</div>
        <!-- RWD display -->
        <div class="header__share-m hidden-sm-and-up" @click="showShareBox()" v-if="false">
          <font-awesome-icon class="icon" :icon="['fas', 'share-alt']"></font-awesome-icon>
        </div>
        <!---->
        <v-spacer></v-spacer>
        <div class="header__share hidden-xs-only" @click="showShareBox()" v-if="false">
          <font-awesome-icon class="icon" :icon="['fas', 'share-alt']"></font-awesome-icon>
          <span>分享星盤</span>
        </div>
      </v-layout>
    </div>

    <div class="custom-container-pan">
      <div class="astrolabe" overflow-hidden>
        <v-layout row wrap>
          <v-flex class="astrolabe__wrap" xs12 lg6>
            <div class="astrolabe__box">
              <v-layout class="user" align-center>
                <v-avatar size="64" class="user__avatar">
                  <img :src="nowUser.img"/>
                </v-avatar>
                <span class="user__name mx-3">{{ nowUser.name }}</span>
                <span class="user__birth" v-if="afterapi">{{ nowUser.birthday }}</span>
                <v-spacer></v-spacer>
                <div class="user__list hidden-xs-only" @click="showUserFileList()">
                  <img src="@/assets/WebPage/switch.svg" alt/>
                  <span>切換好友</span>
                </div>
                <!-- RWD display -->
                <div class="user__list-m hidden-sm-and-up" @click="showUserFileList()">
                  <img src="@/assets/WebPage/switch.svg" alt/>
                </div>
                <!-- -->

                <!-- 設定hover -->
                <v-tooltip bottom color="#000">
                  <template v-slot:activator="{ on }">
                    <!-- <v-btn color="primary" dark v-on="on">Button</v-btn> -->
                    <div
                      class="user__setup hidden-xs-only"
                      :class="{setupActive : activeSetup}"
                      @click="showSetup()"
                      v-on="on"
                    >
                      <img src="@/assets/WebPage/setup-n.png" alt/>
                    </div>
                  </template>
                  <span>星盤設置</span>
                </v-tooltip>

                <!-- 設定RWD -->
                <div class="user__setup hidden-sm-and-up" @click="showSetupM()">
                  <img src="@/assets/WebPage/setup-n.png" alt/>
                </div>

                <!--設定視窗-->
                <astrolabeSetup class="user__setup__box hidden-xs-only" v-if="activeSetup"></astrolabeSetup>
              </v-layout>
              <div class="pan__wrap">
                <!-- swiper -->

                <div class="swiper">
                  <div id="SW" v-swiper:mySwiper="swiperOption">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide"  v-for="(item,index) in style" :key="index">
                        <div class="astrolabe__bg" id="astrolabe__bg">
                          <!-- <span>{{ item.name }}</span> -->
                          <canvasAstrolabe
                            class="canvas-pan"
                            :width="paramPan.width"
                            :configItem="panConfigItem"
                            :panStyle="item.name"
                            :type="paramPan.type"
                            :data1="data1"
                            :data2="paramPan.data2"
                            v-if="afterapi"
                          ></canvasAstrolabe>
                        </div>
                      </div>
                    </div>
                    <div
                      class="swiper-button-prev swiper-button-white hidden-xs-only"
                      slot="button-prev"
                    ></div>
                    <div
                      class="swiper-button-next swiper-button-white hidden-xs-only"
                      slot="button-next"
                    ></div>
                    <div class="swiper-pagination" slot="pagination"></div>
                  </div>
                </div>


<!--                <div class="swiper">-->
<!--                  <swiper id="SW" :options="swiperOption">-->
<!--                    <swiper-slide v-for="(item,index) in style" :key="index">-->
<!--                      &lt;!&ndash; 提示框 &ndash;&gt;-->
<!--                      &lt;!&ndash; <div-->
<!--                    class="astrolabe__notice"-->
<!--                    :id="item.id"-->
<!--                    v-if="canshow[index]"-->
<!--                      >{{ noticeText[index] }}</div>&ndash;&gt;-->
<!--                      <div class="astrolabe__bg" id="astrolabe__bg">-->
<!--                        &lt;!&ndash; <span>{{ item.name }}</span> &ndash;&gt;-->
<!--                        <canvasAstrolabe-->
<!--                          class="canvas-pan"-->
<!--                          :width="paramPan.width"-->
<!--                          :configItem="panConfigItem"-->
<!--                          :panStyle="item.name"-->
<!--                          :type="paramPan.type"-->
<!--                          :data1="paramPan.data1"-->
<!--                          :data2="paramPan.data2"-->
<!--                          v-if="afterapi"-->
<!--                        ></canvasAstrolabe>-->
<!--                      </div>-->
<!--                    </swiper-slide>-->
<!--                    <div-->
<!--                      class="swiper-button-prev swiper-button-white hidden-xs-only"-->
<!--                      slot="button-prev"-->
<!--                    ></div>-->
<!--                    <div-->
<!--                      class="swiper-button-next swiper-button-white hidden-xs-only"-->
<!--                      slot="button-next"-->
<!--                    ></div>-->
<!--                  </swiper>-->
<!--                  <div class="swiper-pagination" slot="pagination"></div>-->
<!--                </div>-->
                <!-- swiper end -->
              </div>
            </div>
          </v-flex>
          <v-flex class="astrolabe__detail" xs12 lg6>
            <div class="tab__box hidden-sm-and-down">
              <div
                class="tab"
                :class="{tabActive : activeTab == 'interpret'}"
                @click="activeInterpret()"
              >星盤解讀
              </div>
              <div
                class="tab"
                :class="{tabActive : activeTab == 'params'}"
                @click="activeParams()"
              >詳細參數
              </div>
            </div>
            <!-- RWD display -->
            <div class="tab__box-m hidden-md-and-up">
              <div
                class="tab-m"
                :class="{tabActive : activeTab == 'interpret'}"
                @click="activeInterpret()"
              >星盤解讀
              </div>
              <div
                class="tab-m"
                :class="{tabActive : activeTab == 'params'}"
                @click="activeParams()"
              >詳細參數
              </div>
            </div>
            <!-- -->
            <div class="detail">
              <!--星盤解讀-->
              <div class="interpret" v-if="activeTab == 'interpret'">
                <div class="interpret__astral">
                  <div
                    class="astral__item"
                    :class="{itemActive : astral.show}"
                    v-for="(astral, index) in interpretationDatas"
                    :key="index"
                    @click="selectAstral(index)"
                  >
                    <img :src="astral.imageUrl" alt/>
                    <span>{{ astral.iconName }}</span>
                  </div>
                </div>
                <div class="interpret__box" v-if="afterShow">
                  <v-layout class="interpret__title" align-center>
                    <img :src="nowShow.imgSrc" alt/>
                    <div class="interpret__text">{{nowShow.Title}}</div>
                  </v-layout>
                  <div class="interpret__content" v-html="nowShow.Content"></div>
                  <img class="interpret__bg" :src="nowShow.imgSrc" alt/>
                </div>
              </div>
              <!--詳細參數-->
              <div class="params" v-if="activeTab == 'params'">
                <div class="params__tabs">
                  <div
                    class="params__tab__item"
                    :class="{tabItemActive : activeTabItem == 'planet'}"
                    @click="activePlanet()"
                  >星位
                  </div>
                  <div
                    class="params__tab__item"
                    :class="{tabItemActive : activeTabItem == 'palace'}"
                    @click="activePalace()"
                  >宮位
                  </div>
                  <div
                    class="params__tab__item"
                    :class="{tabItemActive : activeTabItem == 'phase'}"
                    @click="activePhase()"
                  >相位
                  </div>
                  <div
                    class="params__tab__item"
                    :class="{tabItemActive : activeTabItem == 'pattern'}"
                    @click="activePattern()"
                  >統計
                  </div>
                </div>
                <div class="params__content">
                  <!--1.星位-->
                  <table class="table planet-table" v-if="activeTabItem == 'planet'">
                    <tr class="table__title">
                      <th>星體</th>
                      <th>落入星座</th>
                      <th>角度</th>
                      <th colspan="2">落入宮位</th>
                    </tr>
                    <tr v-for="(item , index) in planets" class="table__content">
                      <td>
                        <img :src="item.imageUrl" alt/>
                        <span>{{ item.name }}</span>
                      </td>
                      <td>{{ item.star }}</td>
                      <td>{{ item.angle }}</td>
                      <td>{{ item.house }}</td>
                      <td>{{ item.retrograde }}</td>
                    </tr>
                  </table>
                  <!--2.宮位-->
                  <table class="table palace-table" v-if="activeTabItem == 'palace'">
                    <tr class="table__title">
                      <th>宮位</th>
                      <th>星座</th>
                      <th>宮主星</th>
                      <th colspan="2">飛入</th>
                    </tr>
                    <tr v-for="(item , index) in palaces" class="table__content">
                      <td>{{ item.House }}</td>
                      <td>{{ item.Constellation }}</td>
                      <td>{{ item.MainAstral }}</td>
                      <td>{{ item.FlyInto1 }}</td>
                      <td>{{ item.FlyInto2 }}</td>
                    </tr>
                  </table>
                  <!--3.相位-->
                  <table class="phase-table" v-if="activeTabItem == 'phase'">
                    <!--標題-->
                    <tr class="table__title">
                      <th></th>
                      <th v-for="(Rowitem , index) in phases1">{{ phases[index] }}</th>
                    </tr>
                    <tr v-for="(RowItem , index) in phases1" class="table__content">
                      <td>{{ phases[index] }}</td>
                      <td
                        v-for="(ColItem , index1) in RowItem"
                        :class="phases2[index][index1]"
                      >{{ ColItem }}
                      </td>
                    </tr>
                  </table>
                  <!--4.統計-->
                  <div v-if="activeTabItem == 'pattern'">
                    <!--格局-->
                    <table class="table pattern-table">
                      <tr class="table__title">
                        <th>格局</th>
                        <th>詳情</th>
                      </tr>
                      <!--(測試)-->
                      <!--                    <tr class="table__content">-->
                      <!--                      <td style="width: 25%;">星群</td>-->
                      <!--                      <td>-->
                      <!--                        <span>-->
                      <!--                          天蠍座：太陽、金星、木星、冥王-->
                      <!--                          <br/>-->
                      <!--                        </span>-->
                      <!--                        <span>-->
                      <!--                          6 宮：太陽、金星、木星、冥王-->
                      <!--                          <br/>-->
                      <!--                        </span>-->
                      <!--                      </td>-->
                      <!--                    </tr>-->
                      <tr class="table__content" v-for="item in P">
                        <td style="width: 25%;">{{ item.Title }}</td>
                        <td>
                          <span v-for="(item1 , index) in item.Content.split('/')">
                            {{ item1 }}
                            <br/>
                          </span>
                        </td>
                      </tr>
                    </table>
                    <!--共有三個: 陰陽姓、三大模式、四大元素-->
                    <!-- <table v-for="statsItem, stats in statsList"> -->
                    <table class="table stats-table">
                      <tr class="table__title">
                        <th style="width: 25%;">陰陽性</th>
                        <th>包含星體</th>
                      </tr>
                      <!--(測試)-->
                      <!--                    <tr class="table__content">-->
                      <!--                      <td style="width: 25%;">陽</td>-->
                      <!--                      <td>-->
                      <!--                        <span>月亮 水星 火星 上升 天頂</span>-->
                      <!--                      </td>-->
                      <!--                    </tr>-->
                      <tr class="table__content" v-for="item in Y">
                        <td>{{ item.Title }}</td>
                        <td>
                          <span v-for="(item1 , index) in item.Content.split('/')">{{ item1 }}</span>
                        </td>
                      </tr>
                    </table>
                    <table class="table stats-table">
                      <tr class="table__title">
                        <th style="width: 25%;">三大模式</th>
                        <th>包含星體</th>
                      </tr>
                      <!--(測試)-->
                      <!--                    <tr class="table__content">-->
                      <!--                      <td style="width: 25%;">開創星座</td>-->
                      <!--                      <td>-->
                      <!--                        <span>-->
                      <!--                          月亮 水星 天王 海王-->
                      <!--                          <br/>-->
                      <!--                        </span>-->
                      <!--                      </td>-->
                      <!--                    </tr>-->
                      <tr class="table__content" v-for="item in T">
                        <td>{{ item.Title }}</td>
                        <td>
                          <span v-for="(item1 , index) in item.Content.split('/')">{{ item1 }}</span>
                        </td>
                      </tr>
                    </table>
                    <table class="table stats-table">
                      <tr class="table__title">
                        <th style="width: 25%;">四大元素</th>
                        <th>包含星體</th>
                      </tr>
                      <!--(測試)-->
                      <!--                    <tr class="table__content">-->
                      <!--                      <td style="width: 25%;">火</td>-->
                      <!--                      <td>-->
                      <!--                        <span>太陽 金星 火星 木星 冥王 天頂</span>-->
                      <!--                      </td>-->
                      <!--                    </tr>-->
                      <tr class="table__content" v-for="item in Q">
                        <td>{{ item.Title }}</td>
                        <td>
                          <span v-for="(item1 , index) in item.Content.split('/')">{{ item1 }}</span>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </v-flex>
        </v-layout>
      </div>
    </div>
    <!-- footer -->
    <footerSec></footerSec>

    <!--設定視窗RWD-->
    <div class="popup-mask hidden-sm-and-up" v-if="activeSetupM">
      <font-awesome-icon
        class="cross-icon setup"
        :icon="['fas', 'times']"
        @click="activeSetupM = false;"
      ></font-awesome-icon>
      <astrolabeSetup class="user__setup__box" v-if="activeSetupM"></astrolabeSetup>
    </div>

    <!-- 好友列表 -->
    <div class="popup-mask" v-if="activeFileList">
      <font-awesome-icon class="cross-icon" :icon="['fas', 'times']" @click="closeFriendList"></font-awesome-icon>
      <userFileList @closeClick="closeFriendList"></userFileList>
    </div>

    <!-- 分享 -->
    <div class="popup-mask" v-if="activeShare">
      <font-awesome-icon class="cross-icon" :icon="['fas', 'times']" @click="activeShare = false"></font-awesome-icon>
      <share></share>
    </div>
  </div>
</template>

<script>
  import navBar from "@/components/webPage/navBar.vue";
  import footerSec from "@/components/webPage/footer.vue";
  import astrolabeSetup from "@/components/webPage/astrolabeSetup.vue";
  import userFileList from "@/components/webPage/userFileList.vue";
  import share from "@/components/webPage/share.vue";
  import canvasAstrolabe from "@/components/canvas-astrolabe.vue";
  import {astrolabeAPI} from "../../api/AstrolabeAPI";

  export default {
    name: "astrolabe",
    components: {
      navBar,
      footerSec,
      astrolabeSetup,
      userFileList,
      share,
      canvasAstrolabe
    },
    data() {
      return {
        paramPan: {}, //星盤所需資料
        data1 : [
          278.717635,
          347.0754,
          264.781745,
          324.63279,
          111.122101,
          193.325934,
          316.15932,
          287.561076,
          288.286992,
          234.549446,
          143.08594,
          319.808683,
          294.857318,
          96.07771,
          266.458834,
          260.522764,
          12.330114,
          46.830409,
          74.069161,
          98.401195,
          123.809731,
          154.251273,
          192.330114,
          226.830409,
          254.069161,
          278.401195,
          303.809731,
          334.251273,
          80.522764,
          338.303008,
          80.687879,
          185.070888,
          9.951271
        ],
        afterapi: false,
        userInformation: null,
        ShowPanData: null,
        screenWidth: null,
        nowUser: {
          name: null,
          img: null,
          birthday: null
        },
        swiperOption: {
          initialSlide: 1,
          pagination: {
            el: ".swiper-pagination",
            //clickable: true,
            bulletClass: "my-bullet-w",
            bulletActiveClass: "my-bullet-active"
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          }
          // on: {
          //   slideChangeTransitionEnd: () => {
          //     let swiper = document.getElementById("SW").swiper;
          //     let i = swiper.activeIndex;
          //     this.changeShow(i);
          //   }
          // }
        },
        style: [
          {name: "文字", show: false, id: "alert1"},
          {name: "A32", show: false, id: "alert2"},
          {name: "专业", show: false, id: "alert3"}
        ],
        activeFileList: false,
        activeShare: false,
        activeSetup: false, //設定視窗
        activeSetupM: false, //設定視窗
        activeTab: "interpret",
        activeTabItem: "planet",
        astralList: [
          {
            imageUrl: require("@/assets/Line/astral/astral_11.svg"),
            name: "上升"
          },
          {
            imageUrl: require("@/assets/Line/astral/astral_1.svg"),
            name: "太陽"
          },
          {
            imageUrl: require("@/assets/Line/astral/astral_2.svg"),
            name: "月亮"
          },
          {
            imageUrl: require("@/assets/Line/astral/astral_3.svg"),
            name: "水星"
          },
          {
            imageUrl: require("@/assets/Line/astral/astral_4.svg"),
            name: "金星"
          },
          {
            imageUrl: require("@/assets/Line/astral/astral_5.svg"),
            name: "火星"
          },
          {
            imageUrl: require("@/assets/Line/astral/astral_6.svg"),
            name: "木星"
          },
          {
            imageUrl: require("@/assets/Line/astral/astral_7.svg"),
            name: "土星"
          },
          {
            imageUrl: require("@/assets/Line/astral/astral_8.svg"),
            name: "天王"
          },
          {
            imageUrl: require("@/assets/Line/astral/astral_9.svg"),
            name: "海王"
          },
          {
            imageUrl: require("@/assets/Line/astral/astral_10.svg"),
            name: "冥王"
          },
          {
            imageUrl: require("@/assets/Line/astral/astral_12.svg"),
            name: "天頂"
          }
        ],
        planets: [
          {
            imageUrl: require("@/assets/Line/astral/astral_1.svg"),
            name: "太陽"
          },
          {
            imageUrl: require("@/assets/Line/astral/astral_2.svg"),
            name: "月亮"
          },
          {
            imageUrl: require("@/assets/Line/astral/astral_3.svg"),
            name: "水星"
          },
          {
            imageUrl: require("@/assets/Line/astral/astral_4.svg"),
            name: "金星"
          },
          {
            imageUrl: require("@/assets/Line/astral/astral_5.svg"),
            name: "火星"
          },
          {
            imageUrl: require("@/assets/Line/astral/astral_6.svg"),
            name: "木星"
          },
          {
            imageUrl: require("@/assets/Line/astral/astral_7.svg"),
            name: "土星"
          },
          {
            imageUrl: require("@/assets/Line/astral/astral_8.svg"),
            name: "天王"
          },
          {
            imageUrl: require("@/assets/Line/astral/astral_9.svg"),
            name: "海王"
          },
          {
            imageUrl: require("@/assets/Line/astral/astral_10.svg"),
            name: "冥王"
          },
          {
            imageUrl: require("@/assets/Line/astral/astral_11.svg"),
            name: "上升"
          },
          {
            imageUrl: require("@/assets/Line/astral/astral_12.svg"),
            name: "天頂"
          }
          // {
          //   imageUrl: require("@/assets/Line/astral/astral_13.svg"),
          //   name: "凱龍"
          // },
          // {
          //   imageUrl: require("@/assets/Line/astral/astral_14.svg"),
          //   name: "穀神"
          // },
          // {
          //   imageUrl: require("@/assets/Line/astral/astral_15.svg"),
          //   name: "智神"
          // },
          // {
          //   imageUrl: require("@/assets/Line/astral/astral_16.svg"),
          //   name: "婚神"
          // },
          // {
          //   imageUrl: require("@/assets/Line/astral/astral_17.svg"),
          //   name: "灶神"
          // },
          // {
          //   imageUrl: require("@/assets/Line/astral/astral_18.svg"),
          //   name: "北交"
          // },
          // {
          //   imageUrl: require("@/assets/Line/astral/astral_19.svg"),
          //   name: "南交"
          // },
          // {
          //   imageUrl: require("@/assets/Line/astral/astral_20.svg"),
          //   name: "莉莉絲"
          // },
          // {
          //   imageUrl: require("@/assets/Line/astral/astral_21.svg"),
          //   name: "福點"
          // },
          // {
          //   imageUrl: require("@/assets/Line/astral/astral_22.svg"),
          //   name: "宿命"
          // },
          // {
          //   imageUrl: require("@/assets/Line/astral/astral_23.svg"),
          //   name: "東昇"
          // },
          // {
          //   imageUrl: require("@/assets/Line/astral/astral_24.svg"),
          //   name: "下降"
          // },
          // {
          //   imageUrl: require("@/assets/Line/astral/astral_25.svg"),
          //   name: "天底"
          // }
        ],
        palaces: [],
        phases: [
          "日",
          "月",
          "水",
          "金",
          "火",
          "木",
          "土",
          "天",
          "海",
          "冥",
          "升",
          "頂"
        ],
        phases1: [],
        phases2: [],
        P: [],
        Q: [],
        T: [],
        Y: [],
        statsList: ["陰陽性", "三大模式", "四大元素"],
        ImgSrc: [
          {name: "牡羊", img: require("@/assets/Line/star-sign/star_1.svg")},
          {name: "金牛", img: require("@/assets/Line/star-sign/star_2.svg")},
          {name: "雙子", img: require("@/assets/Line/star-sign/star_3.svg")},
          {name: "巨蟹", img: require("@/assets/Line/star-sign/star_4.svg")},
          {name: "獅子", img: require("@/assets/Line/star-sign/star_5.svg")},
          {name: "處女", img: require("@/assets/Line/star-sign/star_6.svg")},
          {name: "天秤", img: require("@/assets/Line/star-sign/star_7.svg")},
          {name: "天蠍", img: require("@/assets/Line/star-sign/star_8.svg")},
          {name: "射手", img: require("@/assets/Line/star-sign/star_9.svg")},
          {name: "摩羯", img: require("@/assets/Line/star-sign/star_10.svg")},
          {name: "水瓶", img: require("@/assets/Line/star-sign/star_11.svg")},
          {name: "雙魚", img: require("@/assets/Line/star-sign/star_12.svg")}
        ],
        interpretationDatas: [],
        nowShow: null,
        afterShow: false
      };
    },
    computed: {
      panConfigItem() {
        return this.$store.state.panConfig.planetSet.configItem; //星盤設置設定檔
      },
      afterLogin() {
        return this.$store.state.afterLogin;
      },
      NowUserforWeb() {
        return this.$store.state.NowUserforWeb;
      }
    },
    created() {
    },
    mounted() {
      this.screenWidth = document.body.clientWidth;

      // console.log(this.NowUserforWeb);
      //   if (this.$cookie.get("al")) {
      //       this.$store.dispatch("setLoginStatus", true);
      //       let id = this.$cookie.get("utd");
      //       astrolabeAPI.Login(id).then(data => {
      //           this.$store.state.lineAccount = this.id;
      //           window.localStorage["token"] = data.Data.Token;
      //           this.getData();
      //       });
      //   } else {
      //       this.$router.push({path: "/"});
      //   }
      //基本盤設置
      let paramPan = {
        width: 480,
        maxWidth: 500, //最大屏幕宽度
        type: 0,
        data2: null,
        panStyle: "A32"
      };
      this.paramPan = paramPan;

      this.afterapi = true;


      const that = this;
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.getElementById(
            "astrolabe__bg"
          ).clientWidth;
          that.paramPan.width = window.screenWidth;
        })();
      };
    },
    methods: {
      showUserFileList() {
        this.activeFileList = true;
      },
      closeFriendList() {
        this.activeFileList = false;

        this.paramPan.data1 = this.NowUserforWeb.AstralRadians;
        this.nowUser.name = this.NowUserforWeb.Name;
        this.nowUser.img = this.NowUserforWeb.ProfilePhotoSrc;
        let BD = this.NowUserforWeb.BirthTime;
        let BDtoStr = BD.split("");
        BD =
          BDtoStr[0] +
          BDtoStr[1] +
          BDtoStr[2] +
          BDtoStr[3] +
          "/" +
          BDtoStr[5] +
          BDtoStr[6] +
          "/" +
          BDtoStr[8] +
          BDtoStr[9];

        this.nowUser.birthday = BD;

        this.ShowPanData = this.NowUserforWeb;

        if (this.ShowPanData.Relationship === 'R0') {
          this.nowUser.img = this.$cookie.get("imgUrl");
        } else {
          this.nowUser.img = this.ShowPanData.ProfilePhotoSrc;
        }


        this.getParams();
        this.getInterpret();

        this.$forceUpdate();
      },
      showShareBox() {
        this.activeShare = true;
      },
      showSetup() {
        this.activeSetup = !this.activeSetup;
        if (!this.activeSetup) {
          this.$forceUpdate();
          this.afterapi = false;
          let that = this;
          setTimeout(function () {
            that.afterapi = true;
          }, 1);
        }
      },
      showSetupM() {
        //RWD
        this.activeSetupM = !this.activeSetupM;

        if (!this.activeSetup) {
          this.$forceUpdate();
        }
      },
      activeInterpret() {
        this.activeTab = "interpret";
      },
      activeParams() {
        this.activeTab = "params";
      },
      activePlanet() {
        this.activeTabItem = "planet";
      },
      activePalace() {
        this.activeTabItem = "palace";
      },
      activePhase() {
        this.activeTabItem = "phase";
      },
      activePattern() {
        this.activeTabItem = "pattern";
      },
      selectAstral(index) {
        for (let i = 0; i < this.interpretationDatas.length; i++) {
          if (i != index) {
            this.interpretationDatas[i].show = false;
          } else {
            this.interpretationDatas[i].show = true;
          }
        }
        this.nowShow = this.interpretationDatas[index];
      },
      //取得會員資料
      getData() {
        astrolabeAPI.Get_MemberInfo().then(data => {
          this.paramPan.width = document.getElementById(
            "astrolabe__bg"
          ).clientWidth;
          this.userInformation = data.Data;

          this.$store.state.NowUserforWeb =
            data.Data.AstrolabeFileSets[0].AstrolabeFiles[0];
          this.ShowPanData = this.$store.state.NowUserforWeb;

          this.paramPan.data1 = this.ShowPanData.AstralRadians;
          this.nowUser.name = this.ShowPanData.Name;
          if (this.ShowPanData.Relationship === 'R0') {
            this.nowUser.img = this.$cookie.get("imgUrl");
          } else {
            this.nowUser.img = this.ShowPanData.ProfilePhotoSrc;
          }

          // console.log(this.userInformation);

          let BD = this.userInformation.AstrolabeFileSets[0].AstrolabeFiles[0]
            .BirthTime;
          let BDtoStr = BD.split("");
          BD =
            BDtoStr[0] +
            BDtoStr[1] +
            BDtoStr[2] +
            BDtoStr[3] +
            "/" +
            BDtoStr[5] +
            BDtoStr[6] +
            "/" +
            BDtoStr[8] +
            BDtoStr[9];

          this.nowUser.birthday = BD;
          this.getParams();
          this.getInterpret();
          this.afterapi = true;
        });
      },
      getParams() {
        this.DetailNeed = this.$store.state.mainPlanetList.concat(
          this.$store.state.planetList
        );
        let detailNeed_fixed = [
          {
            Astral: "Sun",
            Degree: this.DetailNeed[0].val,
            Visable: this.DetailNeed[0].toggleSelect
          },
          {
            Astral: "Moon",
            Degree: this.DetailNeed[1].val,
            Visable: this.DetailNeed[1].toggleSelect
          },
          {
            Astral: "Mercury",
            Degree: this.DetailNeed[2].val,
            Visable: this.DetailNeed[2].toggleSelect
          },
          {
            Astral: "Venus",
            Degree: this.DetailNeed[3].val,
            Visable: this.DetailNeed[3].toggleSelect
          },
          {
            Astral: "Mars",
            Degree: this.DetailNeed[4].val,
            Visable: this.DetailNeed[4].toggleSelect
          },
          {
            Astral: "Jupiter",
            Degree: this.DetailNeed[5].val,
            Visable: this.DetailNeed[5].toggleSelect
          },
          {
            Astral: "Saturn",
            Degree: this.DetailNeed[6].val,
            Visable: this.DetailNeed[6].toggleSelect
          },
          {
            Astral: "Uranus",
            Visable: this.DetailNeed[18].toggleSelect
          },
          {
            Astral: "Neptune",
            Visable: this.DetailNeed[19].toggleSelect
          },
          {
            Astral: "Pluto",
            Visable: this.DetailNeed[20].toggleSelect
          },
          {
            Astral: "Ascendant",
            Visable: this.DetailNeed[21].toggleSelect
          },
          {
            Astral: "Midheaven",
            Visable: this.DetailNeed[22].toggleSelect
          },
          {
            Astral: "Chiron",
            Visable: this.DetailNeed[23].toggleSelect
          },
          {
            Astral: "Ceres",
            Visable: this.DetailNeed[24].toggleSelect
          },
          {
            Astral: "Pallas",
            Visable: this.DetailNeed[25].toggleSelect
          },
          {
            Astral: "Juno",
            Visable: this.DetailNeed[26].toggleSelect
          },
          {
            Astral: "Vesta",
            Visable: this.DetailNeed[27].toggleSelect
          },
          {
            Astral: "NoNode",
            Visable: this.DetailNeed[28].toggleSelect
          },
          {
            Astral: "SoNode",
            Visable: this.DetailNeed[29].toggleSelect
          },
          {
            Astral: "Lilith",
            Visable: this.DetailNeed[30].toggleSelect
          },
          {
            Astral: "Fortune",
            Visable: this.DetailNeed[31].toggleSelect
          },
          {
            Astral: "Vertex",
            Visable: this.DetailNeed[32].toggleSelect
          },
          {
            Astral: "EaPoint",
            Visable: this.DetailNeed[33].toggleSelect
          },
          {
            Astral: "Descendant",
            Visable: this.DetailNeed[34].toggleSelect
          },
          {
            Astral: "IC",
            Visable: this.DetailNeed[35].toggleSelect
          },
          {
            Phase: "0",
            Degree: this.DetailNeed[7].val,
            Visable: this.DetailNeed[7].toggleSelect
          },
          {
            Phase: "90",
            Degree: this.DetailNeed[8].val,
            Visable: this.DetailNeed[8].toggleSelect
          },
          {
            Phase: "120",
            Degree: this.DetailNeed[9].val,
            Visable: this.DetailNeed[9].toggleSelect
          },
          {
            Phase: "180",
            Degree: this.DetailNeed[10].val,
            Visable: this.DetailNeed[10].toggleSelect
          },
          {
            Phase: "60",
            Degree: this.DetailNeed[11].val,
            Visable: this.DetailNeed[11].toggleSelect
          },
          {
            Phase: "30",
            Degree: this.DetailNeed[12].val,
            Visable: this.DetailNeed[12].toggleSelect
          },
          {
            Phase: "45",
            Degree: this.DetailNeed[13].val,
            Visable: this.DetailNeed[13].toggleSelect
          },
          {
            Phase: "72",
            Degree: this.DetailNeed[14].val,
            Visable: this.DetailNeed[14].toggleSelect
          },
          {
            Phase: "135",
            Degree: this.DetailNeed[15].val,
            Visable: this.DetailNeed[15].toggleSelect
          },
          {
            Phase: "144",
            Degree: this.DetailNeed[16].val,
            Visable: this.DetailNeed[16].toggleSelect
          },
          {
            Phase: "150",
            Degree: this.DetailNeed[17].val,
            Visable: this.DetailNeed[17].toggleSelect
          }
        ];
        this.$store.state.getDetailImport.SetupConfigs = detailNeed_fixed;
        this.$store.state.getDetailImport.AstralRadianSet = this.ShowPanData.AstralRadianSet;
        this.$store.state.getDetailImport.RetAstralSet = this.ShowPanData.RetAstralSet;

        astrolabeAPI
          .Get_AstrolabeParams({
            SetupConfigs: this.$store.state.getDetailImport.SetupConfigs,
            AstralRadianSet: this.$store.state.getDetailImport.AstralRadianSet,
            RetAstralSet: this.$store.state.getDetailImport.RetAstralSet
          })
          .then(data => {
            data = data.Data;
            //星位
            for (let i = 0; i < data.ConstellationNodes.length; i++) {
              for (let j = 0; j < this.planets.length; j++) {
                if (data.ConstellationNodes[i].Astral === this.planets[j].name) {
                  this.planets[j].star = data.ConstellationNodes[i].Constellation;
                  this.planets[j].angle = data.ConstellationNodes[i].Angle;
                  this.planets[j].house = data.ConstellationNodes[i].House;
                  this.planets[j].retrograde =
                    data.ConstellationNodes[i].Retrograde;
                }
              }
            }

            for (let i = 0; i < this.planets.length; i++) {
              if (
                this.planets[i].star === "" ||
                this.planets[i].star === null ||
                this.planets[i].star === undefined
              ) {
                this.planets[i].show = false;
              } else {
                this.planets[i].star = this.planets[i].star + "座";
                this.planets[i].show = true;
              }
            }

            this.palaces = data.HouseNodes;

            //相位
            this.phases1 = [];
            for (let i = 0; i < data.PhaseNodes.length; i++) {
              this.phases1.push(data.PhaseNodes[i].Phases);
            }
            // console.log(this.phases1);
            //參考索引值
            let CssArr = [
              ["", "", "", "", "", "", "", "", "", "", "", ""],
              ["", "", "", "", "", "", "", "", "", "", "", ""],
              ["", "", "", "", "", "", "", "", "", "", "", ""],
              ["", "", "", "", "", "", "", "", "", "", "", ""],
              ["", "", "", "", "", "", "", "", "", "", "", ""],
              ["", "", "", "", "", "", "", "", "", "", "", ""],
              ["", "", "", "", "", "", "", "", "", "", "", ""],
              ["", "", "", "", "", "", "", "", "", "", "", ""],
              ["", "", "", "", "", "", "", "", "", "", "", ""],
              ["", "", "", "", "", "", "", "", "", "", "", ""],
              ["", "", "", "", "", "", "", "", "", "", "", ""],
              ["", "", "", "", "", "", "", "", "", "", "", ""]
            ];
            for (let i = 0; i < this.phases1.length; i++) {
              for (let j = 0; j < this.phases1[i].length; j++) {
                if (this.phases1[i][j] === "合") {
                  CssArr[i][j] = "phase-neutral";
                } else if (
                  this.phases1[i][j] === "沖" ||
                  this.phases1[i][j] === "刑" ||
                  this.phases1[i][j] === "梅"
                ) {
                  CssArr[i][j] = "phase-ominous";
                } else if (
                  this.phases1[i][j] === "拱" ||
                  this.phases1[i][j] === "六"
                ) {
                  CssArr[i][j] = "phase-lucky";
                } else {
                  CssArr[i][j] = " ";
                }
              }
            }
            this.phases2 = CssArr;

            //統計
            this.P = data.StatisticsNode.P_Notes;
            this.Q = data.StatisticsNode.Q_Nodes;
            this.T = data.StatisticsNode.T_Nodes;
            this.Y = data.StatisticsNode.Y_Nodes;

            // console.log(this.Y);
          });
      },
      getInterpret() {
        astrolabeAPI
          .Get_AstrolabeInterpretations({
            Type: "B",
            AstralRadianSet: this.ShowPanData.AstralRadianSet
          })
          .then(rstDatas => {
            // console.log(rstDatas.Data);
            let saveArr = [];
            // 回傳資料排序塞入
            for (let i = 0; i < rstDatas.Data.length; i++) {
              this.interpretationDatas[i] = rstDatas.Data[i];
              if (this.interpretationDatas[i].Content) {
                //console.log(i + "  " + this.interpretationDatas[i].Content);
                saveArr.push(this.interpretationDatas[i]);
              }
            }
            this.interpretationDatas = saveArr;

            //回傳資料對應圖片置入
            for (let i = 0; i < this.interpretationDatas.length; i++) {
              let compareName = this.interpretationDatas[i].Title.split("");
              compareName = compareName[2] + compareName[3];
              for (let j = 0; j < this.ImgSrc.length; j++) {
                if (compareName === this.ImgSrc[j].name) {
                  this.interpretationDatas[i].imgSrc = this.ImgSrc[j].img;
                }
              }
            }

            for (let i = 0; i < this.interpretationDatas.length; i++) {
              let compareName = this.interpretationDatas[i].Title.split("");
              compareName = compareName[0] + compareName[1];
              for (let j = 0; j < this.astralList.length; j++) {
                if (compareName === this.astralList[j].name) {
                  this.interpretationDatas[i].imageUrl = this.astralList[
                    j
                    ].imageUrl;
                  this.interpretationDatas[i].iconName = compareName;
                }
              }
            }

            this.interpretationDatas[0].show = false;
            this.interpretationDatas[1].show = true;

            for (let i = 2; i < this.interpretationDatas.length; i++) {
              this.interpretationDatas[i].show = false;
            }
            this.nowShow = this.interpretationDatas[1];

            // console.log(this.interpretationDatas);

            this.afterShow = true;
            //例子this.interpretationDatas[0].Title 可以拿到 "上升巨蟹" this.interpretationDatas[0].Content 可以拿到內文
          });
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "@/scss/webPage/astrolabe.scss";

  .custom-container-pan {
    width: 90%;
    height: 100%;
    margin: 0 auto;
    padding: 0 16px;
  }

  @media (max-width: 959px) {
    .custom-container-pan {
      width: 100%;
      padding: 0;
    }
  }

  @media (max-width: 599px) {
    .astrolabe {
      .astrolabe__wrap {
        .user__avatar {
          width: 40px !important;
          height: 40px !important;
        }
      }
    }
  }
</style>


