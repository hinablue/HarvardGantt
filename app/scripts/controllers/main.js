'use strict';

/**
 * @ngdoc function
 * @name HarvardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the HarvardApp
 */
angular.module('HarvardApp').controller('MainCtrl', ['$scope', '$element', '$http', '$timeout', '$log', '$modal', '$alert', 'ganttUtils', 'GanttObjectModel', 'Coloured', 'Harvard', 'Matt', 'ganttMouseOffset', 'ganttDebounce', 'moment', function($scope, $element, $http, $timeout, $log, $modal, $alert, utils, ObjectModel, Coloured, Harvard, Matt, mouseOffset, debounce, moment) {
    var objectModel;
    var dataToRemove;
    var taskTemplate = {
        name: 'Drawn task',
        color: '#AA8833',
        from: null,
        to: null,
        id: 0,
        oid: 0,
        textColor: Coloured.isDarkColoured('#AA8833') ? '#ffffff' : '#000000',
        operationCode: '',
        processingType: 'GANG',
        quantity: 0,
        group: '',
        isNew: true,
        isDelete: false,
        isFinish: false,
        isPin: false,
        inProcessing: false,
        factoryOperation: '',
        job: {},
        process: {},
        movable: {
            enabled: true,
            allowMoving: true,
            allowResizing: false,
            allowRowSwitching: false
        },
        data: {
            previousOperations: [],
            nextOperations: '',
            runOnMachineId: 0,
            actualRunOnMachineId: 0,
            machineShiftLabel: '',
            parallelCode: '',
            pendingMinutes: 0,
            expectedMoldId: '',
            capacity: 0,
            face: 0,
            priority: 0,
            rounds: 0,
            up: 0,
            sheetUp: 0,
            part: 0,
            s2sMins: -1,
            timeclockEmployeeId: '',
            expectedStartTime: null,
            expectedSetupFinishTime: null,
            expectedFinishTime: null,
            actualStartTime: null,
            actualSetupFinishTime: null,
            actualFinishTime: null,
            actualQuantity: null,
            UI2: []
        }
    };
    var editTaskTemplate = {
        id: 0,
        rowId: 0,
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
        expectedStartTime: moment().format('YYYY/MM/DD HH:mm'),
        expectedSetupFinishTime: null,
        expectedFinishTime: null,
        quantity: 0,
        actualStartTime: null,
        actualSetupFinishTime: null,
        actualFinishTime: null,
        actualQuantity: null,
        previousTask: 0,
        nextTask: 0,
        modifyType: 'create',
        drawTask: false,
        modal: undefined
    };
    var editTaskModalOptions = {
        scope: $scope,
        title: 'Task Creator',
        template: 'views/editor.tpl.html',
        backdrop: false,
        show: true
    };

    $scope.tasksMap = {};
    $scope.processesMap = {};
    $scope.departmentsMap = {};
    $scope.jobsMap = {};
    $scope.machinesMap = {};

    $scope.departmentMenu = ['Select'];
    $scope.subDepartmentMenu = ['Select'];
    $scope.departmentMenuDefault = 'Select';
    $scope.subDepartmentMenuDefault = 'Select';
    $scope.pagination = [1];
    $scope.currentPage = 1;

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
        labelsEnabled: true,
        sideWidth: 200,
        allowSideResizing: true,
        currentDate: 'line',
        currentDateValue: moment(),
        draw: false,
        readOnly: false,
        filterTask: '',
        filterRow: '',
        filterRowComparator: function(actual, expected) {
            if (expected === '' || true === new RegExp(expected, 'i').test(actual.name) || true === new RegExp(expected, 'i').test(actual.subDept)) {
                return true;
            }
            return false;
        },
        timeFrames: {
            'day': {
                start: moment('8:00', 'HH:mm'),
                end: moment('20:00', 'HH:mm'),
                working: true,
                default: true
            },
            'noon': {
                start: moment('12:00', 'HH:mm'),
                end: moment('13:30', 'HH:mm'),
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
            var task = taskTemplate;
            task.id = utils.randomUuid();
            task.oid = task.id;

            if (false === ('t'+task.id in $scope.tasksMap)) {
                $scope.tasksMap['t'+task.id] = task;
            }
            return task;
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
                    // api.tasks.on.move($scope, addEventName('tasks.on.move', logTaskEvent));
                    api.tasks.on.moveEnd($scope, addEventName('tasks.on.moveEnd', logTaskEvent));

                    api.tasks.on.resizeBegin($scope, addEventName('tasks.on.resizeBegin', logTaskEvent));
                    // api.tasks.on.resize($scope, addEventName('tasks.on.resize', logTaskEvent));
                    api.tasks.on.resizeEnd($scope, addEventName('tasks.on.resizeEnd', logTaskEvent));
                }

                api.rows.on.add($scope, addEventName('rows.on.add', logRowEvent));
                api.rows.on.change($scope, addEventName('rows.on.change', logRowEvent));
                api.rows.on.move($scope, addEventName('rows.on.move', logRowEvent));
                api.rows.on.remove($scope, addEventName('rows.on.remove', logRowEvent));

                // api.side.on.resizeBegin($scope, addEventName('labels.on.resizeBegin', logLabelsEvent));
                // api.side.on.resize($scope, addEventName('labels.on.resize', logLabelsEvent));
                // api.side.on.resizeEnd($scope, addEventName('labels.on.resizeEnd', logLabelsEvent));

                api.timespans.on.add($scope, addEventName('timespans.on.add', logTimespanEvent));
                api.columns.on.generate($scope, logColumnsGenerateEvent);

                api.rows.on.filter($scope, logRowsFilterEvent);
                api.tasks.on.filter($scope, logTasksFilterEvent);

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
                        // element.bind('mousedown touchstart', function(event) {
                        //     event.stopPropagation();
                        //     $scope.live.row = directiveScope.row.model;
                        //     $scope.$digest();
                        // });
                    } else if (directiveName === 'ganttRowLabel') {
                        var i, l, t;

                        directiveScope.multipleTasks = [];
                        directiveScope.multipleTasksToggle = function(id) {
                            var _multipleTasks = [];
                            if (directiveScope.multipleTasks.indexOf(id) >= 0) {
                                for(var i = 0, mt = directiveScope.multipleTasks, l = mt.length; i < l; i += 1) {
                                    if (mt[i] === id) {
                                        continue;
                                    }
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
                                var _dropTarget = directiveScope.row.tasks[event.dest.index].model, _sortedTasks = [], _shiftDuring = 60 * 1000;
                                if (directiveScope.multipleTasks.length > 0 && directiveScope.multipleTasks.indexOf(_dropTarget.id) > -1) {
                                    for (i = 0, t = directiveScope.multipleTasks, l = t.length; i < l; i += 1) {
                                        _sortedTasks.push(directiveScope.row.tasksMap[t[i]].model);
                                    }
                                    _sortedTasks.sort(function(a, b) { return a.from - b.from; });
                                    if (target === 0) {
                                        _shiftDuring += Math.abs(_dropTarget.to - directiveScope.row.tasks[1].model.from);
                                    } else {
                                        _shiftDuring += Math.abs(directiveScope.row.tasks[(target - 1)].model.to - _dropTarget.from);
                                    }
                                    _shiftDuring = _shiftDuring / 60 / 1000 * (event.dest.index > event.source.index ? 1 : -1);
                                    for (i = 0, t = directiveScope.row.tasks, l = t.length; i < l; i += 1) {
                                        if (directiveScope.multipleTasks.indexOf(t[i].model.id) > -1 && Math.abs(_shiftDuring) > 0) {
                                            t[i].model.from = t[i].model.from.clone().add(_shiftDuring, 'm');
                                            t[i].model.to = t[i].model.to.clone().add(_shiftDuring, 'm');
                                            t[i].model.data.expectedSetupFinishTime = t[i].model.data.expectedSetupFinishTime.clone().add(_shiftDuring, 'm');
                                        }
                                    }
                                    directiveScope.row.tasks.sort(function(a, b) { return a.model.from - b.model.from; });
                                    target = 0;
                                }

                                for (i = target, t = directiveScope.row.tasks, l = t.length; i < l; i += 1) {
                                    if (t[i].model.id === _dropTarget.id || i === target) {
                                        continue;
                                    }
                                    if (t[i].model.from < t[(i-1)].model.to) {
                                        var during = t[i].model.to.clone() - t[i].model.from.clone(),
                                            setupDuring = t[i].model.data.expectedSetupFinishTime.clone() - t[i].model.from.clone();

                                        t[i].model.from = t[(i-1)].model.to.clone().add(1, 'm');
                                        t[i].model.to = t[i].model.from.clone().add(during, 'ms');
                                        t[i].model.data.expectedSetupFinishTime = t[i].model.from.clone().add(setupDuring, 'ms');
                                    }
                                }
                                directiveScope.row.tasks.sort(function(a, b) { return a.model.from - b.model.from; });
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

    $scope.$watch('departmentMenuDefault', function(newValue, oldValue) {
        $scope.subDepartmentMenu = ['Select'];
        $scope.subDepartmentMenuDefault = 'Select';
        $scope.currentPage = 1;

        if (false === angular.equals(newValue, oldValue)) {
            if (newValue !== 'Select') {
                $scope.options.filterRow = newValue;

                if (Object.keys($scope.departmentsMap[newValue.replace(/ /gi, '-')].sub).length > 0) {
                    for(var x in $scope.departmentsMap[newValue.replace(/ /gi, '-')].sub) {
                        $scope.subDepartmentMenu.push($scope.departmentsMap[newValue.replace(/ /gi, '-')].sub[x].name);
                    }
                }
            } else {
                $scope.options.filterRow = '-Page 00001';
            }
        }
    });
    $scope.$watch('subDepartmentMenuDefault', function(newValue, oldValue) {
        $scope.currentPage = 1;
        if (newValue !== 'Select' && false === angular.equals(newValue, oldValue)) {
            $scope.options.filterRow = newValue;
        }
    });

    $scope.paginationFilter = function(page, direction) {
        page = parseInt(page, 10);
        direction = parseInt(direction, 10);

        if (page === 0) {
            if (direction === 1) {
                if ($scope.currentPage < $scope.pagination.length) {
                    $scope.currentPage++;

                    $scope.options.filterRow = '-Page ' + ('00000' + $scope.currentPage.toString()).substr(-5);
                }
            } else {
                if ($scope.currentPage > 1) {
                    $scope.currentPage--;

                    $scope.options.filterRow = '-Page ' + ('00000' + $scope.currentPage.toString()).substr(-5);
                }
            }
        } else {
            if ($scope.currentPage !== page) {
                $scope.currentPage = page;
                $scope.options.filterRow = '-Page ' + ('00000' + $scope.currentPage.toString()).substr(-5);
            }
        }
    };
    $scope.closeTaskEditor = function() {
        if ($scope.editTask !== undefined) {
            if ($scope.editTask.modifyType === 'create') {
                if ('t'+$scope.editTask.id in $scope.tasksMap) {
                    delete $scope.tasksMap['t'+$scope.editTask.id];
                }
                if ($scope.editTask.drawTask === true) {
                    var rowIndex = (function($scope) {
                        for (var i = 0, l = $scope.data.length; i < l; i++) {
                            if ($scope.data[i].id === $scope.editTask.runOnMachineId) {
                                return i;
                            }
                        }
                        return false;
                    })($scope);
                    objectModel.api.gantt.rowsManager.rows[rowIndex].removeTask($scope.editTask.id, false, true);
                }
            }
            $scope.editTask.modal.hide();
        }
    };

    $scope.checkTaskData = function() {
        if ($scope.editTask !== undefined) {
            var result = Matt.addTaskData($scope.editTask), task;
            if (result.state === 'ok') {
                task = taskTemplate;
                task.id = $scope.editTask.id;
                task.name = $scope.editTask.operationCode;
                task.from = typeof($scope.editTask.expectedStartTime) === 'object' ? moment((new Date($scope.editTask.expectedStartTime)).getTime(), 'x') : moment($scope.editTask.expectedStartTime, 'YYYY-MM-DDTHH:mm:ssZ');
                task.to = typeof($scope.editTask.expectedFinishTime) === 'object' ? moment((new Date($scope.editTask.expectedFinishTime)).getTime(), 'x') : moment($scope.editTask.expectedFinishTime, 'YYYY-MM-DDTHH:mm:ssZ');
                task.operationCode = $scope.editTask.operationCode;
                task.processingType = $scope.editTask.processingType;
                task.quantity = $scope.editTask.quantity;
                task.isNew = true;
                task.isDelete = false;
                task.isFinish = $scope.editTask.isFinish;
                task.isPin = $scope.editTask.isPin;
                task.inProcessing = $scope.editTask.inProcessing;
                task.data = {
                    previousOperations: [$scope.editTask.previousTask],
                    nextOperations: $scope.editTask.nextTask,
                    runOnMachineId: $scope.editTask.runOnMachineId,
                    actualRunOnMachineId: $scope.editTask.actualRunOnMachineId,
                    machineShiftLabel: $scope.editTask.machineShiftLabel,
                    parallelCode: $scope.editTask.parallelCode,
                    pendingMinutes: $scope.editTask.pendingMinutes,
                    expectedMoldId: $scope.editTask.expectedMoldId,
                    capacity: $scope.editTask.capacity,
                    face: $scope.editTask.face,
                    priority: $scope.editTask.priority,
                    rounds: $scope.editTask.rounds,
                    up: $scope.editTask.up,
                    sheetUp: $scope.editTask.sheetUp,
                    part: $scope.editTask.part,
                    s2sMins: $scope.editTask.s2sMins,
                    timeclockEmployeeId: $scope.editTask.timeclockEmployeeId,
                    expectedStartTime: typeof($scope.editTask.expectedStartTime) === 'object' ? moment((new Date($scope.editTask.expectedStartTime)).getTime(), 'x') : moment($scope.editTask.expectedStartTime, 'YYYY-MM-DDTHH:mm:ssZ'),
                    expectedSetupFinishTime: typeof($scope.editTask.expectedSetupFinishTime) === 'object' ? moment((new Date($scope.editTask.expectedSetupFinishTime)).getTime(), 'x') : moment($scope.editTask.expectedSetupFinishTime, 'YYYY-MM-DDTHH:mm:ssZ'),
                    expectedFinishTime: typeof($scope.editTask.expectedFinishTime) === 'object' ? moment((new Date($scope.editTask.expectedFinishTime)).getTime(), 'x') : moment($scope.editTask.expectedFinishTime, 'YYYY-MM-DDTHH:mm:ssZ'),
                    actualStartTime: typeof($scope.editTask.actualStartTime) === 'object' ? moment((new Date($scope.editTask.actualStartTime)).getTime(), 'x') : moment($scope.editTask.actualStartTime, 'YYYY-MM-DDTHH:mm:ssZ'),
                    actualSetupFinishTime: typeof($scope.editTask.actualSetupFinishTime) === 'object' ? (new Date($scope.editTask.actualSetupFinishTime)).getTime(), 'x') : moment($scope.editTask.actualSetupFinishTime, 'YYYY-MM-DDTHH:mm:ssZ'),
                    actualFinishTime: typeof($scope.editTask.actualFinishTime) === 'object' ? moment((new Date($scope.editTask.actualFinishTime)).getTime(), 'x') : moment($scope.editTask.actualFinishTime, 'YYYY-MM-DDTHH:mm:ssZ'),
                    actualQuantity: $scope.editTask.actualQuantity,
                    UI2: []
                };
                $log.info(task, $scope.editTask);
                $scope.tasksMap['t'+$scope.editTask.id] = task;

                if ($scope.editTask.drawTask === false) {
                    var rowIndex = (function($scope) {
                        for (var i = 0, l = $scope.data.length; i < l; i++) {
                            if ($scope.data[i].id === $scope.editTask.runOnMachineId) {
                                return i;
                            }
                        }
                        return false;
                    })($scope);
                    $scope.data[rowIndex].tasks.push(task);
                    // objectModel.api.gantt.rowsManager.rows[rowIndex].addTask(task, false);
                }

                $alert({
                    title: 'Success!',
                    content: 'The task save success.',
                    placement: 'top',
                    type: 'info',
                    duration: 3,
                    dismissable: false,
                    container: '#gantt-editor-alert',
                    show: true
                });
                // $scope.editTask.modal.hide();
            } else {

            }
        }
    };

    $scope.saveGanttData = function() {
        var mattCallback = Matt.saveOrCalcGanttData(), rawData = {}, isSave = false;

        $http({
            method: 'post',
            responseType: 'json',
            url: $scope.configuration.serverLocation + $scope.configuration.confirmGanttUrl,
            timeout: $scope.configuration.getGanttDataTimeout * 1000,
            data: rawData,
            params: {
                calculate: true,
                calculateFrom: 0,// moment($scope.gantt.getFirstColumn().date).format(dateFormat),  // Gantt start time
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
                    dismissable: false,
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
                dismissable: false,
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
        $scope.departmentsMap = {};
        $scope.jobsMap = {};
        $scope.machinesMap = {};

        for(i = 0, m = originalData.machines, l = m.length; i < l; i++) {
            // if (m[i].operationQueue.length === 0) continue;

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

            if (('m'+m[i].machine.id in $scope.machinesMap) === false) {
                $scope.machinesMap['m'+m[i].machine.id] = obj;
            }

            // Prepare department data
            if ((obj.dept.name.replace(/ /gi, '-') in $scope.departmentsMap) === false) {
                $scope.departmentsMap[obj.dept.name.replace(/ /gi, '-')] = {
                    id: obj.dept.id,
                    name: obj.dept.name,
                    order: obj.dept.sortBy,
                    sub: {}
                };
                $scope.departmentMenu.push(obj.dept.name);
            }
            if (obj.dept.subDept !== '' && (obj.dept.subDept.replace(/ /gi, '-') in $scope.departmentsMap[obj.dept.name.replace(/ /gi, '-')].sub) === false) {
                $scope.departmentsMap[obj.dept.name.replace(/ /gi, '-')].sub[obj.dept.subDept.replace(/ /gi, '-')] = {
                    id: obj.dept.id,
                    name: obj.dept.subDept,
                    order: obj.dept.sortBy
                };
            }

            if (m[i].operationQueue.length > 0) {
                for(j = 0, t = m[i].operationQueue, q = t.length; j < q; j++) {
                    // Prepare and cleanup the task data.
                    task = {
                        name: t[j].operationCode,
                        color: t[j].color,
                        from: moment(t[j].expectedStartTime, 'YYYY-MM-DDTHH:mm:ssZ'),
                        to: moment(t[j].expectedFinishTime, 'YYYY-MM-DDTHH:mm:ssZ'),
                        id: t[j].id,
                        oid: t[j].oid,
                        textColor: Coloured.isDarkColoured(t[j].color) ? '#ffffff' : '#000000',
                        operationCode: t[j].operationCode,
                        processingType: t[j].processingType,
                        quantity: t[j].quantity,
                        group: t[j].taskGroup,
                        isNew: false,
                        isDelete: t[j].delete,
                        isFinish: t[j].finished,
                        isPin: t[j].pin,
                        inProcessing: t[j].inProcessing,
                        factoryOperation: t[j].factoryOperation,
                        job: t[j].job,
                        process: t[j].process,
                        movable: taskTemplate.movable,
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
                            expectedStartTime: moment(t[j].expectedStartTime, 'YYYY-MM-DDTHH:mm:ssZ'),
                            expectedSetupFinishTime: moment(t[j].expectedSetupFinishTime, 'YYYY-MM-DDTHH:mm:ssZ'),
                            expectedFinishTime: moment(t[j].expectedFinishTime, 'YYYY-MM-DDTHH:mm:ssZ'),
                            actualStartTime: (t[j].actualStartTime === null) ? null : moment(t[j].actualStartTime, 'YYYY-MM-DDTHH:mm:ssZ'),
                            actualSetupFinishTime: (t[j].actualSetupFinishTime === null) ? null : moment(t[j].actualSetupFinishTime, 'YYYY-MM-DDTHH:mm:ssZ'),
                            actualFinishTime: (t[j].actualFinishTime === null) ? null : moment(t[j].actualFinishTime, 'YYYY-MM-DDTHH:mm:ssZ'),
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
        // Pagination the machines
        q = Object.keys($scope.machinesMap).sort(function(a, b) { return $scope.machinesMap[a].id - $scope.machinesMap[b].id; });
        p = 1;
        for(i = 0, l = q.length; i < l; i++) {
            if (i > 0 && i % 6 === 0) {
                p++;
                $scope.pagination.push(p);
            }
            $scope.machinesMap[q[i]].dept.name += '-Page ' + ('00000' + p.toString()).substr(-5);
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

        $scope.options.filterRow = '-Page ' + '00001';
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
                    dismissable: false,
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
                dismissable: false,
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
    var logTaskEvent = function(eventName, data) {
        var key;

        $log.info(data);

        if (eventName === 'tasks.on.resizeEnd' && data.model.data.expectedStartTime === null) {
            $scope.editTask = editTaskTemplate;
            $scope.editTask.id = data.model.id;
            $scope.editTask.rowId = data.row.model.id;
            $scope.editTask.runOnMachineId = data.row.model.id;
            $scope.editTask.modifyType = 'create';
            $scope.editTask.drawTask = true;
            $scope.editTask.modal = $modal(editTaskModalOptions);
        }

        if (data.type !== undefined) {
            switch(data.type) {
                case 'edit':
                    // Calculate the expected setup finish datetime.
                    var _setupFinishTime = moment(data.task.model.data.expectedSetupFinishTime) + (data.task.model.from - moment(data.task.model.data.expectedStartTime));
                    _setupFinishTime = moment(_setupFinishTime).format('YYYY/MM/DD HH:mm');

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
                        nextTask: 0,
                        modifyType: data.type,
                        drawTask: false,
                        modal: undefined
                    };
                    $scope.editTask.modal = $modal(editTaskModalOptions);
                break;
                case 'create':
                    $scope.editTask = editTaskTemplate;
                    $scope.editTask.id = utils.randomUuid();
                    $scope.editTask.rowId = data.task.id;
                    $scope.editTask.runOnMachineId = data.task.id;
                    $scope.editTask.modifyType = data.type;
                    $scope.editTask.modal = $modal(editTaskModalOptions);
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
    var logRowEvent = function(eventName, data) {
        var key;

        if (data.type !== undefined) {
            switch(data.type) {
                case 'create':
                    $log.info(data);
                    $scope.editTask = editTaskTemplate;
                    $scope.editTask.id = utils.randomUuid();
                    $scope.editTask.rowId = data.row.model.id;
                    $scope.editTask.runOnMachineId = data.row.model.id;
                    $scope.editTask.modifyType = data.type;
                    $scope.editTask.modal = $modal(editTaskModalOptions);
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
    var logTimespanEvent = function(eventName, timespan) {
        // $log.info('[Event] ' + eventName + ': ' + timespan.model.name);
    };

    // Event handler
    var logLabelsEvent = function(eventName, width) {
        // $log.info('[Event] ' + eventName + ': ' + width);
    };

    // Event handler
    var logScrollEvent = function(left, date, direction) {
        // Clean up the date range
        $scope.options.fromDate = undefined;

        // if (date !== undefined) {
        //     $log.info('[Event] api.on.scroll: ' + left + ', ' + (date === undefined ? 'undefined' : date.format()));
        // }
    };

    // Event handler
    var logColumnsGenerateEvent = function(columns, headers) {
        // Regenerate the columns for fill full gantt table
        var splittedViewScale = $scope.options.scale.split(' '), viewScaleUnit, from, to;
        if (splittedViewScale && splittedViewScale.length > 1) {
            viewScaleUnit = splittedViewScale[splittedViewScale.length - 1];
        } else {
            viewScaleUnit = $scope.options.scale;
        }
        from = moment($scope.api.gantt.columnsManager.getLastColumn().date.format(), 'YYYY-MM-DDTHH:mm:ssZ');

        if ($scope.api.gantt.width + $scope.api.gantt.scroll.getBordersWidth() < $element[0].offsetWidth) {
            if (['minute', 'minutes', 'hour', 'hours'].indexOf(viewScaleUnit) > -1) {
                to = from.clone().add(1, 'h');
            } else if (['day', 'week', 'weeks'].indexOf(viewScaleUnit) > -1) {
                to = from.clone().add(1, 'M');
            } else if (['month', 'months', 'quarter', 'year'].indexOf(viewScaleUnit) > -1) {
                to = from.clone().add(1, 'Q');
            }
            $scope.api.gantt.columnsManager.generateColumns(from, to);
        }
    };

    // Event handler
    var logRowsFilterEvent = function(rows, filteredRows) {
        $log.info('[Event] rows.on.filter: ' + filteredRows.length + '/' + rows.length + ' rows displayed.');
    };

    // Event handler
    var logTasksFilterEvent = function(tasks, filteredTasks) {
        // $log.info('[Event] tasks.on.filter: ' + filteredTasks.length + '/' + tasks.length + ' tasks displayed.');
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
