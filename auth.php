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


$oauthapp = new YahooOAuthApplication(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, OAUTH_APP_ID, OAUTH_DOMAIN);

if( !isset($_REQUEST['openid_mode']) ){
	$_REQUEST['openid_mode'] = 'discover';
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
      header('Location: '.$oauthapp->getOpenIDUrl(isset($_REQUEST['popup']) ? $oauthapp->callback_url.'?close=true': $oauthapp->callback_url)); exit;
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

    // do something with user data
    if(isset($_POST['action']))
    {
      switch($_POST['action'])
      {
        case 'updateStatus':

          if(isset($_POST['status']) && !empty($_POST['status']))
          {
            $status = strip_tags($_POST['status']);
            $oauthapp->setStatus(null, $status);
          }

          header('Location: '.$oauthapp->callback_url); exit;

        break;

        case 'postUpdate':

          if(isset($_POST['update']) && !empty($_POST['update']))
          {
            $update = strip_tags($_POST['update']);
            $oauthapp->insertUpdate(null, $update, $update, $oauthapp->callback_url);
          }

          header('Location: '.$oauthapp->callback_url); exit;

        break;
      }
    }
  }
}

header('Cache-Control: Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0');
header('Pragma: no-cache');
?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<title>ShareThis Yahoo! Sign-in</title>
</head>
<body>

<?php if(isset($_SESSION['yahoo_oauth_request_token'])): ?>
<div id="ysimpleauth-logout" class="authbar"><a href="auth.php?openid_mode=cancel">Logout</a></div>
<?php endif; ?>

<?php

// fetch latest user data
$profile  = $oauthapp->getProfile();
$nickname = $profile->nickname;
$fullname = $profile->givenName . " " . $profile->familyName;
$updates  = $oauthapp->getUpdates(null, 0, 20);
$connections = $oauthapp->getConnections(null, 0, 1000);

echo "$email_address<p/>";
echo "$nickname<p/>";
echo "$fullname<p/>";
?>


<?php if(isset($_REQUEST['close'])): ?>
<script type="text/javascript">
// close popup window and refresh page for access token
if(window.opener)
{
  window.opener.location.replace(window.opener.location.href);
  window.opener.focus();

  window.close();
}
</script>
<?php endif; ?>
</body>
</html>
