
	var snowflakeURl = [
        'http://img.mukewang.com/55adde120001d34e00410041.png',
        'http://img.mukewang.com/55adde2a0001a91d00410041.png',
        'http://img.mukewang.com/55adde5500013b2500400041.png',
        'http://img.mukewang.com/55adde62000161c100410041.png',
        'http://img.mukewang.com/55adde7f0001433000410041.png',
        'http://img.mukewang.com/55addee7000117b500400041.png'
    ]


    /*飘雪花 */
    function snowflake() {
        /* 雪花容器*/
        var $flakeContainer = $('#snowflake');

        /* 随机六张图*/
        function getImagesName() {
            return snowflakeURl[[Math.floor(Math.random() * 6)]];
        }
        /* 创建一个雪花元素*/
        function createSnowBox() {
            var url = getImagesName();
            return $('<div class="snowbox" />').css({
                'width': 41,
                'height': 41,
                'position': 'absolute',
                'backgroundSize': 'cover',
                'zIndex': 100000,
                'top': '-41px',
                'backgroundImage': 'url(' + url + ')'
            }).addClass('snowRoll');
        }
        /* 开始飘花*/
        setInterval(function() {
            /* 运动的轨迹*/
            var startPositionLeft = Math.random() * visualWidth - 100,
                startOpacity    = 1,
                endPositionTop  = visualHeight - 40,
                endPositionLeft = startPositionLeft - 100 + Math.random() * 500,
                duration        = visualHeight * 10 + Math.random() * 5000;

            /* 随机透明度，不小于0.5*/
            var randomStart = Math.random();
            randomStart = randomStart < 0.5 ? startOpacity : randomStart;

            /* 创建一个雪花*/
            var $flake = createSnowBox();

            /* 设计起点位置*/
            $flake.css({
                left: startPositionLeft,
                opacity : randomStart
            });

            /* 加入到容器*/
            $flakeContainer.append($flake);

            /* 开始执行动画*/
            $flake.transition({
                top: endPositionTop,
                left: endPositionLeft,
                opacity: 0.7
            }, duration, 'ease-out', function() {
                $(this).remove() /*结束后删除*/
            });
            
        }, 200);
    }
	
	/*一个页面滚动的接口函数，其中有对传入的比例参数的处理方式*/

	/*开门*/
	var girl = {
        elem: $('.girl'),
        getHeight: function() {
            return this.elem.height();
        },
        /* 转身动作*/
        rotate: function() {
            this.elem.addClass('girl-rotate');
        },
        setOffset: function() {
            this.elem.css({
                left: visualWidth / 2,
                top: bridgeY - this.getHeight()
            });
        },
        getOffset: function() {
            return this.elem.offset();
        },
        getWidth: function() {
            return this.elem.width();
        }
    };
	/*修正小女孩的位置*/
	girl.setOffset();
	
	scrollTo(0,0);
	var boy = BoyWalk();
	/*boy.setFlowerWalk();*/
	
	var bird = {
		elem: $(".bird"),
		fly: function(){
			this.elem.addClass('birdFly');
			this.elem.transition({
				right: container.width()
			},15000,'linear');
		}
	};

	
	
	var logo = {
		elem: $('.logo'),
        run: function() {
            this.elem.addClass('logolightSpeedIn')
                .on(animationEnd, function() {
                    $(this).addClass('logoshake').off();
                });
        }
	};	
	
	/*音乐配置*/
	var audioConfig = {
        enable: true, /* 是否开启音乐*/
        playURl: 'http://www.imooc.com/upload/media/happy.wav', /* 正常播放地址*/
        cycleURL: 'http://www.imooc.com/upload/media/circulation.wav' /* 正常循环播放地址*/
    };

    /*背景音乐 */
    function Hmlt5Audio(url, isloop) {
        var audio = new Audio(url);
        audio.autoPlay = true;
        audio.loop = isloop || false;
        audio.play();
        return {
            end: function(callback) {
                audio.addEventListener('ended', function() {
                    callback();
                }, false);
            }
        };
    }

	/*第二个图的动作*/
	/*function startRun(){
		boy.walkTo(2000,0.5)
		.then(function(){
			boy.stopWalk();
		}).then(function(){
			return openDoor();
		}).then(function(){
			lamp.bright();
		}).then(function(){//进商店
			return boy.toShop(2000);
		}).then(function(){//取花
			return boy.takeFlower();
		}).then(function(){//飞鸟
			bird.fly();
		}).then(function(){//出商店
			return boy.outShop(2000);
		}).then(function(){
			return closeDoor();
		}).then(function(){
			lamp.dark();
		});
     }*/
	
	/*$("button:first").click(function() {
    
        // 第一次走路到桥底边left,top
        boy.walkTo(2000, 0.15)
            .then(function() {
                // 第二次走路到桥上left,top
                return boy.walkTo(1500, 0.3, 0.368);//调整第二次走动的位置
            })
            .then(function() {
                // 实际走路的比例
                var proportionX = (girl.getOffset().left - boy.getWidth() + girl.getWidth() / 5) / visualWidth;
                // 第三次桥上直走到小女孩面前
                return boy.walkTo(1500,proportionX);
            }).then(function() {
                // 图片还原原地停止状态
                boy.resetOriginal();
            }).then(function() {
				setTimeout(function(){
					girl.rotate();
					boy.rotate(function() {
					logo.run();
				});
				},1000);
			}).then(function() {
				return snowflake();
			});
    })*/
	$("button:first").click(function() {
		boy.walkTo(3000,0.4)
			.then(function() {
                    /* 第一次走路完成*/
                    /* 开始页面滚动*/
                    /*boy.setColor('red')/*此处存在拼写问题*/
                    scrollTo(5000,1);
                }).then(function() {
                    /*第二次走路*/
                    return boy.walkTo(5000, 0.5);
                }).then(function(){
					boy.stopWalk();
				}).then(function(){
					return openDoor();
				}).then(function(){
					lamp.bright();
				}).then(function(){/*进商店*/
					return boy.toShop(2000);
				}).then(function(){/*取花*/
					return boy.takeFlower();
				}).then(function(){/*飞鸟*/
					bird.fly();
				}).then(function(){/*出商店*/
					return boy.outShop(2000);
				}).then(function(){
					boy.stopWalk();/*停止走动*/
				}).then(function(){
					closeDoor();
				}).then(function(){
					return lamp.dark();
				}).then(function() {
					boy.walkTo(5000,0.15);/*继续走动进入第三幅图*/
				}).then(function() {
					return scrollTo(5000,2);/*页面向第三幅图滑动*/
				}).then(function(){
					return boy.walkTo(1500, 0.3, 0.368);/*上桥*/
				}).then(function(){
					var proportionX = (girl.getOffset().left - boy.getWidth() + girl.getWidth() / 5) / visualWidth;
                /*第三次桥上直走到小女孩面前*/
                return boy.walkTo(1500,proportionX - 0.03);
				}).then(function(){
					boy.stopWalk();
				}).then(function() {
				setTimeout(function(){
					girl.rotate();
					boy.rotate(function() {
					logo.run();
				});
				},1000);
				}).then(function() {
				return snowflake();
				});
	})
	/*$("button:first").click(startRun);*/
	/*关门*/
	/*$("button:last").click(function(){
		closeDoor().then(function(){
			lamp.dark();
		});*/
	});
