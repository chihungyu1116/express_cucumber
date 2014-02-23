// app.get( "/", function( req, res ) {
// 	res.render( "index.jade" );
// });

// app.post( "/login", function( req, res ) {
// 	console.log( "login request" );
// 	var email = req.param( "email", null );
// 	var password = req.param( "password", null );
// 	if ( null == email || email.length < 1 || null == password || password.length < 1 ) {
//     res.send( HTTP_MESSAGE.BAD_REQUEST );
// 		return;
// 	}
// 	models.Account.login( email, password, function( account ) {
// 		if ( !account ) {
//       res.send( HTTP_MESSAGE.UNAUTHORIZED );
// 			return;
// 		}
//     console.log("login was successful");
// 		req.session.loggedIn = true;
// 		req.session.accountId = account._id;
// 		res.send( HTTP_MESSAGE.OK );
// 	});
// });

// app.post( "/register", function( req, res ) {
// 	var firstName = req.param( "firstName", "" );
// 	var lastName = req.param( "lastName", "" );
// 	var email = req.param( "email", null );
// 	var password = req.param( "password", null );

// 	if ( null == email || email.length < 1 || null == password || password.length < 1 ) {
//     res.send( HTTP_MESSAGE.BAD_REQUEST );
// 		return;
// 	}

// 	models.Account.register( email, password, firstName, lastName );
//   res.send( HTTP_MESSAGE.OK );
// });

// app.get( "/account/authenticated", function( req, res ) {
// 	if ( req.session.loggedIn ) {
// 		res.send( HTTP_MESSAGE.OK );
// 	} else {
//     res.send( HTTP_MESSAGE.UNAUTHORIZED );
//   }
// });

// app.get( '/accounts/:id/activity', function( req, res ) {
// 	var accountId = req.params.id === 'me'
//                     ? req.session.accountId
// 										: req.params.id;
// 	models.Account.findById( accountId, function( account ) {
// 		res.send( account.activity );
//   });
// });

// app.get( '/accounts/:id/status', function( req, res ) {
// 	var accountId = req.params.id === 'me'
//                     ? req.session.accountId
// 										: req.params.id;
// 	models.Account.findById( accountId, function( account ) {
// 		res.send( account.status );
//   });
// });

// app.post( '/accounts/:id/status', function( req, res ) {
// 	var accountId = req.params.id === 'me'
//                     ? req.session.accountId
// 										: req.params.id;
// 	models.Account.findById( accountId, function( account ) {
//     status = {
//       name: account.name,
//       status: req.param( 'status', '' )
//     };
//     account.status.push( status );
//     // Push the status to all friends
// 		account.activity.push( status );
// 		account.save(function ( err ) {
// 			if (err) {
// 				console.log('Error saving account: ' + err);
// 			}
// 		});
// 	});

//   res.send( HTTP_MESSAGE.OK );
// });

// app.get( '/accounts/:id', function( req, res ) {
// 	var accountId = req.params.id === 'me'
// 										? req.session.accountId
// 										: req.params.id;
// 	Account.findById( accountId, function( account ) {
//     res.send( account );
//   });
// });

// app.post( "/forgot-password", function( req, res ) {
// 	var hostname = req.headers.host;
// 	var resetPasswordUrl = "http://" + hostname + "/reset-password";
// 	var email = req.param( "email", null );
// 	if ( null == email || email.length < 1 ) {
//     res.send( HTTP_MESSAGE.BAD_REQUEST );
// 		return;
// 	}
// 	models.Account.forgotPassword( email, resetPasswordUrl, function( success ) {
// 		if ( success ) {
// 			res.send( HTTP_MESSAGE.OK );
// 		} else {
//       // Username or password not found
//       res.send( HTTP_MESSAGE.NOT_FOUND );
//     }
// 	});
// });

// app.get( "/reset-password", function( req, res ) {
// 	var accountId = req.param( "account", null );
// 	res.render( "resetPassword.jade", { locals: { accountId: accountId } });
// });

// app.post( "/reset-password", function( req, res ) {
// 	var accountId = req.param( "accountId", null );
// 	var password = req.param( "password" , null );
// 	if ( null != accountId && null != password ) {
//     models.Account.changePassword( accountId, password );
//   }
//   res.render( "resetPasswordSuccess.jade" );
// });