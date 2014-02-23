// Dependencies
var express = require( "express" ),
		nodemailer = require( "nodemailer" ),
		MemoryStore = require( "connect" ).session.MemoryStore,
		mongoose = require( "mongoose" );
		config = {
  		mail: require( "./config/mail" ),
  		settings: require( "./config/settings" )(),
  		routes: require( "./config/routes" )
		},
		models = {
			Account: require( "./models/Account" )( config, mongoose, nodemailer )
		},
		controllers = {
			publics: require( "./controllers/publicsController")(),
			users: require( "./controllers/usersController")(),
			accounts: require( "./controllers/accountsController")()
		},
		initializer = {
			setUpRoutes: require( "./initializer/setUpRoutes" )(config, models, controllers)
		};

// Constants
var HTTP_MESSAGE = {
			OK : 200,
			BAD_REQUEST: 400,
			UNAUTHORIZED: 401,
			NOT_FOUND: 404
		};
		
var app = express();

app.configure(function(){
	app.set( "view engine", "jade" );
	app.use( express.static( __dirname + "/public" ) );
	app.use( express.limit( "1mb" ) );
	app.use( express.bodyParser() );
	app.use( express.cookieParser() );
	app.use( express.session({
		secret: "SocialNet secret key",
		store: new MemoryStore()
	})); 
	mongoose.connect( config.settings.db(), function onMongooseError( err ) {
		if ( err ) { throw err; }
	});
});

initializer.setUpRoutes( app );

app.listen( config.settings.port() );
console.log("Cucumber is running on port " + config.settings.port() );
