var oTools = (function(){
	// Define a local copy of "k"
	var k = function ( selector, context ) {
		
		// The  "k" object is actually joust the init constructor 'enhanced'
		var kobj = new k.fn.init( selector, context );
		
		return kobj;
	};
	// Define k's fn prototype, specifically contains init method
	k.fn = k.prototype = {
		
		init : function ( selector, context ) {
			if ( !selector ) {
				return this;
			}
		}
	};
	// give the init function the k prototype for later instantiation
	k.fn.init.prototype = k.fn;

	// Return k to the global object
	return k;
})();

oTools.fn.extendObj = function( defaultObj, overideObj ) {
	// loop through the defaultObj comparing it with the overideObj
	for ( var key in defaultObj ) {
		if ( defaultObj.hasOwnProperty( key ) ) {
			var currentKey = key,
				currentValue = defaultObj[ key ];
			for ( var item in overideObj ) {
				if ( overideObj.hasOwnProperty( item ) ) {
					if ( currentKey === item ) {
						defaultObj[ currentKey ] = overideObj[ item ];
					} else {
						defaultObj[ item ] = overideObj[ item ];
					}
				}
			}
		}
	}

	return defaultObj;
}

oTools.fn.bindEvents = function ( context, name ) {
	return function( evnt ){
		return context[name].apply( context, arguments );
	};
}

oTools.fn.attachMethodsToPrototype = function( methodObj, consructor ) {
	for( var item in methodObj ) {
		if( methodObj.hasOwnProperty(item) ){
			consructor.prototype[item] = methodObj[item];
		}
	}
};

oTools.fn.getVendorPrefix = function ( prefixCollection ) {
	// Adapted from http://www.developerdrive.com/2012/03/coding-vendor-prefixes-with-javascript/
	var tmp = document.createElement( "div" ),
		result = "";

	for ( var i = 0; i < prefixCollection.length; i+=1 ) {
		if ( typeof tmp.style[ prefixCollection[i] ] !== 'undefined' ) {
			result = prefixCollection[i];
		}
	}
	return result;
};

oTools.fn.setVendorPrefix = function ( ) {
	var config = this.config,
		vendorPrefixes = {
			"transitionAttributePrefix" : ["transition", "msTransition", "MozTransition", "webkitTransition", "OTransition"],
			"transformAttributePrefix" : ["transform", "msTransform", "MozTransform", "webkitTransform", "OTransform"],
			"transformPrefix" : ["transform", "-ms-transform", "-moz-transform", "-webkit-transform", "-o-transform"]
		};
	for ( var item in vendorPrefixes ) {
		if( vendorPrefixes.hasOwnProperty( item ) ){
			var prefix = oTools.fn.getVendorPrefix( vendorPrefixes[item] );
			vendorPrefixes[item] = prefix;
		}
	}
	return vendorPrefixes;
};

oTools.fn.closest = function ( sourceElem, selector ) {
	while ( sourceElem ) {
		if( sourceElem.classList.contains(selector) ){
			return sourceElem;
		}
		sourceElem = sourceElem.parentNode;
	}
};


window.oTools = window.$oT = oTools;
