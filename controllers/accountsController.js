var HTTP_MESSAGE = require("../lang/en").HTTP_MESSAGE;

module.exports = function() {
	var authenticated = function( req, res, config, models, controllers ) {
				if ( req.session.loggedIn ) {
					res.send( HTTP_MESSAGE.OK );
				} else {
			    res.send( HTTP_MESSAGE.UNAUTHORIZED );
			  }
			},
			activity = function( req, res, config, models, controllers ) {
				var accountId = req.params.id === 'me'
                    ? req.session.accountId
										: req.params.id;
				models.Account.findById( accountId, function( account ) {
					res.send( account.activity );
			  });
			},
			status = function( req, res, config, models, controllers ) {
				var accountId = req.params.id === 'me'
                    ? req.session.accountId
										: req.params.id;
				models.Account.findById( accountId, function( account ) {
					res.send( account.status );
			  });
			},
			createStatus = function( req, res, config, models, controllers ) {
				var accountId = req.params.id === 'me'
                    ? req.session.accountId
										: req.params.id;
				models.Account.findById( accountId, function( account ) {
			    status = {
			      name: account.name,
			      status: req.param( 'status', '' )
			    };
			    account.status.push( status );
			    // Push the status to all friends
					account.activity.push( status );
					account.save(function ( err ) {
						if (err) {
							console.log('Error saving account: ' + err);
						}
					});
				});

			  res.send( HTTP_MESSAGE.OK );
			},
			info = function( req, res, config, models, controllers ) {
				var accountId = req.params.id === 'me'
										? req.session.accountId
										: req.params.id;
				Account.findById( accountId, function( account ) {
    			res.send( account );
  			});
			}

	return {
		authenticated: authenticated,
		activity: activity,
		status: status,
		createStatus: createStatus,
		info: info
	}
};