var Errata = function(){
	this.HOST = "http://10.66.141.235:8080/dataservice/api/sys/mobile/errata/advisory/";
	this.SUMMARY_API = this.HOST + "summary";
	this.QUERY_API = this.HOST + "list";
	this.DETAIL_API = this.HOST + "getadv";
	this.USER_API = this.HOST + "user";
	this.total = 0;
	this.header = $('#header');
	this.footer = $('#footer');
	this.home_page = $('#home_page');
	this.list_page = $('#list_page');
	this.chart_page = $('#chart_page');
	this.my_page = $('#my_page');
	this.detail_page = $('#detail_page');
	this.login_page = $('#login_page');
	this.my_list_page = $('#my_list_page');
	this.back_page = new Array();
	this.loading = $("#loading");
	this.loginname = $("#u_login_name");
	this.realname = $("#u_real_name");
	
	this.homeinit = false;
	this.listinit = false;
	this.chartinit = false;
	this.myinit = false;
	
	this.user;
	this.loginState = true;
	
	$.support.cors = true;
	this.init();
};

function Advisory(data){
		this.id = data.id;
		this.fulladvisory = data.fulladvisory;
		this.synopsis = data.synopsis;
		this.status = data.status;
		this.errata_type = data.errata_type;
		this.created_at = data.created_at;
		this.reporter = data.reporter;
		this.reporter_id = data.reporter_id;
		this.assigner = data.assigner;
		this.assigner_id = data.assigned_to_id;
		this.product = data.product;
		this.release_date = data.release_date;
		this.severity = data.severity;
		this.priority = data.priority;
		
		this.listItem = function(id_pre){
			return $("<tr><td name='"+this.id+"' id='"+id_pre+this.id+"' ><a class='advlistitem' >"+this.fulladvisory+"<br><span>"+this.synopsis+"</span></a></td>"
   		 			+"<td>RHEL</td>"+"<td>RHEL-x.y.z</td>"
   		 			+"<td><span class='"+this.status+"'>"+this.status+"</span></td>"
    				+"</tr>");
		};
		this.detailItem = function(){
			$('#d_Product').text(this.product);
			$('#d_Created').text(this.created_at);
			$('#d_Status').text(this.status);
			$('#d_Priority').text(this.priority);
			$('#d_Sererity').text(this.severity);
			$('#d_Type').text(this.errata_type);
			$('#d_Reporter').text(this.reporter);
			$('#d_QAowner').text(this.assigner);
			$('#detail_header').text(this.fulladvisory);
		}
};

function User(data){
	this.id = data.id;
	this.loginname = data.loginname;
	this.realname = data.realname;
	this.role = data.role;
}

Errata.prototype.Errata = Errata;

Errata.prototype.init = function(type){	
	this.initDB();
	this.hideAllPage();
	this.back_page.push(this.home_page);
	$.mobile.loading( "show", {text: '',textVisible: '',theme: '',textonly: '',html: ''});
	$('#changeqeowner').toggle(function() {$('#qeowner').fadeIn();},function(){$('#qeowner').fadeOut();});

	// this.removeUser();
	
	var errata = this;
		
	/* init tab */	
	$('#footer_home').bind("click",function(){
		errata.tabNavigate($(this),errata.home_page);
		errata.home();
	});
	$('#footer_list').bind("click",function(){
		errata.tabNavigate($(this),errata.list_page);
		errata.list();
	});
	$('#footer_chart').bind("click",function(){
		errata.tabNavigate($(this),errata.chart_page);
		errata.chart();
	});
	$('#footer_my').bind("click",function(){
		errata.tabNavigate($(this),errata.my_page);
		errata.my();
	});
	
	$('.queryme').bind("click",function(){
		errata.queryme($(this).attr('id'));
	});
	
	this.checkLogin();
	navigator.splashscreen.hide();
};

Errata.prototype.initLogin = function(){
	var errata = this;
	if(this.loginState){
		this.getUser();
		this.home();
	}else{
		this.footer.hide();
		this.login_page.show();
		$('#signin').click(function(){
			errata.login($('#loginID').val());
		});
	}
};

Errata.prototype.login = function(name){
	var errata = this;
	$.ajax({
		url : this.USER_API,
		data : {username : name},
		dataType : "jsonp",
		success : function(data){
			if(data.id != 'undefined' && data.id != null){
				var user = new User(data);
				errata.saveUser(user);
				errata.login_page.hide();
				errata.footer.show();
				errata.home();
			}else{
				errata.alert('username or password error','Errata Alert','ok');
			}
			
		},
		error : function(xhr,status,err){
			alert(status);
		}
	});
};

Errata.prototype.home = function(){
	if(! this.homeinit){
		this.home_page.show();
		this.summary();
		this.homequery({});
		this.homeinit = true;
	}
};

Errata.prototype.list = function(){
	if(! this.listinit){
		this.listquery({});
		this.listinit = true;
	}
};

Errata.prototype.chart = function(type){
	if(! this.chartinit){
	    var client = new DsClient({reportdiv:'container'});
	    client.callAPI('http://10.66.141.235:8080/dataservice/api/errata/trend?product=Red Hat Enterprise Linux&status=[NEW_FILES,QE,REL_PREP,PUSH_READY]&date=[interval:monthly]&is_brew=ALL',
		{"title":"Red Hat Enterprise Linux","subtitle":"Advistories Monthly Report"});
		this.chartinit = true;
	}
};

Errata.prototype.my = function(){
	if(! this.myinit){
		this.loginname.text(this.user.loginname);
		this.realname.html(this.user.realname+"<br>"+this.user.role);
		this.myinit = true;
	}
};

Errata.prototype.summary = function(){
	var errata = this;
	$.ajax({
		url : this.SUMMARY_API,
		dataType : "jsonp",
		success : function(data){
			$('#NEW_FILES').text(data.NEW_FILES).click(function(){
				var status = $(this).attr('id');
				errata.tabNavigate($('#footer_list'),errata.list_page);
				$('#list_adv_list').html('');
				errata.listquery({status : status});
			});
			$('#QE').text(data.QE).click(function(){
				var status = $(this).attr('id');
				errata.tabNavigate($('#footer_list'),errata.list_page);
				$('#list_adv_list').html('');
				errata.listquery({status : status});
			});
			$('#REL_PREP').text(data.REL_PREP).click(function(){
				var status = $(this).attr('id');
				errata.tabNavigate($('#footer_list'),errata.list_page);
				$('#list_adv_list').html('');
				errata.listquery({status : status});
			});
			$('#PUSH_READY').text(data.PUSH_READY).click(function(){
				var status = $(this).attr('id');
				errata.tabNavigate($('#footer_list'),errata.list_page);
				$('#list_adv_list').html('');
				errata.listquery({status : status});
			});
			this.total = Number(data.NEW_FILES) + Number(data.QE) + Number(data.REL_PREP) +Number(data.PUSH_READY) ;
			$('#total').text(this.total);
		},
		error : function(xhr,status,err){
			alert(status);
		}
	});
};

Errata.prototype.homequery = function(data){
	var errata = this;
	$.ajax({
		url : this.QUERY_API,
		dataType : "jsonp",
		data : data,
		type : "POST",
		success : function(data){
			errata.tableView($('#home_adv_list'),data.list);		
		}
	});
};

Errata.prototype.listquery = function(data){
	var errata = this;
	$.ajax({
		url : this.QUERY_API,
		dataType : "jsonp",
		data : data,
		type : "POST",
		success : function(data){
			errata.tableView($('#list_adv_list'),data.list);		
		}
	});
};

Errata.prototype.myquery = function(data){
	var errata = this;
	$.ajax({
		url : this.QUERY_API,
		dataType : "jsonp",
		data : data,
		type : "POST",
		success : function(data){
			$('#my_adv_list').html('');
			errata.tableView($('#my_adv_list'),data.list);		
		}
	});
};

Errata.prototype.tableView = function(container,list){
	var errata = this;
	for(var i = 0 ; i < list.length ; i++){
		var advisory = list[i];
		var id_pre = container.attr('id');
		var adv = (new Advisory(advisory)).listItem(id_pre);
	    container.append(adv);
		$('#'+id_pre+advisory.id).bind("click",function(){
			errata.detail($(this).attr("name"));
		});
	}
};

Errata.prototype.search = function(searchStr){
	
};

Errata.prototype.detail = function(id){
	this.back_page.push(this.detail_page);
	var errata = this;
	this.hideFooter();
	this.showPage(this.detail_page,'slide');
	this.loading.show();
	$("#detail_back").unbind("click").click(function(){
		errata.turnBack(errata.detail_page);
	});
	$.ajax({
		url : this.DETAIL_API,
		data : {id : id},
		dataType : "jsonp",
		success : function(data){
			(new Advisory(data)).detailItem();
			errata.loading.hide();
		},
		error : function(xhr,status,err){
			alert(status);
		}
	});
};

Errata.prototype.queryme = function(type){
	this.back_page.push(this.my_list_page);
	var errata = this;
	var header_str = "";
	switch(type){
		case 'reporter' :  header_str = 'Reporter is me';break;
		case 'owner' :  header_str = 'QE Owner is me';break;
		case 'approver' :  header_str = 'Need My Approval';break;
	}
	$('#my_header').text(header_str);
	this.showPage(this.my_list_page,'slide');
	this.hideFooter();
	$("#my_list_back").unbind('click').click(function(){
		errata.turnBack(errata.my_list_page);
	});
	var userName = this.user.loginname;
	var data = { page : 0, userName : userName, status : '', type : type};
	this.myquery(data);
};

Errata.prototype.changeQA = function(name){
	
};

Errata.prototype.pushNotification = function(){
	
};

Errata.prototype.comment = function(id,content){
	
};

/**
* SQLite operation
*/
Errata.prototype.saveUser = function(user){
	var db = this.db();
	var errata = this;
	db.transaction(function(tx) {
      tx.executeSql("INSERT INTO t_user (userId, loginname, realname,role) VALUES (?,?,?,?)", [user.id,user.loginname,user.realname,user.role],
		function(tx, res) {
			errata.user = user;
      });
	});
};

Errata.prototype.removeUser = function(user){
	var db = this.db();
	var errata = this;
	db.transaction(function(tx) {
		tx.executeSql("delete from t_user");
	});
};

Errata.prototype.getUser = function(){
	var db = this.db();
	var data = {};
	var errata = this;
	if(errata.user == 'undefined' || errata.user == null){
		db.transaction(function(tx) {
	      tx.executeSql("select userId as id,loginname,realname,role from t_user;", [], function(tx, res) {
			 var count = res.rows.length;
			 if(count ==1){
				 data.id = res.rows.item(0).id;
				 data.loginname = res.rows.item(0).loginname;
				 data.realname = res.rows.item(0).realname;
				 data.role = res.rows.item(0).role;
				 errata.user = new User(data);
			 }
	      });
		});
	}
};

Errata.prototype.checkLogin = function(){
	var db = this.db();
	var errata = this;
	db.transaction(function(tx) {
      tx.executeSql("select count(id) as cnt from t_user;", [], function(tx, res) {
		  if(res.rows.item(0).cnt == 1){
			  errata.loginState = true;
			  errata.initLogin();
		  }else{
		  	errata.loginState = false;
			errata.initLogin();
		  }
      });
	});
};

Errata.prototype.initDB = function(){
	var db = this.db();
	db.transaction(function(tx) {
    	tx.executeSql('CREATE TABLE IF NOT EXISTS t_user (id integer primary key,userId integer , loginname text, realname text,role text)');
 	});
};

Errata.prototype.db = function(){
	var db = window.sqlitePlugin.openDatabase({name: "my.db", location: 1});
	return db;
};

Errata.prototype.dropTable = function(){
	var db = window.sqlitePlugin.openDatabase({name: "my.db", location: 1});
	db.transaction(function(tx) {
    	tx.executeSql('DROP TABLE IF EXISTS t_user');
 	});
};
/* SQLite operation end*/

Errata.prototype.showPage = function(errata_page,type){
	this.hideAllPage();
	if(type == 'slide'){
		$('.header').css('position','static');
		var page_div = errata_page.find("div[class='header']").next();
		page_div.css('margin-top', '0px');
		errata_page.show('slide',{direction : 'right'},300,function(){
			$('.header').css('position','fixed');
			page_div.css('margin-top', '64px');
		}); 
	}else{
		errata_page.show();
	}
};

Errata.prototype.hideAllPage = function(){
	this.login_page.hide();
	this.home_page.hide();
	this.list_page.hide();
	this.chart_page.hide();
	this.my_page.hide();
	this.detail_page.hide();
	this.my_list_page.hide();
};

Errata.prototype.hideFooter = function(){
	this.footer.fadeOut(100);
};

Errata.prototype.showFooter = function(){
	this.footer.fadeIn(100);
};

Errata.prototype.activeFooter = function(footer){
	$('#footer_home').removeClass('active');
	$('#footer_list').removeClass('active');
	$('#footer_chart').removeClass('active');
	$('#footer_my').removeClass('active');
	footer.addClass('active');
};

Errata.prototype.tabNavigate = function(tab,page){
	this.activeFooter(tab);
	this.showPage(page);
	this.back_page = [];
	this.back_page.push(page);
};

Errata.prototype.getBackPage = function(){	
	var len = this.back_page.length;
	var page ;
	if(len == 1){
		page = this.back_page[0];
	}else if(len == 0){
		page = this.home_page;
	}else{
		this.back_page.pop();
		page = this.back_page[this.back_page.length-1];
	}
	
	return page;
};

Errata.prototype.turnBack = function(page){
	var errata = this;
	$('.header').css('position','static');
	var page_div = page.find("div[class='header']").next();
	var backpage = this.getBackPage();
	page_div.css('margin-top', '0px');
	page.hide('slide',{direction : 'right'},200,function(){$('.header').css('position','fixed');page_div.css('margin-top', '64px');backpage.show();});
	this.showFooter();
};

Errata.prototype.pushRegister = function(){
	var username = this.user.username;
	var pushConfig = {
	      pushServerURL: "https://aerogear-pntdev.rhcloud.com/ag-push/",
		  alias : username,
	      ios: { 
	        variantID: "46734504-529e-47b1-a9d8-93ca5b68d3c1",
	        variantSecret: "27ecc4a7-b262-44e0-9943-ab032479e59d"
	      }
	};
	push.register(app.onNotification, successHandler, errorHandler, pushConfig);
};

Errata.prototype.alert = function(message,title,buttonName){
	navigator.notification.alert(
	    message,  // message
	    function(){},           // callback
	    title,                 // title
	    buttonName                  // buttonName
	);
}
