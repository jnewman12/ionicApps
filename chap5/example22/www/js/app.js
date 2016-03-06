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

// .controller('AppCtrl', function($scope, $ionicActionSheet,$timeout) {
//   $scope.showOptions = function() {
//     var hideSheet = $ionicActionSheet.show({
//       buttons: [{
//       text: 'Open'
//       }, {
//       text: 'Get Link'
//       }],
//       destructiveText: 'Delete',
//       titleText: 'Options'
//     });
//     // hide the sheet after three seconds
//     $timeout(function() {
//        hideSheet();
//     }, 3000);
//   }; 
// })


// .controller('AppCtrl', function($scope, $ionicPopover) {
//   // init the popover
//   $ionicPopover.fromTemplateUrl('button-options.html', { scope: $scope }).then(function(popover) {
//     $scope.popover = popover;
//   });
//   $scope.openPopover = function($event, type) {
//     $scope.type = type;
//     $scope.popover.show($event);
//   };
//   $scope.closePopover = function() {
//     // if you are navigating away from the page once
//     // an option is selected, make sure to call
//     // $scope.popover.remove();
//     $scope.popover.hide();
// ￼ }; 
// });


.controller('AppCtrl', function($scope, $ionicPopup) {
  $scope.data = {};
  $scope.state = {};
  $scope.error = {};
  $scope.prompt = function() {
  // reset app states
  $scope.state.cancel = false;
  $scope.state.success = false;
  // reset error messages
  $scope.error.empty = false;
  $scope.error.invalid = false;
  var prompt = $ionicPopup.show({
     templateUrl: 'pin-template.html',
     title: 'Enter Pin to continue',
     scope: $scope,
     buttons: [{
      text: 'Cancel',
      onTap: function(e) {
         $scope.state.cancel = true;
      } 
    }, {
    text: '<b>Login</b>',
    type: 'button-assertive',
    onTap: function(e) {
      $scope.error.empty = false;
      $scope.error.invalid = false;
      if (!$scope.data.pin) {
         // disable close if the
         // user does not enter
         // a valid pin
         $scope.error.empty = true;
         e.preventDefault();
      } else {
      if ($scope.data.pin === '1234') {
      $scope.state.success = true;
      return $scope.data.pin;
      } else {
      $scope.error.invalid = true;
      e.preventDefault();
      }
  ￼ } 
  }
 }] 
});
