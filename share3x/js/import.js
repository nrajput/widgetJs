
//callback sets cookie with contact url
//widget is in cookie read loop waiting for cookie to be set.

var base_url = "http://" + window.location.hostname + '/';

var delt = '';
//var base_url = "http://sharethis.com/";

function submitOauth(service) {
	var request = new Request({
		method: 'post',
		url:'/api/handle_oauth_ws.php',
		data: 'reqtype=request&widget=1&service=contacts&provider=' + service + '&base_url=' + window.location.hostname,
		onFailure: function(msg) {
			setImportFailedCookie();
			setMemcacheKey(-1);
		},
		onSuccess: (function(responseText, responseXML) {
			var resp=JSON.decode(responseText);
			if (resp.status==="SUCCESS" && resp.data) {
				if(service == 'aim') {
					var oauth_url = resp.data.auth_url 
					+ escape(base_url + "share3x/import.php");
				} else {
					var oauth_url = resp.data.auth_url 
					+ escape(base_url + "share3x/import.php?widget=1&callback=1&")
					+ escape(resp.data.callback);
				}
				//var oauth_url = resp.data.auth_url 
				//+ escape("http://sequoia.sharethis.com/share3x/import.php?callback=1&")
				//+ escape(resp.data.callback);
				//window.open(oauth_url);
				window.location.href = oauth_url;
			} else {
				setImportFailedCookie();
				setMemcacheKey(-1);
			}
		}).bind(this)
	});
	request.send();
}

function submitDelauth() {
	var request = new Request({
		method: 'post',
		url:'/api/handle_delauth_ws.php',
		data: 'reqtype=request&widget=1&callback_url='
			+ escape(base_url + "share3x/import.php"),
		onFailure: function(msg) {
			setImportFailedCookie();
			setMemcacheKey(-1);
		},
		onSuccess: (function(responseText, responseXML) {
			var resp=JSON.decode(responseText);
			if (resp.status==="SUCCESS" && resp.data) {
				window.location.href = resp.data.consent_url;
			} else {
				setImportFailedCookie();
				setMemcacheKey(-1);
			}
		}).bind(this)
	});
	request.send();
}

function setImportCookie(contact_url) {	
	Cookie.write('import', contact_url, {duration: 1, path: '/', domain: '.sharethis.com'});
	Cookie.write('import_delt', delt, {duration: 1, path: '/', domain: '.sharethis.com'});
}

function setImportFailedCookie() {
	Cookie.write('import', -1, 1);
}

function setMemcacheKey(contact_url) {
	if(guid) {
		var json_obj = { "contact_url" : contact_url,
						   "delt" : delt };
		var json_str = JSON.encode(json_obj);
		
		var request = new Request({
			method: 'post',
			url:'/api/setCache_ws.php',
			data: 'key=' + guid
				+ "&expire=60" + "&data=" + json_str,
			onSuccess: (function(responseText, responseXML) {			
			}).bind(this)
		});
		request.send();	
	}
}

function getQueryParam( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

function doDelauth() {
	Cookie.dispose('import');
	var request = new Request({
		method: 'post',
		url:'/api/handle_delauth_ws.php',
		data: 'reqtype=access'
			+ "&consent_token=" + escape(delauth_token),
		onFailure: function(msg) {
			setImportFailedCookie();
			setMemcacheKey(-1);
		},
		onSuccess: (function(responseText, responseXML) {
			var resp=JSON.decode(responseText);
			if (resp.status==="SUCCESS" && resp.data) {
				Cookie.write(resp.data.cookie_name, resp.data.cookie_value, {duration: resp.data.cookie_ttl});
				delt = resp.data.delt;
				contact_url = unescape(resp.data.contact_url);
				setImportCookie(contact_url);
				setMemcacheKey(contact_url);
				window.close();
			} else {
				setImportFailedCookie();
				setMemcacheKey(-1);
			}
		}).bind(this)
	});
	request.send();
}

function doOauth(){
	Cookie.dispose('import');
	var provider = getQueryParam('provider');
	if( getQueryParam('requestId') ){
		provider = 'aim';			
	}
	if( provider == 'google'){
		provider = 'gmail';
	}
	
	if( getQueryParam('callback') == 2 ) {
		protocol = 'aim';
		contact_url = getQueryParam('contact_url');
		//alert(contact_url);
		setImportCookie(unescape(contact_url));
		setMemcacheKey(unescape(contact_url));
		window.close();
	} 
			
	var req = new Request({
		method: 'post',
		url:'/api/handle_oauth_ws.php',
		data: 'reqtype=access&widget=1&service=contacts&provider=' + provider
			+ "&oauth_token=" + getQueryParam('st_oauth_token')
			+ "&oauth_token_secret=" + getQueryParam('st_oauth_token_secret')
			+ "&token_a=" + getQueryParam('token_a')
			+ "&base_url=" + base_url
			+ "&referer=share3x/import.php",
		onFailure: function(msg) {
			setImportFailedCookie();
			setMemcacheKey(-1);
		},
		onSuccess: function(json) {
			json = JSON.decode(json);
			var status = json.status;
			var statusMessage = json.statusMessage;
			if (status == "SUCCESS") {
				//alert(json.data.url);
				contact_url = json.data.url;
				if( json.data.need_consent ){
					window.location.href = json.data.url;
				} else {
					setImportCookie(contact_url);
					setMemcacheKey(contact_url);
					window.close();
				}
			} else {
				setImportFailedCookie();
				setMemcacheKey(-1);
			}
		}
	}).send();
}


