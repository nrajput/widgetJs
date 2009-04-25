var rotate_found=false;
var button_default='<span><a class="stbutton stico_default" title="ShareThis via email, AIM, social bookmarking and networking sites, etc." href="javascript:void(0)"><span class="stbuttontext">ShareThis</span></a></span>';
var button_rotate='<span><a class="stbutton stico_rotate" title="ShareThis via email, AIM, social bookmarking and networking sites, etc." href="javascript:void(0)"><span class="stbuttontext">ShareThis</span></a></span>';

var stBlogger = {
	loadScript: function(sScriptSrc, oCallback) {
		var oHead = document.getElementsByTagName('head')[0];
		var oScript = document.createElement('script');
		oScript.setAttribute('type', 'text/javascript');
		oScript.setAttribute('src', sScriptSrc);
		oScript.onload = oCallback;
		oScript.onreadystatechange = function() {
			if (this.readyState == 'loaded') {
				oCallback();
			}
		}
		oHead.appendChild(oScript);
	},
	loadWidget: function(sScriptWidget) {
		stBlogger.loadScript(sScriptWidget, stBlogger.loadJQuery);
	},
	loadJQuery: function() {
		stBlogger.loadScript('http://w.sharethis.com/widget/jquery2.js', stBlogger.createEntries);
	},
	createEntries: function() {
		$('.hentry').each(function(){
		
		if(!rotate_found){	
			var button = $(button_default);
			}
			else{
			var button = $(button_rotate);
			}
			
			$(this).find('.post-icons').append(button);
			var object = SHARETHIS.addEntry({
				title: $(this).find('.entry-title a').text(),
				url: $(this).find('.entry-title a').attr('href')
			},{button:false});
			object.attachButton(button.get(0));
		});
	},
	init: function(sScriptWidget) {
    
    if( (sScriptWidget.search(/style=rotate/g))>-1)
    {
    rotate_found=true;
    }
	
		stBlogger.loadWidget(sScriptWidget);
	}
}