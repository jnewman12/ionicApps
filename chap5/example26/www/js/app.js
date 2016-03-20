// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

// .config(function ($ionicConfigProvider) {
//   $ionicConfigProvider.views.transition('none');
//   $ionicConfigProvider.views.maxCache(10);
//   $ionicConfigProvider.form.checkbox('circle'); //square or circle
//   $ionicConfigProvider.tabs.style('striped'); // striped or standard
//   $ionicConfigProvider.templates.maxPrefetch(10);
//   $ionicConfigProvider.navBar.alignTitle('right');
// })

// .config(function($ionicConfigProvider) {
//   // Checkbox style. Android defaults to square and iOS defaults to circle.
//   $ionicConfigProvider.platform.ios.form.checkbox('square');
//   $ionicConfigProvider.platform.android.form.checkbox('circle');
// })

.config(function() {
  console.log('ionic.Platform.isWebView()',
  ionic.Platform.isWebView());
  console.log('ionic.Platform.isIPad()',
  ionic.Platform.isIPad());
  console.log('ionic.Platform.isIOS()', ionic.Platform.isIOS());
  console.log('ionic.Platform.isAndroid()',
  ionic.Platform.isAndroid());
  console.log('ionic.Platform.isWindowsPhone()',
  ionic.Platform.isWindowsPhone());
})


// .controller('AppCtrl', function($scope, $ionicGesture) {
//   $scope.scopeGesture = 'None';
//   $scope.delegateGesture = 'None';
//   $scope.onDragUp = function() {
//     $scope.scopeGesture = 'Drag up fired!'
//   };
//   // Event listener using event delegation
//   // The logic below would be typically written in a directive
//   // We have added this to the controller for illustration purposes
//   var $element = angular.element(document.querySelector('#gestureContainer'));
//   $ionicGesture.on('dragup', function() {
//     $scope.delegateGesture = 'Drag up fired!';
//   }, $element);
// })

// can manipulate the mobile DOM with ionic as well
// .controller('AppCtrl', function($scope) {
//   var $element = angular.element(document.querySelector('#someElement'));
//   console.log(ionic.DomUtil.getParentWithClass($element, '.card'));
//   console.log(ionic.DomUtil.getParentOrSelfWithClass($element, '.card'));
//   // requestAnimationFrame example
//   function loop() {
//     console.log('Animation Frame Requested');
//     ionic.DomUtil.requestAnimationFrame(loop); 
//   }
//   loop(); 
// })

.controller('AppCtrl', ['$scope', function($scope) {
  // Binding Events
  var $body = document.querySelector('body');
  var eventListener = function() {
   console.log('Body Tapped!');
   ionic.EventController.off('tap', eventListener, $body);
  };
  ionic.EventController.on('tap', eventListener, $body);
  ionic.EventController.trigger('tap', {
    target: $body
  });
  // Binding gestures
  var cancelSwipeUp;
  var gestureListener = function() {
    console.log('Body Swiped Up!');
    ionic.EventController.offGesture(cancelSwipeUp, 'swipeup', gestureListener);
  }
  cancelSwipeUp = ionic.EventController.onGesture('swipeup', gestureListener, $body);
  ionic.EventController.trigger('swipeup', { target: $body }); 
}])


