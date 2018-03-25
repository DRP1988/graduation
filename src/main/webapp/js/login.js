//刷新验证码
  function refresh(){
	    document.getElementById("imgValidate").src="code.jsp?"+new Date();
  }

  $(function() {
	  
	$('#imgValidate_a').click(function () {
		refresh();
		return false;
	});
	
	//失去焦点进行查询账户
	$('#user-account').blur(function() {
		$.ajax({
			url:'userController/isuser',
			dataType:'json',
			type:'post',
			data:{
				account:$('#user-account').val().trim()
			},
			success:function(result){
				var accountParent=$('#user-account').parent();
				if(result==true){
					accountParent.removeClass('am-form-error');
					accountParent.addClass('am-form-success');
					$('#user-account').css('border-color','#5eb95e');
				}else{
					accountParent.removeClass('am-form-success');
					accountParent.addClass('am-form-error');
					$('#user-account').css('border-color','#dd514c');
				}
			}
		});
	});
	
	//登录
	$(document).keyup(function(event){
		if(event.keyCode ==13){
			login();
			 }
	});
 	$('#login_btn').click(function() {
 		login();
	}); 
 	function login() {
 		$.post("userController/login", { 
			account: $('#user-account').val().trim(),
			password: $('#user-password').val().trim(),
			randStr: $('#randStr').val().trim()
			},
			   function(data){
			     if(data=="randStrError"){
			    	 $('#randStr').css('border-color','#dd514c');
			     }else if(data=='passwordError'){
			    	 $('#user-password').parent().addClass('am-form-error');
			    	 $('#user-password').css('border-color','#dd514c');
			     }else{
			    	 if($('#remember-me').is(':checked')){
		    			var account=$('#user-account').val().trim();
		    			var password=$('#user-password').val().trim();
			 			setCookie('account',getAES(account),7);
			            setCookie('password',getAES(password),7);
			  		}
			    	 window.location.href=data;
			     }
			   }, "text");
	}
 	//账号密码回现
	showup();
 	function showup(){
 		if(getCookie('account')!=null&&getCookie('account')!=''){
 	        $('#user-account').val(getDAes(getCookie('account')));
 	    }

 	    if(getCookie('password')!=null && getCookie('password')!=''){
 	       $('#user-password').val(getDAes(getCookie('password')));
 	    }
 	    
 	    $('#remember-me').attr('checked', false);
 	}
 	
 	//得到通知
  	$.get('informController/getSubInform',{
  		pageNum:'1',
  		pageSize:'6',
  		navigatePages:'1'
  	},function(data){
 		for(var i=0;i<6;i++){
 			var a=$('<a>').attr('href','#').addClass('am-text-truncate');
 			a.append($('<span>').text(data.list[i].informTitle));
 			a.append($('<span>').text(getMyDate(data.list[i].createDate)));
 			a.append($('<span>').text(data.list[i].informBody).css('display','none'));
 			a.on('click',function(){
 				$('#modal_title').find('span').text($(this).find('span').eq(0).text());
 				$('#model_body').html($(this).find('span').eq(2).text());
 				$('#inform-modal').modal('open');
 				return false;
 			});
 			var li=$("#inform_ul").append($('<li>').append(a));
 		}
 	});
 	
 	//得到下载列表
  	$.get('downController/getSubDown',{
  		pageNum:'1',
  		pageSize:'6',
  		navigatePages:'1'
  	},function(data){
 		for(var i=0;i<6;i++){
 			var a=$('<a>').attr('href','#').addClass('am-text-truncate');
 			a.append($('<span>').text(data.list[i].downTitle));
 			a.append($('<span>').text(getMyDate(data.list[i].createDate)));
 			var li=$("#down_ul").append($('<li>').append(a));
 		}
 	});
 	
  });