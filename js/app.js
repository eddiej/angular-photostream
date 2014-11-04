

var photosApp = angular.module("photosApp", ['ngAnimate', 'ngRoute', 'photosControllers', 'photoServices', 'locationServices', 'photographerServices', 'angularPayments', 'userServices']);

photosApp.run(function($rootScope, $templateCache) {
   $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
   });
});


photosApp.config(['$routeProvider','$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'home.html'
      }).
      when('/about', {
        templateUrl: 'about.html'
      }).
      when('/signup', {
        templateUrl: 'signup.html',
        controller: 'SignupCtrl'
      }).
      when('/index/photographers', {
        templateUrl: 'partials/photographers.html',
        controller: 'PhotographersListCtrl'
      }).
      when('/:id', {
        templateUrl: 'partials/photographer.html',
        controller: 'PhotographersGalleryCtrl'
      }).
      when('/:username/:photoId', {
        templateUrl: 'partials/photo.html',
        controller: 'PhotogPhotoDetailsCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(false);
  }

]);



  
  
 

