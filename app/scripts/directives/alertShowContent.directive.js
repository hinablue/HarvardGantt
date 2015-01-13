'use strict';

/**
 * @ngdoc function
 * @name mgcrea.ngStrap.directive:showContent
 * @description
 * # showContent
 * Directive of the mgcrea.ngStrap
 */
angular.module('mgcrea.ngStrap')
    .directive('showContent', ['$document', '$compile', '$sce', '$log', function ($document, $compile, $sce, $log) {
        return {
            scope: true,
            link: function ($scope, $element, $attrs) {
                var el;
                $attrs.$observe('template', function (tpl) {
                    el = $compile('<div>'+tpl+'</div>')($scope);
                    $log.info(el);
                    $element.html("");
                    $element.append(el);
                });
            }
        }
    }]
);