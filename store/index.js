export const state = () => ({

    //web版
    afterLogin: false,
    NowUserforWeb : null,
    NowUserforWebD1 : null,
    NowUserforWebD2 : null,
    //
    Loading:false,
    //新
    lineAccount: null,
    MemberData: [],
    MyData: [],
    ShowPanData: {},
    LineData: {},
    friendListChanged: false,
    getDetailImport: {
      SetupConfigs: [],
      AstralRadianSet: null,
      RetAstralSet: null,
    },
    panConfig: {
      //style: 'A32',
      //style: '专业',
      style: '文字',
      type: 0,
      planetSet: {
        configModel: '默认设置',
        configItem: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      }, //十大行星+两大虚点+六小行星+四个点
    },
    //double盤
    doublePanLineAccount: null,
    doublePanMember: [],
    nowShowDoublePan: [],
    hasNoFriend: false,
    firstTimeAddFriend : false,
    selectedType: 'C11',
    //舊
    afterAdd: false,
    addWho : null,
    needReload : true,
    needReloadDBL : true,
    MemberToken: null,
    Line: {
      Name: null,
      Img: require("@/assets/Line/cat.png"),
    },
    deleteID: null,
    isFromCreateNew: false,
    userFiles: {
      Name: null,
      Gender: null,
      BirthDayDate: null,
      BirthDayTime: null,
      BornPlace: null,
    },
    editUserFiles: {},
    nowData1: [],
    nowUser: {},
    mainPlanetList: [
      {
        imageUrl: require("@/assets/Line/astral/astral_1.svg"),
        name: "太陽",
        toggleImg: require("@/assets/Line/disable-eye.svg"),
        toggleSelect: true,
        range: 15,
        val: 15
      },
      {
        imageUrl: require("@/assets/Line/astral/astral_2.svg"),
        name: "月亮",
        toggleImg: require("@/assets/Line/disable-eye.svg"),
        toggleSelect: true,
        range: 15,
        val: 12
      },
      {
        imageUrl: require("@/assets/Line/astral/astral_3.svg"),
        name: "水星",
        toggleImg: require("@/assets/Line/eye.svg"),
        toggleSelect: true,
        range: 15,
        val: 7
      },
      {
        imageUrl: require("@/assets/Line/astral/astral_4.svg"),
        name: "金星",
        toggleImg: require("@/assets/Line/eye.svg"),
        toggleSelect: true,
        range: 15,
        val: 7
      },
      {
        imageUrl: require("@/assets/Line/astral/astral_5.svg"),
        name: "火星",
        toggleImg: require("@/assets/Line/eye.svg"),
        toggleSelect: true,
        range: 15,
        val: 7 //8
      },
      {
        imageUrl: require("@/assets/Line/astral/astral_6.svg"),
        name: "木星",
        toggleImg: require("@/assets/Line/eye.svg"),
        toggleSelect: true,
        range: 15,
        val: 5 //9
      },
      {
        imageUrl: require("@/assets/Line/astral/astral_7.svg"),
        name: "土星",
        toggleImg: require("@/assets/Line/eye.svg"),
        toggleSelect: true,
        range: 15,
        val: 5 //9
      },
      {
        name: '合(0度)',
        toggleImg: require("@/assets/Line/eye.svg"),
        toggleSelect: true,
        range: 15,
        val: 7
      },
      {
        name: '刑(90度)',
        toggleImg: require("@/assets/Line/eye.svg"),
        toggleSelect: true,
        range: 15,
        val: 6
      },
      {
        name: '拱(120度)',
        toggleImg: require("@/assets/Line/eye.svg"),
        toggleSelect: true,
        range: 15,
        val: 5 //6
      },
      {
        name: '沖(180度)',
        toggleImg: require("@/assets/Line/eye.svg"),
        toggleSelect: true,
        range: 15,
        val: 5 //6
      },
      {
        name: '六合(60度)',
        toggleImg: require("@/assets/Line/eye.svg"),
        toggleSelect: true,
        range: 15,
        val: 5
      },
      {
        name: '十二分(30度)',
        toggleImg: require("@/assets/Line/closed-eye.svg"),
        toggleSelect: false,
        range: 2,
        val: 1.5
      },
      {
        name: '八分(45度)',
        toggleImg: require("@/assets/Line/closed-eye.svg"),
        toggleSelect: false,
        range: 2,
        val: 1.5
      },
      {
        name: '五分(72度)',
        toggleImg: require("@/assets/Line/closed-eye.svg"),
        toggleSelect: false,
        range: 2,
        val: 1.5
      },
      {
        name: '補八分(135度)',
        toggleImg: require("@/assets/Line/closed-eye.svg"),
        toggleSelect: false,
        range: 2,
        val: 1.5
      },
      {
        name: '補五分(144度)',
        toggleImg: require("@/assets/Line/closed-eye.svg"),
        toggleSelect: false,
        range: 2,
        val: 1.5
      },
      {
        name: '梅花(150度)',
        toggleImg: require("@/assets/Line/closed-eye.svg"),
        toggleSelect: false,
        range: 2,
        val: 1.5
      },
    ],
    planetList: [
      {
        imageUrl: require("@/assets/Line/astral/astral_8.svg"),
        name: "天王",
        toggleImg: require("@/assets/Line/eye.svg"),
        toggleSelect: true
      },
      {
        imageUrl: require("@/assets/Line/astral/astral_9.svg"),
        name: "海王",
        toggleImg: require("@/assets/Line/eye.svg"),
        toggleSelect: true
      },
      {
        imageUrl: require("@/assets/Line/astral/astral_10.svg"),
        name: "冥王",
        toggleImg: require("@/assets/Line/eye.svg"),
        toggleSelect: true
      },
      {
        imageUrl: require("@/assets/Line/astral/astral_11.svg"),
        name: "上升",
        toggleImg: require("@/assets/Line/eye.svg"),
        toggleSelect: true

      },
      {
        imageUrl: require("@/assets/Line/astral/astral_12.svg"),
        name: "天頂",
        toggleImg: require("@/assets/Line/eye.svg"),
        toggleSelect: true

      },
      {
        imageUrl: require("@/assets/Line/astral/astral_13.svg"),
        name: "凱龍",
        toggleImg: require("@/assets/Line/closed-eye.svg"),
        toggleSelect: false

      },
      {
        imageUrl: require("@/assets/Line/astral/astral_14.svg"),
        name: "穀神",
        toggleImg: require("@/assets/Line/closed-eye.svg"),
        toggleSelect: false

      },
      {
        imageUrl: require("@/assets/Line/astral/astral_15.svg"),
        name: "智神",
        toggleImg: require("@/assets/Line/closed-eye.svg"),
        toggleSelect: false

      },
      {
        imageUrl: require("@/assets/Line/astral/astral_16.svg"),
        name: "婚神",
        toggleImg: require("@/assets/Line/closed-eye.svg"),
        toggleSelect: false

      },
      {
        imageUrl: require("@/assets/Line/astral/astral_17.svg"),
        name: "灶神",
        toggleImg: require("@/assets/Line/closed-eye.svg"),
        toggleSelect: false
      },
      {
        imageUrl: require("@/assets/Line/astral/astral_18.svg"),
        name: "北交",
        toggleImg: require("@/assets/Line/closed-eye.svg"),
        toggleSelect: false
      },
      {
        imageUrl: require("@/assets/Line/astral/astral_19.svg"),
        name: "南交",
        toggleImg: require("@/assets/Line/closed-eye.svg"),
        toggleSelect: false

      },
      {
        imageUrl: require("@/assets/Line/astral/astral_20.svg"),
        name: "莉莉絲",
        toggleImg: require("@/assets/Line/closed-eye.svg"),
        toggleSelect: false
      },
      {
        imageUrl: require("@/assets/Line/astral/astral_21.svg"),
        name: "福點",
        toggleImg: require("@/assets/Line/closed-eye.svg"),
        toggleSelect: false
      },
      {
        imageUrl: require("@/assets/Line/astral/astral_22.svg"),
        name: "宿命",
        toggleImg: require("@/assets/Line/closed-eye.svg"),
        toggleSelect: false
      },
      {
        imageUrl: require("@/assets/Line/astral/astral_23.svg"),
        name: "東昇",
        toggleImg: require("@/assets/Line/closed-eye.svg"),
        toggleSelect: false
      },
      {
        imageUrl: require("@/assets/Line/astral/astral_24.svg"),
        name: "下降",
        toggleImg: require("@/assets/Line/closed-eye.svg"),
        toggleSelect: false
      },
      {
        imageUrl: require("@/assets/Line/astral/astral_25.svg"),
        name: "天底",
        toggleImg: require("@/assets/Line/closed-eye.svg"),
        toggleSelect: false
      },
    ],
    panConfigPhase: [
      // 主星
      {
        name: '太陽',
        state: true,
        range: 15,
        val: 15
      },
      {
        name: '月亮',
        state: true,
        range: 15,
        val: 12
      },
      {
        name: '水星',
        state: true,
        range: 15,
        val: 7
      },
      {
        name: '金星',
        state: true,
        range: 15,
        val: 7
      },
      {
        name: '火星',
        state: true,
        range: 15,
        val: 7 //8
      },
      {
        name: '木星',
        state: true,
        range: 15,
        val: 5 //9
      },
      {
        name: '土星',
        state: true,
        range: 15,
        val: 5 //9
      },
      // 相位
      {
        name: '合(0度)',
        state: true,
        range: 15,
        val: 7
      },
      {
        name: '刑(90度)',
        state: true,
        range: 15,
        val: 6
      },
      {
        name: '拱(120度)',
        state: true,
        range: 15,
        val: 5 //6
      },
      {
        name: '沖(180度)',
        state: true,
        range: 15,
        val: 5 //6
      },
      {
        name: '六合(60度)',
        state: true,
        range: 15,
        val: 5
      },
      {
        name: '十二分(30度)',
        state: false,
        range: 2,
        val: 1.5
      },
      {
        name: '八分(45度)',
        state: false,
        range: 2,
        val: 1.5
      },
      {
        name: '五分(72度)',
        state: false,
        range: 2,
        val: 1.5
      },
      {
        name: '補八分(135度)',
        state: false,
        range: 2,
        val: 1.5
      },
      {
        name: '補五分(144度)',
        state: false,
        range: 2,
        val: 1.5
      },
      {
        name: '梅花(150度)',
        state: false,
        range: 2,
        val: 1.5
      },
    ],
    Data1: null,
    Data2: null,

})

export const getters = {
  getPanConfigPhase: (state) => {
    return state.panConfigPhase
  },
}

export const mutations = {
    //web
    updateLoginStatus (state, newValue) {
      state.afterLogin = newValue;
    },
    //loading
    updateLoadingStatus (state, payload) {
      state.Loading = payload.Loading
    },
    //新
    setMemberData(state, newValue) {
      state.MemberData = newValue;
    },
    setMyData(state, newValue) {
      state.MemberData = newValue;
    },
    setShowPanData(state, newValue) {
      state.ShowPanData = newValue;
    },
    setLineData(state, newValue) {
      state.LineData = newValue;
    },


    //舊
    setMemberToken(state, newValue) {
      state.MemberToken = newValue;
    },
    setLineAccount(state, newValue) {
      state.lineAccount = newValue;
    },
    setPanConfigPhase(state, data) {
      state.panConfigPhase = data;
    },
    setPanConfig(state, panConfig) {
      for (let item in panConfig) {
        state.panConfig[item] = panConfig[item];
      }
    },
    setFromCreateNew(state, newValue) {
      state.isFromCreateNew = newValue;
    },
    setUserFiles(state, newValue) {
      state.userFiles = newValue;
    },
    setUserFileName(state, newValue) {
      state.userFiles.Name = newValue;
    },
    setUserFileGender(state, newValue) {
      state.userFiles.Gender = newValue;
    },
    setUserFileBirthDayDate(state, newValue) {
      state.userFiles.BirthDayDate = newValue;
    },
    setUserFileBirthDayTime(state, newValue) {
      state.userFiles.BirthDayTime = newValue;
    },
    setUserFileBornPlace(state, newValue) {
      state.userFiles.BornPlace = newValue;
    },
    setData1(state, newValue) {
      state.Data1 = newValue;
    },
    setData2(state, newValue) {
      state.Data2 = newValue;
    },

}

export const actions = {
    //web
    setLoginStatus: ({commit}, newValue) => {
      commit('updateLoginStatus', newValue);
    },


    //新
    setMemberData: ({commit}, newValue) => {
      commit('setMemberData', newValue);
    },
    setMyData: ({commit}, newValue) => {
      commit('setMyData', newValue);
    },
    setShowPanData: ({commit}, newValue) => {
      commit('setShowPanData', newValue);
    },
    setLineData: ({commit}, newValue) => {
      commit('setLineData', newValue);
    },


    //舊
    setMemberToken: ({commit}, newValue) => {
      commit('setMemberToken', newValue);
    },
    setLineAccount: ({commit}, newValue) => {
      commit('setLineAccount', newValue);
    },
    setFromCreateNew: ({commit}, newValue) => {
      commit('setFromCreateNew', newValue);
    },
    setPanConfig: function ({
                              state,
                              rootState,
                              commit,
                              dispatch,
                              getters
                            }, panConfig) {
      commit('setPanConfig', panConfig);
    },
    setPanConfigPhase({commit}, data) {
      commit('setPanConfigPhase', data);
    },
    setUserFiles: ({commit}, newValue) => {
      commit('setUserFile', newValue);
    },
    setUserFileName: ({commit}, newValue) => {
      commit('setUserFileName', newValue);
    },
    setUserFileGender: ({commit}, newValue) => {
      commit('setUserFileGender', newValue);
    },
    setUserFileBirthDayDate: ({commit}, newValue) => {
      commit('setUserFileBirthDayDate', newValue);
    },
    setUserFileBirthDayTime: ({commit}, newValue) => {
      commit('setUserFileBirthDayTime', newValue);
    },
    setUserFileBornPlace: ({commit}, newValue) => {
      commit('setUserFileBornPlace', newValue);
    },
    setData1: ({commit}, newValue) => {
      commit('setData1', newValue);
    },
    setData2: ({commit}, newValue) => {
      commit('setData2', newValue);
    },

}
