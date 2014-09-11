"use strict";

var VanillaAccordion = function( el, extendObj ) {
	var defaults = {
			"jsActiveClass" : "accordion-init"
		},
		config = JSON.parse( el.dataset.accordConfig ),
		elems = {
			el : el,
			panelCollection : el.getElementsByClassName( config.panelClass )
		};

	// Create global config object
	this.config = oTools.fn.extendObj( defaults, config );
	
	// Make objects availible to rest of script
	this.elems = elems;
	// Kick it off
	this.init();
	return this;
};

var methods = {
	init : function() {
		// Set vendor preixes for animation etc
		// this.setVendorPrefix();
		// Set up the HTML accordingly
		this.setupMarkup();
		// Attach click events to panel headers
		this.attachEvents();
	},
	setupMarkup : function() {
		 
		var el = this.elems.el;
		// Add class to wrapper to let CSS know we can hide the content
		el.classList.add( this.config.jsActiveClass );

		return true;
	},
	attachEvents : function () {
		var panelCollection = this.elems.panelCollection;
		// console.log( 'this.config ', this.config );
		// Add toggleable-hidden class to all panels
		for ( var i = 0; i < panelCollection.length; i += 1 ) {
			panelCollection[ i ].addEventListener( 'click', oTools.fn.bindEvents(this, 'toogleVisibility'), false );
		}

		// foo.addEventListener('click', oTools.fn.bindEvents(this, 'bar'), false);
	},
	toogleVisibility : function ( self ) {
		console.log('Class toggling', self.target);

	}
}

var attachMethodsToPrototype = function( methodObj, consructor ) {
	for( var item in methodObj ) {
		if( methodObj.hasOwnProperty(item) ){
			consructor.prototype[item] = methodObj[item];
		}
	}
};

attachMethodsToPrototype( methods, VanillaAccordion );

var accordionElem = document.getElementById( 'vanillaAccordion01' );

var myAccordion = new VanillaAccordion( accordionElem );











