<?php
header("Content-type: application/x-javascript;charset=utf-8");
$file_name="sharethis.js";
$file_contents=file_get_contents($file_name); 
$file_contents=str_replace("SHARETHIS","SHARETHIS_NO_CONFLICT",$file_contents);
$pubKey	= isset($_REQUEST["publisher"]) 	? $_REQUEST["publisher"]		: '';
$page	= isset($_REQUEST["page"]) 	? $_REQUEST["page"]		: '';
?>

var manustvar=0;
var SHARETHIS_NO_CONFLICT_TOOLBAR=true;
var _sttoolbar=true;

//-------------------------------------------------------------------Start ShareThis
<?php
echo $file_contents;
?>

//---------------------------------------------------------------------End ShareThis


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

var _dims = _getWxH();

var _off = _getScrollXY();

var _d = {};
_d.top = ( (_dims.height-500) / 2 )  | 0;
_d.top += _d.top > 60 ? _d.top - 60 : 0;
_d.top += _off.height;


_d.left = (_dims.width / 2) - (360 / 2) | 0;
_d.left = _d.left > 0 ? _d.left : 0;
_d.left += _off.width;


SHARETHIS_NO_CONFLICT.wrapper.style.top = "0px";
SHARETHIS_NO_CONFLICT.wrapper.style.left = "0px";

var SHARETHIS_NO_CONFLICT_TOOLBAR_DIV = document.createElement('div');
SHARETHIS_NO_CONFLICT_TOOLBAR_DIV.style.position = "absolute";
SHARETHIS_NO_CONFLICT_TOOLBAR_DIV.style.display="block";
SHARETHIS_NO_CONFLICT_TOOLBAR_DIV.style.top=_d.top+"px";
SHARETHIS_NO_CONFLICT_TOOLBAR_DIV.style.left=_d.left+"px";
document.body.appendChild(SHARETHIS_NO_CONFLICT_TOOLBAR_DIV);

SHARETHIS_NO_CONFLICT.toolbar=true;
var stObj = SHARETHIS_NO_CONFLICT.addEntry({title:document.title,url:document.location.href},{button:false,embeds:false});
<?php
if(!empty($pubKey)){
	echo "SHARETHIS_NO_CONFLICT.meta.publisher='$pubKey';";	
}
if(!empty($page)){
	echo "SHARETHIS_NO_CONFLICT.page='$page';";	
}
?>

SHARETHIS_NO_CONFLICT.onReady();
stObj.popup();
