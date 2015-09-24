'use strict';

/**
 * @ngdoc function
 * @name HarvardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the HarvardApp
 */
angular.module('HarvardApp')
    .controller('MainCtrl', ['$scope', '$window', '$document', '$compile', '$element', '$http', '$q', '$sce', '$templateCache', '$timeout', '$log', '$modal', '$alert', '$dropdown', 'ganttUtils', 'moment', 'GanttObjectModel', 'Events', 'Coloured', 'Harvard', 'Matt', 'TaskEditor', 'Actions',
    function($scope, $window, $document, $compile, $element, $http, $q, $sce, $templateCache, $timeout, $log, $modal, $alert, $dropdown, utils, moment, ObjectModel, Events, Coloured, Harvard, Matt, TaskEditor, Actions) {
        var _jumpTrigger = false;

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

        Events.editTaskModalOptions.scope = $scope;

        $scope.editTask = angular.copy(TaskEditor.editTaskTemplate);
        $scope.groupTask = false;

        $scope.tasksMap = {};
        $scope.processesMap = {};
        $scope.departmentsMap = {};
        $scope.jobsMap = {};
        $scope.jobTasksMap = {};
        $scope.machinesMap = {};
        $scope.taskGroups = {};
        $scope.data = [];

        $scope.departmentMenu = [{ name: 'Select', order: 0 }];
        $scope.subDepartmentMenu = [{ name: 'Select', order: 0 }];
        $scope.departmentMenuDefault = { name: 'Select', order: 0 };
        $scope.subDepartmentMenuDefault = { name: 'Select', order: 0 };
        $scope.pagination = [1];
        $scope.paginationPrePage = 15;
        $scope.currentPage = 1;

        $scope.defaultScale = ['minute', '5 minutes', 'hour', '3 hours', '6 hours', '8 hours', 'day', 'week', '2 weeks', 'month', 'quarter', '6 months', 'year'];

        $scope.options = Actions.initialize($scope);
        $scope.closeTaskEditor = Actions.closeTaskEditor;
        $scope.checkTaskData = Actions.checkTaskData;
        $scope.canAutoWidth = Actions.canAutoWidth;
        $scope.getColumnWidth = Actions.getColumnWidth;
        $scope.paginationFilter = Actions.paginationFilter;
        $scope.jumpToDate = Actions.jumpToDate;
        $scope.alertJumpToTask = Actions.alertJumpToTask;
        $scope.saveGanttData = Actions.saveGanttData;

        $scope._ganttAlertBox = undefined;
        $scope._saveGanttModal = undefined;

        $scope.$watch('departmentMenuDefault', function(newValue, oldValue) {
            $scope.subDepartmentMenu = [{ name: 'Select', order: 0 }];
            $scope.subDepartmentMenuDefault = { name: 'Select', order: 0 };

            if (false === angular.equals(newValue.name, oldValue.name)) {
                if (newValue.name !== 'Select') {
                    $scope.currentPage = 1;
                    $scope.options.filterRow = newValue.name;

                    if (Object.keys($scope.departmentsMap[newValue.name.replace(/ /gi, '-')].sub).length > 0) {
                        for (var x in $scope.departmentsMap[newValue.name.replace(/ /gi, '-')].sub) {
                            $scope.subDepartmentMenu.push({
                                name: $scope.departmentsMap[newValue.name.replace(/ /gi, '-')].sub[x].name,
                                order: $scope.departmentsMap[newValue.name.replace(/ /gi, '-')].sub[x].order
                            });
                        }
                        $scope.subDepartmentMenu.sort(function(a, b) {
                            return a.order - b.order;
                        });
                    }
                } else {
                    $scope.options.filterRow = 'page-1';
                }
            }
        });
        $scope.$watch('subDepartmentMenuDefault', function(newValue, oldValue) {
            if (newValue.name !== 'Select' && false === angular.equals(newValue.name, oldValue.name)) {
                $scope.currentPage = 1;
                $scope.options.filterRow = newValue.name;
            }
        });

        $scope.$watch('options.jumpToDate', function(newValue, oldValue) {
            if (false === angular.equals(newValue, oldValue)) {
                if (newValue instanceof Date) {
                    $scope.jumpToDate(moment(newValue.getTime(), 'x'));
                } else {
                    $scope.jumpToDate(newValue);
                }
            }
        });

        // Task Editor

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
                    }).then(Events.editTaskHandleSuccess, Events.editTaskHandleError);
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
                    }).then(Events.editTaskHandleSuccess, Events.editTaskHandleError);
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
                    }).then(Events.editTaskHandleSuccess, Events.editTaskHandleError);
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
                    }).then(Events.editTaskHandleSuccess, Events.editTaskHandleError);
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
                            label: $scope.tasksMap[('t'+k[i])].model.name + ' ('+$scope.tasksMap[('t'+k[i])].model.priority+')-'+$scope.tasksMap[('t'+k[i])].model.factoryOperation.code,
                            value: k[i]
                        });
                        $scope.editTask.nextTask.push({
                            label: $scope.tasksMap[('t'+k[i])].model.name + ' ('+$scope.tasksMap[('t'+k[i])].model.priority+')-'+$scope.tasksMap[('t'+k[i])].model.factoryOperation.code,
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
                                label: $scope.tasksMap[('t'+k[i])].model.name + ' ('+$scope.tasksMap[('t'+k[i])].model.priority+')-'+$scope.tasksMap[('t'+k[i])].model.factoryOperation.code,
                                value: k[i]
                            });
                            _task.push(k[i]);
                        }
                    }
                }
            }
        });
        $scope.$watch('editTask.lock', function(newValue, oldValue) {
            if (newValue === '1') {
                $scope.editTask.isPin = '0';
            }
        });
        $scope.$watch('editTask.isPin', function(newValue, oldValue) {
            if (newValue === '1') {
                $scope.editTask.lock = '0';
            }
        });

        // Reload data action
        $scope.load = function() {
            var mattCallback = Matt.getGanttData();

            $scope._saveGanttModal = $modal({
                scope: $scope,
                title: 'Processing',
                content: 'Prepare your gantt data, please wait one moment...',
                backdrop: false,
                keyboard: false,
                templateUrl: '../app/views/processing.tpl.html',
                placement: 'center',
                show: false
            });
            $scope._saveGanttModal.$promise.then($scope._saveGanttModal.show);

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
                    var promise = $scope.clear();
                    promise.then(function() {
                        $scope._saveGanttModal.hide();
                        $log.info('[INFO] Clear and readyToGo.');
                    	Actions.readyToGo(angular.copy(result.data));
                    });

                    if ($scope._ganttAlertBox !== undefined) {
                        $scope._ganttAlertBox.hide();
                    }
                    $scope._ganttAlertBox = $alert({
                        scope: $scope,
                        title: result.messages.title+'<br>',
                        content: content,
                        templateUrl: '../app/views/alert.tpl.html',
                        placement: 'top',
                        type: 'info',
                        duration: $scope.configuration.alertTimeout,
                        dismissable: true,
                        html: true,
                        container: '#gantt-chart-alert',
                        show: true
                    });
                } else {
                    if ($scope._ganttAlertBox !== undefined) {
                        $scope._ganttAlertBox.hide();
                    }
                    $scope._ganttAlertBox = $alert({
                        scope: $scope,
                        title: 'ERROR! '+result.messages.title+'<br>',
                        content: content,
                        templateUrl: '../app/views/alert.tpl.html',
                        placement: 'top',
                        type: 'danger',
                        duration: $scope.configuration.alertTimeout,
                        dismissable: true,
                        html: true,
                        container: '#gantt-chart-alert',
                        show: true
                    });
                }
            }, function(response) {
                var result = mattCallback.error(response);
                var content = result.messages.content.replace(/<focusTask>([^<]*)<\/focusTask>/gim, '<a class="highlight-task" ng-click="alertJumpToTask(\'$1\');">$1</a>');

                if (result.readonly !== undefined && (result.readonly === true || result.readonly === 'true')) {
                    $scope.options.readOnly = true;
                }

                if ($scope._ganttAlertBox !== undefined) {
                    $scope._ganttAlertBox.hide();
                }
                $scope._ganttAlertBox = $alert({
                    scope: $scope,
                    title: result.messages.title+'<br>',
                    content: content,
                    templateUrl: '../app/views/alert.tpl.html',
                    placement: 'top',
                    type: 'info',
                    duration: $scope.configuration.alertTimeout,
                    dismissable: true,
                    html: true,
                    container: '#gantt-chart-alert',
                    show: true
                });

                Harvard.getGanttData().then(function(response) {
                    $scope._saveGanttModal.hide();
                    $log.info('[TEST] Original Data', response);
                    Actions.readyToGo(response.data);
                });
            });
        };

        $scope.reload = function() {
            $scope.load();
        };

        // Remove data action
        $scope.remove = Actions.dataToRemove;

        // Clear data action
        $scope.clear = function() {
        	var deferred = $q.defer();

        	$log.info('[CLEAR] Clear.');

    		$scope.data = [];
            $scope.tasksMap = {};
            $scope.processesMap = {};
            $scope.departmentsMap = {};
            $scope.jobsMap = {};
            $scope.machinesMap = {};
            $scope.departmentMenu = [{ name: 'Select', order: 0 }];
            $scope.subDepartmentMenu = [{ name: 'Select', order: 0 }];
            $scope.departmentMenuDefault = { name: 'Select', order: 0 };
            $scope.subDepartmentMenuDefault = { name: 'Select', order: 0 };
            $scope.pagination = [1];
            $scope.paginationPrePage = 15;
            $scope.currentPage = 1;

        	$timeout(function() {
                deferred.resolve({});
        	}, 0);

            return deferred.promise;
        };
    }
]);
