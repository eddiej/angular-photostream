var photosApp = angular.module("photosApp", ['ngAnimate', 'ngRoute', 'photosControllers', 'photoServices', 'locationServices', 'photographerServices']);

photosApp.run(function($rootScope, $templateCache) {
   $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
   });
});

photosApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/photographers', {
        templateUrl: 'partials/photographers.html',
        controller: 'PhotographersListCtrl'
      }).
      when('/photographers/:id', {
        templateUrl: 'partials/photographer.html',
        controller: 'PhotographersGalleryCtrl'
      }).
      when('/photos', {
        templateUrl: 'partials/photos.html',
        controller: 'PhotoListCtrl'
      }).
      when('/photos/:photoId', {
        templateUrl: 'partials/photo.html',
        controller: 'PhotoDetailsCtrl'
      }).
      otherwise({
        redirectTo: '/photos'
      });
  }]);
