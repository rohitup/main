'use strict';

/**
 * @ngdoc overview
 * @name starter
 * @description
 * # starter
 *
 * Main module of the application.
 */
angular.module('starter')
  .directive('file', function () {
    return {
      restrict: 'AEC',
      link: function ($scope, el, attrs) {
        el.bind('change', function (event) {
          var files = event.target.files;
          var file = files[0];
          var data = {
            lastModified: file.lastModified,
            lastModifiedDate: file.lastModifiedDate,
            name: file.name,
            size: file.size,
            type: file.type,
            webkitRelativePath: file.webkitRelativePath
          };
          $scope.file = data;
          $scope.$parent.file = file;
          $scope.$apply();
        });
      }
    };
  });