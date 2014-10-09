"use strict";

var VanillaAccordion = function( el, extendObj ) {
	var defaults = {
			"jsActiveClass" : "accordion-init",
			"vendorPrefixes" : oTools.fn.setVendorPrefix(),
			"panelHeights" : [],
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
		
		// console.log( 'clickedElem ', clickedElem );
		// console.log( 'myParentNode ', myParentNode );
		// console.log( 'myParentNode ', myParentNode.dataset.index );
		// console.log( 'panelCollection ', panelCollection );

		if ( myParentNode.classList.contains( this.config.activeClass ) ) {
			// Remove the active class from my parent
			myParentNode.classList.remove( this.config.activeClass );
			// panelIndex = myParentNode.dataset.index;
		} else {
			// Remove all visble classes
			for ( var i = 0; i < panelCollection.length; i += 1 ) {
				panelCollection[i].classList.remove( this.config.activeClass );
			}
			// Add the active class to the parent node
			myParentNode.classList.add( this.config.activeClass );
			// panelIndex = myParentNode.dataset.index;
			this.numbers.panelIndex = myParentNode.dataset.index;
			this.showContent( clickedElem );
		}
	},
	showContent : function ( clickedElem ) {
		console.log( 'clickedElem ', clickedElem );

		this.cssTransform();
	},
	hideContent : function ( clickedElem ) {
		// TODO - Make a switch here to toggle target height between 0 & max-height
		console.log( 'clickedElem ', clickedElem );
	},
	cssTransform : function () {
		
		console.log( 'this.numbers.panelIndex ', typeof this.numbers.panelIndex );

		var panelIndex = parseInt( this.numbers.panelIndex ),
			targetPanel = this.elems.panelCollection[ panelIndex ],
			// contentWrapper = targetPanel.childNode(),
			scrollSpeed = this.config.scrollSpeed,
			panelHeight = this.numbers.panelHeights[ panelIndex ];

		console.log( 'targetPanel  selecto', targetPanel.querySelector( '.content' ) );
		console.log( 'targetPanel  selecto', targetPanel.querySelector( '.' + this.config.classNames.contentWrapClass ) );
		console.log( '.'+ this.config.classNames.contentWrapClass, typeof this.config.classNames.contentWrapClass );
/*
	.our {
		height 0
		transition height 800ms
	}
	.our:hover {
		height 200px
	}
*/

		// contentWrapper.style[this.config.vendorPrefixes.transitionAttributePrefix] = this.config.vendorPrefixes.transformPrefix + ' ' + scrollSpeed + 'ms';
		// itemWrapper.style[this.config.vendorPrefixes.transformAttributePrefix] = 'translate3d(' + '-' + newXpos + 'px, ' + '-' + newYpos + 'px,  0)';
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

	// wrapInViewport : function ( ) {
	// 	var caroWrapper = this.elems.wrapperElem[0];
	// 	var docFrag = document.createDocumentFragment();
	// 	var viewPort = document.createElement( 'div' );
	// 	viewPort.classList.add( 'caro-frame', 'cFix' );
	// 	docFrag.appendChild( viewPort );
	// 	docFrag.childNodes[0].appendChild( caroWrapper );
	// 	// Get caro list from DOM
	// 	return docFrag;
	// },
	

	// TODO - LIFT THIS OUT TO LIB
	closest : function ( sourceElem, selector ) {
		while ( sourceElem ) {
			if( sourceElem.classList.contains(selector) ){
				return sourceElem;
			}
			sourceElem = sourceElem.parentNode;
		}
	},
	find : function ( sourceElem, selector ) {
		
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











