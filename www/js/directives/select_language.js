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
    .directive('selectLanguage', function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'js/directives/select_language.html',
            controller: function($scope, $translate, localStorageService) {

                // add/remove/update language
                $scope.locales = [
                    {
                        name: 'English',
                        id: '1',
                        img: './img/en.png',
                        locate: 'en'
                    },
                    {
                        name: 'हिंदी',
                        id: '2',
                        img: './img/mr.png',
                        locate: 'hi'
                    }
                ];

                $scope.selectLangId = function (lang) {
                  $scope.selectedLang = lang;
                  $translate.use($scope.selectedLang.locate);
                  localStorageService.set('language', lang)
                };

                var _init = function () {
                    if (localStorageService.get('language')) {
                        $scope.selectedLang = localStorageService.get('language');
                    } else {
                        $scope.selectedLang = $scope.locales[0]
                    }
                    $translate.use($scope.selectedLang.locate);
                };
                _init();
            }
        };
    });
