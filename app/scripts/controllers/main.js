'use strict';

/**
 * @ngdoc function
 * @name pruebaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pruebaApp
 */
angular.module('changelle-marvelApp')
  .controller('MainCtrl', function () {
    $(document).ready(function() {
      $('select').material_select();
    });
  });
