'use strict';

/**
 * @ngdoc overview
 * @name HarvardApp
 * @description
 * # HarvardApp
 *
 * Main module of the application.
 */
angular.module('HarvardApp', [
    'gantt', // angular-gantt.
    'gantt.sortable',
    'gantt.drawtask',
    'gantt.tooltips',
    'gantt.bounds',
    'gantt.progress',
    'gantt.labels',
    'gantt.movable',
    'mgcrea.ngStrap',
    'ui.sortable'
]).config(['$compileProvider', function($compileProvider) {
    // $compileProvider.debugInfoEnabled(false); // Remove debug info (angularJS >= 1.3)
}]);
