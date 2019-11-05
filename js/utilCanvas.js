/*****************1、工具函数——canvas画图*****************/
/**********************画图片**********************/
//画图片src到{x,y}
export function drawImgNew(ctx, imgObj, x, y) {
    return new Promise((resolve, reject) => {
        imgObj.onload = function () {
            ctx.drawImage(imgObj, x, y);
            resolve();
        }
    })
}

//画图片src到{x,y}
export function drawImg(ctx, src, x, y, w, h) {
    return new Promise((resolve, reject) => {
        loadImage(src).then(img => {
            if (w && h) {
                ctx.drawImage(img, x, y, w, h);
            }
            else {
                ctx.drawImage(img, x, y);
            }
            resolve();
        })
    })
}

//加载图片
function loadImage(src) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = function () {
            resolve(img);
        }
        //数据源是base64
        if (src.indexOf('data:image') === 0) {
            img.src = src;
        }
        else {
            //非dataUrl，且不带参
            if (src.indexOf('data:image') !== 0 && src.indexOf('?') === -1) {
                img.src = src + '?' + new Date().getTime();
            }
            //其他情况（dataUrl正常使用，带参的没办法处理）
            else {
                img.src = src;
            }
            img.crossOrigin = '';
        }
    })
}

/**********************画填充圆弧**********************/
//以(rAngle为半径x轴顺时针angle圈的点)为中心，画一个半径为r的圆弧
function drawRingArcAngle(ctx, rAngle, angle, r, color, angleStart, angleEnd) {
    var x = rAngle * Math.cos(Math.PI * 2 * angle);
    var y = rAngle * Math.sin(Math.PI * 2 * angle);
    drawRing(ctx, x, y, r, color, angleStart, angleEnd);
}

//以原点为中心，画一个半径为r的圆弧
function drawRingArcOrigin(ctx, r, color, angleStart, angleEnd) {
    drawRing(ctx, 0, 0, r, color, angleStart, angleEnd);
}

//以(rAngle为半径x轴顺时针angle圈的点)为中心，画一个半径为r的圆
function drawRingAngle(ctx, rAngle, angle, r, color) {
    var x = rAngle * Math.cos(Math.PI * 2 * angle);
    var y = rAngle * Math.sin(Math.PI * 2 * angle);
    drawRing(ctx, x, y, r, color, 0, 1);
}

//以原点为中心，画一个半径为r的圆
export function drawRingOrigin(ctx, r, color) {
    drawRing(ctx, 0, 0, r, color, 0, 1);
}

//以{x,y}为中心，画一个半径为r的圆
function drawRing(ctx, x, y, r, color, angleStart, angleEnd) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, r, Math.PI * 2 * angleStart, Math.PI * 2 * angleEnd, false);
    if ((angleEnd - angleStart) % 1 != 0) {
        ctx.lineTo(x, y);//如果不能围成一个闭合的圆,就画一个圆弧
    }
    ctx.fill();
    ctx.restore();
}

/**********************画圆圈**********************/
//以(rAngle为半径-x轴逆时针angle圈的点)为中心，画一个半径为r的圆圈
export function drawCircleAngle(ctx, rAngle, angle, r, color) {
    var x = rAngle * Math.cos(Math.PI * 2 * (0.5 - angle));
    var y = rAngle * Math.sin(Math.PI * 2 * (0.5 - angle));
    drawCircle(ctx, x, y, r, color);
}

//以原点为中心，画一个半径为r的圆圈
export function drawCircleOrigin(ctx, r, color) {
    drawCircle(ctx, 0, 0, r, color);
}

//以{x,y}为中心，画一个半径为r的圆圈
function drawCircle(ctx, x, y, r, color) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.restore();
}

/**********************画文本**********************/
export function drawIconAngle(ctx, r, angle, text, color, size) {
    var x = r * Math.cos(Math.PI * 2 * (0.5 - angle));
    var y = r * Math.sin(Math.PI * 2 * (0.5 - angle));
    drawText(ctx, x, y, text, color, size, 'iconfont');
}

//以r为半径，-x轴逆时针angle圈位置显示文本text颜色为color
export function drawTextAngle(ctx, r, angle, text, color, size) {
    var x = r * Math.cos(Math.PI * 2 * (0.5 - angle));
    var y = r * Math.sin(Math.PI * 2 * (0.5 - angle));
    drawText(ctx, x, y, text, color, size, 'Microsoft JhengHei');
}

//在{x,y}处显示文本text颜色为color
function drawText(ctx, x, y, text, color, size, family) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.font = size + "px " + family;
    if (family == 'iconfont') {
        // ctx.font = 'bold ' + ctx.font;
        ctx.strokeStyle = color;
        // ctx.strokeText(text, x - ctx.measureText(text).width/2, y + size/3);
    }
    ctx.fillText(text, x - ctx.measureText(text).width / 2, y + size / 3);
    ctx.restore();
}

//改成圖片
export function drawImgAngle(ctx, r, angle, img) {
    var x = r * Math.cos(Math.PI * 2 * (0.5 - angle));
    var y = r * Math.sin(Math.PI * 2 * (0.5 - angle));
    return new Promise((resolve, reject) => {
        let imgObj = new Image();
        imgObj.onload = function () {
            drawImgText(ctx, x, y, imgObj);
            resolve();
        };
        imgObj.src = img;
    });
}
function drawImgText(ctx, x, y, img) {
    ctx.save();
    ctx.drawImage(img, x - 22, y - 22, 43, 43);
    ctx.restore();
}
/**********************画线**********************/
//画一条半径r的圆上-x轴逆时针角度angle1到angle2的直线,线型为grade
export function drawLineConn(ctx, r1, angle1, r2, angle2, color, grade, sizeGap) {
    var x1 = r1 * Math.cos(Math.PI * 2 * (0.5 - angle1));
    var y1 = r1 * Math.sin(Math.PI * 2 * (0.5 - angle1));
    var x2 = r2 * Math.cos(Math.PI * 2 * (0.5 - angle2));
    var y2 = r2 * Math.sin(Math.PI * 2 * (0.5 - angle2));
    drawLine(ctx, x1, y1, x2, y2, color, grade, sizeGap);
}

//画一条从{x1,0}到{x2,0}的线(默认线型)，逆时针旋转angle圈
export function drawLineAngle(ctx, x1, x2, angle, color) {
    ctx.save();
    ctx.rotate(Math.PI * 2 * (1 - angle));
    drawLine(ctx, x1, 0, x2, 0, color)
    ctx.restore();
}

//画一条{x1,y1}到{x2,y2}的线
function drawLine(ctx, x1, y1, x2, y2, color, grade, sizeGap) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = color;
    switch (grade) {
        case 0://默认
            break;
        case 1://第一档，2px&实线
            ctx.lineWidth = 2;
            break;
        case 2://第二档，1px&实线
            ctx.lineWidth = 1;
            break;
        case 3://第三档，1px&4/1分虚线
            ctx.lineWidth = 1;
            ctx.setLineDash([sizeGap * 2, sizeGap]);
            break;
        case 4://第四档，1px&2/1分虚线
            ctx.lineWidth = 1;
            ctx.setLineDash([sizeGap * 1, sizeGap]);
            break;
        case 5://第五档，1px&1/1分虚线
            ctx.lineWidth = 1;
            ctx.setLineDash([sizeGap * 0.5, sizeGap]);
            // ctx.lineDashOffset = 0;
            break;
        default://使用默认值
            break;
    }
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
}