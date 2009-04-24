<?php
header("Content-type: application/x-javascript;charset=utf-8");
// header('P3P: CP="NOI NID"'); // P3P moved to apache config
?>

// Override jsUtilities functions that break jQuery
if (typeof lastChildContainingText == 'function') {
    Object.prototype.addClass = function() {};
    Object.prototype.removeClass = function() {};
    Object.prototype.lastChildContainingText = function() {};
}

Date.prototype.constructor     = Date;
Array.prototype.constructor    = Array;
String.prototype.constructor   = String;
Number.prototype.constructor   = Number;
Function.prototype.constructor = Function;
Boolean.prototype.constructor  = Boolean;
RegExp.prototype.constructor   = RegExp;

var _sttoolbar = true;
<?php
    include('mootools-release-1.11-noextras.js');
    include('1.18/loader.js');
    include('jquery-1.2.1.min.js');
    include('clipper/index.php');
?>

function _getWxH() {
     if (window.innerWidth) {
         return {
             width: window.innerWidth,
             height: window.innerHeight
         };
     } else if (document.documentElement.offsetWidth) {
         return {
             width: document.documentElement.offsetWidth,
             height: document.documentElement.offsetHeight
         };
     }
     return {width: 0, height: 0};
 }

function _getScrollXY() {
     var scrOfX = 0, scrOfY = 0;
     if(typeof(window.pageYOffset) == 'number') {
         //Netscape compliant
         scrOfY = window.pageYOffset;
         scrOfX = window.pageXOffset;
     } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
         //DOM compliant
         scrOfY = document.body.scrollTop;
         scrOfX = document.body.scrollLeft;
     } else if (document.documentElement
       && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
         //IE6 standards compliant mode
         scrOfY = document.documentElement.scrollTop;
         scrOfX = document.documentElement.scrollLeft;
     }
     return { width: scrOfX, height: scrOfY };
}

// used to override default form function without the options
SHARETHIS.toolbarForm = function(olist) {
	
	field = function(k, v, brackets) {
		var f   = document.createElement("input");
		f.type  = "hidden";
		f.name  = (brackets == true ? k + "[]" : k);
		f.value = v;
		return f;
	}
	normalize = function(s){
		if (s == null) {
			return '';
		}
		return encodeURIComponent(s);
	}

	var f    = document.createElement("form");
	//f.className  = "stform";
	f.method = "post";
	f.action = "http://sharethis.com/share/lightbox.php";
	f.target = "stframe";
	
	for (var j in this.meta) {
		f.appendChild(field("meta_" + j, normalize(this.meta[j])));
	}

	for (var j in this.page.properties) {
		f.appendChild(field("page_" + j, normalize(this.page.properties[j])));
	}
/*
	for (var j in this.query) {
		f.appendChild(field("query_" + j, normalize(this.query[j])));
	}
*/
	for (var i=0; i < olist.length; i++) {
		obj = olist[i];
		for (var j in obj.properties) {
			f.appendChild(field(j, normalize(obj.properties[j]), true));
		}
		for (var j in obj.options) {
			f.appendChild(field("opts_"+j, normalize(obj.options[j]), false));
		}
	}

	return f;
}

var _dims = _getWxH();
var _off = _getScrollXY();
var _d = {};
_d.top = (_dims.height / 2) - (440 / 2) | 0;
_d.top = _d.top > 60 ? _d.top - 60 : 0;
_d.top += _off.height;
_d.left = (_dims.width / 2) - (360 / 2) | 0;
_d.left = _d.left > 0 ? _d.left : 0;
_d.left += _off.width;

SHARETHIS.widget.left = _d.left;
SHARETHIS.widget.top = _d.top;

SHARETHIS.widget.hide();
SHARETHIS.widget.show({embeds:false});

 var p = window.open("http://w.sharethis.com/widget/loading", "stframe","status=1,toolbar=0,width=354,height=437");
 SHARETHIS.widget.popup = p;
 try {
	 p.document.open();
	 p.document.clear();
	 p.window.document.write(SHARETHIS.widget.loaderHTML);
	 p.document.close();
	 p.focus();
 } catch(err) {console.error(err);}

var f = SHARETHIS.toolbarForm(SHARETHIS.sharelets);

document.body.appendChild(f);
f.submit();

f = null;
