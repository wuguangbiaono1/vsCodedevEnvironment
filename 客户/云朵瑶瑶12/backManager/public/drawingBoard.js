(function() {
    'use strict';
    function drawingBoard() {
        this.deploy = {
            drawPanel: "drawPanel",
            canvasId: "canvas_" + Math.random().toString(36).substring(2),
            imgId: "img_" + Math.random().toString(36).substring(2),
            random: Math.random().toString(36).substring(2),
            width: 400,
            height: 400,
            imgBackSrc: null,
            scale:1, //缩放等级
            penColor: "#000", //
            roundr:4.5, //圆点的显示半径
            lineWidth: 3, //路径宽度
            assist: false, //是否开启辅助线
            assistColor: "#000", //辅助线颜色
            startIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxODM5OTFGNEE3QjkxMUU2QTgxM0MyMDcwRkFERjkxQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxODM5OTFGNUE3QjkxMUU2QTgxM0MyMDcwRkFERjkxQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjE4Mzk5MUYyQTdCOTExRTZBODEzQzIwNzBGQURGOTFCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjE4Mzk5MUYzQTdCOTExRTZBODEzQzIwNzBGQURGOTFCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8++OC6yAAADL1JREFUeNrMW3mQFNUZ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',
            endIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyNjZEMDgyRkE3QjkxMUU2QTk2MUQwMDJFRkRCOEUwOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyNjZEMDgzMEE3QjkxMUU2QTk2MUQwMDJFRkRCOEUwOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI2NkQwODJEQTdCOTExRTZBOTYxRDAwMkVGREI4RTA4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjI2NkQwODJFQTdCOTExRTZBOTYxRDAwMkVGREI4RTA4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8++MvjKwAADR5JREFUeNrMWwmUFMUZ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',
            intersectIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAFaklEQVRoQ9Vaa0xURxT+ThqDyA8RWrCwtWmDlhoUTYhBA13LK1ZKSTRabGXJNipipSWrCUYgrMtDoomhiBhQRHkUDBpC2xgrawFrRRJsxKAhwcQoII8oYFR8RDPN3JU3u3fusgtlkv2153zn++bemXPmzCXYYDDGPkRZ2Xa0tX2FV69UeP58AQYG5qKv7z0J3sXlLZydX8LJqR8ODh3w8rqArVsLiKhnquHJWgDGmBvOnk1De/vXaGryQG+vMig3N8DPrxMq1e+IikomosfKAEzWigWwpqZlaGzMQ3NzANrarIk50WfxYmD58ivw84sjf/87SkCFBbC1axciLKwMd+4EobNTSQxxW09PwNvbCKMxmurqukUchQQwg0GH27cz0dvrIAI6ZRs3t5dYsiSR0tJy5LBkBbCDBwtx6dIPckB2+T8k5CQlJW23hG1RADMY/kBtbbhdyImCqtW/kV4fac7crACWk1OBqqpvRePY1S4y8ldKSPh+shiTCmBlZVk4eTLRrqSUgmu1GaTRJI93myCA5eVpUVl5Sin+tNhHRkZTQkLp6FhjBEhbpYfHPXR1zZ0WQkqDLFz4Al1dn47eYscKyMy8jJqaIKW402ofHFxDyclhQzGHBUgZNjv7lt2SlK1U8mS3a9fntGZN65hSgh079jfOnQsQjrNuHRAYCPT3A0YjcPOmsKtkuGIFsH49MGcOUFcH1NeL+2/YUEfx8V8OC5AKs9jYHuHaJiYG4L/R48ABcRJqNZCaOtb/6FGgqkpMhJcXQ0GBCxENSK8QKy4uRFGReLY9csQ0g+OHiIjJyHOcixeBQ4fEBHArjSaftNqdJgEGQzdqa92Fvc0J4ACWRJgjz/34a5iZKUwBavVD0us9STqMbNr0EI8VlOOWiJgTIeej0ylbR66uQGXl+8QKCw0oLU0Rl/7OUo7Q6CehxFYJkS1bUomlpjbgyhV/JX7DtiLEuPH4BWvt4h9PMiDgH2L79rWjsVFllQDuJCfCErDIorfkv2rVA2Lx8c/Q0uJktQBrRUyVPI+7dOlTYtHRb9DRYeoeTGUoeRK2IM+5enq+IRYezjA4OBXqI74iImxFnkd1dGSzW8C8eZjdr5BK9XZ2L2Ifn8HZvY2uXt01uxNZUNC/xEpKUnDqlEHxNiS340xHKREXl8WLOXdERXUras4qIT80M3I+Sos53hyuqPjMVE4fPtyBCxc8hZ+CPcppfpjhhxrRERHxiHS6D0wCysuPo6Bgp6gv7HGgaWgAkpKEKWD37mLauDHGJIAxV8TGPprRI6WSDM3b8fn5HxPRg5GuRG5uPc6f/0J4CviZ2NfXZF5dLX4eHr0mIt+1PJubgTNnhENj8+YGiotbwx1GBFy/vhS5ubdnRVtlz56VtHKl1AYZ29hKT6/B5csh4lMxA5ahoX/R/v3BQ5Enthbd3e+ht/f/2VrkFx89PZ+YbS1KCzol5SdcvfrLDMytfMiAgJ/H39pM3l7PyDgBo3GbPOI0WgQF5VNKyoSt3vwFh15fjfr6b6aRovlQgYFVZDBsmMzA8hVTdnYZqqu/m1ERERElpNNpzHGQv+QrLk5HUZGCFGlDuRrNAdJq9ZYQZQVICzs7eysaGwvQ3e1oQ3rmodzdB+Hnt4327i2XiyckQBLBb29CQorR2hpqt2Tn4cHg7c1zUYxNL7pHzwK7ds0bN24cx61baty9KzwBFmeSt8uXLauDr28sqdWKvl+wmgBjzBmnT2fh/v0ItLR4KGoOczW8Oevj8xCLFlVDq00koqdyr4viXUgUUKpmT5z4Ee3tYXj9+iM8e7YAT544jvncZv78F3By6pM+t1Gp/sSOHblE1C8aw5zdf99vKWS+a7T6AAAAAElFTkSuQmCC',
        };
        this.can = {
            canvas: null,
            context: null,
            imgae: null,
            pointList: new Array(),
            distance:0,
            errorPoint: new Object
        };
        this.init = function(options, complete) {
            var vm = this;
            if (this.notEmptyObj(options)) {
                if (options.backgroundImg) {
                    var imgae = new Image();
                    imgae.src = options.backgroundImg;
                    imgae.onload = function() {
                        options.width = imgae.width;
                        options.height = imgae.height;
                        vm.deploy = Object.assign(vm.deploy, options);
                        vm.deploy.roundr = vm.deploy.lineWidth + (vm.deploy.lineWidth / 3);
                        vm.can.imgae = imgae;
                        vm.initElement();
                        vm.eventBind();
                        complete(vm)
                    }
                } else {
                    console.error('[缺少backgroundImg]', new Date().toLocaleString())
                }
            } else {
                console.error('[创建失败]', new Date().toLocaleString())
            }

        };
        //初始化Dom
        this.initElement = function() {
            var vm = this,
                canvasId = this.deploy.drawPanel,
                backgroundImg = this.deploy.backgroundImg,
                random = this.deploy.random,
                scale = this.deploy.scale;
            var beforeHtml = '<img style="transform-origin:0 0;transform: scale('+scale+');" src="' + backgroundImg + '" id="' + this.deploy.imgId + '" />' +
                '<canvas style="transform-origin:0 0;transform: scale('+scale+');" id="' + this.deploy.canvasId + '"></canvas>' +
                '<img style="display:none;transform-origin:0 0;transform: scale('+scale+');" id="startIcon_' + random + '" src="' + this.deploy.startIcon + '" />' +
                '<img style="display:none;transform-origin:0 0;transform: scale('+scale+');" id="endIcon_' + random + '" src="' + this.deploy.endIcon + '" />' +
                '<div style="display:none;transform-origin:0 0;transform: scale('+scale+');" id="assist_x_' + random + '"></div>' +
                '<div style="display:none;transform-origin:0 0;transform: scale('+scale+');" id="assist_y_' + random + '"></div>';
            document.getElementById(canvasId).insertAdjacentHTML('beforeEnd', beforeHtml);
            var nodeArr = [vm.deploy.drawPanel, vm.deploy.canvasId, vm.deploy.imgId];
            nodeArr.forEach(function(id) {
                if (id) {
                    var node = document.getElementById(id);
                    if (node != null) {
                        node.setAttribute('width', vm.deploy.width);
                        node.setAttribute('height', vm.deploy.height);
                        node.style.position = "absolute";
                        node.style.width = vm.deploy.width + 'px';
                        // node.style.height = vm.deploy.height + 'px';
                        node.style.height = '800px';
                    }
                }
            })
            document.getElementById(vm.deploy.drawPanel).style.zIndex = 0;
            document.getElementById(vm.deploy.imgId).style.zIndex = 1;
            document.getElementById(vm.deploy.canvasId).style.zIndex = 2;
            document.getElementById(vm.deploy.canvasId).style.cursor = "crosshair";

            this.can.canvas = document.getElementById(vm.deploy.canvasId);
            var width = this.can.canvas.offsetWidth;
            var height = this.can.canvas.offsetHeight;
            this.can.context = this.can.canvas.getContext("2d");
            this.can.canvas.width = width;
            this.can.canvas.height = height;


            var scrollView = document.querySelector(".scrollView");
            var map = document.querySelector(".map");
            if (map) {
                map.style.maxWidth = vm.deploy.width + 'px';
            }
            if (scrollView) {
                scrollView.style.maxWidth = vm.deploy.width + 'px';
                scrollView.scrollTop = (this.can.canvas.offsetHeight - scrollView.offsetHeight) / 2;
                scrollView.scrollLeft = (this.can.canvas.offsetWidth - scrollView.offsetWidth) / 2;
                scrollView.style.opacity = 1;
            }

        };
        //初始化路径
        this.iniData = function(array, complete) {
            if (this.notEmptyObj(array)) {
                try {
                    this.ReDo();
                    this.can.pointList = array;
                    this.drawingAll();
                    complete(this);
                } catch (error) {
                    console.error('[iniData失败]' + error, new Date().toLocaleString())
                }
            }
        };
        //绑定事件
        this.eventBind = function() {
            var vm = this;
            this.can.canvas.addEventListener('mousemove', function(e) {
                var assistX = document.getElementById('assist_x_' + vm.deploy.random),
                    assistY = document.getElementById('assist_y_' + vm.deploy.random),
                    pointList = vm.can.pointList,
                    assist = vm.deploy.assist, //是否开启辅助线
                    lineWidth = vm.deploy.lineWidth;
                if (pointList.length > 0 && assist) {
                    var X = pointList[pointList.length - 1].x;
                    var Y = pointList[pointList.length - 1].y;
                    if ((X - e.offsetX) <= (lineWidth / 2) && (X - e.offsetX) >= -(lineWidth / 2)) {
                        assistX.style.opacity = '0.4';
                    } else {
                        assistX.style.opacity = '0.2';
                    };
                    if ((Y - e.offsetY) <= (lineWidth / 2) && (Y - e.offsetY) >= -(lineWidth / 2)) {
                        assistY.style.opacity = '0.4';
                    } else {
                        assistY.style.opacity = '0.2';
                    }
                };
                // document.title = e.offsetX + '-' + e.offsetY;
            });
            this.can.canvas.addEventListener('click', function(e) {
                var pointList = vm.can.pointList;
                if (vm.equalStartPoint(e.offsetX,e.offsetY)&&vm.isIntersect(e.offsetX, e.offsetY)) {
                    vm.can.pointList.push({
                        x: e.offsetX,
                        y: e.offsetY
                    });
                } else {
                    layer.msg("路径不合法", {
                        offset: '1em',
                        anim: 6,
                        time: 800
                    });
                }
                vm.drawingAll();
            });
        };
        this.drawingAll = function() {
            this.can.context.clearRect(0, 0, this.deploy.width, this.deploy.height);
            this.drawLine(); //线
            this.drawArc(); //画圆
            this.drawIcon(); //图标
            this.assist(); //辅助线
            this.lineDash(); //画虚线
            this.distanceAll();//计算距离
        };
        //画图标
        this.drawIcon = function() {
            var vm = this;
            var startIcon = document.getElementById('startIcon_' + vm.deploy.random),
                endIcon = document.getElementById('endIcon_' + vm.deploy.random),
                startX = vm.can.pointList[0].x,
                startY = vm.can.pointList[0].y,
                endX = vm.can.pointList[vm.can.pointList.length - 1].x,
                endY = vm.can.pointList[vm.can.pointList.length - 1].y,
                scale = this.deploy.scale,
                size = 30;
            //起点图标
            startIcon.style.display = "block";
            startIcon.style.position = "absolute";
            startIcon.style.zIndex = 5;
            startIcon.style.left = (startX - (size / 2))*scale + 'px';
            startIcon.style.top = (startY - (size / 1.2))*scale + 'px';
            startIcon.style.opacity = '0.8';
            startIcon.style.pointerEvents = 'none';
            startIcon.width = size;
            startIcon.height = size;
            if (vm.can.pointList.length > 1) {
                //终点图标
                endIcon.style.display = "block";
                endIcon.style.position = "absolute";
                endIcon.style.zIndex = 6;
                endIcon.style.left = (endX - (size / 2))*scale + 'px';
                endIcon.style.top = (endY - (size / 1.2))*scale + 'px';
                endIcon.style.transition = 'all 0.5s ease';
                endIcon.style.opacity = '0.8';
                endIcon.style.pointerEvents = 'none';
                endIcon.width = size;
                endIcon.height = size;
            };
        };
        //画圈：
        this.drawArc = function() {
            var vm = this;
            var p = this.can.pointList;
            var round = function(x, y) {
                vm.can.context.fillStyle = vm.toDeepen(vm.deploy.penColor);
                vm.can.context.beginPath();
                vm.can.context.arc(x, y, vm.deploy.roundr, 360, Math.PI * 2, true);
                vm.can.context.fill();
                vm.can.context.closePath();
            };
            for (var index = 0; index < p.length; index++) {
                var element = p[index];
                round(element.x, element.y);
            };
        };
        //画线
        this.drawLine = function() {
            var vm = this;
            var p = this.can.pointList;
            if (p.length > 1) {
                this.can.context.setLineDash([]);
                this.can.context.beginPath();
                this.can.context.lineCap = "round";
                this.can.context.lineJoin = "round";
                this.can.context.strokeStyle = this.deploy.penColor;
                this.can.context.lineWidth = this.deploy.lineWidth;
                for (var index = 0; index < p.length; index++) {
                    var e = p[index];
                    if (index > 0) {
                        this.can.context.lineTo(e.x, e.y);
                    } else {
                        this.can.context.moveTo(e.x, e.y);
                    }
                };
                this.can.context.stroke();
                this.can.context.closePath();
            };
        };
        //画虚线
        this.lineDash = function() {
            var errorPoint = this.can.errorPoint;
            if (errorPoint.x) {
                var p = this.can.pointList;
                this.can.context.beginPath();
                // 设置线宽
                var lineWidth = this.deploy.lineWidth;
                this.can.context.lineWidth = lineWidth;
                this.can.context.setLineDash([lineWidth + (lineWidth / 2), lineWidth + (lineWidth / 2)]);
                this.can.context.moveTo(errorPoint.x, errorPoint.y);
                this.can.context.lineTo(p[p.length - 1].x, p[p.length - 1].y);
                this.can.context.strokeStyle = "red";
                this.can.context.stroke();
                this.can.context.closePath();
            }

        };
        //辅助线
        this.assist = function() {
            var vm = this;
            var assistX = document.getElementById('assist_x_' + vm.deploy.random),
                assistY = document.getElementById('assist_y_' + vm.deploy.random),
                offsetX = vm.can.pointList[vm.can.pointList.length - 1].x,
                offsetY = vm.can.pointList[vm.can.pointList.length - 1].y,
                lineWidth = 2,
                scale = this.deploy.scale,
                assist = vm.deploy.assist, //是否开启辅助线
                assistColor = vm.deploy.assistColor; //辅助线颜色
            if (assist) {
                assistX.style.display = "block";
                assistX.style.position = "absolute";
                assistX.style.zIndex = 4;
                assistX.style.left = (offsetX - (lineWidth / 2) - 0.5)*scale + 'px';
                assistX.style.top = 0;
                assistX.style.opacity = '0.2';
                assistX.style.pointerEvents = 'none';
                assistX.style.height = "100%";
                assistX.style.width = lineWidth + 'px';
                assistX.style.background = "linear-gradient(to top, " + assistColor + ", " + assistColor + " 6px, transparent 0, transparent)";
                assistX.style.backgroundSize = "100% 10px";
                assistX.style.transition = 'all 0.3s ease';
                assistY.style.display = "block";
                assistY.style.position = "absolute";
                assistY.style.zIndex = 4;
                assistY.style.top = (offsetY - (lineWidth / 2))*scale + 'px';
                assistY.style.left = 0;
                assistY.style.opacity = '0.2';
                assistY.style.pointerEvents = 'none';
                assistY.style.width = "100%";
                assistY.style.height = lineWidth + 'px';
                assistY.style.background = "linear-gradient(to left, " + assistColor + ", " + assistColor + " 6px, transparent 0, transparent)";
                assistY.style.backgroundSize = "10px 100%";
                assistY.style.transition = 'all 0.3s ease';
            } else {
                assistX.style.display = "none";
                assistY.style.display = "none";
            }
        };
        this.toDeepen = function(str) {
            // 16进制颜色值的正则
            var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
            // 把颜色值变成小写
            var color = str.toLowerCase();
            if (reg.test(color)) {
                // 如果只有三位的值，需变成六位，如：#fff => #ffffff
                if (color.length === 4) {
                    var colorNew = "#";
                    for (var i = 1; i < 4; i += 1) {
                        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
                    }
                    color = colorNew;
                }
                // 处理六位的颜色值，转为RGB
                var rgbc = [];
                for (var i = 1; i < 7; i += 2) {
                    rgbc.push(parseInt("0x" + color.slice(i, i + 2)));
                }
                //floor 向下取整
                for (var i = 0; i < 3; i++) rgbc[i] = Math.floor(rgbc[i] * (1 - 0.1));
                return 'rgb(' + rgbc[0] + ',' + rgbc[1] + ',' + rgbc[2] + ')'

            } else {
                return color;
            }
        };
        // 计算距离
        this.distanceAll = function(){
            var calculate = function(x1,y1,x2,y2){
                return Math.sqrt((x2-=x1)*x2+(y2-=y1)*y2); 
            }
            var p = this.can.pointList;
            if (p.length > 1){
                var s = 0;
                for (var index = 0; index < p.length; index++) {
                    var element = p[index];
                    if (p[index + 1]) {
                        var x1 = element.x;
                        var y1 = element.y;
                        var x2 = p[index + 1].x;
                        var y2 = p[index + 1].y;
                        s += calculate(x1,y1,x2,y2);
                    }
                }
                this.can.distance = s;   
                // Math.ceil() // 向上
                // Math.floor() // 向下
                // Math.round() // 四舍五入
            }else{
                this.can.distance = 0;   
            }
        };
        //导出图片;
        this.Export = function(complete) {
            var vm = this;
            var pointList = vm.can.pointList;
            if (pointList.length > 1) {
                var canvas = document.createElement("canvas");
                canvas.width = vm.deploy.width;
                canvas.height = vm.deploy.height;
                var ctx = canvas.getContext('2d');
                ctx.drawImage(vm.can.imgae, 0, 0, canvas.width, canvas.height);
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
                ctx.strokeStyle = vm.deploy.penColor;
                ctx.lineWidth = vm.deploy.lineWidth;
                pointList.forEach(function(e, i) {
                    if (i == "0") {
                        ctx.moveTo(e.x, e.y);
                    } else {
                        ctx.lineTo(e.x, e.y);
                    }
                });
                ctx.stroke();
                var startIcon = document.getElementById('startIcon_' + vm.deploy.random),
                    endIcon = document.getElementById('endIcon_' + vm.deploy.random),
                    startX = pointList[0].x,
                    startY = pointList[0].y,
                    endX = pointList[pointList.length - 1].x,
                    endY = pointList[pointList.length - 1].y,
                    size = 30;
                ctx.drawImage(startIcon, startX - (size / 2), startY - (size / 1.2), size, size);
                ctx.drawImage(endIcon, endX - (size / 2), endY - (size / 1.2), size, size);
                canvas.toBlob(function(blob) {
                    var objectURL = URL.createObjectURL(blob);
                    complete(objectURL);
                }, 1);
                // complete(canvas.toDataURL("image/png"),1)
            } else {
                complete(null, '[至少两条路径]')
            }
        };
         //判断点重合；
        this.equalStartPoint = function (x, y) {
            var is = true;
            var p = this.can.pointList;
            for (var index = 0; index < p.length; index++) {
                var element = p[index];
                if (p.length > 2 && Math.abs((x - element.x) * (x - element.x)) + Math.abs((y - element.y) * (y - element.y)) <= this.deploy.roundr * this.deploy.roundr) {
                    is = false;
                    break;
                }
            }
            return is
        };
        //判断相交
        this.isIntersect = function(x, y) {
            var cross = [];
            var is = true;
            this.intersectIconHide();
            var lineWidth = this.deploy.lineWidth;
            var o = [{
                x: x,
                y: y
            }];
            var s = this.can.pointList;
            var p = s.concat(o);
            if (p.length > 2) {
                var a = {
                        x: p[p.length - 1].x,
                        y: p[p.length - 1].y
                    },
                    b = {
                        x: p[p.length - 2].x,
                        y: p[p.length - 2].y
                    },
                    c = new Object(),
                    d = new Object();
                for (var index = 0; index < p.length; index++) {
                    if (p[index + 2]) {
                        c = {
                            x: p[index].x,
                            y: p[index].y
                        };
                        d = {
                            x: p[index + 1].x,
                            y: p[index + 1].y
                        };
                        var isCross = this.segmentsIntr(a, b, c, d);
                        if (isCross.x) {
                            cross.push(isCross);
                            is = false;
                            // break;
                        };
                    }
                };
            }
            this.intersectIconShow(cross, x, y);
            return is
        };
        //显示相交图标
        this.intersectIconShow = function(array, x, y) {
            if (array.length > 0) {
                this.intersectIconHide();
                this.can.errorPoint.x = x;
                this.can.errorPoint.y = y;
                this.lineDash();
                var canvasId = this.deploy.drawPanel;
                var lineWidth = this.deploy.lineWidth;
                for (var index = 0; index < array.length; index++) {
                    var size = lineWidth * 3.5 > 20 ? lineWidth * 3.5 : 20;
                    var e = array[index];
                    var imgae = new Image();
                    imgae.src = this.deploy.intersectIcon;
                    imgae.classList.add("intersectIcon");
                    imgae.style.display = "block";
                    imgae.style.position = "absolute";
                    imgae.style.zIndex = 10 + index;
                    imgae.style.left = e.x - (size / 2) + 'px';
                    imgae.style.top = e.y - (size / 2) + 'px';
                    imgae.style.opacity = '0.8';
                    imgae.style.pointerEvents = 'none';
                    imgae.width = size;
                    imgae.height = size;
                    document.getElementById(canvasId).appendChild(imgae);
                }
            } else {
                this.can.errorPoint = new Object();
            }
        };
        //隐藏显示相交图标
        this.intersectIconHide = function() {
            var Dom = document.querySelectorAll('.intersectIcon');
            for (var index = 0; index < Dom.length; index++) {
                var element = Dom[index];
                element.remove();
            }
        };
        this.segmentsIntr = function(a, b, c, d) {
            //参考 https://www.iteye.com/blog/fins-1522259
            // console.log('segmentsIntr', a, b, c, d);
            //线段ab的法线N1  
            var nx1 = (b.y - a.y),
                ny1 = (a.x - b.x);

            //线段cd的法线N2  
            var nx2 = (d.y - c.y),
                ny2 = (c.x - d.x);

            //两条法线做叉乘, 如果结果为0, 说明线段ab和线段cd平行或共线,不相交  
            var denominator = nx1 * ny2 - ny1 * nx2;
            if (denominator == 0) {
                return false;
            }

            //在法线N2上的投影  
            var distC_N2 = nx2 * c.x + ny2 * c.y;
            var distA_N2 = nx2 * a.x + ny2 * a.y - distC_N2;
            var distB_N2 = nx2 * b.x + ny2 * b.y - distC_N2;

            // 点a投影和点b投影在点c投影同侧 (对点在线段上的情况,本例当作不相交处理);  
            if (distA_N2 * distB_N2 >= 0) {
                return false;
            }

            //  
            //判断点c点d 和线段ab的关系, 原理同上  
            //  
            //在法线N1上的投影  
            var distA_N1 = nx1 * a.x + ny1 * a.y;
            var distC_N1 = nx1 * c.x + ny1 * c.y - distA_N1;
            var distD_N1 = nx1 * d.x + ny1 * d.y - distA_N1;
            if (distC_N1 * distD_N1 >= 0) {
                return false;
            }

            //计算交点坐标  
            var fraction = distA_N2 / denominator;
            var dx = fraction * ny1,
                dy = -fraction * nx1;
            return {
                x: a.x + dx,
                y: a.y + dy
            };
        };
        //重做，清空
        this.ReDo = function() {
            this.intersectIconHide();
            this.clearCan();
            this.can.pointList.length = 0;
        };
        //清空画布
        this.clearCan = function() {
            document.getElementById('startIcon_' + this.deploy.random).style.display = "none";
            document.getElementById('endIcon_' + this.deploy.random).style.display = "none";
            document.getElementById('assist_x_' + this.deploy.random).style.display = "none";
            document.getElementById('assist_y_' + this.deploy.random).style.display = "none";
            this.can.context.clearRect(0, 0, this.deploy.width, this.deploy.height);
        };
        //放大 缩小 还原
        this.zoom = function(type){
            var scale = this.deploy.scale;
            var s = 1;
            if(type==='+'){
                s = this.deploy.scale += 0.25;
                if(scale>2.25){
                    s = 2.5;
                }
            }else if(type==='-'){
                s = this.deploy.scale -= 0.25;
                if(scale<0.7){
                    s = 0.7;
                }
            }
            this.deploy.scale = s;
            var dom = document.getElementById(this.deploy.drawPanel).querySelectorAll('*');
            for (var index = 0; index < dom.length; index++) {
                 var element = dom[index];
                 element.style.transform = 'scale('+s+')';
            }
            this.drawIcon(); //图标
            this.assist(); //辅助线
        };
        //Revoke 撤销
        this.revoke = function(complete) {
            this.intersectIconHide();
            var errorPoint = this.can.errorPoint;
            if (errorPoint.x) {
                this.can.errorPoint = new Object();
                this.drawingAll();
            } else {
                this.can.pointList.pop();
                var p = this.can.pointList;
                if (p.length > 1) {
                    this.drawingAll();
                } else if (p.length > 0) {
                    this.clearCan();
                    this.drawArc(); //画圆
                    this.drawIcon(); //图标
                    this.assist(); //辅助线
                    this.distanceAll();//计算距离
                } else {
                    this.clearCan();
                    this.distanceAll();//计算距离
                }
            }
            complete(this);
        };

        this.notEmptyObj = function(obj) {
            if (obj != null && obj != undefined && obj != "") {
                return true;
            }
            return false;
        }
    };
    window['drawingBoard'] = drawingBoard;
})();