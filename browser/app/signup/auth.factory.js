app.factory('Auth', function ($http, $state) {

	User = {};

	User.currentUser;

	User.findUser = function (user) {
		// console.log(user)
		return $http.post('/login', user)
		.then(function(user){
			User.currentUser = user;
			console.log(user)
		})
	}

	User.createUser = function (newUser) {
		return $http.post('/signup', newUser)
		.then(function(newUser) {
			User.currentUser = newUser;
			console.log("The New User: ", newUser);
			$state.go('stories')
		});
	};

	User.logout = function(){
		console.log("user.logout")
		return $http.get('/logout')
	}

	return User;
});