app.controller('signupCtrl', function($scope, $http, Auth){
	$scope.newUser = {};
	$scope.currentUser = Auth.currentUser;
	$scope.createUser = Auth.createUser;

});