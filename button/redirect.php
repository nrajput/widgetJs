<?php
	require_once("../api/env.php");
	$destination = isset($_REQUEST["d"])  ? $_REQUEST["d"]  : "";
	$publisher   = isset($_REQUEST["pk"]) ? $_REQUEST["pk"] : "";
	$session     = isset($_REQUEST["s"])  ? $_REQUEST["s"]  : "";
	$properties  = isset($_REQUEST["p"])  ? $_REQUEST["p"]  : "";
	if ($destination != "" && $publisher != "" && $session != "" && $properties != "") {
		$properties = json_decode(stripslashes($properties));
		
		$destinationsJSON[0] = array(
			"type" => $destination,
			"address" => ""
		);
		$destinationsJSON = json_encode($destinationsJSON);
		
		$objectsJSON[0] = array(
			"type" => "default",
			"url" => $properties->url,
			"title" => $properties->title,
			"thumbnail" => $properties->icon,
			"embed" => $properties->content,
			"description" => $properties->summary,
			"tags" => $properties->category
		);
		$objectsJSON = json_encode($objectsJSON);
		
		$sender = get_sender();
		
		$ipAddress = !empty($_SERVER['HTTP_X_FORWARDED_FOR']) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : $_SERVER['REMOTE_ADDR'];
		
		$params = array();
		$params["token"] = $_COOKIE["ShareUT"];
		$params["destinationType"] = "Social";
		$params["destinations"] = $destinationsJSON;
		$params["objects"] = $objectsJSON;
		$params["publisher"] = $publisher;
		if ($sender !== FALSE) {
			$params["sender"] = $sender;
		}
		$params["sessionID"] = $session;
		$params["clicookie"] = $_COOKIE['__stid'];
		$params["ipaddress"] = $ipAddress;
				
		$response = call_api("createDestination", $params);
		
		$url = "";
		switch ($destination) {
			case "facebook.com":
				$url = "http://www.facebook.com/share.php?u={url}&t={title}";
				break;
			case "digg.com":
				$url = "http://digg.com/submit?phase=2&url={url}&title={title}";
				break;
			case "buzz.yahoo.com":
				$url = "http://buzz.yahoo.com/buzz?targetUrl={url}&headline={title}&src=sharethis";
				break;
		}
		if ($url !== "") {
			$url = str_replace("{url}", urlencode($properties->url), $url);
			$url = str_replace("{title}", urlencode($properties->title), $url);
			header("Location: $url");
		}
	}
	
	function call_api($method, $params)
	{
		$url = "http://" . API_SERVER . "/" . $method . ".php";
		$curl = curl_init($url);
		$params["return"] = "php";
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($curl, CURLOPT_POST, 1);
		curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
		curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($params, '', '&'));
		$response = curl_exec($curl);
		$info = curl_getinfo($curl);
		curl_close($curl);
		switch ($info["http_code"]) {
			case "200":
				$retval = unserialize($response);
				if ( empty($retval) ) {
					// something went wrong.
				}
				break;
			default:
				$retval = FALSE;
		}
		return $retval;
	}
	
	function get_sender() {
		$token = isset($_COOKIE["ShareUT"]) ? $_COOKIE["ShareUT"] : "";
		if ($token != "") {
			$response = call_api("getUserInfo", array("token"=>$token));
			if ($response !== FALSE) {
				switch ($response["status"]) {
					case "SUCCESS":
						return $response["data"]["email"];
						break;
					case "FAILURE":
						switch ($response["errorNumber"]) {
							case 9:
								setcookie("ShareUT", "", time() - 3600, "/", ST_COOKIE_DOMAIN);
								return FALSE;
								break;
							default:
								return FALSE;
						}
					default:
						return FALSE;
				}
			}
			return FALSE;
		}
		return FALSE;
	}
?>