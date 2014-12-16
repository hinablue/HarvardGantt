'use strict';

/**
 * @ngdoc function
 * @name HarvardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the HarvardApp
 */
HarvardApp.controller('MainCtrl', ['$scope', '$http', '$timeout', '$log', '$modal', '$alert', 'ganttUtils', 'GanttObjectModel', 'Coloured', 'Harvard', 'Matt', 'ganttMouseOffset', 'ganttDebounce', 'moment', function($scope, $http, $timeout, $log, $modal, $alert, utils, ObjectModel, Coloured, Harvard, Matt, mouseOffset, debounce, moment) {
    var objectModel;
    var dataToRemove;

    $scope.configuration = Matt.configuration();

    $scope.defaultScale = ['minute', '5 minutes', 'hour', '3 hours', '6 hours', '8 hours', 'day', 'week', '2 weeks', 'month', 'quarter', '6 months', 'year'];

    $scope.options = {
        mode: 'custom',
        scale: 'day',
        sortMode: undefined,
        maxHeight: false,
        width: false,
        autoExpand: 'right',
        taskOutOfRange: 'expand',
        fromDate: undefined,
        toDate: undefined,
        allowSideResizing: false,
        labelsEnabled: true,
        currentDate: 'line',
        currentDateValue: moment.utc(),
        draw: false,
        readOnly: false,
        filterTask: '',
        filterRow: '',
        timeFrames: {
            'day': {
                start: moment.utc('8:00', 'HH:mm'),
                end: moment.utc('20:00', 'HH:mm'),
                working: true,
                default: true
            },
            'noon': {
                start: moment.utc('12:00', 'HH:mm'),
                end: moment.utc('13:30', 'HH:mm'),
                working: false,
                default: true
            },
            'weekend': {
                working: false
            },
            'holiday': {
                working: false,
                color: 'red',
                classes: ['gantt-timeframe-holiday']
            }
        },
        dateFrames: {
            'weekend': {
                evaluator: function(date) {
                    return date.isoWeekday() === 6 || date.isoWeekday() === 7;
                },
                targets: ['weekend']
            },
            '11-november': {
                evaluator: function(date) {
                    return date.month() === 10 && date.date() === 11;
                },
                targets: ['holiday']
            }
        },
        timeFramesNonWorkingMode: 'visible',
        columnMagnet: '1 minutes',
        drawTaskFactory: function() {
            return {
                id: utils.randomUuid(),  // Unique id of the task.
                name: 'Drawn task', // Name shown on top of each task.
                color: '#AA8833' // Color of the task in HEX format (Optional).
            };
        },
        api: function(api) {
            // API Object is used to control methods and events from angular-gantt.
            $scope.api = api;

            api.core.on.ready($scope, function() {
                // Log various events to console
                api.scroll.on.scroll($scope, logScrollEvent);
                api.core.on.ready($scope, logReadyEvent);

                api.tasks.on.add($scope, addEventName('tasks.on.add', logTaskEvent));
                api.tasks.on.change($scope, addEventName('tasks.on.change', logTaskEvent));
                api.tasks.on.rowChange($scope, addEventName('tasks.on.rowChange', logTaskEvent));
                api.tasks.on.remove($scope, addEventName('tasks.on.remove', logTaskEvent));

                if (api.tasks.on.moveBegin) {
                    api.tasks.on.moveBegin($scope, addEventName('tasks.on.moveBegin', logTaskEvent));
                    //api.tasks.on.move($scope, addEventName('tasks.on.move', logTaskEvent));
                    api.tasks.on.moveEnd($scope, addEventName('tasks.on.moveEnd', logTaskEvent));

                    api.tasks.on.resizeBegin($scope, addEventName('tasks.on.resizeBegin', logTaskEvent));
                    //api.tasks.on.resize($scope, addEventName('tasks.on.resize', logTaskEvent));
                    api.tasks.on.resizeEnd($scope, addEventName('tasks.on.resizeEnd', logTaskEvent));
                }

                api.rows.on.add($scope, addEventName('rows.on.add', logRowEvent));
                api.rows.on.change($scope, addEventName('rows.on.change', logRowEvent));
                api.rows.on.move($scope, addEventName('rows.on.move', logRowEvent));
                api.rows.on.remove($scope, addEventName('rows.on.remove', logRowEvent));

                api.side.on.resizeBegin($scope, addEventName('labels.on.resizeBegin', logLabelsEvent));
                //api.side.on.resize($scope, addEventName('labels.on.resize', logLabelsEvent));
                api.side.on.resizeEnd($scope, addEventName('labels.on.resizeEnd', logLabelsEvent));

                api.timespans.on.add($scope, addEventName('timespans.on.add', logTimespanEvent));
                api.columns.on.generate($scope, logColumnsGenerateEvent);

                api.rows.on.filter($scope, logRowsFilterEvent);
                api.tasks.on.filter($scope, logTasksFilterEvent);

                // api.data.on.change($scope, function() {
                //     $scope.live.row = $scope.data[5];

                //     if (dataToRemove === undefined) {
                //         dataToRemove = [
                //             {'id': $scope.data[2].id}, // Remove Kickoff row
                //             {
                //                 'id': $scope.data[0].id, 'tasks': [
                //                 {'id': $scope.data[0].tasks[0].id},
                //                 {'id': $scope.data[0].tasks[3].id}
                //             ]
                //             }, // Remove some Milestones
                //             {
                //                 'id': $scope.data[6].id, 'tasks': [
                //                 {'id': $scope.data[6].tasks[0].id}
                //             ]
                //             } // Remove order basket from Sprint 2
                //         ];
                //     }
                // });

                // When gantt is ready, load data.
                // `data` attribute could have been used too.
                $scope.load();

                // Add some DOM events
                api.directives.on.new($scope, function(directiveName, directiveScope, element) {
                    if (directiveName === 'ganttTask') {
                        element.bind('click', function() {
                            logTaskEvent('task-click', directiveScope.task);
                        });
                        element.bind('mousedown touchstart', function(event) {
                            event.stopPropagation();
                            $scope.live.row = directiveScope.task.row.model;
                            if (directiveScope.task.originalModel !== undefined) {
                                $scope.live.task = directiveScope.task.originalModel;
                            } else {
                                $scope.live.task = directiveScope.task.model;
                            }
                            $scope.$digest();
                        });
                    } else if (directiveName === 'ganttRow') {
                        element.bind('click', function() {
                            logRowEvent('row-click', directiveScope.row);
                        });
                        element.bind('mousedown touchstart', function(event) {
                            event.stopPropagation();
                            $scope.live.row = directiveScope.row.model;
                            $scope.$digest();
                        });
                    } else if (directiveName === 'ganttRowLabel') {
                        directiveScope.multipleTasks = [];
                        directiveScope.multipleTasksToggle = function(id) {
                            var _multipleTasks = [];
                            if ($scope.multipleTasks.indexOf(id) >= 0) {
                                for(var i = 0, mt = directiveScope.multipleTasks, l = mt.length; i < l; i += 1) {
                                    if (mt[i] === id) continue;
                                    _multipleTasks.push(mt[i]);
                                }
                                directiveScope.multipleTasks = _multipleTasks;
                            } else {
                                directiveScope.multipleTasks.push(id);
                            }
                        };
                        directiveScope.multipleTasksCheck = function(id) {
                            if (directiveScope.multipleTasks.indexOf(id) >= 0) {
                                return true;
                            } else {
                                return false;
                            }
                        };
                        directiveScope.autoExpand = {
                            width: (directiveScope.row.model.UI2Title.length * 10 + 33) + 'em'
                        };
                        directiveScope.taskColoured = function(bgColor, textColor) {
                            return {
                                background: bgColor,
                                color: textColor
                            };
                        };
                        directiveScope.dragControlListeners = {
                            containment: '#machineTasks',
                            scrollableContainer: '#machineTasks',
                            accept: function (sourceItemHandleScope, destSortableScope) {
                                return true;
                            },
                            orderChanged: function(event) {
                                var target;
                                if (event.dest.index === 0) {
                                    target = 0;
                                } else {
                                    target = event.dest.index > event.source.index ? event.dest.index - 1 : event.dest.index;
                                }
                                for (var i = target, t = directiveScope.row.tasks, l = t.length; i < l; i += 1) {
                                    if (t[i].model.id === t[target].model.id) continue;

                                    if (t[i].model.from < t[(i-1)].model.to) {
                                        var during = t[i].model.to.clone() - t[i].model.from.clone(),
                                            setupDuring = t[i].model.data.expectedSetupFinishTime.clone() - t[i].model.from.clone();

                                        t[i].model.from = t[(i-1)].model.to.clone().add(1, 'm');
                                        t[i].model.to = t[i].model.from.clone().add(during, 'ms');
                                        t[i].model.data.expectedSetupFinishTime = t[i].model.from.clone().add(setupDuring, 'ms');
                                    }
                                }
                            }
                        };
                        directiveScope.tasksOnMachine = $modal({
                            scope: directiveScope,
                            title: 'Machine',
                            template: 'views/machine.tpl.html',
                            backdrop: false,
                            placement: 'center',
                            show: false
                        });
                        element.bind('dblclick', function() {
                            directiveScope.tasksOnMachine.$promise.then(directiveScope.tasksOnMachine.show);
                        });
                    }
                });

                api.tasks.on.rowChange($scope, function(task) {
                    $scope.live.row = task.row.model;
                });

                objectModel = new ObjectModel(api);
            });
        }
    };

    $scope.canAutoWidth = function(scale) {
        // Always disable auto width
        return false;
        // if (scale.match(/.*?hour.*?/) || scale.match(/.*?minute.*?/)) {
        //     return false;
        // }
        // return true;
    };

    $scope.getColumnWidth = function(widthEnabled, scale) {
        if (!widthEnabled && $scope.canAutoWidth(scale)) {
            return undefined;
        }

        if (scale.match(/.*?week.*?/)) {
            return 150;
        }

        if (scale.match(/.*?month.*?/)) {
            return 300;
        }

        if (scale.match(/.*?quarter.*?/)) {
            return 500;
        }

        if (scale.match(/.*?year.*?/)) {
            return 800;
        }

        return 40;
    };

    $scope.saveGanttData = function() {
        var mattCallback = Matt.saveOrCalcGanttData();

        $http({
            method: 'post',
            responseType: 'json',
            url: $scope.configuration.serverLocation + $scope.configuration.confirmGanttUrl,
            timeout: $scope.configuration.getGanttDataTimeout * 1000,
            data: rawData,
            params: {
                calculate: true,
                calculateFrom: 0,// moment.utc($scope.gantt.getFirstColumn().date).format(dateFormat),  // Gantt start time
                calculateWeeks: 52,
                save: isSave
            }
        }).then(function(response) {
            var result = mattCallback.success(response);
            if (result.state === 'ok' && result.data.machines !== undefined && result.data.machines.length > 0) {
                $scope.readyToGo(result.data);
            } else {
                $alert({
                    title: result.messages.title,
                    content: result.messages.content,
                    placement: 'top',
                    type: 'info',
                    duration: 3,
                    container: '#gantt-chart-alert',
                    show: true
                });
            }
        }, function(response) {
            var result = mattCallback.error(response);
            $alert({
                title: result.messages.title,
                content: result.messages.content,
                placement: 'top',
                type: 'info',
                duration: 3,
                container: '#gantt-chart-alert',
                show: true
            });
        });
    };

    $scope.readyToGo = function(originalData) {
        var obj, task, i, j, l, m, q, t, p;

        $scope.clear();
        $scope.tasksMap = {};
        $scope.processesMap = {};
        $scope.jobsMap = {};
        $scope.machinesMap = {};

        for(i = 0, m = originalData.machines, l = m.length; i < l; i++) {
            if (('m'+m[i].machine.id in $scope.machinesMap) === false) {
                $scope.machinesMap['m'+m[i].machine.id] = m[i].machine;
            }

            // Prepare row machine data
            obj = {
                id: m[i].machine.id,
                name: m[i].machine.settingsMachine.name,
                dept: m[i].machine.settingsMachine.dept,
                settings: m[i].machine.settingsMachine,
                factoryOperation: m[i].machine.factoryOperation,
                UI2Title: m[i].machine.title.split('|'),
                tasks: []
            };

            if (m[i].operationQueue.length > 0) {
                for(j = 0, t = m[i].operationQueue, q = t.length; j < q; j++) {
                    // Prepare and cleanup the task data.
                    task = {
                        name: t[j].operationCode,
                        color: t[j].color,
                        from: moment.utc(t[j].expectedStartTime, 'YYYY-MM-DDTHH:mm:ss'),
                        to: moment.utc(t[j].expectedFinishTime, 'YYYY-MM-DDTHH:mm:ss'),
                        id: t[j].id,
                        oid: t[j].oid,
                        textColor: Coloured.isDarkColoured(t[j].color) ? '#ffffff' : '#000000',
                        operationCode: t[j].operationCode,
                        processingType: t[j].processingType,
                        quantity: t[j].quantity,
                        group: t[j].taskGroup,
                        isNew: false,
                        // isParallel: t[j].parallel,
                        isDelete: t[j].delete,
                        isFinish: t[j].finished,
                        isPin: t[j].pin,
                        inProcessing: t[j].inProcessing,
                        factoryOperation: t[j].factoryOperation,
                        job: t[j].job,
                        process: t[j].process,
                        movable: {
                            enabled: true,
                            allowMoving: true,
                            allowResizing: false,
                            allowRowSwitching: false
                        },
                        data: {
                            previousOperations: [t[j].previousOperation],
                            nextOperations: t[j].nextOperations,
                            runOnMachineId: t[j].runOnMachineId,
                            actualRunOnMachineId: t[j].actualRunOnMachineId,
                            machineShiftLabel: t[j].machineShiftLabel,
                            parallelCode: t[j].parallelCode,
                            pendingMinutes: t[j].pendingMinutes,
                            expectedMoldId: t[j].expectedMoldId,
                            capacity: t[j].capacity,
                            face: t[j].face,
                            priority: t[j].priority,
                            rounds: t[j].rounds,
                            up: t[j].up,
                            sheetUp: t[j].sheetUp,
                            part: t[j].part,
                            s2sMins: t[j].s2sMins,
                            timeclockEmployeeId: t[j].timeclockEmployeeId,
                            expectedStartTime: moment.utc(t[j].expectedStartTime, 'YYYY-MM-DDTHH:mm:ss'),
                            expectedSetupFinishTime: moment.utc(t[j].expectedSetupFinishTime, 'YYYY-MM-DDTHH:mm:ss'),
                            expectedFinishTime: moment.utc(t[j].expectedFinishTime, 'YYYY-MM-DDTHH:mm:ss'),
                            actualStartTime: (t[j].actualStartTime === null) ? null : moment.utc(t[j].actualStartTime, 'YYYY-MM-DDTHH:mm:ss'),
                            actualSetupFinishTime: (t[j].actualSetupFinishTime === null) ? null : moment.utc(t[j].actualSetupFinishTime, 'YYYY-MM-DDTHH:mm:ss'),
                            actualFinishTime: (t[j].actualFinishTime === null) ? null : moment.utc(t[j].actualFinishTime, 'YYYY-MM-DDTHH:mm:ss'),
                            actualQuantity: t[j].actualQuantity,
                            UI2: t[j].tooltip.split('|')
                        }
                    };

                    if (('t'+t[j].id in $scope.tasksMap) === false) {
                        $scope.tasksMap['t'+t[j].id] = task;
                    }

                    // Prepare processesMap
                    if (('p'+t[j].process.id in $scope.processesMap) === false) {
                        $scope.processesMap['p'+t[j].process.id] = {
                            id: t[j].process.id,
                            needWaitPrevProcess: t[j].process.needWaitPrevProcess,
                            operations: t[j].process.operations,
                            previousProcesses: t[j].process.previousProcesses,
                            nextProcesses: [],
                            productId: t[j].process.productId
                        };
                    }

                    // Prepare jobsMap
                    if (('j'+t[j].job.id in $scope.jobsMap) === false) {
                        $scope.jobsMap['j'+t[j].job.id] = t[j].job;
                    }

                    obj.tasks.push(task);
                }
            }
            $scope.data.push(obj);
        }
        // Connect the processesMap
        for(p in $scope.processesMap) {
            if ($scope.processesMap[p].previousProcesses.length > 0) {
                for(i = 0, m = $scope.processesMap[p].previousProcesses, l = m.length; i < l; i++) {
                    if ('p'+m[i].id in $scope.processesMap) {
                        $scope.processesMap['p'+m[i].id].nextProcesses.push($scope.processesMap[p].id);
                    }
                }
            }
        }

        dataToRemove = undefined;

        $scope.timespans = Harvard.getGanttTimespans();
    };

    // Reload data action
    $scope.load = function() {
        var mattCallback = Matt.getGanttData();

        $http({
            method: 'get',
            responseType: 'json',
            url: $scope.configuration.getGanttUrl,
            params: {},
            timeout: $scope.configuration.getGanttDataTimeout * 1000
        }).then(function(response) {
            var result = mattCallback.success(response);
            if (result.state === 'ok' && result.data.machines !== undefined && result.data.machines.length > 0) {
                $scope.readyToGo(result.data);
            } else {
                $alert({
                    title: result.messages.title,
                    content: result.messages.content,
                    placement: 'top',
                    type: 'info',
                    duration: 3,
                    container: '#gantt-chart-alert',
                    show: true
                });

                $scope.readyToGo(Harvard.getGanttData());
            }
        }, function(response) {
            var result = mattCallback.error(response);
            $alert({
                title: result.messages.title,
                content: result.messages.content,
                placement: 'top',
                type: 'info',
                duration: 3,
                container: '#gantt-chart-alert',
                show: true
            });

            $scope.readyToGo(Harvard.getGanttData());
        });
    };

    $scope.reload = function() {
        $scope.load();
    };

    // Remove data action
    $scope.remove = function() {
        $scope.api.data.remove(dataToRemove);
    };

    // Clear data action
    $scope.clear = function() {
        $scope.data = [];
    };

    // Visual two way binding.
    $scope.live = {};

    var debounceValue = 1000;

    var listenTaskJson = debounce(function(taskJson) {
        if (taskJson !== undefined) {
            var task = angular.fromJson(taskJson);
            objectModel.cleanTask(task);
            var model = $scope.live.task;
            angular.extend(model, task);
        }
    }, debounceValue);
    $scope.$watch('live.taskJson', listenTaskJson);

    var listenRowJson = debounce(function(rowJson) {
        if (rowJson !== undefined) {
            var row = angular.fromJson(rowJson);
            objectModel.cleanRow(row);
            var tasks = row.tasks;

            delete row.tasks;
            var rowModel = $scope.live.row;

            angular.extend(rowModel, row);

            var newTasks = {};
            var i, l;

            if (tasks !== undefined) {
                for (i = 0, l = tasks.length; i < l; i++) {
                    objectModel.cleanTask(tasks[i]);
                }

                for (i = 0, l = tasks.length; i < l; i++) {
                    newTasks[tasks[i].id] = tasks[i];
                }

                if (rowModel.tasks === undefined) {
                    rowModel.tasks = [];
                }
                for (i = rowModel.tasks.length - 1; i >= 0; i--) {
                    var existingTask = rowModel.tasks[i];
                    var newTask = newTasks[existingTask.id];
                    if (newTask === undefined) {
                        rowModel.tasks.splice(i, 1);
                    } else {
                        objectModel.cleanTask(newTask);
                        angular.extend(existingTask, newTask);
                        delete newTasks[existingTask.id];
                    }
                }
            } else {
                delete rowModel.tasks;
            }

            angular.forEach(newTasks, function(newTask) {
                rowModel.tasks.push(newTask);
            });
        }
    }, debounceValue);
    $scope.$watch('live.rowJson', listenRowJson);

    $scope.$watchCollection('live.task', function(task) {
        $scope.live.taskJson = angular.toJson(task, true);
        $scope.live.rowJson = angular.toJson($scope.live.row, true);
    });

    $scope.$watchCollection('live.row', function(row) {
        $scope.live.rowJson = angular.toJson(row, true);
        if (row !== undefined && row.tasks.indexOf($scope.live.task) < 0) {
            $scope.live.task = (row.tasks === undefined || row.tasks.length <= 0) ? undefined : row.tasks[0];
        }
    });

    $scope.$watchCollection('live.row.tasks', function() {
        $scope.live.rowJson = angular.toJson($scope.live.row, true);
    });

    // Event handler
    var logScrollEvent = function(left, date, direction) {
        if (date !== undefined) {
            $log.info('[Event] api.on.scroll: ' + left + ', ' + (date === undefined ? 'undefined' : date.format()) + ', ' + direction, $scope.api.gantt.columnsManager.getFirstColumn());
        }
    };

    // Event handler
    var logTaskEvent = function(eventName, data) {
        $log.info('[Event] ' + eventName, data);

        var key;

        if (data.type !== undefined) {
            switch(data.type) {
                case 'edit':
                    $log.info(data.task.model.from.format('YYYY/MM/DD HH:mm'));

                    // Calculate the expected setup finish datetime.
                    var _setupFinishTime = moment.utc(data.task.model.data.expectedSetupFinishTime) + (data.task.model.from - moment.utc(data.task.model.data.expectedStartTime));
                    _setupFinishTime = moment.utc(_setupFinishTime).format('YYYY/MM/DD HH:mm');

                    $scope.editTask = {
                        id: data.task.model.id,
                        rowId: data.task.row.id,
                        poNo: data.task.model.job.poNo,
                        comboId: data.task.model.job.comboId,
                        processingType: data.task.model.processingType,
                        operationCode: data.task.model.operationCode,
                        rounds: data.task.model.data.rounds,
                        priority: data.task.model.data.priority,
                        isPin: data.task.model.isPin,
                        isFinish: data.task.model.isFinish,
                        inProcessing: data.task.model.inProcessing,
                        runOnMachineId: data.task.model.data.runOnMachineId,
                        actualRunOnMachineId: data.task.model.data.actualRunOnMachineId,
                        machineShiftLabel: data.task.model.data.machineShiftLabel,
                        parallelCode: data.task.model.data.parallelCode,
                        pendingMinutes: data.task.model.data.pendingMinutes,
                        capacity: data.task.model.data.capacity,
                        face: data.task.model.data.face,
                        part: data.task.model.data.part,
                        up: data.task.model.data.up,
                        sheetUp: data.task.model.data.sheetUp,
                        s2sMins: data.task.model.data.s2sMins,
                        timeclockEmployeeId: data.task.model.data.timeclockEmployeeId,
                        expectedMoldId: data.task.model.data.expectedMoldId,
                        expectedStartTime: data.task.model.from.format('YYYY/MM/DD HH:mm'),
                        expectedSetupFinishTime: _setupFinishTime,
                        expectedFinishTime: data.task.model.to.format('YYYY/MM/DD HH:mm'),
                        quantity: data.task.model.quantity,
                        actualStartTime: data.task.model.data.actualStartTime,
                        actualSetupFinishTime: data.task.model.data.actualSetupFinishTime,
                        actualFinishTime: data.task.model.data.actualFinishTime,
                        actualQuantity: data.task.model.data.actualQuantity,
                        previousTask: 0,
                        nextTask: 0
                    };
                    $scope.modifyType = data.type;
                    $modal({
                        scope: $scope,
                        title: 'Task Editor',
                        template: 'views/editor.tpl.html',
                        backdrop: false,
                        placement: 'center',
                        show: true
                    });
                break;
                case 'create':
                    $scope.row = data.task;
                    $scope.editTask = {
                        id: 0,
                        rowId: data.task.id,
                        poNo: '',
                        comboId: '',
                        processingType: 'GANG',
                        operationCode: '',
                        rounds: 0,
                        priority: 0,
                        isPin: false,
                        isFinish: false,
                        inProcessing: false,
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
                        expectedStartTime: moment.utc().format('YYYY/MM/DD HH:mm'),
                        expectedSetupFinishTime: null,
                        expectedFinishTime: null,
                        quantity: 0,
                        actualStartTime: null,
                        actualSetupFinishTime: null,
                        actualFinishTime: null,
                        actualQuantity: null,
                        previousTask: 0,
                        nextTask: 0
                    };
                    $scope.modifyType = data.type;
                    $modal({scope: $scope, title: 'Task Creator', template: 'views/editor.tpl.html', backdrop: false, show: true});
                break;
                case 'delete':
                    $scope.tasksMap['t'+data.task.id].isDelete = true;
                break;
                case 'zoomIn':
                    key = $scope.defaultScale.indexOf($scope.options.scale);
                    if (key - 1 >= 0) {
                        $scope.options.scale = $scope.defaultScale[(key - 1)];
                    }
                break;
                case 'zoomOut':
                    key = $scope.defaultScale.indexOf($scope.options.scale);
                    if (key + 1 < $scope.defaultScale.length) {
                        $scope.options.scale = $scope.defaultScale[(key + 1)];
                    }
                break;
            }
        }
    };

    // Event handler
    var logRowEvent = function(eventName, row) {
        $log.info('[Event] ' + eventName + ': ' + row.model.name);
    };

    // Event handler
    var logTimespanEvent = function(eventName, timespan) {
        $log.info('[Event] ' + eventName + ': ' + timespan.model.name);
    };

    // Event handler
    var logLabelsEvent = function(eventName, width) {
        $log.info('[Event] ' + eventName + ': ' + width);
    };

    // Event handler
    var logColumnsGenerateEvent = function(columns, headers) {
        $log.info('[Event] ' + 'columns.on.generate' + ': ' + columns.length + ' column(s), ' + headers.length + ' header(s)');
    };

    // Event handler
    var logRowsFilterEvent = function(rows, filteredRows) {
        $log.info('[Event] rows.on.filter: ' + filteredRows.length + '/' + rows.length + ' rows displayed.');
    };

    // Event handler
    var logTasksFilterEvent = function(tasks, filteredTasks) {
        $log.info('[Event] tasks.on.filter: ' + filteredTasks.length + '/' + tasks.length + ' tasks displayed.');
    };

    // Event handler
    var logReadyEvent = function() {
        $log.info('[Event] core.on.ready');
    };

    // Event utility function
    var addEventName = function(eventName, func) {
        return function(data) {
            return func(eventName, data);
        };
    };

}]);
