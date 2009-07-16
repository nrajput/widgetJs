/*
ShareThis Discoveyr Loader Version 1.0.0
6/17/09 ShareThis.com
*/

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


/* parseQueryString.js - a function to parse and decode query strings -- The author of this program, Safalra (Stephen Morley), irrevocably releases all rights to this program, with the intention of it becoming part of the public domain. Because this program is released into the public domain, it comes with no warranty either expressed or implied, to the extent permitted by law.  For more public domain JavaScript code by the same author, visit: http://www.safalra.com/web-design/javascript/ */
function parseQueryString(G){var E={};if(G==undefined){G=location.search?location.search:""}if(G.charAt(0)=="?"){G=G.substring(1)}var C=G.indexOf("?");if(C){G=G.substring(C+1)}C=G.indexOf("#");if(C){G=G.substring(C+1)}G=G.replace("+"," ");var B=G.split(/[&;]/g);for(var C=0;C<B.length;C++){var F=B[C].split("=");var A=decodeURIComponent(F[0]);var D=decodeURIComponent(F[1]);if(!E[A]){E[A]=[]}E[A].push((F.length==1)?"":D)}return E};//var D=decodeURIComponent(F[1]);E[A]=((F.length==1)?"":D)}return E};

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


function ShareThis_Discovery(options){
	for (var o in options){
			options[o]=options[o][0]
	}
	this.frameUrl="http://wd.sharethis.com/disc/war/DiscWidget.html";
	
	//for testing
	//this.frameUrl="http://www.yahoo.com/#init/style=default/publisher=9d7164f7-852e-49b6-ad44-5b3dd5bc6e92/images=true/topics=cars/height=200/width=200/sessionID=1245279637358.2644/fpc=8f891fa-120caeba481-1361a0b1-402/pUrl=http%253A%252F%252Fwd.sharethis.com%252Fdiscovery%252Ftest_discovery.html";
	
	this.sessionID=(new Date()).getTime();
	this.sessionID+=Math.random();
	this.readyList=[];
	this.height=500;
	this.width=500;
	options['sessionID']=this.sessionID;
	this.fpc=_stFpc();
	options['fpc']=this.fpc;
	options['pUrl']=encodeURIComponent(document.location.href);
	if(options.height){this.height=options.height;}
	if(options.width){this.width=options.width;}
	this.css="height:"+this.height+"px;width:"+this.width+"px;";
	console.log(this.height);
	console.log(this.width);
		
    this.createDiv=function(){
 		try{
 			document.write('<div id="sharethis_discovery_div" style="'+this.css+'"></div>');
		}catch(err){	}
    },
    this.defer=function(f){
        if (this.ready) {
            f.apply(document, [SHARETHIS_DISCOVERY]);
        } else {
            this.readyList.push(function(){return f.apply(this, [SHARETHIS_DISCOVERY])});
        }
    },
    this.onReady=function(){
        for (var i = 0; i < this.SHARETHIS_DISCOVERY.readyList.length; ++i){
            	SHARETHIS_DISCOVERY.readyList[i].apply(document, [SHARETHIS_DISCOVERY]);
            }
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

	
	this.initialize=function(options){
		console.log("discovery options are");
		console.log(options);
			this.createDiv();
			try {
				this.mainstframe = document.createElement('<iframe name="stdiscover_frame" allowTransparency="true" style="body{background:transparent;}" ></iframe>');
			} catch(err) {
			//catch is ff and safari
				this.mainstframe = document.createElement('iframe');
				this.mainstframe.allowTransparency="true";	
				this.mainstframe.setAttribute("allowTransparency", "true");
			}	
			this.mainstframe.id = 'stdiscover_frame';
			this.mainstframe.className = 'stdiscover_frame';
			this.mainstframe.name = 'stdiscover_frame';
			this.mainstframe.frameBorder = '0';
			this.mainstframe.scrolling = 'no';
			this.mainstframe.width = this.width+'px';
			this.mainstframe.height = this.height+'px';
			 //this works in ff and safari
			
			var init = "#init";

			for (var o in options){
				if(SHARETHIS_tstOptions(o)==true)
            	{
            		init = init+"/"+o+"="+encodeURIComponent(options[o]);
            	}
			}
			
			this.initstr = init;
			this.mainstframe.src=this.frameUrl+this.initstr;
			//this.wrapper= document.getElementById('sharethis_discovery_div');
			

			this.defer(function(){
				SHARETHIS_DISCOVERY.wrapper= document.getElementById('sharethis_discovery_div');	
				SHARETHIS_DISCOVERY.wrapper.height = this.height+'px';
				SHARETHIS_DISCOVERY.wrapper.width = this.width+'px';
				if(SHARETHIS_DISCOVERY.wrapper!==null){
					SHARETHIS_DISCOVERY.wrapper.appendChild(SHARETHIS_DISCOVERY.mainstframe);
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

function SHARETHIS_tstOptions(tstStr){
	var opt_arr=['publisher','style','images','topics','height','width','sessionID','fpc','pUrl'];
	var retVal=false;
		for(var i=0;i<opt_arr.length;i++){
			if(tstStr===opt_arr[i]){
			 retVal=true;
			}
		}
	return retVal;
}



//main function for fpc cookie handling
function _stFpc(){
	if(!document.domain){
		return false;
	}
	var cVal=_stGetFpc("__unam");
	if(cVal==false){
		var bigRan=Math.round(Math.random() * 2147483647);
		bigRan=bigRan.toString(16);
		var time=(new Date()).getTime();
		time=time.toString(16);
		var guid="";
		var hashD=_stGetD();
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
var _slist = document.getElementsByTagName('script');
var _thisScript = _slist[_slist.length - 1];

if (_thisScript){
	SHARETHIS_DISCOVERY = new ShareThis_Discovery(parseQueryString(_thisScript.src));
} else {
	SHARETHIS_DISCOVERY = new ShareThis_Discovery();
}
	
	
