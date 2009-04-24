<?php
require_once('config.inc.php');
require_once('AjaxProxy.php');

$url = 'http://'.API_SERVER.'/'.$service.'.php';
$postdata='' ;

foreach($_GET as $k=>$v) {
	$postdata .= '&'.urlencode($k).'='.urlencode($v);
}

foreach($_POST as $k=>$v) {
	$postdata .= '&'.urlencode($k).'='.urlencode($v);
}

// This GET value will over write anything set before
if ( !empty($_GET['token']) ) {
	$postdata .= '&token=' . $_GET['token'] ;
}
// This POST value will over write anything set before
else if ( !empty($_POST['token']) ) {
	$postdata .= '&token=' . $_POST['token'] ;
}
// This COOKIE value trumps them all
else if ( !empty($_COOKIE['ShareUT']) ) {
	$postdata .= '&token=' . $_COOKIE['ShareUT'];
}

if ( !empty($_COOKIE['__stid']) ) {
	$postdata .= '&clicookie=' . $_COOKIE['__stid'];
}

$ipAddress = !empty($_SERVER['HTTP_X_FORWARDED_FOR']) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : $_SERVER['REMOTE_ADDR'];
if ( !empty($ipAddress) ) {
	$postdata .= '&ipaddress=' . $ipAddress;
}


if ( !empty($postdata) ) {
	list($output,$info) = AjaxProxy::makePostRequest($url,$postdata);
	header("Content-Type: ".$info["content_type"]);
	echo $output;
}
else {
	header("Content-Type: text/xml");
	echo '<?xml version="1.0" encoding="UTF-8"?>';
	echo '<response status="POST_FAILED" statusMessage="Missing stuff." />';
}
