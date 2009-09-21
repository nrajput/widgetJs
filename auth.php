<?php
require_once("api/env.php");
require_once("api/common.inc.php");

set_include_path(get_include_path().PATH_SEPARATOR.dirname(__FILE__).'/lib/OpenID/'.PATH_SEPARATOR.dirname(__FILE__).'/lib/');
require_once 'OAuth/OAuth.php';
require_once "Auth/OpenID/Consumer.php";
require_once "Auth/OpenID/FileStore.php";
require_once "Auth/OpenID/SReg.php";
require_once "Auth/OpenID/PAPE.php";
require_once "Auth/OpenID/OAuth.php";
require_once 'OpenSocial/osapi.php';
require_once 'Yahoo/YahooOAuthApplication.class.php';

function setSigninCookie($token) {
	setcookie('signin', $token, (time()+3600)*24, '/', '.sharethis.com');
}

function setSigninFailedCookie() {
	setcookie('signin', -1, (time()+3600)*24, '/', '.sharethis.com');
}

if( isset($_REQUEST['provider']) ) {
	
	$oauthapp = new YahooOAuthApplication(YAHOO_OAUTH_CONSUMER_KEY, YAHOO_OAUTH_CONSUMER_SECRET, YAHOO_OAUTH_APP_ID, YAHOO_OAUTH_DOMAIN);

	if( !isset($_REQUEST['openid_mode']) ) {
		$_REQUEST['openid_mode'] = 'discover';
	}

	$yahoo_feed = '';
	if( isset($_REQUEST["yahoo_feed"]) ) {
		$yahoo_feed = 1;
	}

	// handle openid/oauth
	if(isset($_REQUEST['openid_mode']))
		{
			switch($_REQUEST['openid_mode'])
				{
				case 'discover':
				case 'checkid_setup':
				case 'checkid_immediate':

					// handle yahoo simpleauth popup + redirect to yahoo! open id with open app oauth request
					header('Location: '.$oauthapp->getOpenIDUrl($oauthapp->callback_url.'?close=true&yahoo_feed='.$yahoo_feed)); exit;
					break;

				case 'id_res':

					// validate claimed open id

					// extract approved request token from open id response
					$request_token = new YahooOAuthRequestToken($_REQUEST['openid_oauth_request_token'], '');
					$email_address = $_REQUEST['openid_ax_value_email'];

					$_SESSION['yahoo_oauth_request_token'] = $request_token->to_string();

					// exchange request token for access token
					$oauthapp->token = $oauthapp->getAccessToken($request_token);

					// store access token for later
					$_SESSION['yahoo_oauth_access_token'] = $oauthapp->token->to_string();
					$auth_token = $oauthapp->token->to_string();

					break;

				case 'cancel':
					unset($_SESSION['yahoo_oauth_access_token']);
					unset($_REQUEST['openid_mode']);

					header('Location: '.$oauthapp->callback_url); exit;

					// openid cancelled
					break;
				case 'associate':
					// openid associate user
					break;
				default:
				}
		}
	else
		{
			if(isset($_SESSION['yahoo_oauth_access_token']))
				{
					// restore access token from session
					$oauthapp->token = YahooOAuthAccessToken::from_string($_SESSION['yahoo_oauth_access_token']);
				}
		}


	// fetch latest user data
	$profile  = $oauthapp->getProfile();
	$nickname = $profile->nickname;
	$fullname = $profile->givenName . " " . $profile->familyName;

	if( !empty($email_address) && !empty($nickname) ) {
		$response = call_api( "updateThirdPartyAuth", array( 'email' => $email_address,
															 'type' => 'yahoo',
															 'thirdparty_token' => $auth_token,
															 'yahoo_feed' => $yahoo_feed) );

		if($response == FALSE || $response["status"] != "SUCCESS") {
			$params = array( 'email' => $email_address,
							 'name' => $fullname,
							 'nickname' => $nickname . "-yahoo",
							 'type' => 'yahoo',
							 'thirdparty_token' => $auth_token 
							 );
			$response = call_api("createUser", $params);
			if( $response == FALSE || $response["status"] != "SUCCESS" ) {
				setSigninFailedCookie();
			} else {
				setSigninCookie($response['data']['token']);
			}
		} else {
			setSigninCookie($response['data']['token']);
		}
	}

}
//$updates  = $oauthapp->getUpdates(null, 0, 20);
//$connections = $oauthapp->getConnections(null, 0, 1000);

header('Cache-Control: Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0');
header('Pragma: no-cache');
header('X-XRDS-Location: http://wd.sharethis.com/xrds.xml');


//echo "$email_address<zp/>";
//echo "$nickname<p/>";
//echo "$fullname<p/>";
//print_r($auth_token);
?>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
     <meta http-equiv="X-XRDS-Location" content="http://wd.sharethis.com/xrds.xml"/>  
<title>ShareThis Yahoo! Sign-in</title>
</head>
<body>

<?php if(isset($_REQUEST['close'])): ?>
<script type="text/javascript">
// close popup window and refresh page for access token
window.close();
</script>
<?php endif; ?>
</body>
</html>
