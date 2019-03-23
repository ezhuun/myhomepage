const CURRENTURL = location.href;
const CURRENTPAGE = CURRENTURL.substring(CURRENTURL.lastIndexOf("/")+1, CURRENTURL.length);

window.onload = function(){
	
	//left menu toggle when page load
	if(sessionStorage){
		if(sessionStorage.getItem("toggleOn") == 1){
			toggleLeftMenu();
		}
	}
	
	//main image change
	if(CURRENTPAGE.indexOf("index") >= 0 || CURRENTPAGE === ""){
		mainImageChange();
	}else{
		if(document.getElementById("right_header")){
			document.getElementById("right_header").style.color="#2f2f2f";
		}
	}

	//menu sub-menu toggle
	var MenuTopName = document.querySelectorAll(".left_menu .toggleTop>a");
	NodeList.prototype.forEach = Array.prototype.forEach;
	MenuTopName.forEach(function(a){
		if(a.addEventListener){
			a.addEventListener('click', function(){
				updownToggleMenu(this);
			});
		}else if(a.attachEvent){
			a.attachEvent('click', function(event) {
				updownToggleMenu(this);
			});
		}
	});
}

function updownToggleMenu(t){
	if(t.nextSibling != null){
		var obj = t.nextSibling.nextSibling;
		var obj_child = "";
		var tempObj = t.childNodes;
		for(var i=0; i<tempObj.length; i++){
			if(tempObj[i].className != undefined){
				if(tempObj[i].className.indexOf("glyphicon-chevron-down") >= 0){
					obj_child = tempObj[i];
				}
			}
		}
		if(obj){
			if(obj.classList.contains("height_zero")){
				//open
				obj.classList.remove("height_zero");
				if(obj_child != ""){
					obj_child.classList.remove("rote");
				}
			}else{
				//close
				obj.classList.add("height_zero");
				if(obj_child != ""){
					obj_child.classList.add("rote");
				}
			}
		}
	}
}

//alert..
function myalert(strContent, strHeader){
	var obj = document.getElementById("myalert");
	if(obj){
		if(typeof strHeader != "undefined"){
			if(strHeader.trim().length > 0 ){
				obj.querySelector(".modal-title").innerHTML = strHeader;
			}
		}
		if(typeof strContent != "undefined"){
			if(strContent.trim().length > 0 ){
				obj.querySelector(".modal-body").innerHTML = "<p>"+strContent+"</p>";
			}
		}
		obj.style.display="block";
	}
}

//left menu toggle
function toggleLeftMenu(){
	if(document.getElementById("wrap-left")){
		var obj = document.getElementById("wrap-left");
		var obj2 = document.getElementById("wrap-rigth");
		var obj3 = document.getElementById("markup");
		var obj4 = document.getElementById("right_header");
		var obj5 = document.getElementById("toggleMenu");
		
		if(obj.classList.contains("out")){
			//open
			obj.classList.remove("out");
			obj2.classList.remove("wexp");
			obj3.classList.add("mark");
			obj3.onclick=function(){toggleLeftMenu();};
			obj4.classList.remove("wexp");
			obj5.classList.remove("glyphicon-th-list");
			obj5.classList.add("glyphicon-remove");
			if(sessionStorage){
				sessionStorage.setItem("toggleOn", 1);
			}
		}else{
			//close
			obj.classList.add("out");
			obj2.classList.add("wexp");
			obj3.classList.remove("mark");
			obj3.onclick="";
			obj4.classList.add("wexp");
			obj5.classList.add("glyphicon-th-list");
			obj5.classList.remove("glyphicon-remove");
			if(sessionStorage){
				sessionStorage.setItem("toggleOn", 0);
			}
		}
	}
}


//debounce function(closer function)
function debounce(fn, delay){
	var timer = null;
	return function(){
		clearTimeout(timer);
		timer = setTimeout(function(){
			fn.apply();
		}, delay);
	};
}

function funCall(fn, param){
	return (function(){
		fn.call(null, param);
	});
}

function headerScrolling(){
	var obj = document.getElementById("right_header");
	if(obj){
		var scrollpos = window.scrollY || window.pageYOffset;
		if(scrollpos == 0){
			obj.style.backgroundColor="inherit";
			if(CURRENTPAGE.indexOf("index") >= 0 || CURRENTPAGE === ""){
				obj.style.color="#BAC2C4";
			}else{
				obj.style.color="#2f2f2f";
			}
			obj.style.padding="30px 15px";
			obj.style.boxShadow="none";
		}else{
			obj.style.backgroundColor="#ffffff";
			obj.style.color="#212121";
			obj.style.padding="10px 15px";
			obj.style.boxShadow="0 3px 10px 0 #999";
		}
	}
}

function myalertClose(){
	if(event.keyCode == "27"){
		if(document.getElementById("myalert")){
			if(document.getElementById("myalert").style.display=="block"){
				document.getElementById('myalert').style.display='none';
			}
		}
	}
}

function markupClose(){
	if(event.keyCode == "27"){
		if(document.getElementById("markup").classList.contains("mark")){
			if(!document.getElementById("wrap-left").classList.contains("out")){
				if(document.getElementById("myalert").style.display=="none"){
					toggleLeftMenu();
				}
			}
		}
	}
}


if(window.addEventListener){
	//alert.. Esc key event
	window.addEventListener('keyup', funCall(myalertClose));
	//markup Esc key event..
	document.addEventListener('keyup', funCall(markupClose));
	//header scrolling
	document.addEventListener('scroll', debounce(headerScrolling, 10));
}else if(window.attachEvent){
	//alert.. Esc key event
	window.attachEvent('keyup', funCall(myalertClose));
	//markup Esc key event..
	document.attachEvent('keyup', funCall(markupClose));
	//header scrolling
	document.attachEvent('scroll', debounce(headerScrolling, 10));
}