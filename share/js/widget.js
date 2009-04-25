/*!
 * ShareThis Widget Version 2.2.0-rc3
 * 2009-03-04 ShareThis.com 
 */

if (!window.console || !console.firebug) {
    var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
    window.console = {};
    for (var i = 0; i < names.length; ++i) window.console[names[i]] = function() {}
}

try{
	var glo_tabs='web,post,email';
	var glo_tabArray=[];
	glo_tabArray=glo_tabs.split(",");
	var glo_charset='utf-8';
	var glo_services="";
	var glo_default_services='reddit,digg,facebook,myspace,delicious,stumbleupon,ybuzz,mixx,technorati,google_bmarks,yahoo_bmarks,yahoo_myweb,windows_live,propeller,friendfeed,newsvine,xanga,linkedin,blinklist,furl,slashdot,n4g,magnolia,mister_wong,blogmarks,faves,current,simpy,meneame,yigg,oknotizie,fresqui,diigo,care2,funp,kirtsy,hugg,sphinn,dealsplus';
	var glo_default_swArray=[];
	    glo_default_swArray = glo_default_services.split(',');
	var glo_style='default';
	var glo_publisher="";
	var glo_headerbg='#999999';  //header bg
	var glo_inactivebg='#D2D2D2'; //inactive tab bg
	var glo_inactivefg='#424242';  //inactive text
	var glo_linkfg='#006633'; //link color
	var glo_embeds=false;
	var glo_popup=false;
	var glo_offsetLeft=0;
	var glo_offsetTop=0;
	var glo_isLoggedIn=false;
	var glo_authToken="";
	var glo_userName="";
	var glo_userEmail="";
	var glo_myspace="";
	var glo_facebook="";
	var glo_aim="";
	var glo_greyBoxNum=0;
	var glo_contProto=[];
	var glo_contName=[];
	var glo_contAdd=[];
	var glo_contRes=[];
	var glo_contResNum=0;
	var glo_swArray=[];
	var glo_swArray_more=[];
	var glo_msgArray=[];
	var	glo_hostname="";
	var	glo_location="";
	var	glo_url="";
	var	glo_title="";
	var glo_type="default";
	var glo_content="";
	var glo_summary="";
	var glo_icon="";
	var glo_category="";
	var glo_updated="";
	var glo_published="";
	var glo_author="";
	var glo_totalRegSW=0;
	var glo_tpDraft=1;
	var glo_bloggerDraft=1;
	var glo_guid="";
	var glo_guid_index=null;
	var glo_title_array=[];
	var glo_summary_array=[];
	var glo_content_array=[];
	var glo_url_array=[];
	var glo_icon_array=[];
	var glo_category_array=[];
	var glo_updated_array=[];
	var glo_published_array=[];
	var glo_author_array=[];
	var glo_type_array=[];
	var glo_tags_array=[];
	var glo_thumb_array=[];
	var glo_description_array=[];
	var glo_last_search="";
	var glo_thumb="";
	var glo_tags="";
	var glo_description="";
	var glo_Orkutcaptchaurl="";
	var glo_Orkutcookiefile="";
	var glo_Orkutpost_token="";
	var glo_Orkutsignature="";
	var glo_Orkutpostdata="";
	var Orkutcaptcha=false;
	var glo_num_diggs=0;
	var glo_digg_comments=0;
	var glo_pageOptions=false;
	var glo_swDiv="";
	var glo_oldQS="";
	var glo_destinations="";
	var glo_page_url="";
	var glo_page_title="";
	var glo_jsonStr="";
	var glo_jsonArray=[];
	var glo_destinationAddress="";
	var glo_destinationType="Social";
	var glo_options_popup=false;
	var displayNum=20;
	var glo_last_url="";
	var glo_last_url2="";
	var glo_initRun=false;
	var domReady=false;
	var bufferArgs=[];
	var bufferValue=[];
	var bufferRunArgs=[];
	var glo_thumbURL="";
	var glo_sessionID=null;
	

	var tstArray=[]; //test array from frag object;
	
	//test frag object
	function fragObj(inFrag,query){
		this.frag=inFrag;
		this.qs=query;
	}
	//tstArray.push(new fragObj(fr,qs));
	
	function readyTest(){
		for(var i=0;i<tstArray.length;i++){
			var tmp=tstArray[i].frag+" = \n"+tstArray[i].qs
			alert(tmp);
		}
		
	}

	function setGlobals(strArg,value)
	{
	var answer="";
		if(value===0){answer="No";}
		if(value===1){answer="Yes";}
		
		if(value===undefined || value==="undefined" || value===""){
			return false;
		}
	
		switch(strArg) {
			case "tabs":
			  glo_tabs=value;
			  glo_tabArray = value.split(',');
			  showCorrectTab();
			  break;    
			case "charset":
			  glo_charset=value;
			  break;
			case "services":
				glo_servces=value;
				glo_swArray = value.split(',');
				break;  
			case "style":
				glo_style=value;
				break;  
			case "publisher":
				glo_publisher=value;
				break;  
			case "headerbg":
				glo_headerbg=value;
				$$('.header-color').setStyle('background-color',value);
				var l = luminescence(value);
			    document.getElementById('whatsThisLink').style.color = l > 0.5 ? '#000' : '#fff';
			 	document.getElementById('whatsThis').style.color = l > 0.5 ? '#000' : '#fff';
			   	break;  
			case "inactivebg":
				glo_inactivebg=value;
				$$('.nav-inactive-color').setStyle('background-color',value);
				break; 
			case "inactivefg":
				glo_inactivefg=value;
				$$('.nav-inactive-color').setStyle('color',value);
				break;  
			case "linkfg":
				glo_linkfg=value;
				$$('a').setStyle('color',value);
				$$('.privacyLink a').setStyle('color','#666666');
				var l = luminescence(value);
			    document.getElementById('whatsThisLink').style.color = l > 0.5 ? '#000' : '#fff';
			 	document.getElementById('whatsThis').style.color = l > 0.5 ? '#000' : '#fff';
				break;  
			case "embeds":
				glo_embeds=value;
				break;  
			case "popup":
				glo_popup=value;
				break;  
			case "offsetLeft":
				glo_offsetLeft=value;
				break;  
			case "offsetTop":
				glo_offsetTop=value;
				break;
			case "auth":
			   	glo_authToken=value;
				break;
			case "userEmail":
				glo_userEmail=value;
				$('textAuthInfoEmail').set('html',value);
				break;
			case "userName":
				glo_userName=value;
				break;
			case "facebook":
				glo_facebook=value;
				break;
			case "myspace":
				glo_myspace=value;
				break;
			case "aim":
				glo_aim=value;
				break;
			case "contProto":
				glo_contProto.push(value);
				break;
			case "contName":
			    glo_contName.push(value);
				break;	
			case "contAdd":
			    glo_contAdd.push(value);
				break;
			case "contName":
			    glo_contRes.push(value);
				break;	
			case "contResNum":
			    glo_contResNum=value;
				break;
			case "loggedIn":
				glo_isLoggedIn=value;
				if(glo_isLoggedIn===true){
					$('boxToYourAddr').setStyle('display','none');
					$$('.guest').setStyle('display','none');
				}
				else{
					$('boxToYourAddr').setStyle('display','block');
					$$('.guest').setStyle('display','block');
				}
				break;
			case "hostname":
				glo_hostname=encodeURIComponent(value);
				break;	
			case "location":
				glo_location=encodeURIComponent(value);
				break;
			case "url":
				if(value!==glo_url && value!==undefined){
					if(typeof(value)!=="string"){
						try{glo_url=value.href;}catch(err){}
					}
					else{
						glo_url=value;
					}
					glo_thumbURL='<img src="http://sharethis.com/share/thumb?url='+glo_url+'" width="100">';
					$('previewUrl').set('html',decodeURIComponent(glo_url));
				}
				break;
			case "title":
				glo_title=decodeURIComponent(value);
				glo_title=encodeURIComponent(glo_title);
				if(glo_title=="" || glo_title=="undefined"){
					glo_title=decodeURIComponent(glo_url);
				}
				$('previewTitle').set('html',decodeURIComponent(value));
				break;	
			case "type":
				glo_type=value;
				break;	
			case "icon":
				glo_icon=value;
				if(value.length>5){
					glo_thumbURL=value;
				}
				break;			
			case "category":
				glo_category=value;
				break;
			case "updated":
				glo_updated=value;
				break;
			case "published":
				glo_published=value;
				break;	
			case "author":
				glo_author=value;
				break;
			case "summary":
				glo_summary=value;
				break;	
			case "content":
				glo_content=encodeURIComponent(value);
				break;
			case "glo_tpDraft":
				glo_tpDraft=value;
				break;
			case "glo_bloggerDraft":
				glo_bloggerDraft=value;
				break;		
			case "guid":
				if(glo_guid==="" && value!==null && value!=="null"){
					glo_guid=value;
					getObjects();
				}
				break;
			case "guid_index":
				glo_guid_index=value;
				setValues();
				break;
			case "glo_title_array":
				glo_title_array.push(value);
				break;	
			case "glo_type_array":
				glo_type_array.push(value);
				break;
			case "glo_summary_array":
				glo_summary_array.push(value);
				break;
			case "glo_content_array":
				glo_content_array.push(value);
				break;
			case "glo_url_array":
				value=encodeURIComponent(value);
				glo_url_array.push(value);
				break;
			case "glo_icon_array":
				glo_icon_array.push(value);
				break;
			case "glo_category_array":
				glo_category_array.push(value);
				break;
			case "glo_updated_array":
				glo_updated_array.push(value);
				break;
			case "glo_published_array":
				glo_published_array.push(value);
				break;
			case "glo_author_array":
				glo_author_array.push(value);
				break;
			case "glo_thumb":
				glo_thumb=value;
				break;	
			case "glo_tags":
				glo_tags=value;
				break;	
			case "glo_description":
				glo_description=value;
				glo_description=encodeURIComponent(glo_description);
				break;	
			case "glo_thumb_array":
				glo_thumb_array.push(value);
				break;	
			case "glo_tags_array":
				glo_tags_array.push(value);
				break;	
			case "glo_description_array":
				glo_description_array.push(value);
				break;
			case "pageTitle":
				glo_page_title=value;
				break;
			case "pageURL":
				glo_page_url=value;
				break;			
			case "sessionID":
				glo_sessionID=value;
				break;				
			default: 
				// do nothing
	  }
	}


	function addToOptions(a){
		var temp=[];
		temp=a.split("=");	
		temp[0]=decodeURIComponent(temp[0]);
		temp[1]=decodeURIComponent(temp[1]);
		try{
			temp[0]=decodeURIComponent(temp[0]);
			temp[1]=decodeURIComponent(temp[1]);
		}
		catch(err){
			//noop
		}
		tstArray.push(new fragObj(temp[0],temp[1]));
		setGlobals(temp[0],temp[1]);
	}
	
	function addToOptionsBuffer(a){
		var temp=[];
		temp=a.split("=");	
		temp[0]=decodeURIComponent(temp[0]);
		temp[1]=decodeURIComponent(temp[1]);
		try{
			temp[0]=decodeURIComponent(temp[0]);
			temp[1]=decodeURIComponent(temp[1]);
		}
		catch(err){
			//noop
		}
		tstArray.push(new fragObj(temp[0],temp[1]));
		bufferArgs.push(temp[0]);
		bufferValue.push(temp[1]);
	}
	
	function checkBufferArg(testStr){
		var returnVal=false;
		for(var i=0;i<bufferRunArgs.length;i++){
			if(bufferRunArgs[i]==testStr){
				returnVal=true;
			}
		}
		return returnVal;
	}
	
	function processBuffer(){
		bufferArgs.reverse();
		bufferValue.reverse();		
		for(var i=0;i<bufferArgs.length;i++){
			if( checkBufferArg(bufferArgs[i])===false ){
				bufferRunArgs.push(bufferArgs[i]);
				setGlobals(bufferArgs[i],bufferValue[i]);
			}
		}
		createSwList();
	}

			///frag pump start	
				var FragmentPump = new Class({
					Extends: Events,
					fragTimer: "",
				
					initialize: function(interval) {
						FragmentPump.fragTimer=setInterval(this.checkFragment.bind(this),5);
					},
					startint: function(){
						setInterval(this.checkFragment.bind(this), 250);
					},
					checkFragment: function() {
						var hash = document.location.hash.substring(1);
						if (hash.length > 0 && hash!==glo_oldQS) {
							var args = hash.split("/");
							glo_oldQS=hash;
							var cmd = args.shift();
							this.fireEvent(cmd, args);		
						}
					}
				});
			var fragmentPump = new FragmentPump();
			
			function bindEvents() {
				fragmentPump.addEvent("init", init.bind(this));
				fragmentPump.addEvent("show", show.bind(this));	
				fragmentPump.addEvent("popup", popup.bind(this));
				fragmentPump.addEvent("data", data.bind(this));							
				fragmentPump.addEvent("test",test.bind(this));  //for testing	calls readyTest					
			}	
				function init(){
					if(glo_initRun===false){
						glo_initRun=true;
						for(var i=0;i<arguments.length;i++)
						    {
						    	var num=i+1;
								if(arguments[i]!="" && arguments[i]!=" "){addToOptionsBuffer(arguments[i]);}
						    }
							$$('.messaging').setStyle('color',glo_linkfg);
							glo_pageOptions=true;
							if(domReady===true){
								processBuffer();
								doLess();
							}
							glo_initRun=true;
							//createSwList();
						}
				}
				
				function test(){
					readyTest();
				}			
				function data(){
				
					for(var i=0;i<arguments.length;i++)
					    {
					    var num=i+1;
						addToOptions2(arguments[i]);
					    }		
				}
				function show(){
					//checkForCookie();
					for(var i=0;i<arguments.length;i++)
					    {
					    var num=i+1;
						addToOptions(arguments[i]);
					    }
						$$('.messaging').setStyle('color',glo_linkfg);
				}
				function popup(){
					//checkForCookie();
					clearInterval(fragmentPump.fragTimer);
					clearInterval(FragmentPump.fragTimer);
					fragmentPump.startint();
					glo_options_popup=true;  
					displayNum=24;
					for(var i=0;i<arguments.length;i++) {
						var num=i+1;
						addToOptions(arguments[i]);
					}
					    
					if(domReady===true){
						$$('.messaging').setStyle('color',glo_linkfg);
						doLess();
						$('post_tab').setStyle('height','334px');	
						$('web_tab').setStyle('height','334px');
						$('send_tab').setStyle('height','344px');
					}	
				
				}	
		
		bindEvents();
	
	
	//frag pump end

	function addToOptions2(a){
		var temp=[];
		temp=a.split("=");	
		temp[0]=decodeURIComponent(temp[0]);
		try{
			temp[0]=decodeURIComponent(temp[0]);
			temp[1]=decodeURIComponent(temp[1]);
		}
		catch(err){
			// do nothing
		}
		if(temp[0]=="pageHost"){
			setGlobals("hostname",temp[1]);
		}
		else if(temp[0]=="pagePath"){
			setGlobals("location",temp[1]);
		}
		tstArray.push(new fragObj(temp[0],temp[1]));
		if(temp[1]=="done"){
			if(glo_initRun===false){document.location.hash=glo_initFrag;}
			clearInterval(fragmentPump.fragTimer);
			clearInterval(FragmentPump.fragTimer); 
			fragmentPump.startint();         
			glo_jsonStr=glo_jsonArray.join('');
			try{
				glo_jsonStr=decodeURIComponent(glo_jsonStr);
				glo_jsonStr=decodeURIComponent(glo_jsonStr);
				glo_jsonStr=decodeURIComponent(glo_jsonStr);
			}
			catch(err){
				// do nothing
			}
			processFrag();
			
		}
		else if(temp[0]=="jsonData"){
			glo_jsonArray.push(temp[1]);
		}
	}

	var Widget = new Class({
		shareables: [],
		shareablesKey: "",
		shareableIndex: 0,
		authToken:"",
		contacts: [],
	
		initialize: function() {
		},
	
		signIn: function(){
		
			var err_set=false;
			var err="";
			if($('textAuthUsername').value===""){
				err+="Please enter your username\n";
				err_set=true;
			}
			if($('textAuthPassword').value===""){
				err+="Please enter your password";
				err_set=true;
			}
			if(!err_set){
				duringLogin();
				this.checkAuth($('textAuthUsername').value,$('textAuthPassword').value);
			}
			else{
				alert(err);
			}
		},
		getContacts: function(){
			var request=new Request({
				method: "post",
				url: "/api/getContacts_ws.php",
				data: "token="+glo_authToken+"&return=json",
				onSuccess:this.getContacts_onSuccess
			});
			request.send();
		},

		getContacts_onSuccess: function(responseText,responseXML){
			var response = JSON.decode(responseText);
			if (response.status === "SUCCESS"&& response.data) {
				var contacts = response.data;
				for(i=0;i<contacts.length;i++){
					setGlobals("contProto",contacts[i].service.toUpperCase());
					setGlobals("contName",contacts[i].name);
					setGlobals("contAdd",contacts[i].address);	
				}
			}
		},
	
		getUserInfo: function(){
			var request=new Request({
				method: "post",
				url: "/api/getUserInfo_ws.php",
				data: "token="+glo_authToken+"&return=json",
				onSuccess:this.getUserInfo_onSuccess
			});
			request.send();
		},
	
		getUserInfo_onSuccess: function(responseText,responseXML){
			var response = JSON.decode(responseText);
			if (response.status === "SUCCESS") {
				setGlobals("userName",response.data.name);
				setGlobals("userEmail",response.data.email);
				afterLogin();
			} 
		},
		checkAuth: function(username,password){
			var request=new Request({
				method: "post",
				url: "/api/getAuth_ws.php",
				data: "username="+username+"&password="+password+"&return=json",
				onSuccess:this.checkAuth_onSuccess
			});
			request.send();
		},
		checkAuth_onSuccess: function(responseText, responseXML) {
			var response = JSON.decode(responseText);
			if (response.status === "SUCCESS") {
				this.authToken = response.data.token;
				set_cookie("ShareUT",this.authToken);
				setGlobals("auth",this.authToken);
				setGlobals("loggedIn",true);
				widget.getUserInfo();
				widget.getContacts();
			} 
			else if (response.statuMessage === "INVALID_USERNAME_OR_PASSWORD") {
				$('loginContainer').setStyle('visibility','visible');
				$('regLoading').setStyle('display','none');
				$('loginErr').set('html','Invalid Username or Password');
				$('loginErr').setStyle('display','block');
			}
			else if (response.statusMessage === "DATABASE_FAILED") {
				$('loginContainer').setStyle('visibility','visible');
				$('regLoading').setStyle('display','none');
				$('loginErr').set('html','Unable to connect to ShareThis authentication server');
				$('loginErr').setStyle('display','block');
			}
			else {
				$('loginContainer').setStyle('visibility','visible');
				$('regLoading').setStyle('display','none');
				$('loginErr').set('html','Invalid Username or Password');
				$('loginErr').setStyle('display','block');
			}
		},	
		postTypePad: function(){ 
			var username=$('inputTpUsername').value;
			var password=$('inputTpPassword').value;
			var err="";
			var err_set=false;
			if(!username&&!blogid){
				err_set=true;
				err+="\nPlease enter a username";	
			}
			if(!password&&!blogid){
				err_set=true;	
				err+="\nPlease enter a password";	
			}
			if(err_set){
				alert(err);
			}
			else{
				if(document.getElementById('tpSelect')){
					var blogid = $('tpSelect').get('value');
				}
				var data="";
			
				var atag="<a href="+glo_url+">"+decodeURIComponent(glo_title)+"</a>";
				if(glo_content!==""){
					atag="";
				}
			
				atag=encodeURIComponent(atag);
			
				if(!blogid){
					data="username="+username+"&password="+password+"&d="+glo_content+atag+"&draft="+glo_tpDraft+"&t="+glo_title+"&return=json";
				}
				else{
					data="blogid="+blogid+"&d="+glo_content+atag+"&draft="+glo_tpDraft+"&password="+password+"&t="+glo_title+"&username="+username+"&return=json";
				}

				var request=new Request({
					method: "post",
					url: "/api/postTypePad_ws.php",
					data: data,
					onSuccess:this.postTypePad_onSuccess
				});
				$$('.postTabWorking').setStyle('display','block');
				$$('.postTabSuccess').setStyle('display','none');
				$$('.postTabError').setStyle('display','none');
				$$('.postTabDomain').setStyle('display','none');
				request.send();
			}
		},	
		postTypePad_onSuccess: function(responseText, responseXML) {	
		
			var resp = JSON.decode(responseText);
			$$('.postTabWorking').setStyle('display','none');
			var blogname=[];
			var blogid=[];
			var tpOptions="";
		
			if(resp.status.toLowerCase()==="success"){
				posted();
				$('tpBlogId').setStyle('display','none');
				logEvent("typepad","post");
			}
			else {
				if(resp.errorMessage.toLowerCase()==="auth_failed")
				{
					$$('.postTabError').set('html','Invalid Username or Password');
					$$('.postTabError').setStyle('display','block');
				}
				else if(resp.errorMessage.toLowerCase()==="multiple"){
					for (var i=0;i<resp.data.blogs.length;i++){
						blogname.push(resp.data.blogs[i].blogName);
						blogid.push(resp.data.blogs[i].blogid);
					}
					tpOptions="<select id='tpSelect'>";
					for(i=0;i<blogname.length;i++){
						tpOptions+='<option value="'+blogid[i]+'">'+blogname[i]+'</option>';
					}
					tpOptions+="</select>";
					$('tpUsername').setStyle('display','none');
					$('tpPassword').setStyle('display','none');
					$$('.postTabDomain').setStyle('display','block');
					$('tpBlogId').setStyle('display','block');
					$('btnTpSubmit').setStyle('display','inline');
					$('btnTpPost').setStyle('display','none');
					$('btnTpPublish').setStyle('display','none');
					$('posterBox').setStyle('display','block');
					$$('.postTabSuccess').setStyle('display','none');
					$$('.postTabError').setStyle('display','none');
					$('tpPoster').setStyle('display','block');
					var tmp= document.getElementById('tpSelect_span');
					tmp.innerHTML=tpOptions;
				}
				else {
					$$('.postTabError').set('html',resp.statusMessage + " " + resp.errorMessage);
					$$('.postTabError').setStyle('display','block');
				}
			}	
		},	
		postBlogger: function(){ 
			var username=$('inputBloggerUsername').value;
			var password=$('inputBloggerPassword').value;
			var err="";
			var err_set=false;
			if(!username&&!blogid){
				err_set=true;
				err+="\nPlease enter a username";	
			}
			if(!password&&!blogid){
				err_set=true;	
				err+="\nPlease enter a password";	
			}
			if(err_set){
				alert(err);
			}
			else{
				if(document.getElementById('bloggerSelect')){
					var blogid = $('bloggerSelect').get('value');
				}
				var data="";
				var atag="<a href="+glo_url+">"+decodeURIComponent(glo_title)+"</a>";
				if(glo_content!==""){
					atag="";
				}
				atag=encodeURIComponent(atag);
				if(!blogid){
					data="username="+username+"&password="+password+"&d="+glo_content+atag+"&draft="+glo_bloggerDraft+"&t="+glo_title+"&return=json";
				}
				else{
					data="username="+username+"&password="+password+"&d="+glo_content+atag+"&draft="+glo_bloggerDraft+"&t="+glo_title+"&return=json&blogid="+blogid;
				}
				var request=new Request({
					method: "post",
					url: "/api/postBlogger_ws.php",
					data: data,
					onSuccess:this.postBlogger_onSuccess
				});
				$$('.postTabWorking').setStyle('display','block');
				$$('.postTabSuccess').setStyle('display','none');
				$$('.postTabError').setStyle('display','none');
				$$('.postTabDomain').setStyle('display','none');
				request.send();
			}
		},
		postBlogger_onSuccess: function(responseText, responseXML) {	
		
			var resp = JSON.decode(responseText);
			$$('.postTabWorking').setStyle('display','none');
			var blogname=[];
			var blogid=[];
			var blOptions="";
		
			if(resp.status.toLowerCase()==="success"){
				posted();
				$('bloggerBlogId').setStyle('display','none');
				logEvent("blogger","post");
			}
			else {
				if(resp.errorMessage.toLowerCase()==="auth_failed") {
					$$('.postTabError').set('html','Invalid Username or Password');
					$$('.postTabError').setStyle('display','block');
				}
				else if(resp.errorMessage.toLowerCase()==="multiple") {
					for (var i=0;i<resp.data.blogs.length;i++){
						blogname.push(resp.data.blogs[i].blogname);
						blogid.push(resp.data.blogs[i].blogid);
					}
					blOptions="<select id='bloggerSelect'>";
					for(i=0;i<blogname.length;i++){
						blOptions+='<option value="'+blogid[i]+'">'+blogname[i]+'</option>';
					}
					blOptions+="</select>";
					$$('.postTabWorking').setStyle('display','none');
					$('bloggerUsername').setStyle('display','none');
					$('bloggerPassword').setStyle('display','none');
					$$('.postTabDomain').setStyle('display','block');
					$('bloggerBlogId').setStyle('display','block');
					$('btnBloggerSubmit').setStyle('display','inline');
					$('btnBloggerPost').setStyle('display','none');
					$('btnBloggerPublish').setStyle('display','none');
					$('posterBox').setStyle('display','block');
					$$('.postTabSuccess').setStyle('display','none');
					$$('.postTabError').setStyle('display','none');
					$('bloggerPoster').setStyle('display','block');
					var tmp= document.getElementById('bloggerSelect_span');
					tmp.innerHTML=blOptions;
				}
				else {
					$$('.postTabError').set('html',resp.statusMessage + " " + resp.errorMessage);
					$$('.postTabError').setStyle('display','block');
				}
			}	
		},
		
		postHi5: function(){ 
			var username=$('inputHi5Username').value;
			var password=$('inputHi5Password').value;
			var section=$('txtHi5').get('value');
			var comment=$('txtHi5Comment').value;
			if(comment==="optional"){comment="";}
			comment=encodeURIComponent(comment);
			var err="";
			var err_set=false;
			if(!username){
				err_set=true;
				err+="\nPlease enter a username";	
			}
			if(!password){
				err_set=true;	
				err+="\nPlease enter a password";	
			}
			if(err_set){
				alert(err);
			}
		
			var atag="<a href="+glo_url+">"+decodeURIComponent(glo_title)+"</a>";
			atag=encodeURIComponent(atag);
			if(glo_content!==""){
				atag="";
			}
			else{
				var data="";
				data="username="+username+"&password="+password+"&d="+glo_content+comment+"<br/><br/>"+atag+"&t="+glo_title+"&category="+section+"&return=json";
				var request=new Request({
					method: "post",
					url: "/api/posthi5_ws.php",
					data: data,
					onSuccess:this.postHi5_onSuccess
				});
				$$('.postTabWorking').setStyle('display','block');
				$$('.postTabSuccess').setStyle('display','none');
				$$('.postTabError').setStyle('display','none');
				$$('.postTabDomain').setStyle('display','none');
				request.send();
			}
		},
	
		postHi5_onSuccess: function(responseText, responseXML) {
			$$('.postTabWorking').setStyle('display','none');	
			var resp = JSON.decode(responseText);
			var blogname=[];
			var blogid=[];
			var tpOptions="";
			if(resp.status.toLowerCase()==="success"){
				posted();
				$('posterBox').setStyle('display','none');
				logEvent("hi5","post");
			}	
			else {
				$$('.postTabError').set('html',resp.statusMessage + " " + resp.errorMessage);
				$$('.postTabError').setStyle('display','block');
			}
		},

		postOrkut: function(){ 
			var username=$('inputOrkutUsername').value;
			var password=$('inputOrkutPassword').value;
			var comment=$('txtOrkutComment').value;
			if(comment==="optional"){comment="";}
			comment=encodeURIComponent(comment);
			var err="";
			var err_set=false;
			var captcha="";

			var atag="<a href="+glo_url+">"+decodeURIComponent(glo_title)+"</a>";
			if(glo_content!==""){
				atag="";
			}
			atag=encodeURIComponent(atag);
			if(!username){
				err_set=true;
				err+="\nPlease enter a username";	
			}
			if(!password){
				err_set=true;	
				err+="\nPlease enter a password";	
			}
			if(Orkutcaptcha){
				if($('inputOrkutCaptcha').value==="")
				{
					err_set=true;
					err="Please enter the captcha";	
				}
				else{
					captcha=$('inputOrkutCaptcha').value;
				}
			}
			if(err_set){
				alert(err);
			}
			else{
				var data="";
					if(Orkutcaptcha){
						var tmp="cookiefile="+encodeURIComponent(glo_Orkutcookiefile)+"&post_token="+encodeURIComponent(glo_Orkutpost_token)+"&signature="+encodeURIComponent(glo_Orkutsignature)+"&postdata="+encodeURIComponent(glo_Orkutpostdata)+"&captcha="+captcha;					
						data=tmp;
					}
					else{
			  			data="username="+username+"&password="+password+"&d="+glo_content+atag+"&t="+glo_title+"&comments="+comment+"&return=json";
					}
				var request=new Request({
					method: "post",
					url: "/api/postOrkut_ws.php",
					data: data,
					onSuccess:this.postOrkut_onSuccess
				});
				$$('.postTabWorking').setStyle('display','block');
				$$('.postTabSuccess').setStyle('display','none');
				$$('.postTabError').setStyle('display','none');
				$$('.postTabDomain').setStyle('display','none');
				request.send();
			}
		},
	
		postOrkut_onSuccess: function(responseText, responseXML) {	
		
			$$('.postTabWorking').setStyle('display','none');	
			var resp = JSON.decode(responseText);
			if(resp.status.toLowerCase()==="success"){			
				glo_Orkutcaptchaurl="";
				glo_Orkutcookiefile="";
				glo_Orkutpost_token="";
				glo_Orkutsignature="";
				glo_Orkutpostdata="";
				Orkutcaptcha=false;
				$('orkutCaptchaImage').setStyle('display','none');
				$('orkutCaptcha').setStyle('display','none');		
				posted();
				$('posterBox').setStyle('display','none');
				logEvent("orkut","post");
			}	
			else if(resp.statusMessage.toLowerCase()==="need_captcha"){
				glo_Orkutcaptchaurl=resp.data.captchaurl;
				glo_Orkutcookiefile=resp.data.cookiefile;
				glo_Orkutpost_token=resp.data.POST_TOKEN;
				glo_Orkutsignature=resp.data.signature;
				glo_Orkutpostdata=resp.data.postdata;
				Orkutcaptcha=true;
				$('orkutUsername').setStyle('display','none');
				$('orkutPassword').setStyle('display','none');
				$$('.postTabWorking').setStyle('display','none');
				$('orkutComment').setStyle('display','none');
				$('orkutCaptcha').setStyle('display','block');
				var img='<img alt="orkut captcha image" src="'+glo_Orkutcaptchaurl+'" height="70" width="200">';
				$('orkutCaptchaImage').set('html',img);
				$('orkutCaptchaImage').setStyle('display','block');			
			}
			else {
				$$('.postTabError').set('html',resp.statusMessage + " " + resp.errorMessage);
				$$('.postTabError').setStyle('display','block');
			}
		},
	
		postLive_journal: function(){ 
			var username=$('inputLive_journalUsername').value;
			var password=$('inputLive_journalPassword').value;
			var comment=$('txtLive_journalComment').value;
			if(comment==="optional"){comment="";}
			comment=encodeURIComponent(comment);
			var err="";
			var err_set=false;
			if(!username){
				err_set=true;
				err+="\nPlease enter a username";	
			}
			if(!password){
				err_set=true;	
				err+="\nPlease enter a password";	
			}
				var atag="<a href="+glo_url+">"+decodeURIComponent(glo_title)+"</a>";
				if(glo_content!==""){
					atag="";
				}
				atag=encodeURIComponent(atag);
			if(err_set){
				alert(err);
			}	
			else{
				var data="";
				data="username="+username+"&password="+password+"&d="+comment+"<br/><br/>"+glo_content+atag+"&t="+glo_title+"&return=json";
				var request=new Request({
					method: "post",
					url: "/api/postLiveJournal_ws.php",
					data: data,
					onSuccess:this.postLive_journal_onSuccess
				});
				$$('.postTabWorking').setStyle('display','block');
				$$('.postTabSuccess').setStyle('display','none');
				$$('.postTabError').setStyle('display','none');
				$$('.postTabDomain').setStyle('display','none');
				request.send();
			}
		},
	
		postLive_journal_onSuccess: function(responseText, responseXML) {	
		
			$$('.postTabWorking').setStyle('display','none');	
			var resp = JSON.decode(responseText);
			if(resp.status.toLowerCase()==="success"){
				posted();
				$('posterBox').setStyle('display','none');
				logEvent("livejournal","post");
			}	
			else {
				$$('.postTabError').set('html',resp.statusMessage + " " + resp.errorMessage);
				$$('.postTabError').setStyle('display','block');	
			}

		},
	
		postFriendster: function(){ 
			var username=$('inputFriendsterUsername').value;
			var password=$('inputFriendsterPassword').value;
			var section=$('txtFriendster').get('value');
			var comment=$('txtFriendsterComment').value;
			if(comment==="optional"){comment="";}
			comment=encodeURIComponent(comment);
			var err="";
			var err_set=false;
			if(!username){
				err_set=true;
				err+="\nPlease enter a username";	
			}
			if(!password){
				err_set=true;	
				err+="\nPlease enter a password";	
			}
			if(err_set){
				alert(err);
			}
			var atag="<a href="+glo_url+">"+decodeURIComponent(glo_title)+"</a>";
			atag=encodeURIComponent(atag);
			if(glo_content!==""){
				atag="";
			}
				var data="";
				data="username="+username+"&password="+password+"&d="+glo_content+comment+"<br/><br/>"+atag+"&t="+glo_title+"&category="+section+"&return=json";
				
				var request=new Request({
					method: "post",
					url: "/api/postFriendster_ws.php",
					data: data,
					onSuccess:this.postFriendster_onSuccess
				});
				$$('.postTabWorking').setStyle('display','block');
				$$('.postTabSuccess').setStyle('display','none');
				$$('.postTabError').setStyle('display','none');
				$$('.postTabDomain').setStyle('display','none');
				request.send();
		
		},
	
		postFriendster_onSuccess: function(responseText, responseXML) {	
		
			$$('.postTabWorking').setStyle('display','none');	
			var resp = JSON.decode(responseText);
			if(resp.status.toLowerCase()==="success"){
				posted();	
				$('posterBox').setStyle('display','none');
				logEvent("friendster","post");
			}
			else if(resp.errorMessage.toLowerCase()=="auth_failed"){
				$$('.postTabError').set('html','Incorrect Username or Password');
				$$('.postTabError').setStyle('display','block');	
			}	
			else {
				$$('.postTabError').set('html',resp.statusMessage + " " + resp.errorMessage);
				$$('.postTabError').setStyle('display','block');	
			}

		},
		
		postWordpress: function()
		{ 
			var username=$('inputWpUsername').value;
			var password=$('inputWpPassword').value;
			var url=$('inputWpURL').value;
			var err="";
			var err_set=false;
			if(!username)
			{
				err_set=true;
				err+="\nPlease enter a username";	
			}
			if(!password){
				err_set=true;	
				err+="\nPlease enter a password";	
			}
			if(!url){
				err_set=true;	
				err+="\nPlease enter a url";	
			}
			var atag="<a href="+glo_url+">"+decodeURIComponent(glo_title)+"</a>";
			if(glo_content!==""){
				atag="";
			}
			atag=encodeURIComponent(atag);
			if(err_set){
				alert(err);
			}
			else{
				var data="";
				data="username="+username+"&password="+password+"&d="+glo_content+atag+"&t="+glo_title+"&return=json&url="+url+"";

				var request=new Request({
					method: "post",
					url: "/api/postWordPress_ws.php",
					data: data,
					onSuccess:this.postWordpress_onSuccess
				});
				$$('.postTabWorking').setStyle('display','block');
				$$('.postTabSuccess').setStyle('display','none');
				$$('.postTabError').setStyle('display','none');
				$$('.postTabDomain').setStyle('display','none');

				request.send();
			}
		},

		postWordpress_onSuccess: function(responseText, responseXML) {
			$$('.postTabWorking').setStyle('display','none');		
			var resp = JSON.decode(responseText);
			var tpOptions="";
			if(resp.status.toLowerCase()==="success"){
				posted();
				logEvent("wordpress","post");
			}
			else {
				if(resp.statusMessage.toLowerCase()==="connection_failed") {
					$$('.postTabError').set('html','Unable to connect to your blog.');
					$$('.postTabError').setStyle('display','block');
				} 
				else {
					if(resp.statusMessage.toLowerCase()=="post_failed"){
						$$('.postTabError').set('html',"Post Failed.");
					}
					else if(resp.errorMessage.toLowerCase()=="auth_failed"){
						$$('.postTabError').set('html',"Please Check Username and Password.");
					}
					else{
						$$('.postTabError').set('html','Unable to connect to your blog.');
					}
					$$('.postTabError').setStyle('display','block');	
				}		
			}		
		},
		updatePreview: function(index) {
			if (this.shareables[index].icon !== "") {
				$("icon").set("html", "<img src=\"" + this.shareables[index].icon + "\" width=\"100\" />");
			}
			if (this.shareables[index].url !== "") {
				$("title").set("html", "<a href=\"" + this.shareables[index].url + "\" target=\"_blank\">" + this.shareables[index].title + "</a>");
			} else {
				$("title").set("html", this.shareables[index].title);
			}
			$("summary").set("html", this.shareables[index].summary);
			$("content").set("html", this.shareables[index].content);
		}
	});

	window.addEvent('domready', function() {					
		domReady=true;
		if(glo_options_popup===true){
			$$('.messaging').setStyle('color',glo_linkfg);
			doLess();
			$('post_tab').setStyle('height','334px');	
			$('web_tab').setStyle('height','334px');
			$('send_tab').setStyle('height','344px');
		}
		if(glo_initRun===true){
			processBuffer();
		}
		else{
			createSwList();
		}
		$('swcontainer').setStyle("height","auto");
		showCorrectTab();
		var a=[];
		a=$$('input');
		for(i=0;i<a.length;i++){
		a[i].setAttribute("autocomplete", "off"); 
		}
		handelExternalLinks();
		emptyInputs();
		checkForCookie();
		
		$('linkWebMore').addEvent('click', function(){
			    doMore();
		});	
		$('linkWebLess').addEvent('click', function(){
			    doLess();
		});

		$('linkAuthSignIn').addEvent('click', function(){
			    widget.signIn();
		});
		$('linkSignInClose').addEvent('click', function(){
			    closeLoginBox();
		});
		$('linkSignIn').addEvent('click', function(){
			openLoginBox();
		});
		$('linkRegister').addEvent('click', function(){
			    showRegister();
		});
		$('linkSignOut').addEvent('click', function(){
			    forgetUser();
		});
		$('textAuthUsername').addEvent('keydown', function(event){
		    event = new Event(event); 
		if (event.key === 'enter'){
				$('loginErr').setStyle('display','none');
				widget.signIn();	
			} 
		});
		$('textAuthPassword').addEvent('keydown', function(event){
		    event = new Event(event); if (event.key === 'enter') widget.signIn();
		});
		$('linkPosterBoxClose').addEvent('click', function(){
			closePosterBox();
		});	
		$('linkPosterBoxClose2').addEvent('click', function(){
			closePosterBox();
		});
		$('btnPosterDone').addEvent('click', function(){
			closePosterBox();
		});
		$('btnPosterDone2').addEvent('click', function(){
			closePosterBox();
		});
		$('post_typepad').addEvent('click', function(){
			showTP();
		});
		$('post_blogger').addEvent('click', function(){
			showBlogger();
		});
		$('post_wordpress').addEvent('click', function(){
			showWp();
		});
		$('post_hi5').addEvent('click', function(){
			showHi5();
			$('txtHi5Comment').value="optional";
		});
		$('post_orkut').addEvent('click', function(){
			showOrkut();
			$('txtOrkutComment').value="optional";
		});
		$('post_live_journal').addEvent('click', function(){
			showLive_journal();
			$('txtLive_journalComment').value="optional";
		});
	
		$('txtLive_journalComment').addEvent('focus',function(){
			if($('txtLive_journalComment').value==="optional"){$('txtLive_journalComment').value="";}
		});
		$('txtOrkutComment').addEvent('focus',function(){
			if($('txtOrkutComment').value==="optional"){$('txtOrkutComment').value="";}
		});
		$('txtHi5Comment').addEvent('focus',function(){
			if($('txtHi5Comment').value==="optional"){$('txtHi5Comment').value="";}
		});
		$('txtFriendsterComment').addEvent('focus',function(){
			if($('txtFriendsterComment').value==="optional"){$('txtFriendsterComment').value="";}
		});
	
		$('post_friendster').addEvent('click', function(){
			showFriendster();
			$('txtFriendsterComment').value="optional";
		});	
		$('btnTpPost').addEvent('click', function(){
			setGlobals("glo_tpDraft",0);
			widget.postTypePad();
		});
		$('btnTpPublish').addEvent('click', function(){
			setGlobals("glo_tpDraft",1);
			widget.postTypePad(); 
		});
		$('btnBloggerPost').addEvent('click', function(){
			setGlobals("glo_bloggerDraft",0);
			widget.postBlogger();
		});
		$('btnBloggerPublish').addEvent('click', function(){
			setGlobals("glo_bloggerDraft",1);
			widget.postBlogger(); 
		});
		$('btnBloggerSubmit').addEvent('click', function(){
			widget.postBlogger(); 
		});
		$('btnTpSubmit').addEvent('click', function(){
			widget.postTypePad(); 
		});
		$('btnWpSubmit').addEvent('click', function(){
			widget.postWordpress(); 
		});
		$('btnHi5Submit').addEvent('click', function(){
			widget.postHi5(); 
		});
		$('btnOrkutSubmit').addEvent('click', function(){
			widget.postOrkut(); 
		});
		$('btnLive_journalSubmit').addEvent('click', function(){
			widget.postLive_journal(); 
		});
		$('btnFriendsterSubmit').addEvent('click', function(){
			widget.postFriendster(); 
			$('txtFriendsterComment').value="optional";
		});
		$('btnShareSend').addEvent('click', function(){
			if ( '' != $('txtTo').value ) {
				select_item();
			} 
			processSendQueue(); 
		});
		$('btnAddAnother').addEvent('click',function(){
			saveAddress();
		});
		$('previewCloseLink').addEvent('click',function(){
			$('preview').setStyle('display','none');
		});
		$('linkPreview').addEvent('click',function(){
			$('preview').setStyle('display','block');
			$('previewThumb').set('html','<img src="'+glo_thumbURL+'" />');
		});
		$('doneScreenOk').addEvent('click',function(){
			clearMsgQueue();
			$('doneScreen').setStyle('display','none');
			$('send_container').setStyle('display','block');
		});
		$('txtTo').addEvent('keydown',function(event){
			event = new Event(event);
			switch (event.key) {
				case "up": 
					moveup_item();
					break;
				case "down": 
					movedown_item();
					break;
				case "enter":
					select_item();
					break;
				case "esc": 
					hideSuggest();
					break;
				default:
					//do nothing
					break;
			}
		});
		$('txtTo').addEvent('blur',function(){
			if ( '' != $('txtTo').value ) {
				return select_item(true);
			} 
		});
	
		$('txtUsing').addEvent('change',function(){
				if(!glo_isLoggedIn){
					if($('txtUsing').value==="AIM"){
						var h = $('container').offsetHeight;
						$('importAim').setStyle('top', h/2-70);
						$('greyout').setStyle('height',h-2);
						$('greyout').setStyle('display','block');
						$('importAim').setStyle('display','block');
						$('importMyspace').setStyle('display','none');
					}
					else if($('txtUsing').value==="MYSPACE"){
						var h = $('container').offsetHeight;
						$('importMyspace').setStyle('top', h/2-70);
						$('greyout').setStyle('height',h-2);
						$('greyout').setStyle('display','block');
						$('importAim').setStyle('display','none');
						$('importMyspace').setStyle('display','block');
					}
				}
				else{
					var myspace_contacts=false;
					var aim_contacts=false;
						for(var i=0;i<glo_contProto.length;i++){
							if(glo_contProto[i]=="MYSPACE"){
								myspace_contacts=true;
							}
							else if(glo_contProto[i]=="AIM"){
								aim_contacts=true;
							}
						}
						if($('txtUsing').value==="AIM" && aim_contacts===false){
							var h = $('container').offsetHeight;
							$('importAim').setStyle('top', h/2-70);
							$('greyout').setStyle('height',h-2);
							$('greyout').setStyle('display','block');
							$('importAim').setStyle('display','block');
							$('importMyspace').setStyle('display','none');
						}
						else if($('txtUsing').value==="MYSPACE" && myspace_contacts===false){
							var h = $('container').offsetHeight;
							$('importMyspace').setStyle('top', h/2-70);
							$('greyout').setStyle('height',h-2);
							$('greyout').setStyle('display','block');
							$('importAim').setStyle('display','none');
							$('importMyspace').setStyle('display','block');
						}
				}
		});	
		$('txtUsing').addEvent('focus',function(){
			closeMyspace();
			closeAim();
		});
		$('txtUsing').addEvent('mousedown',function(){
			closeMyspace();
			closeAim();
		});
		$('registerSubmit').addEvent('click',function(){
			register();
		});
		$('registerOK').addEvent('click',function(){
			closeRegister();
		});
		$('registerCloseLink').addEvent('click',function(){
			closeRegister();
		});
		$('importAimSubmit').addEvent('click',function(){
			importContacts('aim');
		});
		$('importAimOK').addEvent('click',function(){
			if($('aimRememberMe').checked)
			{	
				closeAim();
				$('txtUsing').setStyle('visibility', 'hidden' );
				$('register').setStyle('display','block');
			}
			else{
				closeAim();
			}
		});
	
		$('importMyspaceOK').addEvent('click',function(){
			if($('myspaceRememberMe').checked)
			{	
				closeMyspace();
				$('txtUsing').setStyle('visibility', 'hidden' );
				$('register').setStyle('display','block');
			}
			else{
				closeMyspace();
			}
		});
		$('importMyspaceSubmit').addEvent('click',function(){
			importMyspaceContacts();
		});
		$('importMyspaceCancel').addEvent('click',function(){
			closeMyspace();
		});
		$('importMyspaceCloseLink').addEvent('click',function(){
			closeMyspace();
		});
		$('addAnotherCloseLink').addEvent('click',function(){
			closeAddAnother();
		});
		$('importAimCancel').addEvent('click',function(){
			closeAim();
		});
		$('importAimCloseLink').addEvent('click',function(){
			closeAim();
		});
		$('boxToInfo').addEvent('mouseout',function(){
			suggestAutoClose();
		});
		$('boxToInfo').addEvent('mouseover',function(){
			suggestCancelClose();
		});		
	});

	function handelExternalLinks() {
		if (!document.getElementsByTagName) return;
		var anchors = document.getElementsByTagName("a");
		for (var i=0; i<anchors.length; i++) {
			var anchor = anchors[i];
			if(glo_options_popup==true && anchor.getAttribute("href") && anchor.getAttribute("rel") === "external")
			{
				anchor.target = "_top";
			}
			else if (anchor.getAttribute("href") && anchor.getAttribute("rel") === "external"){
				anchor.target = "_blank";
			}
		}
	}

	function doMore(){
		$$('.more').setStyle('display','block');
		$('swcontainer').setStyle("height","240px");
		var objDiv = document.getElementById('swcontainer');
		objDiv.scrollTop = objDiv.scrollHeight;	
		$('linkWebLess').setStyle('display','block');
		$('linkWebMore').setStyle('display','none');
	}

	function doLess(){
		$$('.more').setStyle('display','none');	
		$('swcontainer').setStyle("height","auto");
		$('linkWebLess').setStyle('display','none');
		$('linkWebMore').setStyle('display','block');
	}
	function selectWeb(autoFlag){
		$$('.header-color').setStyle('background-color',glo_headerbg);
		$('nav_web').set('class','nav-active-color');
		$('nav_post').set('class','nav-inactive-color');
		$('nav_send').set('class','nav-inactive-color');
		$('post_tab').setStyle('display','none');
		$('send_tab').setStyle('display','none');
		$('web_tab').setStyle('display','block');
		$$('.nav-inactive-color').setStyle('background-color',glo_inactivebg);
		$$('.nav-inactive-color').setStyle('color',glo_inactivefg);
		$$('.nav-active-color').setStyle('background-color','#FFFFFF');
		$$('.nav-active-color').setStyle('color','#000000');
		$$('a').setStyle('color',glo_linkfg);
		var l = luminescence(glo_linkfg);
	    document.getElementById('whatsThisLink').style.color = l > 0.5 ? '#000' : '#fff';
	 	document.getElementById('whatsThis').style.color = l > 0.5 ? '#000' : '#fff';
		$$('.messaging').setStyle('color',glo_linkfg);
		$$('.privacyLink a').setStyle('color','#666666');
		if(!autoFlag){setGlobals('tabVal',"100");}
	
	}
	function selectPost(autoFlag){
		$$('.header-color').setStyle('background-color',glo_headerbg);
		$('nav_web').set('class','nav-inactive-color');
		$('nav_post').set('class','nav-active-color');
		$('nav_send').set('class','nav-inactive-color');
		$('post_tab').setStyle('display','block');
		$('send_tab').setStyle('display','none');
		$('web_tab').setStyle('display','none');
		$$('.nav-inactive-color').setStyle('background-color',glo_inactivebg);
		$$('.nav-inactive-color').setStyle('color',glo_inactivefg);
		$$('a').setStyle('color',glo_linkfg);
		var l = luminescence(glo_linkfg);
	    document.getElementById('whatsThisLink').style.color = l > 0.5 ? '#000' : '#fff';
	 	document.getElementById('whatsThis').style.color = l > 0.5 ? '#000' : '#fff';
		$$('.messaging').setStyle('color',glo_linkfg);
		$$('.privacyLink a').setStyle('color','#666666');
		$$('.nav-active-color').setStyle('background-color','#FFFFFF');
		$$('.nav-active-color').setStyle('color','#000000');
		if(!autoFlag){setGlobals('tabVal',"010");}
	
	}
	function selectSend(autoFlag){
		$('nav_web').set('class','nav-inactive-color');
		$('nav_post').set('class','nav-inactive-color');
		$('nav_send').set('class','nav-active-color');
		$('post_tab').setStyle('display','none');
		$('send_tab').setStyle('display','block');
		$('web_tab').setStyle('display','none');
		$$('.nav-inactive-color').setStyle('background-color',glo_inactivebg);
		$$('.nav-inactive-color').setStyle('color',glo_inactivefg);
		$$('a').setStyle('color',glo_linkfg);
		var l = luminescence(glo_linkfg);
	    document.getElementById('whatsThisLink').style.color = l > 0.5 ? '#000' : '#fff';
	 	document.getElementById('whatsThis').style.color = l > 0.5 ? '#000' : '#fff';
		$$('.messaging').setStyle('color',glo_linkfg);
		$$('.privacyLink a').setStyle('color','#666666');
		$$('.nav-active-color').setStyle('background-color','#FFFFFF');
		$$('.nav-active-color').setStyle('color','#000000');
		$$('.header-color').setStyle('background-color',glo_headerbg);
	    setGlobals("loggedIn",glo_isLoggedIn);
		if(!autoFlag){setGlobals('tabVal',"001");}
	}
	function closeLoginBox(){
		$('greyout').setStyle('display','none');
		$('loginBox').setStyle('display','none');
	}
	function openLoginBox(){
		var h = $('container').offsetHeight;
		h = (h<110?110:h);
		var w = $('container').offsetWidth;
		$('loginBox').setStyle('top', h/2-55);
		$('loginBox').setStyle('left', w/2-155);
		$('greyout').setStyle('height',h-2);
		$('greyout').setStyle('display','block');
		$('loginBox').setStyle('display','block');
		$('loginContainer').setStyle('visibility','visible');
		$('textAuthUsername').focus();
	}
	function duringLogin(){
		$('loginContainer').setStyle('visibility','hidden');
		$('regLoading').setStyle('display','block');
	}
	function afterLogin()
	{
		$('regLoading').setStyle('display','none');
		$('loginErr').setStyle('display','none');
		closeLoginBox();
		signInFooter();	
	}
	function signInFooter(){
		$('footerReg').setStyle('display','none');
		$('signedInFooter').setStyle('display','block');
	}
	function regFooter(){
		$('footerReg').setStyle('display','block');
		$('signedInFooter').setStyle('display','none');
	}
	function forgetUser(){
		regFooter();
		setGlobals("loggedIn",false);
		$('boxToYourAddr').setStyle('display','block');
		setGlobals("auth","");
		setGlobals("userName","");
		setGlobals("userEmail","");
		setGlobals("myspace","");
		setGlobals("facebook","");
		setGlobals("aim","");
		setGlobals("contProto",[]);
		setGlobals("contName",[]);
		setGlobals("contAdd",[]);
		setGlobals("contResNum",0);
		emptyInputs();
		delete_cookie("ShareUT");
		glo_contProto=[];
		glo_contName=[];
		glo_contAdd=[];
		glo_contRes=[];
		glo_contResNum=0;
		//delete auth cookie
		//setGlobals to default	
	}
	function emptyInputs(){
		$$('input[type=text]').set('value','');
		$$('input[type=password]').set('value','');
		$$('input[type=password]').set('value','');
		//blank out tp select box
		$$('textarea').set('value','');
		$('tpSelect_span').set('html',"");
		$('bloggerSelect_span').set('html',"");
	}

	function checkForCookie(){
		var cookieToken=get_cookie("ShareUT");
		if(cookieToken){
		setGlobals("auth",cookieToken);
		setGlobals("loggedIn",true);
		widget.getUserInfo();
		widget.getContacts();	
		}
	}
	function set_cookie (name, value)
	{
		var current_date = new Date;
		var exp_y=current_date.getFullYear ();
		var exp_m=current_date.getMonth ()+2;
		var exp_d=current_date.getDate ();	
		var cookie_string = name + "=" + escape (value);

		if (exp_y)
		{
			var expires = new Date (exp_y,exp_m,exp_d);
			cookie_string += "; expires=" + expires.toGMTString();
		}
		cookie_string += "; domain=" + escape (".sharethis.com")+";path=/";
		document.cookie = cookie_string;
	}
	function get_cookie (cookie_name)
	{
	  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

	  if (results)
	    return ( unescape ( results[2] ) );
	  else
	    return false;
	}
	function delete_cookie(name) {
		var path="/";
		var domain=".sharethis.com";
		document.cookie = name + "=" +( ( path ) ? ";path=" + path : "") +( ( domain ) ? ";domain=" + domain : "" ) +";expires=Thu, 01-Jan-1970 00:00:01 GMT";
	}

	function showCorrectTab()
	{
		var tabTag="";
		var tabWeb=false;
		var tabPost=false;
		var tabSend=false;
		
		//temp fix.. to remove cookies for people with it...
		if(get_cookie("StTabVal")){
			delete_cookie("StTabVal");
		}
	
		for(var i=0;i<glo_tabArray.length;i++){
			if(glo_tabArray[i]=="web"){
				tabWeb=true;
				$('nav_web').setStyle('display','block');
				tabTag+='<span id="nav_web" class="nav-inactive-color">Social Web</span>';
			}
			else if(glo_tabArray[i]=="post"){
				tabPost=true;
				$('nav_post').setStyle('display','block');
				tabTag+='<span id="nav_post" class="nav-inactive-color">Post</span>';
			}
			else if(glo_tabArray[i]=="email"){
				tabSend=true;
				$('nav_send').setStyle('display','block');
				tabTag+='<span id="nav_send" class="nav-inactive-color">Send/Email</span>';
			}
		}
	
	
		if(!tabWeb){
			$('nav_web').setStyle('display','none');
			tabTag+='<span id="nav_web" class="nav-inactive-color" style="display:none">Social Web</span>';
		}
		if(!tabPost){
			$('nav_post').setStyle('display','none');
			tabTag+='<span id="nav_post" class="nav-inactive-color"  style="display:none">Post</span>';
		}
		if(!tabSend){
			$('nav_send').setStyle('display','none');
			tabTag+='<span id="nav_send" class="nav-inactive-color"  style="display:none">Send/Email</span>';
		}
	
		$("nav").set("html",tabTag);	
		$("nav").setStyle("displayl","block");
		if(glo_tabArray[0]=="web"){
			selectWeb(true);		
		}
		else if(glo_tabArray[0]=="post"){
			selectPost(true);
		}
		else if(glo_tabArray[0]=="email"){	
			selectSend(true);
		}
	
		if($('nav_send')) {	$('nav_send').addEvent('click', function(){selectSend();}); }
		if($('nav_post')) {	$('nav_post').addEvent('click', function(){selectPost();}); }
		if($('nav_web'))  {	$('nav_web').addEvent('click', function(){selectWeb();});  }

	}

	//creates a social web log event
	function logSW(network) {
		var url = "http://r.sharethis.com/log?event=click"
				+ "&publisher=" + encodeURIComponent(glo_publisher)
				+ "&hostname=" + encodeURIComponent(glo_hostname)
				+ "&location=" + encodeURIComponent(glo_location)
				+ "&destinations=" + network
				+ "&ts" + (new Date()).getTime()
				+ "&title=" + glo_title
				+ "&url=" + glo_url
				+ "&sessionID="+glo_sessionID;
		var logger = new Image(1,1);
		logger.src = url;
		logger.onload = function(){return;};
		var url2 = "http://l.sharethis.com/log?event=click"
				+ "&publisher=" + encodeURIComponent(glo_publisher)
				+ "&hostname=" + encodeURIComponent(glo_hostname)
				+ "&location=" + encodeURIComponent(glo_location)
				+ "&destinations=" + network
				+ "&ts" + (new Date()).getTime()
				+ "&title=" + glo_title
				+ "&url=" + glo_url
				+ "&sessionID="+glo_sessionID;
		var logger2 = new Image(1,1);
		logger2.src = url2;
		logger2.onload = function(){return;};
				
		glo_destinationType="Social";
		sendDestination(network); //for doing createDestination
	}

	function logEvent(destination1,eventType) {
	
		var url = "http://r.sharethis.com/log?event="+eventType;
			url+= "&publisher="+ encodeURIComponent(glo_publisher);
			url+= "&hostname="+ encodeURIComponent(glo_hostname);
			url+= "&location="+ encodeURIComponent(glo_location);
			url+= "&destinations="+destination1;
			url+= "&ts" + (new Date()).getTime();
			url+= "&title="+encodeURIComponent(glo_title);
			url+= "&url="+encodeURIComponent(glo_url);
			url+= "&sessionID="+glo_sessionID;
		var logger = new Image(1,1);
		logger.src = url;
		logger.onload = function(){return;};
	
		var url2 = "http://l.sharethis.com/log?event="+eventType;
			url2+= "&publisher="+ encodeURIComponent(glo_publisher);
			url2+= "&hostname="+ encodeURIComponent(glo_hostname);
			url2+= "&location="+ encodeURIComponent(glo_location);
			url2+= "&destinations="+destination1;
			url2+= "&ts" + (new Date()).getTime();
			url2+= "&title="+encodeURIComponent(glo_title);
			url2+= "&url="+encodeURIComponent(glo_url);
			url2+= "&sessionID="+glo_sessionID;
		var logger2 = new Image(1,1);
		logger2.src = url2;
		logger2.onload = function(){return;};
	
		if(eventType=="post"){
			glo_destinationType="Post";
			sendDestination(destination1); //for doing createDestination
		}
	}

	function createSWlinks(network,sw_type){
		var tmpTag="";

		if(network==="reddit"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_reddit" class="switem">';
			}
			else{
				tmpTag='<div id="st_reddit" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://reddit.com/submit?url='+glo_url+'&amp;title='+glo_title+'">Reddit</a></div>';	
		}
		else if(network==="digg"){
			getDiggs(glo_url);
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_digg" class="switem">';
			}
			else{
				tmpTag='<div id="st_digg" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://digg.com/submit?phase=2&url='+glo_url+'&title='+glo_title+'">Digg</a></div>';
		}
		else if(network==="facebook"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_facebook" class="switem">';
			}
			else{
				tmpTag='<div id="st_facebook" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://www.facebook.com/share.php?u='+glo_url+'">Facebook</a></div>';	
		}
		else if(network==="myspace"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_myspace" class="switem">';
			}
			else{
				tmpTag='<div id="st_myspace" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://www.myspace.com/Modules/PostTo/Pages/?l=3&u='+glo_url+'&t='+glo_title+'&c='+glo_content+'">MySpace</a></div>';	
		}
		else if(network==="delicious"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_delicious" class="switem">';
			}
			else{
				tmpTag='<div id="st_delicious" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://del.icio.us/post?url='+glo_url+'&title='+glo_title+'">Delicious</a></div>';	
		}
		else if(network==="stumbleupon"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_stumbleupon" class="switem">';
			}
			else{
				tmpTag='<div id="st_stumbleupon" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://www.stumbleupon.com/submit?url='+glo_url+'&title='+glo_title+'">Stumbleupon</a></div>';	
		}
		else if(network==="technorati"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_technorati" class="switem">';
			}
			else{
				tmpTag='<div id="st_technorati" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://www.technorati.com/faves?add='+glo_url+'">Technorati</a></div>';	
		}
		else if(network==="google_bmarks"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_google_bmarks" class="switem">';
			}
			else{
				tmpTag='<div id="st_google_bmarks" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://www.google.com/bookmarks/mark?op=edit&bkmk='+glo_url+'&title='+glo_title+'">Google Bookmarks</a></div>';	
		}
		else if(network==="yahoo_bmarks"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_yahoo_bmarks" class="switem">';
			}
			else{
				tmpTag='<div id="st_yahoo_bmarks" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://bookmarks.yahoo.com/toolbar/savebm?opener=tb&u='+glo_url+'&t='+glo_title+'">Yahoo Bookmarks</a></div>';	
		}
		else if(network==="yahoo_myweb"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_yahoo_myweb" class="switem">';
			}
			else{
				tmpTag='<div id="st_yahoo_myweb" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://myweb2.search.yahoo.com/myresults/bookmarklet?u='+glo_url+'&t='+glo_title+'">Yahoo MyWeb</a></div>';	
		}
		else if(network==="windows_live"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_windows_live" class="switem">';
			}
			else{
				tmpTag='<div id="st_windows_live" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="https://favorites.live.com/quickadd.aspx?marklet=1&mkt=en-us&url='+glo_url+'&title='+glo_title+'&top=1">Windows Live</a></div>';	
		}
		else if(network==="propeller"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_propeller" class="switem">';
			}
			else{
				tmpTag='<div id="st_propeller" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://www.propeller.com/submit/?U='+glo_url+'&T='+glo_title+'">Propeller</a></div>';	
		}
		else if(network==="slashdot"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_slashdot" class="switem">';
			}
			else{
				tmpTag='<div id="st_slashdot" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://slashdot.org/bookmark.pl?url='+glo_url+'&title='+glo_title+'">Slashdot</a></div>';	
		}
		else if(network==="newsvine"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_newsvine" class="switem">';
			}
			else{
				tmpTag='<div id="st_newsvine" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://www.newsvine.com/_tools/seed&save?popoff=0&u='+glo_url+'&h='+glo_title+'">Newsvine</a></div>';	
		}
		else if(network==="n4g"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_n4g" class="switem">';
			}
			else{
				tmpTag='<div id="st_n4g" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://www.n4g.com/tips.aspx?url='+glo_url+'&title='+glo_title+'">N4G</a></div>';	
		}
		else if(network==="mixx"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_mixx" class="switem">';
			}
			else{
				tmpTag='<div id="st_mixx" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://www.mixx.com/submit?page_url='+glo_url+'">Mixx</a></div>';	
		}
		else if(network==="blinklist"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_blinklist" class="switem">';
			}
			else{
				tmpTag='<div id="st_blinklist" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://blinklist.com/index.php?Action=Blink/addblink.php&Url='+glo_url+'&Title='+glo_title+'">Blinklist</a></div>';	
		}
		else if(network==="furl"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_furl" class="switem">';
			}
			else{
				tmpTag='<div id="st_furl" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://furl.net/storeIt.jsp?u='+glo_url+'&t='+glo_title+'">Furl</a></div>';	
		}
		else if(network==="magnolia"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_magnolia" class="switem">';
			}
			else{
				tmpTag='<div id="st_magnolia" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://ma.gnolia.com/bookmarklet/add?url='+glo_url+'&title='+glo_title+'">Magnolia</a></div>';	
		}
		else if(network==="mister_wong"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_mister_wong" class="switem">';
			}
			else{
				tmpTag='<div id="st_mister_wong" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://www.mister-wong.com/index.php?action=addurl&bm_url='+glo_url+'&bm_description='+glo_title+'">Mister Wong</a></div>';	
		}
		else if(network==="blogmarks"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_blogmarks" class="switem">';
			}
			else{
				tmpTag='<div id="st_blogmarks" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://blogmarks.net/my/new.php?mini=1&url='+glo_url+'&title='+glo_title+'">Blogmarks</a></div>';	
		}
		else if(network==="faves"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_faves" class="switem">';
			}
			else{
				tmpTag='<div id="st_faves" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://www.faves.com/Authoring.aspx?u='+glo_url+'&t='+glo_title+'">Faves</a></div>';	
		}
	    else if(network==="current"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_current" class="switem">';
			}
			else{
				tmpTag='<div id="st_current" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://current.com/clipper.htm?url='+glo_url+'&title='+glo_title+'&src=st">Current</a></div>';	
		}
		else if(network==="simpy"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_simpy" class="switem">';
			}
			else{
				tmpTag='<div id="st_simpy" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://www.simpy.com/simpy/LinkAdd.do?href='+glo_url+'&title='+glo_title+'">Simpy</a></div>';	
		}
		else if(network==="meneame"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_meneame" class="switem">';
			}
			else{
				tmpTag='<div id="st_meneame" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://meneame.net/submit.php?url='+glo_url+'">Meneame</a></div>';	
		}
		else if(network==="yigg"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_yigg" class="switem">';
			}
			else{
				tmpTag='<div id="st_yigg" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://www.yigg.de/neu?exturl='+glo_url+'&exttitle='+glo_title+'">Yigg</a></div>';	
		}
		else if(network==="oknotizie"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_oknotizie" class="switem">';
			}
			else{
				tmpTag='<div id="st_oknotizie" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://oknotizie.alice.it/post?url='+glo_url+'&title='+glo_title+'">Oknotizie.alice.it</a></div>';	
		}
		else if(network==="fresqui"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_fresqui" class="switem">';
			}
			else{
				tmpTag='<div id="st_fresqui" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://ocio.fresqui.com/post?url='+glo_url+'&title='+glo_title+'">Fresqui</a></div>';	
		}
		else if(network==="diigo"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_diigo" class="switem">';
			}
			else{
				tmpTag='<div id="st_diigo" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://secure.diigo.com/post?url='+glo_url+'&title='+glo_title+'">Diigo</a></div>';	
		}
		else if(network==="care2"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){tmpTag='<div id="st_care2" class="switem">';}
			else{tmpTag='<div id="st_care2" class="switem more">';}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://www.care2.com/news/compose?share[link_url]='+glo_url+'&share[title]='+glo_title+'">Care2</a></div>';	
		}
		else if(network==="funp"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_funp" class="switem">';
			}
			else{
				tmpTag='<div id="st_funp" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://funp.com/pages/submit/add.php?title='+glo_title+'&url='+glo_url+'&via=tools">Funp</a></div>';	
		}
		else if(network==="kirtsy"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_kirtsy" class="switem">';
			}
			else{
				tmpTag='<div id="st_kirtsy" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://www.kirtsy.com/submit.php?url='+glo_url+'">Kirtsy</a></div>';	
		}
		else if(network==="hugg"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_hugg" class="switem">';
			}
			else{
				tmpTag='<div id="st_hugg" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://www.hugg.com/node/add/storylink?edit[title]='+glo_title+'&edit[url]='+glo_url+'">Hugg</a></div>';	
		}
		else if(network==="xanga"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_xanga" class="switem">';
			}
			else{
				tmpTag='<div id="st_xanga" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://www.xanga.com/private/editorx.aspx?t='+glo_title+'&u='+glo_url+'&s='+glo_content+'">Xanga</a></div>';	
		}
		else if(network==="friendfeed"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_friendfeed" class="switem">';
			}
			else{
				tmpTag='<div id="st_friendfeed" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://friendfeed.com/share?url='+glo_url+'&title='+glo_title+'">FriendFeed</a></div>';	
		}
		else if(network==="sphinn"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){tmpTag='<div id="st_sphinn" class="switem">';}
			else{tmpTag='<div id="st_sphinn" class="switem more">';}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://sphinn.com/submit.php?url='+glo_url+'">Sphinn</a></div>';	
		}
		else if(network==="linkedin"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_linkedin" class="switem">';
			}
			else{
				tmpTag='<div id="st_linkedin" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://www.linkedin.com/shareArticle?mini=true&url='+glo_url+'&title='+glo_title+'&summary=&source=">LinkedIn</a></div>';	
		}
		else if(network==="ybuzz"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_ybuzz" class="switem">';
			}
			else{
				tmpTag='<div id="st_ybuzz" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://buzz.yahoo.com/submit/?submitUrl='+glo_url+'&submitHeadline='+glo_title+'">Buzz Up!</a></div>';	
		}
		else if(network==="dealsplus"){
			if(glo_totalRegSW<displayNum && sw_type==="regular"){
				tmpTag='<div id="st_dealsplus" class="switem">';
			}
			else{
				tmpTag='<div id="st_dealsplus" class="switem more">';
			}
			tmpTag+='<a class="sw_a" rel="external" style="color:'+glo_linkfg+'" href="http://dealspl.us/add.php?ibm=1&url='+glo_url+'">Dealspl.us</a></div>';	
		}
	glo_totalRegSW++;
	writeSwDiv(tmpTag);
	}



	function writeSwDiv(divTag){
		glo_swDiv+=divTag;
	}

	function createSwList(){
		glo_swDiv="";
		glo_totalRegSW=0;
		glo_swArray_more=[];
		posterLinks();
		if(glo_swArray.length<1){setGlobals("services",glo_default_services);}
		for(var i=0;i<glo_default_swArray.length;i++){
			var found_flag=false;
			for(var j=0;j<glo_swArray.length;j++){
				if(glo_default_swArray[i]===glo_swArray[j]){found_flag=true;j=glo_swArray.length;}
			}
			if(found_flag){createSWlinks(glo_default_swArray[i],"regular");}
			else if(!found_flag){ glo_swArray_more.push(glo_default_swArray[i]);}
		}
		processMoreSW();
		document.getElementById('swdiv').innerHTML=glo_swDiv;	
		createLogBinder();
		handelExternalLinks();
		if(!glo_pageOptions){
			$$('a').setStyle('color',glo_linkfg);
			var l = luminescence(glo_linkfg);
	    	document.getElementById('whatsThisLink').style.color = l > 0.5 ? '#000' : '#fff';
	 		document.getElementById('whatsThis').style.color = l > 0.5 ? '#000' : '#fff';
		}
		$$('.privacyLink a').setStyle('color','#666666');
	}

	function processMoreSW(){
		for(i=0;i<glo_swArray_more.length;i++){
			createSWlinks(glo_swArray_more[i],"more");
		}
	}
	
	function popupOpen(blah){

		//var elem=document.getElementById("st_digg");
		var source="";
		var anchors = blah.getElementsByTagName("a");
		for (var i=0; i<anchors.length; i++) {
			var anchor = anchors[i];
			source=anchor.href;
		}
		window.open(source,"stpopup","width=970,height=700,location=1,toolbar=1,scrollbars=1,menubar=1,resizable=1"); 
		return false;
	}
	function popupOpen2(blah){
		var source=blah.href;
		try{window.open(source,"stpopup","width=970,height=700,location=1,toolbar=1,scrollbars=1,menubar=1,resizable=1"); }catch(err){}
		
		return false;
	}

	function createLogBinder(){
		$('st_reddit').addEvent('click', function(){logSW('reddit.com');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_digg').addEvent('click', function(){logSW('digg.com');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_facebook').addEvent('click', function(){logSW('facebook.com');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_myspace').addEvent('click', function(){logSW('myspace.com');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_delicious').addEvent('click', function(){logSW('del.icio.us');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_stumbleupon').addEvent('click', function(){logSW('stumbleupon.com');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_technorati').addEvent('click', function(){logSW('technorati.com');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_google_bmarks').addEvent('click', function(){logSW('google.com');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_yahoo_bmarks').addEvent('click', function(){logSW('bookmarks.yahoo.com');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_yahoo_myweb').addEvent('click', function(){logSW('myweb2.search.yahoo.com');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_windows_live').addEvent('click', function(){logSW('favorites.live.com');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_propeller').addEvent('click', function(){logSW('propeller.com');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_slashdot').addEvent('click', function(){logSW('slashdot.org');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_newsvine').addEvent('click', function(){logSW('newsvine.com');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_n4g').addEvent('click', function(){logSW('n4g.com');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_mixx').addEvent('click', function(){logSW('mixx.com');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_blinklist').addEvent('click', function(){logSW('blinklist.com');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_furl').addEvent('click', function(){logSW('furl.net');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_magnolia').addEvent('click', function(){logSW('ma.gnolia.com');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_mister_wong').addEvent('click', function(){logSW('mister-wong.com');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_blogmarks').addEvent('click', function(){logSW('blogmarks.net');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_faves').addEvent('click', function(){logSW('faves.com');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_current').addEvent('click', function(){logSW('current.com');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_simpy').addEvent('click', function(){logSW('simpy.com');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_meneame').addEvent('click', function(){logSW('meneame.net');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_yigg').addEvent('click', function(){logSW('yigg.de');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_oknotizie').addEvent('click', function(){logSW('oknotizie.alice.it');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_fresqui').addEvent('click', function(){logSW('ocio.fresqui.com');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_diigo').addEvent('click', function(){logSW('secure.diigo.com');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_care2').addEvent('click', function(){logSW('care2.com');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_funp').addEvent('click', function(){logSW('funp.com');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_kirtsy').addEvent('click', function(){logSW('kirtsy.com');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_hugg').addEvent('click', function(){logSW('hugg.com');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_xanga').addEvent('click', function(){logSW('xanga.com');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_friendfeed').addEvent('click', function(){logSW('friendfeed.com');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_sphinn').addEvent('click', function(){logSW('sphinn.com');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_linkedin').addEvent('click', function(){logSW('linkedin.com');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_ybuzz').addEvent('click', function(){logSW('buzz.yahoo.com');if(glo_options_popup==true){popupOpen(this);return false;}});
		$('st_dealsplus').addEvent('click', function(){logSW('dealspl.us');if(glo_options_popup==true){popupOpen(this);return false;}});
	}


	function showTP(){
		hidePosters();
		$('posterBox').setStyle('display','block');
		$('tpPoster').setStyle('display','block');
		$('biggerPosters').setStyle('display','none');
		$('tpUsername').setStyle('display','block');
		$('tpPassword').setStyle('display','block');	
		$$('.postTabWorking').setStyle('display','none');
		$$('.postTabSuccess').setStyle('display','none');
		$$('.postTabError').setStyle('display','none');
		$$('.postTabDomain').setStyle('display','none');
		$('tpBlogId').setStyle('display','none');
		$('btnTpSubmit').setStyle('display','none');
		$('btnTpPost').setStyle('display','inline');
		$('btnTpPublish').setStyle('display','inline');
		$$('.messaging').setStyle('display','none');
		$('postto').setStyle('display','none');
	
	}

	function showBlogger(){
		hidePosters();
		$('posterBox').setStyle('display','block');
		$('bloggerPoster').setStyle('display','block');
		$('biggerPosters').setStyle('display','none');
		$('bloggerUsername').setStyle('display','block');
		$('bloggerPassword').setStyle('display','block');	
		$$('.postTabWorking').setStyle('display','none');
		$$('.postTabSuccess').setStyle('display','none');
		$$('.postTabError').setStyle('display','none');
		$$('.postTabDomain').setStyle('display','none');
		$('bloggerBlogId').setStyle('display','none');
		$('btnBloggerSubmit').setStyle('display','none');
		$('btnBloggerPost').setStyle('display','inline');
		$('btnBloggerPublish').setStyle('display','inline');
		$$('.messaging').setStyle('display','none');
		$('postto').setStyle('display','none');
	}


	function showWp(){
		hidePosters();
		$('posterBox').setStyle('display','block');
		$('biggerPosters').setStyle('display','none');
		$('wpPoster').setStyle('display','block');
		$('wpUsername').setStyle('display','block');
		$('wpPassword').setStyle('display','block');
		$('wpURL').setStyle('display','block');
		$$('.postTabWorking').setStyle('display','none');
		$$('.postTabSuccess').setStyle('display','none');
		$$('.postTabError').setStyle('display','none');
		$$('.postTabDomain').setStyle('display','none');
		$('btnWpSubmit').setStyle('display','inline');
		$$('.messaging').setStyle('display','none');
		$('postto').setStyle('display','none');
	}
	
	function showHi5(){
		hidePosters();
		showBigPoster();
		$('hi5Poster').setStyle('display','block');
		$('hi5Username').setStyle('display','block');
		$('hi5Password').setStyle('display','block');
		$('hi5Select').setStyle('display','block');
		$('hi5Comment').setStyle('display','block');
		$('btnHi5Submit').setStyle('display','inline');
		$$('.messaging').setStyle('display','none');
		$('postto').setStyle('display','none');
	}	
		
	
	function showOrkut(){
		hidePosters();
		showBigPoster();
		glo_Orkutcaptchaurl="";
		glo_Orkutcookiefile="";
		glo_Orkutpost_token="";
		glo_Orkutsignature="";
		glo_Orkutpostdata="";
		Orkutcaptcha=false;
		$('orkutPoster').setStyle('display','block');
		$('orkutUsername').setStyle('display','block');
		$('orkutPassword').setStyle('display','block');
		$('orkutComment').setStyle('display','block');
		$('btnOrkutSubmit').setStyle('display','inline');
		$$('.messaging').setStyle('display','none');
		$('postto').setStyle('display','none');
		$('orkutCaptcha').setStyle('display','none');
		$('orkutCaptchaImage').setStyle('display','none');
	}
	function showLive_journal(){
		hidePosters();
		showBigPoster();
		$('live_journalPoster').setStyle('display','block');
		$('live_journalUsername').setStyle('display','block');
		$('live_journalPassword').setStyle('display','block');
		$('live_journalComment').setStyle('display','block');
		$('btnLive_journalSubmit').setStyle('display','inline');
		$$('.messaging').setStyle('display','none');
		$('postto').setStyle('display','none');
	}
	function showFriendster(){
		hidePosters();
		showBigPoster();
		$('friendsterPoster').setStyle('display','block');
		$('friendsterUsername').setStyle('display','block');
		$('friendsterPassword').setStyle('display','block');
		$('friendsterSelect').setStyle('display','block');
		$('friendsterComment').setStyle('display','block');
		$('btnFriendsterSubmit').setStyle('display','inline');
		$$('.messaging').setStyle('display','none');
		$('postto').setStyle('display','none');
	}				
	
	function showBigPoster(){
		$('posterBox').setStyle('display','none');
		$('postto').setStyle('display','none');
		$$('.messaging').setStyle('display','none');
		$('biggerPosters').setStyle('display','block');
		$$('.postTabWorking').setStyle('display','none');
		$$('.postTabSuccess').setStyle('display','none');
		$$('.postTabError').setStyle('display','none');
		$$('.postTabDomain').setStyle('display','none');
		$$('.messaging').setStyle('display','none');
		$('postto').setStyle('display','none');
	
	}

	function hideBigPoster(){
		$('posterBox').setStyle('display','block');
		$('postto').setStyle('display','block');
		$$('.messaging').setStyle('display','block');
		$('biggerPosters').setStyle('display','none');
		$$('.postTabWorking').setStyle('display','none');
		$$('.postTabSuccess').setStyle('display','none');
		$$('.postTabError').setStyle('display','none');
		$$('.postTabDomain').setStyle('display','none');
		$$('.messaging').setStyle('display','block');
		$('postto').setStyle('display','block');	
	}

	function closePosterBox(){
		$('posterBox').setStyle('display','none');
		emptyInputs();
		hidePosters();
		hideBigPoster();
		$('posterBox').setStyle('display','none');
	
		$$('.messaging').setStyle('display','block');
		$('postto').setStyle('display','block');
	}

	function posting(){
		$('posterBox').setStyle('display','block');
		hidePosters();
		$$('.postTabWorking').setStyle('display','block');
		$$('.postTabSuccess').setStyle('display','none');
		$$('.postTabError').setStyle('display','none');
		$$('.postTabDomain').setStyle('display','none');
		$('tpBlogId').setStyle('display','none');
	
	}
	function posted(){
		hidePosters();
		$$('.postTabError').set('html','');
		$('posterBox').setStyle('display','block');
		$$('.postTabWorking').setStyle('display','none');
		$$('.postTabSuccess').setStyle('display','block');
		$$('.postTabError').setStyle('display','none');
		$$('.postTabDomain').setStyle('display','none');
	}
	function hidePosters()
	{
		$('tpPoster').setStyle('display','none');
		$('wpPoster').setStyle('display','none');
		$('hi5Poster').setStyle('display','none');	
		$('bloggerPoster').setStyle('display','none');
		$('orkutPoster').setStyle('display','none');	
		$('live_journalPoster').setStyle('display','none');	
		$('friendsterPoster').setStyle('display','none');	
	}


	function getObjects(){
		var request=new Request({
			method: "post",
			url: "/api/getCache_ws.php",
			data: "key="+glo_guid+"&return=json",
			onSuccess:getObjects_onSuccess
		});
		//request.addEvent("onSuccess", getObjects_onSuccess.bind(this));
		request.send();
	}

	function getObjects_onSuccess(responseText,responseXML){
		var response = JSON.decode(responseText);
		if (response.status == "SUCCESS") {
			var newJsonData=Url.decode(response.data);
			var newResp=JSON.decode(newJsonData);
			for(i=0;i<newResp.length;i++){
				setGlobals("glo_title_array",newResp[i].title);
				setGlobals("glo_type_array",newResp[i].type);
				setGlobals("glo_summary_array",newResp[i].summary);
				setGlobals("glo_content_array",newResp[i].content);
				setGlobals("glo_url_array",newResp[i].url);
				setGlobals("glo_icon_array",newResp[i].icon);
				setGlobals("glo_category_array",newResp[i].category);
				setGlobals("glo_updated_array",newResp[i].updated);
				setGlobals("glo_published_array",newResp[i].published);
				setGlobals("glo_author_array",newResp[i].author);
				setGlobals("glo_thumb_array",newResp[i].icon);
				if(newResp[i].tags){setGlobals("glo_tags_array",newResp[i].tags);}
				if(newResp[i].description){setGlobals("glo_description_array",newResp[i].description);}
			}
			setValues();
		} 
	}

	function processFrag(){
		glo_jsonStr=decodeURIComponent(glo_jsonStr);
		var tmp=glo_jsonStr;
		var newResp=[];
		tmp=decodeURIComponent(tmp);
		tmp=decodeURIComponent(tmp);
		newResp=eval(tmp);
		for(var i=0;i<newResp.length;i++){
			setGlobals("glo_title_array",newResp[i].title);
			setGlobals("glo_type_array",newResp[i].type);
			setGlobals("glo_summary_array",newResp[i].summary);
			setGlobals("glo_content_array",newResp[i].content);
			setGlobals("glo_url_array",newResp[i].url);
			setGlobals("glo_icon_array",newResp[i].icon);
			setGlobals("glo_category_array",newResp[i].category);
			setGlobals("glo_updated_array",newResp[i].updated);
			setGlobals("glo_published_array",newResp[i].published);
			setGlobals("glo_author_array",newResp[i].author);
			setGlobals("glo_thumb_array",newResp[i].icon);
			if(newResp[i].tags){setGlobals("glo_tags_array",newResp[i].tags);}
			if(newResp[i].description){setGlobals("glo_description_array",newResp[i].description);}
		}
		setValues();
	}

	var Url = {
		encode : function (string) {
			return escape(this._utf8_encode(string));
		},
		decode : function (string) {
			return this._utf8_decode(unescape(string));
		},
		_utf8_encode : function (string) {
			string = string.replace(/\r\n/g,"\n");
			var utftext = "";
			for (var n = 0; n < string.length; n++) {
				var c = string.charCodeAt(n);
				if (c < 128) {
					utftext += String.fromCharCode(c);
				}
				else if((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				}
				else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
			}
			return utftext;
		},
		_utf8_decode : function (utftext) {
			var string = "";
			var i = 0;
			var c = c1 = c2 = 0;
			while ( i < utftext.length ) {

				c = utftext.charCodeAt(i);

				if (c < 128) {
					string += String.fromCharCode(c);
					i++;
				}
				else if((c > 191) && (c < 224)) {
					c2 = utftext.charCodeAt(i+1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				}
				else {
					c2 = utftext.charCodeAt(i+1);
					c3 = utftext.charCodeAt(i+2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
			}
			return string;
		}
	}

	function setValues(){
		if(glo_guid_index!==null && glo_url_array.length>0){
			setGlobals("url",glo_url_array[glo_guid_index]);
			setGlobals("title",glo_title_array[glo_guid_index]);
			setGlobals("type",glo_type_array[glo_guid_index]);
			setGlobals("summary",glo_summary_array[glo_guid_index]);
			setGlobals("content",glo_content_array[glo_guid_index]);			
			setGlobals("icon",glo_icon_array[glo_guid_index]);
			setGlobals("category",glo_category_array[glo_guid_index]);
			setGlobals("updated",glo_updated_array[glo_guid_index]);
			setGlobals("published",glo_published_array[glo_guid_index]);
			setGlobals("author",glo_author_array[glo_guid_index]);
			setGlobals("glo_tags",glo_tags_array[glo_guid_index]);
			setGlobals("glo_thumb",glo_thumb_array[glo_guid_index]);
			setGlobals("glo_description",glo_description_array[glo_guid_index]);
			createSwList();
			getTinyURL(glo_url_array[glo_guid_index]);
		}
	}

	function posterLinks(){
		var facebook_tag='<a style="color:'+glo_linkfg+'" href="http://www.facebook.com/share.php?u='+glo_url+'" rel="external">Facebook</a>';
		var myspace_tag='<a style="color:'+glo_linkfg+'" href="http://www.myspace.com/Modules/PostTo/Pages/?l=3&amp;u='+glo_url+'&amp;t='+glo_title+'&amp;c='+glo_content+'%3Cp%3EPowered+by+%3Ca+href%3D%22http%3A%2F%2Fsharethis.com%22%3EShareThis%3C%2Fa%3E%3C%2Fp%3E" rel="external">MySpace</a>';
		$("facebook_poster").set('html',facebook_tag);
		$("myspace_poster").set('html',myspace_tag);
		$('facebook_poster').addEvent('click', function(){
			logEvent("facebook.com","post");
			if(glo_options_popup==true){
				popupOpen(this);
				return false;
			}
		});
		$('myspace_poster').addEvent('click', function(){
			logEvent("myspace.com","post");
			if(glo_options_popup==true){
				popupOpen(this);
				return false;
			}
		});
	}


	function searchName(searchStr){
		var reg = new RegExp("^"+searchStr);
		var i=0;
		var selectedType=$('txtUsing').value;
		for(var i=0;i<glo_contName.length;i++){
			// done to remove facebook from search
			var tmp_name=glo_contName[i].toLowerCase();
			switch(selectedType) {
				case "MYSPACE":
					if(reg.test(tmp_name) && glo_contProto[i]!=="FACEBOOK" && glo_contProto[i]==="MYSPACE"){
						contAddRes(i);
					}
					break;
				case "AIM":
					if(reg.test(tmp_name) && glo_contProto[i]!=="FACEBOOK" && glo_contProto[i]==="AIM"){
						contAddRes(i);
					}
					break;
				case "EMAIL":
					if(reg.test(tmp_name) && glo_contProto[i]!=="FACEBOOK" && glo_contProto[i]==="EMAIL"){
						contAddRes(i);
					}
					break;
				case "ALL":
					if(reg.test(tmp_name) && glo_contProto[i]!=="FACEBOOK"){
						contAddRes(i);
					}
					break;
				default:
					// do nothing
			}
		}
	}

	function searchName2(searchStr){
		if(glo_contResNum<5){
			var reg = new RegExp("^"+" "+searchStr);
			var i=0;
			var selectedType=$('txtUsing').value;
			for(var i=0;i<glo_contName.length;i++){
				//done to remove facebook from search
				var tmp_name=glo_contName[i].toLowerCase();
				switch(selectedType) {
					case "MYSPACE":
						if(reg.test(tmp_name) && glo_contProto[i]!=="FACEBOOK" && glo_contProto[i]==="MYSPACE"){
							contAddRes(i);
						}
						break;
					case "AIM":
						if(reg.test(tmp_name) && glo_contProto[i]!=="FACEBOOK" && glo_contProto[i]==="AIM"){
							contAddRes(i);
						}
						break;
					case "EMAIL":
						if(reg.test(tmp_name) && glo_contProto[i]!=="FACEBOOK" && glo_contProto[i]==="EMAIL"){
							contAddRes(i);
						}
						break;
					case "ALL":
						if(reg.test(tmp_name) && glo_contProto[i]!=="FACEBOOK"){
							contAddRes(i);
						}
						break;
					default:
						// do nothing
				}
			}
		}
	}
	// searches f n for first_name last_name
	function searchName3(searchStr){
		if(searchStr.search(/ /)>=0){	
			if(glo_contResNum<5){
				var i=0;
				var tmp_name1="";
				var tmp_name2="";
				var tmp_name=searchStr.toLowerCase();
				tmp_name=tmp_name.split(" ");
				if(tmp_name.length>1){
					tmp_name1=tmp_name[0];
					tmp_name2=tmp_name[1];
				}
				var selectedType=$('txtUsing').value;
				for(var i=0;i<glo_contName.length;i++){	
					tmp_name=glo_contName[i].toLowerCase();
					var reg = new RegExp("^"+tmp_name1);
					var reg2 = new RegExp(" "+tmp_name2,"gi");
					switch(selectedType) {
						case "MYSPACE":
							if(reg.test(tmp_name) && glo_contProto[i]!=="FACEBOOK" && glo_contProto[i]==="MYSPACE" && reg2.test(tmp_name)){
								contAddRes(i);
							}
							break;
						case "AIM":
							if(reg.test(tmp_name) && glo_contProto[i]!=="FACEBOOK" && glo_contProto[i]==="AIM" && reg2.test(tmp_name)){
								contAddRes(i);
							}
							break;
						case "EMAIL":
							if(reg.test(tmp_name) && glo_contProto[i]!=="FACEBOOK" && glo_contProto[i]==="EMAIL" && reg2.test(tmp_name)){
								contAddRes(i);
							}
							break;
						case "ALL":
							if(reg.test(tmp_name) && glo_contProto[i]!=="FACEBOOK" && reg2.test(tmp_name)){
								contAddRes(i);
							}
							break;
						default:
							// do nothing
					}
				}
			}
		}
	}

	//searches for last name
	function searchName4(searchStr){
		if(glo_contResNum<5){
			var i=0;
			var tmp_name1="";
			var tmp_name2="";
			searchStr=searchStr.toLowerCase();

			var selectedType=$('txtUsing').value;
			for(var i=0;i<glo_contName.length;i++){	
				tmp_name=glo_contName[i].toLowerCase();
				var reg = new RegExp(" "+searchStr,"gi");
				switch(selectedType) {
					case "MYSPACE":
						if(reg.test(tmp_name) && glo_contProto[i]!=="FACEBOOK" && glo_contProto[i]==="MYSPACE"){
							contAddRes(i);
						}
						break;
					case "AIM":
						if(reg.test(tmp_name) && glo_contProto[i]!=="FACEBOOK" && glo_contProto[i]==="AIM"){
							contAddRes(i);
						}
						break;
					case "EMAIL":
						if(reg.test(tmp_name) && glo_contProto[i]!=="FACEBOOK" && glo_contProto[i]==="EMAIL"){
							contAddRes(i);
						}
						break;
					case "ALL":
						if(reg.test(tmp_name) && glo_contProto[i]!=="FACEBOOK"){
							contAddRes(i);
						}
						break;
					default:
						// do nothing
				}
			}
		}
	}

	// do searches for dave doster
	function searchName5(searchStr){
			if(glo_contResNum<5){
				var i=0;
				var tmp_name1="";
				var tmp_name2="";
				var tmp_name=searchStr.toLowerCase();
				if(tmp_name.length>1){
					tmp_name1=tmp_name[0];
					tmp_name2=tmp_name.substring(1);
				}
				var selectedType=$('txtUsing').value;
				for(var i=0;i<glo_contName.length;i++){	
					tmp_name=glo_contName[i].toLowerCase();
					var reg = new RegExp("^"+tmp_name1);
					var reg2 = new RegExp(" "+tmp_name2,"gi");
				
					switch(selectedType) {
						case "MYSPACE":
							if(reg.test(tmp_name) && glo_contProto[i]!=="FACEBOOK" && glo_contProto[i]==="MYSPACE" && reg2.test(tmp_name)){
								contAddRes(i);
							}
							break;
						case "AIM":
							if(reg.test(tmp_name) && glo_contProto[i]!=="FACEBOOK" && glo_contProto[i]==="AIM" && reg2.test(tmp_name)){
								contAddRes(i);
							}
							break;
						case "EMAIL":
							if(reg.test(tmp_name) && glo_contProto[i]!=="FACEBOOK" && glo_contProto[i]==="EMAIL" && reg2.test(tmp_name)){
								contAddRes(i);
							}
							break;
						case "ALL":
							if(reg.test(tmp_name) && glo_contProto[i]!=="FACEBOOK" && reg2.test(tmp_name)){
								contAddRes(i);
							}
							break;
						default:
							// do nothing
					}
				}
			}
	}


	function contAddRes(num){
		var flag=false;
		for(i=0;i<glo_contRes.length;i++)
		{
			if(glo_contRes[i]===num)
			{
			flag=true;
			}
		}
	
		if(glo_contResNum<5 && !flag){
			glo_contRes.push(num);
			glo_contResNum++;		
		}
	}

	function searchAdd(searchStr){
	if(glo_contResNum<5){
		var isNum=false;
			
			if(searchStr>=0){
				var a="\\+?1?"+searchStr+"[0-9]*";
				var reg = new RegExp(a);
				isNum=true;
			}
			else if(searchStr[0]=="@") {
				var reg = new RegExp(searchStr,"gi");
			}
			else{
				var reg = new RegExp("^"+searchStr);

			}
			var i=0;
			var selectedType=$('txtUsing').value;
	
			for(var i=0;i<glo_contAdd.length;i++){
				var tmp_add=glo_contAdd[i].toLowerCase();
					if(selectedType==="SMS" || isNum==true){
						if(reg.test(tmp_add) && glo_contProto[i]!=="FACEBOOK" && glo_contProto[i]==="SMS"){
							contAddRes(i);
						}
					}
					else if(selectedType==="MYSPACE"){
						if(reg.test(tmp_add) && glo_contProto[i]!=="FACEBOOK" && glo_contProto[i]==="MYSPACE" && glo_contProto[i]!=="SMS"){
							contAddRes(i);
						}
					}
					else if(selectedType==="AIM"){
						if(reg.test(tmp_add) && glo_contProto[i]!=="FACEBOOK" && glo_contProto[i]==="AIM" && glo_contProto[i]!=="SMS"){
							contAddRes(i);
						}
					}
					else if(selectedType==="EMAIL"){
						if(reg.test(tmp_add) && glo_contProto[i]!=="FACEBOOK" && glo_contProto[i]==="EMAIL" && glo_contProto[i]!=="SMS"){
							contAddRes(i);
						}
					}
					else if(selectedType==="ALL"){
						if(reg.test(tmp_add) && glo_contProto[i]!=="FACEBOOK"){
							contAddRes(i);
						}
					}		
			}
		}		
	}

	function searchContacts(){
		if(document.getElementById("txtTo").value!==glo_last_search && document.getElementById("txtTo").value!==""){	
			$('boxToInfo').set('html',"");
			var field=document.getElementById("txtTo").value;
			field=field.toLowerCase();
			glo_last_search=field;
			glo_contResNum=0;
			glo_contRes=[];
			if(field>=0){
				searchAdd(field);
			}
			else{
				searchName(field);
				if(glo_contResNum<5){
					searchName2(field);
				}
				if(glo_contResNum<5){
					searchName3(field);
				}
				if(glo_contResNum<5){
						searchAdd(field);
				}
				if(glo_contResNum<5){
					searchName4(field);
				}
				if(glo_contResNum<5){
					searchName5(field);
				}
			}
		
			var result="";	
			$('boxToInfo').set('html',"");
			for(var i=0;i<glo_contResNum;i++){
				result="Protocol:"+glo_contProto[glo_contRes[i]]+" Name:"+glo_contName[glo_contRes[i]]+" Address:"+glo_contAdd[glo_contRes[i]]+" Num:"+glo_contRes[i];
				$('boxToInfo').set('html',$('boxToInfo').get('html')+txtSuggest(glo_contRes[i]));
			}
			if ( '' === $('boxToInfo').get('html') ) {
				hideSuggest();
				document.getElementById("txtTo").value = field;
			}
		}

	}

	function txtSuggest(id){
		var type=glo_contProto[id];
		var name=glo_contName[id];
		var disp_address=glo_contAdd[id];  
		var address=glo_contAdd[id];
		var divid="uniq_"+id;
		var	suggestion="";
		if(type==="MYSPACE"){
			disp_address=glo_contName[id];
		}
		suggestion+='<div id='+divid+' class="boxSuggestItem" onmouseover="hoverSelection(this);" onclick="addToSenders(this);">';
		suggestion+='<span class="ico_'+type+'"></span><span class="network_cntr">'+name+'</span><br/><span class="address">'+disp_address+'</span><span style="display:none">'+address+'</span>';
		suggestion+='</div>';
		showSuggest();
		return suggestion;
	}

	function txtGreyBox(id,newAdd){
		var type=glo_contProto[id];
		var name=glo_contName[id];
		var disp_address=glo_contAdd[id]; 
		var address=glo_contAdd[id];
		var divid="greyBox_"+id;
		var addId="addBox_"+id;
		var parentID="paren_"+divid;
		var rtnStr="";	
		var dispType="";
		switch(type){ // re-write type if needed
			case "EMAIL":
				type="E-mail";
				break;
			case "MYSPACE":
				type="MySpace";
				break;
			case "AIM":
				// do nothing
			case "SMS":
				// do nothing
			default:
				// do nothing
		}
		
		if(glo_greyBoxNum%2===0){
			rtnStr+='<div id="'+parentID+'" class="boxRecipientsItem even">';
		}
		else{
			rtnStr+='<div id="'+parentID+'" class="boxRecipientsItem odd">';
		}
		rtnStr+='<span class="txtRecipientsItemDisplay">'+name+'</span>';
		rtnStr+='			<span class="txtRecipientsItemUsing"> using '+type+'</span>';
		if(newAdd===true && glo_isLoggedIn===true){
			rtnStr+='	<div id="'+addId+'" class="boxRecipientsItemAdd" onclick="showAddAnother(this);"/></div>';
		}
		rtnStr+='			<div id="'+divid+'" class="boxRecipientsItemDelete" onclick="delGreyItem(this);"/></div>';
		rtnStr+='</div>';
		hideSuggest();
		return rtnStr;
	}

	function delGreyItem(blah){
		var d = document.getElementById('boxAddressList');
		var rm=document.getElementById("paren_"+blah.id);
		var id=blah.id;
		id=id.replace(/greyBox_/,"");
		removeFromQueue(id);
		d.removeChild(rm);
		if(glo_msgArray.length==0){$('boxAddressList').setStyle('display','none');}
	}

	function hideSuggest(){
		$('boxToMessage').setStyle('z-index','10');
		$('boxToYourAddr').setStyle('z-index','10');
		$('boxToInfo').setStyle('display','none');
		$('txtTo').set('value','');
		glo_selected_item=0;	
		$$('.activeItem').removeClass('activeItem');
	}

	function showSuggest(){
		$('boxToMessage').setStyle('z-index','1');
		$('boxToYourAddr').setStyle('z-index','1');
		$('boxToInfo').setStyle('display','block');	
	}

	function hoverSelection(elem){
		var id = elem.id;
		$$('.activeItem').removeClass('activeItem');
		$(id).addClass('activeItem');
	}

	function addToSenders(sender){
		var id=sender.id.replace(/uniq_/,"");
		var outHTML="";
		addToMsg(id);
		glo_greyBoxNum=$$('div[id^=paren_greyBox_]').length;
		outHTML+=txtGreyBox(id);	
		$('boxAddressList').set('html',$('boxAddressList').get('html')+outHTML);
		$('boxAddressList').setStyle('display','block');
		hideSuggest();
		$('txtTo').value="";
	}

	function addToSenders2(id){
		addToMsg(id);
		var outHTML="";
		glo_greyBoxNum=$$('div[id^=paren_greyBox_]').length;
		outHTML+=txtGreyBox(id,true);	
		$('boxAddressList').set('html',$('boxAddressList').get('html')+outHTML);
		$('boxAddressList').setStyle('display','block');
		hideSuggest();
		$('txtTo').value="";
	}

	function clearMsgQueue()
	{
		var d = document.getElementById('boxAddressList');
		var paren_greyBox=$$('div[id^=paren_greyBox_]');
		var id="";
		tmpObj="";
		for(k=0;k<paren_greyBox.length;k++){
			id=paren_greyBox[k].id;	
			tmpObj=document.getElementById(id);	
			id=id.replace(/paren_greyBox_/,"");	
			removeFromQueue(id);	
			d.removeChild(tmpObj);	
		}	
	}

	function addToMsg(id){
		glo_msgArray.push(id);
	}

	function removeFromQueue(id){
		var tmpArray=[];
		for(i=0;i<glo_msgArray.length;i++)
		{
			if(glo_msgArray[i].toString()!==id)
			{	
				tmpArray.push(glo_msgArray[i]);
			}
		}
		var tmpnum=glo_msgArray.length-tmpArray.length;
		glo_msgArray=tmpArray;
	
	}

	function processSendQueue(){
		var id="";
		var rcp=[];
		var tmp_rcp=[];
		for(var i=0;i<glo_msgArray.length;i++){
			id=glo_msgArray[i];
			if(glo_contProto[id].toLowerCase()=="sms"){
				var tmp_sms=glo_contAdd[id];
				tmp_sms=tmp_sms.replace(/[^\d]/g,"");
				if(tmp_sms[0]!=="1"){
					tmp_sms="1"+tmp_sms;
				}
				glo_contAdd[id]=tmp_sms;
			}
			rcp[i]={type:glo_contProto[id].toLowerCase(),name:glo_contName[id],address:glo_contAdd[id]};
			tmp_rcp.push(glo_contProto[id]);	
		}
		glo_destinations = tmp_rcp.join(",");
		glo_destinations=glo_destinations.toLowerCase();
		rcp=JSON.encode(rcp);
		createMessage(rcp);	
	}

	function createMessage(recipients){	
		glo_msgArray=[];
		var err_isTrue=false;
		if(glo_isLoggedIn===false){
			var tmpEml=$('txtYourAddr').value;
			if(isEmail(tmpEml)){
				glo_userEmail=tmpEml;
			}
			else{
				alert("Please enter your valid E-mail address");
				err_isTrue=true;
			}
		}
		var paren_greyBox=$$('div[id^=paren_greyBox_]');
		if(paren_greyBox.length===0){
			alert("Please enter a recipient");
			err_isTrue=true;
		}
		var sender=glo_userEmail;
		var subject=decodeURIComponent(glo_title);
		if(subject=="" || subject=="undefined"){
			subject=decodeURIComponent(glo_url);
		}
		glo_type="";
		var comment=$('txtMessage').value;
		var publisher=glo_publisher;
		glo_content=Url.decode(glo_content);
		glo_content=encodeURIComponent(glo_content);
		if(!glo_description || glo_description==undefined || glo_description=="undefined"){glo_description="";}
		if(!glo_tags){glo_tags="";}
		if(glo_icon){glo_thumb=glo_icon;}
		var objects=[];
		objects[0]={type:glo_type, url:glo_url, title:glo_title, thumbnail:glo_thumb, embed:glo_content, description:glo_summary, tags:glo_tags };
		objects=JSON.encode(objects);
		var	data= "sender="+encodeURIComponent(sender)+"&subject="+encodeURIComponent(subject)+"&comment="+encodeURIComponent(comment)+"&publisher="+publisher+"&objects="+encodeURIComponent(objects)+"&recipients="+encodeURIComponent(recipients)+"&sessionID="+glo_sessionID+"&return=JSON";
		if(!err_isTrue){
			var request=new Request({
				method: "post",
				url: "/api/createMessage_ws.php",
				data: data,
				onSuccess:createMessage_onSuccess
			});
			request.send();					
			$$('.success').setStyle('display','none');
			$$('.working').setStyle('display','inline');
			$('send_container').setStyle('display','none');
			$('doneScreen').setStyle('display','block');
		}
	}

	function createMessage_onSuccess(responseText, responseXML) {
		logEvent(glo_destinations,"share");	
		var resp=JSON.decode(responseText);
		if(resp.status==="SUCCESS"){
			emptyInputs();
			glo_msgArray=[];
	     	$$('.success').setStyle('display','inline');
			$$('.working').setStyle('display','none');
		}
		else{
			$$('.success').setStyle('display','none');
			$$('.working').setStyle('display','none');
			$$('.error').setStyle('display','inline');
		}
	}

	var glo_selected_item=0;

	function select_item(blur){
		var retval;
		var a =$$('.activeItem');
		if(a[0]){
			addToSenders(a[0]);
		}
		else{
	    	var tmpAdd= document.getElementById("txtTo").value;
		    var tmpId=determineType(tmpAdd,blur);
			if(tmpId>=0 && tmpId!==false){
				addToSenders2(tmpId);
					retval = true;
			} 
			else {
				$('txtTo').value = tmpAdd;
				if(!blur){$('txtTo').focus();}
				retval = false;
			}
		}
		return retval;
	}

	function moveup_item(){
		var totalItems=glo_contResNum-1;
		if(glo_selected_item>=0){
			glo_selected_item--;
			if(glo_selected_item<0){glo_selected_item=0;}
			if(glo_selected_item>totalItems){glo_selected_item=totalItems;}
			var a =$$('.boxSuggestItem');
			if (a[glo_selected_item]) {
				selectActive(a[glo_selected_item].id);
			}
		}
	}

	function movedown_item()
	{
		var totalItems=glo_contResNum-1;
		if(glo_selected_item<=0){glo_selected_item=0;}
		if(glo_selected_item<=totalItems)
		{  
			var a =$$('.boxSuggestItem');
			selectActive(a[glo_selected_item].id);
			glo_selected_item++;
			if(glo_selected_item>totalItems){glo_selected_item=totalItems;}	
		}
		if (glo_selected_item<=0){
			glo_selected_item=0;
			var a =$$('.boxSuggestItem');
			selectActive(a[glo_selected_item].id);
			glo_selected_item++;
		}
	}

	function selectActive(elem){
		$$('.activeItem').removeClass('activeItem');
		var a=document.getElementById(elem);
		a.addClass("activeItem");
	}

	function determineType(str,blur){
		var retval = false;
        if(str!==""){
            var type="";
            var idToAdd=0;

            switch($('txtUsing').value) {
                case "ALL":
                    if(isEmail(str)){
                        type="EMAIL";
                    }
                    else if(isAIM(str)){
                        type="AIM";
                    }
                    else if(isPhone(str)){
                        type="SMS";
                    }
                    break;
                case "SMS":
                    if(isPhone(str)){
                        type="SMS";
                    }
                    else{
                        if(!blur){
                            alert("Not a valid Phone Number");
                        }
                        type="";
                        document.getElementById("txtTo").value="";
                    }
                    break;
                case "AIM":
                    if(isAIM(str)){
                        type="AIM";
                    }
                    else{
                        if(!blur){
                            alert("Not a valid AIM Screen Name");
                        }
                        type="";
                        document.getElementById("txtTo").value="";
                    }
                    break;
                case "EMAIL":
                    if(isEmail(str)){
                        type="EMAIL";
                    }
                    else{
                        if(!blur){
                            alert("Not a valid E-mail address");
                        }
                    }
                    break;
                case "MYSPACE":
                    if(isEmail(str)){
                        type="EMAIL";
                    }
                    else if(isAIM(str)){
                        type="AIM";
                    }
                    else if(isPhone(str)){
                        type="SMS";
                    }
                    break;
                default:
                    // do nothing
                    break;
            }

            if( document.getElementById("txtTo").value!=="" && (type=="MYSPACE" || type=="EMAIL" || type=="AIM" || type=="SMS") && type!=="undefined" &&type!==undefined ){
                setGlobals("contProto",type);
                setGlobals("contName",str);
                setGlobals("contAdd",str);
                var id=glo_contAdd.length-1;
                retval = id;
            }
            if(!blur){document.getElementById("txtTo").focus();}
        }
        return retval;
    }
	
	function isEmail(str) {
		if (str.match(/^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(([0-9]{1,3})|([a-zA-Z]{2,3})|(aero|coop|info|museum|name))$/)) {
			return true;
		} else {
			return false;
		}
	}
	
	function isPhone(str) {
		str = str.replace(/[^\d]/g, "");
		if (str.length === 10 || str.length === 11) {
			if (str.match(/^1?[2-9]\d{9}$/)) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
	
	function isAIM(str) {
		if (str.match(/^[a-z][a-z0-9]{2,15}$/i)) {
			return true;
		} else {
			return false;
		}
	}

	function sendUsingChanged(){
		var tmpSelVal=$('txtUsing').value;
		if(tmpSelVal==="AIM"){
			showAimImporter();
		}
		if(tmpSelVal==="MYSPACE"){
			showMyspaceImporter();
		}
	}

	function showAimImporter(){
	
	}


	function showMyspaceImporter(){
	
	}


	function closeAimImporter(){
		emptyInputs();
	}


	function closeMyspaceImporter(){
		emptyInputs();
	}


	function register(){
		var eml=$('registerEmailInput').value;
		var nme=$('registerNameInput').value;
		var nick=$('registerNickNameInput').value;
		var pass1=$('registerPasswordInput').value;
		var pass2=$('registerPassword2Input').value;
		var err="";
		var isError=false;
		if(eml===""){
			err+="Please enter an E-mail address<br/>";
			isError=true; 
		}
		if(!isEmail(eml)){
			err+="Please enter a valid E-mail address<br/>"; 
			isError=true;
		}
		if(nme===""){
			err+="Please enter your Name<br/>";
			isError=true; 
		}
		if(nick===""){
			err+="Please enter a Nickname<br/>";
			isError=true; 
		}
		if(pass1===""){
			err+="Please enter a password<br/>";
			isError=true; 
		}
		if(pass1.length<6){
			err+="Password must be at least 6 characters<br/>";
			isError=true; 
		}
		if(pass2===""){
			err+="Please confirm that your passwords match<br/>"; 
			isError=true;
		}
		if(pass1!==pass2){
			err+="Please confirm that your passwords match<br/>"; 
			isError=true;
		}
		$('registerError').set('html',err);
		$('registerError').setStyle('display','block');
		
		if(isError===false){
		  var data="email="+eml+"&password="+pass1+"&name="+nme+"&nickname="+nick;
			var request=new Request({
				method: "post",
				url: "/api/createUser_ws.php",
				data: data,
				onSuccess:register_OnSuccess
			});
			$$('.working').setStyle('display','block');
			request.send();
		}					
	}



	function register_OnSuccess(responseText, responseXML){
		var resp=JSON.decode(responseText);
		if(resp.status==="SUCCESS"){
			set_cookie("ShareUT",resp.data.token);
			setGlobals("auth",resp.data.token);
			setGlobals("loggedIn",true);
			widget.getUserInfo();
			widget.getContacts();
			$$('.working').setStyle('display','none');
			$$('.success').setStyle('display','block');
			$('registerSubmit').setStyle("display","none");
			$('regOK').setStyle("display","block");
			emptyInputs();	
		}
		else if(resp.statusMessage==="USER_ALREADY_EXISTS"){
			$('registerError').set('html',"E-mail address or Nickname is already in use");
		}	
	}

	function closeRegister(){
		$('register').setStyle("display","none");
		$$('.working').setStyle('display','none');
		$$('.success').setStyle('display','none');
		$('registerSubmit').setStyle("display","block");
		$('regOK').setStyle("display","none");
		$('txtUsing').setStyle('visibility', 'visible' );
		$('post_tab').setStyle('height','');
		$('web_tab').setStyle('height','');
	}

	function importContacts(){
		var eml=$('aimScreenNameInput').value;
		var pass1=$('aimPasswordInput').value;
		var err="";
		var service="AIM";
		var isError=false;
		if(eml===""){
			err+="Please enter a screen name<br/>";
			isError=true; 
		}
		if(pass1===""){
			err+="Please enter a password<br/>";
			isError=true; 
		}
		$('aimError').set('html',err);
		$('aimError').setStyle('display','block');
		
		if(isError===false){
		  var data="service="+service+"&username="+eml+"&password="+pass1;
			var request=new Request({
				method: "post",
				url: "/api/importContacts_ws.php",
				data: data,
				onSuccess:importContacts_onSuccess
			});
			$$('.working').setStyle('display','block');
			request.send();
		}
	}

	function importContacts_onSuccess(responseText, responseXML){
		var resp=JSON.decode(responseText);
			$$('.working').setStyle('display','none');
		if(resp.status==="SUCCESS" && resp.data ){
			for(var i=0;i<resp.data.contacts.length;i++){
				setGlobals('contProto',"AIM");
				setGlobals('contName',resp.data.contacts[i].name);
				setGlobals('contAdd',resp.data.contacts[i].address);
			}
			$('aimSuccess').set('html',"Got "+resp.data.contacts.length+" friends.");
			$('aimSuccess').setStyle('display','block');
			$('aimGet').setStyle('display','none');
			$('aimOK').setStyle('display','block');
			$('importAimCheckbox').setStyle('display','block');
			emptyInputs();	
		}
		else{
			$('aimError').set('html','Invalid username and/or password.');
		}
	}

	function closeAim(){
		$('aimSuccess').setStyle('display','none');
		$('importAimCheckbox').setStyle('display','none');
		$('aimError').setStyle('display','none');
		$('importAim').setStyle('display','none');
		$('aimGet').setStyle('display','block');
		$('aimOK').setStyle('display','none');
		$('greyout').setStyle('display','none');
	}

	function importMyspaceContacts(){
		var eml=$('myspaceUserNameInput').value;
		var pass1=$('myspacePasswordInput').value;
		var err="";
		var service="MYSPACE";
		var isError=false;
		if(eml===""){
			err+="Please enter a user name<br/>";
			isError=true; 
		}
		if(pass1===""){
			err+="Please enter a password<br/>";
			isError=true; 
		}
		$('myspaceError').set('html',err);
		$('myspaceError').setStyle('display','block');
		
		if(isError===false){
		  var data="service="+service+"&username="+eml+"&password="+pass1;
			var request=new Request({
				method: "post",
				url: "/api/importContacts_ws.php",
				data: data,
				onSuccess:importMyspaceContacts_onSuccess
			});
			$$('.working').setStyle('display','block');
			request.send();
		}
	}

	function importMyspaceContacts_onSuccess(responseText, responseXML){
		var resp=JSON.decode(responseText);
		$$('.working').setStyle('display','none');
		if(resp.status==="SUCCESS" && resp.data.contacts){
			for(var i=0;i<resp.data.contacts.length;i++){
				setGlobals('contProto',"MYSPACE");
				setGlobals('contName',resp.data.contacts[i].name);
				setGlobals('contAdd',resp.data.contacts[i].address);
			}
			$('myspaceSuccess').set('html',"Got "+resp.data.contacts.length+" friends.");
			$('myspaceSuccess').setStyle('display','block');
			$('myspaceGet').setStyle('display','none');
			$('myspaceOK').setStyle('display','block');
			$('importMyspaceCheckbox').setStyle('display','block');
			emptyInputs();	
		}
		else{
			$('myspaceError').set('html','Invalid username and/or password.');
		}
	}

	function closeMyspace(){
			$('myspaceSuccess').setStyle('display','none');
			$('importMyspaceCheckbox').setStyle('display','none');
			$('myspaceError').setStyle('display','none');
			$('importMyspace').setStyle('display','none');
			$('myspaceGet').setStyle('display','block');
			$('myspaceOK').setStyle('display','none');
			$('greyout').setStyle('display','none');
	}

	function getDiggs(url){
		if(url!=="" && url!==" " && url!==glo_last_url && url!=="undefined" && url!==undefined){
		  var data="url="+encodeURIComponent(url);
			var request=new Request({
				method: "post",
				url: "/api/getDiggs_ws.php",
				data: data,
				onSuccess:getDiggs_onSuccess
			});
			glo_last_url=url;
			request.send();
		}
	}

	function getDiggs_onSuccess(responseText, responseXML){
		var resp=JSON.decode(responseText);
		if(resp.status==="SUCCESS"){
			glo_num_diggs=resp.data.diggs;
			glo_digg_comments=resp.data.comments;
		}
		var diggTag='<a class="sw_a" title="'+glo_num_diggs+' Diggs,'+glo_digg_comments+' Comments" rel="external" style="color:'+glo_linkfg+'" href="http://digg.com/submit?phase=2&url='+glo_url+'&title='+glo_title+'">Digg ('+glo_num_diggs+')</a></div>';
		$('st_digg').set('html',diggTag);
		$$('a').setStyle('color',glo_linkfg);	
		var l = luminescence(glo_linkfg);
	    document.getElementById('whatsThisLink').style.color = l > 0.5 ? '#000' : '#fff';
	 	document.getElementById('whatsThis').style.color = l > 0.5 ? '#000' : '#fff';
		handelExternalLinks();
	}

	function getTinyURL(url){
		if(url!=="" && url!==" " && url!==glo_last_url2 && url!==undefined && url!=="undefined"){
		  var data="url="+encodeURIComponent(url);
			var request=new Request({
				method: "post",
				url: "/api/getTinyURL_ws.php",
				data: data,
				onSuccess:getTinyURL_onSuccess
			});
			glo_last_url2=url;
			request.send();
		}
	}

	function getTinyURL_onSuccess(responseText, responseXML){
		try{
			var resp=JSON.decode(responseText);
			var twitURL=encodeURIComponent(resp.data.tinyURL);
		}
		catch(err){
			var twitURL=glo_url;
		}
		var twittTag='<a style="color:'+glo_linkfg+'" href="http://twitter.com/home/?status='+glo_title+' '+twitURL+'+via+%40ShareThis" rel="external">Twitter</a>';
		$('post_twitter').set('html',twittTag);
		$$('a').setStyle('color',glo_linkfg);
		var l = luminescence(glo_linkfg);
	    document.getElementById('whatsThisLink').style.color = l > 0.5 ? '#000' : '#fff';
	 	document.getElementById('whatsThis').style.color = l > 0.5 ? '#000' : '#fff';	
		$('post_twitter').addEvent('click', function(){
			logEvent("twitter.com","post");
			if(glo_options_popup==true){
				popupOpen(this);
				return false;
			}
		});
		handelExternalLinks();
	}

	function HexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
	function HexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
	function HexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
	function cutHex(h) {return (h.charAt(0)==="#") ? h.substring(1,7):h}

	function luminescence(color){
	    var rgb = {};
	    if (color.length === 7) {
	    rgb = [parseInt('0x' + color.substring(1, 3)) / 255,
	           parseInt('0x' + color.substring(3, 5)) / 255,
		   parseInt('0x' + color.substring(5, 7)) / 255];
	    }
		else if (color.length === 4) {
			rgb =  [parseInt('0x' + color.substring(1, 2)) / 15,
		    parseInt('0x' + color.substring(2, 3)) / 15,
		    parseInt('0x' + color.substring(3, 4)) / 15];
	    }
	    var r = rgb[0], g = rgb[1], b = rgb[2];
	    var min = Math.min(r, Math.min(g, b));
	    var max = Math.max(r, Math.max(g, b));
	    return (min + max) / 2;
	}
		
	var closetimeout;
	
	function suggestAutoClose(){
		closetimeout = setTimeout("hideSuggest()",750);	
	}

	function suggestCancelClose() {
		if(closetimeout)clearTimeout(closetimeout);
	}

	function sendDestination(destination1){
		var destAddress=glo_destinationAddress;
		glo_type="default";
		glo_content=Url.decode(glo_content);
		glo_content=encodeURIComponent(glo_content);
		if(!glo_description || glo_description==undefined || glo_description=="undefined"){glo_description="";}
		if(!glo_tags || glo_tags==undefined){glo_tags="";}
		var objects="";
		var destination="";
		objects=[ {type:glo_type, url:glo_url, title:decodeURIComponent(glo_title), thumbnail:glo_thumb, embed:glo_content, description:glo_description, tags:glo_tags}];
		objects=JSON.encode(objects);
		destination=[{type:destination1 , address:destAddress}];
		destination=JSON.encode(destination);
		var eml="";
		if(glo_userEmail==""){
		 	eml="";
		}
		else{
			eml="&sender="+encodeURIComponent(glo_userEmail);
		}
		var data="publisher="+glo_publisher+"&objects="+encodeURIComponent(objects)+"&destinations="+encodeURIComponent(destination)+"&destinationType="+glo_destinationType+"&sessionID="+glo_sessionID+"&return=json"+eml;
		var url = "/api/createDestination_ws.php?"+data;
		var logger = new Image(1,1);
		logger.src = url;
		logger.onload = function(){return;};
	}

	function showRegister(){
		closeLoginBox();
		$('register').setStyle('display','block');
		$('post_tab').setStyle('height','347px');
		$('web_tab').setStyle('height','347px');
	}

	function showAddAnother(blah){
		var id=blah.id;
		id=id.replace(/addBox_/,"");
		var add=glo_contAdd[id];
		var a_num=add.search(/@/);
		var res="";
		if(a_num>0){
		res=add.substr(0,a_num);
		}
		else{
			res=add;
		}
		$('addAnotherAddress').innerHTML=add;
		$('addTextArea').value=res;
		$('saveAddressId').innerHTML=id;
		var h = $('container').offsetHeight;
		$('addAnother').setStyle('top', h/2-70);
		$('greyout').setStyle('height',h-2);
		$('greyout').setStyle('display','block');
		$('addAnother').setStyle('display','block');
	}

	function closeAddAnother(){
		$('addAnotherAddress').innerHTML='';
		$('addTextArea').value='';
		$('saveAddressId').innerHTML='';
		$('greyout').setStyle('display','none');
		$('addAnother').setStyle('display','none');
	}

	function saveAddress(){
		var id=$('saveAddressId').innerHTML;
		var nme=$('addTextArea').value;
		var add=glo_contAdd[id];
		var proto=glo_contProto[id];
		if(nme===""){
			nme=add;
		}
		var contacts=[];
		contacts[0]={
			service:proto.toLowerCase(),
			name:nme,
			address:add
		};
		contacts=JSON.encode(contacts);

		var data="token="+glo_authToken+"&return=json&contacts="+encodeURIComponent(contacts);
		var request=new Request({
			method: "post",
			url: "/api/addContacts_ws.php",
			data: data,
			onSuccess:saveAddress_onSuccess
		});
		request.send();
		closeAddAnother();
		var tmp="addBox_"+id;
		$(tmp).setStyle('display','none');
	}

	function saveAddress_onSuccess(responseText, responseXML){
		var resp=JSON.decode(responseText);
		if(resp.status=="SUCCESS"){
		
		}	
	}
} // end try
catch(err){
	// do nothing
}
