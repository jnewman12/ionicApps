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

    var cancelPause = $ionicPlatform.on('pause', function() {
      console.log('App is sent to background');
      // do stuff to save power
    });

    var cancelResume = $ionicPlatform.on('resume', function() {
      console.log('App is retrieved from background');
      // re-init the app
    });

    // Supported only in BlackBerry 10 & Android
    var cancelVolumeUpButton = $ionicPlatform.on('volumeupbutton', function() {
      console.log('Volume up button pressed');
      // moving a slider up
    });

    var cancelVolumeDownButton = $ionicPlatform.on('volumedownbutton', function() {
      console.log('Volume down button pressed');
      // moving a slider down
    });

    // when the app boots up
    manageBackPressEvent(alertOnBackPress);
  
    function updateSettings(alertOnBackPressModified) {
      localStorage.setItem('alertOnBackPress', alertOnBackPressModified);
      manageBackPressEvent(alertOnBackPressModified)
    }
  }

 );

})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('home', {
    url: '/home',
    abstract: true,
   // templateUrl: ''
  })

}
