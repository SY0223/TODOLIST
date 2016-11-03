var text=document.querySelector('.nav-list input[type=text]');
var createBtn=document.querySelector('.nav-list input[type=button]');
var nowList=document.querySelector('.now .list');
var nowNum=document.querySelector('.now .num');

var comList=document.querySelector('.com .list');
var comNum=document.querySelector('.com .num');
createBtn.onclick=function(){
	if(text.value==''){
		alert('请输入待办事项内容!');
		return;
	}
	var data=getData();
	data.push({title:text.value,done:false});
	text.value="";
	saveData(data);
	reWrite()
}

function getData(){
	//  data =  null ||  "[{},{}]"
	var data=JSON.parse(localStorage.getItem('todo'));	
	return data||[];
}

function changeState(id,state){
	var data=getData();
	data[id].done=state;
	saveData(data);
	reWrite();
}

function changeText(id,txt){
	var data=getData();
	if(data[id].title==txt){
		return;
	}
	data[id].title=txt;
	saveData(data);
	reWrite();
}

function delData(id){
	var data=getData();
	data.splice(id,1);
	saveData(data);
	reWrite();
}

function saveData(data){
	//  data =  null ||  "[{},{}]"
	localStorage.setItem('todo',JSON.stringify(data));
}

window.onload=reWrite;
function reWrite(){
	var nStr="",cStr="",nNum=0,cNum=0;
	var data=getData();
	data.forEach(function(o,i){
		if(o.done==false){
			nStr+='<li id='+i+'><input type="checkbox" onclick=changeState('+i+',true)><div class="cont" contenteditable=true onblur=changeText('+i+',this.innerHTML)>'+o.title+'</div><input type="button" value="——" onclick=delData('+i+')></li>';
			nNum++;
		}else{
			cStr+='<li id='+i+'><input type="checkbox" checked  onclick=changeState('+i+',false)><div class="cont" contenteditable=true onblur=changeText('+i+',this.innerHTML)>'+o.title+'</div><input type="button" value="——" onclick=delData('+i+')></li>';
			cNum++;
		}
	});
	nowList.innerHTML=nStr;
	comList.innerHTML=cStr;
	nowNum.innerHTML=nNum;
	comNum.innerHTML=cNum;
}

document.querySelector('.delll').onclick=function(){
	localStorage.clear();
	reWrite();
}