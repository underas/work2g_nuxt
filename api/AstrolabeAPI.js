import axios from 'axios';
// import store from '../store';


let ApiBaseUrl = process.env.VUE_APP_ApiBaseUrl + '/api/';
let Config = {
    headers: {
        'Content-Type': 'application/json',
        'ApiId': process.env.VUE_APP_ApiId,
        'ApiKey': process.env.VUE_APP_ApiKey
    }
};
let urlencoded_config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
};

export const astrolabeAPI = {
    //取得Token
    Login: function (Id) {
        return new Promise(function (resolve , reject) {
            let url = ApiBaseUrl + 'Member/Login/' + Id;
            axios.get(url, Config).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data);
            })
        });
    },
    //取得會員資料
    Get_MemberInfo: function () {
        return new Promise(function (resolve , reject) {
            if (localStorage.token) {
                Config.headers.Authorization = 'Bearer '+  localStorage.token;
            }
            let url = ApiBaseUrl + 'Member/MemberInfo';
            axios.get(url, Config).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data);
            })
        });
    },
    //新增會員
    Add_MemberInfo: function (Arg) {
        return new Promise(function (resolve , reject) {
            let url = ApiBaseUrl + 'Member/MemberInfo';
            axios.post(url, Arg , Config).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data);
            })
        });
    },
    //新增檔案
    Add_AstrolabeFile: function (Arg) {
        return new Promise(function (resolve , reject) {
            if (localStorage.token) {
                Config.headers.Authorization = 'Bearer '+  localStorage.token;
            }
            let url = ApiBaseUrl + 'Member/AstrolabeFile';
            axios.post(url, Arg , Config).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data);
            })
        });
    },
    //更新檔案
    Update_AstrolabeFile: function (Arg) {
        return new Promise(function (resolve , reject) {
            if (localStorage.token) {
                Config.headers.Authorization = 'Bearer '+  localStorage.token;
            }
            let url = ApiBaseUrl + 'Member/AstrolabeFile';
            axios.put(url, Arg , Config).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data);
            })
        });
    },
    //刪檔
    Delete_AstrolabeFile: function (AstrolabeFileId) {
        return new Promise(function (resolve , reject) {
            if (localStorage.token) {
                Config.headers.Authorization = 'Bearer '+  localStorage.token;
            }
            let url = ApiBaseUrl + 'Member/AstrolabeFile/' + AstrolabeFileId;
            axios.delete(url, Config).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data);
            })
        });
    },
    //弧度
    Get_AstralRadians: function (Arg) {
        return new Promise(function (resolve ,reject) {
            let url = ApiBaseUrl + 'Astrolabes/AstralRadian?Arg=' + JSON.stringify(Arg);
            axios.get(url, Config).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data);
            })
        });
    },
    //解讀
    Get_AstrolabeInterpretations: function (Arg) {
        return new Promise(function (resolve ,reject) {
            let url = ApiBaseUrl + 'Astrolabes/Interpretation';
            axios.post(url, Arg , Config).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data);
            })
        });
    },
    //參數
    Get_AstrolabeParams: function (Arg) {
        return new Promise(function (resolve ,reject) {
            let url = ApiBaseUrl + 'Astrolabe/Parameter';
            axios.post(url, Arg , Config).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data);
            })
        });
    },
    //寄信
    Send_ContactMail: function (Arg) {
        return new Promise(function (resolve) {
            let url = ApiBaseUrl + 'System/ContactMail';
            axios.post(url, Arg, Config).then((response) => CallBack(resolve, response));
        });
    },
    //上傳圖片
    Upload_AstrolabeFileImgFile: function (Arg) {
        return new Promise(function (resolve ,reject) {
            Config.headers["enctype"] = 'multipart/form-data';
            if (localStorage.token) {
                Config.headers.Authorization = 'Bearer '+  localStorage.token;
            }
            let url = ApiBaseUrl + 'Member/AstrolabeFile/ProfilePhoto';
            axios.post(url, Arg , Config).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data);
            })
        });
    },
    //解讀
    Get_AstrolabeDBL_Interpretations: function (Arg) {
        return new Promise(function (resolve ,reject) {
            let url = ApiBaseUrl + 'Synastrys/Interpretation';
            axios.post(url, Arg , Config).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data);
            })
        });
    },
    Astrolabe_crypt : function(Type , params){
        return new Promise(function (resolve ,reject) {
            let url = ApiBaseUrl + 'Platform/' + Type + '/' + JSON.stringify(params);
            axios.get(url , Config).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data);
            })
        });
    },
    Astrolabe_share : function(str){
        return new Promise(function (resolve ,reject) {
            let url = ApiBaseUrl + 'Member/SharePhotoInfo?p=' + str ;
            console.log(url);
            axios.get(url, Config).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data);
            })
        });
    },
    Get_share_friend_data: function (Arg) {
        return new Promise(function (resolve ,reject) {
            let url = ApiBaseUrl + 'Member/ShareAstrolabeFile';
            axios.post(url, Arg , Config).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data);
            })
        });
    },
    //Line 登入驗證
    Line_LoginAuth: function (Arg) {
        return new Promise(function (resolve , reject) {
            let url = 'https://api.line.me/oauth2/v2.1/token';
            axios.post(url, Arg , urlencoded_config).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data);
            })
        });
    },
    //line登入後取得user資料
    Get_Line_data: function () {
        return new Promise(function (resolve , reject) {
            let url = 'https://api.line.me/v2/profile';
            Config.headers.Authorization = 'Bearer '+  localStorage.LT;
            axios.get(url, Config).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data);
            })
        });
    },

}

// axios.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     store.commit('updateLoadingStatus', { Loading: true});
//     return config;
// }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
// });
// // Add a response interceptor
// axios.interceptors.response.use(function (response) {
//     // Do something with response data
//     store.commit('updateLoadingStatus', { Loading: false});
//     return response;
// }, function (error) {
//     // Do something with response error
//     return Promise.reject(error);
// });
