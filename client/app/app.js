angular.module('bad_habit', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.bootstrap.tpls',
  'ui.router'
])

.config( function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('/', {
      redirectTo: '/home'
    })
    .state('home', {
      url: '/home',
      templateUrl: 'app/home/home.html',
      controller: 'HomeController'
    })
})


.factory('AttachTokens', function ($window,user,$rootScope) {
  var attach = {
    request: function (object) {
      var jwt = $rootScope.authToken;
      if (jwt) {
        object.data['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
}

// .factory('clickAnywhereButHereService', function($document){
//   var tracker = [];

//   return function($scope, expr) {
//     var i, t, len;
//     for(i = 0, len = tracker.length; i < len; i++) {
//       t = tracker[i];
//       if(t.expr === expr && t.scope === $scope) {
//         return t;    
//       }
//     }
//     var handler = function() {
//       $scope.$apply(expr);
//     };

//     $document.on('click', handler);

//     // IMPORTANT! Tear down this event handler when the scope is destroyed.
//     $scope.$on('$destroy', function(){
//       $document.off('click', handler);
//     });

//     t = { scope: $scope, expr: expr };
//     tracker.push(t);
//     return t;
//   };
// });

// .directive('clickAnywhereButHere', function($document, clickAnywhereButHereService){
//   return {
//     restrict: 'A',
//     link: function(scope, elem, attr, ctrl) {
//       var handler = function(e) {
//         e.stopPropagation();
//       };
//       elem.on('click', handler);

//       scope.$on('$destroy', function(){
//         elem.off('click', handler);
//       });

//       clickAnywhereButHereService(scope, attr.clickAnywhereButHere);
//     }
//   };
// });
