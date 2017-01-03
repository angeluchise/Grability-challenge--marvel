var baseUrl = 'http://gateway.marvel.com/v1/public/';
var key = '8c098e6996b2d32729ad977e5aad530b';
var hash = '6040c305bcd4d0d24d1cced0103262be';
var td = new Date();
var timestap = '1483397108829000';
console.log(timestap);
var url = baseUrl + 'characters?ts='+ timestap +'&apikey='+ key +'&hash='+hash;
angular.module('changelle-marvelApp')

.constant('Configs',{
    API: url
})
  .constant('EndPoints', {


  });
