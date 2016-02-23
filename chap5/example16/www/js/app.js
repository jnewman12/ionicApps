// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    var alertOnBackPress = localStorage.getItem('alertOnBackPress');
    var hardwareBackButtonHandler = function() {
    console.log('Hardware back button pressed');
    // do more interesting things here
  }
  function manageBackPressEvent(alertOnBackPress) {
    if (alertOnBackPress) {
      $ionicPlatform.onHardwareBackButton(hardwareBackButtonHandler);
    } else {
     $ionicPlatform.offHardwareBackButton(hardwareBackButtonHandler);
    }
  }
  //$ionicPlatform.offHardwareBackButton(hardwareBackButtonHandler)
  // when the app boots up
  manageBackPressEvent(alertOnBackPress);
  // later in the code/controller when you let
  // the user update the setting
  function updateSettings(alertOnBackPressModified) {
      localStorage.setItem('alertOnBackPress',alertOnBackPressModified);
          manageBackPressEvent(alertOnBackPressModified)
      }
  }); 
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('home', {
    url: '/home',
    abstract: true,
   // templateUrl: ''
  })

}
