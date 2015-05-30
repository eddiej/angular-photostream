var photoServices = angular.module('photoServices', ['ngResource']);
photoServices.factory('Photo', ['$resource',
  function($resource){
    var country = 'Ireland';
    var state = '';
    var page = 1;
    var Photo = $resource('http://www.lokofoto.com/api/photos/:id', {id: "@id"}, 
      {
        'index':   { method: 'GET', isArray: true },
        'show':    { method: 'GET', isArray: false },
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
    var Location = $resource('http://www.lokofoto.com/api/locations/:id/states', {id: "@id"}, 
      {
        'states':    { method: 'GET', isArray: true },
      }
  );
  return Location;
}]);

var photographerServices = angular.module('photographerServices', ['ngResource']);
photographerServices.factory('Photographer', ['$resource',
  function($resource){
    var Photographer = $resource('http://www.lokofoto.com/api/photographers/:id', {id: "@id"}, 
      {
        'index':   { method: 'GET', isArray: true },
        'show':    { method: 'GET', isArray: true },
      }
    );
    var page = 1;
    Photographer.getPage = function(){return page;};
    Photographer.setPage = function(p){page=p;};
    return Photographer;
  }]);
