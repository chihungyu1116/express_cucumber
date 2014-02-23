require.config({
	paths: {
		jQuery: '/js/libs/jquery',
		Underscore: '/js/libs/underscore',
		Backbone: '/js/libs/backbone',
		text: '/js/libs/text',
		templates: '../templates'
	},
	shim: {
		'Backbone': ['Underscore', 'jQuery'],
    'Main': ['Backbone']
	}
});

require(['Main'], function( Main ) {
	Main.initialize();
});