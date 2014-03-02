module.exports = function( config, mongoose, Status, nodemailer) {
	var SHA = {
				TYPE: "sha256",
				DIGEST: "hex"
			};


	var crypto = require('crypto');

	var Status = new mongoose.Schema({
		name: {
			first: { type: String },
      last: { type: String }
    },
    status: { type: String }
  });

	var AccountSchema = new mongoose.Schema({
		email: { type: String, unique: true },
		password: { type: String },
		name: {
			first: { type: String },
			last: { type: String }
		},
		birthday: {
			day: { type: Number, min: 1, max: 31, required: false },
			month: { type: Number, min: 1, max: 12, required: false },
			year: { type: Number }
		},
		photoUrl: { type: String },
		biography: { type: String },
		status: [ Status ], // My own status updates only
		activity: [ Status ] // All status updates including friends
	});

	var Account = mongoose.model( "Account", AccountSchema );

	var registerCallback = function( err ) {
		if ( err ) {
			return console.log( err );
		}
		return console.log( "Account was created successfully" );
	};

	var changePassword = function( accountId, newpassword ) {
		var shaSum = crypto.createHash( SHA.TYPE );
		shaSum.update( newpassword );
		var hashedPassword = shaSum.digest( SHA.DIGEST );
		Account.update(
			{ _id: accountId },
			{ $set: { password: hashedPassword } },
			{ upsert: false },
			function changePasswordCallback( err ) {
				console.log("Change password done for account " + accountId);
			}
		);
	};

	var forgotPassword = function( email, resetPasswordUrl, callback ) {
		var user = Account.findOne( { email: email }, function findAccount( err, doc ) {
			if ( err ) {
				// Email address is not a valid user callback(false);
				callback( false );
			} else {
				var smtpTransport = nodemailer.createTransport( "SMTP", config.mail );
				resetPasswordUrl += '?account=' + doc._id;
				
				smtpTransport.sendMail({
	        from: 'chihungyu1116@gmail.com',
	        to: doc.email,
	        subject: 'Cucumber Password Request',
	        text: 'Click here to reset your password: ' + resetPasswordUrl
				}, function forgotPasswordResult( err ) {
					if ( err ) {
						callback(false);
					} else {
						callback(true);
					}
				});	
			}
		});
	};

	var login = function( email, password, callback ) {
		var shaSum = crypto.createHash( SHA.TYPE );
		shaSum.update( password );
		Account.findOne({
			email: email,
			password: shaSum.digest( SHA.DIGEST )
		}, function( err, doc ) {
			callback( doc );
		});
	};

	var findById = function( accountId, callback ) {
		Account.findOne( { _id: accountId }, function( err, doc ) {
      callback( doc );
    });
	};

	var register = function( email, password, firstName, lastName ) {
		var shaSum = crypto.createHash( SHA.TYPE );
		shaSum.update( password );
		console.log('Registering ' + email);
		var user = new Account({
      email: email,
      name: {
        first: firstName,
        last: lastName
      },
      password: shaSum.digest( SHA.DIGEST )
    });
    user.save( registerCallback );
    console.log('Save command was sent');
  };

  return {
  	findById: findById,
		register: register,
		forgotPassword: forgotPassword,
		changePassword: changePassword,
		login: login,
		Account: Account
	};
};