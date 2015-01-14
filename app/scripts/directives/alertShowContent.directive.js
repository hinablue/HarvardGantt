'use strict';

/**
 * @ngdoc function
 * @name mgcrea.ngStrap.directive:showContent
 * @description
 * # showContent
 * Directive of the mgcrea.ngStrap
 */
angular.module('mgcrea.ngStrap')
    .directive('showContent', ['$compile', function ($compile) {
        return {
            scope: true,
            link: function ($scope, $element, $attrs) {
                var el;
                $attrs.$observe('showContent', function (tpl) {
                    el = $compile('<div>'+tpl+'</div>')($scope);
                    $element.html('');
                    $element.append(el);
                });
            }
        }
    }]
);