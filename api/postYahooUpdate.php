<?php
require_once("api/env.php");
require_once("api/common.inc.php");

define('OAUTH_CONSUMER_KEY', 'dj0yJmk9SHZWdklRVFBrZ0ppJmQ9WVdrOVpWQTVSWHByTlRZbWNHbzlNVFkxTkRrd056ZzFPUS0tJnM9Y29uc3VtZXJzZWNyZXQmeD03NA--');
define('OAUTH_CONSUMER_SECRET', '67e7cf77880763e1a76805b2812732de405b942f');
define('OAUTH_DOMAIN', 'http://wd.sharethis.com/auth.php');
define('OAUTH_APP_ID', 'eP9Ezk56');

set_include_path(get_include_path().PATH_SEPARATOR.dirname(__FILE__).'/lib/OpenID/'.PATH_SEPARATOR.dirname(__FILE__).'/lib/');
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

if ( empty($yahoo_token) ) ) {
	$errors = TRUE;
	$response["statusMessage"] = "MISSING_PARAMETER_YAHOO_TOKEN";
}

if ( !($return === "json" || $return === "xml" || $return === "php") ) {
	$errors = TRUE;
	$response["statusMessage"] = "INVALID_RETURN_TYPE";
	$return = "json";
}

$oauthapp = new YahooOAuthApplication(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, OAUTH_APP_ID, OAUTH_DOMAIN);

// restore access token from session
$oauthapp->token = YahooOAuthAccessToken::from_string($yahoo_token);

$suid = md5($title.$description.$link.time());

$oauthapp->insertUpdate($suid, $title, $link, $description);
