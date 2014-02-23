module.exports = [	
	{
		"method": "get", "url": "/", "controller": "publics", "action": "index"
	}, {
		"method": "post", "url": "/login", "controller": "users", "action": "login"
	}, {
		"method": "post", "url": "/register", "controller": "users", "action": "register"
	}, {
		"method": "post", "url": "/forgot-password", "controller": "users", "action": "forgotPassword"
	}, {
		"method": "get", "url": "/reset-password", "controller": "users", "action": "resetPassword"
	}, {
		"method": "post", "url": "/reset-password", "controller": "users", "action": "createResetPassword"
	}, {
		"method": "get", "url": "/account/authenticated", "controller": "accounts", "action": "authenticated"
	}, {
		"method": "get", "url": "/accounts/:id/activity", "controller": "accounts", "action": "activity"
	}, {
		"method": "get", "url": "/accounts/:id/status", "controller": "accounts", "action": "status"
	}, {
		"method": "post", "url": "/accounts/:id/status", "controller": "accounts", "action": "createStatus"
	}, {
		"method": "get", "url": "/accounts/:id", "controller": "accounts", "action": "info"
	}
];