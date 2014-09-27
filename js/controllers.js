var photosControllers = angular.module('photosControllers', []);


photosControllers.controller('PhotographersListCtrl', ['$scope', '$rootScope', '$routeParams', 'Photographer',
  function ($scope, $rootScope, $routeParams, Photographer){
    $rootScope.bodyidentifier = 'photographers_list';
    $scope.page = Photographer.getPage();
    $scope.getindex = function() {
      $scope.photographers = Photographer.index({page: $scope.page},
    function(data, headers){$scope.pagination = headers()['x-pagination']; }
    );
    }  
    $scope.getindex();
    
    $scope.nextPage = function(modifier) {
      $scope.page += modifier
      Photographer.setPage($scope.page)
      $scope.getindex();
    }
  }
]);

photosControllers.controller('PhotographersGalleryCtrl', ['$scope', '$rootScope', '$routeParams', 'Photographer',
  function ($scope, $rootScope, $routeParams, Photographer){
    $rootScope.bodyidentifier = 'photographers_galery';
    $scope.page = Photographer.getPage();
    $scope.getindex = function() {
    $scope.photos = Photographer.show({id: $routeParams.id, page: $scope.page},
      function(data, headers){$scope.pagination = headers()['x-pagination']; }
    );
    }
    $scope.getindex();
    $scope.nextPage = function(modifier) {
      $scope.page += modifier
      Photographer.setPage($scope.page)
      $scope.getindex();
    }
  }
]);


photosControllers.controller('PhotoListCtrl', ['$scope', '$rootScope', 'Photo', 'Location',
  function ($scope, $rootScope, Photo, Location){  
    $rootScope.bodyidentifier = 'photo_list';
    
     
    $scope.page = Photo.getPage();
    $scope.country = Photo.getCountry();
    $scope.state = Photo.getState();
   
    $scope.getindex = function() {
      $scope.photos = Photo.index({country: $scope.country, state:  $scope.state, page: $scope.page},
        function(data, headers){$scope.pagination = headers()['x-pagination']; }
      );
    }
    
    $scope.nextPage = function(modifier) {
      $scope.page += modifier
      Photo.setPage($scope.page)
      $scope.getindex();
    }
      
    $scope.getindex();
    $scope.states = Location.states({id: $scope.country});
    
    $scope.$watch('state', function(newValue, oldValue) {
      console.info('state change')
      if((oldValue == '' && newValue == '') || (oldValue != newValue)){
        console.info('state change:*'+oldValue+'* -> *'+newValue+'*.')
        Photo.setState($scope.state);
        $scope.getindex();        
      }
    });
    
    $scope.$watch('country', function(newValue, oldValue) {
      if(oldValue != newValue){
        Photo.setCountry($scope.country)      
        $scope.state = ''
        Photo.setState('')  
        $scope.states = Location.states({id: $scope.country});
        $scope.getindex();
      }
    });
  }
]);

photosControllers.controller('PhotoDetailsCtrl', ['$scope', '$rootScope', '$routeParams', 'Photo', 'Location',
  function ($scope, $rootScope, $routeParams, Photo, Location){
    $scope.layout = 'room';
    
    $scope.$watch('layout', function(){
      $rootScope.bodyidentifier = 'photo_details '+ $scope.layout;
    });
    
    
    $scope.country = Photo.getCountry();
    $scope.state = Photo.getState();
    
    $scope.photo = Photo.get({id: $routeParams.photoId, country: $scope.country, state: $scope.state}, function(data){});
  }
]);

photosControllers.run(function($rootScope, $templateCache) {
  $rootScope.$on('$viewContentLoaded', function() {
    $templateCache.removeAll();
  });
});

// photosControllers.factory('UserService', function() {
//   var cls='start'
//   return {
//     get: function(){
//       return cls;
//     },
//     set: function(value){
//       cls=value;
//     }
//   };
// });
// photosControllers.run(function($rootScope) {
    // $rootScope.bodyidentifier = 'index';
// })
