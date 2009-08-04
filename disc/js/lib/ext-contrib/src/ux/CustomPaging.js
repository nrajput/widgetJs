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
				  navigationDisplay: true,
				  refreshDisplay: true
		});

		if (this.navigationDisplay !== undefined) {
			pbar.navigationDisplay = this.navigationDisplay;
		}
		
		if (this.refreshDisplay !== undefined) {
			pbar.refreshDisplay = this.refreshDisplay;
		}
		
		pbar.items.getRange()[0].hide();
		pbar.items.getRange()[8].hide();
		Ext.each(pbar.items.getRange(2,6), function(c){
			c.hide();
		});

		if (!pbar.navigationDisplay) {
			pbar.items.getRange()[1].hide();
			pbar.items.getRange()[7].hide();
		}
		
		if (!pbar.refreshDisplay) {
			pbar.items.getRange()[10].hide();
		}
		
		pbar.insert(5, '<div id="pagingDotContainer"><div id="pagingDot1" class="pagingDot"></div></div>');

		if (!pbar.navigationDisplay) {
			pbar.items.getRange()[5].hide();
		}
		
		pbar.on({
			change: function(pb, data){

				var pagingDivs = "";
				
				if(pb.customNumPages < data.pages){
					for( var i = pb.customNumPages + 1; i <= data.pages; i++ ){                                                    
						var headerTemplate = new Ext.Template(
							'<div id="pagingDot{num}" class="pagingDot"></div>'
						);
						headerTemplate.append('pagingDotContainer', {num: i} );
					}
					pb.customNumPages = data.pages;
				} else if( pb.customNumPages > data.pages){
					for( var i = pb.customNumPages; i > data.pages; i-- ){                                                    
						Ext.fly('pagingDot' + i).remove();
					}
					pb.customNumPages = data.pages;
				}  
				Ext.fly('pagingDot' + data.activePage).radioClass('pagingDot_selected');
				
				// setup the handlers for on click
				for( var i = 1; i <= data.pages; i++ ){                                                    
					Ext.fly('pagingDot'+i).on('click' , function(clickEvent, elem) {
						if (elem.id.match('pagingDot')) {
							pbar.changePage(parseInt(elem.id.substring(9)));
						}
					});
				} 
			}
		});

	}

});