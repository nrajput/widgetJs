<?php

$service = basename(__file__, "_ws.php");
require_once('default.inc.php');

exit();

//CODE RETAINED FOR HISTRICAL REFERENCE

	require_once('config.inc.php');
	require_once('AjaxProxy.php');
	
	$url = 'http://'.API_SERVER.'/postTypePad.php';
	
	$getdata = $_SERVER['QUERY_STRING'];
	$postdata = file_get_contents('php://input');
	
	if ($getdata) {
		$url.="?".$getdata;
	}
	else {
		$url.="?".$postdata;	
	}
	
	error_log($url, 0);
	$result = AjaxProxy::makeGetRequest($url);
	echo $result;
