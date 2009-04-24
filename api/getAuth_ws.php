<?php

$service = basename(__file__, "_ws.php");
require_once('default.inc.php');

exit();

//CODE RETAINED FOR HISTRICAL REFERENCE

require_once('AjaxProxy.php');
$url = 'http://'.API_SERVER.'/getAuth.php';
$getdata = $_SERVER['QUERY_STRING'];
$postdata = file_get_contents('php://input');
if($getdata){
$url.="?".$getdata;
}
else{
$url.="?".$postdata;	
}
$ajx=new AjaxProxy($url);

?>
