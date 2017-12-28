
	var snowflakeURl = [
        'http://img.mukewang.com/55adde120001d34e00410041.png',
        'http://img.mukewang.com/55adde2a0001a91d00410041.png',
        'http://img.mukewang.com/55adde5500013b2500400041.png',
        'http://img.mukewang.com/55adde62000161c100410041.png',
        'http://img.mukewang.com/55adde7f0001433000410041.png',
        'http://img.mukewang.com/55addee7000117b500400041.png'
    ]


    /*Ʈѩ�� */
    function snowflake() {
        /* ѩ������*/
        var $flakeContainer = $('#snowflake');

        /* �������ͼ*/
        function getImagesName() {
            return snowflakeURl[[Math.floor(Math.random() * 6)]];
        }
        /* ����һ��ѩ��Ԫ��*/
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
        /* ��ʼƮ��*/
        setInterval(function() {
            /* �˶��Ĺ켣*/
            var startPositionLeft = Math.random() * visualWidth - 100,
                startOpacity    = 1,
                endPositionTop  = visualHeight - 40,
                endPositionLeft = startPositionLeft - 100 + Math.random() * 500,
                duration        = visualHeight * 10 + Math.random() * 5000;

            /* ���͸���ȣ���С��0.5*/
            var randomStart = Math.random();
            randomStart = randomStart < 0.5 ? startOpacity : randomStart;

            /* ����һ��ѩ��*/
            var $flake = createSnowBox();

            /* ������λ��*/
            $flake.css({
                left: startPositionLeft,
                opacity : randomStart
            });

            /* ���뵽����*/
            $flakeContainer.append($flake);

            /* ��ʼִ�ж���*/
            $flake.transition({
                top: endPositionTop,
                left: endPositionLeft,
                opacity: 0.7
            }, duration, 'ease-out', function() {
                $(this).remove() /*������ɾ��*/
            });
            
        }, 200);
    }
	
	/*һ��ҳ������Ľӿں����������жԴ���ı��������Ĵ���ʽ*/

	/*����*/
	var girl = {
        elem: $('.girl'),
        getHeight: function() {
            return this.elem.height();
        },
        /* ת����*/
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
	/*����СŮ����λ��*/
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
	
	/*��������*/
	var audioConfig = {
        enable: true, /* �Ƿ�������*/
        playURl: 'http://www.imooc.com/upload/media/happy.wav', /* �������ŵ�ַ*/
        cycleURL: 'http://www.imooc.com/upload/media/circulation.wav' /* ����ѭ�����ŵ�ַ*/
    };

    /*�������� */
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

	/*�ڶ���ͼ�Ķ���*/
	/*function startRun(){
		boy.walkTo(2000,0.5)
		.then(function(){
			boy.stopWalk();
		}).then(function(){
			return openDoor();
		}).then(function(){
			lamp.bright();
		}).then(function(){//���̵�
			return boy.toShop(2000);
		}).then(function(){//ȡ��
			return boy.takeFlower();
		}).then(function(){//����
			bird.fly();
		}).then(function(){//���̵�
			return boy.outShop(2000);
		}).then(function(){
			return closeDoor();
		}).then(function(){
			lamp.dark();
		});
     }*/
	
	/*$("button:first").click(function() {
    
        // ��һ����·���ŵױ�left,top
        boy.walkTo(2000, 0.15)
            .then(function() {
                // �ڶ�����·������left,top
                return boy.walkTo(1500, 0.3, 0.368);//�����ڶ����߶���λ��
            })
            .then(function() {
                // ʵ����·�ı���
                var proportionX = (girl.getOffset().left - boy.getWidth() + girl.getWidth() / 5) / visualWidth;
                // ����������ֱ�ߵ�СŮ����ǰ
                return boy.walkTo(1500,proportionX);
            }).then(function() {
                // ͼƬ��ԭԭ��ֹͣ״̬
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
                    /* ��һ����·���*/
                    /* ��ʼҳ�����*/
                    /*boy.setColor('red')/*�˴�����ƴд����*/
                    scrollTo(5000,1);
                }).then(function() {
                    /*�ڶ�����·*/
                    return boy.walkTo(5000, 0.5);
                }).then(function(){
					boy.stopWalk();
				}).then(function(){
					return openDoor();
				}).then(function(){
					lamp.bright();
				}).then(function(){/*���̵�*/
					return boy.toShop(2000);
				}).then(function(){/*ȡ��*/
					return boy.takeFlower();
				}).then(function(){/*����*/
					bird.fly();
				}).then(function(){/*���̵�*/
					return boy.outShop(2000);
				}).then(function(){
					boy.stopWalk();/*ֹͣ�߶�*/
				}).then(function(){
					closeDoor();
				}).then(function(){
					return lamp.dark();
				}).then(function() {
					boy.walkTo(5000,0.15);/*�����߶����������ͼ*/
				}).then(function() {
					return scrollTo(5000,2);/*ҳ���������ͼ����*/
				}).then(function(){
					return boy.walkTo(1500, 0.3, 0.368);/*����*/
				}).then(function(){
					var proportionX = (girl.getOffset().left - boy.getWidth() + girl.getWidth() / 5) / visualWidth;
                /*����������ֱ�ߵ�СŮ����ǰ*/
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
	/*����*/
	/*$("button:last").click(function(){
		closeDoor().then(function(){
			lamp.dark();
		});*/
	});
