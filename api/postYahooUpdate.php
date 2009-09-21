<?php
require_once("env.php");
require_once("common.inc.php");

set_include_path(get_include_path().PATH_SEPARATOR.dirname(__FILE__).'/../lib/OpenID/'.PATH_SEPARATOR.dirname(__FILE__).'/../lib/');
require_once 'OAuth/OAuth.php';
require_once "Auth/OpenID/Consumer.php";
require_once "Auth/OpenID/FileStore.php";
require_once "Auth/OpenID/SReg.php";
require_once "Auth/OpenID/PAPE.php";
require_once "Auth/OpenID/OAuth.php";
require_once 'OpenSocial/osapi.php';
require_once 'Yahoo/YahooOAuthApplication.class.php';

$errors     = FALSE;
$response   = array("status"=>"FAILURE", "statusMessage" => "POST_YAHOO_UPDATE_SERVICE_FAILED");

$yahoo_token      = isset($_REQUEST["yahoo_token"])     ? $_REQUEST["yahoo_token"]    : FALSE ;
$title            = isset($_REQUEST["title"])     ? $_REQUEST["title"]                : "" ;
$description      = isset($_REQUEST["description"])     ? $_REQUEST["description"]    : "" ;
$link             = isset($_REQUEST["link"])     ? $_REQUEST["link"]                  : "" ;

$return     = isset($_REQUEST["return"])    ? strtolower($_REQUEST["return"])   : "json";

if ( empty($yahoo_token) ) {
	$errors = TRUE;
	$response["statusMessage"] = "MISSING_PARAMETER_YAHOO_TOKEN";
}

if ( !($return === "json" || $return === "xml" || $return === "php") ) {
	$errors = TRUE;
	$response["statusMessage"] = "INVALID_RETURN_TYPE";
	$return = "json";
}

$oauthapp = new YahooOAuthApplication(YAHOO_OAUTH_CONSUMER_KEY, YAHOO_OAUTH_CONSUMER_SECRET, YAHOO_OAUTH_APP_ID, YAHOO_OAUTH_DOMAIN);

// restore access token from session
$oauthapp->token = YahooOAuthAccessToken::from_string($yahoo_token);

$suid = md5($title.$description.$link.time());
$retval = $oauthapp->insertUpdate(null, $description, $title, $link);

if( $retval ) {
	$response["data"] = $retval;
	$response["status"] = "SUCCESS";
	$response["statusMessage"] = "SUCCESS";
}

// Generate properly encoded return data
if ('xml'===$return) {
	header("Content-Type: text/xml");
}
echo formatOutputArray($response, $return);

