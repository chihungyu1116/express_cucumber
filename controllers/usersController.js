var HTTP_MESSAGE = require("../lang/en").HTTP_MESSAGE;

module.exports = function() {
	var login = function( req, res, config, models, controllers ) {
				console.log( "login request" );
				var email = req.param( "email", null );
				var password = req.param( "password", null );
				if ( null == email || email.length < 1 || null == password || password.length < 1 ) {
			    res.send( HTTP_MESSAGE.BAD_REQUEST );
					return;
				}
				models.Account.login( email, password, function( account ) {
					if ( !account ) {
			      res.send( HTTP_MESSAGE.UNAUTHORIZED );
						return;
					}
			    console.log("login was successful");
					req.session.loggedIn = true;
					req.session.accountId = account._id;
					res.send( HTTP_MESSAGE.OK );
				});
			},
			register = function( req, res, config, models, controllers ) {
				var firstName = req.param( "firstName", "" );
				var lastName = req.param( "lastName", "" );
				var email = req.param( "email", null );
				var password = req.param( "password", null );

				if ( null == email || email.length < 1 || null == password || password.length < 1 ) {
			    res.send( HTTP_MESSAGE.BAD_REQUEST );
					return;
				}

				models.Account.register( email, password, firstName, lastName );
			  res.send( HTTP_MESSAGE.OK );
			},
			forgotPassword = function( req, res, config, models, controllers ) {
				var hostname = req.headers.host;
				var resetPasswordUrl = "http://" + hostname + "/reset-password";
				var email = req.param( "email", null );
				if ( null == email || email.length < 1 ) {
			    res.send( HTTP_MESSAGE.BAD_REQUEST );
					return;
				}
				models.Account.forgotPassword( email, resetPasswordUrl, function( success ) {
					if ( success ) {
						res.send( HTTP_MESSAGE.OK );
					} else {
			      // Username or password not found
			      res.send( HTTP_MESSAGE.NOT_FOUND );
			    }
				});
			},
			resetPassword = function( req, res, config, models, controllers ) {
				var accountId = req.param( "account", null );
				res.render( "resetPassword.jade", { locals: { accountId: accountId } });
			},
			createResetPassword = function( req, res, config, models, controllers ) {
				var accountId = req.param( "accountId", null );
				var password = req.param( "password" , null );
				if ( null != accountId && null != password ) {
			    models.Account.changePassword( accountId, password );
			  }
			  res.render( "resetPasswordSuccess.jade" );
			};

	return {
		login: login,
		register: register,
		forgotPassword: forgotPassword,
		resetPassword: resetPassword,
		createResetPassword: createResetPassword
	}
};