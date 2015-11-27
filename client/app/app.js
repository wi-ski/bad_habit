angular.module('bad_habit', [
  // 'bad_habit.facebook',
  'ui.bootstrap',
  'ngAnimate',
  'bad_habit.home',
  'ui.bootstrap.tpls',
  // 'bad_habit.map',
  // 'bad_habit.maker',
  // 'bad_habit.streetview',
  // 'bad_habit.services',
  // 'bad_habit.replay',
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
    // .state('facebook', {
    //   url: '/facebook',
    //   templateUrl: 'app/facebook/facebook.html',
    //   controller: 'FacebookController'
    // })
    // .state('map', {
    //   url: '/map',
    //   templateUrl: 'app/map/map.html',
    //   controller: 'MapController'
    // })
    // .state('manageRoom', {
    //   url: '/manageRoom',
    //   templateUrl: 'app/manageRoom/manageRoom.html',
    //   controller: 'ManageRoomController'
    // })
    // .state('streetView', {
    //   url: '/streetView',
    //   templateUrl: 'app/streetView/streetView.html',
    //   controller: 'StreetViewController'
    // })
    // .state('replayList', {
    //   url: '/replays',
    //   templateUrl: 'app/replays/replays.html',
    //   controller: 'ReplaysController'
    // })
    // .state('logout', {
    //   url: '/logout',
    //   redirectTo: '/home'
    // });
  
})

//service to handle hiding jeditables on search results


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
