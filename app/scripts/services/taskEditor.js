'use strict';

/**
 * @ngdoc service
 * @name HarvardApp.Matt
 * @description
 * # Matt
 * Service in the HarvardApp.
 */
angular.module('HarvardApp')
    .service('TaskEditor', ['$http', '$timeout', '$log', '$alert', 'Coloured', 'Matt', 'moment', function TaskEditor($http, $timeout, $log, $alert, Coloured, Matt, moment) {
        var configuration = Matt.configuration();

        return {
            /**
             * [taskTemplate Task 預設樣版]
             * @type {Object}
             *
             * Task Modify Hint.
             * 如果要新增屬性，請先在此新增屬性與預設值。
             * 例如：
             *
             * newPriority = 1000,
             */
            taskTemplate: {
                id: 0,
                oid: 0,
                color: '#AA8833',
                name: 'Drawn task',
                from: moment().format('YYYY-MM-DDTHH:mm:ssZ'),
                to: moment().format('YYYY-MM-DDTHH:mm:ssZ'),
                textColor: Coloured.isDarkColoured('#AA8833') ? '#ffffff' : '#000000',
                operationCode: '',
                priority: 0,
                part: 0,
                job: {},
                process: {},
                previousOperation: '',
                nextOperations: [],
                runOnMachineId: 0,
                actualRunOnMachineId: 0,
                quantity: 0,
                actualQuantity: 0,
                processingType: 'GANG',
                factoryOperation: null,
                pin: false,
                capacity: 0,
                s2sMins: -1,
                up: 0,
                sheetUp: 0,
                face: 0,
                pendingMinutes: 0,
                expectedStartTime: null,
                expectedSetupFinishTime: null,
                expectedFinishTime: null,
                actualStartTime: null,
                actualSetupFinishTime: null,
                actualFinishTime: null,
                finished: false,
                inProcessing: false,
                delete: false,
                parallelCode: '',
                expectedMoldId: null,
                tooltip: [],
                timeclockEmployeeId: '',
                rounds: 0,
                taskGroup: '',
                machineShiftLabel: '',
                new: true,
                highlight: false,
                movable: {
                    enabled: false,
                    allowMoving: false,
                    allowResizing: false,
                    allowRowSwitching: false,
                    allowRowSwitchingCondition: function(source, target, task) {
                        return false;
                    }
                },
                tooltips: {
                    enabled: false
                },
                taskContent: '/views/taskContent.tpl.html',
                taskContextMenu: '/views/taskContextMenu.tpl.html',
                taskInfoContent: '/views/taskTooltip.tpl.html',
                taskGroupIdsVo: [],
                weight: 0
            },
            editTaskTemplate: {
                id: 0,
                rowId: 0,
                poNo: '',
                comboId: '',
                processingType: 'GANG',
                operationCode: '',
                rounds: 0,
                priority: 0,
                isPin: '0',
                isFinish: '0',
                inProcessing: '0',
                machineShiftLabel: null,
                parallelCode: null,
                capacity: 1,
                pendingMinutes: 0,
                face: 0,
                up: 0,
                sheetUp: 0,
                part: 0,
                expectedMoldId: null,
                s2sMins: -1,
                timeclockEmployeeId: 0,
                runOnMachineId: null,
                actualRunOnMachineId: null,
                expectedStartTime: moment().format('YYYY/MM/DD HH:mm'),
                expectedSetupFinishTime: null,
                expectedFinishTime: null,
                quantity: 0,
                actualStartTime: null,
                actualSetupFinishTime: null,
                actualFinishTime: null,
                actualQuantity: null,
                modifyType: 'create',
                drawTask: false,
                modal: undefined,
                fuzzyPoNo: '',
                poId: '',
                productId: '',
                processId: '',
                poFuzzySearch: [],
                comboList: [],
                productList: [],
                processList: [],
                previousTask: [],
                nextTask: [],
                tooltip: [],
                previousTaskId: 0,
                nextTaskId: 0,
                check: false,
                color: '#AA8833',
                taskGroupIdsVo: [],
                weight: 0
            },
            editTaskModalOptions: {
                scope: null,
                title: 'Task Creator',
                template: configuration.serverLocation + configuration.viewsFolder + '/editor.tpl.html',
                backdrop: false,
                show: true
            }
        };
    }]
);