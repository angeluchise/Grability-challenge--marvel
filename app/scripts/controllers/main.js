'use strict';

/**
 * @ngdoc function
 * @name pruebaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pruebaApp
 */
angular.module('changelle-marvelApp')
  .controller('MainCtrl', function ($scope,api_marvel) {
    $(document).ready(function() {
      $('select').material_select();
    });
    api_marvel.get(function (data){
      $scope.characters = data.data.results;
      console.log($scope.characters);
    });
  });
