'use strict';

/**
 * @ngdoc function
 * @name pruebaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pruebaApp
 */

  var app = angular.module('changelle-marvelApp');

  app.controller('MainCtrl',  function($scope,api_marvel) {
    $scope.currentPage = 0;

    $scope.pageSize = 10; // Esta la cantidad de registros que deseamos mostrar por página
    $scope.pages = [];
    api_marvel.get(function (data){
      $scope.characters = data.data.results;
    });
    $scope.configPages = function() {
      api_marvel.get(function (data){
        $scope.characters = data.data.results;
        $scope.pages.length = 0;
        var ini = $scope.currentPage - 4;
        var fin = $scope.currentPage + 5;
        if (ini < 1) {
          ini = 1;
          if (Math.ceil($scope.characters.length / $scope.pageSize) > 10) fin = 10;
          else fin = Math.ceil($scope.characters.length / $scope.pageSize);
        } else {
          if (ini >= Math.ceil($scope.characters.length / $scope.pageSize) - 10) {
            ini = Math.ceil($scope.characters.length / $scope.pageSize) - 10;
            fin = Math.ceil($scope.characters.length / $scope.pageSize);
          }
        }
        if (ini < 1) ini = 1;
        for (var i = ini; i <= fin; i++) {
          $scope.pages.push({ no: i });
        }
        if ($scope.currentPage >= $scope.pages.length)
          $scope.currentPage = $scope.pages.length - 1;
      });
    };
    


    $scope.setPage = function(index) {
      $scope.currentPage = index - 1;
    };

    $scope.configPages();
  }).filter('startFromGrid', function() {
     return function(input, start) {
        start = +start;
        return input.slice(start);
     };
  });
