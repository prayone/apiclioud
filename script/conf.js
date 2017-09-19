function closeWin() {
	api.closeWin({
	});
}

function call(tel){
api.call({
    type: 'tel_prompt',
    number: tel
});
}

function openWin(url, param) {
	api.openWin({
		name : url,
		url : url + '.html',
		animation:{type:"reveal",subType:"from_right",duration:300},
		pageParam : param
	});
}

function openFrame(url,y,param) {
	api.openFrame({
		name : url,
		url : url+'.html',
		rect : {
			x : 0,
			y : y
		},
		pageParam : param
	});
}

function ts(a) {
	api.toast({
		msg : a,
		duration : 2000,
		location : 'bottom'
	});
}

function isundefined(a) {
	if ( typeof a == "undefined")
		document.write("");
	else
		document.write(a);
}

var user = new Object();
function setUser(id, loginName, password, name, sessionid) {
	user = {};
	user.id = id;
	user.loginName = loginName;
	user.name = name;
	user.sessionid = sessionid;
	user.password = password;
	$api.setStorage('user', user);
}

function getUser() {
	return $api.getStorage('user');
}
function setMenu(m) {
	$api.setStorage('menu', m);
}

function getMenu() {
	return $api.getStorage('menu');
}
function setM(m) {
	$api.setStorage('m', m);
}

function getM() {
	return $api.getStorage('m');
}

function getSelfMenu() {
	$("[class*='selfMenu']").each(function() {
		var id = ($(this).attr("id"));
		if ($.inArray(id, getMenu()) > 0) {
			$('#' + id).css('display', '');
		}else{
			$('#' + id).css('display', 'none');
		}
	});
}