var Errata = function(){
	this.HOST = "http://10.66.141.235:8080/dataservice/api/sys/mobile/errata/advisory/";
	this.SUMMARY_API = this.HOST + "summary";
	this.QUERY_API = this.HOST + "list";
	this.DETAIL_API = this.HOST + "getadv";
	this.userName = "";
	this.total = 0;
	this.home_page = $('#home_page');
	this.list_page = $('#list_page');
	this.chart_page = $('#chart_page');
	this.my_page = $('#my_page');
	this.detail_page = $('#detail_page');
	
	this.homeinit = false;
	this.listinit = false;
	this.chartinit = false;
	this.myinit = false;
	
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
			return $("<tr><td><a href='#' class='advlistitem' name='"+this.id+"' id='"+id_pre+this.id+"'>"+this.fulladvisory+"<br><span>"+this.synopsis+"</span></a></td>"
   		 			+"<td>RHEL</td>"+"<td>RHEL-x.y.z</td>"
   		 			+"<td><span>"+this.status+"</span></td>"
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
			$('#header').html(this.fulladvisory+'<i class="fa fa-chevron-left back"></i>');
		}
};

Errata.prototype.Errata = Errata;

Errata.prototype.home = function(){
	if(! this.homeinit){
		this.summary();
		this.query($('#home_adv_list'));
		this.homeinit = true;
	}
	
};

Errata.prototype.list = function(){
	if(! this.listinit){
		this.query($('#list_adv_list'));
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

Errata.prototype.my = function(type){
	if(! this.myinit){
		this.myinit = true;
	}
};

Errata.prototype.summary = function(){
	
	$.ajax({
		url : this.SUMMARY_API,
		dataType : "jsonp",
		success : function(data){
			$('#NEW_FILES').text(data.NEW_FILES);
			$('#QE').text(data.QE);
			$('#REL_PREP').text(data.REL_PREP);
			$('#PUSH_READY').text(data.PUSH_READY);
			this.total = Number(data.NEW_FILES) + Number(data.QE) + Number(data.REL_PREP) +Number(data.PUSH_READY) ;
			$('#total').text(this.total);
		},
		error : function(xhr,status,err){
			alert(status);
		}
	});
};

Errata.prototype.query = function(container,status,page){
	var data = {status : status , page : page,userName : this.userName};
	var errata = this;
	$.ajax({
		url : this.QUERY_API,
		dataType : "jsonp",
		data : data,
		type : "POST",
		success : function(data){
			var list = data.list;
			for(var i = 0 ; i < list.length ; i++){
				var advisory = list[i];
				var id_pre = container.attr('id');
				var adv = (new Advisory(advisory)).listItem(id_pre);
			    container.append(adv);
				$('#'+id_pre+advisory.id).bind("click",function(){
					errata.detail($(this).attr("name"));
				});
			}
			
		},
		error : function(xhr,status,err){
			alert(status);
		}
	});
};

Errata.prototype.search = function(searchStr){
	
};

Errata.prototype.detail = function(id){
	this.home_page.css('display','none');
	this.chart_page.css('display','none');
	this.my_page.css('display','none');
	this.list_page.css('display','none');
	this.detail_page.css('display','block');
	
	$.ajax({
		url : this.DETAIL_API,
		data : {id : id},
		dataType : "jsonp",
		success : function(data){
			(new Advisory(data)).detailItem();
			$('.footer').fadeOut(2000);
		},
		error : function(xhr,status,err){
			alert(status);
		}
	});
};

Errata.prototype.changeQA = function(name){
	
};

Errata.prototype.pushNotification = function(){
	
};

Errata.prototype.comment = function(id,content){
	
};

Errata.prototype.init = function(type){	
	this.list_page.css('display','none');
	this.chart_page.css('display','none');
	this.my_page.css('display','none');
	
	var errata = this;
	$('#footer_home').click(function(){
		$(this).removeClass('active').addClass('active');
		$('#footer_list').removeClass('active');
		$('#footer_chart').removeClass('active');
		$('#footer_my').removeClass('active');
		errata.chart_page.css('display','none');
		errata.my_page.css('display','none');
		errata.list_page.css('display','none');
		errata.detail_page.css('display','none');
		errata.home_page.css('display','block');
		
		errata.home();
	});
	$('#footer_list').click(function(){
		$(this).addClass('active');
		$('#footer_home').removeClass('active');
		$('#footer_chart').removeClass('active');
		$('#footer_my').removeClass('active');
		errata.home_page.css('display','none');
		errata.chart_page.css('display','none');
		errata.my_page.css('display','none');
		errata.detail_page.css('display','none');
		errata.list_page.css('display','block');
		
		errata.list();
	});
	$('#footer_chart').click(function(){
		$(this).removeClass('active').addClass('active');
		$('#footer_list').removeClass('active');
		$('#footer_my').removeClass('active');
		$('#footer_home').removeClass('active');
		errata.home_page.css('display','none');
		errata.chart_page.css('display','block');
		errata.my_page.css('display','none');
		errata.detail_page.css('display','none');
		errata.list_page.css('display','none');
		
		errata.chart();
	});
	$('#footer_my').click(function(){
		$(this).removeClass('active').addClass('active');
		$('#footer_list').removeClass('active');
		$('#footer_chart').removeClass('active');
		$('#footer_home').removeClass('active');
		errata.home_page.css('display','none');
		errata.chart_page.css('display','none');
		errata.my_page.css('display','block');
		errata.list_page.css('display','none');
		errata.detail_page.css('display','none');
		
		errata.my();
	});
	
	this.home();
};
