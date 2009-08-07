var config = {
		width: 300,
		height: 450,
		title: "<b>Discover</b> what's popular right now!",
		results: 4,
		topic: 'root',
		domain: 'foxnews.com',
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
var headerHTML;

var contentStore;
var topicStore;
var currentTopic = "root";
var currentDomain = "foxnews.com";
var currentPeriod = 7;
var currentDestination = "";


function configParameters(query) {
	var keyValuePairs = query.split(/[&?]/g);
	var params = {};
	for (var i = 0, n = keyValuePairs.length; i < n; ++i) {
		var m = keyValuePairs[i].match(/^([^=]+)(?:=([\s\S]*))?/);
		if (m) {			
			setGlobals(decodeURIComponent(m[1]), decodeURIComponent(m[2]) );
			// params[key] = decodeURIComponent(m[2]);
		}
	}
	// return params;
}

function setGlobals(strArg,value) {
	var answer="";
	if(value===0){answer="No";}
	if(value===1){answer="Yes";}
	try{value=decodeURIComponent(value);}catch(err){}
	try{value=decodeURIComponent(value);}catch(err){}

	switch(strArg) {
		case "width":
			config.width = parseInt(value);
			break;    
		case "height":
			config.height = parseInt(value);
		  break;
		case "title":
			config.title = value;
			break;  
		case "results":
			config.results = parseInt(value);
			break;  
		case "topic":
			config.topic = value;
			break;  
		case "domain":
			config.domain = value;
			break;  
		case "border":
			config.border = value;
			break;
		case "components.header":
			if (value == "true") {
				config.components.header = true;
			} else {
				config.components.header = false;
			}
			break; 
		case "components.topics":
			if (value == "true") {
				config.components.topics = true;
			} else {
				config.components.topics = false;
			}
			break; 
		case "components.time":
			if (value == "true") {
				config.components.time = true;
			} else {
				config.components.time = false;
			}
			break; 
		case "components.pagination":
			if (value == "true") {
				config.components.pagination = true;
			} else {
				config.components.pagination = false;
			}
			break; 
		case "components.refresh":
			if (value == "true") {
				config.components.refresh = true;
			} else {
				config.components.refresh = false;
			}
			break; 
		case "components.ad":
			if (value == "true") {
				config.components.ad = true;
			} else {
				config.components.ad = false;
			}
			break; 
		case "components.footer":
			if (value == "true") {
				config.components.footer = true;
			} else {
				config.components.footer = false;
			}
			break; 
		case "colors.titlebg":
			config.colors.titlebg = value;
			break;
		case "colors.titlefg":
			config.colors.titlefg = value;
			break;
		case "colors.topicbg":
			config.colors.topicbg = value;
			break;
		case "colors.topicfg":
			config.colors.topicfg = value;
			break;
		case "colors.bodyfg":
			config.colors.bodyfg = value;
			break;
		case "colors.bodybg":
			config.colors.bodybg = value;
			break;
		case "colors.metafg":
			config.colors.metafg = value;
			break;
		default: 
			// do nothing
			break;
	}
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
	contentStore.load( { params: { start: 0, limit: config.results, domain: currentDomain, period: currentPeriod, topic: currentTopic } });
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

		autoLoad: { params: { start: 0, limit: config.results, domain: currentDomain, period: currentPeriod, topic: currentTopic } }
		
	});
	
	var tpl = new Ext.XTemplate( 
		'<tpl for=".">',
		'<div class="{[xindex === xcount ? "lastListElement" : "listElement"]}">',
		    '<div class="resultTitle"><a href="{url}" title="{title}" target="_blank">{[Ext.util.Format.ellipsis(values.title.replace(/FOXNews.com - /,""), 80, true)]}</a></div>',
		    '<div class="resultViews">viewed {[Ext.util.Format.number(parseInt(values.views), "0,000")]}</div>',
			'<div class="viewsSharesSeparator"></div>',
		    '<div class="resultShares">shared {[Ext.util.Format.number(parseInt(values.shares), "0,000")]}</div>',
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
		pageSize: config.results,
		store: contentStore,
		ctCls:'pagingBar',
		plugins: new Ext.ux.CustomPaging({paginationDisplay: config.components.pagination, refreshDisplay: config.components.refresh})
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
	
	
	if (!config.components.pagination && !config.components.refresh) {
		pagebar.getEl().setDisplayed(false);
	}
	
	Ext.fly('resultsView').setStyle('background-color', config.colors.bodybg);
	Ext.fly('resultsView').setStyle('color', config.colors.bodyfg);
//	Ext.fly('')
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
	configParameters(document.location.hash.substring(1));
    
	headerHTML = '<div id="headerText" class="headerText">'+ config.title + '</div>';
	currentTopic = config.topic;
	currentDomain = config.domain;
	
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
	if (config.border) {
		Ext.fly('container').setStyle('border', config.border);
		Ext.fly('header').setStyle('border', config.border);
		Ext.fly('content').setStyle('border', config.border);
	}
	
	if (!config.components.header) {
		Ext.fly('header').setDisplayed(false);
	} else {
		Ext.fly('header').setStyle('color', config.colors.titlefg);
		Ext.fly('header').setStyle('background-color', config.colors.titlebg);
	}
	
	if (!config.components.ad) {
		Ext.fly('bottom_ad').setDisplayed(false);
	}
	
	if (!config.components.footer) {
		Ext.fly('footer').setDisplayed(false);
	} else {
		Ext.fly('footer').setStyle('color', config.colors.titlefg);
		Ext.fly('footer').setStyle('background-color', config.colors.titlebg);		
	}
	
	if (!config.components.time) {
		Ext.fly('sorting').setDisplayed(false);
	} else {
		Ext.fly('sorting').setStyle('color', config.colors.bodyfg);
	}
	
	
	if (!config.components.topics) {
		Ext.fly('cloud').setDisplayed(false);
	} else {
		Ext.fly('cloud').setStyle('color', config.colors.topicfg);
		Ext.fly('cloud').setStyle('background-color', config.colors.topicbg);
	}
	
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
