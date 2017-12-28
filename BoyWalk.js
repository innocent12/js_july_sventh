/*开关门*/
//灯光的动画效果
var animationEnd = (function() {
           var explorer = navigator.userAgent;
           if (~explorer.indexOf('WebKit')) {
               return 'webkitAnimationEnd';
           }
           return 'animationend';
       })();

var container = $("#content");
var swipe = Swipe(container);
var visualWidth = container.width();
var visualHeight = container.height();

var lamp = {
        elem: $('.b_background'),
        bright: function() {
            this.elem.addClass('lamp-bright');
        },
        dark: function() {
            this.elem.removeClass('lamp-bright');
        }
};
//页面滚动到指定位置
function scrollTo(time, proportionX){
		var distX = container.width() * proportionX;
		swipe.scrollTo(distX,time);
	}
	
	//桥的Y轴
	var bridgeY = function(){
		//var data = getValue('c_background_middle');
		var $elem = $("c_background_middle");
		return $elem.position().top;
	}();/*定义之后立刻调用并且传值*/
	
	//获取图像的数据
/*	var getValue = function(className){
		var $elem = $('' + className + '');//此处的class写成了calss废了一个多小时
		//返回走路的路线的坐标，顶部top和中间路的高度
		return {
			height: $elem.height(),
			top: $elem.position().top
		};
	};*/
	
	//小女孩
	var girl = {
		elem: $('.girl'),
		getHeight: function() {
			return this.elem.height();
		},
		setOffset:function(){
			this.elem.css({
				left: visualWidth / 2,
				top: bridgeY - this.getHeight()
			});
		}
	};
	//修正女孩位置
	girl.setOffset();
	//用来临时调整页面
	//swipe.scrollTo(visualWidth * 4,0);
	//scrollTo();
	
function doorAction(left, right, time){/*开关们的左右们的坐标位移函数*/
		var $door = $('.door');
		var doorLeft = $('.door-left');
		var doorRight = $('.door-right');
		var defer = $.Deferred();
		var count = 2;
		var complete = function(){
			if(count == 1){//第二次return defer;
				defer.resolve();
				return;
			}
			count--;
		};
		doorLeft.transition({
			'left':left
		},time,complete);
		
		doorRight.transition({
			'left':right
		},time,complete);
		
		return defer;
}

	function openDoor() {
		return doorAction('-50%','100%',2000);
	}
	function closeDoor(){
		return doorAction('0%','50%',2000);
	}	
	var instanceX;
/*小男孩走路的行为*/
function BoyWalk() {
	// JavaScript Document封装小男孩运动路径以及方式
	var container = $("#content");
	var visualWidth = container.width();
	var visualHeight = container.height();


	//得到路的Y轴
	var pathY = function() {
        //var data = getValue('.a_background_middle');
		var $elem = $(".a_background_middle");
        return $elem.position().top + $elem.height() / 2;
    }();

    var $boy = $("#boy");
    var boyHeight = $boy.height();
	var boyWidth = $boy.width();
	
	//获取图像的数据
	var getValue = function(className){
		var $elem = $('' + className + '');//此处的class写成了calss废了一个多小时
		//返回走路的路线的坐标，顶部top和中间路的高度
		return {
			height: $elem.height(),
			top: $elem.position().top
		};
	};
    // 修正小男孩的正确位置
	
    $boy.css({
        top: pathY - boyHeight + 30
    });
	/////////////////////////////////
	//////动画处理///////////////////
	/////////////////////////////////
	//暂停走路
	function pauseWalk(){
		$boy.addClass('pauseWalk');	
	}
	//恢复走路
	function restoreWalk() {
		$boy.removeClass('pauseWalk');	
	}
	//CSS动作变化
	function slowWalk(){
		$boy.addClass('slowWalk');	
	}
	//计算移动距离
	function calculateDist(direction, proportion){
		return (direction == "x"?
				visualWidth : visualHeight) * proportion;	
	}
	//用transtion运动
	function startRun(options, runTime){
		var dfdPlay = $.Deferred();
		//恢复走路
		restoreWalk();
		$boy.transition(
			options,
			runTime,
			'linear',
			function(){
				dfdPlay.resolve();
				});
		return dfdPlay;
	}
	//脚下开始动
	function walkRun(time,dist,disY){
		time = time || 3000;
		//脚的动作原地踏步
		slowWalk();
		//向前移动
		var d1 = startRun({
						  'left':dist?dist:undefined,
						  'top': disY + 'px'
						  },time);
		return d1;
	}
	//进商店
	function walkToShop(runTime) {
            var defer = $.Deferred();
            var doorObj = $('.door');
            // 门的坐标
            var offsetDoor = doorObj.offset();
            var doorOffsetLeft = offsetDoor.left;
            // 小孩当前的坐标
            var offsetBoy     = $boy.offset();
            var boyOffsetLeft = offsetBoy.left;

            // 当前需要移动的坐标
            instanceX = (doorOffsetLeft + doorObj.width() / 2) - (boyOffsetLeft + $boy.width() / 2);

            // 开始走路
            var walkPlay = startRun({
                transform: 'translateX(' + instanceX + 'px),scale(0.3,0.3)',
                opacity: 0.1
            }, 2000);
            // 走路完毕
            walkPlay.done(function() {
                $boy.css({
                    opacity: 0
                })
                defer.resolve();
            })
            return defer;
        }
	//出商店
	
	function walkOutShop(runTime) {
            var defer = $.Deferred();
            restoreWalk();
            //开始走路
            var walkPlay = startRun({
                transform: 'translateX(' + instanceX + 'px),scale(1,1)',
                opacity: 1.0
            }, runTime);
            //走路完毕
            walkPlay.done(function() {
                defer.resolve();
            });
            return defer;
        }
		//在商店取花
		function takeFlower(){
			var defer = $.Deferred();
			//增加延迟等待时间
			setTimeout(function(){
				$boy.addClass('slowFlowerWalk');
				defer.resolve();
			},1000);
			return defer;
		}
		
	return {
		//开始走路
		walkTo:function(time, proportionX, proportionY){
			var distX = calculateDist('x', proportionX)
			var distY = calculateDist('y', proportionY)
			return walkRun(time, distX, distY);
		},
		stopWalk:function(){
			pauseWalk();	
		},
		setColor:function(value){
			$boy.css('background-color',value)
		},
		toShop:function(){
			return walkToShop.apply(null,arguments);	
		},
		outShop:function(){
			return walkOutShop.apply(null,arguments);	
		},
		takeFlower:function(){
			return takeFlower();	
		},
		getWidth:function(){
			return $boy.width();	
		},
		resetOriginal:function(){
			this.stopWalk();
			$boy.removeClass('slowWalk slowFlowerWalk').addClass('boyOriginal');
		},
		setFlowerWalk:function(){
			$boy.addClass('slowFlowerWalk');
		},
		rotate:function(callback){
			restoreWalk();
            $boy.removeClass('slowWalk slowFlowerWalk').addClass('boyOriginal');
			$boy.addClass('boy-rotate');
            // 监听转身完毕
            if (callback) {
                $boy.on(animationEnd, function() {
                   callback();
                   $(this).off();
                })
            }	
		}
		
	}
    /*$("button:first").click(function(){
		$boy.addClass('slowWalk').transition({
		'left':$("#content").width() + 'px',
		}, 10000);
	});
	//暂停
	$("button:last").click(function() {
		var left = $boy.css('left');
		$boy.css('left',left);
		//$boy.addClass('pauseWalk');
	});*/
    // ==========================
    //     增加精灵动画
    // ==========================
    //动作监听，点击则开始走动	
	
	
}