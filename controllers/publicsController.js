module.exports = function() {
	var index = function( req, res ) {
				res.render( "index.jade" );
			}

	return {
		index: index
	}
};

