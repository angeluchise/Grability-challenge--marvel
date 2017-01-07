'use strict';

/**1
 * @ngdoc function
 * @name pruebaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pruebaApp
 */

  var app = angular.module('changelle-marvelApp');

  app.controller('MainCtrl',  function($scope,api_marvel,$routeParams,api_marvel_characters,$webSql,$window) {
    $scope.main_variable = function (id) {
      api_marvel_characters.get({characterId:id}, function (data){
        $scope.characterComics = data.data.results[0];
        $scope.characterCs = data.data.count;
      });
    }
    $(document).ready(function() {
      $('select').material_select();
      $('.modal-trigger').leanModal({
		dismissible: false
	});
    });
    $scope.orderList = "name";
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
    $scope.db = $webSql.openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
    $scope.db.createTable('User', {
      "id":{
        "type": "INTEGER",
        "null": "NOT NULL", // default is "NULL" (if not defined)
        "primary": true, // primary
        "auto_increment": true // auto increment
      },
      "created":{
        "type": "TIMESTAMP",
        "null": "NOT NULL",
        "default": "CURRENT_TIMESTAMP" // default value
      },
      "title":{
        "type": "TEXT",
        "null": "NOT NULL"
      },
      "images": {
        "type": "TEXT",
        "null": "NOT NULL"
      }
    });
    $scope.db.selectAll("user").then(function(results) {
      for(var i=0; i < results.rows.length; i++){
        $scope.users.push(results.rows.item(i));
        $scope.value_user =results.rows.item(i);
        $scope.add_comics = function (title,images) {
          if($scope.value_user.title == title) {
            alert("favorite exist");
          } else {
            $scope.db.insert('user', {"title": title, "images": images+'/portrait_fantastic.jpg'}).then(function(results) {
              console.log(results.insertId);
            })
            $window.location.reload();
          }
        };
      }
    })
    $scope.users = [];
    if ($scope.users.length == 0) {
      $scope.add_comics = function (title,images) {
        $scope.db.insert('user', {"title": title, "images": images+'/portrait_fantastic.jpg'}).then(function(results) {
            console.log(results.insertId);
        })
        $window.location.reload();
      };
    }
    console.log($scope.users.length+'hola');  
  }).filter('startFromGrid', function() {
    return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    }
});
