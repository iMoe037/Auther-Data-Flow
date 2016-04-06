app.factory('Auth', function ($http, $state, $rootScope) {

	User = {};

	$rootScope.currentUser;

	User.findUser = function (user) {
		// console.log(user)
		return $http.post('/login', user)
		.then(function(user){
			$rootScope.currentUser = user.data;
			$state.go('stories');
		})
	}

	User.createUser = function (newUser) {
		console.log("inside User.createUser")
		return $http.post('/signup', newUser)
		.then(function(newUser) {
			$rootScope.currentUser = newUser.data;
			$state.go('stories');
		});
	};

	// User.getCurrentUser = function (user) {
	// 	console.log("getCurrentUser:", User.currentUser)
	// 	// if (User.currentUser){
	// 		return User.currentUser;
	// 	// }
	// }

	User.logout = function(){
		console.log("inside User.logout")
		$rootScope.currentUser = null;
		return $http.get('/logout')
		.then(function(){
			$state.go('home');
		});
	}

	User.fetchCurrentUser = function (){
		console.log("inside User.fetchCurrentUser")
		return $http.get('/auth/me')
		// .then(function(user){
		// 	console.log("USER:", user)
		// 	$rootScope.currentUser = user;
		// })
	} 


	return User;
});