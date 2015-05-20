'use strict';

/**
 * @ngdoc service
 * @name HarvardApp.Harvard
 * @description
 * # Harvard
 * Service in the HarvardApp.
 */
angular.module('HarvardApp')
    .service('Harvard', ['$http', function Harvard($http) {
        return {
            getGanttTimespans: function() {
                return [
                        // {
                        //     from: new Date(2014, 12, 21, 8, 0, 0),
                        //     to: new Date(2015, 10, 25, 15, 0, 0),
                        //     name: 'Sprint 1 Timespan'
                        //     //priority: undefined,
                        //     //classes: [], //Set custom classes names to apply to the timespan.
                        //     //data: undefined
                        // }
                    ];
            },
            getGanttData: function() {
                return $http({
                    method: 'get',
                    url: '/scripts/data/plan.json'
                });
            },
            getGanttDataCalc: function() {
                return $http({
                    method: 'get',
                    url: '/scripts/data/calc.json'
                });
            }
        };
    }])
;
