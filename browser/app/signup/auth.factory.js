app.factory('Auth', function ($http, $state, $rootScope) {

	User = {};

	$rootScope.currentUser;

	User.findUser = function (user) {
		// console.log(user)
		var newUser = user
		return $http.post('/login', user)
		.then(function(user){
			$rootScope.currentUser = newUser;
			$state.go('stories');
		})
	}

	User.createUser = function (newUser) {
		var user = newUser
		return $http.post('/signup', newUser)
		.then(function(newUser) {
			$rootScope.currentUser = user;
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
		console.log("user.logout")
		$rootScope.currentUser = null;
		
		return $http.get('/logout')
		.then(function(){
			$state.go('home');
		});
	}

	User.fetchCurrentUser = function (){
		console.log("in")
		return $http.get('/auth/me')
		// .then(function(user){
		// 	console.log("USER:", user)
		// 	$rootScope.currentUser = user;
		// })
	} 


	return User;
});