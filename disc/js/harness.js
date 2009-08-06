var config = {
		width: 300,
		height: 450,
		title: "Discover what's popular right now!",
		results: 4,
		topic: 'root',
		adTopic: 'television',
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

var domainList = [
                  [1, '38thespot.com'],
                  [2, '9wsyr.com'],
                  [3, 'abc15.com'],
                  [4, 'abc2news.com'],
                  [5, 'abcactionnews.com'],
                  [6, 'accesshollywood.com'],
                  [7, 'ajc.com'],
                  [8, 'bartlesvillelive.com'],
                  [9, 'beta.cincinnati.com'],
                  [10, 'boston.com'],
                  [11, 'cataloglink.com'],
                  [12, 'cincinnati.com'],
                  [13, 'cinweekly.cincinnati.com'],
                  [14, 'communitypress.cincinnati.com'],
                  [15, 'cosmopolitan.com'],
                  [16, 'dsc.discovery.com'],
                  [17, 'dunes.cincinnati.com'],
                  [18, 'elle.com'],
                  [19, 'etonline.com'],
                  [20, 'examiner.com'],
                  [21, 'fastcompany.com'],
                  [22, 'foxnews.com'],
                  [23, 'huffingtonpost.com'],
                  [24, 'kjrh.com'],
                  [25, 'kypost.com'],
                  [26, 'latimes.com'],
                  [27, 'marketwatch.com'],
                  [28, 'mtv.com'],
                  [29, 'nbcactionnews.com'],
                  [30, 'news.cincinnati.com'],
                  [31, 'nky.cincinnati.com'],
                  [32, 'oodle.com'],
                  [33, 'pcworld.com'],
                  [34, 'remotecontrol.mtv.com'],
                  [35, 'rodeo.cincinnati.com'],
                  [36, 'scripps.com'],
                  [37, 'sparknotes.com'],
                  [38, 'sparkpeople.com'],
                  [39, 'sports.espn.go.com'],
                  [40, 'thinkgeek.com'],
                  [41, 'usmagazine.com'],
                  [42, 'wcpo.com'],
                  [43, 'wired.com'],
                  [44, 'womansday.com'],
                  [45, 'wptv.com'],
                  [46, 'wxyz.com'],
                  [47, 'zillow.com']
                  ];
                  
Ext.onReady(function(){
 
	view = new Ext.Viewport({
		layout: 'border',
		hideBorders: false,
		title: 'Demo',
		items: [{
			region: 'west',
			xtype: 'form',
			title: 'Customize the discovery widget here',
			id: 'west-region-container',
			width: 400,
			height:315,
			labelPad: 10,
			labelWidth:150,
	//		monitorValid: true,
			defaults: {bodyStyle:'padding:15px'},
//			itemCls: 'indent'
			buttons: [{xtype: 'button', minWidth: 30, text: 'Reload', fieldLabel: 'Reload', formBind: true, 
						listeners: {
							scope: this, 
							'click': function(event, elem) {
								var orig = Ext.fly("st_disc_container");
								orig.replaceWith({id:'st_disc_container', tag:'div', html:''});
								st_disc_widget = new sharethis.widgets.discovery(document.getElementById("st_disc_container"), config);
							}
						}
					}]
			},
			{
			region: 'center',
//			height: 500,
//			width: 500,
//			minSize: 300,
//			maxSize: 350,
			xtype: 'panel',
			title: 'See your customized widget',
//			id: 'st_disc_container',
			layout: 'fit',
			items: [{html: "<div id = 'st_disc_container'></div>"}]
			},
		{
			region: 'east',
			height: 500,
			minHeight: 300,
			width: 350,
			xtype: 'panel',
			title: 'Customize and See your Ad Widget'	
		}]
	});
	
	var container = Ext.fly("st_disc_container");
	var st_disc_widget = new sharethis.widgets.discovery(document.getElementById("st_disc_container"), config);

	
	// add a combo box for domain selection
	// create the combo instance
	var combo = new Ext.form.ComboBox({
	    typeAhead: true,
	    triggerAction: 'all',
	    lazyRender:true,
	    mode: 'local',
	    store: new Ext.data.ArrayStore({
	        id: 0,
	        fields: [
	            'myId',
	            'displayText'
	        ],
	        data: domainList
	    }),
	    valueField: 'myId',
	    displayField: 'displayText',
	    fieldLabel: 'Publisher(Data)',
	    listeners:{
			scope: this,
			'select': function(event, elem) {
				config.domain = elem.data.displayText;
			}
		}
	});
	wrc = Ext.getCmp('west-region-container');
	wrc.removeAll();
	wrc.add(combo);
	
	wrc.add({xtype: 'textarea', allowBlank: false, emptyText: config.title, fieldLabel: 'Custom Header Text', maxLength: 140, grow: true, id: 'customHeader',
	    listeners:{
			scope: this,
			'change': function(event, elem) {
				config.title = Ext.get('customHeader').dom.value;
			}	
		}
	});
	
	wrc.add({xtype: 'textfield', allowBlank: false, emptyText: config.topic, fieldLabel: 'Custom Topic', id: 'customTopic',
	    listeners:{
			scope: this,
			'change': function(event, elem) {
				config.topic = Ext.get('customTopic').dom.value;
			}	
		}
	});
	
	wrc.add({xtype: 'textfield', allowBlank: false, emptyText: config.adTopic, fieldLabel: 'Custom Ad Topic', vtype: 'alphanum', id: 'customAdTopic',
	    listeners:{
			scope: this,
			'change': function(event, elem) {
				config.adTopic = Ext.get('customAdTopic').dom.value;
			}	
		}
	});
	
	wrc.add({xtype: 'numberfield', allowBlank: false, emptyText: config.results, fieldLabel: 'No of Results', allowDecimals: false, allowNegative: false, maxValue: 20,
		listeners: {
			scope: this,
			'change': function(elem, newvalue, oldvalue) {
				config.results = newvalue;
			}
		}
	});
	
	
	wrc.add({xtype: 'numberfield', allowBlank: false, emptyText: config.width, fieldLabel: 'Width (300-340)', allowDecimals: false, allowNegative: false, maxValue: 340, 
		minValue: 300,
		listeners: {
			scope: this,
			'change': function(elem, newvalue, oldvalue) {
				config.width = newvalue;
			}
		}
	});
	
	wrc.add({xtype: 'checkbox', allowBlank: false, emptyText: config.width, fieldLabel: 'Remove Topic Cloud',
		handler: function(checkbox, checked) {
			config.components.topics = !checked;
		}
	});
	
	wrc.add({xtype: 'checkbox', allowBlank: false, emptyText: config.width, fieldLabel: 'Remove Time Dimension',
		handler: function(checkbox, checked) {
			config.components.time = !checked;
		}
	});
	
	wrc.add({xtype: 'checkbox', allowBlank: false, emptyText: config.width, fieldLabel: 'Remove Pagination',
		handler: function(checkbox, checked) {
			config.components.pagination = !checked;
		}	
	});
	wrc.add({xtype: 'checkbox', allowBlank: false, emptyText: config.width, fieldLabel: 'Remove Refresh',
		handler: function(checkbox, checked) {
			config.components.refresh = !checked;
		}
	});

	wrc.doLayout();
})
