<template>
  <div>
    <div class="userfile__box hidden-xs-only" overflow-hidden>
      <v-layout class="header" align-center>
        <div class="header__img">
          <img src="@/assets/WebPage/friend-list.svg" alt/>
        </div>
        <span class="header__title">好友列表</span>
        <v-spacer></v-spacer>
        <div class="header__btn" @click="activeFileAdd = true">新增</div>
      </v-layout>

      <div class="list">
        <!--自己-->
        <div class="list__self">
          <div class="list__self__title">{{ MyData.Title }}</div>
          <v-layout class="user-info" align-center @click="ChangePan(MyData.AstrolabeFiles[0])">
            <v-avatar size="40" class="user-info__avatar">
              <img :src='this.$cookie.get("imgUrl")'/>
            </v-avatar>
            <span class="user-info__name">{{ MyData.AstrolabeFiles[0].Name }}</span>
            <span class="user-info__birth">{{ MyData.AstrolabeFiles[0].BirthTimeShow }}</span>
            <v-spacer></v-spacer>
            <!-- <span class="current mr-3" v-if="true">目前星盤</span>  -->
            <div class="file__btn edit" @click.stop="editFile(MyData.AstrolabeFiles[0])">編輯</div>
          </v-layout>
        </div>

        <!--朋友-->
        <div class="list__friends" v-for="(item , index) in MemberData" :key="index" v-if="hasData">
          <div class="list__friends__title">{{ item.Title }}</div>
          <v-layout
              class="user-info"
              align-center
              v-for="(i , ind) in item.AstrolabeFiles"
              :key="ind"
              @click="ChangePan(i)"
          >
            <!--新增好友new-->
            <span class="new-friend" v-if="i.IsNew">NEW !</span>
            <v-avatar size="40" class="user-info__avatar">
              <img :src="i.ProfilePhotoSrc"/>
            </v-avatar>
            <span class="user-info__name">{{ i.Name }}</span>
            <span class="user-info__birth">{{ i.BirthTimeShow }}</span>
            <v-spacer></v-spacer>
            <div class="file__btn delete" @click.stop="showDeleteBlock(i)">
              刪除
              <div class="delete__box" v-if="i.showDelete">
                <div class="delete__title">確定要刪除好友嗎</div>
                <div class="delete__btn">
                  <div class="delete__btn__y" @click.stop="deleteFile(i.AstrolabeFileId)">刪除</div>
                  <div class="delete__btn__n" @click.stop="cancelDelete(i , index)">取消</div>
                </div>
              </div>
            </div>
            <div class="file__btn edit" @click.stop="editFile(i)">編輯</div>
          </v-layout>
        </div>
        <!--沒朋友新增提示-->
        <v-layout class="nofriend" align-center column v-if="hasNoData">
          <img src="@/assets/Line/find-friend.svg" alt/>
          <div class="note">
            你還沒有任何好友資料喔
            <br/>快去新增吧
          </div>
          <div class="add-btn" @click="activeFileAdd = true">新增好友資料</div>
        </v-layout>
      </div>
    </div>
    <!--新增好友-->
    <div class="popup-mask" v-if="activeFileAdd">
      <font-awesome-icon class="cross-icon" :icon="['fas', 'times']" @click="activeFileAdd = false"></font-awesome-icon>
      <userFileAdd @closeClick="closeAdd"></userFileAdd>
    </div>
    <!--編輯好友-->
    <div class="popup-mask" v-if="activeFileEdit">
      <font-awesome-icon
          class="cross-icon"
          :icon="['fas', 'times']"
          @click="activeFileEdit = false"
      ></font-awesome-icon>
      <userFileEdit @closeClick="closeEdit"></userFileEdit>
    </div>

    <!--RWD-->
    <div class="userfile__box-m hidden-sm-and-up">
      <v-layout class="header" align-center>
        <div class="header__img">
          <img src="@/assets/WebPage/friend-list.svg" alt/>
        </div>
        <span class="header__title">好友列表</span>
      </v-layout>
      <v-layout class="notice" align-center>
        <span class="notice__text">向左滑動以編輯個人資料</span>
        <img class="notice__img" src="@/assets/Line/swipe.svg" alt/>
        <v-spacer></v-spacer>
        <div class="add__btn" @click="activeFileAdd = true">新增</div>
      </v-layout>
      <div class="list">
        <!--自己-->
        <div class="list__self">
          <div class="list__self__title">{{ MyData.Title }}</div>
          <!--向左滑動-->
          <swiper :options="swiperOption" ref="swiper">
            <swiper-slide class="menu">
              <v-layout class="user-info" align-center @click="ChangePan(MyData.AstrolabeFiles[0])">
                <v-avatar size="40" class="user-info__avatar">
                  <img :src="MyData.AstrolabeFiles[0].ProfilePhotoSrc"/>
                </v-avatar>
                <span class="user-info__name">{{ MyData.AstrolabeFiles[0].Name }}</span>
                <span class="user-info__birth">{{ MyData.AstrolabeFiles[0].BirthTimeShow }}</span>
                <v-spacer></v-spacer>
                <!-- <span class="current mr-3" v-if="true">目前星盤</span>  -->
              </v-layout>
            </swiper-slide>
            <swiper-slide class="btn-box self">
              <a class="btn edit-btn" @click="editFile(MyData.AstrolabeFiles[0])">編輯</a>
            </swiper-slide>
          </swiper>
        </div>

        <!--朋友-->
        <div class="list__friends" v-for="(item , index) in MemberData" :key="index" v-if="hasData">
          <div class="list__friends__title">{{ item.Title }}</div>
          <!--向左滑動-->
          <swiper
              :options="swiperOption"
              ref="swiper"
              v-for="(i , ind) in item.AstrolabeFiles"
              :key="ind"
          >
            <swiper-slide class="menu">
              <v-layout class="user-info" align-center @click="ChangePan(i)">
                <v-avatar size="40" class="user-info__avatar">
                  <img :src="i.ProfilePhotoSrc"/>
                </v-avatar>
                <span class="user-info__name">{{ i.Name }}</span>
                <span class="user-info__birth">{{ i.BirthTimeShow }}</span>
                <v-spacer></v-spacer>
                <!--新增好友new-->
                <span class="new-friend" v-if="i.IsNew">NEW !</span>
              </v-layout>
            </swiper-slide>
            <swiper-slide class="btn-box friend">
              <a class="btn del-btn" @click.stop="showDeletePopup(i.AstrolabeFileId)">刪除</a>
              <a class="btn edit-btn" @click.stop="editFile(i)">編輯</a>
            </swiper-slide>
          </swiper>
        </div>

        <!--沒朋友新增提示-->
        <v-layout class="nofriend" align-center column v-if="hasNoData">
          <img src="@/assets/Line/find-friend.svg" alt/>
          <div class="note">
            你還沒有任何好友資料喔
            <br/>快去新增吧
          </div>
          <div class="add-btn" @click="activeFileAdd = true">新增好友資料</div>
        </v-layout>
      </div>
      <!--刪除popup-->
      <div class="popup-mask" v-if="activeDeletePopup" @click="activeDeletePopup = false;">
        <div class="delete__popup">
          <div class="delete__popup__t">確定要刪除好友嗎</div>
          <div class="delete__popup__b">
            <div class="delete__popup__y" @click="deleteFile(dataBeRemove)">刪除</div>
            <div class="delete__popup__n" @click="activeDeletePopup = false;">取消</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import userFileAdd from "@/components/webPage/userFileAdd";
    import userFileEdit from "@/components/webPage/userFileEdit.vue";
    import {astrolabeAPI} from "../../api/AstrolabeAPI";

    export default {
        name: "",
        components: {
            userFileAdd,
            userFileEdit
        },
        data() {
            return {
                swiperOption: {
                    slidesPerView: "auto",
                    initialSlide: 0,
                    resistanceRatio: 0
                    //slideToClickedSlide: true
                },
                activeDeletePopup: false, ////手機版delete
                activeFileAdd: false,
                activeFileEdit: false,
                demoItems: [{show: false}, {show: false}],
                dataBeRemove: null,
                MemberData: null, //會員的資料
                MyData: null, //我的資料
                hasData: false, //有無資料判斷
                hasNoData: false,
                afterChange: false //因應當前星盤字串條例顯示使用，改為active class可忽略
            };
        },
        created() {
            this.getData();
        },
        methods: {
            showDeleteBlock(i) {
                this.hasData = false;
                this.MemberData.forEach(item => {
                    item.AstrolabeFiles.forEach(item1 => {
                        item1.showDelete = false;
                    });
                });
                i.showDelete = true;
                this.hasData = true;
            },
            cancelDelete(i, ind) {
                i.showDelete = false;
                this.$forceUpdate();
            },
            //手機版delete
            showDeletePopup(id) {
                this.dataBeRemove = id;
                this.activeDeletePopup = true;
            },
            editFile(Obj) {
                this.$store.state.editUserFiles = Obj;
                this.activeFileEdit = true;
            },
            closeEdit() {
                this.activeFileEdit = false;
                this.getData();
            },
            closeAdd() {
                this.activeFileAdd = false;
                this.getData();
            },
            ChangePan(i) {
                this.$store.state.NowUserforWeb = i;

                this.$emit("closeClick");
            },
            deleteFile(id) {
                astrolabeAPI.Delete_AstrolabeFile(id).then(data => {
                    // console.log(data);
                    this.MemberData.forEach((item, index) => {
                        item.AstrolabeFiles.forEach((item1, index1) => {
                            if (id === item1.AstrolabeFileId) {
                                // console.log(this.MemberData[index].AstrolabeFiles[index1]);
                                this.MemberData[index].AstrolabeFiles.splice(index1, 1);
                            }
                        });
                    });
                });
            },

            getData() {
                astrolabeAPI.Get_MemberInfo().then(data => {
                    // console.log(data);
                    this.$store.dispatch("setMemberData", data.Data.AstrolabeFileSets);
                    //朋友資料處理
                    this.MemberData = this.$store.state.MemberData;
                    const result = [
                        ...new Set(this.MemberData.map(item => JSON.stringify(item)))
                    ].map(item => JSON.parse(item)); //刪除重複資料
                    this.MemberData = result;

                    //處理後端回傳不良的生日格式並判斷當前是哪個星盤資料
                    for (let i = 0; i < this.MemberData.length; i++) {
                        for (let j = 0; j < this.MemberData[i].AstrolabeFiles.length; j++) {
                            let BD = this.MemberData[i].AstrolabeFiles[j].BirthTime;
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
                            this.MemberData[i].AstrolabeFiles[j].BirthTimeShow = BD;
                            this.MemberData[i].AstrolabeFiles[j].showDelete = false;

                            //判斷現在星盤顯示資料是否與朋友列表內某筆資料相同，是的話透過.now顯示當前星盤
                            if (
                                this.MemberData[i].AstrolabeFiles[j].AstrolabeFileId ===
                                this.$store.state.ShowPanData.AstrolabeFileId
                            ) {
                                this.MemberData[i].AstrolabeFiles[j].Now = true;
                                this.MemberData[i].AstrolabeFiles[j].IsNew = false;
                            } else {
                                this.MemberData[i].AstrolabeFiles[j].Now = false;
                            }
                        }
                    }

                    //個人資料
                    this.MyData = this.MemberData[0];
                    //剔除自己的資料
                    this.MemberData.shift();
                    //判斷有無朋友
                    if (this.MemberData.length !== 0) {
                        this.hasData = true;
                    } else {
                        this.hasNoData = true;
                    }
                    this.afterChange = true;
                    // console.log(this.MemberData);
                    // console.log(this.MyData);
                });
            }
        }
    };
</script>
<style lang="scss" scoped>
  @import "../../scss/_mixin.scss";
  @import "@/scss/webPage/userFileList.scss";

  .userfile__box {
    .list {
      height: calc(100% - 60px);
    }
  }

  @media (max-width: 599px) {
    .userfile__box-m {
      .list {
        height: calc(100vh - 107px);
      }
    }
  }
</style>

