'use strict';

app.directive('navbar', function ($state, $location, Auth) {
	return {
		restrict: 'E',
		templateUrl: '/browser/components/navbar/navbar.html',
		link: function (scope) {
			scope.currentUser = Auth.currentUser;
			scope.logout = Auth.logout
			scope.pathStartsWithStatePath = function (state) {
				var partial = $state.href(state);
				var path = $location.path();
				return path.startsWith(partial);
			};
		}
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