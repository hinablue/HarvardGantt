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
    'gantt',
    'gantt.sortable',
    'gantt.movable',
    'gantt.drawtask',
    'gantt.tooltips',
    'gantt.bounds',
    'gantt.progress',
    'gantt.table',
    'gantt.groups',
    'mgcrea.ngStrap',
    'harvard.templates'
]).config(['$compileProvider', function($compileProvider) {
    $compileProvider.debugInfoEnabled(false); // Remove debug info (angularJS >= 1.3)
}]);
