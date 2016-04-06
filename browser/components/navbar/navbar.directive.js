'use strict';

app.directive('navbar', function ($state, $location, Auth, $rootScope) {
	return {
		restrict: 'E',
		templateUrl: '/browser/components/navbar/navbar.html',
		// controller: 'mainCtrl',
		link: function (scope) {

			Auth.fetchCurrentUser().then(function(user){
				console.log("USER:", user)
				$rootScope.currentUser = user;
			});

			scope.currentUser = $rootScope.currentUser
			scope.logout = Auth.logout;
			// scope.getCurrentUser = function () {
			// 	// scope.currentUser = Auth.getCurrentUser();
			// 	console.log("HELLO")
			// }

			// scope.getCurrentUser = Auth.getCurrentUser;

			// console.log(scope.currentUser)
			scope.pathStartsWithStatePath = function (state) {
				var partial = $state.href(state);
				var path = $location.path();
				return path.startsWith(partial);
			};

		},
		// resolve: {
		// 	currentUser: function (){
		// 		return $http.get('/auth/me')
		// 		.then(function(user){
		// 			$rootScope.currentUser = user;
		// 		})
		// 	}
		// }

	}
});

// session Session {
//   cookie:
//    { path: '/',
//      _expires: null,
//      originalMaxAge: null,
//      httpOnly: true },
//   userId: 'ryhg0Q-YZ' }

//   session Session {
//   cookie:
//    { path: '/',
//      _expires: null,
//      originalMaxAge: null,
//      httpOnly: true } }