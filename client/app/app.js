angular.module('bad_habit', [
  // 'bad_habit.facebook',
  'bad_habit.home',
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