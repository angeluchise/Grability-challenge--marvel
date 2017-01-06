angular.module('changelle-marvelApp').factory('api_marvel', function($resource,Configs,EndPoints) {
  return $resource(Configs.API+EndPoints.timestap+EndPoints.key+EndPoints.hash);
});
