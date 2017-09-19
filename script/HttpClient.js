var  SRC='http://tc.xbzdxm.com';
//tc.xbzdxm.com
var BASE_URL = SRC;

//http://edu029.net/tongchuan
var XMLIST=BASE_URL+'/a/tongchuan/qqcbk/qqchlist.json';//项目列表
var LOGINRUL = BASE_URL + '/a/login';//登录接口
var XWZX = BASE_URL + '/a/tongchuan/tzgg/newslist.json';//新闻中心接口
var TZGG = BASE_URL + '/a/tongchuan/tzgg/tzgglist.json';//通知公告接口
var ZCFG = BASE_URL + '/a/tongchuan/tzgg/zcfglist.json';//政策法规接口
var GRXX=BASE_URL +'/a/sys/user/mobilegrxx';//个人信息接口
//前期项目库
var CHBZSort=BASE_URL+'/a/tongchuan/qqcbk/qqchlist3.json';
var QQSZF=BASE_URL+'/a/tongchuan/qqcbk/ldbzlist.json';//市政府领导包抓
var QQPPP=BASE_URL+'/a/tongchuan/qqcbk/newppplist.json';//ppp
var QQSZFdetile=BASE_URL+'/a/tongchuan/qqcbk/detail.json';//详情
//在建项目
var ZJSJZD=BASE_URL+'/a/tongchuan/zjzdk/sjzdklist.json';//市级重点建设项目库
var ZJSJLDBZ=BASE_URL+'/a/tongchuan/zjzdk/ldbzlist.json';//市级领导包抓项目库
var ZJSSLT=BASE_URL+'/a/tongchuan/zjzdk/newsslthlist.json';//山水林田湖项目库

var ZJdetile=BASE_URL+'/a/tongchuan/qqcbk/detail.json';//详情


var QQYDLB=BASE_URL+"/a/tongchuan/ydjzgl/qqcbklist.json";
var QQTB=BASE_URL+"/a/tongchuan/ydjzgl/mobileqqcbkYdForm";


var JsonData = new Object();
var sessionid;
function httpClient(url, param, callback) {
	sessionid = getUser().sessionid;
	
	//alert(getUser().password+""+getUser().loginName);
	//  sessionid = localStorage.getItem("sessionid");//获取b的值
	
	
	api.ajax({
		url : XMLIST+";JSESSIONID=" + sessionid,
		method : 'POST',
		dataType : 'json',
		headers : {
			"Content-Type" : "application/x-www-form-urlencoded",
			"User-Agent" : "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
		},
		data : {
			values : param
		}

	}, function(ret, err) {
		if (ret) {
			console.log('未失效！' + url + ";JSESSIONID=" + sessionid);
			api.ajax({
				url : url + ";JSESSIONID=" + sessionid,
				method : 'POST',
				dataType : 'json',
				headers : {
					"Content-Type" : "application/x-www-form-urlencoded",
					"User-Agent" : "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
				},
				data : {
					values : param
				}

			}, function(ret, err) {
				if (ret) {
					if ( typeof callback == "function") {
						callback(ret);
					}
				} else {
					console.log("未失效报错！");
				}
			});
		} else {
			console.log("session已失效！");
			api.ajax({
				url : LOGINRUL,
				method : 'POST',
				dataType : 'json',
				headers : {
					"User-Agent" : "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
				},
				data : {
					values : {
						sessionid : "",
						password : getUser().password,
						username : getUser().loginName,
						mobileLogin : 'true',
						rememberMe : 'true'
					}
				}
			}, function(result, err) {
				if (result) {
					console.log('登录成功！');
					console.log(JSON.stringify(result));
					if(typeof (result.sessionid) != "undefined" || result.sessionid!="")
					setUser(result.id, result.loginName, getUser().password, result.name, result.sessionid);
					//login
					console.log('登录成功希望未失效！' + result.sessionid);
					api.ajax({
						url : url + ";JSESSIONID=" + result.sessionid,
						method : 'POST',
						dataType : 'json',
						headers : {
							"Content-Type" : "application/x-www-form-urlencoded",
							"User-Agent" : "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
						},
						data : {
							values : param
						}

					}, function(ret, err) {
					console.log(JSON.stringify(err));
						if (ret) {
							if ( typeof callback == "function") {
								callback(ret);
							}
						} else {
							console.log("未失效报错！");
						}
					});

					//openWin('./my_win');
				} else {
//					alert("session失效再次登录报错！");
				}
			});
			//denglu
		}
	});

}

function pulldown(callback) {
	api.setRefreshHeaderInfo({
		visible : true,
		loadingImg : 'widget://image/refresh.png',
		bgColor : '#ccc',
		textColor : '#fff',
		textDown : '下拉刷新...',
		textUp : '松开刷新...',
		showTime : true
	}, function(ret, err) {
		callback();
	});
}

function stoppull() {
	api.refreshHeaderLoadDone();
}

function initpull() {
	api.refreshHeaderLoading();
}

function pullupper(callback) {
	api.addEventListener({
		name : 'scrolltobottom',
		extra : {
			threshold : 300
		}
	}, function(ret, err) {
		callback();
	});
}
