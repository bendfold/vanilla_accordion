"use strict";

var VanillaAccordion = function( el, extendObj ) {
	var defaults = {
			"jsActiveClass" : "accordion-init",
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
			contentWrapperCollection : []
		};
	// Make a number object to store our globally used numbers in
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
		// Set up the HTML accordingly
		this.setupMarkup();
		// Attach click events to panel headers
		this.attachEvents();
	},
	setupMarkup : function() {
		var el = this.elems.el,
			config = this.config,
			panelCollection = this.elems.panelCollection,
			contentWrapSelector = ('.' + this.config.classNames.contentWrapClass);
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

			// Make an array and use the data-index to choose the one you wanna change the height of
			this.elems.contentWrapperCollection.push( panelCollection[i].querySelector( contentWrapSelector ) );

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
			myParentNode =  oTools.fn.closest( clickedElem, this.config.panelClass ),
			panelCollection = this.elems.panelCollection,
			panelIndex = 0;

		if ( myParentNode.classList.contains( this.config.activeClass ) ) {
			// Remove the active class from my parent
			myParentNode.classList.remove( this.config.activeClass );
			// Retract the conatiner
			this.retractContainer( myParentNode.dataset.index );
		} else {
			// Run through all the panels and check for visble classes
			for ( var i = 0; i < panelCollection.length; i += 1 ) {
				// If a panel has this class
				if ( panelCollection[i].classList.contains( this.config.activeClass ) ) {
					// Rmeove the class
					panelCollection[i].classList.remove( this.config.activeClass );
					// Retract the panel
					this.retractContainer( i );
				}
			}
			// Add the active class to the parent node
			myParentNode.classList.add( this.config.activeClass );
			// Expand the container wrapper
			this.expandContainer( myParentNode.dataset.index );
		}
	},
	retractContainer : function ( panelIndex ) {
		this.elems.contentWrapperCollection[ panelIndex ].style.height = 0;
	},
	expandContainer : function ( panelIndex ) {
		this.elems.contentWrapperCollection[ panelIndex ].style.height = this.numbers.panelHeights[ panelIndex ] + 'px';
	},
	wrapElem : function ( targetElem ) {
		
		var docFrag = document.createDocumentFragment(),
			contentWrapper = document.createElement( 'div' );
		contentWrapper.classList.add( this.config.classNames.contentWrapClass );
		docFrag.appendChild( contentWrapper );
		docFrag.childNodes[0].appendChild( targetElem );

		return docFrag;
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











