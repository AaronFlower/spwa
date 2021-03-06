/**
 * spa.util.js
 * General JavaScript utilities
 * 
 */

/* global $, spa */
spa.util = (function () {
	var makeError, setConfigMap ;

	// Begin Public constructor /makeError/
	// Purpose 		: a convience wrapper to create an error object.
	// Arguemnts 	: 
	// 	* 	name_text 	- the error name
	// 	*	msg_text 	- long error message
	// 	* 	data 		- optional data attached to error object
	// Returns 	: newly contructed error object.
	// Throws 	: none
	// 
	makeError = function (name_text, msg_text, data) {
		var error = new Error();
		error.name 		= name_text;
		error.message 	= msg_text;

		if ( data) {
			error.data = data;
		}
		return error;
	};
 	// End Public constructor /makeError/

	// Begin Public constructor /setConfigMap/
	// Purpose 		: common code to set configs in feature modules
	// Arguemnts 	: 
	// 	* 	input_map 	- map of key-value to set in config
	// 	*	settable_map- long of allowable keys to set
	// 	* 	config_map 	- map to apply setting to
	// Returns 	: newly contructed error object.
	// Throws 	: Exception if input key not allowed.
	// 
	setConfigMap = function ( arg_map ) {
		var 
			input_map 		= arg_map.input_map,
			settable_map 	= arg_map.settable_map,
			config_map 		= arg_map.config_map,
			key_name , error;

		for( key_name in input_map ){
			if( input_map.hasOwnProperty( key_name ) ){
				if ( settable_map.hasOwnProperty( key_name ) ) {	
					config_map[key_name] = input_map[key_name];
				}else{
					error = makeError( 'Bad Input', 
						'Setting config key |' + key_name + '| is not supported.'
						);
					throw error;
				}
			}
		}
	};
	// End Public constructor /setConfigMap/

	return {
		makeError 		: makeError,
		setConfigMap 	: setConfigMap
	};
}());