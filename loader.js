/*
 * ShareThis Widget Loader 1.0.0
 * July 2009
 */
window.sharethis = window.sharethis || {};
sharethis.widgets = sharethis.widgets || {};
sharethis.utilities = sharethis.utilities || {};

/*
 * Discovery Widget
 */
sharethis.widgets.discovery = function(container, options) {
	this.location = 'http://demo.sharethis.com/disc/index.html';
	this.defaults = {
		width: 300,
		height: 450,
		title: "<b>Discover</b> what's popular right now!",
		results: 4,
		topic: '',
		adTopic: '',
		domain: location.host,
		border: '1px #58585A solid',
		components: {
			header: true,
			topics: true,
			time: true,
			pagination: true,
			refresh: true,
			ad: true,
			footer: true
		},
		colors: {
			titlebg: '#58585a',
			titlefg: '#ffffff',
			topicbg: '#d1d2d4',
			topicfg: '#0f75bc',
			bodybg: 'white',
			bodyfg: '#3a3a3c',
			metafg: '#a0a2a4'
		}
	};
	this.settings = {};
	sharethis.utilities.merge(this.settings, this.defaults);
	sharethis.utilities.merge(this.settings, options);
	
	this.createQueryString = function() {
		var settings = new Array('width', 'height', 'title', 'results', 'topic', 'domain', 'border', 'adTopic');
		var components = new Array('header', 'topics', 'time', 'pagination', 'refresh', 'ad', 'footer');
		var colors = new Array('titlebg', 'titlefg', 'topicbg', 'topicfg', 'bodybg', 'bodyfg', 'metafg');
		var params = new Array();
		for (i=0; i<settings.length; i++) {
			params.push(settings[i] + "=" + encodeURIComponent(this.settings[settings[i]]));
		}
		for (i=0; i<components.length; i++) {
			params.push("components." + components[i] + "=" + encodeURIComponent(this.settings.components[components[i]]));
		}
		for (i=0; i<colors.length; i++) {
			params.push("colors." + colors[i] + "=" + encodeURIComponent(this.settings.colors[colors[i]]));
		}
		return params.join("&");
	}
	
	this.initialize = function(container, options) {
		try {
			this.frame = document.createElement('<iframe name="stw_discovery" allowTransparency="true" style="body{background:transparent;},display=inline"></iframe>');
		} catch (err) {
			this.frame = document.createElement('iframe');
			this.frame.allowTransparency='true';	
			this.frame.setAttribute('allowTransparency', 'true');
		}
		this.frame.id = 'stw_discovery';
		this.frame.className = 'stw_discovery';
		this.frame.name = 'stw_discovery';
		this.frame.frameBorder = '0';
		this.frame.scrolling = 'no';
		this.frame.width = this.settings.width+'px';
		this.frame.height = this.settings.height+'px';
				
		this.frame.src = this.location + '#' + this.createQueryString();

		container.appendChild(this.frame);
	}
	
	this.initialize(container, options);
};

/*
 * JS Object Merge Utility
 */
sharethis.utilities.merge = function(destination, source) {
	for (attribute in source) {
		if (typeof(destination[attribute]) != 'object') {
			destination[attribute] = source[attribute];
		} else {
			sharethis.utilities.merge(destination[attribute], source[attribute]);
		}
	}
};
