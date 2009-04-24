<?php
	
	class AjaxProxy{
		
		public static function makeGetRequest($url) {
			$curl = curl_init();
			curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
			curl_setopt($curl, CURLOPT_URL, $url);
			curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 2);
			curl_setopt($curl, CURLOPT_HEADER, 0);
			curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
			$response = curl_exec($curl);
			$info = curl_getinfo($curl);
			curl_close($curl);
			
			return array($response,$info);
		}
		
		public static function makePostRequest($url,$postdata) {
			$curl = curl_init();
			curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
			curl_setopt($curl, CURLOPT_URL, $url);
			curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 2);
			curl_setopt($curl, CURLOPT_HEADER, 0);
			curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($curl, CURLOPT_POST, 1);
			curl_setopt($curl, CURLOPT_POSTFIELDS, $postdata);
			$response = curl_exec($curl);
			$info = curl_getinfo($curl);
			curl_close($curl);
			
			return array($response,$info);
		}
		
	}

