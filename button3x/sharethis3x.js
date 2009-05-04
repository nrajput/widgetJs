/*
ShareThis Loader Version 3.6.2-rc1
5/1/09 ShareThis.com
*/

var STV="3-6-2RC1";

ST_JSON = new function(){

	this.decode = function(){
		var	filter, result, self, tmp;
		if($$("toString")) {
			switch(arguments.length){
				case	2:
					self = arguments[0];
					filter = arguments[1];
					break;
				case	1:
					if($[typeof arguments[0]](arguments[0]) === Function) {
						self = this;
						filter = arguments[0];
					}
					else
						self = arguments[0];
					break;
				default:
					self = this;
					break;
			};
			if(rc.test(self)){
				try{
					result = e("(".concat(self, ")"));
					if(filter && result !== null && (tmp = $[typeof result](result)) && (tmp === Array || tmp === Object)){
						for(self in result)
							result[self] = v(self, result) ? filter(self, result[self]) : result[self];
					}
				}
				catch(z){}
			}
			else {
				throw new JSONError("bad data");
			}
		};
		return result;
	};
	this.encode = function(){
		var	self = arguments.length ? arguments[0] : this,
			result, tmp;
		if(self === null)
			result = "null";
		else if(self !== undefined && (tmp = $[typeof self](self))) {
			switch(tmp){
				case	Array:
					result = [];
					for(var	i = 0, j = 0, k = self.length; j < k; j++) {
						if(self[j] !== undefined && (tmp = ST_JSON.encode(self[j])))
							result[i++] = tmp;
					};
					result = "[".concat(result.join(","), "]");
					break;
				case	Boolean:
					result = String(self);
					break;
				case	Date:
					result = '"'.concat(self.getFullYear(), '-', d(self.getMonth() + 1), '-', d(self.getDate()), 'T', d(self.getHours()), ':', d(self.getMinutes()), ':', d(self.getSeconds()), '"');
					break;
				case	Function:
					break;
				case	Number:
					result = isFinite(self) ? String(self) : "null";
					break;
				case	String:
					result = '"'.concat(self.replace(rs, s).replace(ru, u), '"');
					break;
				default:
					var	i = 0, key;
					result = [];
					for(key in self) {
						if(self[key] !== undefined && (tmp = ST_JSON.encode(self[key])))
							result[i++] = '"'.concat(key.replace(rs, s).replace(ru, u), '":', tmp);
					};
					result = "{".concat(result.join(","), "}");
					break;
			}
		};
		return result;
	};
	
	this.toDate = function(){
		var	self = arguments.length ? arguments[0] : this,
			result;
		if(rd.test(self)){
			result = new Date;
			result.setHours(i(self, 11, 2));
			result.setMinutes(i(self, 14, 2));
			result.setSeconds(i(self, 17, 2));
			result.setMonth(i(self, 5, 2) - 1);
			result.setDate(i(self, 8, 2));
			result.setFullYear(i(self, 0, 4));
		}
		else if(rt.test(self))
			result = new Date(self * 1000);
		return result;
	};
	
	var	c = {"\b":"b","\t":"t","\n":"n","\f":"f","\r":"r",'"':'"',"\\":"\\","/":"/"},
		d = function(n){return n<10?"0".concat(n):n},
		e = function(c,f,e){e=eval;delete eval;if(typeof eval==="undefined")eval=e;f=eval(""+c);eval=e;return f},
		i = function(e,p,l){return 1*e.substr(p,l)},
		p = ["","000","00","0",""],
		rc = null,
		rd = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$/,
		rs = /(\x5c|\x2F|\x22|[\x0c-\x0d]|[\x08-\x0a])/g,
		rt = /^([0-9]+|[0-9]+[,\.][0-9]{1,3})$/,
		ru = /([\x00-\x07]|\x0b|[\x0e-\x1f])/g,
		s = function(i,d){return "\\".concat(c[d])},
		u = function(i,d){
			var	n=d.charCodeAt(0).toString(16);
			return "\\u".concat(p[n.length],n)
		},
		v = function(k,v){return $[typeof result](result)!==Function&&(v.hasOwnProperty?v.hasOwnProperty(k):v.constructor.prototype[k]!==v[k])},
		$ = {
			"boolean":function(){return Boolean},
			"function":function(){return Function},
			"number":function(){return Number},
			"object":function(o){return o instanceof o.constructor?o.constructor:null},
			"string":function(){return String},
			"undefined":function(){return null}
		},
		$$ = function(m){
			function $(c,t){t=c[m];delete c[m];try{e(c)}catch(z){c[m]=t;return 1}};
			return $(Array)&&$(Object)
		};
	try{rc=new RegExp('^("(\\\\.|[^"\\\\\\n\\r])*?"|[,:{}\\[\\]0-9.\\-+Eaeflnr-u \\n\\r\\t])+?$')}
	catch(z){rc=/^(true|false|null|\[.*\]|\{.*\}|".*"|\d+|\d+\.\d+)$/}
};


try{

	if (!SHARETHIS) {
		if(!SHARETHIS_TOOLBAR){
			var SHARETHIS_TOOLBAR=false;
		}
		var SHARETHIS=null;
		/* parseQueryString.js - a function to parse and decode query strings -- The author of this program, Safalra (Stephen Morley), irrevocably releases all rights to this program, with the intention of it becoming part of the public domain. Because this program is released into the public domain, it comes with no warranty either expressed or implied, to the extent permitted by law.  For more public domain JavaScript code by the same author, visit: http://www.safalra.com/web-design/javascript/ */
		function parseQueryString(G){var E={};if(G==undefined){G=location.search?location.search:""}if(G.charAt(0)=="?"){G=G.substring(1)}var C=G.indexOf("?");if(C){G=G.substring(C+1)}C=G.indexOf("#");if(C){G=G.substring(C+1)}G=G.replace("+"," ");var B=G.split(/[&;]/g);for(var C=0;C<B.length;C++){var F=B[C].split("=");var A=decodeURIComponent(F[0]);var D=decodeURIComponent(F[1]);if(!E[A]){E[A]=[]}E[A].push((F.length==1)?"":D)}return E};//var D=decodeURIComponent(F[1]);E[A]=((F.length==1)?"":D)}return E};

		/* A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined in FIPS PUB 180-1 -- Version 2.1a Copyright Paul Johnston 2000 - 2002. -- Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet -- Distributed under the BSD License -- See http://pajhome.org.uk/crypt/md5 for details. */
		var hexcase=0;var b64pad="";var chrsz=8;function hex_sha1(A){return binb2hex(core_sha1(str2binb(A),A.length*chrsz))}function core_sha1(M,H){M[H>>5]|=128<<(24-H%32);M[((H+64>>9)<<4)+15]=H;var O=Array(80);var N=1732584193;var L=-271733879;var K=-1732584194;var J=271733878;var I=-1009589776;for(var E=0;E<M.length;E+=16){var G=N;var F=L;var D=K;var C=J;var A=I;for(var B=0;B<80;B++){if(B<16){O[B]=M[E+B]}else{O[B]=rol(O[B-3]^O[B-8]^O[B-14]^O[B-16],1)}var P=safe_add(safe_add(rol(N,5),sha1_ft(B,L,K,J)),safe_add(safe_add(I,O[B]),sha1_kt(B)));I=J;J=K;K=rol(L,30);L=N;N=P}N=safe_add(N,G);L=safe_add(L,F);K=safe_add(K,D);J=safe_add(J,C);I=safe_add(I,A)}return Array(N,L,K,J,I)}function sha1_ft(B,A,D,C){if(B<20){return(A&D)|((~A)&C)}if(B<40){return A^D^C}if(B<60){return(A&D)|(A&C)|(D&C)}return A^D^C}function sha1_kt(A){return(A<20)?1518500249:(A<40)?1859775393:(A<60)?-1894007588:-899497514}function safe_add(A,D){var C=(A&65535)+(D&65535);var B=(A>>16)+(D>>16)+(C>>16);return(B<<16)|(C&65535)}function rol(A,B){return(A<<B)|(A>>>(32-B))}function str2binb(D){var C=Array();var A=(1<<chrsz)-1;for(var B=0;B<D.length*chrsz;B+=chrsz){C[B>>5]|=(D.charCodeAt(B/chrsz)&A)<<(32-chrsz-B%32)}return C}function binb2hex(C){var B=hexcase?"0123456789ABCDEF":"0123456789abcdef";var D="";for(var A=0;A<C.length*4;A++){D+=B.charAt((C[A>>2]>>((3-A%4)*8+4))&15)+B.charAt((C[A>>2]>>((3-A%4)*8))&15)}return D};
		function hash_page(A) {return hex_sha1(A);}


		var stVisibleInterval=null;
		var readyTestInterval=null;
		var st_showing = false;
		var stautoclose = true;
	
		function SHARETHIS_merge(){
			var mix = {};
			for (var i = 0, l = arguments.length; i < l; i++){
				var object = arguments[i];
				if (SHARETHIS_typeof(object) != 'object') continue;
				for (var key in object){
					var op = object[key], mp = mix[key];
					mix[key] = (mp && SHARETHIS_typeof(op) == 'object' && SHARETHIS_typeof(mp) == 'object') ? SHARETHIS_merge(mp, op) : SHARETHIS_unlink(op);
				}
			}
			return mix;
		}

		function SHARETHIS_unlink(object){
			var SHARETHIS_unlinked;	
			switch (SHARETHIS_typeof(object)){
				case 'object':
					SHARETHIS_unlinked = {};
					for (var p in object) SHARETHIS_unlinked[p] = SHARETHIS_unlink(object[p]);
				break;
				case 'hash':
					SHARETHIS_unlinked = SHARETHIS_unlink(object.getClean());
				break;
				case 'array':
					SHARETHIS_unlinked = [];
					for (var i = 0, l = object.length; i < l; i++) SHARETHIS_unlinked[i] = SHARETHIS_unlink(object[i]);
				break;
				default: return object;
			}
			return SHARETHIS_unlinked;
		}
	
		function SHARETHIS_typeof(object){
			if(SHARETHIS_isArray(object)){
				return 'array';
			}
			else{
				return typeof object;
			}
		}
	
		function SHARETHIS_isArray(object){
			var a=object != null && typeof object == "object" && 'splice' in object && 'join' in object;
			return a;
		}

		function Shareable(properties,options){
			this.idx=-1;
			this.frameUrl="";
			this.element=null;
			this.properties={
				type:       '',
				title:      encodeURIComponent(document.title),
				summary:    '',
				content:    '',
				url:        document.URL,
				icon:       '',
				category:   '',
				updated:    document.lastModified,
				published:  '',
				author:     ''
			};
			this.options={
				button: true,
				onmouseover: false,
				buttonText: 'ShareThis',
				popup: false,
				offsetLeft: 0,
				offsetTop: 0,
				embeds: false,
				autoclose: false
			};
			this.initialize= function(properties, options){
				this.options = SHARETHIS_merge(this.options, options);
				this.properties = SHARETHIS_merge(this.properties, properties);
				if (options.target){
					var o = this;
					options.target.onclick=function(){o.share();};
					if (options.mouseover){
						options.target.onmouseover=function(){o.share();};
					}
				}
			}
			this.initialize(properties,options);
			this.share=function(){
				frames['stframe'].location=this.frameUrl+"#getObject/"+SHARETHIS.guid+"/"+this.idx;
			}
			this.attachButton=function(newbutton) {
				this.element=newbutton;
				if(this.options.onmouseover) {
					newbutton.onmouseover = this.popup;
				} else {
					newbutton.onclick = this.popup;
				}
			}
		}

		function ShareThis(options){
			this.version=2.03;
			this.tmpSendData="";
			this.script_host="";
			this.sendArray=[];
			this.sendNum=0;
			this.guid=null;
			this.popExists=false;
			this.popup_win=null;
			this.newwinfrag="";
			this.shareables=[];
			this.readyList=[];
			this.postUrl="";
			this.frameUrl="";
			this.counter=0;
			this.wrapper=null;
			this.ready=false;
			this.popupCalled=false;
			this.sessionID=(new Date()).getTime();
			this.sessionID+=Math.random();
			options['sessionID']=this.sessionID;
			this.fpc=_stFpc();
			options['fpc']=this.fpc;
			this.widgetCalled=false;
			this.lastUrl='blank';
			this.logFlag=true;
			this.closebutton=null;
			this.widgetExists=false;
			this.oldScroll=0;
			this.fp=null;
			this.currentId=null;
			this.toolbar=false;
			this.st_clicked=false;
			this.st_clicked_o=null;
			this.curr_offsetTop=0;
			this.curr_offsetLeft=0;
			this.frameReady=false;
			this.delayShow=false;
			this.numIframe=0;
			this.frameLoaded=false;
			this.curr_id=null;
			this.current_element=null;
			this.opt_arr=[]
			this.meta={
				publisher: '',
				hostname: location.host,
				location: location.pathname
			};
			this.positionWidget=function(){
				var id=SHARETHIS.curr_id;
					var shareel = SHARETHIS.current_element;
					if(shareel==null){
						shareel=document.getElementById(id);
					}
					var curleft = curtop = 0;
				
					if (shareel.offsetParent) {
						curleft = shareel.offsetLeft;
						curtop = shareel.offsetTop;
						while (shareel = shareel.offsetParent) {
							curleft += shareel.offsetLeft
							curtop += shareel.offsetTop
						}
					}
					shareel = SHARETHIS.current_element;
					if(shareel==null){
						shareel=document.getElementById(id);
					}
					var eltop=0;
					var elleft=0;
					var topVal=0;
					var leftVal=0;
					eltop = curtop+shareel.offsetHeight+5;
					elleft = curleft+5;
					topVal=(eltop + SHARETHIS.curr_offsetTop);
					topVal=eval(topVal);
					topVal+="px";
					leftVal=(elleft + SHARETHIS.curr_offsetLeft);
					leftVal=eval(leftVal);
					leftVal+="px";
					SHARETHIS.wrapper.style.top = topVal;
					SHARETHIS.wrapper.style.left = leftVal;
					SHARETHIS.wrapper.style.visibility="visible";
					SHARETHIS.mainstframe.style.visibility = 'visible';
					SHARETHIS.oldScroll=document.body.scrollTop;
			},
			this.hideWidget=function(){
				if(SHARETHIS.wrapper.style.visibility !== 'hidden'){
					SHARETHIS.wrapper.style.visibility = 'hidden';
				}
				if(SHARETHIS.mainstframe.style.visibility !== 'hidden'){
					SHARETHIS.mainstframe.style.visibility = 'hidden';
				}
			},
			this.pageSize=function() {
		        var pScroll = [0,0,0,0];
				var scX=0;
				var scY=0;
				var winX=0;
				var winY=0;
		        if (typeof(window.pageYOffset) == 'number') {
		            //Netscape compliant
		            scX=window.pageXOffset;
					scY=window.pageYOffset;
		        } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
		            //DOM compliant
					scX=document.body.scrollLeft;
					scY=document.body.scrollTop;
		        } else if (document.documentElement
		          && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
		            //IE6 standards compliant mode
					scX=document.documentElement.scrollLeft;
					scY=document.documentElement.scrollTop;
		        }
		  	   if (window.innerWidth) {
			   		winX=window.innerWidth;
			      	winY=window.innerHeight;
			   }
			   else if (document.documentElement.offsetWidth) {
			   		winX= document.documentElement.offsetWidth;
			        winY=document.documentElement.offsetHeight;
			   }
		
				pScroll=[scX,scY,winX,winY];
		        return pScroll;
		    }
			this.postPopup=function(){
		        field = function(k, v) {
		            var f   = document.createElement("input");
		            f.type  = "hidden";
		            f.name  = k;
		            f.value = v;
		            return f;
		        }
		        normalize = function(s){
		            if (s == null) return '';
		            return encodeURIComponent(s);
		        }
		        var f    = document.createElement("form");
		        f.method = "post";
		        f.action = SHARETHIS.postUrl;
		        f.target = "stpostframe";

		        var urls = '';
		        var propertylist = [];
		        

		        for (var i=0; i<this.shareables.length; i++){
		        	var tmp_prop={};
		            var o = this.shareables[i];
		            urls = urls+o.properties.url;
			        for (p in o.properties){
			        	if(SHARETHIS_tstOptions(p)==true){
							tmp_prop[p]=o.properties[p];
			        	}
			        }
		            propertylist.push(tmp_prop);
		        }
		        
		        var jsonstr = ST_JSON.encode(propertylist);
		        this.guid = hash_page(urls);
		        f.appendChild(field('key', this.guid));
		        f.appendChild(field('data', normalize(jsonstr)));
		        document.body.appendChild(f);
		        f.submit();
		    }
		    this.addEntry=function(properties, options){
		    	if(_thisScript===null){
		    		var tmpScr=getShareThisScript();
		    		SHARETHIS.options=parseQueryString(tmpScr.src);
		 			var ST_script_src=tmpScr.src;
					var parse_url = /(.*?:\/\/)(.*?)(\/.*)/;
					var array_url = ST_script_src.match(parse_url);
					if(array_url.length>0){
						this.script_host=array_url[2];
					}
					if(this.script_host.search(/sharethis/) <0){
						this.script_host="w.sharethis.com";
					}	
						
					this.frameUrl="http://"+this.script_host+"/share3x/lightbox.html?stv="+STV;	
					this.postUrl="http://"+this.script_host+"/api/setCache_ws.php"

					if(SHARETHIS.options["button"]){SHARETHIS.options["button"]=SHARETHIS.getBool(SHARETHIS.options["button"].toString());}
					if(SHARETHIS.options["popup"]){SHARETHIS.options["popup"]=SHARETHIS.getBool(SHARETHIS.options["popup"].toString());}
					if(SHARETHIS.options["embeds"]){SHARETHIS.options["embeds"]=SHARETHIS.getBool(SHARETHIS.options["embeds"].toString());}
		
					var init = "#init";
					SHARETHIS.newwinfrag = "#popup";
					for (var o in SHARETHIS.options){
						if(SHARETHIS_tstOptions(o)==true)
		            	{
		            		init = init+"/"+o+"="+encodeURIComponent(options[o]);
							this.newwinfrag = this.newwinfrag+ "/" +o +"=" +encodeURIComponent(options[o]);
		            	}
					}
					
					SHARETHIS.initstr = init;
					SHARETHIS.mainstframe.src=SHARETHIS.frameUrl+SHARETHIS.initstr;
		    	}

		    	
		        var o = new Shareable(properties, SHARETHIS_merge(SHARETHIS.options, options));
		        if(typeof(o.properties.url)==="object"){
		        	try{o.properties.url=o.properties.url.href}catch(err){}
		        }
		        for (var prop in o.properties){
		        	try{o.properties[prop]=o.properties[prop].toString();}catch(err){}
		        }
				var xInt="";
				var xInt2="";
				var sendDataInt="";
				var sendPopupDataInt="";
		        if(o.options.popup){ 
					o.options.onmouseover = false;
					SHARETHIS.popupExists=true;
				}
				else if(SHARETHIS_TOOLBAR!==true){
					SHARETHIS.widgetExists=true;
				}
		        o.idx = this.shareables.push(o) - 1;		      
				var id = 'sharethis_' + o.idx;
		        var oidx = o.idx;
				if(o.properties.url!==this.lastUrl){
					this.lastUrl=o.properties.url;
				}
				else{
					this.logFlag=false;
				}
		        o.popup = function(e){
		        	if(SHARETHIS_TOOLBAR===true){
		        		if(st_showing===false){
						 		SHARETHIS.log('widget',o);
						 	}
						st_showing=true;
						clearInterval(stVisibleInterval);
						added_tool="/glo_toolbar=true";
						SHARETHIS.hideEmbeds();
						SHARETHIS.mainstframe.src = SHARETHIS.frameUrl + SHARETHIS.newwinfrag +"/guid_index=" + oidx +"/guid=" + SHARETHIS.guid+added_tool;	
						SHARETHIS.wrapper.style.visibility="visible";
						SHARETHIS.mainstframe.style.visibility = 'visible';
		        	}
		        	else{
				 	if( (SHARETHIS.ready===true && SHARETHIS.frameReady===true) || (SHARETHIS.popupExists===true && SHARETHIS.ready==true && SHARETHIS.widgetExists===false) || (SHARETHIS.popupExists===true && SHARETHIS.ready==true && SHARETHIS.frameReady===true) ){
					 	
					 	if(st_showing===false){
					 		SHARETHIS.log('widget',o);
					 	}
						clearInterval(stVisibleInterval);
						
						if(o.element!==null){
								id=o.element.id;
								SHARETHIS.current_element=o.element;
							} 			 	
							SHARETHIS.curr_offsetTop=Number(o.options.offsetTop);
							SHARETHIS.curr_offsetLeft=Number(o.options.offsetLeft);
							SHARETHIS.curr_id=id;
							if(o.options.onclick) {
					        		var res = o.options.onclick.apply(document, [o]);
					        		if(res == false) return false;
							}
					        if(o.options.popup) {
					        	var newwinurl = SHARETHIS.frameUrl + SHARETHIS.newwinfrag +"/guid_index=" + oidx +"/guid=" + SHARETHIS.guid;	
								window.open(newwinurl, "newstframe","status=1,toolbar=0,width=350,height=462");
						} 
						else{
								if(st_showing == false) {		
									if(o.options.embeds == false) {
										SHARETHIS.hideEmbeds();
									}
									stautoclose = o.options.autoclose;
									if(SHARETHIS.sendNum<SHARETHIS.sendArray.length){
										SHARETHIS.sendArray.push("#show" + "/guid_index=" + oidx);
										if(SHARETHIS.delayShow===true){
											sendDataInt=setTimeout(SHARETHIS.sendData,1000);
										}
										else{
											sendDataInt=setTimeout(SHARETHIS.sendData,20);
										}
									}
									else{
										//SHARETHIS.mainstframe.src = SHARETHIS.frameUrl + "#show" + "/guid_index=" + oidx;
										window.frames['stframe'].location.replace(SHARETHIS.frameUrl + "#show" + "/guid_index=" + oidx);
											if(SHARETHIS.delayShow===true){
												sendDataInt=setTimeout(SHARETHIS.sendData,1000);
											}
											else{
												sendDataInt=setTimeout(SHARETHIS.sendData,20);
											}
									}
									SHARETHIS.positionWidget();
									st_showing = true;
								}
								else{
								stcloseWidget();
								}
							}
					}
					else{
						SHARETHIS.st_clicked=true;
						SHARETHIS.delayShow=true;
						SHARETHIS.st_clicked_o=o;
					}
					}//end else for SHARETHIS_TOOLBAR===true
				};
		        var a = document.createElement("a");
		        a.className = 'stbutton stico_' + (o.options.style ? o.options.style : (SHARETHIS.options.style ? SHARETHIS.options.style : 'default'));
			    a.title = "ShareThis via email, AIM, social bookmarking and networking sites, etc.";
		        a.href = "javascript:void(0)";
		        if(o.options.onmouseover == false || o.options.onmouseover == "false") a.onclick = o.popup;
		        if(o.options.onmouseover == true) a.onmouseover = o.popup;
		        var t = document.createElement("span");
		        t.className = 'stbuttontext';
		        t.appendChild(document.createTextNode(o.options.buttonText));
		        a.appendChild(t);
		        o.button = a;
		 		try{
					if(o.options.button==true){
		        document.write('<span id="' + id + '"></span>');
					}
				}
				catch(err){

				}
				//SHARETHIS.onReady();
		        var x = document.getElementById(id);
				if (x) {
		            if(o.options.button) {
		            	x.appendChild(a);
					}
		        }
				if(this.logFlag){this.log('view', o);}
		        return o;
		    },
		
		    this.postEntries=function(){
		        field = function(k, v) {
		            var f   = document.createElement("input");
		            f.type  = "hidden";
		            f.name  = k;
		            f.value = v;
		            return f;
		        }
		        normalize = function(s){
		            if (s == null) return '';
		            return encodeURIComponent(s);
		        }
		        var urls = '';
		        var propertylist = [];
		        
		        for (var i=0; i<this.shareables.length; i++){
		            var tmp_prop={};
		            var o = this.shareables[i];
		            urls = urls+o.properties.url;
		            for (p in o.properties){
			        	if(SHARETHIS_tstOptions(p)==true){
			        		tmp_prop[p]=null;
							tmp_prop[p]=o.properties[p];
						}
			        }
		            propertylist.push(tmp_prop);
		        }
		        var tmp="/pageTitle="+encodeURIComponent(encodeURIComponent(document.title))+"/pageURL="+encodeURIComponent(encodeURIComponent(document.URL))+"/pageHost="+encodeURIComponent(encodeURIComponent(document.location.host))+"/pagePath="+encodeURIComponent(encodeURIComponent(document.location.pathname)); 
				SHARETHIS.sendArray.push("#data"+tmp);
				var jsonstr = ST_JSON.encode(propertylist);
				var tmp=encodeURIComponent(jsonstr);
				var b=tmp.length;
				var a=1700;
				var c=parseInt(b/a);
				c=c+1;
				var d=b%a;
				var sendArr=[];
				var tmpSend="";
				for(var i=0;i<c;i++)
				{
					sendArr.push(tmp.substring(i*a,(i*a)+a));
				}

				for(var i=0;i<sendArr.length;i++)
				{	
					tmpSend="#data/jsonData="+encodeURIComponent(sendArr[i]);
					SHARETHIS.sendArray.push(tmpSend);	
				}
				SHARETHIS.sendArray.push("#data/jsonData=done");	
		    },
			this.sendData=function(){
				xInt=setInterval(SHARETHIS.sendJSON,50);
			},
			this.sendJSON=function(){
					if(SHARETHIS.sendNum<SHARETHIS.sendArray.length){		
						//SHARETHIS.mainstframe.src=SHARETHIS.frameUrl+SHARETHIS.sendArray[SHARETHIS.sendNum];
						window.frames['stframe'].location.replace(SHARETHIS.frameUrl+SHARETHIS.sendArray[SHARETHIS.sendNum]);
					}
					else{
						clearInterval(xInt);

					}
					SHARETHIS.sendNum++;
			},

		    this.defer=function(f){
		        if (this.ready) {
		            f.apply(document, [SHARETHIS]);
		        } else {
		            this.readyList.push(function(){return f.apply(this, [SHARETHIS])});
		        }
		    },
		    this.onReady=function(){
		        SHARETHIS.ready = true;		        
		        for (var i = 0; i < SHARETHIS.readyList.length; ++i){
		            	SHARETHIS.readyList[i].apply(document, [SHARETHIS]);
		            }
		    },
		    this.load=function(t, opts){
		        var e = document.createElement(t);
		        for (var i in opts) {
		            e.setAttribute(i, opts[i]);
		        }
		        try {
		            document.getElementsByTagName('head')[0].appendChild(e);
		        } catch (err) {
		            document.body.appendChild(e);
		        }
		    },
		    this.hideEmbeds=function() {
		        var embeds = document.getElementsByTagName('embed');
		        for (var i=0; i< embeds.length; i++) {
		            embeds[i].style.visibility = "hidden";
		        }
		    },
		    this.showEmbeds=function() {
		        var embeds = document.getElementsByTagName('embed');
		        for (var i=0; i< embeds.length; i++) {
		            embeds[i].style.visibility = "visible";
		        }
		    },
		    this.log=function(event, obj) {
				if (obj && obj.properties && obj.properties.url) {
					url = obj.properties.url;
				} else {
					url = document.URL;
				}
				//new l logger
				var lurl = "http://l.sharethis.com/log?event=";
				if(event=="pview"){
					lurl = "http://l.sharethis.com/pview?event=";
				}
		        lurl+=event
		            + "&publisher=" + encodeURIComponent(SHARETHIS.meta.publisher)
		            + "&hostname=" + encodeURIComponent(SHARETHIS.meta.hostname)
		            + "&location=" + encodeURIComponent(SHARETHIS.meta.location)
		            + "&url=" + encodeURIComponent(url)
		            + "&sessionID="+SHARETHIS.sessionID
		            + "&fpc="+SHARETHIS.fpc
		            + "&ts" + (new Date()).getTime() + "." + SHARETHIS.counter++;		        		         
		                    		         
		        var logger2 = new Image(1,1);
		        logger2.src = lurl;
				// N.B. This onload function is required for IE.
		        logger2.onload = function(){return;};
		    },
		    this.getBool= function(variable)    {
			    var vtype;
			    var toReturn;
			    if(variable != null)    {
			        switch(typeof(variable))    {
			            case 'boolean':    
			                vtype = "boolean";
			                return variable;
			                break;
			            case 'number':
			                vtype = "number";
			                if(variable == 0)    
			                    toReturn = false;
			                else toReturn = true;
			                break;
			            case 'string':
			                vtype = "string";
			                if(variable == "true" || variable == "1")
			                    toReturn = true;
			                else if(variable == "false" || variable == "0")
			                    toReturn = false;
			                else if(variable.length > 0)
			                    toReturn = true;
			                else if(variable.length == 0)
			                    toReturn = false;                
			                break;
			        }
			        return toReturn;        
				}
			}

			
			this.onStFrameLoad=function(){
				if(SHARETHIS.frameLoaded===false){	
					SHARETHIS.postEntries();
					SHARETHIS.widgetCalled=true;
					SHARETHIS.frameLoaded=true;
					if(SHARETHIS.st_clicked==true){
						setTimeout("SHARETHIS.st_clicked_o.popup()",1000);								       
		       		}
				}
			}
			
			this.readyTest=function(){
				if(SHARETHIS.frameReady===true && SHARETHIS.ready===true){
					clearInterval(SHARETHIS.readyTestInterval);
					SHARETHIS.onStFrameLoad();
				}
			}
			
			this.sendEvent=function(name,value){
				var tmpSend="#widget/"+name+"="+value;
				window.frames['stframe'].location.replace(SHARETHIS.frameUrl+tmpSend);
			}
	
			this.initialize=function(options){
					for(o in options){
						options[o]=options[o].toString();
					}	
					if(_thisScript==null){
						var _slist = document.getElementsByTagName('script');
			    		var _thisScript3 = _slist[_slist.length - 1];
			    		var ST_script_src=_thisScript3.src;
					}
					else{
						var ST_script_src=_thisScript.src;
					}
					var parse_url = /(.*?:\/\/)(.*?)(\/.*)/;
					var array_url = ST_script_src.match(parse_url);
						if(array_url.length>0){
							this.script_host=array_url[2];
						}
					if(this.script_host.search(/sharethis/) <0){
						this.script_host="w.sharethis.com";
					}	
						
					this.frameUrl="http://"+this.script_host+"/share3x/lightbox.html?stv="+STV;	
					this.postUrl="http://"+this.script_host+"/api/setCache_ws.php"	
					this.options = options || {};
					if(this.options["button"]){this.options["button"]=this.getBool(this.options["button"].toString());}
					if(this.options["popup"]){this.options["popup"]=this.getBool(this.options["popup"].toString());}
					if(this.options["embeds"]){this.options["embeds"]=this.getBool(this.options["embeds"].toString());}
					if (this.options.publisher) {
						this.meta.publisher = this.options.publisher;
					}
					var tmp_css='http://'+this.script_host+'/button/css/sharethis.css?stv='+STV;
					try{
						if(this.options.css){
						tmp_css=this.options.css.toString();
						}
					}
					catch(err){}
					var css = tmp_css;
					this.load('link', {
						href : (this.options.css ? this.options.css : css),
						rel  : 'stylesheet',
						type : 'text/css'
					});
					

					try {
						this.mainstframe = document.createElement('<iframe name="stframe" allowTransparency="true" style="body{background:transparent;}" ></iframe>');
						this.mainstframe.onreadystatechange=function() {
																	if(SHARETHIS.mainstframe.readyState==="complete"){
																		SHARETHIS.frameReady=true; 
																	}
																	};
						//try is ie
					} catch(err) {
					//catch is ff and safari
						this.mainstframe = document.createElement('iframe');
						this.mainstframe.allowTransparency="true";	
						this.mainstframe.setAttribute("allowTransparency", "true");
						this.mainstframe.onload=function() { SHARETHIS.frameReady=true; };
					}
					this.mainstframe.id = 'stframe';
					this.mainstframe.className = 'stframe';
					this.mainstframe.name = 'stframe';
					this.mainstframe.frameBorder = '0';
					this.mainstframe.scrolling = 'no';
					this.mainstframe.width = '350px';
					this.mainstframe.height = '462px';
					this.mainstframe.style.top = '0px';
					this.mainstframe.style.left = '0px';
					 //this works in ff and safari
					
					
					try {
			            this.fp = document.createElement('<iframe name="stpostframe" style="visibility:hidden"></iframe>');
			        } catch(err) {
			            this.fp = document.createElement('iframe');
			            this.fp.style.visibility = 'hidden';
			        }
			        this.fp.name = 'stpostframe';
			        this.fp.width = '0px';
			        this.fp.height = '0px';
			        this.fp.src = "";
			
					var init = "#init";
					this.newwinfrag = "#popup";
		
					for (var o in options){
						if(SHARETHIS_tstOptions(o)==true)
		            	{
		            		init = init+"/"+o+"="+encodeURIComponent(options[o]);
							this.newwinfrag = this.newwinfrag+ "/" +o +"=" +encodeURIComponent(options[o]);
		            	}
					}
					
					this.initstr = init;
					this.sendArray.push(this.initstr);
					this.mainstframe.src=this.frameUrl+this.sendArray[0];
					this.sendNum++;
					this.wrapper= document.createElement('div');
					this.wrapper.id = 'stwrapper';
					this.wrapper.className = 'stwrapper';
					this.wrapper.style.visibility = 'hidden';
					this.wrapper.style.top = "-999px";
					this.wrapper.style.left = "-999px";
					this.wrapper.appendChild(this.mainstframe);
					//this.closebutton = document.createElement('a');
					this.closebutton = document.createElement('img');
					this.closebutton.src = 'http://w.sharethis.com/images/pic3.gif';
					this.closebutton.title = 'close';
					this.closebutton.height = '8';
					this.closebutton.width = '8';
					this.closebutton.className = 'stclose';
					this.closebutton.onclick = stcloseWidget;
					//this.closebutton.style.color = '#fff';
					//var closetext = document.createTextNode('X');
					//this.closebutton.appendChild(closetext);
					this.closebutton.style.position = "absolute";
					this.wrapper.appendChild(this.closebutton);

					this.defer(function(){
						if(SHARETHIS_TOOLBAR===true){
							document.body.appendChild(SHARETHIS.fp);
							SHARETHIS.postPopup(); //posts data to set cache
							SHARETHIS_TOOLBAR_DIV.appendChild(SHARETHIS.wrapper);
						}
						if(SHARETHIS.popupExists===true && SHARETHIS.popupCalled===false){
							document.body.appendChild(SHARETHIS.fp);							
							SHARETHIS.postPopup();
							SHARETHIS.popupCalled=true;
						}
						if(SHARETHIS.widgetCalled===false && SHARETHIS.widgetExists===true){
							document.body.appendChild(SHARETHIS.wrapper);
							SHARETHIS.readyTestInterval=setInterval(SHARETHIS.readyTest,250);
				
						}
						   			
					});
					if (typeof(window.addEventListener) != 'undefined') {
			            window.addEventListener("load", this.onReady, false);
			        } else if (typeof(document.addEventListener) != 'undefined') {
			            document.addEventListener("load", this.onReady, false);
			        } else if (typeof window.attachEvent != 'undefined') {
			            window.attachEvent("onload", this.onReady);
			        }
				
				}
			this.initialize(options);
		}

		var closetimeout;

		function stClose(){
		if(stautoclose==true) closetimeout = setTimeout("stcloseWidget()",750);	
		}

		function stCancelClose() {
			clearTimeout(closetimeout);
		}

		function stcloseWidget(){
			st_showing = false;
			SHARETHIS.wrapper.style.visibility ='hidden' ;
			SHARETHIS.mainstframe.style.visibility = 'hidden';
			SHARETHIS.wrapper.style.top = "-999px";
			SHARETHIS.wrapper.style.left = "-999px";
			SHARETHIS.showEmbeds();
			SHARETHIS.sendEvent("screen","home");
		}
		
		function SHARETHIS_tstOptions(tstStr){
			var opt_arr=['type','title','summary','content','url','icon','category','updated','published','author','button','onmouseover','buttonText','popup','offsetLeft','offsetTop','embeds','autoclose','publisher','tabs','services','charset','headerbg','inactivebg','inactivefg','linkfg','style','send_services','post_services','headerfg','headerType','headerTitle','sessionID','tracking','fpc'];
			var retVal=false;
				for(var i=0;i<opt_arr.length;i++){
					if(tstStr===opt_arr[i]){
					 retVal=true;
					}
				}
			return retVal;
		}
		

		function SHARETHIS_TEST(){
			SHARETHIS.mainstframe.src = SHARETHIS.frameUrl+"#test";
		}
		//main function for fpc cookie handling
		function _stFpc(){
			var cVal=_stGetFpc("__unam");
			if(cVal==false){
				var bigRan=Math.round(Math.random() * 2147483647);
				bigRan=bigRan.toString(16);
				var time=(new Date()).getTime();
				time=time.toString(16);
				var guid="";
				var hashD=_stGetD()
				hashD=hashD.split(/\./)[1];
				guid=_stdHash(hashD)+"-"+time+"-"+bigRan+"-1";
				cVal=guid;
				_stSetFpc(cVal);
			}else{
				var cv=cVal;
				var cvArray = cv.split(/\-/);
				if(cvArray.length==4){
					var num=Number(cvArray[3]);
					num++;
					cv=cvArray[0]+"-"+cvArray[1]+"-"+cvArray[2]+"-"+num;
					cVal=cv;
					_stSetFpc(cVal);
				}
			}			
			return cVal;
		}
		//sets fpc with value and exires in 9 months
		function _stSetFpc(value) {
			var name="__unam";
			var current_date = new Date;
			var exp_y = current_date.getFullYear();
			var exp_m = current_date.getMonth() + 9;// set cookie for 9 months into future
			var exp_d = current_date.getDate();
			var cookie_string = name + "=" + escape(value);
			if (exp_y) {
				var expires = new Date (exp_y,exp_m,exp_d);
				cookie_string += "; expires=" + expires.toGMTString();
			}
			var domain=_stGetD();
			cookie_string += "; domain=" + escape (domain)+";path=/";
			document.cookie = cookie_string;
		}
		//resolves domain for use in cookie
		function _stGetD(){
			var str = document.domain.split(/\./)
			var domain="";
			if(str.length>1){
			    domain="."+str[str.length-2]+"."+str[str.length-1];
			}
			return domain;
		}
		//gets cookie value with name or returns false
		function _stGetFpc(cookie_name) {
			var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
			if (results)
				return (unescape(results[2]));
			else
				return false;
		}
		//hashes dd and returns value
		function _stdHash(dd) {
			var hash=0,salt=0;
		 	for (var i=dd.length-1;i>=0;i--) {
			  var charCode=parseInt(dd.charCodeAt(i));
			  hash=((hash << 8) & 268435455) + charCode + (charCode << 12);
			  if ((salt=hash & 161119850)!=0){hash=(hash ^ (salt >> 20))};
			}
		 return hash.toString(16);
		}
		
		var _thisScript=null;
		function getShareThisScript(){
			var _slist = document.getElementsByTagName('script');
			var rScript=null;
			for(var i=0;i<_slist.length;i++)
			{	
				var temp=_slist[i].src;
				if( temp.search(/.*sharethis.*\/button/) >=0 ){	
					rScript=_slist[i];
				}
				else if(temp.search(/.*sharethis.*\/widget\/\?/) >=0 || temp.search(/.*sharethis.*\/widget\/index/) >=0 || temp.search(/.*sharethis.*\/widget\/\?&/) >=0){	
					rScript=_slist[i];
				}	
			}
			return rScript;			
		}
		
		_thisScript=getShareThisScript();		
		if (_thisScript){
			SHARETHIS = new ShareThis(parseQueryString(_thisScript.src));
		} else {
			SHARETHIS = new ShareThis();
		}
		SHARETHIS.log('pview', null);

	} // End !SHARETHIS

	// Don't run if called from HEAD, or if toolbar has been run
	
	var _slist = document.getElementsByTagName('script');
	var _thisScript2 = _slist[_slist.length - 1];
	if (_thisScript2 && _thisScript2.parentNode.tagName != "HEAD" && typeof(_sttoolbar) == "undefined") {
		var obj = SHARETHIS.addEntry();
	}


}
catch(err){
}

