//mainpage scrolling
document.addEventListener('scroll', debounce(mainPageScrolling, 10));
var lastScrollTop = 0;
function mainPageScrolling(){
	var obj = document.getElementById("main_page");
	var obj2 = document.getElementById("right_header");
	var obj3 = document.getElementById("main_banner");
	var y = (obj.offsetTop-window.scrollY)-(obj2.offsetHeight+30);
	var _y = ((obj3.offsetTop + obj3.offsetHeight)-window.scrollY)-(obj2.offsetHeight+30);
	if (window.scrollY > lastScrollTop){
		if(y<=0 && _y>=0){
			obj.style.top="-"+(_y)+"px";
		}
	}else{
		if(y>=0 && _y<=40){
			obj.style.top=(_y*-1)+"px";
		}
	}
	lastScrollTop = window.scrollY;
}

//main images change
function mainImageChange(){
	var ranNum = Math.ceil(Math.random()*10);
	document.getElementById("mainimg").style.background="url(./images/"+ranNum+".jpg) no-repeat center center";
	document.getElementById("mainimg").style.opacity="0.3";	
}