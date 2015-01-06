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
    'gantt.movable',
    'gantt.drawtask',
    'gantt.tooltips',
    'gantt.bounds',
    'gantt.progress',
    'gantt.table',
    // 'gantt.tree',
    'gantt.groups',
    'mgcrea.ngStrap',
    'ui.sortable',
    'harvard.templates'
]).config(['$compileProvider', function($compileProvider) {
    $compileProvider.debugInfoEnabled(true); // Remove debug info (angularJS >= 1.3)
}]);
