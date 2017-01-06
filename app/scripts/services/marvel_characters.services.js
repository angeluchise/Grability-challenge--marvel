angular.module('changelle-marvelApp').factory('api_marvel_characters', function($resource,Configs,EndPoints) {
  return $resource(Configs.API+'/:characterId'+'/comics'+EndPoints.timestap+EndPoints.key+EndPoints.hash,{characterId: '@characterId'});
});
