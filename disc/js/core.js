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
			url: 'http://wd.sharethis.com/api/getTopics_ws.php',
		}),
		reader: new Ext.data.JsonReader({
			totalProperty: 'topic_count',
			root: 'topics',
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
	contentStore.load( { params: { start: 0, limit: 4, domain: currentDomain, period: currentPeriod, topic: currentTopic } });
}

function genContentList() {
	contentStore = new Ext.ux.data.PagingStore({
		totalProperty: 'url_count',
		root: 'items',
		fields: ['oid', 'title', 'url', 'views', 'shares', 'services'],
		proxy: new Ext.data.HttpProxy({
			url: 'http://wd.sharethis.com/api/getTopics_ws.php',
		}),
		reader: new Ext.data.JsonReader({
			totalProperty: 'url_count',
			root: 'urls',
			idProperty: 'oid',
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
			topic: currentTopic,
		},
		autoLoad: { params: { start: 0, limit: 4, domain: currentDomain, period: currentPeriod, topic: currentTopic } },
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
					returnStr += '<a class="' + arr[i] + '"></a>';
				}
				return returnStr;
			},
		}
	);

	var pagebar = new Ext.PagingToolbar({
		pageSize: 4,
		store: contentStore,
		ctCls:'pagingBar',
		plugins: new Ext.ux.CustomPaging(),
	});

	var panel = new Ext.Panel({
		items: new Ext.DataView({                                                                                                                
			id: 'resultsView',
			store: contentStore,
	//		height:239,
			tpl: tpl,
			itemSelector:'div.thumb-wrap',
		}),
		bbar: pagebar,
		border: false,

	});
	panel.render('content');
}

var contentStore;
var topicStore;
var currentTopic = "root";
var currentDomain = "foxnews.com";
var currentPeriod = 7;
var currentDestination = "";
var options = queryParameters(document.location.hash.substring(1));


Ext.override(Ext.PagingToolbar, {
    refresh: function(){
        currentTopic = "root";
        currentPeriod = 7;
        currentDestination = "";
				
		var headerTemplate = new Ext.Template('<div id="headerText" class="headerText">Discover what\'s popular right now!</div>');
		headerTemplate.overwrite('header');
		 
 		reload();
    }
});

Ext.onReady(function(){
	//Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
	// setup the options
	merge(config, defaults);
	merge(config, options);
	
	view = new Ext.Viewport({
		layout: 'border',
		hideBorders: true,
		items: [{
			region: 'center',
			html: '<div id="container">'+
				  '<div id="header"><span id="headerText" class="headerText">Discover what\'s popular right now!</span></div>'+
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
	
	/*
	new Ext.Viewport({
	    layout: 'border',
	    items: [{
	        region: 'north',
	        html: '<h1 class="x-panel-header">Page Title</h1>',
	        autoHeight: true,
	        border: false,
	        margins: '0 0 5 0'
	    }, {
	        region: 'west',
	        collapsible: true,
	        title: 'Navigation',
	        width: 200
	        // the west region might typically utilize a TreePanel or a Panel with Accordion layout 

	    }, {
	        region: 'south',
	        title: 'Title for Panel',
	        collapsible: true,
	        html: 'Information goes here',
	        split: true,
	        height: 100,
	        minHeight: 100
	    }, {
	        region: 'east',
	        title: 'Title for the Grid Panel',
	        collapsible: true,
	        split: true,
	        width: 200,
	        xtype: 'grid',
	        // remaining grid configuration not shown ...

	        // notice that the GridPanel is added directly as the region

	        // it is not "overnested" inside another Panel

	    }, {
	        region: 'center',
	        xtype: 'tabpanel', // TabPanel itself has no title

	        items: {
	            title: 'Default Tab',
	            html: 'The first tab\'s content. Others may be added dynamically'
	        }
	    }]
	});	
	
	*/
	
	genTopicCloud();
	genFilter();
	genContentList();
});

var defaults = {
		width: 300,
		height: 440,
		title: "Discover what's popular right now!",
		results: 4,
		topic: '',
		domain: location.host,
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


function merge(destination, source) {
	for (attribute in source) {
		if (typeof(destination[attribute]) != 'object') {
			destination[attribute] = source[attribute];
			
		} else {
			merge(destination[attribute], source[attribute]);
		}
	}
}