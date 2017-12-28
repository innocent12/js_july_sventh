//设置容器的基本配置，及布局,设置页面的效果
function Swipe(container){
	//var container = $("#content");
	var swipe = {};//定义一个滑动对象,来记录滑动事件的开始
//获取容器的第一个子节点,也就是<ul>标签
	var element = container.find(":first");
//从第一个子节点中找到所有标签<li>
	var slides = element.find(">");
//获取容器的尺寸
	var width = container.width();
	var height = container.height();
//设置<ul>标签的样式，宽度为<li>标签的数量*每个<li>标签的宽度
	element.css({
		width: (slides.length * width) + 'px',
		height: height + 'px'//高度不变
	
	});

	$.each(slides, function(index){
		var slide = slides.eq(index);//遍历每个<li>标签
		slide.css({//设置每个<li>标签的宽度等于容器的宽度
			width: width + 'px',
			height: height + 'px'
		});
	});
	//监听页面的移动方式
	swipe.scrollTo = function(x,speed){
		//执行移动，element此处为<ul>标签也就是三张背景图，设置三张背景图的移动方式
			element.css({
			'transition-timing-function': 'linear',/*transition-timing-function: linear|ease|ease-in|ease-out|ease-in-out|cubic-
			bezier(n,n,n,n);*/
			'transition-duration': speed+'ms',//定义总的移动时间为5秒
			'transform': 'translate3d(-' + x + 'px,0px,0px)'
		});
		return this;	
	};
		return swipe;	//返回这个对象的动作
}