app.controller('loginController', function ($scope, Auth) {
	$scope.currentUser = Auth.currentUser;
	$scope.findUser = Auth.findUser;
	$scope.user = {}
});