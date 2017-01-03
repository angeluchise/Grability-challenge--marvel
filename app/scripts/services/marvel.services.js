angular.module('changelle-marvelApp').factory('api_marvel', function($resource,Configs,md5) {
  return $resource(Configs.API);
});
