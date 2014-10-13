"use strict";

var VanillaAccordion = function( el, extendObj ) {
	var defaults = {
			"jsActiveClass" : "accordion-init",
			"vendorPrefixes" : oTools.fn.setVendorPrefix(),
			"classNames" : {
				"contentWrapClass" : "content-wrapper"
			},
			"scrollSpeed" : 600
		},
		config = JSON.parse( el.dataset.accordConfig ),
		elems = {
			el : el,
			panelCollection : el.getElementsByClassName( config.panelClass ),
			triggerCollection : el.getElementsByClassName( config.trigger ),
		};


	// console.log( 'defaults ', defaults);
	this.numbers = {
		"panelHeights" : []
	}
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
		var el = this.elems.el,
			config = this.config,
			panelCollection = this.elems.panelCollection;
		// Add class to wrapper to let CSS know we can hide the content
		el.classList.add( this.config.jsActiveClass );
		// Process the panels and set a few things up
		for ( var i = 0; i < panelCollection.length; i += 1 ) {
			
			panelCollection[i].setAttribute( 'data-index', i );

			var targetElem = panelCollection[i].getElementsByClassName( config.panelContent ),
				// Wrap each content container in an outter div that we can hide
				wrappedContent = this.wrapElem( targetElem[0] );
			
			// Add our wrapped content to the DOM
			panelCollection[i].appendChild( wrappedContent );

			// Meausure the height of each inner content div
			this.numbers.panelHeights.push( targetElem[0].offsetHeight );
		}
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
			panelCollection = this.elems.panelCollection,
			panelIndex = 0;

		if ( myParentNode.classList.contains( this.config.activeClass ) ) {
			// Remove the active class from my parent
			myParentNode.classList.remove( this.config.activeClass );
			var myContentWrapper = myParentNode.querySelector( '.content-wrapper' );
			myContentWrapper.style.height = 0;
			// panelIndex = myParentNode.dataset.index;
		} else {
			// Remove all visble classes
			for ( var i = 0; i < panelCollection.length; i += 1 ) {
				panelCollection[i].classList.remove( this.config.activeClass );
				
				var myContentWrapper = panelCollection[i].querySelector( '.content-wrapper' );
				myContentWrapper.style.height = 0;
			
			}
			// Add the active class to the parent node
			myParentNode.classList.add( this.config.activeClass );
			// panelIndex = myParentNode.dataset.index;
			this.numbers.panelIndex = myParentNode.dataset.index;
			console.log( this.numbers.panelHeights[ this.numbers.panelIndex ] );
			myParentNode.querySelector('.content-wrapper').style.height = this.numbers.panelHeights[ this.numbers.panelIndex ] + 'px';
			// this.showContent( clickedElem );
		}
	},
	wrapElem : function ( targetElem ) {
		
		var docFrag = document.createDocumentFragment(),
			contentWrapper = document.createElement( 'div' );
		contentWrapper.classList.add( this.config.classNames.contentWrapClass );
		docFrag.appendChild( contentWrapper );
		docFrag.childNodes[0].appendChild( targetElem );
		
		// console.log( 'docFrag.childNodes[0] ', docFrag.childNodes[0] );
		// console.log( 'targetElem ', typeof targetElem );

		return docFrag;
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











