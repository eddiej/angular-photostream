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
    $rootScope.bodyidentifier = 'photographers_gallery';
    $scope.page = Photographer.getPage();
    $scope.username = $routeParams.id;
    $scope.getindex = function() {
      $scope.photos = Photographer.show({id: $routeParams.id, page: $scope.page},
        function(data, headers){$scope.pagination = headers()['x-pagination']; $scope.photographer = data[0].photo['first_name'] +' '+ data[0].photo['last_name']  }
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
    
    $scope.photo = Photo.get({id: $routeParams.photoId, country: $scope.country, state: $scope.state}, function(data){
      reposition();
    });
    
    
  }
]);

photosControllers.controller('PhotogPhotoDetailsCtrl', ['$scope', '$rootScope', '$routeParams', 'Photo', 'Location', 'UserService',
  function ($scope, $rootScope, $routeParams, Photo, Location, UserService){

    $scope.layout = UserService.get()
    $scope.username = $routeParams.username;
    $scope.price = 50;
    $scope.thesize = 'small';
    
    
    $scope.$watch('layout', function(){
      $rootScope.bodyidentifier = 'photo_details '+ $scope.layout;
      UserService.set($scope.layout)
    });
    
    $scope.handleStripe = function(status, response){
      if(response.error) {
        alert('success')
      } else {
        // got stripe token, now charge it or smt
        // token = response.id
        alert('problem with card number')
      }
    }
    
    
    var METRE_PIXEL_SCALE = 1
    var ACTUAL_HEIGHT = 400
    var GALLERY_BOUND_HEIGHT = 400
    var GALLERY_PADDING_TOP = 250
    var GALLERY_PADDING_BOTTOM = 250

    var height = METRE_PIXEL_SCALE * ACTUAL_HEIGHT
    var topheight_minuspadding = ((height < GALLERY_BOUND_HEIGHT) ? GALLERY_BOUND_HEIGHT : height) + GALLERY_PADDING_BOTTOM
    var topheight = topheight_minuspadding + GALLERY_PADDING_TOP
    var pad = ((height < GALLERY_BOUND_HEIGHT) ? ((GALLERY_BOUND_HEIGHT - height)/2) : 0)

    $scope.metre_pixel_scale = METRE_PIXEL_SCALE
    $scope.actual_height = ACTUAL_HEIGHT
    $scope.gallery_bound_height = GALLERY_BOUND_HEIGHT
    $scope.gallery_padding_top = GALLERY_PADDING_TOP
    $scope.gallery_padding_bottom = GALLERY_PADDING_BOTTOM
    $scope.h = height
    $scope.topheight_minuspadding = topheight_minuspadding
    $scope.topheight = topheight
    $scope.pad = pad
    
    $scope.photo = Photo.get({id: $routeParams.photoId, username: $routeParams.username}, function(data){   
      $scope.photographer_location = data.location
      $scope.nonroom_css = {
        'transform': "scale("+get_nonroom_scale()+")",
        'padding-top': GALLERY_PADDING_TOP+'px',
        'height': topheight_minuspadding+'px',
        'margin-top': -((topheight + 589)/2)+'px'
      };
      $scope.room_css = {
        'transform': "scale("+get_room_scale()+")",
        'padding-top': GALLERY_PADDING_TOP+'px',
        'height': topheight_minuspadding+'px',
        'margin-top': -((topheight + 589)/2)+'px'
      }
      $scope.price_m = 45 + data.price_m
      
      $scope.image_css = {
        'max-width': 'inherit'
      }
      
      function set_dims(size){
        if(data.original_image_width >= data.original_image_height){
          w = size
          h = size * (data.original_image_height / data.original_image_width)
          h = Math.round(h * 1) / 1
        }else{
          h = size
          w = size * (data.original_image_width / data.original_image_height)
          w = Math.round(w * 1) / 1
        }
        $scope.photo_width = w
        $scope.photo_height = h
      } 
      
      set_dims(12)
      
      function get_nonroom_scale() {
        return $(window).height() / (( $('#nonroom').attr('data-topheight')*1) +  589)
      }
      function get_room_scale() {
        return $(window).height() / (( $('#theroom').attr('data-topheight')*1) +  589)
      }
      
      $scope.changeSize = function(showsize) {
        switch (showsize) {
            case 's':
                price = 50;
                $scope.image_css = {'max-width': 'inherit', 'transform':"scale(1)"}
                set_dims(12)
                $scope.thesize = 'small'
                break;
            case 'm':
                price = data['price_m'] + 45;
                $scope.image_css = {'max-width': 'inherit', 'transform':"scale(1.2)"}
                set_dims(16)
                $scope.thesize = 'medium'
                break;
            case 'l':
                price = data['price_l'] + 45;
                $scope.image_css = {'max-width': 'inherit', 'transform':"scale(1.4)"}
                set_dims(22)
                $scope.thesize = 'large'
                break;
            case 'p':
                price = data['price_p'] + 45;
                set_dims(28)
                $scope.thesize = 'premium'
                break;
        }
        $scope.price = price;
      }
       
      
    });
    
  }
]);

// photosControllers.run(function($rootScope, $templateCache) {
//   $rootScope.$on('$viewContentLoaded', function() {
//     $templateCache.removeAll();
//     
//   });
// });

photosControllers.factory('UserService', function() {
  var cls='photo'
  return {
    get: function(){
      return cls;
    },
    set: function(value){
      cls=value;
    }
  };
});
// photosControllers.run(function($rootScope) {
    // $rootScope.bodyidentifier = 'index';
// })
