'use strict';

/**
 * @ngdoc function
 * @name HarvardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the HarvardApp
 */
angular.module('HarvardApp')
.controller('MainCtrl', ['$scope', '$document', '$compile', '$element', '$http', '$timeout', '$log', '$modal', '$alert', '$dropdown', 'ganttUtils', 'GanttObjectModel', 'Coloured', 'Harvard', 'Matt', 'TaskEditor', 'ganttMouseOffset', 'ganttDebounce', 'moment', function($scope, $document, $compile, $element, $http, $timeout, $log, $modal, $alert, $dropdown, utils, ObjectModel, Coloured, Harvard, Matt, TaskEditor, mouseOffset, debounce, moment) {
    var objectModel;
    var dataToRemove;
    var editTaskModalOptions = TaskEditor.editTaskModalOptions;
    var multipleTaskSelected = [];
    editTaskModalOptions.scope = $scope;

    $scope.editTask = TaskEditor.editTaskTemplate;

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
        scale: '3 hours',
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
            // 'day': {
            //     start: moment('8:00', 'HH:mm'),
            //     end: moment('20:00', 'HH:mm'),
            //     working: true,
            //     default: true
            // },
            // 'noon': {
            //     start: moment('12:00', 'HH:mm'),
            //     end: moment('13:30', 'HH:mm'),
            //     working: false,
            //     default: true
            // },
            'weekend': {
                working: false
            }
            // 'holiday': {
            //     working: false,
            //     color: 'red',
            //     classes: ['gantt-timeframe-holiday']
            // }
        },
        dateFrames: {
            'weekend': {
                evaluator: function(date) {
                    return date.isoWeekday() === 6 || date.isoWeekday() === 7;
                },
                targets: ['weekend']
            }
            // ,
            // '11-november': {
            //     evaluator: function(date) {
            //         return date.month() === 10 && date.date() === 11;
            //     },
            //     targets: ['holiday']
            // }
        },
        timeFramesNonWorkingMode: 'visible',
        columnMagnet: '1 minutes',
        drawTaskFactory: function() {
            var task = TaskEditor.taskTemplate;
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
                    api.tasks.on.moveBegin($scope, addEventName('tasks.on.moveBegin', moveTaskBeginEvent));
                    // api.tasks.on.move($scope, addEventName('tasks.on.move', logTaskEvent));
                    api.tasks.on.moveEnd($scope, addEventName('tasks.on.moveEnd', moveTaskEndEvent));

                    // api.tasks.on.resizeBegin($scope, addEventName('tasks.on.resizeBegin', logTaskEvent));
                    // api.tasks.on.resize($scope, addEventName('tasks.on.resize', logTaskEvent));
                    api.tasks.on.resizeEnd($scope, addEventName('tasks.on.resizeEnd', drawResizeEndEvent));
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
                        // Add the highlight box-shadow.
                        var highlightScope = directiveScope.$new();
                        var ifElement = $document[0].createElement('div');
                        angular.element(ifElement).attr('class', 'gantt-task gantt-task-highlight').attr('data-ng-if', 'task.model.highlight');
                        element.append($compile(ifElement)(highlightScope));

                        element.bind('click', function(evt) {
                            if (evt.shiftKey === true) {
                                multipleTaskSelected.push(directiveScope.task);
                            } else {
                                multipleTaskSelected = [];
                            }
                            $log.info(multipleTaskSelected);
                            directiveScope.task.model.highlight = !directiveScope.task.model.highlight;
                            $scope.$digest();
                        });

                        // element.bind('mousedown touchstart', function(event) {
                        //     event.stopPropagation();
                        //     $scope.live.row = directiveScope.task.row.model;
                        //     if (directiveScope.task.originalModel !== undefined) {
                        //         $scope.live.task = directiveScope.task.originalModel;
                        //     } else {
                        //         $scope.live.task = directiveScope.task.model;
                        //     }
                        //     $scope.$digest();
                        // });
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
                            width: (directiveScope.row.model.title.length * 10 + 33) + 'em'
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
                                            t[i].model.expectedSetupFinishTime = t[i].model.expectedSetupFinishTime.clone().add(_shiftDuring, 'm');
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
                                            setupDuring = t[i].model.expectedSetupFinishTime.clone() - t[i].model.from.clone();

                                        t[i].model.from = t[(i-1)].model.to.clone().add(1, 'm');
                                        t[i].model.to = t[i].model.from.clone().add(during, 'ms');
                                        t[i].model.expectedSetupFinishTime = t[i].model.from.clone().add(setupDuring, 'ms');
                                    }
                                }
                                directiveScope.row.tasks.sort(function(a, b) { return a.model.from - b.model.from; });
                            }
                        };
                        directiveScope.tasksOnMachine = $modal({
                            scope: directiveScope,
                            title: 'Machine',
                            template: $scope.configuration.serverLocation + $scope.configuration.viewsFolder + '/machine.tpl.html',
                            backdrop: false,
                            placement: 'center',
                            show: false
                        });
                        element.bind('dblclick', function() {
                            directiveScope.tasksOnMachine.$promise.then(directiveScope.tasksOnMachine.show);
                        });
                    }
                });

                // api.tasks.on.rowChange($scope, function(task) {
                //     $scope.live.row = task.row.model;
                // });

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
    var editTaskHandleError = function(response) {
        var errorMessages = 'Something error from server.';
        if (response.data !== null) {
            if (response.data.messagesEmpty !== true) {
                errorMessages = response.data.messages.join('<br>');
            }
        }

        $alert({
            title: 'Error!<br>',
            content: errorMessages,
            placement: 'top',
            type: 'info',
            duration: 3,
            dismissable: false,
            html: true,
            container: '#gantt-editor-alert',
            show: true
        });
        var i, k, l, _clickFunc;
        switch(response.config.data) {
            case 'poFuzzySearch':
                $scope.editTask.poFuzzySearch = [];
                var _poNo = [];
                _clickFunc = function(poNo) {
                    return function(poNo) {
                        $scope.editTask.poNo = poNo;
                        $scope.editTask.fuzzyPoNo = poNo;
                    }.bind(this, poNo);
                };
                for (i = 0, k = Object.keys($scope.jobsMap), l = k.length; i < l; i++) {
                    if (_poNo.indexOf($scope.jobsMap[k[i]].poNo) < 0) {
                        $scope.editTask.poFuzzySearch.push({
                            text: $scope.jobsMap[k[i]].poNo,
                            click: _clickFunc.call(null, $scope.jobsMap[k[i]].poNo)
                        });
                        _poNo.push($scope.jobsMap[k[i]].poNo);
                    }
                }
            break;
            case 'getPoUrl':
                $scope.editTask.poId = $scope.editTask.poNo;
            break;
            case 'getComboUrl':
                $scope.editTask.comboList = [];
                _clickFunc = function(comboId) {
                    return function(comboId) {
                        $scope.editTask.comboId = comboId;
                    }.bind(this, comboId);
                };
                for (i = 0, k = Object.keys($scope.jobsMap), l = k.length; i < l; ++i) {
                    if ($scope.jobsMap[k[i]].poNo === $scope.editTask.poNo) {
                        $scope.editTask.comboList.push({
                            text: $scope.jobsMap[k[i]].comboId,
                            click: _clickFunc.call(null, $scope.jobsMap[k[i]].comboId)
                        });
                        $scope.editTask.job = $scope.jobsMap[k[i]];
                        break;
                    }
                }
            break;
            case 'getProductUrl':
                $scope.editTask.productList = [];
                var _productId = [];
                _clickFunc = function(productId) {
                    return function(comboId) {
                        $scope.editTask.productId = productId;
                    }.bind(this, productId);
                };
                for (i = 0, k = Object.keys($scope.processesMap), l = k.length; i < l; ++i) {
                    if (_productId.indexOf($scope.processesMap[k[i]].productId) < 0) {
                        $scope.editTask.productList.push({
                            text: $scope.processesMap[k[i]].productId,
                            click: _clickFunc.call(null, $scope.processesMap[k[i]].productId)
                        });
                        _productId.push($scope.processesMap[k[i]].productId);
                    }
                }
            break;
            case 'getProcessUrl':
                $scope.editTask.processList = [];
                var _processId = [];
                _clickFunc = function(processId) {
                    return function(processId) {
                        $scope.editTask.processId = processId;
                    }.bind(this, processId);
                };
                for (i = 0, k = Object.keys($scope.processesMap), l = k.length; i < l; ++i) {
                    if ($scope.processesMap[k[i]].productId === $scope.editTask.productId) {
                        $scope.editTask.processList.push({
                            text: $scope.processesMap[k[i]].id,
                            click: _clickFunc.call(null, $scope.processesMap[k[i]].id)
                        });
                        break;
                    }
                }
            break;
        }
    };
    var editTaskHandleSuccess = function(response) {
        $log.info(response);
        var responseType = response.headers('Content-Type').replace(/;(.*)$/gi, '');
        if (responseType === 'application/json' && response.data !== null) {
            if (response.data.messagesEmpty === true) {
                var _clickFunc;
                switch(response.config.data) {
                    case 'poFuzzySearch':
                        $scope.editTask.poFuzzySearch = [];
                        var _poNo = [];
                        _clickFunc = function(poNo) {
                            return function(poNo) {
                                $scope.editTask.poNo = poNo;
                                $scope.editTask.fuzzyPoNo = poNo;
                            }.bind(this, poNo);
                        };
                        for (i = 0, k = response.data.data, l = k.length; i < l; i++) {
                            if (_poNo.indexOf(k[i].value) < 0) {
                                $scope.editTask.poFuzzySearch.push({
                                    text: k[i].label,
                                    click: _clickFunc.call(null, k[i].value)
                                });
                                _poNo.push(k[i]);
                            }
                        }
                    break;
                    case 'getPoUrl':
                        $scope.editTask.poId = response.data.data.id;
                    break;
                    case 'getComboUrl':
                        $scope.editTask.comboList = response.data.data;
                        for (i = 0, k = Object.keys($scope.jobsMap), l = k.length; i < l; ++i) {
                            if ($scope.jobsMap[k[i]].poNo === $scope.editTask.poNo) {
                                $scope.editTask.job = $scope.jobsMap[k[i]];
                                break;
                            }
                        }
                    break;
                    case 'getProductUrl':
                        $scope.editTask.productList = response.data.data;
                    break;
                    case 'getProcessUrl':
                        $scope.editTask.processList = response.data.data;
                    break;
                    case 'getProductInfoUrl':
                        $scope.editTask.comboList = [];
                        $scope.editTask.comboList.push({
                            text: response.data.data.comboId,
                            click: function(comboId) {
                                this.editTask.comboId = comboId;
                            }.bind($scope, response.data.data.comboId)
                        });
                        $scope.editTask.productList = [];
                        $scope.editTask.processList.push({
                            text: response.data.data.productId,
                            click: function(id) {
                                this.editTask.productId = id;
                            }.bind($scope, response.data.data.productId)
                        });
                        $scope.editTask.comboId = response.data.data.comboId;
                        $scope.editTask.productId = response.data.data.productId;
                        $scope.editTask.poNo = response.data.data.poNo;
                        $scope.editTask.poId = response.data.data.poNo;
                    break;
                    default:
                        $alert({
                            title: 'Error!<br>',
                            content: 'Server JSON Data error.',
                            placement: 'top',
                            type: 'info',
                            duration: 3,
                            dismissable: false,
                            html: true,
                            container: '#gantt-editor-alert',
                            show: true
                        });
                }
            } else {
                editTaskHandleError(response);
            }
        } else {
            editTaskHandleError(response);
        }
    };
    $scope.$watch('editTask.poNo', function(newValue, oldValue) {
        if (newValue !== undefined && !angular.equals(newValue, oldValue)) {
            $timeout(function() {
                var result = ($http({
                    method: 'get',
                    responseType: 'json',
                    url: $scope.configuration.serverLocation + $scope.configuration.poFuzzySearch.replace('#poNo#', newValue),
                    data: 'poFuzzySearch'
                })).then(editTaskHandleSuccess, editTaskHandleError);
            }, 300);
        }
    });
    $scope.$watch('editTask.fuzzyPoNo', function(newValue, oldValue) {
        if (newValue !== undefined && !angular.equals(newValue, oldValue)) {
            $timeout(function() {
                var result = ($http({
                    method: 'get',
                    responseType: 'json',
                    url: $scope.configuration.serverLocation + $scope.configuration.getPoUrl.replace('#poNo#', newValue),
                    data: 'getPoUrl'
                })).then(editTaskHandleSuccess, editTaskHandleError);
            }, 300);
        }
    });
    $scope.$watch('editTask.poId', function(newValue, oldValue) {
        if (newValue !== undefined && !angular.equals(newValue, oldValue)) {
            $timeout(function() {
                var result = ($http({
                    method: 'get',
                    responseType: 'json',
                    url: $scope.configuration.serverLocation + $scope.configuration.getComboUrl.replace('#poId#', newValue),
                    data: 'getComboUrl'
                })).then(editTaskHandleSuccess, editTaskHandleError);
            }, 300);
        }
    });
    $scope.$watch('editTask.comboId', function(newValue, oldValue) {
        if (newValue !== undefined && !angular.equals(newValue, oldValue)) {
            $timeout(function() {
                var result = ($http({
                    method: 'get',
                    responseType: 'json',
                    url: $scope.configuration.serverLocation + $scope.configuration.getProductUrl.replace('#comboId#', newValue),
                    data: 'getProductUrl'
                })).then(editTaskHandleSuccess, editTaskHandleError);
            }, 300);
        }
    });
    $scope.$watch('editTask.productId', function(newValue, oldValue) {
        if (newValue !== undefined && !angular.equals(newValue, oldValue)) {
            var rowIndex = (function($scope) {
                for (var i = 0, l = $scope.data.length; i < l; i++) {
                    if ($scope.data[i].id === $scope.editTask.runOnMachineId) {
                        return i;
                    }
                }
                return false;
            })($scope);
            $timeout(function() {
                var result = ($http({
                    method: 'get',
                    responseType: 'json',
                    url: $scope.configuration.serverLocation + $scope.configuration.getProcessUrl.replace('#productId#', newValue),
                    data: 'getProcessUrl',
                    params: {
                        factoryOperationCode: $scope.data[rowIndex].factoryOperation.code
                    }
                })).then(editTaskHandleSuccess, editTaskHandleError);
            }, 300);
        }
    });
    $scope.$watch('editTask.processId', function(newValue, oldValue) {
        $scope.editTask.previousTask = [];
        $scope.editTask.nextTask = [];
        var _task = [], _tasks = [];
        var prevProcesses = function(process) {
            var result = process.operations;
            if (process.previousProcesses.length > 0) {
                for (var i = 0, k = process.previousProcesses, l = k.length; i < l; i++) {
                    if (('p'+k[i]) in $scope.processesMap) {
                        result = result.concat(prevProcesses($scope.processesMap[('p'+k[i])]));
                    }
                }
            }
            return result;
        };
        var nextProcesses = function(process) {
            var result = process.operations;
            if (process.previousProcesses.length > 0) {
                for (var i = 0, k = process.previousProcesses, l = k.length; i < l; i++) {
                    if (('p'+k[i]) in $scope.processesMap) {
                        result = result.concat(nextProcesses($scope.processesMap[('p'+k[i])]));
                    }
                }
            }
            return result;
        };
        if (!angular.equals(newValue, oldValue) && ('p'+newValue) in $scope.processesMap) {
            _tasks = prevProcesses($scope.processesMap[('p'+newValue)]);
            _tasks = _tasks.concat(nextProcesses($scope.processesMap[('p'+newValue)]));
            for (var i = 0, k = _tasks, l = k.length; i < l; i++) {
                if (('t'+k[i]) in $scope.tasksMap && _task.indexOf(k[i]) < 0) {
                    $scope.editTask.previousTask.push({
                        label: $scope.tasksMap[('t'+k[i])].name,
                        value: k[i]
                    });
                    $scope.editTask.nextTask.push({
                        label: $scope.tasksMap[('t'+k[i])].name,
                        value: k[i]
                    });
                    _task.push(k[i]);
                }
            }
        }
    });
    $scope.$watch('editTask.previousTaskId', function(newValue, oldValue) {
        $scope.editTask.nextTask = [];
        var _task = [], _tasks = [];
        var nextProcesses = function(process) {
            var result = process.operations;
            if (process.previousProcesses.length > 0) {
                for (var i = 0, k = process.previousProcesses, l = k.length; i < l; i++) {
                    if (('p'+k[i]) in $scope.processesMap) {
                        result = result.concat(nextProcesses($scope.processesMap[('p'+k[i])]));
                    }
                }
            }
            return result;
        };
        if (!angular.equals(newValue, oldValue) && ('t'+newValue) in $scope.tasksMap) {
            _tasks = nextProcesses($scope.processesMap[('p'+$scope.editTask.processId)]);
            for (var i = 0, k = _tasks, l = k.length; i < l; i++) {
                if (('t'+k[i]) in $scope.tasksMap && ('t'+newValue) in $scope.tasksMap ) {
                    if ($scope.tasksMap[('t'+k[i])].from > $scope.tasksMap[('t'+newValue)].from && k[i] !== newValue && _task.indexOf(k[i]) < 0) {
                        $scope.editTask.nextTask.push({
                            label: $scope.tasksMap[('t'+k[i])].name,
                            value: k[i]
                        });
                        _task.push(k[i]);
                    }
                }
            }
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
        $scope.options.draw = false;
        if ($scope.editTask !== undefined) {
            if ($scope.editTask.modifyType === 'create' && $scope.editTask.check === false) {
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
                task = TaskEditor.taskTemplate;
                task.id = $scope.editTask.id;
                task.oid = $scope.editTask.id;
                task.name = $scope.editTask.operationCode;
                task.from = typeof($scope.editTask.expectedStartTime) === 'object' ? moment((new Date($scope.editTask.expectedStartTime)).getTime(), 'x') : moment($scope.editTask.expectedStartTime, 'YYYY-MM-DDTHH:mm:ssZ');
                task.to = typeof($scope.editTask.expectedFinishTime) === 'object' ? moment((new Date($scope.editTask.expectedFinishTime)).getTime(), 'x') : moment($scope.editTask.expectedFinishTime, 'YYYY-MM-DDTHH:mm:ssZ');
                task.operationCode = $scope.editTask.operationCode;
                task.processingType = $scope.editTask.processingType;
                task.quantity = $scope.editTask.quantity;
                task.new = true;
                task.job = {
                    comboId: $scope.editTask.comboId,
                    comboQuantity: 0,
                    comboType: null,
                    id: 0,
                    poNo: $scope.editTask.poNo
                };
                task.process = {
                    id: $scope.editTask.processId,
                    needWaitPrevProcess: null,
                    operations: [],
                    previousProcesses: [],
                    productId: $scope.editTask.productId
                };
                task.delete = false;
                task.finished = $scope.editTask.isFinish;
                task.pin = $scope.editTask.isPin;
                task.inProcessing = $scope.editTask.inProcessing;
                task.previousOperation = $scope.editTask.previousTask;
                task.nextOperations = [$scope.editTask.nextTask];
                task.runOnMachineId = $scope.editTask.runOnMachineId;
                task.actualRunOnMachineId = $scope.editTask.actualRunOnMachineId;
                task.machineShiftLabel = $scope.editTask.machineShiftLabel;
                task.parallelCode = $scope.editTask.parallelCode;
                task.pendingMinutes = $scope.editTask.pendingMinutes;
                task.expectedMoldId = $scope.editTask.expectedMoldId;
                task.capacity = $scope.editTask.capacity;
                task.face = $scope.editTask.face;
                task.priority = $scope.editTask.priority;
                task.rounds = $scope.editTask.rounds;
                task.up = $scope.editTask.up;
                task.sheetUp = $scope.editTask.sheetUp;
                task.part = $scope.editTask.part;
                task.s2sMins = $scope.editTask.s2sMins;
                task.timeclockEmployeeId = $scope.editTask.timeclockEmployeeId;
                task.expectedStartTime = typeof($scope.editTask.expectedStartTime) === 'object' ? moment((new Date($scope.editTask.expectedStartTime)).getTime(), 'x') : moment($scope.editTask.expectedStartTime, 'YYYY-MM-DDTHH:mm:ssZ');
                task.expectedSetupFinishTime = typeof($scope.editTask.expectedSetupFinishTime) === 'object' ? moment((new Date($scope.editTask.expectedSetupFinishTime)).getTime(), 'x') : moment($scope.editTask.expectedSetupFinishTime, 'YYYY-MM-DDTHH:mm:ssZ');
                task.expectedFinishTime = typeof($scope.editTask.expectedFinishTime) === 'object' ? moment((new Date($scope.editTask.expectedFinishTime)).getTime(), 'x') : moment($scope.editTask.expectedFinishTime, 'YYYY-MM-DDTHH:mm:ssZ');
                task.actualStartTime = typeof($scope.editTask.actualStartTime) === 'object' ? moment((new Date($scope.editTask.actualStartTime)).getTime(), 'x') : moment($scope.editTask.actualStartTime, 'YYYY-MM-DDTHH:mm:ssZ');
                task.actualSetupFinishTime = typeof($scope.editTask.actualSetupFinishTime) === 'object' ? moment((new Date($scope.editTask.actualSetupFinishTime)).getTime(), 'x') : moment($scope.editTask.actualSetupFinishTime, 'YYYY-MM-DDTHH:mm:ssZ');
                task.actualFinishTime = typeof($scope.editTask.actualFinishTime) === 'object' ? moment((new Date($scope.editTask.actualFinishTime)).getTime(), 'x') : moment($scope.editTask.actualFinishTime, 'YYYY-MM-DDTHH:mm:ssZ');
                task.actualQuantity = $scope.editTask.actualQuantity;
                task.tooltip = [];

                $scope.tasksMap['t'+$scope.editTask.id] = task;

                $scope.editTask.check = true;
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
                }

                $alert({
                    title: 'Success!<br>',
                    content: 'The task save success.',
                    placement: 'top',
                    type: 'info',
                    duration: 3,
                    dismissable: false,
                    html: true,
                    container: '#gantt-editor-alert',
                    show: true
                });
                // $scope.editTask.modal.hide();
            } else {

            }
        }
    };

    $scope.saveGanttData = function(type) {
        var mattCallback = Matt.saveOrCalcGanttData(), machine = {}, machines = [], isSave = false;
        for (var i = 0, m = $scope.data, l = m.length; i < l; i++) {
            if (m[i].tasks.length > 0) {
                machine = {
                    machine: {
                        id: m[i].id,
                        settingsMachine: m[i].settingsMachine,
                        factoryOperation: m[i].factoryOperation,
                        title: m[i].title.join('|'),
                        currentTimeWorks: m[i].currentTimeWorks,
                        online: m[i].online
                    },
                    operationQueue: []
                };
                for (var j = 0, t = m[i].tasks, q = t.length; j < q; j++) {
                    machine.operationQueue.push({
                        id: t[j].id,
                        oid: t[j].id,
                        part: t[j].part,
                        operationCode: t[j].operationCode,
                        priority: t[j].priority,
                        job: t[j].job,
                        process: t[j].process,
                        previousOperation: t[j].previousOperation,
                        nextOperations: t[j].nextOperations,
                        runOnMachineId: t[j].runOnMachineId,
                        actualRunOnMachineId: t[j].actualRunOnMachineId,
                        quantity: t[j].quantity,
                        actualQuantity: t[j].actualQuantity,
                        processingType: t[j].processingType,
                        factoryOperation: t[j].factoryOperation,
                        pin: t[j].pin,
                        capacity: t[j].capacity,
                        s2sMins: t[j].s2sMins,
                        up: t[j].up,
                        sheetUp: t[j].sheetUp,
                        face: t[j].face,
                        pendingMinutes: t[j].pendingMinutes,
                        expectedStartTime: t[j].expectedStartTime.utc().format('YYYY-MM-DDTHH:mm:ss'),
                        expectedSetupFinishTime: t[j].expectedSetupFinishTime.utc().format('YYYY-MM-DDTHH:mm:ss'),
                        expectedFinishTime: t[j].expectedFinishTime.utc().format('YYYY-MM-DDTHH:mm:ss'),
                        actualStartTime: t[j].actualStartTime !== null ? t[j].actualStartTime.utc().format('YYYY-MM-DDTHH:mm:ss') : null,
                        actualSetupFinishTime: t[j].actualSetupFinishTime !== null ? t[j].actualSetupFinishTime.utc().format('YYYY-MM-DDTHH:mm:ss') : null,
                        actualFinishTime: t[j].actualFinishTime !== null ? t[j].actualFinishTime.utc().format('YYYY-MM-DDTHH:mm:ss') : null,
                        finished: t[j].finished,
                        inProcessing: t[j].inProcessing,
                        delete: t[j].delete,
                        parallelCode: t[j].parallelCode,
                        expectedMoldId: t[j].expectedMoldId,
                        tooltip: t[j].tooltip.join('|'),
                        color: t[j].color,
                        timeclockEmployeeId: t[j].timeclockEmployeeId,
                        rounds: t[j].rounds,
                        taskGroup: t[j].taskGroup,
                        machineShiftLabel: t[j].machineShiftLabel,
                        new: t[j].new
                    });
                }
                machines.push(machine);
            }
        }

        $log.info(machines);

        $http({
            method: 'post',
            responseType: 'json',
            url: $scope.configuration.serverLocation + $scope.configuration.confirmGanttUrl,
            timeout: $scope.configuration.getGanttDataTimeout * 1000,
            data: machines,
            params: {
                calculate: true,
                calculateFrom: moment.utc($scope.api.gantt.columnsManager.getFirstColumn().date.format(), 'YYYY-MM-DD HH:mm:ss.SSS').format('YYYY-MM-DDTHH:mm:ss'),
                calculateWeeks: 52,
                save: type === 'save' ? true : false
            }
        }).then(function(response) {
            var result = mattCallback.success(response);
            if (result.state === 'ok' && result.data.machines !== undefined && result.data.machines.length > 0) {
                $scope.readyToGo(result.data);
            } else {
                $alert({
                    title: result.messages.title+'<br>',
                    content: result.messages.content,
                    placement: 'top',
                    type: 'info',
                    duration: 3,
                    dismissable: false,
                    html: true,
                    container: '#gantt-chart-alert',
                    show: true
                });
            }
        }, function(response) {
            var result = mattCallback.error(response);
            $alert({
                title: result.messages.title+'<br>',
                content: result.messages.content,
                placement: 'top',
                type: 'info',
                duration: 3,
                dismissable: false,
                html: true,
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
                settingsMachine: m[i].machine.settingsMachine,
                factoryOperation: m[i].machine.factoryOperation,
                title: m[i].machine.title.split('|'),
                currentTimeWorks: m[i].machine.currentTimeWorks,
                online: m[i].machine.online,
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
                        id: t[j].id,
                        oid: t[j].oid,
                        color: t[j].color,
                        name: t[j].operationCode,
                        from: moment(t[j].expectedStartTime, 'YYYY-MM-DDTHH:mm:ssZ'),
                        to: moment(t[j].expectedFinishTime, 'YYYY-MM-DDTHH:mm:ssZ'),
                        textColor: Coloured.isDarkColoured(t[j].color) ? '#ffffff' : '#000000',
                        operationCode: t[j].operationCode,
                        priority: t[j].priority,
                        job: t[j].job,
                        process: t[j].process,
                        previousOperation: t[j].previousOperation,
                        nextOperations: t[j].nextOperations,
                        runOnMachineId: t[j].runOnMachineId,
                        actualRunOnMachineId: t[j].actualRunOnMachineId,
                        quantity: t[j].quantity,
                        actualQuantity: t[j].actualQuantity,
                        processingType: t[j].processingType,
                        factoryOperation: t[j].factoryOperation,
                        pin: t[j].pin,
                        capacity: t[j].capacity,
                        s2sMins: t[j].s2sMins,
                        up: t[j].up,
                        sheetUp: t[j].sheetUp,
                        face: t[j].face,
                        pendingMinutes: t[j].pendingMinutes,
                        expectedStartTime: moment(t[j].expectedStartTime, 'YYYY-MM-DDTHH:mm:ssZ'),
                        expectedSetupFinishTime: moment(t[j].expectedSetupFinishTime, 'YYYY-MM-DDTHH:mm:ssZ'),
                        expectedFinishTime: moment(t[j].expectedFinishTime, 'YYYY-MM-DDTHH:mm:ssZ'),
                        actualStartTime: (t[j].actualStartTime === null) ? null : moment(t[j].actualStartTime, 'YYYY-MM-DDTHH:mm:ssZ'),
                        actualSetupFinishTime: (t[j].actualSetupFinishTime === null) ? null : moment(t[j].actualSetupFinishTime, 'YYYY-MM-DDTHH:mm:ssZ'),
                        actualFinishTime: (t[j].actualFinishTime === null) ? null : moment(t[j].actualFinishTime, 'YYYY-MM-DDTHH:mm:ssZ'),
                        finished: t[j].finished,
                        inProcessing: t[j].inProcessing,
                        delete: t[j].delete,
                        parallelCode: t[j].parallelCode,
                        expectedMoldId: t[j].expectedMoldId,
                        tooltip: t[j].tooltip.split('|'),
                        timeclockEmployeeId: t[j].timeclockEmployeeId,
                        rounds: t[j].rounds,
                        taskGroup: t[j].taskGroup,
                        machineShiftLabel: t[j].machineShiftLabel,
                        new: t[j].new,
                        highlight: false,
                        movable: TaskEditor.taskTemplate.movable
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
                    if ('p'+m[i] in $scope.processesMap) {
                        $scope.processesMap['p'+m[i]].nextProcesses.push($scope.processesMap[p].id);
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
                    title: result.messages.title+'<br>',
                    content: result.messages.content,
                    placement: 'top',
                    type: 'info',
                    duration: 3,
                    dismissable: false,
                    html: true,
                    container: '#gantt-chart-alert',
                    show: true
                });

                $scope.readyToGo(Harvard.getGanttData());
            }
        }, function(response) {
            var result = mattCallback.error(response);
            $alert({
                title: result.messages.title+'<br>',
                content: result.messages.content,
                placement: 'top',
                type: 'info',
                duration: 3,
                dismissable: false,
                html: true,
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

    // var debounceValue = 1000;

    // var listenTaskJson = debounce(function(taskJson) {
    //     if (taskJson !== undefined) {
    //         var task = angular.fromJson(taskJson);
    //         objectModel.cleanTask(task);
    //         var model = $scope.live.task;
    //         angular.extend(model, task);
    //     }
    // }, debounceValue);
    // $scope.$watch('live.taskJson', listenTaskJson);

    // var listenRowJson = debounce(function(rowJson) {
    //     if (rowJson !== undefined) {
    //         var row = angular.fromJson(rowJson);
    //         objectModel.cleanRow(row);
    //         var tasks = row.tasks;

    //         delete row.tasks;
    //         var rowModel = $scope.live.row;

    //         angular.extend(rowModel, row);

    //         var newTasks = {};
    //         var i, l;

    //         if (tasks !== undefined) {
    //             for (i = 0, l = tasks.length; i < l; i++) {
    //                 objectModel.cleanTask(tasks[i]);
    //             }

    //             for (i = 0, l = tasks.length; i < l; i++) {
    //                 newTasks[tasks[i].id] = tasks[i];
    //             }

    //             if (rowModel.tasks === undefined) {
    //                 rowModel.tasks = [];
    //             }
    //             for (i = rowModel.tasks.length - 1; i >= 0; i--) {
    //                 var existingTask = rowModel.tasks[i];
    //                 var newTask = newTasks[existingTask.id];
    //                 if (newTask === undefined) {
    //                     rowModel.tasks.splice(i, 1);
    //                 } else {
    //                     objectModel.cleanTask(newTask);
    //                     angular.extend(existingTask, newTask);
    //                     delete newTasks[existingTask.id];
    //                 }
    //             }
    //         } else {
    //             delete rowModel.tasks;
    //         }

    //         angular.forEach(newTasks, function(newTask) {
    //             rowModel.tasks.push(newTask);
    //         });
    //     }
    // }, debounceValue);
    // $scope.$watch('live.rowJson', listenRowJson);

    // $scope.$watchCollection('live.task', function(task) {
    //     $scope.live.taskJson = angular.toJson(task, true);
    //     $scope.live.rowJson = angular.toJson($scope.live.row, true);
    // });

    // $scope.$watchCollection('live.row', function(row) {
    //     $scope.live.rowJson = angular.toJson(row, true);
    //     if (row !== undefined && row.tasks.indexOf($scope.live.task) < 0) {
    //         $scope.live.task = (row.tasks === undefined || row.tasks.length <= 0) ? undefined : row.tasks[0];
    //     }
    // });

    // $scope.$watchCollection('live.row.tasks', function() {
    //     $scope.live.rowJson = angular.toJson($scope.live.row, true);
    // });

    var drawResizeEndEvent = function(eventName, task) {
        $scope.editTask = TaskEditor.editTaskTemplate;
        $scope.editTask.id = task.model.id;
        $scope.editTask.rowId = task.row.model.id;
        $scope.editTask.runOnMachineId = task.row.model.id;
        $scope.editTask.modifyType = 'create';
        $scope.editTask.priority = Object($scope.tasksMap).length + 1;
        $scope.editTask.drawTask = true;
        $scope.editTask.modal = $modal(editTaskModalOptions);
    };
    var contextMenuEvent = function(eventName, data) {
        var key;
        if (data.type !== undefined) {
            switch(data.type) {
                case 'edit':
                    // Calculate the expected setup finish datetime.
                    var _setupFinishTime = moment(data.task.model.expectedSetupFinishTime) + (data.task.model.from - moment(data.task.model.expectedStartTime));
                    _setupFinishTime = moment(_setupFinishTime).format('YYYY/MM/DD HH:mm');

                    $scope.editTask = {
                        id: data.task.model.id,
                        rowId: data.task.row.id,
                        poNo: data.task.model.job.poNo,
                        fuzzyPoNo: data.task.model.job.poNo,
                        processId: data.task.model.process.id,
                        productId: data.task.model.process.productId,
                        comboId: data.task.model.job.comboId,
                        processingType: data.task.model.processingType,
                        operationCode: data.task.model.operationCode,
                        rounds: data.task.model.rounds,
                        priority: data.task.model.priority,
                        isPin: data.task.model.pin,
                        isFinish: data.task.model.finished,
                        inProcessing: data.task.model.inProcessing,
                        runOnMachineId: data.task.model.runOnMachineId,
                        actualRunOnMachineId: data.task.model.actualRunOnMachineId,
                        machineShiftLabel: data.task.model.machineShiftLabel,
                        parallelCode: data.task.model.parallelCode,
                        pendingMinutes: data.task.model.pendingMinutes,
                        capacity: data.task.model.capacity,
                        face: data.task.model.face,
                        part: data.task.model.part,
                        up: data.task.model.up,
                        sheetUp: data.task.model.sheetUp,
                        s2sMins: data.task.model.s2sMins,
                        timeclockEmployeeId: data.task.model.timeclockEmployeeId,
                        expectedMoldId: data.task.model.expectedMoldId,
                        expectedStartTime: data.task.model.from.format('YYYY/MM/DD HH:mm'),
                        expectedSetupFinishTime: _setupFinishTime,
                        expectedFinishTime: data.task.model.to.format('YYYY/MM/DD HH:mm'),
                        quantity: data.task.model.quantity,
                        actualStartTime: data.task.model.actualStartTime,
                        actualSetupFinishTime: data.task.model.actualSetupFinishTime,
                        actualFinishTime: data.task.model.actualFinishTime,
                        actualQuantity: data.task.model.actualQuantity,
                        previousTask: 0,
                        nextTask: 0,
                        modifyType: data.type,
                        drawTask: false,
                        modal: undefined,
                        check: false
                    };
                    $scope.editTask.modal = $modal(editTaskModalOptions);
                break;
                case 'create':
                    $scope.editTask = TaskEditor.editTaskTemplate;
                    $scope.editTask.id = utils.randomUuid();
                    $scope.editTask.rowId = data.task.id;
                    $scope.editTask.runOnMachineId = data.task.id;
                    $scope.editTask.modifyType = data.type;
                    $scope.editTask.priority = Object($scope.tasksMap).length + 1;
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
    var moveTaskBeginEvent = function(eventName, task) {
        $log.info(multipleTaskSelected);
    };
    var moveTaskEndEvent = function(eventName, task) {
        $log.info(multipleTaskSelected);
    };
    // Event handler
    var logTaskEvent = function(eventName, data) {
    };

    // Event handler
    var logRowEvent = function(eventName, data) {
        var key;

        if (data.type !== undefined) {
            switch(data.type) {
                case 'create':
                    $log.info(data);
                    $scope.editTask = TaskEditor.editTaskTemplate;
                    $scope.editTask.id = utils.randomUuid();
                    $scope.editTask.rowId = data.row.model.id;
                    $scope.editTask.runOnMachineId = data.row.model.id;
                    $scope.editTask.modifyType = data.type;
                    $scope.editTask.priority = Object($scope.tasksMap).length + 1;
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
