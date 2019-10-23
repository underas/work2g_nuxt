<template>
  <div v-if="afterC">
    <div class="userfile__box hidden-xs-only" overflow-hidden>
      <v-layout class="header" align-center>
        <div class="header__img">
          <img src="@/assets/WebPage/friend-list.svg" alt/>
        </div>
        <span class="header__title">好友列表</span>
        <v-spacer></v-spacer>
        <div class="header__btn" @click="activeFileAdd = true">新增</div>
      </v-layout>

      <!-- 合盤 -->
      <div class="appraisal__bg">
        <div class="appraisal__img left">
          <img :src="MyData.AstrolabeFiles[0].ProfilePhotoSrc" alt/>
        </div>
        <div class="appraisal__img right">
          <img :src="MemberData[0].AstrolabeFiles[0].ProfilePhotoSrc" alt/>
        </div>

        <div class="appraisal">
          <v-layout class="user" column align-center>
            <v-avatar size="80" class="user__avatar">
              <img :src="NowUserforWebD1.Relationship === 'R0' ? this.$cookie.get('imgUrl') :  NowUserforWebD1.ProfilePhotoSrc"/>
            </v-avatar>
            <span class="user__name">{{ NowUserforWebD1.Name }}</span>
            <span class="user__birth">{{ NowUserforWebD1.BirthTimeShow }}</span>
          </v-layout>
          <v-layout class="center" column align-center>
            <img class="center__line" src="@/assets/WebPage/polyline.svg" alt/>
            <div class="center__btn" @click="getDoublePan()">取得合盤</div>
          </v-layout>
          <v-layout class="user" column align-center>
            <v-avatar size="80" class="user__avatar">
              <img :src="NowUserforWebD2.Relationship === 'R0' ? this.$cookie.get('imgUrl') : NowUserforWebD2.ProfilePhotoSrc"/>
            </v-avatar>
            <span class="user__name">{{ NowUserforWebD2.Name }}</span>
            <span class="user__birth">{{ NowUserforWebD2.BirthTimeShow }}</span>
          </v-layout>
        </div>
      </div>
      <!-- 合盤End -->

      <div class="list">
        <!--自己-->
        <div class="list__self">
          <div class="list__self__title">{{ MyData.Title }}</div>
          <v-layout class="user-info" align-center @click="ChangePan(MyData.AstrolabeFiles[0])">
            <v-avatar size="40" class="user-info__avatar">
              <img :src=" this.$cookie.get('imgUrl')"/>
            </v-avatar>
            <span class="user-info__name">{{ MyData.AstrolabeFiles[0].Name }}</span>
            <span class="user-info__birth">{{ MyData.AstrolabeFiles[0].BirthTimeShow }}</span>
            <v-spacer></v-spacer>
            <!-- <span class="current mr-3" v-if="true">目前星盤</span>  -->
            <!--勾勾-->
            <font-awesome-icon class="mr-3" icon="check" v-if="MyData.AstrolabeFiles[0].Now"></font-awesome-icon>
            <!--編輯-->
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
            <!--勾勾-->
            <font-awesome-icon class="mr-3" icon="check" v-if="i.Now"></font-awesome-icon>
            <!--編輯刪除-->
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

      <!-- 合盤 -->
      <div class="appraisal__bg">
        <div class="appraisal__img left">
          <img :src="MyData.AstrolabeFiles[0].ProfilePhotoSrc" alt/>
        </div>
        <div class="appraisal__img right">
          <img :src="MemberData[0].AstrolabeFiles[0].ProfilePhotoSrc" alt/>
        </div>

        <div class="appraisal">
          <v-layout class="user" column align-center>
            <v-avatar size="80" class="user__avatar">
              <img :src="MyData.AstrolabeFiles[0].ProfilePhotoSrc"/>
            </v-avatar>
            <span class="user__name">{{ MyData.AstrolabeFiles[0].Name }}</span>
            <span class="user__birth">{{ MyData.AstrolabeFiles[0].BirthTimeShow }}</span>
          </v-layout>
          <v-layout class="center" column align-center>
            <img class="center__line" src="@/assets/WebPage/polyline.svg" alt/>
            <div class="center__btn" @click="getDoublePan()">取得合盤</div>
          </v-layout>
          <v-layout class="user" column align-center>
            <v-avatar size="80" class="user__avatar">
              <img :src="MemberData[0].AstrolabeFiles[0].ProfilePhotoSrc"/>
            </v-avatar>
            <span class="user__name">{{ MemberData[0].AstrolabeFiles[0].Name }}</span>
            <span class="user__birth">{{ MemberData[0].AstrolabeFiles[0].BirthTimeShow }}</span>
          </v-layout>
        </div>
      </div>
      <!-- 合盤End -->

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
                <!--勾勾-->
                <font-awesome-icon class="mr-3" icon="check" v-if="MyData.AstrolabeFiles[0].Now"></font-awesome-icon>
                <!-- <font-awesome-icon class="mr-3" icon="check" v-if="i.Now"></font-awesome-icon> -->
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
                <!--勾勾-->
                <font-awesome-icon class="mr-3" icon="check" v-if="i.Now"></font-awesome-icon>
                <!-- <font-awesome-icon class="mr-3" icon="check" v-if="true"></font-awesome-icon> -->
                <!--新增好友new-->
                <span class="new-friend mr-2" v-if="i.IsNew && !i.Now">NEW !</span>
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
                afterChange: false, //因應當前星盤字串條例顯示使用，改為active class可忽略
                afterC : true
            };
        },
        async created() {
            this.getData();
        },
        computed: {
            NowUserforWebD1() {
                return this.$store.state.NowUserforWebD1;
            },
            NowUserforWebD2() {
                return this.$store.state.NowUserforWebD2;
            }
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
                this.afterC = false;
                let count = 0;
                if(this.MyData.AstrolabeFiles[0].Now){
                    count++;
                }
                this.MemberData.forEach(function(item , index){
                    item.AstrolabeFiles.forEach(function(item1 , ind){
                        if(item1.Now){
                            count++;
                        }
                    })
                });

                if(count === 2){
                    //已經選滿兩個
                    if(i.Now){
                        i.Now = false;
                    }else{
                        alert('已選擇兩筆，請先取消一筆');
                    }


                }if(count === 1){
                    if(i.Now){
                        i.Now = false;
                    }else{
                        i.Now = true;
                    }

                }if(count === 0){
                    i.Now = true;
                }
                this.afterC = true;
            },
            deleteFile(id) {
                if(this.MemberData.length === 1){
                    alert('至少要有一筆朋友資料');
                }else{
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
                    this.getData();
                }



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
                            if(this.MemberData.length !== 1){
                                if (
                                    this.MemberData[i].AstrolabeFiles[j].AstrolabeFileId ===
                                    this.$store.state.NowUserforWebD1.AstrolabeFileId ||
                                    this.MemberData[i].AstrolabeFiles[j].AstrolabeFileId ===
                                    this.$store.state.NowUserforWebD2.AstrolabeFileId
                                ) {
                                    this.MemberData[i].AstrolabeFiles[j].Now = true;
                                } else {
                                    this.MemberData[i].AstrolabeFiles[j].Now = false;
                                }
                            }
                        }
                    }

                    // console.log(this.MemberData);
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
                    // console.log("好友資料" + this.MemberData);
                    // console.log(this.MyData);
                });
            },

            //取得合盤
            getDoublePan() {
                if(this.MemberData.length > 0 ){
                    if(this.MyData.AstrolabeFiles[0].Now){
                        let 暫存 = [];
                        暫存.push(this.MyData.AstrolabeFiles[0]);
                        this.MemberData.forEach(function(item , index){
                            item.AstrolabeFiles.forEach(function(item1 , ind){
                                if(item1.Now){
                                    暫存.push(item1);
                                }
                            })
                        });
                        this.$store.state.NowUserforWebD1 = 暫存[0];
                        this.$store.state.NowUserforWebD2 = 暫存[1];

                    }else{
                        let 暫存 = [];
                        this.MemberData.forEach(function(item , index){
                            item.AstrolabeFiles.forEach(function(item1 , ind){
                                if(item1.Now){
                                    暫存.push(item1);
                                }
                            })
                        });
                        this.$store.state.NowUserforWebD1 = 暫存[0];
                        this.$store.state.NowUserforWebD2 = 暫存[1];
                    }


                    this.$emit("closeClick");
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
  @import "../../scss/_mixin.scss";
  @import "@/scss/webPage/userFileList.scss";

  .fa-check {
    color: #ee6daf;
  }

  .userfile__box {
    .list {
      height: calc(100% - 220px);
    }
  }

  // 合盤
  .appraisal__bg {
    position: relative;
    width: 100%;
    height: 160px;
    background-image: linear-gradient(123deg, #594388, #2d2050);

    /*bg image*/
    .appraisal__img {
      width: 160px;
      height: 160px;
      position: absolute;
      z-index: 0;
      top: 0;
      opacity: 0.1;

      &.left {
        left: 0;
      }

      &.right {
        right: 0;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }

    .appraisal {
      position: absolute;
      z-index: 1;
      top: 0;
      //
      display: flex;
      padding: 18px 65px 10px;

      width: 100%;
      height: 160px;
      color: #ffffff;

      .user {
        .user__avatar {
          img {
            border: solid 1px #ffffff;
            background-color: #312150;
          }
        }

        .user__name {
          margin-top: 8px;
          font-size: 20px;
        }

        .user__birth {
          font-size: 8px;
          opacity: 0.5;
        }
      }

      .center {
        width: 50%;

        .center__line {
          width: 100%;
        }

        .center__btn {
          @include center;
          width: 112px;
          height: 38px;
          border-radius: 20px;
          background-color: #ee6daf;
          cursor: pointer;
        }
      }
    }
  }

  @media (max-width: 599px) {
    .userfile__box-m {
      .list {
        height: calc(100vh - 267px);
      }
    }

    .appraisal__bg {
      box-shadow: 0 1px 6px 0 rgba(29, 3, 34, 0.33),
      0 2px 8px 0 rgba(113, 99, 255, 0.21);
      border: solid 0.7px rgba(255, 255, 255, 0.5);

      .appraisal {
        padding: 18px 25px 10px;

        .center {
          width: 50%;

          .center__line {
            width: 100%;
          }
        }
      }
    }
  }
</style>

