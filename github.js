$(document).ready(function(){
	
	//检测git_box是否存在
	if($('.git_box').length>0 && $('.git_box').attr('data-repo')!='' ){
		
		//填充基本布局
		$('head').append(
			'<style type="text/css">'+
			'.git_box{width:500px;margin: 1px 0px 3px 0px;line-height: 22px;font-family: helvetica, arial, sans-serif;font-size: 13px;background: #fafafa;border: 1px solid #ddd;color: #666;border-radius: 3px;overflow: hidden;}'+
			'.git_header{position: relative;border-bottom: 1px solid #ddd;border-radius: 3px 3px 0 0;background: #d8e5f1;overflow: hidden;}'+
			'.git_header h3{font-family: helvetica, arial, sans-serif;font-weight: normal;font-size: 16px;color: #0088CC;margin: 0;padding: 3px 1px 1px 1px;}'+
			'#git_headimg{float: left;width:40px;height:40px;}'+
			'#git_headimg img{padding:5px;width:30px;}'+
			'#git_repo_name{float: left;width:350px;height:40px;overflow:hidden;line-height:40px}'+
			'#git_repo_name a{color: #0088CC;border: 0;text-decoration: none;}'+
			'.git_forkstar{float: right;padding-right: 5px;font-family: arial, sans-serif;background-repeat: no-repeat;font-size: 11px;margin-top: 10px;margin-bottom: 10px;}'+
			'#stars{background-color: white;border-top: 1px solid #ddd;border-bottom: 1px solid #ddd;border-right: 1px solid #ddd;color: #0088CC;border: 0;padding: 2px;text-decoration: none;}'+
			'#fork{border: 1px solid #ddd;background-color: white;color: #0088CC;border: 0;padding: 2px;text-decoration: none;}'+
			'.git_info{font-family: helvetica, arial, sans-serif;font-size: 13px;padding-left: 5px;padding-top: 8px;padding-bottom: 3px;}'+
			'.git_commits{padding-top: 5px;padding-left: 5px;padding-bottom: 3px;overflow: hidden;width: 690px;}'+
			'.git_commits b{font-weight: bold;color: #4183c4;border: 0;text-decoration: none;}'+
			'.git_commits_content{padding: 5px;border-left: 3px solid #ddd;background: rgba(102, 102, 102, 0.05);margin: 0;}'+
			'.git_split{height: 5px;overflow: hidden;}'+
			'.git_footer{padding: 3px 3px 7px 5px;border-top: 1px solid #ddd;}'+
			'#git_download{float: right;padding-right: 3px;}'+
			'#git_download a{color: #4183c4;border: 0;text-decoration: none;}'+
			'#git_laster a{color: #4183c4;border: 0;text-decoration: none;}'+
			'</style>'
		);

		//获取必要信息并填充
		$('.git_box').append(
			'<div class="git_header">'+
        	'<h3>'+
            '<div id="git_headimg"><img src=""></div>'+
            '<div id="git_repo_name"><a href=""></a></div>'+
            '<div class="git_forkstar"><a href="" id="stars"></a><span class="slipt">|</span><a href="" id="fork"></a></div>'+
        	'</h3>'+
    		'</div>'+
    		'<div class="git_split"></div>'+
    		'<div class="git_info"></div>'+
   			'<div class="git_split"></div>'+
    		'<div class="git_commits"><b>最近提交：</b><h4 class="git_commits_content"></h4></div>'+
    		'<div class="git_split"></div>'+
    		'<div class="git_footer">'+
    		'<div id="git_download"><a href="">下载zip</a></div><div id="git_laster"><a href="">master分支</a><span></span></div>'+
    		'</div>'
		);

		//填充数据
		var repos = $(".git_box").attr("data-repo");

	    $.ajax({ 
	        url: "https://api.github.com/repos/"+repos, 
	        dataType:"json",
	        success: function(data){
	            $('#git_headimg img').attr('src',data.owner.avatar_url);
	            $('#git_repo_name a').attr({'href':data.html_url,'text':data.full_name});
	            $('#git_laster a').attr('href',data.html_url);
	            $('#stars').attr({'href':data.html_url,'text':"Star "+data.stargazers_count});
	            $('#fork').attr({'href':data.html_url,'text':"Fork "+data.forks_count});
	            $('.git_info').text(data.description);
	            $('#git_download a').attr('href',data.html_url+"/zipball/master")
	            $('#git_laster span').text(data.pushed_at)
	            
	        }});
	    $.ajax({
	        url:"https://api.github.com/repos/"+repos+"/events",
	        dataType:"json",
	        success: function(data2){
	            var eventStr = " ";
	            for(var i=0;i< 5;i++){
	                if(data2[i].type == "PushEvent"){
	                    
	                    eventStr += data2[i].payload.commits[0].sha.substring(0,7)+"  "+data2[i].payload.commits[0].author.name+" 事件："+data2[i].payload.commits[0].message+" "+data2[i].created_at + "<br/>";
	                }
	                
	            }
	            $('.git_commits_content').html(eventStr)
	        }
	    });
	}
});