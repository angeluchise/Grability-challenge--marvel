var key = '8c098e6996b2d32729ad977e5aad530b';
var hash = '6040c305bcd4d0d24d1cced0103262be';
var timestap = '1483397108829000';
angular.module('changelle-marvelApp')

.constant('Configs',{
    API: 'http://gateway.marvel.com/v1/public/characters'
})
  .constant('EndPoints', {
    timestap: '?ts='+timestap,
    key: '&apikey='+ key,
    hash: '&hash='+hash

  });
