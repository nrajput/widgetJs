// create namespace for plugins
Ext.namespace('Ext.ux');
 
/**
 * Ext.ux.plugins.IconCombo plugin for Ext.form.Combobox
 *
 * @author  Ing. Jozef Sakalos
 * @date    January 7, 2008
 *
 * @class Ext.ux.plugins.IconCombo
 * @extends Ext.util.Observable
 */
Ext.ux.CustomPaging = function(config) {
    Ext.apply(this, config);
};

Ext.extend(Ext.ux.CustomPaging, Ext.util.Observable, {
	init : function(pbar){
		
		Ext.apply(pbar, {
				  customNumPages: 1,
				  paginationDisplay: true,
				  refreshDisplay: true
		});

		if (this.paginationDisplay !== undefined) {
			pbar.paginationDisplay = this.paginationDisplay;
		}
		
		if (this.refreshDisplay !== undefined) {
			pbar.refreshDisplay = this.refreshDisplay;
		}
		
		pbar.items.getRange()[0].hide();
		pbar.items.getRange()[8].hide();
		Ext.each(pbar.items.getRange(2,6), function(c){
			c.hide();
		});

		if (!pbar.paginationDisplay) {
			pbar.items.getRange()[1].hide();
			pbar.items.getRange()[7].hide();
		}
		
		if (!pbar.refreshDisplay) {
			pbar.items.getRange()[10].hide();
		}
		
		pbar.insert(5, '<div id="pagingDotContainer"><div id="pagingDot1" class="pagingDot_disabled"></div></div>');
	
		if (!pbar.paginationDisplay) {
			pbar.items.getRange()[5].hide();
		}
		
		pbar.on({
			change: function(pb, data){
			
				if (pb.customNumPages < 5) {
					for (var ix = pb.customNumPages; ix < 5; ix++) {
						var headerTemplate = new Ext.Template('<div id="pagingDot{num}" class="pagingDot_disabled"></div>');
							headerTemplate.append('pagingDotContainer', {num: ix + 1} );
					}	
					pb.customNumPages = 5;
				}
			
				Ext.fly('pagingDot' + data.activePage).radioClass('pagingDot_selected');
				
				// setup the handlers for on click
				for( var i = 1; i <= data.pages; i++ ){
					Ext.fly('pagingDot'+i).removeClass('pagingDot_disabled');
					Ext.fly('pagingDot'+i).addClass('pagingDot')
					Ext.fly('pagingDot'+i).on('click' , function(clickEvent, elem) {
						if (elem.id.match('pagingDot')) {
							pbar.changePage(parseInt(elem.id.substring(9)));
						}
					});
				}
				
				for (var ix = data.pages + 1; ix <= pb.customNumPages; ix++) {
					Ext.fly('pagingDot'+ix).removeClass('pagingDot');
					Ext.fly('pagingDot'+ix).addClass('pagingDot_disabled');
					Ext.fly('pagingDot'+ix).removeAllListeners();
				}
			}
		});

	}

});
