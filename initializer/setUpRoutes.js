module.exports = function( config, models, controllers ) {
	var _ = require('underscore');
			
	return function( app ) {
		_.each( config.routes, function( route ) {
			var method = route.method,
					url = route.url,
					controller = route.controller,
					action = route.action;

			app[method]( url, function( req, res) {
				controllers[controller][action]( req, res, config, models, controllers );
			});
		});
	}
}