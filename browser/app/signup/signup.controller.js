app.controller('signupCtrl', function($scope, $http, Auth){
	$scope.currentUser = Auth.currentUser;
	$scope.newUser = {};
	$scope.createUser = Auth.createUser;

});