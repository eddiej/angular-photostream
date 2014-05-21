var photoServices = angular.module('photoServices', ['ngResource']);

photoServices.factory('Photo', ['$resource',
  function($resource){
    var country = 'Ireland';
    var state = '';
    var page = 1;
    var Photo = $resource('http://localhost:4000/api/photos/:id', {id: "@id"}, 
      {
        'create':  { method: 'POST' },
        'index':   { method: 'GET', isArray: true },
        'show':    { method: 'GET', isArray: false },
        'update':  { method: 'PUT' },
        'destroy': { method: 'DELETE' }
        // query: {method:'GET', params:{photoId:'photos'}, isArray:true}
      }
    );
    Photo.getPage = function(){return page;};
    Photo.setPage = function(p){page=p;};
    Photo.getCountry = function(){return country;};
    Photo.setCountry = function(c){country=c;};
    Photo.getState = function(){return state;};
    Photo.setState = function(s){state=s;};
    return Photo;
  }]);
  
var locationServices = angular.module('locationServices', ['ngResource']);

  locationServices.factory('Location', ['$resource',
    function($resource){
      var Location = $resource('http://localhost:4000/api/locations/:id/states', {id: "@id"}, 
        {
          'states':    { method: 'GET', isArray: true },
        }
      );
      return Location;
    }]);