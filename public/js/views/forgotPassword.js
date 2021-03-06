define( ["text!templates/forgotPassword.html"], function( forgotpasswordTemplate ) {
	var forgotpasswordView = Backbone.View.extend({
    el: $("#content"),
    events: {
      "submit form": "password"
		},
		password: function() {
			$.post("/forgot-password", {
				email: $( "input[name=email]" ).val()
			}, function(data) {
        console.log(data);
      });
			return false;
		},
		render: function() {
			this.$el.html( forgotpasswordTemplate );
		}
	});
	return forgotpasswordView;
});