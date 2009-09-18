<?php

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

/**
 * Returns hostname for read server
 * @param array $data
 * @returns mixed Formatted data string; FALSE on failure;
 */
function formatOutputArray($data, $format='' ) {
	$retval = FALSE;

	// Generate properly encoded return data
	switch ($format) {
	case "json":
		$retval = json_encode($data);
		break;
	case "xml":
		$xmlParser = new ShareThis_API_XMLGen;
		$xmlParser->loadArray($data, "response");
		$retval = $xmlParser->getXML();
		break;
	case "php":
		$retval = serialize($data);
		break;
	default:
		$retval = json_encode($data);
	}

	return $retval;
}

?>