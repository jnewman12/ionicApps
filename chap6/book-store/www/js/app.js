// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('BookStoreApp', ['ionic', 'BookStoreApp.controllers', 'AuthFactory'])

.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

//this is not working, and i have not idea why
.run(['$rootScope', 'AuthFactory',
  function($rootScope, AuthFactory) {
    $rootScope.isAuthenticated = AuthFactory.isLoggedIn();
    // utility method to convert number to an array of elements
    $rootScope.getNumber = function(num) { return new Array(num); }
  } 
])

.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
  function($stateProvider, $urlRouterProvider, $httpProvider) {
    // setup the token interceptor
    $httpProvider.interceptors.push('TokenInterceptor');

    $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })
    .state('app.browse', {
      url: "/browse",
      views: {
        'menuContent': {
        templateUrl: "templates/browse.html",
        controller: 'BrowseCtrl'
        }
      } 
    })
    .state('app.book', {
      url: "/book/:bookId",
      views: {
        'menuContent': {
          templateUrl: "templates/book.html",
          controller: 'BookCtrl'
        } 
      }
    })
    .state('app.cart', {
      url: "/cart",
      views: {
        'menuContent': {
          templateUrl: "templates/cart.html",
          controller: 'CartCtrl'
        }
      } 
    })
    .state('app.purchases', {
      url: "/purchases",
      views: {
        'menuContent': {
          templateUrl: "templates/purchases.html",
          controller: 'PurchasesCtrl'
        }
      }
    })
  // default if nothing matches
  $urlRouterProvider.otherwise('/app/browse');
  }
]);

// sample service in this file for now
.factory('Loader', ['$ionicLoading', '$timeout',
  function($ionicLoading, $timeout) {
    var LOADERAPI = {
      showLoading: function(text) {
        text = text || 'Loading...';
        $ionicLoading.show({
          template: text
        });
      },
      hideLoading: function() {
        $ionicLoading.hide();
      },
      toggleLoadingWithMessage: function(text, timeout) {
        $rootScope.showLoading(text);
        $timeout(function() {
          $rootScope.hideLoading();
        }, timeout || 3000);
      }
    };
    return LOADERAPI;
  }
])
// still havent resolved error

// local storage
.factory('LSFactory', [function() {
  var LSAPI = {
    clear: function() {
      return localStorage.clear();
    },
    get: function(key) {
      return JSON.parse(localStorage.getItem(key));
    },
    set: function(key, data) {
      return localStorage.setItem(key, JSON.stringify(data));
    },
    delete: function(key) {
      return localStorage.removeItem(key);
    },
    getAll: function() {
      var books = [];
      var items = Object.keys(localStorage);
      for (var i = 0; i < items.length; i++) {
        if (items[i] !== 'user' || items[i] != 'token') {
          books.push(JSON.parse(localStorage[items[i]]));
        }
    }
      return books;
    }
  };
  return LSAPI;
}])

.factory('AuthFactory', ['LSFactory', function(LSFactory) {
  var userKey = 'user';
  var tokenKey = 'token';
  var AuthAPI = {
    isLoggedIn: function() {
       return this.getUser() === null ? false : true;
    },
    getUser: function() {
       return LSFactory.get(userKey);
    },
    setUser: function(user) {
      return LSFactory.set(userKey, user);
    },
    getToken: function() {
      return LSFactory.get(tokenKey);
    },
    setToken: function(token) {
      return LSFactory.set(tokenKey, token);
    },
    deleteAuth: function() {
      LSFactory.delete(userKey);
      LSFactory.delete(tokenKey);
    } 
  };
  return AuthAPI;
}])

.factory('TokenInterceptor', ['$q', 'AuthFactory', function($q, AuthFactory) {
  return {
    request: function(config) {
      config.headers = config.headers || {};
      var token = AuthFactory.getToken();
      var user = AuthFactory.getUser();
      if (token && user) {
        config.headers['X-Access-Token'] = token.token;
        config.headers['X-Key'] = user.email;
        config.headers['Content-Type'] = "application/json";
      }
      return config || $q.when(config);
    },
    response: function(response) {
      return response || $q.when(response);
    } 
  };
}])

// rest factory
factory('BooksFactory', ['$http', function($http) {
  var perPage = 30;
  var API = {
    get: function(page) {￼
      return $http.get(base + '/api/v1/books/' + page + '/' + perPage); 
      }
    };
  };
  return API;
}])


// users 
.factory('UserFactory', ['$http', 'AuthFactory',
  function($http, AuthFactory) { 

} ] )