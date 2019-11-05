<template>
  <div>
    <canvas ref="astrolabe"></canvas>
  </div>
</template>

<!--该组件共四个参数-->
<!-- width:canvas图片尺寸 -->
<!-- panStyle:星盘样式 专业 A32 文字 清新 温暖 黑夜-->
<!-- type:星盘类型 0单盘 1双盘 2配对 -->
<!-- data1:双盘内圈/单盘 数据源 -->
<!-- data2:双盘外圈数据源 -->
<script>
  import {dealSingleData, dealDoubleData, dealSinglePlanet, dealDoublePlanet} from '../js/dealNatalData2.js';
  import {drawCircleAngle, drawCircleOrigin, drawIconAngle, drawRingOrigin, drawTextAngle, drawLineConn, drawLineAngle, drawImgAngle} from '../js/utilCanvas.js';
  import WebFont  from 'nuxt-webfontloader';
  export default {
    name: 'canvas-astrolabe',
    props: ['width', 'configItem', 'panStyle', 'type', 'data1', 'data2'],
    computed: {
    },
    created: function() {
      this.canvasInit();
    },
    mounted: function() {
      this.drawXingPan();
     	WebFont.load({
        custom: {
          families: ['iconfont'],
          // urls : ['app.vue']  //字体声明处，页面不需要引入该样式
        },
        loading:()=>{
        },
        active:()=>{ //字体渲染完成后 绘制星盘
        	this.drawXingPan();
        },
        fontinactive:()=>{
        	this.drawXingPan();
        },
        timeout:3000   //三秒后加载失败 调用fontinactive event
  		})
    },
    watch: {//监听数据，若参数改变则重绘
      width: function() {//画布宽度
        this.drawXingPan();
      },
      configItem: function() {
        this.drawXingPan();
      },
      panStyle: function() {
        this.drawXingPan();
      },
      type: function() {//绘盘类型——0单盘1双盘2配对盘
        this.drawXingPan();
      },
      data1: function() {
        this.drawXingPan();
      },
      data2: function() {
        this.drawXingPan();
      }
    },
    methods: {
      //初始化绘盘库函数drawAstrolabe
      canvasInit: function() {
        //若库函数已存在则直接返回——注：库函数有修改时要注释掉
        // if('undefined' != typeof drawAstrolabe){return;}
        (function(window){
          var iconPlanet = [  //行星图标-文字
            // '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
            /*'', '', '', '', '', '', '', '', '', '', ''*/
            //'', '', '', '', '', '', '', '', '', '',/* 上升 */ '', '', '', '', '', '', '',/* 北交 */  '', '', '', '', '', '', ''];
            '', '', '', '', '', '', '', '', '', '',/* 上升 */  '', '', '', '', '', '', '', '', '', '',/* 福點 */ '', '', '', '', '']
          var textPlanet = [  //行星名称-文字
            "日", "月", "水", "金", "火", "木", "土", "天", "海", "冥", "升", "頂", '凱', '谷', '智', '婚', '灶', '北', '南', '莉', '福', '宿', '東', '降', '底'] ;
          var imgPlanet = [
            require("@/assets/Line/astral-txt/astral-txt_1.svg"),
            require("@/assets/Line/astral-txt/astral-txt_2.svg"),
            require("@/assets/Line/astral-txt/astral-txt_3.svg"),
            require("@/assets/Line/astral-txt/astral-txt_4.svg"),
            require("@/assets/Line/astral-txt/astral-txt_5.svg"),
            require("@/assets/Line/astral-txt/astral-txt_6.svg"),
            require("@/assets/Line/astral-txt/astral-txt_7.svg"),
            require("@/assets/Line/astral-txt/astral-txt_8.svg"),
            require("@/assets/Line/astral-txt/astral-txt_9.svg"),
            require("@/assets/Line/astral-txt/astral-txt_10.svg"),
            require("@/assets/Line/astral-txt/astral-txt_11.svg"),
            require("@/assets/Line/astral-txt/astral-txt_12.svg"),
            require("@/assets/Line/astral-txt/astral-txt_13.svg"),
            require("@/assets/Line/astral-txt/astral-txt_14.svg"),
            require("@/assets/Line/astral-txt/astral-txt_15.svg"),
            require("@/assets/Line/astral-txt/astral-txt_16.svg"),
            require("@/assets/Line/astral-txt/astral-txt_17.svg"),
            require("@/assets/Line/astral-txt/astral-txt_18.svg"),
            require("@/assets/Line/astral-txt/astral-txt_19.svg"),
            require("@/assets/Line/astral-txt/astral-txt_20.svg"),
            require("@/assets/Line/astral-txt/astral-txt_21.svg"),
            require("@/assets/Line/astral-txt/astral-txt_22.svg"),
            require("@/assets/Line/astral-txt/astral-txt_23.svg"),
            require("@/assets/Line/astral-txt/astral-txt_24.svg"),
            require("@/assets/Line/astral-txt/astral-txt_25.svg"),
          ];
          var iconStar = [    //星座图标-文字, 天秤 牡羊
            //"", "", "", "", "", "", "", "", "", "", "", ""];
            '', '', '', '', '', '', '', '', '', '', '', ''];
          var textStar = [    //星座名称-文字
            "牡羊", "金牛", "雙子", "巨蟹", "獅子", "處女", "天秤", "天蠍", "射手", "摩羯", "水瓶", "雙魚"]
          
          var rOutOuter;
          var sizeDashed;       //虚线尺寸
          var colorStar = [];   //星座标识相关的配色方案
          //var colorPalace = []; //宫位标识相关的配色方案
          var colorPalace = '#ffffff';
          var colorPlanet = []; //行星标识相关的配色方案
          function setFlagColor(baseColor){//设置星体、宫位、星座颜色(基准是基色baseColor)
            for(var i = 0; i < 12; i++){
              colorStar[i] = baseColor[i % 4];
              //colorPalace[i] = baseColor[i % 4];
            }
            var colorMoon = '#7163FF'; //月亮配色——紫色
            var colorLittle = '#EE6DAF';//小行星配色——粉色
            var colorNorth = '#57E4DB';//北交点配色——淡蓝色
            var colorSouth = '#57E4DB'; //南交點配色——淡蓝色
            colorPlanet = [
              colorStar[0], colorMoon, colorStar[2], colorStar[1],
              colorStar[0], colorStar[0], colorStar[1], colorStar[2],
              colorMoon, colorMoon, colorStar[0], colorStar[1],
              colorLittle, colorLittle, colorLittle, colorLittle, colorLittle, colorNorth, colorSouth,
              colorSouth,colorSouth,colorSouth,colorSouth,colorSouth,colorSouth,colorSouth,colorSouth,colorSouth,colorSouth,colorSouth,colorSouth,];
          }
          /**白底版配色(專業版)
          **/
          function getWhiteColor(){
            //setFlagColor(["red", "#6A5A0C", "#046A4A", "#003366"]);
            setFlagColor(['#FF445B', '#FFA844', '#28CAB3', '#66E0F4']);//火土風水
            return {
              // colorOutCircle: "#656565",//外环颜色
              colorOutCircle: "#ffffff",//"#B9B9B9",//外环颜色
              colorInCircle: "#ffffff",//内环颜色
              colorMidCircle: "#ffffff",//中圈颜色
              colorPalaceLine: "#ffffff",//"#99cccc",//宫位线颜色
              colorXudian: "#57447e",//"#ff9999",//虚点宫位线颜色
              colorDu: "#ffffff",//"#000000",//专业版度颜色
              colorFen: "#ee6daf",//"#757575",//专业版分颜色
            }
          }
          /**黑底版配色
          **/
          function getBlackColor(){
            //setFlagColor(["red", '#DF9210', '#39E03E', '#5695C5']);
            setFlagColor(['#FF445B', '#FFA844', '#28CAB3', '#66E0F4']);//火土風水
            return {
              // colorOutCircle: "#DADADA",
              // colorPalaceLine: "#404D4C",
              // colorXudian: "#DADADA",
              colorOutCircle: "#ffffff",
              colorPalaceLine: "#404D4C",
              colorXudian: "#57447e",
            }
          }
          /**清新版配色
          **/
          function getFreshColor(){
            setFlagColor(["red", '#DF9210', '#39E03E', '#5695C5']);
            return {
              colorCircle: '#46D3E2',
              colorBackground: '#D5FBFF',
              colorXudian: '#46D3E2',
              colorPalaceLine: "#A7E6ED",
            }
          }
          /**温暖版配色
          **/
          function getWramColor(){
            setFlagColor(["red", '#DF9210', '#39E03E', '#5695C5']);
            return {
              colorCircle: '#FFADB7',
              colorBackground: '#FFDDE1',
              colorXudian: '#FFADB7',
              colorPalaceLine: "#FED1D6",
            }
          }
          /**黑夜版配色
          **/
          function getDarkColor(){
            setFlagColor(["red", '#DF9210', '#39E03E', '#5695C5']);
            return {
              colorRingOut: '#464646',
              colorRingMid: '#4A5A73',
              colorRingIn: '#3C3D44',
              colorCircle: 'white',
              colorBackground: '#FFDDE1',
              colorXudian: '#C3C067',
              colorPalaceLine: "#605F4D",
            }
          }
          var ctx = null;
          var configItem = [];
          var drawAstrolabe = function(_ctx, _width, _configItem, pType, style){
            //设置画布
            var width = _width;
            ctx = _ctx;
            ctx.lineWidth = 2;
            configItem = _configItem;
            ctx.translate(width, width);
            rOutOuter = width - 1;
            sizeDashed = rOutOuter * 0.02;
            //返回画图函数
            var handler = {
              '单盘':{
                '专业':drawProSingle,
                '文字':drawTextSingle,
                'A32':drawA32Single,
                '清新':drawFreshSingle,
                '温暖':drawWarmSingle,
                '黑夜':drawDarkSingle,
              },
              '双盘':{
                '专业':drawProDouble,
                '文字':drawTextDouble,
                'A32':drawA32Double,
                '清新':drawFreshDouble,
                '温暖':drawWarmDouble,
                '黑夜':drawDarkDouble,
              },
              '法达':{
                '专业':drawProFirdaria,
              }
            };
            var draw = handler[pType][style];
            return draw;
          }
          //单盘专业版
          function drawProSingle(objSingle){
            //1、单盘数据
            var {planetSingle,palace,phaseSingle} = dealSinglePlanet(objSingle, 0.015, configItem);
            //2、专业版配色
            var proColor = getWhiteColor();
            //var proColor = getBlackColor()
            //3、布局&尺寸，以rOutOuter为基准
            var rOutInner = rOutOuter * 0.909;
            var rInOuter = rOutOuter * 0.489;
            var rInInner = rOutOuter * 0.396;
            var rOutMid = (rOutInner + rOutOuter)/2;
            var rInMid = (rInInner + rInOuter)/2;
            var rPlanetFlag = rInOuter + (rOutInner - rInOuter) * 0.8;
            var rPhasePoint = rInInner * 0.96;
            var rMidDu = rInOuter + (rOutInner - rInOuter) * 0.565;
            var rMidStar = rInOuter + (rOutInner - rInOuter) * 0.379;
            var rMidFen = rInOuter + (rOutInner - rInOuter) * 0.207;
            var sizeStarFlag = rOutOuter * 0.06; //宮位星座
            var sizePalaceNum = rOutOuter * 0.045; //宮位
            var sizePlanetFlag = rOutOuter * 0.077;
            var sizeDu = rOutOuter * 0.05;//度字号
            var sizeFen = rOutOuter * 0.047;//分字号
            var sizeMidStar = rOutOuter * 0.07;//中圈星座字号
            //4、开始画图
            drawProSinglePan();
            function drawProSinglePan() {
              drawRingOrigin(ctx, rOutOuter, "#030420");//星盘底色#030420
              //1、画底图：四个圈
              drawCircleOrigin(ctx, rOutOuter, proColor.colorOutCircle);
              drawCircleOrigin(ctx, rOutInner, proColor.colorOutCircle);
              drawCircleOrigin(ctx, rInOuter, proColor.colorInCircle);
              drawCircleOrigin(ctx, rInInner, proColor.colorInCircle);
              //2、画宫位相关：宫位线、宫位编号、对应星座、度、分
              for(var i = 0; i < 12; i++){
                var angle = palace[i][1];
                var angleNext = (i == 11) ? 1 : palace[i + 1][1];
                var starNum = palace[i][2];
                var du = palace[i][3];
                var fen = palace[i][4];
                var colorLine = (i % 3 == 0) ? proColor.colorXudian : proColor.colorPalaceLine;
                drawLineAngle(ctx, -rInInner, -rOutInner, angle, colorLine);
                var angleNum = (angle + angleNext)/2;
                drawTextAngle(ctx, rInMid, angleNum, i + 1, colorPalace, sizePalaceNum);
                drawIconAngle(ctx, rOutMid, angle, iconStar[starNum], colorStar[starNum], sizeStarFlag);
                drawTextAngle(ctx, rOutMid, angle + 1/70, du, proColor.colorDu, sizeDu);
                drawTextAngle(ctx, rOutMid, angle - 1/70, fen, proColor.colorFen, sizeFen);
                var starNext = palace[(i + 1)%12][2];
                var starGap = (starNext - starNum + 12)%12;
                if(starGap > 1){
                  var angleRefer = angle + 1/70;
                  var angleGap = (angleNext - angle - 1/35)/starGap;
                  var starJieDuo;
                  for(var j = 1; j < starGap; j++){
                    starJieDuo = (starNum + j)%12;
                    drawIconAngle(ctx, rOutMid, angleRefer + j*angleGap, iconStar[starJieDuo], colorStar[starJieDuo], sizeStarFlag);
                  }
                }
              }
              //3、画行星相关(用调整后的角度):行星、对应星座、度、分
              for(var i = 0; i < 25; i++){
                if(configItem[i] === 0){continue;}
                var angleAdjust = planetSingle[i][5];
                var starNum = planetSingle[i][2];
                var du = planetSingle[i][3];
                var fen = planetSingle[i][4];
                drawIconAngle(ctx, rPlanetFlag, planetSingle[i][5], iconPlanet[i], colorPlanet[i], sizePlanetFlag);
                drawIconAngle(ctx, rMidStar, angleAdjust, iconStar[starNum], colorPlanet[i], sizeMidStar);
                drawTextAngle(ctx, rMidDu, angleAdjust, du, proColor.colorDu, sizeDu);
                drawTextAngle(ctx, rMidFen, angleAdjust,fen, proColor.colorFen, sizeFen);
              }
              //4、画相位
              phaseSingle.forEach(function(item){
                if(configItem[item[0]] == '1' && configItem[item[1]] == '1'){
                  drawLineConn(ctx, rPhasePoint, planetSingle[item[0]][1], rPhasePoint, planetSingle[item[1]][1], "#" + item[2], item[5], sizeDashed);
                }
                // drawLineConn(ctx, rPhasePoint, planetSingle[item[0]][1], rPhasePoint, planetSingle[item[1]][1], "#" + item[2], item[5], sizeDashed);
              })
            }
          }
          //单盘文字版
          function drawTextSingle(objSingle){
             //console.log(objSingle, 'objSingle')
            //1、单盘数据
            var {planetSingle, palace, phaseSingle} = dealSinglePlanet(objSingle, 0.024, configItem);
            // console.log("單盤數據:", planetSingle, palace, phaseSingle);
            //2、文字版颜色
            var textColor = getBlackColor();
            //3、布局&尺寸，以rOutOuter为基准
            var rOutInner = rOutOuter * 0.792;
            var rInOuter = rOutOuter * 0.744;
            var rInInner = rOutOuter * 0.652;
            var rOutMid = (rOutOuter + rOutInner)/2;
            var rInMid = (rInOuter + rInInner)/2;
            var rPlanetFlag = rInInner * 0.887;
            var rPhasePoint = rInInner * 0.796;
            var sizePalaceNum = rOutOuter * 0.05;
            var sizeStarFlag = rOutOuter * 0.065;
            var sizePlanetFlag = rOutOuter * 0.075;
            var sizePhasePoint = rInInner * 0.008;
            //4、开始画图
            drawTextSinglePan();
            function drawTextSinglePan() {
              drawRingOrigin(ctx, rOutOuter, "#030420");//星盘底色
              //1、画底图：四个圈、刻度线
              drawCircleOrigin(ctx, rOutOuter, textColor.colorOutCircle);
              drawCircleOrigin(ctx, rOutInner, textColor.colorOutCircle);
              drawCircleOrigin(ctx, rInOuter, textColor.colorOutCircle);
              drawCircleOrigin(ctx, rInInner, textColor.colorOutCircle);
              for(var i = 0; i < 360; i++){
                var color = (i % 5 == 0) ? textColor.colorOutCircle : textColor.colorPalaceLine;
                drawLineAngle(ctx, -rInOuter, -rOutInner, i/360, color);
              }
              //2、画宫位相关：宫位线、宫位编号、星座边界线、星座
              for(var i = 0; i < 12; i++){
                var angle = palace[i][1];
                var angleNext = (i == 11) ? 1 : palace[i + 1][1];
                if(i % 3 == 0){
                  drawLineAngle(ctx, 0, -rOutOuter, angle, textColor.colorXudian);
                }else{drawLineAngle(ctx, 0, -rInOuter, angle, textColor.colorPalaceLine);}
                drawTextAngle(ctx, rInMid, (angle + angleNext)/2, i + 1, colorPalace, sizePalaceNum);
                var angleStar = -palace[0][0]/360 + i/12;//星座边界的角度(-x轴逆时针方向)
                drawLineAngle(ctx, -rOutInner, -rOutOuter, angleStar, textColor.colorOutCircle);
                drawTextAngle(ctx, rOutMid, angleStar + 1/24, textStar[i], colorStar[i], sizeStarFlag);
                drawIconAngle(ctx, rOutMid, angleStar + 1/24 - 1/48, iconStar[i], colorStar[i], sizeStarFlag*1.6);
              }
              //3、画行星相关:行星名称、行星点位、名称与点位连线、分
              for(var i = 0; i < 25; i++){
                if(configItem[i] === 0){continue;}
                var angleAdjust = planetSingle[i][5];
                var angleOriginal = planetSingle[i][1];
                //此行渲染icon
                //drawTextAngle(ctx, rPlanetFlag, angleAdjust, textPlanet[i], colorPlanet[i], sizePlanetFlag);
                //改成圖片
                drawImgAngle(ctx, rPlanetFlag, angleAdjust, imgPlanet[i]);
                //
                drawCircleAngle(ctx, rPhasePoint, angleOriginal, sizePhasePoint, colorPlanet[i]);
                drawLineConn(ctx, rPhasePoint, angleOriginal, rPlanetFlag - sizePlanetFlag/2, angleAdjust, colorPlanet[i], 0);
              }
              //4、画相位
              // console.log(phaseSingle, 'phaseSingle')
              // console.log(planetSingle, 'planetSingle')
              phaseSingle.forEach((item, index) => {
                // console.log(rPhasePoint, planetSingle[item[0]][1], rPhasePoint, planetSingle[item[1]][1], "#" + item[2], item[5], sizeDashed)
                // drawLineConn(ctx, rPhasePoint, planetSingle[item[0]][1], rPhasePoint, planetSingle[item[1]][1], "#" + item[2], item[5], sizeDashed);
                if(configItem[item[0]] == '1' && configItem[item[1]] == '1'){
                  drawLineConn(ctx, rPhasePoint, planetSingle[item[0]][1], rPhasePoint, planetSingle[item[1]][1], "#" + item[2], item[5], sizeDashed);
                }
              })
            }
          }
          //单盘A32版
          function drawA32Single(objSingle){
            //1、单盘数据
            var {planetSingle, palace, phaseSingle} = dealSinglePlanet(objSingle, 0.024, configItem);
            //2、文字版颜色
            var textColor = getBlackColor();
            //3、布局&尺寸，以rOutOuter为基准
            var rOutInner = rOutOuter * 0.792;
            var rInOuter = rOutOuter * 0.744;
            var rInInner = rOutOuter * 0.652;
            var rOutMid = (rOutOuter + rOutInner)/2;
            var rInMid = (rInOuter + rInInner)/2;
            var rPlanetFlag = rInInner * 0.887;
            var rPhasePoint = rInInner * 0.796;
            var sizePalaceNum = rOutOuter * 0.05;
            var sizeStarFlag = rOutOuter * 0.11;//0.07
            var sizePlanetFlag = rOutOuter * 0.075;
            var sizePhasePoint = rInInner * 0.008;
            //4、开始画图
            drawA32SinglePan();
            function drawA32SinglePan() {
              drawRingOrigin(ctx, rOutOuter, "#030420");//星盘底色#000000 //改為#030420
              //1、画底图：四个圈、刻度线
              drawCircleOrigin(ctx, rOutOuter, textColor.colorOutCircle);
              drawCircleOrigin(ctx, rOutInner, textColor.colorOutCircle);
              drawCircleOrigin(ctx, rInOuter, textColor.colorOutCircle);
              drawCircleOrigin(ctx, rInInner, textColor.colorOutCircle);
              for(var i = 0; i < 360; i++){
                var color = (i % 5 == 0) ? textColor.colorOutCircle : textColor.colorPalaceLine;
                drawLineAngle(ctx, -rInOuter, -rOutInner, i/360, color);
              }
              //2、画宫位相关：宫位线、宫位编号、星座边界线、星座
              for(var i = 0; i < 12; i++){
                var angle = palace[i][1];
                var angleNext = (i == 11) ? 1 : palace[i + 1][1];
                if(i % 3 == 0){
                  drawLineAngle(ctx, 0, -rOutOuter, angle, textColor.colorXudian);
                }else{drawLineAngle(ctx, 0, -rInOuter, angle, textColor.colorPalaceLine);}
                drawTextAngle(ctx, rInMid, (angle + angleNext)/2, i + 1, colorPalace, sizePalaceNum);
                var angleStar = -palace[0][0]/360 + i/12;//星座边界的角度(-x轴逆时针方向)
                drawLineAngle(ctx, -rOutInner, -rOutOuter, angleStar, textColor.colorOutCircle);
                drawIconAngle(ctx, rOutMid, angleStar + 1/24, iconStar[i], colorStar[i], sizeStarFlag);
              }
              //3、画行星相关:行星名称、行星点位、名称与点位连线、分
              for(var i = 0; i < 25; i++){
                if(configItem[i] === 0){continue;}
                var angleAdjust = planetSingle[i][5];
                var angleOriginal = planetSingle[i][1];
                drawIconAngle(ctx, rPlanetFlag, angleAdjust, iconPlanet[i], colorPlanet[i], sizePlanetFlag);
                drawCircleAngle(ctx, rPhasePoint, angleOriginal, sizePhasePoint, colorPlanet[i]);
                drawLineConn(ctx, rPhasePoint, angleOriginal, rPlanetFlag - sizePlanetFlag/2, angleAdjust, colorPlanet[i], 0);
              }
              //4、画相位
              phaseSingle.forEach(function(item){
                if(configItem[item[0]] == '1' && configItem[item[1]] == '1'){
                  drawLineConn(ctx, rPhasePoint, planetSingle[item[0]][1], rPhasePoint, planetSingle[item[1]][1], "#" + item[2], item[5], sizeDashed);
                }
              })
            }
          }
          //单盘清新版
          function drawFreshSingle(objSingle){
            //1、单盘数据
            var {planetSingle, palace, phaseSingle} = dealSinglePlanet(objSingle, 0.024, configItem);
            //2、文字版颜色
            var freshColor = getFreshColor();
            //3、布局&尺寸，以rOutOuter为基准
            var rOutInner = rOutOuter * 0.792;
            var rInOuter = rOutOuter * 0.744;
            var rInInner = rOutOuter * 0.652;
            var rOutMid = (rOutOuter + rOutInner)/2;
            var rInMid = (rInOuter + rInInner)/2;
            var rPlanetFlag = rInInner * 0.887;
            var rPhasePoint = rInInner * 0.796;
            var sizePalaceNum = rOutOuter * 0.055;
            var sizeStarFlag = rOutOuter * 0.07;
            var sizePlanetFlag = rOutOuter * 0.075;
            var sizePhasePoint = rInInner * 0.008;
            //4、开始画图
            drawFreshSinglePan();
            function drawFreshSinglePan() {
              drawRingOrigin(ctx, rOutOuter, "#000000");//星盘底色
              //1、画底图：四个圈、刻度线
              drawRingOrigin(ctx, rOutOuter, freshColor.colorBackground);
              drawCircleOrigin(ctx, rOutOuter, freshColor.colorCircle);
              drawCircleOrigin(ctx, rOutInner, freshColor.colorCircle);
              drawRingOrigin(ctx, rInOuter, 'white');
              drawCircleOrigin(ctx, rInOuter, freshColor.colorCircle);
              drawCircleOrigin(ctx, rInInner, freshColor.colorCircle);
              for(var i = 0; i < 360; i++){
                var color = (i % 5 == 0) ? freshColor.colorCircle : freshColor.colorPalaceLine;
                drawLineAngle(ctx, -rInOuter, -rOutInner, i/360, color);
              }
              //2、画宫位相关：宫位线、宫位编号、星座边界线、星座
              for(var i = 0; i < 12; i++){
                var angle = palace[i][1];
                var angleNext = (i == 11) ? 1 : palace[i + 1][1];
                if(i % 3 == 0){
                  drawLineAngle(ctx, 0, -rOutOuter, angle, freshColor.colorXudian);
                }else{drawLineAngle(ctx, 0, -rInOuter, angle, freshColor.colorPalaceLine);}
                drawTextAngle(ctx, rInMid, (angle + angleNext)/2, i + 1, colorPalace[i], sizePalaceNum);
                var angleStar = -palace[0][0]/360 + i/12;//星座边界的角度(-x轴逆时针方向)
                drawLineAngle(ctx, -rOutInner, -rOutOuter, angleStar, freshColor.colorCircle);
                drawIconAngle(ctx, rOutMid, angleStar + 1/24, iconStar[i], colorStar[i], sizeStarFlag);
              }
              //3、画行星相关:行星名称、行星点位、名称与点位连线、分
              for(var i = 0; i < 25; i++){
                if(configItem[i] === 0){continue;}
                var angleAdjust = planetSingle[i][5];
                var angleOriginal = planetSingle[i][1];
                drawIconAngle(ctx, rPlanetFlag, angleAdjust, iconPlanet[i], colorPlanet[i], sizePlanetFlag);
                drawCircleAngle(ctx, rPhasePoint, angleOriginal, sizePhasePoint, colorPlanet[i]);
                drawLineConn(ctx, rPhasePoint, angleOriginal, rPlanetFlag - sizePlanetFlag/2, angleAdjust, colorPlanet[i], 0);
              }
              //4、画相位
              phaseSingle.forEach(function(item){
                if(configItem[item[0]] == '1' && configItem[item[1]] == '1'){
                  drawLineConn(ctx, rPhasePoint, planetSingle[item[0]][1], rPhasePoint, planetSingle[item[1]][1], "#" + item[2], item[5], sizeDashed);
                }
              })
            }
          }
          //单盘温暖版
          function drawWarmSingle(objSingle){
            //1、单盘数据
            var {planetSingle, palace, phaseSingle} = dealSinglePlanet(objSingle, 0.024, configItem);
            //2、文字版颜色
            var wramColor = getWramColor();
            //3、布局&尺寸，以rOutOuter为基准
            var rOutInner = rOutOuter * 0.792;
            var rInOuter = rOutOuter * 0.744;
            var rInInner = rOutOuter * 0.652;
            var rOutMid = (rOutOuter + rOutInner)/2;
            var rInMid = (rInOuter + rInInner)/2;
            var rPlanetFlag = rInInner * 0.887;
            var rPhasePoint = rInInner * 0.796;
            var sizePalaceNum = rOutOuter * 0.055;
            var sizeStarFlag = rOutOuter * 0.07;
            var sizePlanetFlag = rOutOuter * 0.075;
            var sizePhasePoint = rInInner * 0.008;
            //4、开始画图
            drawFreshSinglePan();
            function drawFreshSinglePan() {
              drawRingOrigin(ctx, rOutOuter, "#000000");//星盘底色
              //1、画底图：四个圈、刻度线
              drawRingOrigin(ctx, rOutOuter, wramColor.colorBackground);
              drawCircleOrigin(ctx, rOutOuter, wramColor.colorCircle);
              drawCircleOrigin(ctx, rOutInner, wramColor.colorCircle);
              drawRingOrigin(ctx, rInOuter, 'white');
              drawCircleOrigin(ctx, rInOuter, wramColor.colorCircle);
              drawCircleOrigin(ctx, rInInner, wramColor.colorCircle);
              for(var i = 0; i < 360; i++){
                var color = (i % 5 == 0) ? wramColor.colorCircle : wramColor.colorPalaceLine;
                drawLineAngle(ctx, -rInOuter, -rOutInner, i/360, color);
              }
              //2、画宫位相关：宫位线、宫位编号、星座边界线、星座
              for(var i = 0; i < 12; i++){
                var angle = palace[i][1];
                var angleNext = (i == 11) ? 1 : palace[i + 1][1];
                if(i % 3 == 0){
                  drawLineAngle(ctx, 0, -rOutOuter, angle, wramColor.colorXudian);
                }else{drawLineAngle(ctx, 0, -rInOuter, angle, wramColor.colorPalaceLine);}
                drawTextAngle(ctx, rInMid, (angle + angleNext)/2, i + 1, colorPalace[i], sizePalaceNum);
                var angleStar = -palace[0][0]/360 + i/12;//星座边界的角度(-x轴逆时针方向)
                drawLineAngle(ctx, -rOutInner, -rOutOuter, angleStar, wramColor.colorCircle);
                drawIconAngle(ctx, rOutMid, angleStar + 1/24, iconStar[i], colorStar[i], sizeStarFlag);
              }
              //3、画行星相关:行星名称、行星点位、名称与点位连线、分
              for(var i = 0; i < 25; i++){
                if(configItem[i] === 0){continue;}
                var angleAdjust = planetSingle[i][5];
                var angleOriginal = planetSingle[i][1];
                drawIconAngle(ctx, rPlanetFlag, angleAdjust, iconPlanet[i], colorPlanet[i], sizePlanetFlag);
                drawCircleAngle(ctx, rPhasePoint, angleOriginal, sizePhasePoint, colorPlanet[i]);
                drawLineConn(ctx, rPhasePoint, angleOriginal, rPlanetFlag - sizePlanetFlag/2, angleAdjust, colorPlanet[i], 0);
              }
              //4、画相位
              phaseSingle.forEach(function(item){
                if(configItem[item[0]] == '1' && configItem[item[1]] == '1'){
                  drawLineConn(ctx, rPhasePoint, planetSingle[item[0]][1], rPhasePoint, planetSingle[item[1]][1], "#" + item[2], item[5], sizeDashed);
                }
              })
            }
          }
          //单盘黑夜版
          function drawDarkSingle(objSingle){
            //1、单盘数据
            var {planetSingle, palace, phaseSingle} = dealSinglePlanet(objSingle, 0.024, configItem);
            //2、文字版颜色
            var darkColor = getDarkColor();
            //3、布局&尺寸，以rOutOuter为基准
            var rOutInner = rOutOuter * 0.792;
            var rInOuter = rOutOuter * 0.744;
            var rInInner = rOutOuter * 0.652;
            var rOutMid = (rOutOuter + rOutInner)/2;
            var rInMid = (rInOuter + rInInner)/2;
            var rPlanetFlag = rInInner * 0.887;
            var rPhasePoint = rInInner * 0.796;
            var sizePalaceNum = rOutOuter * 0.055;
            var sizeStarFlag = rOutOuter * 0.07;
            var sizePlanetFlag = rOutOuter * 0.075;
            var sizePhasePoint = rInInner * 0.008;
            //4、开始画图
            drawDarkSinglePan();
            function drawDarkSinglePan() {
              //1、画底图：四个圈、刻度线
              drawRingOrigin(ctx, rOutOuter, darkColor.colorRingOut);
              drawCircleOrigin(ctx, rOutOuter, darkColor.colorCircle);
              drawCircleOrigin(ctx, rOutInner, darkColor.colorCircle);
              drawRingOrigin(ctx, rInOuter, darkColor.colorRingMid);
              drawCircleOrigin(ctx, rInOuter, darkColor.colorCircle);
              drawRingOrigin(ctx, rInInner, darkColor.colorRingIn);
              drawCircleOrigin(ctx, rInInner, darkColor.colorCircle);
              for(var i = 0; i < 360; i++){
                var color = (i % 5 == 0) ? darkColor.colorCircle : darkColor.colorPalaceLine;
                drawLineAngle(ctx, -rInOuter, -rOutInner, i/360, color);
              }
              //2、画宫位相关：宫位线、宫位编号、星座边界线、星座
              for(var i = 0; i < 12; i++){
                var angle = palace[i][1];
                var angleNext = (i == 11) ? 1 : palace[i + 1][1];
                if(i % 3 == 0){
                  drawLineAngle(ctx, 0, -rOutOuter, angle, darkColor.colorXudian);
                }else{drawLineAngle(ctx, 0, -rInOuter, angle, darkColor.colorPalaceLine);}
                drawTextAngle(ctx, rInMid, (angle + angleNext)/2, i + 1, colorPalace[i], sizePalaceNum);
                var angleStar = -palace[0][0]/360 + i/12;//星座边界的角度(-x轴逆时针方向)
                drawLineAngle(ctx, -rOutInner, -rOutOuter, angleStar, darkColor.colorCircle);
                drawIconAngle(ctx, rOutMid, angleStar + 1/24, iconStar[i], colorStar[i], sizeStarFlag);
              }
              //3、画行星相关:行星名称、行星点位、名称与点位连线、分
              for(var i = 0; i < 25; i++){
                if(configItem[i] === 0){continue;}
                var angleAdjust = planetSingle[i][5];
                var angleOriginal = planetSingle[i][1];
                drawIconAngle(ctx, rPlanetFlag, angleAdjust, iconPlanet[i], colorPlanet[i], sizePlanetFlag);
                drawCircleAngle(ctx, rPhasePoint, angleOriginal, sizePhasePoint, colorPlanet[i]);
                drawLineConn(ctx, rPhasePoint, angleOriginal, rPlanetFlag - sizePlanetFlag/2, angleAdjust, colorPlanet[i], 0);
              }
              //4、画相位
              phaseSingle.forEach(function(item){
                if(configItem[item[0]] == '1' && configItem[item[1]] == '1'){
                  drawLineConn(ctx, rPhasePoint, planetSingle[item[0]][1], rPhasePoint, planetSingle[item[1]][1], "#" + item[2], item[5], sizeDashed);
                }
              })
            }
          }
          //双盘专业版
          //为什么不画0°黄色he相位线？
          function drawProDouble(objDouble){
            //1、双盘数据
            var {palace, phaseDouble, planet1, planet2} = dealDoublePlanet(objDouble, 0.015, configItem);
            //2、专业版配色
            var proColor = getWhiteColor();
            //3、布局&尺寸，以rOutOuter为基准
            var rOutInner = rOutOuter * 0.909;
            var rInOuter = rOutOuter * 0.304;
            var rInInner = rOutOuter * 0.256;
            var rIOMid = (rInOuter + rOutInner)/2;
            var rOutMid = (rOutInner + rOutOuter)/2;
            var rInMid = (rInInner + rInOuter)/2;
            var rPhasePoint = rInInner * 0.96;
            var rPlanetNatal = rInOuter + (rIOMid - rInOuter) * 0.8;
            var rPlanetTransit = rIOMid + (rOutInner - rIOMid) * 0.8;
            var rNatalDu = rInOuter + (rIOMid - rInOuter) * 0.565;
            var rNatalStar = rInOuter + (rIOMid - rInOuter) * 0.379;
            var rNatalFen = rInOuter + (rIOMid - rInOuter) * 0.207;
            var rTransitDu = rIOMid + (rOutInner - rIOMid) * 0.565;
            var rTransitStar = rIOMid + (rOutInner - rIOMid) * 0.379;
            var rTransitFen = rIOMid + (rOutInner - rIOMid) * 0.207;
            var sizeNatalDu = rOutOuter * 0.037;//本命度字号
            var sizeNatalFen = rOutOuter * 0.03;//本命分字号
            var sizeTransitDu = rOutOuter * 0.037;//行运度字号
            var sizeTransitFen = rOutOuter * 0.03;//行运分字号
            var sizeStarFlag = rOutOuter * 0.06; //0.058
            var sizePalaceNum = rOutOuter * 0.045; //0.04
            var sizePlanetFlag = rOutOuter * 0.068; //0.05
            var sizeDu = rOutOuter * 0.05;//度字号0.047
            var sizeFen = rOutOuter * 0.047;//分字号0.04
            var sizeMidStar = rOutOuter * 0.07;//中圈星座字号0.035
            //4、开始画图
            drawProDoublePan();
            function drawProDoublePan() {
              drawRingOrigin(ctx, rOutOuter, "#030420");//星盘底色#030420
              //1、画底图：五个圈
              drawCircleOrigin(ctx, rOutOuter, proColor.colorOutCircle);
              drawCircleOrigin(ctx, rOutInner, proColor.colorOutCircle);
              drawCircleOrigin(ctx, rIOMid, proColor.colorMidCircle);
              drawCircleOrigin(ctx, rInOuter, proColor.colorInCircle);
              drawCircleOrigin(ctx, rInInner, proColor.colorInCircle);
              //2、画宫位相关：宫位线、宫位编号、对应星座、度、分
              for(var i = 0; i < 12; i++){
                var angle = palace[i][1];
                var angleNext = (i == 11) ? 1 : palace[i + 1][1];
                var starNum = palace[i][2];
                var du = palace[i][3];
                var fen = palace[i][4];
                var colorLine = (i % 3 ==0) ? proColor.colorXudian : proColor.colorPalaceLine;
                drawLineAngle(ctx, -rInInner, -rOutInner, angle, colorLine);
                var angleNum = (angle + angleNext)/2;
                drawTextAngle(ctx, rInMid, angleNum, i + 1, colorPalace[i], sizePalaceNum);
                drawIconAngle(ctx, rOutMid, angle, iconStar[starNum], colorStar[starNum], sizeStarFlag);
                drawTextAngle(ctx, rOutMid, angle + 1/70, du, proColor.colorDu, sizeDu);
                drawTextAngle(ctx, rOutMid, angle - 1/70, fen, proColor.colorFen, sizeFen);
                var starNext = palace[(i + 1)%12][2];
                var starGap = (starNext - starNum + 12)%12;
                if(starGap > 1){
                  var angleRefer = angle + 1/70;
                  var angleGap = (angleNext - angle - 1/35)/starGap;
                  var starJieDuo;
                  for(var j = 1; j < starGap; j++){
                    starJieDuo = (starNum + j)%12;
                    drawIconAngle(ctx, rOutMid, angleRefer + j*angleGap, iconStar[starJieDuo], colorStar[starJieDuo], sizeStarFlag);
                  }
                }
              }
              //3、画行星相关(用调整后的角度):行星、对应星座、度、分
              for(var i = 0; i < 25; i++){
                if(configItem[i] === 0){continue;}
                var angleAdjust = planet1[i][5];
                var starNum = planet1[i][2];
                var du = planet1[i][3];
                var fen = planet1[i][4];
                drawIconAngle(ctx, rPlanetNatal, planet1[i][5], iconPlanet[i], colorPlanet[i], sizePlanetFlag);
                drawIconAngle(ctx, rNatalStar, angleAdjust, iconStar[starNum], colorPlanet[i], sizeMidStar);
                drawTextAngle(ctx, rNatalDu, angleAdjust, du, proColor.colorDu, sizeNatalDu);
                drawTextAngle(ctx, rNatalFen, angleAdjust,fen, proColor.colorFen, sizeNatalFen);
                var angleAdjust = planet2[i][5];
                var starNum = planet2[i][2];
                var du = planet2[i][3];
                var fen = planet2[i][4];
                drawIconAngle(ctx, rPlanetTransit, planet2[i][5], iconPlanet[i], colorPlanet[i], sizePlanetFlag);
                drawIconAngle(ctx, rTransitStar, angleAdjust, iconStar[starNum], colorPlanet[i], sizeMidStar);
                drawTextAngle(ctx, rTransitDu, angleAdjust, du, proColor.colorDu, sizeTransitDu);
                drawTextAngle(ctx, rTransitFen, angleAdjust,fen, proColor.colorFen, sizeTransitFen);
              }
              phaseDouble.forEach(function(item){
                if(item[4] != 'he'){
                  if(configItem[item[0]] == '1' && configItem[item[1]] == '1'){
                    drawLineConn(ctx, rPhasePoint, planet2[item[0]][1], rPhasePoint, planet1[item[1]][1], "#" + item[2], item[5], sizeDashed);
                  }
                }
              })
            }
          }
          //双盘文字版
          function drawTextDouble(objDouble){
            console.log(objDouble, 'objDouble')
            //1、双盘数据
            var {palace, phaseDouble, planet1, planet2} = dealDoublePlanet(objDouble, 0.024, configItem);
            //2、文字版颜色
            var textColor = getBlackColor();
            //3、布局&尺寸，以rOutOuter为基准
            var rOutInner = rOutOuter * 0.835;
            var rInOuter = rOutOuter * 0.792;
            var rInInner = rOutOuter * 0.720;
            var rOutMid = (rOutInner + rOutOuter)/2;
            var rInMid = (rInInner + rInOuter)/2;
            var rPlanet2Flag = rInInner * 0.887;
            var rPlanet1Flag = rInInner * 0.750;
            var rPhasePoint = rInInner * 0.650;
            var sizePalaceNum = rOutOuter * 0.05;
            var sizeStarFlag = rOutOuter * 0.065;
            var sizePlanetFlag = rOutOuter * 0.075;
            var sizePhasePoint = rInInner * 0.008;
            //4、开始画图
            drawTextDoublePan();
            function drawTextDoublePan() {
              drawRingOrigin(ctx, rOutOuter, "#030420");//星盘底色
              //1、画底图：四个圈、刻度线
              drawCircleOrigin(ctx, rOutOuter, textColor.colorOutCircle);
              drawCircleOrigin(ctx, rOutInner, textColor.colorOutCircle);
              drawCircleOrigin(ctx, rInOuter, textColor.colorOutCircle);
              drawCircleOrigin(ctx, rInInner, textColor.colorOutCircle);
              for(var i = 0; i < 360; i++){
                var color = (i % 5 == 0) ? textColor.colorOutCircle : textColor.colorPalaceLine;
                drawLineAngle(ctx, -rInOuter, -rOutInner, i/360, color);
              }
              //2、画宫位相关：宫位线、宫位编号、星座边界线、星座
              for(var i = 0; i < 12; i++){
                var angle = palace[i][1];
                var angleNext = (i == 11) ? 1 : palace[i + 1][1];
                if(i % 3 == 0){
                  drawLineAngle(ctx, 0, -rOutOuter, angle, textColor.colorXudian);
                }else{drawLineAngle(ctx, 0, -rInOuter, angle, textColor.colorPalaceLine);}
                drawTextAngle(ctx, rInMid, (angle + angleNext)/2, i + 1, colorPalace, sizePalaceNum);
                var angleStar = -palace[0][0]/360 + i/12;//星座边界的角度(-x轴逆时针方向)
                drawLineAngle(ctx, -rOutInner, -rOutOuter, angleStar, textColor.colorOutCircle);
                drawTextAngle(ctx, rOutMid, angleStar + 1/24, textStar[i], colorStar[i], sizeStarFlag);
                drawIconAngle(ctx, rOutMid, angleStar + 1/24 - 1/48, iconStar[i], colorStar[i], sizeStarFlag*1.6);
              }
              //3、画行星相关:行星名称、行星点位、名称与点位连线、分
              for(var i = 0; i < 25; i++){
                if(configItem[i] === 0){continue;}
                var angleAdjust = planet1[i][5];
                var angleOriginal = planet1[i][1];
                //此行渲染icon
                //drawTextAngle(ctx, rPlanet1Flag, angleAdjust, textPlanet[i], colorPlanet[i], sizePlanetFlag);
                //改成圖片
                drawImgAngle(ctx, rPlanet1Flag, angleAdjust, imgPlanet[i]);
                //
                drawCircleAngle(ctx, rPhasePoint, angleOriginal, sizePhasePoint, colorPlanet[i]);
                drawLineConn(ctx, rPhasePoint, angleOriginal, rPlanet1Flag - sizePlanetFlag/2, angleAdjust, colorPlanet[i], 0);
                var angle2Adjust = planet2[i][5];
                var angle2Original = planet2[i][1];
                //此行渲染icon
                //drawTextAngle(ctx, rPlanet2Flag, angle2Adjust, textPlanet[i], colorPlanet[i], sizePlanetFlag);
                //改成圖片
                drawImgAngle(ctx, rPlanet2Flag, angle2Adjust, imgPlanet[i]);
                drawCircleAngle(ctx, rPhasePoint, angle2Original, sizePhasePoint, colorPlanet[i]);
                drawLineConn(ctx, rPhasePoint, angle2Original, rPlanet2Flag - sizePlanetFlag/2, angle2Adjust, colorPlanet[i], 0);
              }

              //4、画相位
              // phaseSingle.forEach((item, index) => {
              //   if(configItem[item[0]] == '1' && configItem[item[1]] == '1'){
              //     drawLineConn(ctx, rPhasePoint, planetSingle[item[0]][1], rPhasePoint, planetSingle[item[1]][1], "#" + item[2], item[5], sizeDashed);
              //   }
              // })
              phaseDouble.forEach(function(item){
                if(item[4] != 'he'){
                  if(configItem[item[0]] == '1' && configItem[item[1]] == '1'){
                    drawLineConn(ctx, rPhasePoint, planet2[item[0]][1], rPhasePoint, planet1[item[1]][1], "#" + item[2], item[5], sizeDashed);
                  }
                }
              })
              // phaseDouble.forEach(function(item){
              //   if(item[4] != 'he'){
              //     drawLineConn(ctx, rPhasePoint, planet2[item[0]][1], rPhasePoint, planet1[item[1]][1], "#" + item[2], item[5], sizeDashed);
              //   }
              // })
            }
          }
          //双盘A32版
          function drawA32Double(objDouble){
            //1、双盘数据
            var {palace, phaseDouble, planet1, planet2} = dealDoublePlanet(objDouble, 0.024, configItem);
            //2、文字版颜色
            var textColor = getBlackColor();
            //3、布局&尺寸，以rOutOuter为基准
            var rOutInner = rOutOuter * 0.835;
            var rInOuter = rOutOuter * 0.792;
            var rInInner = rOutOuter * 0.720;
            var rOutMid = (rOutInner + rOutOuter)/2;
            var rInMid = (rInInner + rInOuter)/2;
            var rPlanet2Flag = rInInner * 0.887;
            var rPlanet1Flag = rInInner * 0.750;
            var rPhasePoint = rInInner * 0.650;
            var sizePalaceNum = rOutOuter * 0.05;
            var sizeStarFlag = rOutOuter * 0.11; //0.07
            var sizePlanetFlag = rOutOuter * 0.075;
            var sizePhasePoint = rInInner * 0.008;
            //4、开始画图
            drawA32DoublePan();
            function drawA32DoublePan() {
              drawRingOrigin(ctx, rOutOuter, "#030420");//星盘底色
              //1、画底图：四个圈、刻度线
              drawCircleOrigin(ctx, rOutOuter, textColor.colorOutCircle);
              drawCircleOrigin(ctx, rOutInner, textColor.colorOutCircle);
              drawCircleOrigin(ctx, rInOuter, textColor.colorOutCircle);
              drawCircleOrigin(ctx, rInInner, textColor.colorOutCircle);
              for(var i = 0; i < 360; i++){
                var color = (i % 5 == 0) ? textColor.colorOutCircle : textColor.colorPalaceLine;
                drawLineAngle(ctx, -rInOuter, -rOutInner, i/360, color);
              }
              //2、画宫位相关：宫位线、宫位编号、星座边界线、星座
              for(var i = 0; i < 12; i++){
                var angle = palace[i][1];
                var angleNext = (i == 11) ? 1 : palace[i + 1][1];
                if(i % 3 == 0){
                  drawLineAngle(ctx, 0, -rOutOuter, angle, textColor.colorXudian);
                }else{drawLineAngle(ctx, 0, -rInOuter, angle, textColor.colorPalaceLine);}
                drawTextAngle(ctx, rInMid, (angle + angleNext)/2, i + 1, colorPalace, sizePalaceNum);
                var angleStar = -palace[0][0]/360 + i/12;//星座边界的角度(-x轴逆时针方向)
                drawLineAngle(ctx, -rOutInner, -rOutOuter, angleStar, textColor.colorOutCircle);
                drawIconAngle(ctx, rOutMid, angleStar + 1/24, iconStar[i], colorStar[i], sizeStarFlag);
              }
              //3、画行星相关:行星名称、行星点位、名称与点位连线、分
              for(var i = 0; i < 25; i++){
                if(configItem[i] === 0){continue;}
                var angleAdjust = planet1[i][5];
                var angleOriginal = planet1[i][1];
                drawIconAngle(ctx, rPlanet1Flag, angleAdjust, iconPlanet[i], colorPlanet[i], sizePlanetFlag);
                drawCircleAngle(ctx, rPhasePoint, angleOriginal, sizePhasePoint, colorPlanet[i]);
                drawLineConn(ctx, rPhasePoint, angleOriginal, rPlanet1Flag - sizePlanetFlag/2, angleAdjust, colorPlanet[i], 0);
                var angle2Adjust = planet2[i][5];
                var angle2Original = planet2[i][1];
                drawIconAngle(ctx, rPlanet2Flag, angle2Adjust, iconPlanet[i], colorPlanet[i], sizePlanetFlag);
                drawCircleAngle(ctx, rPhasePoint, angle2Original, sizePhasePoint, colorPlanet[i]);
                drawLineConn(ctx, rPhasePoint, angle2Original, rPlanet2Flag - sizePlanetFlag/2, angle2Adjust, colorPlanet[i], 0);
              }
              //4、画相位
              phaseDouble.forEach(function(item){
                if(item[4] != 'he'){
                  if(configItem[item[0]] == '1' && configItem[item[1]] == '1'){
                    drawLineConn(ctx, rPhasePoint, planet2[item[0]][1], rPhasePoint, planet1[item[1]][1], "#" + item[2], item[5], sizeDashed);
                  }
                }
              })
            }
          }
          //双盘清新版
          function drawFreshDouble(objDouble){
            //1、双盘数据
            var {palace, phaseDouble, planet1, planet2} = dealDoublePlanet(objDouble, 0.024, configItem);
            //2、文字版颜色
            var freshColor = getFreshColor();
            //3、布局&尺寸，以rOutOuter为基准
            var rOutInner = rOutOuter * 0.835;
            var rInOuter = rOutOuter * 0.792;
            var rInInner = rOutOuter * 0.720;
            var rOutMid = (rOutInner + rOutOuter)/2;
            var rInMid = (rInInner + rInOuter)/2;
            var rPlanet2Flag = rInInner * 0.887;
            var rPlanet1Flag = rInInner * 0.750;
            var rPhasePoint = rInInner * 0.650;
            var sizePalaceNum = rOutOuter * 0.055;
            var sizeStarFlag = rOutOuter * 0.07;
            var sizePlanetFlag = rOutOuter * 0.075;
            var sizePhasePoint = rInInner * 0.008;
            //4、开始画图
            drawFreshDoublePan();
            function drawFreshDoublePan() {
              drawRingOrigin(ctx, rOutOuter, "#000000");//星盘底色
              //1、画底图：四个圈、刻度线
              drawRingOrigin(ctx, rOutOuter, freshColor.colorBackground);
              drawCircleOrigin(ctx, rOutOuter, freshColor.colorCircle);
              drawCircleOrigin(ctx, rOutInner, freshColor.colorCircle);
              drawRingOrigin(ctx, rInOuter, 'white');
              drawCircleOrigin(ctx, rInOuter, freshColor.colorCircle);
              drawCircleOrigin(ctx, rInInner, freshColor.colorCircle);
              for(var i = 0; i < 360; i++){
                var color = (i % 5 == 0) ? freshColor.colorCircle : freshColor.colorPalaceLine;
                drawLineAngle(ctx, -rInOuter, -rOutInner, i/360, color);
              }
              //2、画宫位相关：宫位线、宫位编号、星座边界线、星座
              for(var i = 0; i < 12; i++){
                var angle = palace[i][1];
                var angleNext = (i == 11) ? 1 : palace[i + 1][1];
                if(i % 3 == 0){
                  drawLineAngle(ctx, 0, -rOutOuter, angle, freshColor.colorXudian);
                }else{drawLineAngle(ctx, 0, -rInOuter, angle, freshColor.colorPalaceLine);}
                drawTextAngle(ctx, rInMid, (angle + angleNext)/2, i + 1, colorPalace[i], sizePalaceNum);
                var angleStar = -palace[0][0]/360 + i/12;//星座边界的角度(-x轴逆时针方向)
                drawLineAngle(ctx, -rOutInner, -rOutOuter, angleStar, freshColor.colorCircle);
                drawIconAngle(ctx, rOutMid, angleStar + 1/24, iconStar[i], colorStar[i], sizeStarFlag);
              }
              //3、画行星相关:行星名称、行星点位、名称与点位连线、分
              for(var i = 0; i < 25; i++){
                if(configItem[i] === 0){continue;}
                var angleAdjust = planet1[i][5];
                var angleOriginal = planet1[i][1];
                drawIconAngle(ctx, rPlanet1Flag, angleAdjust, iconPlanet[i], colorPlanet[i], sizePlanetFlag);
                drawCircleAngle(ctx, rPhasePoint, angleOriginal, sizePhasePoint, colorPlanet[i]);
                drawLineConn(ctx, rPhasePoint, angleOriginal, rPlanet1Flag - sizePlanetFlag/2, angleAdjust, colorPlanet[i], 0);
                var angle2Adjust = planet2[i][5];
                var angle2Original = planet2[i][1];
                drawIconAngle(ctx, rPlanet2Flag, angle2Adjust, iconPlanet[i], colorPlanet[i], sizePlanetFlag);
                drawCircleAngle(ctx, rPhasePoint, angle2Original, sizePhasePoint, colorPlanet[i]);
                drawLineConn(ctx, rPhasePoint, angle2Original, rPlanet2Flag - sizePlanetFlag/2, angle2Adjust, colorPlanet[i], 0);
              }
              //4、画相位
              phaseDouble.forEach(function(item){
                if(item[4] != 'he'){
                  if(configItem[item[0]] == '1' && configItem[item[1]] == '1'){
                    drawLineConn(ctx, rPhasePoint, planet2[item[0]][1], rPhasePoint, planet1[item[1]][1], "#" + item[2], item[5], sizeDashed);
                  }
                }
              })
            }
          }
          //双盘温暖版
          function drawWarmDouble(objDouble){
            //1、双盘数据
            var {palace, phaseDouble, planet1, planet2} = dealDoublePlanet(objDouble, 0.024, configItem);
            //2、文字版颜色
            var freshColor = getWramColor();
            //3、布局&尺寸，以rOutOuter为基准
            var rOutInner = rOutOuter * 0.835;
            var rInOuter = rOutOuter * 0.792;
            var rInInner = rOutOuter * 0.720;
            var rOutMid = (rOutInner + rOutOuter)/2;
            var rInMid = (rInInner + rInOuter)/2;
            var rPlanet2Flag = rInInner * 0.887;
            var rPlanet1Flag = rInInner * 0.750;
            var rPhasePoint = rInInner * 0.650;
            var sizePalaceNum = rOutOuter * 0.055;
            var sizeStarFlag = rOutOuter * 0.07;
            var sizePlanetFlag = rOutOuter * 0.075;
            var sizePhasePoint = rInInner * 0.008;
            //4、开始画图
            drawWarmDoublePan();
            function drawWarmDoublePan() {
              drawRingOrigin(ctx, rOutOuter, "#000000");//星盘底色
              //1、画底图：四个圈、刻度线
              drawRingOrigin(ctx, rOutOuter, freshColor.colorBackground);
              drawCircleOrigin(ctx, rOutOuter, freshColor.colorCircle);
              drawCircleOrigin(ctx, rOutInner, freshColor.colorCircle);
              drawRingOrigin(ctx, rInOuter, 'white');
              drawCircleOrigin(ctx, rInOuter, freshColor.colorCircle);
              drawCircleOrigin(ctx, rInInner, freshColor.colorCircle);
              for(var i = 0; i < 360; i++){
                var color = (i % 5 == 0) ? freshColor.colorCircle : freshColor.colorPalaceLine;
                drawLineAngle(ctx, -rInOuter, -rOutInner, i/360, color);
              }
              //2、画宫位相关：宫位线、宫位编号、星座边界线、星座
              for(var i = 0; i < 12; i++){
                var angle = palace[i][1];
                var angleNext = (i == 11) ? 1 : palace[i + 1][1];
                if(i % 3 == 0){
                  drawLineAngle(ctx, 0, -rOutOuter, angle, freshColor.colorXudian);
                }else{drawLineAngle(ctx, 0, -rInOuter, angle, freshColor.colorPalaceLine);}
                drawTextAngle(ctx, rInMid, (angle + angleNext)/2, i + 1, colorPalace[i], sizePalaceNum);
                var angleStar = -palace[0][0]/360 + i/12;//星座边界的角度(-x轴逆时针方向)
                drawLineAngle(ctx, -rOutInner, -rOutOuter, angleStar, freshColor.colorCircle);
                drawIconAngle(ctx, rOutMid, angleStar + 1/24, iconStar[i], colorStar[i], sizeStarFlag);
              }
              //3、画行星相关:行星名称、行星点位、名称与点位连线、分
              for(var i = 0; i < 18; i++){
                if(configItem[i] === 0){continue;}
                var angleAdjust = planet1[i][5];
                var angleOriginal = planet1[i][1];
                drawIconAngle(ctx, rPlanet1Flag, angleAdjust, iconPlanet[i], colorPlanet[i], sizePlanetFlag);
                drawCircleAngle(ctx, rPhasePoint, angleOriginal, sizePhasePoint, colorPlanet[i]);
                drawLineConn(ctx, rPhasePoint, angleOriginal, rPlanet1Flag - sizePlanetFlag/2, angleAdjust, colorPlanet[i], 0);
                var angle2Adjust = planet2[i][5];
                var angle2Original = planet2[i][1];
                drawIconAngle(ctx, rPlanet2Flag, angle2Adjust, iconPlanet[i], colorPlanet[i], sizePlanetFlag);
                drawCircleAngle(ctx, rPhasePoint, angle2Original, sizePhasePoint, colorPlanet[i]);
                drawLineConn(ctx, rPhasePoint, angle2Original, rPlanet2Flag - sizePlanetFlag/2, angle2Adjust, colorPlanet[i], 0);
              }
              //4、画相位
              phaseDouble.forEach(function(item){
                if(item[4] != 'he'){
                  if(configItem[item[0]] == '1' && configItem[item[1]] == '1'){
                    drawLineConn(ctx, rPhasePoint, planet2[item[0]][1], rPhasePoint, planet1[item[1]][1], "#" + item[2], item[5], sizeDashed);
                  }
                }
              })
            }
          }
          //双盘黑夜版
          function drawDarkDouble(objDouble){
            //1、双盘数据
            var {palace, phaseDouble, planet1, planet2} = dealDoublePlanet(objDouble, 0.024, configItem);
            //2、文字版颜色
            var darkColor = getDarkColor();
            //3、布局&尺寸，以rOutOuter为基准
            var rOutInner = rOutOuter * 0.835;
            var rInOuter = rOutOuter * 0.792;
            var rInInner = rOutOuter * 0.720;
            var rOutMid = (rOutInner + rOutOuter)/2;
            var rInMid = (rInInner + rInOuter)/2;
            var rPlanet2Flag = rInInner * 0.887;
            var rPlanet1Flag = rInInner * 0.750;
            var rPhasePoint = rInInner * 0.650;
            var sizePalaceNum = rOutOuter * 0.055;
            var sizeStarFlag = rOutOuter * 0.07;
            var sizePlanetFlag = rOutOuter * 0.075;
            var sizePhasePoint = rInInner * 0.008;
            //4、开始画图
            drawDarkDoublePan();
            function drawDarkDoublePan() {
              //1、画底图：四个圈、刻度线
              drawRingOrigin(ctx, rOutOuter, darkColor.colorRingOut);
              drawCircleOrigin(ctx, rOutOuter, darkColor.colorCircle);
              drawCircleOrigin(ctx, rOutInner, darkColor.colorCircle);
              drawRingOrigin(ctx, rInOuter, darkColor.colorRingMid);
              drawCircleOrigin(ctx, rInOuter, darkColor.colorCircle);
              drawRingOrigin(ctx, rInInner, darkColor.colorRingIn);
              drawCircleOrigin(ctx, rInInner, darkColor.colorCircle);
              for(var i = 0; i < 360; i++){
                var color = (i % 5 == 0) ? darkColor.colorCircle : darkColor.colorPalaceLine;
                drawLineAngle(ctx, -rInOuter, -rOutInner, i/360, color);
              }
              //2、画宫位相关：宫位线、宫位编号、星座边界线、星座
              for(var i = 0; i < 12; i++){
                var angle = palace[i][1];
                var angleNext = (i == 11) ? 1 : palace[i + 1][1];
                if(i % 3 == 0){
                  drawLineAngle(ctx, 0, -rOutOuter, angle, darkColor.colorXudian);
                }else{drawLineAngle(ctx, 0, -rInOuter, angle, darkColor.colorPalaceLine);}
                drawTextAngle(ctx, rInMid, (angle + angleNext)/2, i + 1, colorPalace[i], sizePalaceNum);
                var angleStar = -palace[0][0]/360 + i/12;//星座边界的角度(-x轴逆时针方向)
                drawLineAngle(ctx, -rOutInner, -rOutOuter, angleStar, darkColor.colorCircle);
                drawIconAngle(ctx, rOutMid, angleStar + 1/24, iconStar[i], colorStar[i], sizeStarFlag);
              }
              //3、画行星相关:行星名称、行星点位、名称与点位连线、分
              for(var i = 0; i < 25; i++){
                if(configItem[i] === 0){continue;}
                var angleAdjust = planet1[i][5];
                var angleOriginal = planet1[i][1];
                drawIconAngle(ctx, rPlanet1Flag, angleAdjust, iconPlanet[i], colorPlanet[i], sizePlanetFlag);
                drawCircleAngle(ctx, rPhasePoint, angleOriginal, sizePhasePoint, colorPlanet[i]);
                drawLineConn(ctx, rPhasePoint, angleOriginal, rPlanet1Flag - sizePlanetFlag/2, angleAdjust, colorPlanet[i], 0);
                var angle2Adjust = planet2[i][5];
                var angle2Original = planet2[i][1];
                drawIconAngle(ctx, rPlanet2Flag, angle2Adjust, iconPlanet[i], colorPlanet[i], sizePlanetFlag);
                drawCircleAngle(ctx, rPhasePoint, angle2Original, sizePhasePoint, colorPlanet[i]);
                drawLineConn(ctx, rPhasePoint, angle2Original, rPlanet2Flag - sizePlanetFlag/2, angle2Adjust, colorPlanet[i], 0);
              }
              //4、画相位
              phaseDouble.forEach(function(item){
                if(item[4] != 'he'){
                  if(configItem[item[0]] == '1' && configItem[item[1]] == '1'){
                    drawLineConn(ctx, rPhasePoint, planet2[item[0]][1], rPhasePoint, planet1[item[1]][1], "#" + item[2], item[5], sizeDashed);
                  }
                }
              })
            }
          }
          function drawProFirdaria(objSingle){
            drawProSingle(objSingle);
          }
          window.drawAstrolabe = drawAstrolabe
        })(window);
      },
      //canvasInit()初始化結束
      drawXingPan: function(){
        var canvas = this.$refs.astrolabe;
        canvas.setAttribute('width', this.width*2);
        canvas.setAttribute('height', this.width*2);
        canvas.style.width = this.width -24 + 'px';
        canvas.style.height = this.width -24 + 'px';
        var ctx = canvas.getContext('2d');
        var draw;
        switch(this.type){
          case 0: {//单盘
            draw = drawAstrolabe(ctx, this.width, this.configItem, '单盘', this.panStyle);
            draw(dealSingleData(this.data1));
            break;
          }case 1: {//双盘
            draw = drawAstrolabe(ctx, this.width, this.configItem, '双盘', this.panStyle);
            draw(dealDoubleData(this.data1, this.data2));
            break;
          }case 2: {//配对盘
            draw = drawAstrolabe(ctx, this.width, this.configItem, '单盘', this.panStyle);
            var objSynastry1 = dealSingleData(this.data1);
            var objSynastry2 = dealSingleData(this.data2);
            var objSynastry = {
              palace: objSynastry1.palace,
              planet: objSynastry2.planet,
              phase: objSynastry2.phase,
            }
            draw(objSynastry);
            break;
          }case 3: {//法达盘
            draw = drawAstrolabe(ctx, this.width, this.configItem, '法达', '专业');
            draw(dealSingleData(this.data1));
            break;
          }default: {
            break;
          }
        }
      },
    }
  }
</script>

<style scoped></style>
