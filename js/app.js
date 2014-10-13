

var photosApp = angular.module("photosApp", ['ngAnimate', 'ngRoute', 'photosControllers', 'photoServices', 'locationServices', 'photographerServices']);

photosApp.run(function($rootScope, $templateCache) {
   $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
   });
});

photosApp.config(['$routeProvider','$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
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
        redirectTo: '/eddie'
      });
    $locationProvider.html5Mode(false);
  }

  ]);



  
  
 

