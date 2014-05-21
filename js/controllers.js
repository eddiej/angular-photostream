var photosControllers = angular.module('photosControllers', []);

photosControllers.controller('PhotoListCtrl', ['$scope', 'Photo', 'Location',
  function ($scope, Photo, Location){
    
    
    $scope.page = Photo.getPage();
    $scope.country = Photo.getCountry();
    $scope.state = Photo.getState();
   
    $scope.getindex = function() {
      $scope.photos = Photo.index({country: $scope.country, state: $scope.state, page: $scope.page},
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
        console.info('country change:*'+oldValue+'* -> *'+newValue+'*.')
        Photo.setCountry($scope.country)      
          
        $scope.state = ''
        Photo.setState('')  
        $scope.states = Location.states({id: $scope.country});
        
       
        $scope.getindex();
        // $scope.photos = Photo.index({country: $scope.country, page: $scope.page});
      }
    });
    
       
       
  }
  
]);

photosControllers.controller('PhotoDetailsCtrl', ['$scope', '$routeParams', 'Photo', 'Location',
  function ($scope, $routeParams, Photo, Location){
    $scope.layout = 'photo';
    
    $scope.country = Photo.getCountry();
    $scope.state = Photo.getState();
    
    
    $scope.photo = Photo.get({id: $routeParams.photoId, country: $scope.country, state: $scope.state}, function(data) {
       // $scope.mainImageUrl = data.images[0];
     });
    
  
  
  }
]);
