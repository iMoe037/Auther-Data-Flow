'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('login', {
		url: '/login',
		controller: 'loginController',
		templateUrl: '/browser/app/login/login.html'
	});
});