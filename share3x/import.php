<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>ShareThis</title>'
		<script src="js/import.js?stv=3-4-0RC3" type="text/javascript"></script>
		<script src="js/mootools-1.2.1-core-nc.js" type="text/javascript"></script>
		
		<?php 
			$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : '';
			$consent_token = isset($_REQUEST['ConsentToken']) ? $_REQUEST['ConsentToken'] : '';
			echo('<script type="text/javascript">var delauth_action = \'' . $action . '\'; </script>');
			echo('<script type="text/javascript">var delauth_token = \'' . $consent_token . '\'; </script>');
		
			if( isset( $_GET['callback'] ) || isset( $_GET['requestId'] ) ){
				echo '<script type="text/javascript">doOauth();</script>';
			} else if( $action && $action == 'delauth' ){
				echo '<script type="text/javascript">doDelauth();</script>';
			} else {
				$provider = isset($_REQUEST["provider"])	? strtolower($_REQUEST["provider"])	: "";
				if( $provider == 'hotmail' ) {
					echo '<script type="text/javascript">submitDelauth();</script>';
				} else {
					echo '<script type="text/javascript">submitOauth("' . $provider .  '");</script>';
				}
			}		
		?>
	</head>
	<body></body>
</html>