var photosApp = angular.module("photosApp", ['ngAnimate', 'ngRoute', 'photosControllers', 'photoServices', 'locationServices']);

photosApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
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
