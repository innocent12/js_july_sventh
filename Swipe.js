//���������Ļ������ã�������,����ҳ���Ч��
function Swipe(container){
	//var container = $("#content");
	var swipe = {};//����һ����������,����¼�����¼��Ŀ�ʼ
//��ȡ�����ĵ�һ���ӽڵ�,Ҳ����<ul>��ǩ
	var element = container.find(":first");
//�ӵ�һ���ӽڵ����ҵ����б�ǩ<li>
	var slides = element.find(">");
//��ȡ�����ĳߴ�
	var width = container.width();
	var height = container.height();
//����<ul>��ǩ����ʽ�����Ϊ<li>��ǩ������*ÿ��<li>��ǩ�Ŀ��
	element.css({
		width: (slides.length * width) + 'px',
		height: height + 'px'//�߶Ȳ���
	
	});

	$.each(slides, function(index){
		var slide = slides.eq(index);//����ÿ��<li>��ǩ
		slide.css({//����ÿ��<li>��ǩ�Ŀ�ȵ��������Ŀ��
			width: width + 'px',
			height: height + 'px'
		});
	});
	//����ҳ����ƶ���ʽ
	swipe.scrollTo = function(x,speed){
		//ִ���ƶ���element�˴�Ϊ<ul>��ǩҲ�������ű���ͼ���������ű���ͼ���ƶ���ʽ
			element.css({
			'transition-timing-function': 'linear',/*transition-timing-function: linear|ease|ease-in|ease-out|ease-in-out|cubic-
			bezier(n,n,n,n);*/
			'transition-duration': speed+'ms',//�����ܵ��ƶ�ʱ��Ϊ5��
			'transform': 'translate3d(-' + x + 'px,0px,0px)'
		});
		return this;	
	};
		return swipe;	//�����������Ķ���
}