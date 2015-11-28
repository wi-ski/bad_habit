angular.module('bad_habit', [])
.factory('AuthService', ['$scope','$http',function ($scope,$http) {
	var userObj;
	var token;
  function _UserRequest(userObj,url,successCb,errorCb){
	  $http({
	    method: 'POST',
	    url: url,
	    data:userObj
	  }).then(successCb, errorCb);
  }

  $scope.login = function() {
  	//make request, change state if successfuly, alert if not. Change state

  };

  $scope.logout = function() {
  	//make request or simply destroy change state
  };

  $scope.register = function() {
  	//make request, change state
  };

  $scope.isLoggedIn = function() {
  	return (token ? true : false);
  };

  $scope.currentUser = function() {
  	return userObj;
  };


}])