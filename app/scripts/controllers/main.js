'use strict';

/**
 * @ngdoc function
 * @name HarvardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the HarvardApp
 */
angular.module('HarvardApp')
    .controller('MainCtrl', ['$scope', '$window', '$document', '$compile', '$element', '$http', '$q', '$sce', '$templateCache', '$timeout', '$log', '$interpolate', '$modal', '$alert', '$dropdown', 'ganttUtils', 'GanttObjectModel', 'Coloured', 'Harvard', 'Matt', 'TaskEditor', 'ganttMouseOffset', 'ganttDebounce', 'moment',
    function($scope, $window, $document, $compile, $element, $http, $q, $sce, $templateCache, $timeout, $log, $interpolate, $modal, $alert, $dropdown, utils, ObjectModel, Coloured, Harvard, Matt, TaskEditor, mouseOffset, debounce, moment) {
        var objectModel, dataToRemove, saveGanttModal, _movingTask, _ganttAlertBox, _visibleRows;
        var editTaskModalOptions = TaskEditor.editTaskModalOptions;
        var multipleTaskSelected = [];
        var movableEnableCondition = function(task) {
            if ($scope.options.readOnly === true) {
                return false;
            } else {
                if (task === undefined || task instanceof MouseEvent) {
                    return !$scope.options.readOnly;
                } else {
                    if (task.model !== undefined) {
                        if (task.model.finished === true || task.model.inProcessing === true) {
                            return false;
                        }
                    } else {
                        if (task.finished === true || task.inProcessing === true) {
                            return false;
                        }
                    }
                }
            }
            return true;
        };
        var allowMovingCondition = function() {
            return !$scope.options.readOnly;
        };
        var allowRowSwitchingCondition = function(sourceRow, targetRow, task) {
            if ($scope.options.readOnly === true) {
                return false;
            } else {
                if (Matt.switchMachineCondition !== undefined && typeof(Matt.switchMachineCondition) === 'function') {
                    return Matt.switchMachineCondition(sourceRow, targetRow, task);
                } else {
                    return false;
                }
            }
        };
        function fetchTemplate(template) {
            if($templateCache.get(template)) {
                return;
            }
            $http.get(template)
            .success(function(res) {
                if(angular.isObject(res)) {
                    $templateCache.put(template, res.data);
                } else {
                    $templateCache.put(template, res);
                }
            });
        }

        $scope.configuration = Matt.configuration();

        // Prefetching the template.
        fetchTemplate('../app/views/taskContextMenu.tpl.html');
        fetchTemplate('../app/views/taskContent.tpl.html');
        fetchTemplate('../app/views/taskTooltip.tpl.html');
        fetchTemplate('../app/views/alert.tpl.html');
        $scope.tooltipsTmpl = '../app/views/taskTooltip.tpl.html';

        editTaskModalOptions.scope = $scope;

        $scope.editTask = angular.copy(TaskEditor.editTaskTemplate);
        $scope.groupTask = false;

        $scope.tasksMap = {};
        $scope.processesMap = {};
        $scope.departmentsMap = {};
        $scope.jobsMap = {};
        $scope.jobTasksMap = {};
        $scope.machinesMap = {};
        $scope.taskGroups = {};

        $scope.departmentMenu = ['Select'];
        $scope.subDepartmentMenu = ['Select'];
        $scope.departmentMenuDefault = 'Select';
        $scope.subDepartmentMenuDefault = 'Select';
        $scope.pagination = [1];
        $scope.paginationPrePage = 15;
        $scope.currentPage = 1;

        $scope.defaultScale = ['minute', '5 minutes', 'hour', '3 hours', '6 hours', '8 hours', 'day', 'week', '2 weeks', 'month', 'quarter', '6 months', 'year'];

        $scope.options = {
            mode: 'custom',
            scale: '3 hours',
            sortMode: undefined,
            sideMode: 'Table',
            columns: ['model.name'],
            // treeTableColumns: ['from', 'to'],
            columnsHeaders: {'model.name' : 'Name'/*, 'from': 'From', 'to': 'To'*/},
            columnsFormatters: {
                'from': function(from) {
                    return from !== undefined ? from.format('lll') : undefined;
                },
                'to': function(to) {
                    return to !== undefined ? to.format('lll') : undefined;
                }
            },
            maxHeight: false,
            width: false,
            autoExpand: 'right',
            taskOutOfRange: 'expand',
            fromDate: undefined,
            toDate: undefined,
            labelsEnabled: true,
            allowSideResizing: true,
            currentDate: 'line',
            currentDateValue: moment(),
            draw: false,
            readOnly: false,
            groupDisplayMode: 'group',
            filterTask: '',
            filterRow: '',
            options: {
                sideWidth: 200
            },
            filterRowComparator: function(actual, expected) {
                if ($scope.departmentMenuDefault !== 'Select' && $scope.subDepartmentMenuDefault !== 'Select') {
                    if (actual.code === $scope.departmentMenuDefault + '_' + $scope.subDepartmentMenuDefault) {
                        return true;
                    }
                } else {
                    var _code = actual.code.split('_'),
                        _page = parseInt(expected.replace('page-', ''), 10);
                    if (_code[0] === expected || _code[1] === expected || _page === actual.page) {
                        return true;
                    }
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
            columnMagnet: '1 minute',
            timeFramesMagnet: true,
            canDraw: function(event) {
                var isLeftMouseButton = event.button === 0 || event.button === 1;
                return $scope.options.draw && !$scope.options.readOnly && isLeftMouseButton;
            },
            drawTaskFactory: function() {
                var task = angular.copy(TaskEditor.taskTemplate);
                task.id = utils.randomUuid();
                task.oid = task.id;
                task.movable = {
                    enabled: true,
                    allowMoving: allowMovingCondition,
                    allowResizing: false,
                    allowRowSwitching: true,
                    allowRowSwitchingCondition: allowRowSwitchingCondition
                };
                task.tooltips = {
                    enabled: false
                };

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

                    api.tasks.on.add($scope, addEventName('tasks.on.add', logTaskEvent));
                    api.tasks.on.change($scope, addEventName('tasks.on.change', logTaskEvent));
                    api.tasks.on.rowChange($scope, addEventName('tasks.on.rowChange', logTaskEvent));
                    api.tasks.on.remove($scope, addEventName('tasks.on.remove', logTaskEvent));

                    if (api.tasks.on.moveBegin) {
                        api.tasks.on.moveBegin($scope, addEventName('tasks.on.moveBegin', moveTaskBeginEvent));
                        api.tasks.on.move($scope, addEventName('tasks.on.move', movingTaskEvent));
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

                    // api.timespans.on.add($scope, addEventName('timespans.on.add', logTimespanEvent));
                    api.columns.on.generate($scope, logColumnsGenerateEvent);

                    api.rows.on.filter($scope, logRowsFilterEvent);
                    // api.tasks.on.filter($scope, logTasksFilterEvent);

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
                                evt.stopPropagation();
                                if (evt.shiftKey === true) {
                                    if (multipleTaskSelected.indexOf(directiveScope.task.model.id) < 0) {
                                        multipleTaskSelected.push(directiveScope.task.model.id);
                                    }
                                    directiveScope.task.model.highlight = true;
                                } else {
                                    multipleTaskSelected = [];
                                    if (directiveScope.task.model.highlight) {
                                         directiveScope.task.model.highlight = false;
                                    }
                                }
                                directiveScope.$digest();

                                logTaskEvent('task-click', directiveScope.task);
                            });
                            element.bind('mouseenter', function() {
                                element.css('z-index', directiveScope.task.model.priority * 100000);
                            });
                            element.bind('mouseleave', function() {
                                var _dropdown = angular.element(document.getElementById('taskmenu-'+directiveScope.task.model.id));
                                if (_dropdown[0] !== undefined && _dropdown[0].classList !== undefined && _dropdown[0].classList.contains('open')) {
                                    _dropdown[0].classList.remove('open');
                                    directiveScope.task.contextMenuOnClose(directiveScope.task);
                                }
                                element.css('z-index', directiveScope.task.model.priority);
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
                            element.bind('click', function(evt) {
                                evt.stopPropagation();
                                logRowEvent('row-click', directiveScope.row);
                            });
                            // element.bind('mousedown touchstart', function(event) {
                            //     event.stopPropagation();
                            //     $scope.live.row = directiveScope.row.model;
                            //     $scope.$digest();
                            // });
                        } else if (directiveName === 'ganttRowLabel') {
                            var i, l, t;

                            // directiveScope.multipleTasks = [];
                            // directiveScope.multipleTasksToggle = function(id) {
                            //     var _multipleTasks = [];
                            //     if (directiveScope.multipleTasks.indexOf(id) >= 0) {
                            //         for(var i = 0, mt = directiveScope.multipleTasks, l = mt.length; i < l; i += 1) {
                            //             if (mt[i] === id) {
                            //                 continue;
                            //             }
                            //             _multipleTasks.push(mt[i]);
                            //         }
                            //         directiveScope.multipleTasks = _multipleTasks;
                            //     } else {
                            //         directiveScope.multipleTasks.push(id);
                            //     }
                            // };
                            // directiveScope.multipleTasksCheck = function(id) {
                            //     if (directiveScope.multipleTasks.indexOf(id) >= 0) {
                            //         return true;
                            //     } else {
                            //         return false;
                            //     }
                            // };
                            // directiveScope.dragControlListeners = {
                            //     containment: '#machineTasks',
                            //     scrollableContainer: '#machineTasks',
                            //     // accept: function (sourceItemHandleScope, destSortableScope) {
                            //     //     return true;
                            //     // },
                            //     orderChanged: function(event) {
                            //         var target;
                            //         if (event.dest.index === 0) {
                            //             target = 0;
                            //         } else {
                            //             target = event.dest.index > event.source.index ? event.dest.index - 1 : event.dest.index;
                            //         }
                            //         var _dropTarget = directiveScope.row.tasks[event.dest.index].model, _sortedTasks = [], _shiftDuring = 60 * 1000;
                            //         if (directiveScope.multipleTasks.length > 0 && directiveScope.multipleTasks.indexOf(_dropTarget.id) > -1) {
                            //             for (i = 0, t = directiveScope.multipleTasks, l = t.length; i < l; i += 1) {
                            //                 _sortedTasks.push(directiveScope.row.tasksMap[t[i]].model);
                            //             }
                            //             _sortedTasks.sort(function(a, b) { return a.from - b.from; });
                            //             if (target === 0) {
                            //                 _shiftDuring += Math.abs(_dropTarget.to - directiveScope.row.tasks[1].model.from);
                            //             } else {
                            //                 _shiftDuring += Math.abs(directiveScope.row.tasks[(target - 1)].model.to - _dropTarget.from);
                            //             }
                            //             _shiftDuring = _shiftDuring / 60 / 1000 * (event.dest.index > event.source.index ? 1 : -1);
                            //             for (i = 0, t = directiveScope.row.tasks, l = t.length; i < l; i += 1) {
                            //                 if (directiveScope.multipleTasks.indexOf(t[i].model.id) > -1 && Math.abs(_shiftDuring) > 0) {
                            //                     t[i].model.from = t[i].model.from.clone().add(_shiftDuring, 'm');
                            //                     t[i].model.to = t[i].model.to.clone().add(_shiftDuring, 'm');
                            //                     t[i].model.expectedSetupFinishTime = t[i].model.expectedSetupFinishTime.clone().add(_shiftDuring, 'm');
                            //                 }
                            //             }
                            //             directiveScope.row.tasks.sort(function(a, b) { return a.model.from - b.model.from; });
                            //             target = 0;
                            //         }

                            //         for (i = target, t = directiveScope.row.tasks, l = t.length; i < l; i += 1) {
                            //             if (t[i].model.id === _dropTarget.id || i === target) {
                            //                 continue;
                            //             }
                            //             if (t[i].model.from < t[(i-1)].model.to) {
                            //                 var during = t[i].model.to.clone() - t[i].model.from.clone(),
                            //                     setupDuring = t[i].model.expectedSetupFinishTime.clone() - t[i].model.from.clone();

                            //                 t[i].model.from = t[(i-1)].model.to.clone().add(1, 'm');
                            //                 t[i].model.to = t[i].model.from.clone().add(during, 'ms');
                            //                 t[i].model.expectedSetupFinishTime = t[i].model.from.clone().add(setupDuring, 'ms');
                            //             }
                            //         }
                            //         directiveScope.row.tasks.sort(function(a, b) { return a.model.from - b.model.from; });
                            //     }
                            // };

                            directiveScope.autoExpand = {
                                width: (directiveScope.row.model.title.length * 10 + 33) + 'em'
                            };
                            directiveScope.readOnly = function(model) {
                                if ($scope.options.readOnly === false) {
                                    if (model !== undefined) {
                                        if (model.inPorcessing === true || model.finished === true) {
                                            return true;
                                        }
                                    }
                                }
                                return $scope.options.readOnly;
                            }
                            directiveScope.taskColoured = function(bgColor, textColor) {
                                return {
                                    background: bgColor,
                                    color: textColor
                                };
                            };
                            directiveScope.reSortingTasks = function() {
                                $timeout(function() {
                                    directiveScope.row.tasks.sort(function(a, b) { return a.model.from - b.model.from; });
                                    directiveScope.$digest();
                                }, 100);
                            };
                            directiveScope.renderHtml = function(text) {
                                text = text.replace(/\r\n/g, '<br>');
                                text = text.replace(/\n/g, '<br>');
                                return $sce.trustAsHtml(text);
                            };
                            directiveScope.tasksOnMachine = $modal({
                                scope: directiveScope,
                                title: directiveScope.row.model.settingsMachine.name + ' ['+directiveScope.row.model.settingsMachine.code+']',
                                template: '../app/views/machine.tpl.html',
                                backdrop: false,
                                placement: 'center',
                                show: false
                            });
                            element.bind('dblclick', function(evt) {
                                // for (i = 0, t = directiveScope.row.tasks, l = t.length; i < l; i++) {
                                //     if (t[i].model.weight === 0) {
                                //         t[i].model.weight = i + 1;
                                //     }
                                // }
                                evt.stopPropagation();
                                directiveScope.row.tasks.sort(function(a, b) { return a.model.from - b.model.from; });
                                directiveScope.tasksOnMachine.$promise.then(directiveScope.tasksOnMachine.show);
                            });
                        }
                    });

                    // api.tasks.on.rowChange($scope, function(task) {
                    //     $scope.live.row = task.row.model;
                    // });
                    objectModel = new ObjectModel(api);

                    logReadyEvent(api);
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
                    $scope.options.filterRow = 'page-1';
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

            $scope.departmentMenuDefault = 'Select';

            if (page === 0) {
                if (direction === 1) {
                    if ($scope.currentPage < $scope.pagination.length) {
                        $scope.currentPage++;
                    }
                } else {
                    if ($scope.currentPage > 1) {
                        $scope.currentPage--;
                    }
                }
            } else {
                if ($scope.currentPage !== page) {
                    $scope.currentPage = page;
                }
            }
            $scope.options.filterRow = 'page-' + $scope.currentPage.toString();
        };

        $scope.jumpToDate = function(date) {
            var from = $scope.api.gantt.columnsManager.getFirstColumn().date.clone();
            var lastColumn = moment($scope.api.gantt.columnsManager.getLastColumn().date.format(), 'YYYY-MM-DDTHH:mm:ss');
            if (date === undefined) {
                date = $scope.options.currentDateValue;
            }

            if (date > lastColumn) {
                $scope.api.gantt.columnsManager.generateColumns(from, date);
            }

            $scope.api.gantt.scroll.scrollToDate(date);
        };

        $scope.$watch('options.toDate', function(newValue, oldValue) {
            if (false === angular.equals(newValue, oldValue)) {
                if (newValue instanceof Date) {
                    $scope.jumpToDate(moment(newValue.getTime(), 'x'));
                } else {
                    $scope.jumpToDate(newValue);
                }
            }
        });

        $scope.alertJumpToTask = function(id) {
            if (false === (('t'+id) in $scope.tasksMap)) {
                $window.alert('The \''+id+'\' task does not exists!');
            } else {
                $scope.tasksMap[('t'+id)].model.highlight = true;
                $scope.jumpToDate($scope.tasksMap[('t'+id)].model.from);
            }
        };

        // $scope.$watch('options.readOnly', function(newValue, oldValue) {
        //     if (false === angular.equals(newValue, oldValue)) {
        //         if (newValue === true) {
        //             for (var i = 0, k = Object.key($scope.tasksMap), l = k.length; i < l; i++) {
        //                 $scope.tasksMap[k[i]].movable.enabled = false;
        //             }
        //         } else {
        //             for (var i = 0, k = Object.key($scope.tasksMap), l = k.length; i < l; i++) {
        //                 $scope.tasksMap[k[i]].movable.enabled = true;
        //             }
        //         }
        //     }
        // });

        // Task Editor
        var editTaskHandleError = function(response) {
        	console.log(response);
            // alert ONLY if server gives messages
            var errorMessages; // = 'Something error from server.';
            if (response.data !== null) {
                if (response.data.messagesEmpty !== true) {
                    errorMessages = response.data.messages.map(function (msg) {return msg.value;}).join('<br>');
                }
            }

            if (!!errorMessages) {
                $alert({
                    title: 'Error!<br>',
                    content: errorMessages,
                    placement: 'top',
                    type: 'info',
                    duration: $scope.configuration.alertTimeout,
                    dismissable: true,
                    html: true,
                    container: '#gantt-editor-alert',
                    show: true
                });
            }

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
                // case 'getComboUrl':
                //     $scope.editTask.comboList = [];
                //     _clickFunc = function(comboId) {
                //         return function(comboId) {
                //             $scope.editTask.comboId = comboId;
                //         }.bind(this, comboId);
                //     };
                //     for (i = 0, k = Object.keys($scope.jobsMap), l = k.length; i < l; ++i) {
                //         if ($scope.jobsMap[k[i]].poNo === $scope.editTask.poNo) {
                //             $scope.editTask.comboList.push({
                //                 text: $scope.jobsMap[k[i]].comboId,
                //                 click: _clickFunc.call(null, $scope.jobsMap[k[i]].comboId)
                //             });
                //             $scope.editTask.job = $scope.jobsMap[k[i]];
                //             break;
                //         }
                //     }
                // break;
                case 'getComboUrl':
                    $scope.editTask.comboList = [];
                    for (i = 0, k = Object.keys($scope.jobsMap), l = k.length; i < l; ++i) {
                        if ($scope.jobsMap[k[i]].poNo === $scope.editTask.poNo) {
                            $scope.editTask.comboList.push({
                                label: $scope.jobsMap[k[i]].comboId,
                                value: $scope.jobsMap[k[i]].comboId
                            });
                        }
                    }
                break;
                // case 'getProductUrl':
                //     $scope.editTask.productList = [];
                //     var _productId = [];
                //     _clickFunc = function(productId) {
                //         return function(productId) {
                //             $scope.editTask.productId = productId;
                //         }.bind(this, productId);
                //     };
                //     for (i = 0, k = Object.keys($scope.processesMap), l = k.length; i < l; ++i) {
                //         if (_productId.indexOf($scope.processesMap[k[i]].productId) < 0) {
                //             $scope.editTask.productList.push({
                //                 text: $scope.processesMap[k[i]].productId,
                //                 click: _clickFunc.call(null, $scope.processesMap[k[i]].productId)
                //             });
                //             _productId.push($scope.processesMap[k[i]].productId);
                //         }
                //     }
                // break;
                case 'getProductUrl':
                    $scope.editTask.productList = [];
                    var _productId = [];
                    for (i = 0, k = Object.keys($scope.processesMap), l = k.length; i < l; ++i) {
                        if (_productId.indexOf($scope.processesMap[k[i]].productId) < 0) {
                            $scope.editTask.productList.push({
                                label: $scope.processesMap[k[i]].productId,
                                value: $scope.processesMap[k[i]].productId
                            });
                            _productId.push($scope.processesMap[k[i]].productId);
                        }
                    }
                break;
                // case 'getProcessUrl':
                //     $scope.editTask.processList = [];
                //     _clickFunc = function(processId) {
                //         return function(processId) {
                //             $scope.editTask.processId = processId;
                //         }.bind(this, processId);
                //     };
                //     for (i = 0, k = Object.keys($scope.processesMap), l = k.length; i < l; ++i) {
                //         if ($scope.processesMap[k[i]].productId === $scope.editTask.productId) {
                //             $scope.editTask.processList.push({
                //                 text: $scope.processesMap[k[i]].id,
                //                 click: _clickFunc.call(null, $scope.processesMap[k[i]].id)
                //             });
                //             break;
                //         }
                //     }
                // break;
                case 'getProcessUrl':
                    $scope.editTask.processList = [];
                    for (i = 0, k = Object.keys($scope.processesMap), l = k.length; i < l; ++i) {
                        if ($scope.processesMap[k[i]].productId === $scope.editTask.productId) {
                            $scope.editTask.processList.push({
                                label: $scope.processesMap[k[i]].id,
                                value: $scope.processesMap[k[i]].id
                            });
                            break;
                        }
                    }
                break;
            }
        };
        var editTaskHandleSuccess = function(response) {
            var responseType = response.headers('Content-Type').replace(/;(.*)$/gi, '');
            if (responseType === 'application/json' && response.data !== null) {
                if (response.data.messagesEmpty === true && response.data.data !== null) {
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
                        // case 'getComboUrl':
                        //     $scope.editTask.comboList = [];
                        //     for (i = 0, k = Object.keys($scope.jobsMap), l = k.length; i < l; ++i) {
                        //         if ($scope.jobsMap[k[i]].poNo === $scope.editTask.poNo) {
                        //             $scope.editTask.job = $scope.jobsMap[k[i]];
                        //             break;
                        //         }
                        //     }
                        //     _clickFunc = function(comboId) {
                        //         return function(comboId) {
                        //             $scope.editTask.comboId = comboId;
                        //         }.bind(this, comboId);
                        //     };
                        //     for (i = 0, k = response.data.data, l = k.length; i < l; ++i) {
                        //         $scope.editTask.comboList.push({
                        //             text: k[i].label,
                        //             click: _clickFunc.call(null, k[i].value)
                        //         });
                        //     }
                        // break;
                        case 'getComboUrl':
                            $scope.editTask.comboList = [];
                            for (i = 0, k = response.data.data, l = k.length; i < l; ++i) {
                                $scope.editTask.comboList.push({
                                    label: k[i].label,
                                    value: k[i].value
                                });
                            }
                        break;
                        // case 'getProductUrl':
                        //     $scope.editTask.productList = [];
                        //     var _productId = [];
                        //     _clickFunc = function(productId) {
                        //         return function(productId) {
                        //             $scope.editTask.productId = productId;
                        //         }.bind(this, productId);
                        //     };
                        //     for (i = 0, k = response.data.data, l = k.length; i < l; ++i) {
                        //         if (_productId.indexOf(k[i].value.productId) < 0) {
                        //             $scope.editTask.productList.push({
                        //                 text: k[i].label,
                        //                 click: _clickFunc.call(null, k[i].value)
                        //             });
                        //             _productId.push(k[i].value);
                        //         }
                        //     }
                        // break;
                        case 'getProductUrl':
                            $scope.editTask.productList = [];
                            var _productId = [];
                            for (i = 0, k = response.data.data, l = k.length; i < l; ++i) {
                                if (_productId.indexOf(k[i].value.productId) < 0) {
                                    $scope.editTask.productList.push({
                                        label: k[i].label,
                                        value: k[i].value
                                    });
                                    _productId.push(k[i].value);
                                }
                            }
                        break;
                        // case 'getProcessUrl':
                        //     $scope.editTask.processList = [];
                        //     _clickFunc = function(processId) {
                        //         return function(processId) {
                        //             $scope.editTask.processId = processId;
                        //         }.bind(this, processId);
                        //     };
                        //     for (i = 0, k = response.data.data, l = k.length; i < l; ++i) {
                        //         $scope.editTask.processList.push({
                        //             text: k[i].label,
                        //             click: _clickFunc.call(null, k[i].value)
                        //         });
                        //     }
                        // break;
                        case 'getProcessUrl':
                            $scope.editTask.processList = [];
                            for (i = 0, k = response.data.data, l = k.length; i < l; ++i) {
                                $scope.editTask.processList.push({
                                    label: k[i].label,
                                    value: k[i].value
                                });
                            }
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
                                duration: $scope.configuration.alertTimeout,
                                dismissable: true,
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
            if ($scope.editTask === undefined) {
                return;
            }
            if ($scope.editTask.modifyType === 'create') {
                $scope.editTask.comboId = '';
                $scope.editTask.comboList = [];
                $scope.editTask.productId = '';
                $scope.editTask.productList = [];
                $scope.editTask.processId = '';
                $scope.editTask.processList = [];
                $scope.editTask.previousTask = [];
                $scope.editTask.nextTask = [];
            }

            $scope.editTask.fuzzyPoNo = newValue;

            // if (newValue !== undefined && newValue !== '' && !angular.equals(newValue, oldValue)) {
            //     $timeout(function() {
            //         $http({
            //             method: 'get',
            //             responseType: 'json',
            //             url: $scope.configuration.serverLocation + $scope.configuration.poFuzzySearch.replace('#poNo#', newValue),
            //             data: 'poFuzzySearch'
            //         }).then(editTaskHandleSuccess, editTaskHandleError);
            //     }, 300);
            // }
        });
        $scope.$watch('editTask.fuzzyPoNo', function(newValue, oldValue) {
            if ($scope.editTask === undefined) {
                return;
            }
            if (newValue !== undefined && newValue !== '' && $scope.editTask.modifyType === 'create') {
                $timeout(function() {
                    $http({
                        method: 'get',
                        responseType: 'json',
                        url: $scope.configuration.serverLocation + $scope.configuration.getPoUrl.replace('#poNo#', newValue),
                        data: 'getPoUrl'
                    }).then(editTaskHandleSuccess, editTaskHandleError);
                }, 300);
            }
        });
        $scope.$watch('editTask.poId', function(newValue, oldValue) {
            if ($scope.editTask === undefined) {
                return;
            }
            if (newValue !== undefined && newValue !== '' && $scope.editTask.modifyType === 'create') {
                $timeout(function() {
                    $http({
                        method: 'get',
                        responseType: 'json',
                        url: $scope.configuration.serverLocation + $scope.configuration.getComboUrl.replace('#poId#', newValue),
                        data: 'getComboUrl'
                    }).then(editTaskHandleSuccess, editTaskHandleError);
                }, 300);
            }
        });
        $scope.$watch('editTask.comboId', function(newValue, oldValue) {
            if ($scope.editTask === undefined) {
                return;
            }
            if (!angular.equals(newValue, oldValue) && $scope.editTask.modifyType === 'create') {
                $scope.editTask.productId = '';
                $scope.editTask.productList = [];
                $scope.editTask.processId = '';
                $scope.editTask.processList = [];
                $scope.editTask.previousTask = [];
                $scope.editTask.nextTask = [];
            }

            if (newValue !== undefined && newValue !== '' && !angular.equals(newValue, oldValue) && $scope.editTask.modifyType === 'create') {
                $timeout(function() {
                    $http({
                        method: 'get',
                        responseType: 'json',
                        url: $scope.configuration.serverLocation + $scope.configuration.getProductUrl.replace('#comboId#', newValue),
                        data: 'getProductUrl'
                    }).then(editTaskHandleSuccess, editTaskHandleError);
                }, 300);
            }
        });
        $scope.$watch('editTask.productId', function(newValue, oldValue) {
            if ($scope.editTask === undefined) {
                return;
            }
            if (!angular.equals(newValue, oldValue) && $scope.editTask.modifyType === 'create') {
                $scope.editTask.processId = '';
                $scope.editTask.processList = [];
                $scope.editTask.previousTask = [];
                $scope.editTask.nextTask = [];
            }

            if (newValue !== undefined && newValue !== '' && !angular.equals(newValue, oldValue) && $scope.editTask.modifyType === 'create') {
                var rowIndex = (function($scope) {
                    for (var i = 0, l = $scope.data.length; i < l; i++) {
                        if ($scope.data[i].id === $scope.editTask.runOnMachineId) {
                            return i;
                        }
                    }
                    return false;
                })($scope);
                $timeout(function() {
                    $http({
                        method: 'get',
                        responseType: 'json',
                        url: $scope.configuration.serverLocation + $scope.configuration.getProcessUrl.replace('#productId#', newValue),
                        data: 'getProcessUrl',
                        params: {
                            factoryOperationCode: $scope.data[rowIndex].factoryOperation.code
                        }
                    }).then(editTaskHandleSuccess, editTaskHandleError);
                }, 300);
            }
        });
        $scope.$watch('editTask.processId', function(newValue, oldValue) {
            if ($scope.editTask === undefined || $scope.editTask.modifyType === 'edit' || newValue === '' || newValue === undefined) {
                return;
            }

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
                            label: $scope.tasksMap[('t'+k[i])].model.name + ' ('+$scope.tasksMap[('t'+k[i])].model.priority+')',
                            value: k[i]
                        });
                        $scope.editTask.nextTask.push({
                            label: $scope.tasksMap[('t'+k[i])].model.name + ' ('+$scope.tasksMap[('t'+k[i])].model.priority+')',
                            value: k[i]
                        });
                        _task.push(k[i]);
                    }
                }
            }
        });
        $scope.$watch('editTask.previousTaskId', function(newValue, oldValue) {
            if ($scope.editTask === undefined || newValue === '' || newValue === undefined || $scope.editTask.modifyType === 'edit') {
                return;
            }
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
                        if ($scope.tasksMap[('t'+k[i])].model.from > $scope.tasksMap[('t'+newValue)].model.from && k[i] !== newValue && _task.indexOf(k[i]) < 0) {
                            $scope.editTask.nextTask.push({
                                label: $scope.tasksMap[('t'+k[i])].model.name + ' ('+$scope.tasksMap[('t'+k[i])].model.priority+')',
                                value: k[i]
                            });
                            _task.push(k[i]);
                        }
                    }
                }
            }
        });
        $scope.$watchGroup(['editTask.previousTaskId', 'editTask.nextTaskId'], function(newValue, oldValue) {
            if ($scope.editTask.modifyType === 'create' && !angular.equals(newValue, oldValue) && newValue[0] !== 0 && newValue[1] !== 0) {
                newValue.sort(function(a, b) { return parseInt(a, 10) - parseInt(b, 10); });
                $scope.editTask.priority = Math.floor(Math.random() * (parseInt(newValue[1], 10) - parseInt(newValue[0], 10))) + parseInt(newValue[0], 10);
                if ($scope.editTask.priority === parseInt(newValue[0], 10)) {
                    $scope.editTask.priority += 1;
                }
            }
        });
        $scope.closeTaskEditor = function() {
            $scope.options.draw = false;
            if (Object.keys($scope.editTask).length > 0) {
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
            $scope.editTask = {};
        };

        $scope.checkTaskData = function() {
            if ($scope.editTask !== undefined) {
                var i, k, l;
                // Initialize the datetime with moment.
                $scope.editTask.expectedStartTime = $scope.editTask.expectedStartTime === null ? null : typeof($scope.editTask.expectedStartTime) === 'object' ? moment((new Date($scope.editTask.expectedStartTime)).getTime(), 'x') : moment($scope.editTask.expectedStartTime, 'YYYY-MM-DDTHH:mm:ss');
                $scope.editTask.expectedSetupFinishTime = $scope.editTask.expectedSetupFinishTime === null ? null : typeof($scope.editTask.expectedSetupFinishTime) === 'object' ? moment((new Date($scope.editTask.expectedSetupFinishTime)).getTime(), 'x') : moment($scope.editTask.expectedSetupFinishTime, 'YYYY-MM-DDTHH:mm:ss');
                $scope.editTask.expectedFinishTime = $scope.editTask.expectedFinishTime === null ? null : typeof($scope.editTask.expectedFinishTime) === 'object' ? moment((new Date($scope.editTask.expectedFinishTime)).getTime(), 'x') : moment($scope.editTask.expectedFinishTime, 'YYYY-MM-DDTHH:mm:ss');
                $scope.editTask.actualStartTime = $scope.editTask.actualStartTime === null ? null : typeof($scope.editTask.actualStartTime) === 'object' ? moment((new Date($scope.editTask.actualStartTime)).getTime(), 'x') : moment($scope.editTask.actualStartTime, 'YYYY-MM-DDTHH:mm:ss');
                $scope.editTask.actualSetupFinishTime = $scope.editTask.actualSetupFinishTime === null ? null : typeof($scope.editTask.actualSetupFinishTime) === 'object' ? moment((new Date($scope.editTask.actualSetupFinishTime)).getTime(), 'x') : moment($scope.editTask.actualSetupFinishTime, 'YYYY-MM-DDTHH:mm:ss');
                $scope.editTask.actualFinishTime = $scope.editTask.actualFinishTime === null ? null : typeof($scope.editTask.actualFinishTime) === 'object' ? moment((new Date($scope.editTask.actualFinishTime)).getTime(), 'x') : moment($scope.editTask.actualFinishTime, 'YYYY-MM-DDTHH:mm:ss');

                if ($scope.tasksMap['t' + $scope.editTask.id] === undefined) {
                    $scope.editTask.taskGroupIdsVo = [];
                } else {
                    $scope.editTask.taskGroupIdsVo = $scope.tasksMap['t' + $scope.editTask.id].model.taskGroupIdsVo;
                }

                var result = Matt.addTaskData($scope.editTask), task;
                var rowIndex = (function($scope) {
                    for (i = 0, l = $scope.data.length; i < l; i++) {
                        if ($scope.data[i].id === $scope.editTask.runOnMachineId) {
                            return i;
                        }
                    }
                    return false;
                })($scope);

                if (result.state === 'ok') {
                    task = angular.copy(TaskEditor.taskTemplate);
                    task.id = $scope.editTask.id;
                    task.color = $scope.editTask.color;
                    task.oid = $scope.editTask.id;
                    task.name = $scope.editTask.operationCode;
                    task.from = typeof($scope.editTask.expectedStartTime) === 'object' ? moment((new Date($scope.editTask.expectedStartTime)).getTime(), 'x') : moment($scope.editTask.expectedStartTime, 'YYYY-MM-DDTHH:mm:ss');
                    task.to = typeof($scope.editTask.expectedFinishTime) === 'object' ? moment((new Date($scope.editTask.expectedFinishTime)).getTime(), 'x') : moment($scope.editTask.expectedFinishTime, 'YYYY-MM-DDTHH:mm:ss');
                    task.operationCode = $scope.editTask.operationCode;
                    task.processingType = $scope.editTask.processingType;
                    task.quantity = $scope.editTask.quantity;
                    task.new = $scope.tasksMap[('t' + $scope.editTask.id)] !== undefined ? $scope.tasksMap[('t' + $scope.editTask.id)].model.new : true;
                    task.delete = false;
                    task.finished = $scope.editTask.isFinish === '1' ? true : false;
                    task.pin = $scope.editTask.isPin === '1' ? true : false;
                    task.inProcessing = $scope.editTask.inProcessing === '1' ? true : false;
                    task.previousOperation = $scope.editTask.previousTaskId;
                    task.nextOperations = [$scope.editTask.nextTaskId];
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
                    task.expectedStartTime = $scope.editTask.expectedStartTime;
                    task.expectedSetupFinishTime = $scope.editTask.expectedSetupFinishTime;
                    task.expectedFinishTime = $scope.editTask.expectedFinishTime;
                    task.actualStartTime = $scope.editTask.actualStartTime;
                    task.actualSetupFinishTime = $scope.editTask.actualSetupFinishTime;
                    task.actualFinishTime = $scope.editTask.actualFinishTime;
                    task.actualQuantity = $scope.editTask.actualQuantity;
                    task.weight = $scope.editTask.weight;

                    task.job = undefined;
                    for (i = 0, k = Object.keys($scope.jobsMap), l = k.length; i < l; i++) {
                        if ($scope.jobsMap[k[i]].comboId === $scope.editTask.comboId) {
                            task.job = angular.copy($scope.jobsMap[k[i]]);
                            break;
                        }
                    }
                    if (task.job === undefined) {
                        task.job = {
                            comboId: $scope.editTask.comboId,
                            comboQuantity: 0,
                            comboType: null,
                            id: 0,
                            poNo: $scope.editTask.poNo
                        };
                    }
                    task.process = undefined;
                    for (i = 0, k = Object.keys($scope.processesMap), l = k.length; i < l; i++) {
                        if ($scope.processesMap[k[i]].id === $scope.editTask.processId) {
                            task.process = {
                                id: $scope.editTask.processId,
                                needWaitPrevProcess: $scope.processesMap[k[i]].needWaitPrevProcess,
                                operations: $scope.processesMap[k[i]].operations,
                                previousProcesses: $scope.processesMap[k[i]].previousProcesses,
                                productId: $scope.editTask.productId
                            };
                            break;
                        }
                    }
                    if (task.process === undefined) {
                        task.process = {
                            id: $scope.editTask.processId,
                            needWaitPrevProcess: null,
                            operations: [],
                            previousProcesses: [],
                            productId: $scope.editTask.productId
                        };
                    }

                    if ($scope.editTask.tooltip.length === 0) {
                        task.tooltip = (function(rowIndex) {
                            var tooltip = [];
                            for (var i = 0, l = objectModel.api.gantt.rowsManager.rows[rowIndex].model.title.length; i < l; i++) {
                                tooltip.push('N');
                            }
                            return tooltip;
                        })(rowIndex);
                    } else {
                        task.tooltip = $scope.editTask.tooltip;
                    }
                    task.movable = {
                        enabled: movableEnableCondition(task),
                        allowMoving: allowMovingCondition,
                        allowResizing: false,
                        allowRowSwitching: true,
                        allowRowSwitchingCondition: allowRowSwitchingCondition
                    };
                    task.tooltips = {
                        enabled: false
                    };
                    task.taskContent = '../app/views/taskContent.tpl.html';
                    task.taskContextMenu = '../app/views/taskContextMenu.tpl.html';
                    task.taskInfoContent = '../app/views/taskTooltip.tpl.html';

                    /**
                     * Task Modify Hint.
                     * 所有編輯器沒有使用到的 Task 屬性，請在這裡手動加入。
                     *
                     * 例如：
                     *
                     * task.newPriority = $scope.tasksMap['t' + $scope.editTask.id].model.newPriority;
                     */
                    if ($scope.tasksMap['t' + $scope.editTask.id] === undefined) {
                        task.taskGroupIdsVo = [];
                        task.taskGroup = '';
                    } else {
                        task.taskGroupIdsVo = $scope.tasksMap['t' + $scope.editTask.id].model.taskGroupIdsVo;
                        task.taskGroup = $scope.tasksMap['t' + $scope.editTask.id].model.taskGroup;
                    }

                    $scope.editTask.check = true;
                    if ($scope.editTask.drawTask === false) {
                        objectModel.api.gantt.rowsManager.rows[rowIndex].addTask(task);
                    }


                    $alert({
                        title: 'Success!<br>',
                        content: 'The task save success.',
                        placement: 'top',
                        type: 'info',
                        duration: $scope.configuration.alertTimeout,
                        dismissable: true,
                        html: true,
                        container: '#gantt-editor-alert',
                        show: true
                    });
                } else {
                    $alert({
                        title: 'ERROR! '+result.messages.title+'<br>',
                        content: result.messages.content.join('<br>'),
                        placement: 'top',
                        type: 'info',
                        duration: $scope.configuration.alertTimeout,
                        dismissable: true,
                        html: true,
                        container: '#gantt-editor-alert',
                        show: true
                    });
                }
            }
        };

        // Save or Calculate buttons
        $scope.saveGanttData = function(type) {
            var mattCallback = Matt.saveOrCalcGanttData(), machine = {}, machines = [], _taskModel;
            for (var i = 0, m = $scope.data, l = m.length; i < l; i++) {
                if (m[i].tasks.length > 0) {
                    machine = {
                        machine: angular.copy({
                            id: m[i].id,
                            settingsMachine: m[i].settingsMachine,
                            factoryOperation: m[i].factoryOperation,
                            title: m[i].title.join('|'),
                            currentTimeWorks: m[i].currentTimeWorks,
                            online: m[i].online
                        }),
                        operationQueue: []
                    };
                    for (var j = 0, t = m[i].tasks, q = t.length; j < q; j++) {
                        _taskModel = angular.copy($scope.tasksMap['t'+t[j].id].model);

                        /**
                         * Task Modify Hint.
                         * 這裡是必須要傳回 Server 的 Task 資料
                         *
                         * 例如：
                         *
                         * newPriority = _task.model.newPriority;
                         */
                        machine.operationQueue.push({
                            id: _taskModel.id,
                            oid: _taskModel.oid,
                            part: _taskModel.part,
                            operationCode: _taskModel.operationCode,
                            priority: _taskModel.priority,
                            job: _taskModel.job,
                            process: _taskModel.process,
                            previousOperation: _taskModel.previousOperation,
                            nextOperations: _taskModel.nextOperations,
                            runOnMachineId: _taskModel.runOnMachineId,
                            actualRunOnMachineId: _taskModel.actualRunOnMachineId,
                            quantity: _taskModel.quantity,
                            actualQuantity: _taskModel.actualQuantity,
                            processingType: _taskModel.processingType,
                            factoryOperation: _taskModel.factoryOperation,
                            pin: _taskModel.pin,
                            capacity: _taskModel.capacity,
                            s2sMins: _taskModel.s2sMins,
                            up: _taskModel.up,
                            sheetUp: _taskModel.sheetUp,
                            face: _taskModel.face,
                            pendingMinutes: _taskModel.pendingMinutes,
                            expectedStartTime: _taskModel.expectedStartTime.utc().format('YYYY-MM-DDTHH:mm:ss'),
                            expectedSetupFinishTime: _taskModel.expectedSetupFinishTime.utc().format('YYYY-MM-DDTHH:mm:ss'),
                            expectedFinishTime: _taskModel.expectedFinishTime.utc().format('YYYY-MM-DDTHH:mm:ss'),
                            actualStartTime: _taskModel.actualStartTime !== null ? _taskModel.actualStartTime.utc().format('YYYY-MM-DDTHH:mm:ss') : null,
                            actualSetupFinishTime: _taskModel.actualSetupFinishTime !== null ? _taskModel.actualSetupFinishTime.utc().format('YYYY-MM-DDTHH:mm:ss') : null,
                            actualFinishTime: _taskModel.actualFinishTime !== null ? _taskModel.actualFinishTime.utc().format('YYYY-MM-DDTHH:mm:ss') : null,
                            finished: _taskModel.finished,
                            inProcessing: _taskModel.inProcessing,
                            delete: _taskModel.delete,
                            parallelCode: _taskModel.parallelCode,
                            expectedMoldId: _taskModel.expectedMoldId,
                            tooltip: _taskModel.tooltip.join('|'),
                            color: _taskModel.color,
                            timeclockEmployeeId: _taskModel.timeclockEmployeeId,
                            rounds: _taskModel.rounds,
                            taskGroup: _taskModel.taskGroup,
                            taskGroupIdsVo: _taskModel.taskGroupIdsVo,
                            machineShiftLabel: _taskModel.machineShiftLabel,
                            new: _taskModel.new,
                            weight: _taskModel.weight
                        });
                    }
                    machines.push(machine);
                }
            }

            saveGanttModal = $modal({
                scope: $scope,
                title: 'Processing',
                content: 'Waiting for server response...',
                backdrop: false,
                keyboard: false,
                template: '../app/views/processing.tpl.html',
                placement: 'center',
                show: false
            });
            saveGanttModal.$promise.then(saveGanttModal.show);

            $http({
                method: 'post',
                responseType: 'json',
                url: $scope.configuration.serverLocation + $scope.configuration.confirmGanttUrl,
                timeout: $scope.configuration.saveGanttDataTimeout * 1000,
                data: machines,
                params: {
                    calculate: true,
                    calculateFrom: moment.utc($scope.api.gantt.columnsManager.getFirstColumn().date.format(), 'YYYY-MM-DDTHH:mm:ss').format('YYYY-MM-DDTHH:mm:ss'),
                    calculateWeeks: $scope.configuration.calculateWeeks,
                    solveStrategy: $scope.configuration.solveStrategy,
                    currentTime: moment.utc($scope.options.currentDateValue).format('YYYY-MM-DDTHH:mm:ss'),
                    save: type === 'save' ? true : false
                }
            }).then(function(response) {
                saveGanttModal.hide();
                var result = mattCallback.success(response);
                var content = result.messages.content.replace(/<focusTask>([^<]*)<\/focusTask>/gim, '<a class="highlight-task" ng-click="alertJumpToTask(\'$1\');">$1</a>');

                if (result.readonly !== undefined && (result.readonly === true || result.readonly === 'true')) {
                    $scope.options.readOnly = true;
                }
                if (result.currentTime !== undefined && result.currentTime !== '') {
                    $scope.options.currentDateValue = moment(result.currentTime, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
                }

                if (result.state === 'ok' && result.data.machines !== undefined && result.data.machines.length > 0) {
                    $scope.readyToGo(angular.copy(result.data));

                    if (_ganttAlertBox !== undefined) {
                        _ganttAlertBox.hide();
                    }
                    _ganttAlertBox = $alert({
                        scope: $scope,
                        title: result.messages.title,
                        content: content,
                        template: '../app/views/alert.tpl.html',
                        placement: 'top',
                        type: 'info',
                        duration: $scope.configuration.alertTimeout,
                        dismissable: true,
                        html: true,
                        container: '#gantt-chart-alert',
                        show: true
                    });
                } else {
                    if (_ganttAlertBox !== undefined) {
                        _ganttAlertBox.hide();
                    }
                    _ganttAlertBox = $alert({
                        scope: $scope,
                        title: 'ERROR! '+result.messages.title,
                        content: content,
                        template: '../app/views/alert.tpl.html',
                        placement: 'top',
                        type: 'info',
                        duration: $scope.configuration.alertTimeout,
                        dismissable: true,
                        html: true,
                        container: '#gantt-chart-alert',
                        show: true
                    });
                }
            }, function(response) {
                saveGanttModal.hide();
                var result = mattCallback.error(response);
                var content = result.messages.content.replace(/<focusTask>([^<]*)<\/focusTask>/gim, '<a class="highlight-task" ng-click="alertJumpToTask(\'$1\')">$1</a>');

                if (result.readonly !== undefined && (result.readonly === true || result.readonly === 'true')) {
                    $scope.options.readOnly = true;
                }
                if (result.currentTime !== undefined && result.currentTime !== '') {
                    $scope.options.currentDateValue = moment(result.currentTime, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
                }

                if (_ganttAlertBox !== undefined) {
                    _ganttAlertBox.hide();
                }
                _ganttAlertBox = $alert({
                    scope: $scope,
                    title: 'ERROR! '+result.messages.title,
                    content: content,
                    template: '../app/views/alert.tpl.html',
                    placement: 'top',
                    type: 'info',
                    duration: $scope.configuration.alertTimeout,
                    dismissable: true,
                    html: true,
                    container: '#gantt-chart-alert',
                    show: true
                });
            });
        };

        $scope.readyToGo = function(originalData) {
            var obj, task, i, j, l, m, q, t, p;

            if (originalData.machines === undefined || originalData.machines.length === 0) {
                if (saveGanttModal !== undefined) {
                    saveGanttModal.hide();
                }
                _ganttAlertBox = $alert({
                    scope: $scope,
                    title: 'ERROR!',
                    content: 'The structure of gantt JSON are wrong, cannot render the GUI.',
                    placement: 'top',
                    type: 'info',
                    duration: $scope.configuration.alertTimeout,
                    dismissable: true,
                    html: true,
                    container: '#gantt-chart-alert',
                    show: true
                });
                return false;
            }

            $scope.clear();

            if (originalData.readOnly !== undefined && (originalData.readOnly === true || originalData.readOnly === 'true')) {
                $scope.options.readOnly = true;
            }
            if (originalData.currentTime !== undefined && originalData.currentTime !== '') {
                $scope.options.currentDateValue = moment(originalData.currentTime, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
            }

            $log.info('[Event] Beginning parse JSON data.');

            for(i = 0, m = originalData.machines, l = m.length; i < l; i++) {
                // if (m[i].operationQueue.length === 0) continue;

                // Prepare row machine data
                obj = {
                    id: m[i].machine.id,
                    name: m[i].machine.settingsMachine.name,
                    dept: m[i].machine.settingsMachine.dept,
                    sortable: false,
                    settingsMachine: m[i].machine.settingsMachine,
                    factoryOperation: m[i].machine.factoryOperation,
                    title: m[i].machine.title.split('|'),
                    currentTimeWorks: m[i].machine.currentTimeWorks,
                    online: m[i].machine.online,
                    rowContextMenu: '../app/views/rowContextMenu.tpl.html',
                    tasks: []
                };

                if (m[i].operationQueue.length > 0) {
                    for(j = 0, t = m[i].operationQueue, q = t.length; j < q; j++) {
                        /**
                         * Task Modify Hint.
                         * 這裡是初始化 Gantt 所有 Tasks 資料的物件。
                         *
                         * 例如：
                         *
                         * newPriority = t[j].newPriority;
                         */
                        task = {
                            id: t[j].id,
                            oid: t[j].oid,
                            color: t[j].color,
                            name: t[j].operationCode,
                            from: moment(t[j].expectedStartTime, 'YYYY-MM-DDTHH:mm:ss.SSSZ'),
                            to: moment(t[j].expectedFinishTime, 'YYYY-MM-DDTHH:mm:ss.SSSZ'),
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
                            expectedStartTime: moment(t[j].expectedStartTime, 'YYYY-MM-DDTHH:mm:ss.SSSZ'),
                            expectedSetupFinishTime: moment(t[j].expectedSetupFinishTime, 'YYYY-MM-DDTHH:mm:ss.SSSZ'),
                            expectedFinishTime: moment(t[j].expectedFinishTime, 'YYYY-MM-DDTHH:mm:ss.SSSZ'),
                            actualStartTime: (t[j].actualStartTime === null) ? null : moment(t[j].actualStartTime, 'YYYY-MM-DDTHH:mm:ss.SSSZ'),
                            actualSetupFinishTime: (t[j].actualSetupFinishTime === null) ? null : moment(t[j].actualSetupFinishTime, 'YYYY-MM-DDTHH:mm:ss.SSSZ'),
                            actualFinishTime: (t[j].actualFinishTime === null) ? null : moment(t[j].actualFinishTime, 'YYYY-MM-DDTHH:mm:ss.SSSZ'),
                            finished: t[j].finished,
                            inProcessing: t[j].inProcessing,
                            delete: t[j].delete,
                            parallelCode: t[j].parallelCode,
                            expectedMoldId: t[j].expectedMoldId,
                            tooltip: t[j].tooltip.split('|'),
                            timeclockEmployeeId: t[j].timeclockEmployeeId,
                            rounds: t[j].rounds,
                            part: t[j].part,
                            taskGroup: t[j].taskGroup,
                            machineShiftLabel: t[j].machineShiftLabel,
                            new: t[j].new,
                            highlight: false,
                            loaded: moment(),
                            movable: {
                                enabled: movableEnableCondition(t[j]),
                                allowMoving: allowMovingCondition,
                                allowResizing: false,
                                allowRowSwitching: true,
                                allowRowSwitchingCondition: allowRowSwitchingCondition
                            },
                            tooltips: {
                                enabled: false
                            },
                            taskContent: '../app/views/taskContent.tpl.html',
                            taskContextMenu: '../app/views/taskContextMenu.tpl.html',
                            taskInfoContent: '../app/views/taskTooltip.tpl.html',
                            taskGroupIdsVo: t[j].taskGroupIdsVo,
                            weight: t[j].weight || 0
                        };

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

                        // Prepare jobsMap and jobTasksMap
                        if (('j'+t[j].job.id in $scope.jobsMap) === false) {
                            $scope.jobsMap['j'+t[j].job.id] = t[j].job;
                            $scope.jobTasksMap['j'+t[j].job.id] = [];
                        }
                        // Prepare jobTasksMap
                        $scope.jobTasksMap['j'+t[j].job.id].push(t[j].id);

                        // Prepare taskGroups
                        if (t[j].taskGroup !== '' && ('g'+t[j].taskGroup in $scope.taskGroups) === false) {
                            $scope.taskGroups['g'+t[j].taskGroup] = [];
                        }
                        if (t[j].taskGroup !== '') {
                            $scope.taskGroups['g'+t[j].taskGroup].push(t[j].id);
                        }

                        obj.tasks.push(task);
                    }
                }

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

                $scope.data.push(obj);
            }
            // Pagination the machines
            q = Object.keys($scope.machinesMap).sort(function(a, b) { return $scope.machinesMap[a].id - $scope.machinesMap[b].id; });
            p = 1;
            for(i = 0, l = q.length; i < l; i++) {
                if (i > 0 && i % $scope.paginationPrePage === 0) {
                    p++;
                    $scope.pagination.push(p);
                }
                $scope.machinesMap[q[i]].dept['page'] = p;
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

            if (saveGanttModal !== undefined) {
                saveGanttModal.hide();
            }

            $scope.timespans = Harvard.getGanttTimespans();
            $scope.options.filterRow = 'page-1';
        };

        // Reload data action
        $scope.load = function() {
            var mattCallback = Matt.getGanttData();

            saveGanttModal = $modal({
                scope: $scope,
                title: 'Processing',
                content: 'Prepare your gantt data, please wait one moment...',
                backdrop: false,
                keyboard: false,
                template: '../app/views/processing.tpl.html',
                placement: 'center',
                show: false
            });
            saveGanttModal.$promise.then(saveGanttModal.show);

            $log.info('[Event] Loading data.');
            $http({
                method: 'get',
                responseType: 'json',
                url: $scope.configuration.serverLocation + $scope.configuration.getGanttUrl,
                params: {},
                timeout: $scope.configuration.getGanttDataTimeout * 1000
            }).then(function(response) {
                var result = mattCallback.success(response);
                var content = result.messages.content.replace(/<focusTask>([^<]*)<\/focusTask>/gim, '<a class="highlight-task" ng-click="alertJumpToTask(\'$1\');">$1</a>');

                if (result.readonly !== undefined && (result.readonly === true || result.readonly === 'true')) {
                    $scope.options.readOnly = true;
                }

                if (result.state === 'ok' && result.data.machines !== undefined && result.data.machines.length > 0) {
                    $scope.readyToGo(angular.copy(result.data));
                    if (_ganttAlertBox !== undefined) {
                        _ganttAlertBox.hide();
                    }
                    _ganttAlertBox = $alert({
                        scope: $scope,
                        title: result.messages.title+'<br>',
                        content: content,
                        template: '../app/views/alert.tpl.html',
                        placement: 'top',
                        type: 'info',
                        duration: $scope.configuration.alertTimeout,
                        dismissable: true,
                        html: true,
                        container: '#gantt-chart-alert',
                        show: true
                    });
                } else {
                    if (_ganttAlertBox !== undefined) {
                        _ganttAlertBox.hide();
                    }
                    _ganttAlertBox = $alert({
                        scope: $scope,
                        title: 'ERROR! '+result.messages.title+'<br>',
                        content: content,
                        template: '../app/views/alert.tpl.html',
                        placement: 'top',
                        type: 'info',
                        duration: $scope.configuration.alertTimeout,
                        dismissable: true,
                        html: true,
                        container: '#gantt-chart-alert',
                        show: true
                    });
                    $scope.readyToGo(angular.copy(Harvard.getGanttData()));
                }
            }, function(response) {
                var result = mattCallback.error(response);
                var content = result.messages.content.replace(/<focusTask>([^<]*)<\/focusTask>/gim, '<a class="highlight-task" ng-click="alertJumpToTask(\'$1\');">$1</a>');

                if (result.readonly !== undefined && (result.readonly === true || result.readonly === 'true')) {
                    $scope.options.readOnly = true;
                }

                if (_ganttAlertBox !== undefined) {
                    _ganttAlertBox.hide();
                }
                _ganttAlertBox = $alert({
                    scope: $scope,
                    title: result.messages.title+'<br>',
                    content: content,
                    template: '../app/views/alert.tpl.html',
                    placement: 'top',
                    type: 'info',
                    duration: $scope.configuration.alertTimeout,
                    dismissable: true,
                    html: true,
                    container: '#gantt-chart-alert',
                    show: true
                });
                $scope.readyToGo(angular.copy(Harvard.getGanttData()));
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
            $scope.paginationPrePage = 15;
            $scope.currentPage = 1;
        };

        var drawResizeEndEvent = function(eventName, task) {
            $scope.editTask = angular.copy(TaskEditor.editTaskTemplate);
            $scope.editTask.id = task.model.id;
            $scope.editTask.rowId = task.row.model.id;
            $scope.editTask.runOnMachineId = task.row.model.id;
            $scope.editTask.modifyType = 'create';
            $scope.editTask.priority = Object.keys($scope.tasksMap).length + 1;
            $scope.editTask.drawTask = true;
            $scope.editTask.expectedStartTime = task.model.from.clone().format('YYYY/MM/DD HH:mm');
            $scope.editTask.expectedSetupFinishTime = task.model.from.clone().add(1, 'm').format('YYYY/MM/DD HH:mm');
            $scope.editTask.expectedFinishTime = task.model.to.clone().format('YYYY/MM/DD HH:mm');
            $scope.editTask.modal = $modal(editTaskModalOptions);
        };
        var taskContextMenuEvent = function(type, task, evt) {
            evt.stopPropagation();
            var key;
            var _dropdown = angular.element(document.getElementById('taskmenu-'+task.model.id));
            if (_dropdown[0] !== undefined && _dropdown[0].classList !== undefined && _dropdown[0].classList.contains('open')) {
                _dropdown[0].classList.remove('open');
                task.contextMenuOnClose(task);
            }
            task.$element.css('z-index', task.model.priority);

            switch(type) {
                case 'pin':
                    if ($scope.options.readOnly === false) {
                        task.model.pin = !task.model.pin;
                    }
                break;
                case 'edit':
                    if ($scope.options.readOnly === false) {
                        // Calculate the expected setup finish datetime.
                        var _setupFinishTime = moment(task.model.expectedSetupFinishTime) + (task.model.from - moment(task.model.expectedStartTime));
                        _setupFinishTime = moment(_setupFinishTime).format('YYYY/MM/DD HH:mm');

                        $scope.editTask = {
                            id: task.model.id,
                            rowId: task.row.model.id,
                            poNo: task.model.job.poNo,
                            poId: task.model.job.poNo,
                            fuzzyPoNo: task.model.job.poNo,
                            processId: task.model.process.id,
                            productId: task.model.process.productId,
                            comboId: task.model.job.comboId,
                            processingType: task.model.processingType,
                            operationCode: task.model.operationCode,
                            rounds: task.model.rounds,
                            priority: task.model.priority,
                            isPin: task.model.pin ? '1' : '0',
                            isFinish: task.model.finished ? '1' : '0',
                            inProcessing: task.model.inProcessing ? '1' : '0',
                            runOnMachineId: task.model.runOnMachineId,
                            actualRunOnMachineId: task.model.actualRunOnMachineId,
                            machineShiftLabel: task.model.machineShiftLabel,
                            parallelCode: task.model.parallelCode,
                            pendingMinutes: task.model.pendingMinutes,
                            capacity: task.model.capacity,
                            face: task.model.face,
                            part: task.model.part,
                            up: task.model.up,
                            sheetUp: task.model.sheetUp,
                            s2sMins: task.model.s2sMins,
                            timeclockEmployeeId: task.model.timeclockEmployeeId,
                            expectedMoldId: task.model.expectedMoldId,
                            expectedStartTime: task.model.from.format('YYYY/MM/DD HH:mm'),
                            expectedSetupFinishTime: _setupFinishTime,
                            expectedFinishTime: task.model.to.format('YYYY/MM/DD HH:mm'),
                            quantity: task.model.quantity,
                            actualStartTime: task.model.actualStartTime,
                            actualSetupFinishTime: task.model.actualSetupFinishTime,
                            actualFinishTime: task.model.actualFinishTime,
                            actualQuantity: task.model.actualQuantity,
                            previousTask: 0,
                            nextTask: 0,
                            tooltip: task.model.tooltip,
                            modifyType: type,
                            color: task.model.color,
                            drawTask: false,
                            modal: undefined,
                            check: false,
                            weight: task.model.weight
                        };

                        /* Initial edit task lists */
                        $scope.editTask.poFuzzySearch = [];
                        $scope.editTask.productList = [];
                        $scope.editTask.comboList = [];
                        $scope.editTask.processList = [];
                        var i, k, l, _poNo = [], _productId = [];
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
                        for (i = 0, k = Object.keys($scope.jobsMap), l = k.length; i < l; ++i) {
                            if ($scope.jobsMap[k[i]].poNo === $scope.editTask.poNo) {
                                $scope.editTask.comboList.push({
                                    label: $scope.jobsMap[k[i]].comboId,
                                    value: $scope.jobsMap[k[i]].comboId
                                });
                            }
                        }
                        for (i = 0, k = Object.keys($scope.processesMap), l = k.length; i < l; ++i) {
                            if (_productId.indexOf($scope.processesMap[k[i]].productId) < 0) {
                                $scope.editTask.productList.push({
                                    label: $scope.processesMap[k[i]].productId,
                                    value: $scope.processesMap[k[i]].productId
                                });
                                _productId.push($scope.processesMap[k[i]].productId);
                            }
                        }
                        for (i = 0, k = Object.keys($scope.processesMap), l = k.length; i < l; ++i) {
                            if ($scope.processesMap[k[i]].productId === $scope.editTask.productId) {
                                $scope.editTask.processList.push({
                                    label: $scope.processesMap[k[i]].id,
                                    value: $scope.processesMap[k[i]].id
                                });
                                break;
                            }
                        }

                        $scope.editTask.modal = $modal(editTaskModalOptions);
                    }
                break;
                case 'create':
                    if ($scope.options.readOnly === false) {
                        var _point = moment();
                        if (evt !== undefined) {
                            _point = evt.x - task.rowsManager.gantt.side.getWidth() + task.rowsManager.gantt.scroll.getScrollLeft() - 60;
                            _point = task.rowsManager.gantt.getDateByPosition(_point);
                        }
                        $scope.editTask = angular.copy(TaskEditor.editTaskTemplate);
                        $scope.editTask.id = utils.randomUuid();
                        $scope.editTask.rowId = task.row.model.id;
                        $scope.editTask.runOnMachineId = task.row.model.id;
                        $scope.editTask.modifyType = type;
                        $scope.editTask.priority = Object.keys($scope.tasksMap).length + 1;
                        $scope.editTask.expectedStartTime = _point.clone().format('YYYY/MM/DD HH:mm');
                        $scope.editTask.expectedSetupFinishTime = _point.clone().add(1, 'm').format('YYYY/MM/DD HH:mm');
                        $scope.editTask.expectedFinishTime = _point.clone().add(2, 'm').format('YYYY/MM/DD HH:mm');
                        $scope.editTask.modal = $modal(editTaskModalOptions);

                        $scope.editTask.poFuzzySearch = [];
                        var _poNo = [];
                        var _clickFunc = function(poNo) {
                            return function(poNo) {
                                $scope.editTask.poNo = poNo;
                                $scope.editTask.fuzzyPoNo = poNo;
                            }.bind(this, poNo);
                        };
                        for (var i = 0, k = Object.keys($scope.jobsMap), l = k.length; i < l; i++) {
                            if (_poNo.indexOf($scope.jobsMap[k[i]].poNo) < 0) {
                                $scope.editTask.poFuzzySearch.push({
                                    text: $scope.jobsMap[k[i]].poNo,
                                    click: _clickFunc.call(null, $scope.jobsMap[k[i]].poNo)
                                });
                                _poNo.push($scope.jobsMap[k[i]].poNo);
                            }
                        }
                    }
                break;
                case 'delete':
                    if ($scope.options.readOnly === false) {
                        if ($window.confirm('Are you sure to delete this task?') === true) {
                            task.model.delete = true;
                            task.row.removeTask(task.model.id, true, false);
                        }
                    }
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
        };
        var moveTaskBeginEvent = function(eventName, task) {
            var i, t, l;
            if (task.model.finished === true || task.model.inProcessing === true) {
                return false;
            }
            // task.model.highlight = true;
            _movingTask = task.model.from.clone();
            if ($scope.groupTask === true) {
                if (multipleTaskSelected.length > 0) {
                    for (i = 0, t = multipleTaskSelected, l = t.length; i < l; i++) {
                        $scope.tasksMap['t'+t[i]].model.highlight = false;
                    }
                }
                multipleTaskSelected = [];
                if ($scope.taskGroups['g' + task.model.taskGroup] !== undefined) {
                    multipleTaskSelected = $scope.taskGroups['g' + task.model.taskGroup];
                    for (i = 0, t = multipleTaskSelected, l = t.length; i < l; i++) {
                        $scope.tasksMap['t'+t[i]].model.highlight = true;
                    }
                }
            } else {
                if (multipleTaskSelected.length > 0) {
                    if (multipleTaskSelected.indexOf(task.model.id) < 0) {
                        for (i = 0, t = multipleTaskSelected, l = t.length; i < l; i++) {
                            $scope.tasksMap['t'+t[i]].model.highlight = false;
                        }
                        multipleTaskSelected = [];
                    }
                }
            }
        };
        var movingTaskEvent = function(eventName, task) {
            var _dateline, _shift = task.model.from.clone() - _movingTask;
            var _firstColumn = $scope.api.gantt.columnsManager.getFirstColumn().date;
            if (multipleTaskSelected.length > 0) {
                for (var i = 0, t = multipleTaskSelected, l = t.length; i < l; i++) {
                    if ($scope.tasksMap['t'+t[i]].model.id !== task.model.id) {
                        _dateline = $scope.tasksMap['t'+t[i]].model.from.clone().add(_shift, 'ms');
                        if (_dateline <= _firstColumn || $scope.tasksMap['t'+t[i]].model.finished === true ||  $scope.tasksMap['t'+t[i]].model.inProcessing === true) {
                            continue;
                        } else {
                            _dateline = objectModel.api.gantt.getPositionByDate(_dateline, false);
                            $scope.tasksMap['t'+t[i]].moveTo(_dateline, false);
                        }
                    }
                }
                _movingTask = task.model.from.clone();
            } else {
                if (task.model.from <= _firstColumn) {
                    return false;
                }
            }
            $scope.$digest();
        };
        var moveTaskEndEvent = function(eventName, task) {
            var i, t, l, _dateline;
            for (i = 0, t = Object.keys($scope.tasksMap), l = t.length; i < l; i++) {
                if ($scope.tasksMap[t[i]].model.highlight === true) {
                    $scope.tasksMap[t[i]].model.highlight = false;
                    if ($scope.tasksMap[t[i]].$scope !== undefined) {
                        $scope.tasksMap[t[i]].$scope.$digest();
                    }
                }
            }
            if (multipleTaskSelected.length > 0) {
                for (i = 0, t = multipleTaskSelected, l = t.length; i < l; i++) {
                    if ($scope.tasksMap['t'+t[i]] !== undefined && $scope.tasksMap['t'+t[i]].model.id !== task.model.id) {
                        _dateline = $scope.tasksMap['t'+t[i]].model.from.clone() - $scope.tasksMap['t'+t[i]].model.expectedStartTime.clone();
                        $scope.tasksMap['t'+t[i]].model.expectedStartTime = $scope.tasksMap['t'+t[i]].model.from.clone();
                        $scope.tasksMap['t'+t[i]].model.expectedSetupFinishTime.add(_dateline, 'ms');
                        $scope.tasksMap['t'+t[i]].model.expectedFinishTime = $scope.tasksMap['t'+t[i]].model.to.clone();
                    }
                }
            }
            _dateline = task.model.from.clone() - task.model.expectedStartTime.clone();
            task.model.expectedStartTime = task.model.from.clone();
            task.model.expectedSetupFinishTime.add(_dateline, 'ms');
            task.model.expectedFinishTime = task.model.to.clone();

            multipleTaskSelected = [];
            _movingTask = undefined;
        };
        // Event handler
        var logTaskEvent = function(eventName, task) {
            var i, k, l;

            if (eventName === 'tasks.on.add' || eventName === 'tasks.on.change') {
                if (task.model.color === '') {
                    task.model.color = '#AA8833';
                    task.model.textColor = Coloured.isDarkColoured('#AA8833') ? '#ffffff' : '#000000';
                }
                if (task.model.tooltip.length < task.row.model.title.length) {
                    for (i = task.model.tooltip.length, k = task.row.model.title, l = k.length; i < l; i++) {
                        task.model.tooltip.push('N');
                    }
                }
                task.switchPin = function(task, evt) {
                    taskContextMenuEvent('pin', task, evt);
                };
                task.editTask = function(task, evt) {
                    taskContextMenuEvent('edit', task, evt);
                };
                task.createTask = function(task, evt) {
                    taskContextMenuEvent('create', task, evt);
                };
                task.zoomIn = function(task, evt) {
                    taskContextMenuEvent('zoomIn', task, evt);
                };
                task.zoomOut = function(task, evt) {
                    taskContextMenuEvent('zoomOut', task, evt);
                };
                task.deleteTask = function(task, evt) {
                    taskContextMenuEvent('delete', task, evt);
                };
                task.moreInformation = function(task, evt) {
                    evt.stopPropagation();
                    var _url = Matt.showMoreInformation(task.model);
                    var _dropdown = angular.element(document.getElementById('taskmenu-'+task.model.id));
                    $modal({
                        scope: $scope,
                        title: 'More Information',
                        content: '<iframe src="'+_url+'" style="width:100%;height:'+($window.innerHeight * 0.75)+'px;border:0 none;"></iframe>',
                        template: '../app/views/moreInformation.tpl.html',
                        backdrop: false,
                        placement: 'center',
                        show: true
                    });
                    if (_dropdown[0] !== undefined && _dropdown[0].classList !== undefined && _dropdown[0].classList.contains('open')) {
                        _dropdown[0].classList.remove('open');
                        task.contextMenuOnClose(task);
                    }
                    task.$element.css('z-index', task.model.priority);
                };
                task.contextMenuOnShow = function(task) {
                    task.model.movable.enabled = false;
                    return false;
                };
                task.contextMenuOnClose = function(task) {
                    task.model.movable.enabled = movableEnableCondition(task);
                    return false;
                };
                if (task.model.delete === true) {
                    objectModel.api.gantt.rowsManager.rowsMap[task.row.model.id].removeTask(task.model.id, true, false);
                }
                $scope.tasksMap['t' + task.model.id] = task;
            } else if (eventName === 'tasks.on.rowChange') {
                task.model.runOnMachineId = task.row.model.id;
                if (task.model.actualRunOnMachineId !== null && task.model.actualRunOnMachineId !== undefined) {
                    task.model.actualRunOnMachineId = task.row.model.id;
                }
            } else if (eventName === 'task-click') {
                $log.info(task);

                $scope.task = task;
                $scope.$digest();

                // if ($scope.groupTask === false && ('j'+task.model.job.id) in $scope.jobTasksMap) {
                //     for (i = 0, k = $scope.jobTasksMap['j'+task.model.job.id], l = k.length; i < l; i++) {
                //         if (k[i] !== task.model.id) {
                //             $scope.tasksMap['t'+k[i]].model.highlight = !$scope.tasksMap['t'+k[i]].model.highlight;
                //             if ($scope.tasksMap['t'+k[i]].$scope !== undefined) {
                //                 $scope.tasksMap['t'+k[i]].$scope.$digest();
                //             }
                //         }
                //     }
                // }
            }
        };

        // Event handler
        var logRowEvent = function(eventName, row) {
            if (eventName === 'rows.on.add' || eventName === 'rows.on.change') {
                row.createTask = function(row, evt) {
                    evt.stopPropagation();
                    if ($scope.options.readOnly === false) {
                        var _point = moment();
                        if (evt !== undefined) {
                            _point = event.x - row.rowsManager.gantt.side.getWidth() + row.rowsManager.gantt.scroll.getScrollLeft() - 60;
                            _point = row.rowsManager.gantt.getDateByPosition(_point);
                        }
                        $scope.editTask = angular.copy(TaskEditor.editTaskTemplate);
                        $scope.editTask.id = utils.randomUuid();
                        $scope.editTask.rowId = row.model.id;
                        $scope.editTask.runOnMachineId = row.model.id;
                        $scope.editTask.modifyType = 'create';
                        $scope.editTask.priority = Object.keys($scope.tasksMap).length + 1;
                        $scope.editTask.expectedStartTime = _point.clone().format('YYYY/MM/DD HH:mm');
                        $scope.editTask.expectedSetupFinishTime = _point.clone().add(1, 'm').format('YYYY/MM/DD HH:mm');
                        $scope.editTask.expectedFinishTime = _point.clone().add(2, 'm').format('YYYY/MM/DD HH:mm');
                        $scope.editTask.modal = $modal(editTaskModalOptions);

                        $scope.editTask.poFuzzySearch = [];
                        var _poNo = [];
                        var _clickFunc = function(poNo) {
                            return function(poNo) {
                                $scope.editTask.poNo = poNo;
                                $scope.editTask.fuzzyPoNo = poNo;
                            }.bind(this, poNo);
                        };
                        for (var i = 0, k = Object.keys($scope.jobsMap), l = k.length; i < l; i++) {
                            if (_poNo.indexOf($scope.jobsMap[k[i]].poNo) < 0) {
                                $scope.editTask.poFuzzySearch.push({
                                    text: $scope.jobsMap[k[i]].poNo,
                                    click: _clickFunc.call(null, $scope.jobsMap[k[i]].poNo)
                                });
                                _poNo.push($scope.jobsMap[k[i]].poNo);
                            }
                        }
                    }

                    var _dropdown = angular.element(document.getElementById('rowmenu-'+row.model.id));
                    if (_dropdown[0] !== undefined && _dropdown[0].classList !== undefined && _dropdown[0].classList.contains('open')) {
                        _dropdown[0].classList.remove('open');
                    }
                };
                row.zoomIn = function(row, evt) {
                    evt.stopPropagation();
                    var key = $scope.defaultScale.indexOf($scope.options.scale);
                    if (key - 1 >= 0) {
                        $scope.options.scale = $scope.defaultScale[(key - 1)];
                    }
                    var _dropdown = angular.element(document.getElementById('rowmenu-'+row.model.id));
                    if (_dropdown[0] !== undefined && _dropdown[0].classList !== undefined && _dropdown[0].classList.contains('open')) {
                        _dropdown[0].classList.remove('open');
                    }
                };
                row.zoomOut = function(row, evt) {
                    evt.stopPropagation();
                    var key = $scope.defaultScale.indexOf($scope.options.scale);
                    if (key + 1 < $scope.defaultScale.length) {
                        $scope.options.scale = $scope.defaultScale[(key + 1)];
                    }
                    var _dropdown = angular.element(document.getElementById('rowmenu-'+row.model.id));
                    if (_dropdown[0] !== undefined && _dropdown[0].classList !== undefined && _dropdown[0].classList.contains('open')) {
                        _dropdown[0].classList.remove('open');
                    }
                };
            } else if (eventName === 'row-click') {
                $log.info(row);
            }
        };

        // Event handler
        // var logTimespanEvent = function(eventName, timespan) {
        //     $log.info('[Event] ' + eventName + ': ' + timespan.model.name);
        // };

        // Event handler
        // var logLabelsEvent = function(eventName, width) {
        //     $log.info('[Event] ' + eventName + ': ' + width);
        // };

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
            from = moment($scope.api.gantt.columnsManager.getLastColumn().date.format(), 'YYYY-MM-DDTHH:mm:ss');

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
            // $scope.options.fromDate = moment($scope.api.gantt.columnsManager.getFirstColumn().date.format('YYYY/MM/DD')+'T00:00:00', 'YYYY-MM-DDTHH:mm:ss');
            if (parseInt($scope.api.gantt.columnsManager.getFirstColumn().date.format('H'), 10) !== 0) {
                from = moment($scope.api.gantt.columnsManager.getFirstColumn().date.format('YYYY-MM-DDT00:00:00'), 'YYYY-MM-DDTHH:mm:ss');
                to = $scope.api.gantt.columnsManager.to.clone();
                $scope.api.gantt.columnsManager.generateColumns(from, to);
            }
        };

        // Event handler
        var logRowsFilterEvent = function(rows, filteredRows) {
            $log.info('[Event] rows.on.filter: ' + filteredRows.length + '/' + rows.length + ' rows displayed.');
        };

        // Event handler
        // var logTasksFilterEvent = function(tasks, filteredTasks) {
        //     $log.info('[Event] tasks.on.filter: ' + filteredTasks.length + '/' + tasks.length + ' tasks displayed.');
        // };

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
    }
]);
