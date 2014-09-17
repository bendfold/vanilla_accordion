"use strict";

var VanillaAccordion = function( el, extendObj ) {
	var defaults = {
			"jsActiveClass" : "accordion-init",
			"vendorPrefixes" : oTools.fn.setVendorPrefix()
		},
		config = JSON.parse( el.dataset.accordConfig ),
		elems = {
			el : el,
			panelCollection : el.getElementsByClassName( config.panelClass ),
			triggerCollection : el.getElementsByClassName( config.trigger ),
		};

console.log( 'defaults ', defaults);

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
		// oTools.fn.setVendorPrefix( this.config.vendorPrefixes );
		// Set up the HTML accordingly
		this.setupMarkup();
		// Attach click events to panel headers
		this.attachEvents();
	},
	setupMarkup : function() {
		var el = this.elems.el;
		// Add class to wrapper to let CSS know we can hide the content
		el.classList.add( this.config.jsActiveClass );

		
		console.log('panelCollection ', this.elems.panelCollection);


		return true;
	},
	attachEvents : function () {
		var triggerCollection = this.elems.triggerCollection;
		// Add toggleable-hidden class to all panels
		for ( var i = 0; i < triggerCollection.length; i += 1 ) {
			triggerCollection[ i ].addEventListener( 'click', oTools.fn.bindEvents(this, 'toogleVisibility'), false );
		}
	},
	toogleVisibility : function ( self ) {
		var clickedElem = self.target,
			myParentNode = this.closest( clickedElem, this.config.panelClass ),
			panelCollection = this.elems.panelCollection;
		
		console.log( this.config.vendorPrefixes );

		if ( myParentNode.classList.contains( this.config.activeClass ) ) {
			// Remove the active class from my parent
			myParentNode.classList.remove( this.config.activeClass );
		} else {
			// Remove all visble classes
			for ( var i = 0; i < panelCollection.length; i += 1 ) {
				panelCollection[i].classList.remove( this.config.activeClass );
			}
			// Add the active class to the parent node
			myParentNode.classList.add( this.config.activeClass );
		}
	},
	// TODO - LIFT THIS OUT TO LIB
	closest : function ( sourceElem, selector ) {
		while ( sourceElem ) {
			if( sourceElem.classList.contains(selector) ){
				return sourceElem;
			}
			sourceElem = sourceElem.parentNode;
		}
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











