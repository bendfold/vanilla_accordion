"use strict";

var VanillaAccordion = function( el, extendObj ) {
	var defaults = {
			"foo" : "bar",
			// COLLECTIONS
			"TRANSFORM_PREFIX_COLLECTION" : ["transform", "-ms-transform", "-moz-transform", "-webkit-transform", "-o-transform"],
			"TRANSFORM_ATTR_PREFIX_COLLECTION" : ["transform", "msTransform", "MozTransform", "webkitTransform", "OTransform"],
			"TRANSITION_ATTR_PREFIX_COLLECTION" : ["transition", "msTransition", "MozTransition", "webkitTransition", "OTransition"],
		},
		elems = {
			el : el,
			wrapperElem : el.getElementsByClassName( 'todo' )
		},
		config = JSON.parse( el.dataset.accordConfig ),
		// TODO
		oTools = window.oTools;
	
	console.log('document ', el.getElementsByClassName( config.panelClass ) );

	config.panelCollection = el.getElementsByClassName( config.panelClass );
	
	console.log( 'config ', config );
	// console.log( 'this ', this );
	// console.log( 'el ', el );



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
		console.log( "setupMarkup fired" );
		// Add toggleable-hidden class to all panels
		// Add toggleable class to all panels
		return true;
	},
	attachEvents : function () {
		// foo.addEventListener('click', oTools.fn.bindEvents(this, 'bar'), false);
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











