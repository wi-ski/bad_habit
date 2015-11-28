angular.module('bad_habit', ['truncate'])

.controller('HomeController', ['$scope','$http', function ($scope,$http) {
  $scope.oneAtATime = true;

  $scope.showEdit = false;

  $scope.submit = function() {
    // hide the edit field
    $scope.showEdit = false;
    // submit form
    console.log('submit form');
  }

  $scope.toggleResult = function (id) {
  	$scope.ResultInFocus = $scope.nmcResponses.filter(function(nmc){
  		return nmc._id === id;
  	})[0];
  }

  $http({
    method: 'GET',
    url: '/nmc/entry/latest/'
  }).then(function successCallback(response) {
    	$scope.nmcResponses = response.data.data;
    }, function errorCallback(response) {
      $scope.nmcResponses = [{"_id":"ERROR - Check network","name":"ERROR - Check network","value":"ERROR - Check network","txid":"ERROR - Check network","vout":"ERROR - Check network","address":"ERROR - Check network","height":"ERROR - Check network","expires_in":"ERROR - Check network","expired":"ERROR - Check network","__v":"ERROR - Check network","created":"ERROR - Check network"}];
    });
}])

.directive('tooltoggler', function () {
   return {
    link: function (scope, element, attr) {
      element.on('mousedown', function (event) {
          scope.toggleResult(attr.id);
      });
    }
   };
})

.directive('autofocus', function ($timeout) { //need to work this in for input fields
    return {
        link: function(scope, element, attrs) {
            scope.$watch(attrs.autofocusWhen, function(newValue){
                if ( newValue ) {
                    $timeout(function(){
                        element.focus();
                    });
                }
            });
        }
     };
});