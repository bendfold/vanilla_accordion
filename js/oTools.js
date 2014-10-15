var oTools = (function(){
	// Define a local copy of "o"
	var o = function ( selector, context ) {
		// The  "o" object is actually joust the init constructor 'enhanced'
		return new o.fn.init( selector, context );
	};

	o.fn = o.prototype = {
		init : function ( selector, context ) {
			if ( !selector ) {
				return this;
			}
		}
	};
	// give the init function the o prototype for later instantiation
	o.fn.init.prototype = o.fn;

	o.fn.bindEvents = function ( context, name ) {
		return function( evnt ){
			return context[name].apply( context, arguments );
		};
	};

	o.fn.extendObj = function( defaultObj, overideObj ) {
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
	};


	o.fn.attachMethodsToPrototype = function( methodObj, consructor ) {
		for( var item in methodObj ) {
			if( methodObj.hasOwnProperty(item) ){
				consructor.prototype[item] = methodObj[item];
			}
		}
	};

	o.fn.getVendorPrefix = function ( prefixCollection ) {
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

	o.fn.setVendorPrefix = function ( ) {
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

	o.fn.closest = function ( sourceElem, selector ) {
		while ( sourceElem ) {
			if( sourceElem.classList.contains(selector) ){
				return sourceElem;
			}
			sourceElem = sourceElem.parentNode;
		}
	};



	//return the local version of o (not oTools) to 
	return(window.oTools = window._o = o)

})();
