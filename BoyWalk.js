/*������*/
//�ƹ�Ķ���Ч��
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
//ҳ�������ָ��λ��
function scrollTo(time, proportionX){
		var distX = container.width() * proportionX;
		swipe.scrollTo(distX,time);
	}
	
	//�ŵ�Y��
	var bridgeY = function(){
		//var data = getValue('c_background_middle');
		var $elem = $("c_background_middle");
		return $elem.position().top;
	}();/*����֮�����̵��ò��Ҵ�ֵ*/
	
	//��ȡͼ�������
/*	var getValue = function(className){
		var $elem = $('' + className + '');//�˴���classд����calss����һ����Сʱ
		//������·��·�ߵ����꣬����top���м�·�ĸ߶�
		return {
			height: $elem.height(),
			top: $elem.position().top
		};
	};*/
	
	//СŮ��
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
	//����Ů��λ��
	girl.setOffset();
	//������ʱ����ҳ��
	//swipe.scrollTo(visualWidth * 4,0);
	//scrollTo();
	
function doorAction(left, right, time){/*�����ǵ������ǵ�����λ�ƺ���*/
		var $door = $('.door');
		var doorLeft = $('.door-left');
		var doorRight = $('.door-right');
		var defer = $.Deferred();
		var count = 2;
		var complete = function(){
			if(count == 1){//�ڶ���return defer;
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
/*С�к���·����Ϊ*/
function BoyWalk() {
	// JavaScript Document��װС�к��˶�·���Լ���ʽ
	var container = $("#content");
	var visualWidth = container.width();
	var visualHeight = container.height();


	//�õ�·��Y��
	var pathY = function() {
        //var data = getValue('.a_background_middle');
		var $elem = $(".a_background_middle");
        return $elem.position().top + $elem.height() / 2;
    }();

    var $boy = $("#boy");
    var boyHeight = $boy.height();
	var boyWidth = $boy.width();
	
	//��ȡͼ�������
	var getValue = function(className){
		var $elem = $('' + className + '');//�˴���classд����calss����һ����Сʱ
		//������·��·�ߵ����꣬����top���м�·�ĸ߶�
		return {
			height: $elem.height(),
			top: $elem.position().top
		};
	};
    // ����С�к�����ȷλ��
	
    $boy.css({
        top: pathY - boyHeight + 30
    });
	/////////////////////////////////
	//////��������///////////////////
	/////////////////////////////////
	//��ͣ��·
	function pauseWalk(){
		$boy.addClass('pauseWalk');	
	}
	//�ָ���·
	function restoreWalk() {
		$boy.removeClass('pauseWalk');	
	}
	//CSS�����仯
	function slowWalk(){
		$boy.addClass('slowWalk');	
	}
	//�����ƶ�����
	function calculateDist(direction, proportion){
		return (direction == "x"?
				visualWidth : visualHeight) * proportion;	
	}
	//��transtion�˶�
	function startRun(options, runTime){
		var dfdPlay = $.Deferred();
		//�ָ���·
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
	//���¿�ʼ��
	function walkRun(time,dist,disY){
		time = time || 3000;
		//�ŵĶ���ԭ��̤��
		slowWalk();
		//��ǰ�ƶ�
		var d1 = startRun({
						  'left':dist?dist:undefined,
						  'top': disY + 'px'
						  },time);
		return d1;
	}
	//���̵�
	function walkToShop(runTime) {
            var defer = $.Deferred();
            var doorObj = $('.door');
            // �ŵ�����
            var offsetDoor = doorObj.offset();
            var doorOffsetLeft = offsetDoor.left;
            // С����ǰ������
            var offsetBoy     = $boy.offset();
            var boyOffsetLeft = offsetBoy.left;

            // ��ǰ��Ҫ�ƶ�������
            instanceX = (doorOffsetLeft + doorObj.width() / 2) - (boyOffsetLeft + $boy.width() / 2);

            // ��ʼ��·
            var walkPlay = startRun({
                transform: 'translateX(' + instanceX + 'px),scale(0.3,0.3)',
                opacity: 0.1
            }, 2000);
            // ��·���
            walkPlay.done(function() {
                $boy.css({
                    opacity: 0
                })
                defer.resolve();
            })
            return defer;
        }
	//���̵�
	
	function walkOutShop(runTime) {
            var defer = $.Deferred();
            restoreWalk();
            //��ʼ��·
            var walkPlay = startRun({
                transform: 'translateX(' + instanceX + 'px),scale(1,1)',
                opacity: 1.0
            }, runTime);
            //��·���
            walkPlay.done(function() {
                defer.resolve();
            });
            return defer;
        }
		//���̵�ȡ��
		function takeFlower(){
			var defer = $.Deferred();
			//�����ӳٵȴ�ʱ��
			setTimeout(function(){
				$boy.addClass('slowFlowerWalk');
				defer.resolve();
			},1000);
			return defer;
		}
		
	return {
		//��ʼ��·
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
            // ����ת�����
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
	//��ͣ
	$("button:last").click(function() {
		var left = $boy.css('left');
		$boy.css('left',left);
		//$boy.addClass('pauseWalk');
	});*/
    // ==========================
    //     ���Ӿ��鶯��
    // ==========================
    //���������������ʼ�߶�	
	
	
}