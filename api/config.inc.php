<?php
/**
 * Ensure that 'magic_quotes_gpc' functionality is disabled. Since it, in many cases is 
 * enabled by default and the application code will rightly assume that it is disabled,
 * we are going to ensure that the 'magic slashes' are stripped.
 * NB: 'magic_quotes_gpc' will be removed completely in PHP6
 *
 * If enabled, stripslashes() so that variables are not escaped ( what will be expected 
 * when they are encountered later in the application code ). --KJW
 *
 */
if (get_magic_quotes_gpc()) {
    foreach($_GET as $k => $v) {
		$_GET[$k] = stripslashes($v);
	} 
    foreach($_POST as $k => $v) {
		$_POST[$k] = stripslashes($v);
	} 
    foreach($_COOKIE as $k => $v) {
		$_COOKIE[$k] = stripslashes($v);
	} 
    foreach($_REQUEST as $k => $v) {
		$_REQUEST[$k] = stripslashes($v);
	} 
}


/**
 * Since 'register_globals' is no longer enabled by default, we are assuming within the application 
 * code that it is not. However, occasionally it is enabled for legacy code support. Disabled being 
 * the preferred configuration, we are going to attempt to replicate that behavior in the event that 
 * 'register_globals' is enabled. 
 * NB: 'register_globals' will be removed completely in PHP6
 * 
 * We are not executing this code just yet, so it is being wrapped in a function
 * to be called just after the 'start_session()' call. --KJW
 *
 */
function unregisterglobals() {
	if( (bool)@ini_get('register_globals') ) {
		if ( isset( $_REQUEST['GLOBALS'] ) ) {
			// tried to overwrite $GLOBALS array
			header( "HTTP/1.x 500 Internal Server Error" );
			die( '<a href="http://www.hardened-php.net/index.76.html">$GLOBALS overwrite vulnerability</a>');
		}
		$verboten = array(
						'GLOBALS',
						'_SERVER',
						'HTTP_SERVER_VARS',
						'_GET',
						'HTTP_GET_VARS',
						'_POST',
						'HTTP_POST_VARS',
						'_COOKIE',
						'HTTP_COOKIE_VARS',
						'_FILES',
						'HTTP_POST_FILES',
						'_ENV',
						'HTTP_ENV_VARS',
						'_REQUEST',
						'_SESSION',
						'HTTP_SESSION_VARS'
					);
		foreach ( $_REQUEST as $name => $value ) {
			if ( in_array( $name, $verboten ) ) {
				// tried to overwrite superblobals from $_REQUEST array
				header( "HTTP/1.x 500 Internal Server Error" );
				echo "register_globals security paranoia: trying to overwrite superglobals, aborting.";
				die( -1 );
			}
			unset( $GLOBALS[$name] );
		}

		$superglobals = array($_ENV, $_GET, $_POST, $_COOKIE, $_FILES, $_SERVER);
		if( isset($_SESSION) ) {
			array_unshift($superglobals, $_SESSION);
		}
		$knownglobals = array(
			//
			// Known PHP Reserved globals and superglobals:
			//
			'_ENV',		'HTTP_ENV_VARS',
			'_GET',		'HTTP_GET_VARS',
			'_POST',	'HTTP_POST_VARS',
			'_COOKIE',	'HTTP_COOKIE_VARS',
			'_FILES',	'HTTP_FILES_VARS',
			'_SERVER',	'HTTP_SERVER_VARS',
			'_SESSION',	'HTTP_SESSION_VARS',
			'_REQUEST', 
			//
			// Global variables used by this code snippet:
			//
			'superglobals',
			'knownglobals',
			'superglobal',
			'global',
			'void',
			//
			// Known global variables defined before this code snippet is reached.
			//
			//'MyIndexHere', // <-- Don't forget the comma
			//'MyNextIndexHere',
			'lastIndex' // <-- No comma for the list item
		);
		foreach( $superglobals as $superglobal ) {
			foreach( $superglobal as $global => $void ) {
				if( !in_array($global, $knownglobals) && isset($GLOBALS[$global]) ) {
					unset($GLOBALS[$global]);
				}
			}
		}
	}
}

unset( $IP );
@ini_set( 'allow_url_fopen', 0 ); # For security

require_once('env.php');

if (!defined("SHARETHIS_ERROR_REPORTING_LEVEL")) {
	define("SHARETHIS_ERROR_REPORTING_LEVEL",0);
}
ini_set('display_errors', SHARETHIS_ERROR_REPORTING_LEVEL);

/**
 * Start the session and clean out any
 * unwnated global vars created if
 * register_globals was enabled.
 */
// No sessions; stateless
//session_start();
unregisterglobals();

