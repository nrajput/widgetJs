var defaults = {
		width: 300,
		height: 450,
		title: "Discover what's popular right now!",
		results: 4,
		topic: '',
		domain: 'foxnews.com',
		components: {
			header: true,
			topics: true,
			time: true,
			navigation: true,
			refresh: true,
			ad: true,
			footer: true
		},
		colors: {
			titlebg: '#58585a',
			titlefg: '#ffffff',
			topicbg: '#d1d2d4',
			topicfg: '#0f75bc',
			bodybg: '#000000',
			bodyfg: '#3a3a3c',
			metafg: '#a0a2a4'
		}
	};
var config = {};
var headerHTML;

var contentStore;
var topicStore;
var currentTopic = "root";
// var currentDomain = "usmagazine.com";
var currentDomain = "foxnews.com";
var currentPeriod = 7;
var currentDestination = "";
var options = queryParameters(document.location.hash.substring(1));


function queryParameters(query) {
	var keyValuePairs = query.split(/[&?]/g);
	var params = {};
	for (var i = 0, n = keyValuePairs.length; i < n; ++i) {
		var m = keyValuePairs[i].match(/^([^=]+)(?:=([\s\S]*))?/);
		if (m) {
			var key = decodeURIComponent(m[1]);
			(params[key] || (params[key] = [])).push(decodeURIComponent(m[2]));
		}
	}
	return params;
}

function genTopicCloud() {
	topicStore = new Ext.ux.data.PagingStore({
		totalProperty: 'topic_count',
		root: 'items',
		idProperty: 'num',
		fields: ['count', 'score', 'neigh'],
		proxy: new Ext.data.HttpProxy({
			url: '/api/getTopics_ws.php'
		}),
		reader: new Ext.data.JsonReader({
			totalProperty: 'topic_count',
			root: 'topics'
		}, [
			{name: 'count'},
			{name: 'score'},
			{name: 'tag', mapping: 'neigh'}
		]),
		autoLoad: { params: { start: 0, limit: 20, domain: currentDomain, period: currentPeriod, topic: currentTopic } }
	});
	
   
    var cloud = new Ext.ux.TagCloud({
        store: topicStore, 
        displayField: 'tag', 
        weightField: 'count', 
        displayWeight: false
    }
      							   );
    cloud.on('tagselect', function(cloud, record, index){
		currentTopic = record.get('tag');
		contentStore.setBaseParam('topic', currentTopic);

		 var headerTemplate = new Ext.XTemplate(
			'<div id="headerText" class="topicHeaderText">Discover more about: <span id="headerTopic">{[Ext.util.Format.ellipsis(values.topic, 12, true)]}</span></div>'
		  );
		headerTemplate.overwrite('header', { topic: currentTopic.replace(/_/g, ' ') });

		reload();
    });
    cloud.render('cloud');
}

function genFilter() {
	Ext.each( [1, 7, 30], function(period){
		Ext.fly(period + 'dayFilter').on('click', function(e, t) {	
			currentPeriod = period;
			reload();
		});	
	});
}

function reload() {
	
	// setup the right input filter
	Ext.fly(currentPeriod + 'dayFilter').radioClass('selected');
	
	// setup the parameters for topicStore
	topicStore.setBaseParam('period', currentPeriod);
	topicStore.setBaseParam('topic', currentTopic);	
	topicStore.load( { params: { start: 0, limit: 5, domain: currentDomain, period: currentPeriod, topic: currentTopic } });
	
	// setup the parameters for contentStore
	contentStore.setBaseParam('period', currentPeriod);
	contentStore.setBaseParam('topic', currentTopic);
	console.log(parseInt(config.results));
	contentStore.load( { params: { start: 0, limit: parseInt(config.results), domain: currentDomain, period: currentPeriod, topic: currentTopic } });
}


function genContentList() {
	contentStore = new Ext.ux.data.PagingStore({
		totalProperty: 'url_count',
		root: 'items',
		fields: ['oid', 'title', 'url', 'views', 'shares', 'services'],
		proxy: new Ext.data.HttpProxy({
			url: '/api/getTopics_ws.php'
		}),
		reader: new Ext.data.JsonReader({
			totalProperty: 'url_count',
			root: 'urls',
			idProperty: 'oid'
		}, [
			{name: 'oid'},
			{name: 'title'},
			{name: 'url'},
			{name: 'views'},
			{name: 'shares'},
			{name: 'services'}
		]),
		baseParams: {
			domain: currentDomain,
			period: currentPeriod, 
			topic: currentTopic
		},

		autoLoad: { params: { start: 0, limit: parseInt(config.results), domain: currentDomain, period: currentPeriod, topic: currentTopic } }
		
	});
	
	var tpl = new Ext.XTemplate( 
		'<tpl for=".">',
		'<div class="listElement">',
		    '<div class="resultTitle"><a href="{url}" title="{title}" target="_blank">{[Ext.util.Format.ellipsis(values.title, 80, true)]}</a></div>',
		    '<div class="resultViews">viewed {views}</div>',
			'<div class="viewsSharesSeparator"></div>',
		    '<div class="resultShares">shared {shares}</div>',
			'<div class="sharesServicesSeparator"></div>',
		    '<div class="resultServices">most shared on {[this.formatServices(values.services)]}</div>',
		'</div>',
		'</tpl>',
		{
			formatServices: function(services) {
				var arr = services.split(',');
				var returnStr = '';
				for ( var i = 0; i < arr.length; i++ ) {
					returnStr += '<span class="' + arr[i] + '">&nbsp;</span>';
				}
				return returnStr;
			}
		}
	);

	var pagebar = new Ext.PagingToolbar({
		pageSize: parseInt(config.results),
		store: contentStore,
		ctCls:'pagingBar',
		plugins: new Ext.ux.CustomPaging()
	});

	var panel = new Ext.Panel({
		items: new Ext.DataView({                                                                                                                
			id: 'resultsView',
			store: contentStore,
			tpl: tpl,
			itemSelector:'div.thumb-wrap'
		}),
		bbar: pagebar,
		border: false
	});
	panel.render('content');
}


Ext.override(Ext.PagingToolbar, {
    refresh: function(){
        currentTopic = config.topic;
        currentPeriod = 7;
        currentDestination = "";

		var headerTemplate = new Ext.Template(headerHTML);
		headerTemplate.overwrite('header');
 		reload();
    }
});

Ext.onReady(function(){
	//Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
	// setup the options
	merge(config, defaults);
	merge(config, options);
    
	headerHTML = '<div id="headerText" class="headerText">'+ config.title + '</div>';
//	currentTopic = config.topic;
	
	view = new Ext.Viewport({
		layout: 'border',
		hideBorders: true,
		items: [{
			region: 'center',
			html: '<div id="container">'+
				  '<div id="header">' + headerHTML + '</div>'+
				  '<div id="cloud"></div>' +
				  '<div id="content">' +
				  '<div class="clear"></div>' +
				  '<div id="sorting">' +
				  '<span id="1dayFilter" class="day"><a href="javascript:void(0)">Today</a></span>' +
				  '<span class="separator"></span>' +
				  '<span id="7dayFilter" class="day selected"><a href="javascript:void(0)">7 Days</a></span>' +
				  '<span class="separator"></span>' +
				  '<span id="30dayFilter" class="day"><a href="javascript:void(0)">30 Days</a></span>' +
				  '</div>' +
				  '<div class="clear"></div>' +
				  '</div>' +
				  '<div id="bottom_ad">' +
				  '<span class="ad_text">advertisement</span>' +
				  '<div id="bottom_ad_img"></div>' +
				  '</div>' +
				  '<div id="footer"><span id="footerText" class="footerText"><a href="http://www.sharethis.com">Powered by ShareThis</a></span></div>' +
				  '</div>'
		}]
	});
	
    // enable & disable components
	// console.log(options.components.header[0]);
	//if (config.components.header[0] == "false") {
	// Ext.fly('header').setDisplayed(false);
	Ext.fly('bottom_ad').setDisplayed(false);
	Ext.fly('footer').setDisplayed(false);
	Ext.fly('sorting').setDisplayed(false);
	Ext.fly('cloud').setDisplayed(false);
	// Ext.fly('x-toolBar').setDisplayed(false);
	//}
	
	genTopicCloud();
	genFilter();
	genContentList();
});


function merge(destination, source) {
	for (attribute in source) {
		if (typeof(destination[attribute]) != 'object') {
			destination[attribute] = source[attribute];
			
		} else {
			merge(destination[attribute], source[attribute]);
		}
	}
}