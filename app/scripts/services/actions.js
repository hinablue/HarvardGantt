'use strict';

/**
 * @ngdoc service
 * @name HarvardApp.Harvard
 * @description
 * # Harvard
 * Service in the HarvardApp.
 */
angular.module('HarvardApp')
    .service('Actions', ['$document', '$compile', '$http', '$log', '$timeout', '$modal', '$alert', '$sce', '$templateCache', 'ganttUtils', 'GanttObjectModel', 'Events', 'Coloured', 'Harvard', 'Matt', 'TaskEditor', 'moment',
    function Actions($document, $compile, $http, $log, $timeout, $modal, $alert, $sce, $templateCache, utils, ObjectModel, Events, Coloured, Harvard, Matt, TaskEditor, moment) {

        var scope, _self = this, objectModel, _jumpTrigger = false;

        var canAutoWidth = function(scale) {
            // Always disable auto width
            return false;
        };

        var getColumnWidth = function(widthEnabled, scale) {
            if (!widthEnabled && canAutoWidth(scale)) {
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
        var paginationFilter = function(page, direction) {
            page = parseInt(page, 10);
            direction = parseInt(direction, 10);

            if (page === 0) {
                if (direction === 1) {
                    if (scope.currentPage < scope.pagination.length) {
                        scope.currentPage++;
                    }
                } else {
                    if (scope.currentPage > 1) {
                        scope.currentPage--;
                    }
                }
            } else {
                if (scope.currentPage !== page) {
                    scope.currentPage = page;
                }
            }

            scope.departmentMenuDefault = { name: 'Select', order: 0 };
            scope.options.filterRow = 'page-' + scope.currentPage.toString();
        };
        var jumpToDate = function(date) {
            var from = scope.api.gantt.columnsManager.getFirstColumn().date.clone();
            var lastColumn = moment(scope.api.gantt.columnsManager.getLastColumn().date.format(), 'YYYY-MM-DDTHH:mm:ss');
            if (date === undefined) {
                date = scope.options.currentDateValue;
            }
            var position = Math.ceil(objectModel.api.gantt.getPositionByDate(date) + scope.api.gantt.scroll.getWidth() * scope.configuration.scrollToOffset);
            if (objectModel.api.gantt.getDateByPosition(position) > lastColumn) {
                _jumpTrigger = true;
                scope.api.gantt.columnsManager.generateColumns(from, objectModel.api.gantt.getDateByPosition(position));
            } else {
                _jumpTrigger = false;
                scope.api.gantt.scroll.scrollTo(position);
            }
        };
        var alertJumpToTask = function(id) {
            if (false === (('t'+id) in scope.tasksMap)) {
                angular.element(window).alert('The \''+id+'\' task does not exists!');
            } else {
                scope.tasksMap[('t'+id)].model.highlight = true;
                scope.jumpToDate(scope.tasksMap[('t'+id)].model.from);
            }
        };

        var allowMovingCondition = function() {
            return !scope.options.readOnly;
        };
        var allowRowSwitchingCondition = function(sourceRow, targetRow, task) {
            if (scope.options.readOnly === true) {
                return false;
            } else {
                if (Matt.switchMachineCondition !== undefined && typeof(Matt.switchMachineCondition) === 'function') {
                    return Matt.switchMachineCondition(sourceRow, targetRow, task);
                } else {
                    return false;
                }
            }
        };
        var dataToRemove = function(data) {
            scope.api.data.remove(data);
        };
        var closeTaskEditor = function() {
            scope.options.draw = false;
            if (Object.keys(scope.editTask).length > 0) {
                if (scope.editTask.modifyType === 'create' && scope.editTask.check === false) {
                    if ('t'+scope.editTask.id in scope.tasksMap) {
                        delete scope.tasksMap['t'+scope.editTask.id];
                    }
                    if (scope.editTask.drawTask === true) {
                        var rowIndex = (function(scope) {
                            for (var i = 0, l = scope.data.length; i < l; i++) {
                                if (scope.data[i].id === scope.editTask.runOnMachineId) {
                                    return i;
                                }
                            }
                            return false;
                        })(scope);
                        objectModel.api.gantt.rowsManager.rows[rowIndex].removeTask(scope.editTask.id, false, true);
                    }
                }
                scope.editTask.modal.hide();
            }
            scope.editTask = {};
        };
        var checkTaskData = function() {
            if (scope.editTask !== undefined) {
                var i, k, l;
                // Initialize the datetime with moment.
                scope.editTask.expectedStartTime = scope.editTask.expectedStartTime === null ? null : typeof(scope.editTask.expectedStartTime) === 'object' ? moment((new Date(scope.editTask.expectedStartTime)).getTime(), 'x') : moment(scope.editTask.expectedStartTime, 'YYYY-MM-DDTHH:mm:ss');
                scope.editTask.expectedSetupFinishTime = scope.editTask.expectedSetupFinishTime === null ? null : typeof(scope.editTask.expectedSetupFinishTime) === 'object' ? moment((new Date(scope.editTask.expectedSetupFinishTime)).getTime(), 'x') : moment(scope.editTask.expectedSetupFinishTime, 'YYYY-MM-DDTHH:mm:ss');
                scope.editTask.expectedFinishTime = scope.editTask.expectedFinishTime === null ? null : typeof(scope.editTask.expectedFinishTime) === 'object' ? moment((new Date(scope.editTask.expectedFinishTime)).getTime(), 'x') : moment(scope.editTask.expectedFinishTime, 'YYYY-MM-DDTHH:mm:ss');
                scope.editTask.actualStartTime = scope.editTask.actualStartTime === null ? null : typeof(scope.editTask.actualStartTime) === 'object' ? moment((new Date(scope.editTask.actualStartTime)).getTime(), 'x') : moment(scope.editTask.actualStartTime, 'YYYY-MM-DDTHH:mm:ss');
                scope.editTask.actualSetupFinishTime = scope.editTask.actualSetupFinishTime === null ? null : typeof(scope.editTask.actualSetupFinishTime) === 'object' ? moment((new Date(scope.editTask.actualSetupFinishTime)).getTime(), 'x') : moment(scope.editTask.actualSetupFinishTime, 'YYYY-MM-DDTHH:mm:ss');
                scope.editTask.actualFinishTime = scope.editTask.actualFinishTime === null ? null : typeof(scope.editTask.actualFinishTime) === 'object' ? moment((new Date(scope.editTask.actualFinishTime)).getTime(), 'x') : moment(scope.editTask.actualFinishTime, 'YYYY-MM-DDTHH:mm:ss');

                if (scope.tasksMap['t' + scope.editTask.id] === undefined) {
                    scope.editTask.taskGroupIdsVo = [];
                } else {
                    scope.editTask.taskGroupIdsVo = scope.tasksMap['t' + scope.editTask.id].model.taskGroupIdsVo;
                }

                var result = Matt.addTaskData(scope.editTask), task;
                var rowIndex = (function(scope) {
                    for (i = 0, l = scope.data.length; i < l; i++) {
                        if (scope.data[i].id === scope.editTask.runOnMachineId) {
                            return i;
                        }
                    }
                    return false;
                })(scope);

                if (result.state === 'ok') {
                    var task = angular.copy(TaskEditor.taskTemplate);
                    task.id = scope.editTask.id;
                    task.color = scope.editTask.color;
                    task.oid = scope.editTask.id;
                    task.name = scope.editTask.operationCode;
                    task.from = typeof(scope.editTask.expectedStartTime) === 'object' ? moment((new Date(scope.editTask.expectedStartTime)).getTime(), 'x') : moment(scope.editTask.expectedStartTime, 'YYYY-MM-DDTHH:mm:ss');
                    task.to = typeof(scope.editTask.expectedFinishTime) === 'object' ? moment((new Date(scope.editTask.expectedFinishTime)).getTime(), 'x') : moment(scope.editTask.expectedFinishTime, 'YYYY-MM-DDTHH:mm:ss');
                    task.operationCode = scope.editTask.operationCode;
                    task.processingType = scope.editTask.processingType;
                    task.quantity = parseInt(scope.editTask.quantity, 10);
                    task.new = scope.tasksMap[('t' + scope.editTask.id)] !== undefined ? scope.tasksMap[('t' + scope.editTask.id)].model.new : true;
                    task.delete = false;
                    task.finished = scope.editTask.isFinish === '1' ? true : false;
                    task.pin = scope.editTask.isPin === '1' ? true : false;
                    task.inProcessing = scope.editTask.inProcessing === '1' ? true : false;
                    task.previousOperation = scope.editTask.previousTaskId;
                    task.nextOperations = [scope.editTask.nextTaskId];
                    task.runOnMachineId = scope.editTask.runOnMachineId;
                    task.actualRunOnMachineId = scope.editTask.actualRunOnMachineId;
                    task.machineShiftLabel = scope.editTask.machineShiftLabel;
                    task.parallelCode = scope.editTask.parallelCode;
                    task.pendingMinutes = scope.editTask.pendingMinutes;
                    task.expectedMoldId = scope.editTask.expectedMoldId;
                    task.capacity = parseInt(scope.editTask.capacity, 10);
                    task.face = scope.editTask.face;
                    task.priority = parseInt(scope.editTask.priority, 10);
                    task.rounds = parseInt(scope.editTask.rounds, 10);
                    task.up = parseInt(scope.editTask.up, 10);
                    task.lock = scope.editTask.lock === '1' ? true : false;
                    task.lockColor = scope.configuration.lockColor;
                    task.sheetUp = parseInt(scope.editTask.sheetUp, 10);
                    task.part = scope.editTask.part;
                    task.s2sMins = parseInt(scope.editTask.s2sMins, 10);
                    task.timeclockEmployeeId = parseInt(scope.editTask.timeclockEmployeeId, 10);
                    task.expectedStartTime = scope.editTask.expectedStartTime;
                    task.expectedSetupFinishTime = scope.editTask.expectedSetupFinishTime;
                    task.expectedFinishTime = scope.editTask.expectedFinishTime;
                    task.actualStartTime = scope.editTask.actualStartTime;
                    task.actualSetupFinishTime = scope.editTask.actualSetupFinishTime;
                    task.actualFinishTime = scope.editTask.actualFinishTime;
                    task.actualQuantity = scope.editTask.actualQuantity;
                    task.weight = scope.editTask.weight;

                    if (task.lock === true) {
                      task.lockColor = task.color;
                      task.color = scope.configuration.lockColor;
                    }

                    task.job = undefined;
                    for (i = 0, k = Object.keys(scope.jobsMap), l = k.length; i < l; i++) {
                        if (scope.jobsMap[k[i]].comboId === scope.editTask.comboId) {
                            task.job = angular.copy(scope.jobsMap[k[i]]);
                            break;
                        }
                    }
                    if (task.job === undefined) {
                        task.job = {
                            comboId: scope.editTask.comboId,
                            comboQuantity: 0,
                            comboType: null,
                            id: 0,
                            poNo: scope.editTask.poNo
                        };
                    }
                    task.process = undefined;
                    for (i = 0, k = Object.keys(scope.processesMap), l = k.length; i < l; i++) {
                        if (scope.processesMap[k[i]].id === scope.editTask.processId) {
                            task.process = {
                                id: scope.editTask.processId,
                                needWaitPrevProcess: scope.processesMap[k[i]].needWaitPrevProcess,
                                operations: scope.processesMap[k[i]].operations,
                                previousProcesses: scope.processesMap[k[i]].previousProcesses,
                                productId: scope.editTask.productId
                            };
                            break;
                        }
                    }
                    if (task.process === undefined) {
                        task.process = {
                            id: scope.editTask.processId,
                            needWaitPrevProcess: null,
                            operations: [],
                            previousProcesses: [],
                            productId: scope.editTask.productId
                        };
                    }

                    if (scope.editTask.tooltip.length === 0) {
                        task.tooltip = (function(rowIndex) {
                            var tooltip = [];
                            for (var i = 0, l = objectModel.api.gantt.rowsManager.rows[rowIndex].model.title.length; i < l; i++) {
                                tooltip.push('N');
                            }
                            return tooltip;
                        })(rowIndex);
                    } else {
                        task.tooltip = scope.editTask.tooltip;
                    }
                    task.movable = {
                        enabled: Events.movableEnableCondition(task),
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
                     * task.newPriority = scope.tasksMap['t' + scope.editTask.id].model.newPriority;
                     */
                    if (scope.tasksMap['t' + scope.editTask.id] === undefined) {
                        task.taskGroupIdsVo = [];
                        task.taskGroup = '';
                        task.gangLinkCode = '';
                        task.gangLinkSide = '';
                        task.cut = false;
                        task.cutQuantity = 0;
                        task.dataOutOfDate = false;
                    } else {
                        task.taskGroupIdsVo = scope.tasksMap['t' + scope.editTask.id].model.taskGroupIdsVo;
                        task.taskGroup = scope.tasksMap['t' + scope.editTask.id].model.taskGroup;
                        task.gangLinkCode = scope.tasksMap['t' + scope.editTask.id].model.gangLinkCode;
                        task.gangLinkSide = scope.tasksMap['t' + scope.editTask.id].model.gangLinkSide;
                        task.cut = scope.tasksMap['t' + scope.editTask.id].model.cut;
                        task.cutQuantity = scope.tasksMap['t' + scope.editTask.id].model.cutQuantity;
                        task.dataOutOfDate = scope.tasksMap['t' + scope.editTask.id].model.dataOutOfDate;
                    }

                    scope.editTask.check = true;
                    if (scope.editTask.drawTask === false) {
                        objectModel.api.gantt.rowsManager.rows[rowIndex].addTask(task);
                    }


                    $alert({
                        title: 'Success!<br>',
                        content: 'The task save success.',
                        placement: 'top',
                        type: 'info',
                        duration: scope.configuration.alertTimeout,
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
                        type: 'danger',
                        duration: scope.configuration.alertTimeout,
                        dismissable: true,
                        html: true,
                        container: '#gantt-editor-alert',
                        show: true
                    });
                }
            }
        };

        // Save or Calculate buttons
        var saveGanttData = function(type) {
            var mattCallback = Matt.saveOrCalcGanttData(), machine = {}, machines = [], _taskModel;

            scope._saveGanttModal = $modal({
                scope: scope,
                title: 'Processing',
                content: 'Waiting for server response...',
                backdrop: false,
                keyboard: false,
                templateUrl: '../app/views/processing.tpl.html',
                placement: 'center',
                show: false
            });
            scope._saveGanttModal.$promise.then(scope._saveGanttModal.show);
            $timeout(function() {
                for (var i = 0, m = scope.data, l = m.length; i < l; i++) {
                    if (m[i].tasks.length > 0) {
                        machine = {
                            machine: angular.copy({
                                id: m[i].id,
                                settingsMachine: m[i].settingsMachine,
                                factoryOperation: m[i].factoryOperation,
                                title: m[i].title.join(scope.configuration.tooltipSeparator),
                                currentTimeWorks: m[i].currentTimeWorks,
                                online: m[i].online
                            }),
                            operationQueue: []
                        };
                        for (var j = 0, t = m[i].tasks, q = t.length; j < q; j++) {
                            _taskModel = angular.copy(scope.tasksMap['t'+t[j].id].model);

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
                                quantity: parseInt(_taskModel.quantity, 10),
                                actualQuantity: parseInt(_taskModel.actualQuantity, 10),
                                processingType: _taskModel.processingType,
                                factoryOperation: _taskModel.factoryOperation,
                                pin: _taskModel.pin,
                                capacity: parseInt(_taskModel.capacity, 10),
                                s2sMins: parseInt(_taskModel.s2sMins, 10),
                                up: parseInt(_taskModel.up, 10),
                                sheetUp: parseInt(_taskModel.sheetUp, 10),
                                face: _taskModel.face,
                                lock: _taskModel.lock,
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
                                tooltip: _taskModel.tooltip.join(scope.configuration.tooltipSeparator),
                                color: _taskModel.color,
                                timeclockEmployeeId: parseInt(_taskModel.timeclockEmployeeId, 10),
                                rounds: parseInt(_taskModel.rounds, 10),
                                taskGroup: _taskModel.taskGroup,
                                taskGroupIdsVo: _taskModel.taskGroupIdsVo,
                                machineShiftLabel: _taskModel.machineShiftLabel,
                                new: _taskModel.new,
                                weight: _taskModel.weight,
                                cut: _taskModel.cut,
                                cutQuantity: _taskModel.cutQuantity,
                                dataOutOfDate: _taskModel.dataOutOfDate
                            });
                        }
                        machines.push(machine);
                    }
                }
                $http({
                    method: 'post',
                    responseType: 'json',
                    url: scope.configuration.serverLocation + scope.configuration.confirmGanttUrl,
                    timeout: scope.configuration.saveGanttDataTimeout * 1000,
                    data: machines,
                    params: {
                        calculate: true,
                        calculateFrom: moment.utc(scope.api.gantt.columnsManager.getFirstColumn().date.format(), 'YYYY-MM-DDTHH:mm:ss').format('YYYY-MM-DDTHH:mm:ss'),
                        calculateWeeks: scope.configuration.calculateWeeks,
                        lastCalculateTime: moment.utc(scope.options.lastCalculateTime).format('YYYY-MM-DDTHH:mm:ss'),
                        solveStrategy: scope.options.solveStrategy,
                        currentTime: moment.utc(scope.options.currentDateValue).format('YYYY-MM-DDTHH:mm:ss'),
                        save: type === 'save' ? true : false
                    }
                }).then(function(response) {
                    scope._saveGanttModal.hide();
                    $log.info('[INFO] Success response.');
                    var result = mattCallback.success(response);
                    var content = result.messages.content.replace(/<focusTask>([^<]*)<\/focusTask>/gim, '<a class="highlight-task" ng-click="alertJumpToTask(\'$1\');">$1</a>');

                    if (result.readonly !== undefined && (result.readonly === true || result.readonly === 'true')) {
                        scope.options.readOnly = true;
                    }
                    if (result.currentTime !== undefined && result.currentTime !== '') {
                        scope.options.currentDateValue = moment(result.currentTime, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
                    }
                    if (result.calculateWeeks !== undefined && result.calculateWeeks !== '') {
                        scope.configuration.calculateWeeks = parseInt(result.calculateWeeks);
                    }
                    if (result.lastCalculateTime !== undefined && result.lastCalculateTime !== '') {
                        scope.configuration.lastCalculateTime = moment(result.lastCalculateTime, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
                    }

                    if (result.state === 'ok' && result.data.machines !== undefined && result.data.machines.length > 0) {
                        var promise = scope.clear();
                        promise.then(function() {
                            $log.info('[INFO] Clear and readyToGo.');
                            readyToGo(angular.copy(result.data));
                        });

                        if (scope._ganttAlertBox !== undefined) {
                            scope._ganttAlertBox.hide();
                        }
                        scope._ganttAlertBox = $alert({
                            scope: scope,
                            title: result.messages.title,
                            content: content,
                            templateUrl: '../app/views/alert.tpl.html',
                            placement: 'top',
                            type: 'info',
                            duration: scope.configuration.alertTimeout,
                            dismissable: true,
                            html: true,
                            container: '#gantt-chart-alert',
                            show: true
                        });
                    } else {
                        scope._saveGanttModal.hide();
                        if (scope._ganttAlertBox !== undefined) {
                            scope._ganttAlertBox.hide();
                        }
                        scope._ganttAlertBox = $alert({
                            scope: scope,
                            title: 'ERROR! '+result.messages.title,
                            content: content,
                            templateUrl: '../app/views/alert.tpl.html',
                            placement: 'top',
                            type: 'danger',
                            duration: scope.configuration.alertTimeout,
                            dismissable: true,
                            html: true,
                            container: '#gantt-chart-alert',
                            show: true
                        });
                    }
                }, function(response) {
                    scope._saveGanttModal.hide();
                    $log.info('[INFO] Error response.');
                    var result = mattCallback.error(response);
                    var content = result.messages.content.replace(/<focusTask>([^<]*)<\/focusTask>/gim, '<a class="highlight-task" ng-click="alertJumpToTask(\'$1\')">$1</a>');

                    if (result.readonly !== undefined && (result.readonly === true || result.readonly === 'true')) {
                        scope.options.readOnly = true;
                    }
                    if (result.currentTime !== undefined && result.currentTime !== '') {
                        scope.options.currentDateValue = moment(result.currentTime, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
                    }
                    if (result.calculateWeeks !== undefined && result.calculateWeeks !== '') {
                        scope.configuration.calculateWeeks = parseInt(result.calculateWeeks);
                    }
                    if (result.lastCalculateTime !== undefined && result.lastCalculateTime !== '') {
                        scope.configuration.lastCalculateTime = moment(result.lastCalculateTime, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
                    }

                    if (scope._ganttAlertBox !== undefined) {
                        scope._ganttAlertBox.hide();
                    }
                    scope._ganttAlertBox = $alert({
                        scope: scope,
                        title: 'ERROR! '+result.messages.title,
                        content: content,
                        templateUrl: '../app/views/alert.tpl.html',
                        placement: 'top',
                        type: 'info',
                        duration: scope.configuration.alertTimeout,
                        dismissable: true,
                        html: true,
                        container: '#gantt-chart-alert',
                        show: true
                    });

                    Harvard.getGanttDataCalc().then(function(response) {
                        $log.info('[TEST] Original Calc Data', response);
                        readyToGo(response.data);
                    });
                });
            });
        };

        var readyToGo = function(originalData) {
            var obj, task, i, j, l, m, q, t, p;

            if (originalData.machines === undefined || originalData.machines.length === 0) {
                if (scope._saveGanttModal !== undefined) {
                    scope._saveGanttModal.hide();
                }
                scope._ganttAlertBox = $alert({
                    scope: scope,
                    title: 'ERROR!',
                    content: 'The structure of gantt JSON are wrong, cannot render the GUI.',
                    placement: 'top',
                    type: 'danger',
                    duration: scope.configuration.alertTimeout,
                    dismissable: true,
                    html: true,
                    container: '#gantt-chart-alert',
                    show: true
                });
                return false;
            }

            if (originalData.readOnly !== undefined && (originalData.readOnly === true || originalData.readOnly === 'true')) {
                scope.options.readOnly = true;
            }
            if (originalData.currentTime !== undefined && originalData.currentTime !== '') {
                scope.options.currentDateValue = moment(originalData.currentTime, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
            }
            if (originalData.calculateWeeks !== undefined && originalData.calculateWeeks !== '') {
                scope.configuration.calculateWeeks = parseInt(originalData.calculateWeeks);
            }
            if (originalData.lastCalculateTime !== undefined && originalData.lastCalculateTime !== '') {
                scope.options.lastCalculateTime = moment(originalData.lastCalculateTime, 'YYYY-MM-DDTHH:mm:ss.SSSZ');
            }
            if (originalData.solveStrategy !== undefined && originalData.solveStrategy !== '') {
                scope.options.solveStrategy = originalData.solveStrategy;
            }

            $log.info('[INFO]', scope.options.solveStrategy);
            $log.info('[Event] Beginning parse JSON data.');
            for (i = 0, m = originalData.machines, l = m.length; i < l; i++) {
                // if (m[i].operationQueue.length === 0) continue;

                // Prepare row machine data
                obj = {
                    id: m[i].machine.id,
                    name: m[i].machine.settingsMachine.name,
                    dept: m[i].machine.settingsMachine.dept,
                    sortable: false,
                    settingsMachine: m[i].machine.settingsMachine,
                    factoryOperation: m[i].machine.factoryOperation,
                    title: m[i].machine.title.split(scope.configuration.tooltipSeparator),
                    currentTimeWorks: m[i].machine.currentTimeWorks,
                    online: m[i].machine.online,
                    rowContextMenu: '../app/views/rowContextMenu.tpl.html',
                    tasks: []
                };

                if (m[i].operationQueue.length > 0) {
                    for (j = 0, t = m[i].operationQueue, q = t.length; j < q; j++) {
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
                            color: (t[j].lock && t[j].lock === true) ? scope.configuration.lockColor : t[j].color,
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
                            actualRunOnMachineId: t[j].actualRunOnMachineId || 0,
                            quantity: t[j].quantity,
                            actualQuantity: t[j].actualQuantity,
                            processingType: t[j].processingType,
                            factoryOperation: t[j].factoryOperation,
                            pin: t[j].pin,
                            cut: t[j].cut,
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
                            tooltip: t[j].tooltip ? t[j].tooltip.split(scope.configuration.tooltipSeparator) : [],
                            timeclockEmployeeId: t[j].timeclockEmployeeId,
                            rounds: t[j].rounds,
                            part: t[j].part,
                            taskGroup: t[j].taskGroup,
                            machineShiftLabel: t[j].machineShiftLabel,
                            new: t[j].new,
                            lock: t[j].lock || false,
                            lockColor: scope.configuration.lockColor,
                            highlight: false,
                            loaded: moment(),
                            movable: {
                                enabled: Events.movableEnableCondition(t[j]),
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
                            weight: t[j].weight >= 0 || t[j].weight === '0' ? t[j].weight : 999,
                            gangLinkCode: t[j].gangLinkCode,
                            gangLinkSide: t[j].gangLinkSide,
                            cutQuantity: t[j].cutQuantity,
                            dataOutOfDate: t[j].dataOutOfDate
                        };

                        // Prepare processesMap
                        if (('p'+t[j].process.id in scope.processesMap) === false) {
                            scope.processesMap['p'+t[j].process.id] = {
                                id: t[j].process.id,
                                needWaitPrevProcess: t[j].process.needWaitPrevProcess,
                                operations: t[j].process.operations,
                                previousProcesses: t[j].process.previousProcesses,
                                nextProcesses: [],
                                productId: t[j].process.productId
                            };
                        }

                        // Prepare jobsMap and jobTasksMap
                        if (('j'+t[j].job.id in scope.jobsMap) === false) {
                            scope.jobsMap['j'+t[j].job.id] = t[j].job;
                            scope.jobTasksMap['j'+t[j].job.id] = [];
                        }
                        // Prepare jobTasksMap
                        scope.jobTasksMap['j'+t[j].job.id].push(t[j].id);

                        // Prepare taskGroups
                        if (t[j].taskGroup !== '' && ('g'+t[j].taskGroup in scope.taskGroups) === false) {
                            scope.taskGroups['g'+t[j].taskGroup] = [];
                        }
                        if (t[j].taskGroup !== '') {
                            scope.taskGroups['g'+t[j].taskGroup].push(t[j].id);
                        }

                        obj.tasks.push(task);
                    }
                }

                if (('m'+m[i].machine.id in scope.machinesMap) === false) {
                    scope.machinesMap['m'+m[i].machine.id] = obj;
                }

                // Prepare department data
                if ((obj.dept.name.replace(/ /gi, '-') in scope.departmentsMap) === false) {
                    scope.departmentsMap[obj.dept.name.replace(/ /gi, '-')] = {
                        id: obj.dept.id,
                        name: obj.dept.name,
                        order: obj.dept.sortBy,
                        sub: {}
                    };
                    scope.departmentMenu.push({ name: obj.dept.name, order: obj.dept.sortBy });
                }
                if (obj.dept.subDept !== '' && (obj.dept.subDept.replace(/ /gi, '-') in scope.departmentsMap[obj.dept.name.replace(/ /gi, '-')].sub) === false) {
                    scope.departmentsMap[obj.dept.name.replace(/ /gi, '-')].sub[obj.dept.subDept.replace(/ /gi, '-')] = {
                        id: obj.dept.id,
                        name: obj.dept.subDept,
                        order: obj.dept.sortBy
                    };
                }
                scope.data.push(obj);
            }
            scope.departmentMenu.sort(function(a, b) {
                return a.order - b.order;
            });
            // Pagination the machines
            q = Object.keys(scope.machinesMap);
            p = 1;
            for (i = 0, l = q.length; i < l; i++) {
                if (i > 0 && i % scope.paginationPrePage === 0) {
                    p++;
                    scope.pagination.push(p);
                }
                scope.machinesMap[q[i]].dept.page = p;
            }

            // Connect the processesMap
            for (p in scope.processesMap) {
                if (scope.processesMap[p].previousProcesses.length > 0) {
                    for (i = 0, m = scope.processesMap[p].previousProcesses, l = m.length; i < l; i++) {
                        if ('p'+m[i] in scope.processesMap) {
                            scope.processesMap['p'+m[i]].nextProcesses.push(scope.processesMap[p].id);
                        }
                    }
                }
            }
            scope.timespans = Harvard.getGanttTimespans();
            scope.options.filterRow = 'page-1';

            $timeout(function() {
                if (scope._saveGanttModal !== undefined) {
                    scope._saveGanttModal.hide();
                }
                scope.$digest();
            }, 1000);
        };

        return {
            initialize: function(_scope) {
                scope = _scope;
                return {
                    mode: 'custom',
                    scale: '3 hours',
                    sortMode: undefined,
                    sideMode: 'Table',
                    columns: ['model.name'],
                    // treeTableColumns: ['from', 'to'],
                    columnsHeaders: {'model.name' : 'Name'},
                    columnsClasses: {'model.name' : 'gantt-column-name'},
                    columnsFormatters: {
                        'from': function(from) {
                            return from !== undefined ? from.format('lll') : undefined;
                        },
                        'to': function(to) {
                            return to !== undefined ? to.format('lll') : undefined;
                        }
                    },
                    zoom: 1,
                    maxHeight: false,
                    width: false,
                    autoExpand: 'right',
                    taskOutOfRange: 'truncate',
                    fromDate: undefined,
                    toDate: undefined,
                    labelsEnabled: true,
                    allowSideResizing: true,
                    currentDate: 'line',
                    currentDateValue: moment(),
                    draw: false,
                    readOnly: false,
                    solveStrategy: _scope.configuration.solveStrategy,
                    groupDisplayMode: 'group',
                    filterTask: '',
                    filterRow: '',
                    jumpToDate: moment(),
                    options: {
                        taskContent: $templateCache.get('../app/views/taskContent.tpl.html'),
                        sideWidth: 200
                    },
                    filterRowComparator: function(actual, expected) {
                        if (actual !== undefined && expected !== undefined) {
                            if (_scope.departmentMenuDefault.name !== 'Select' && _scope.subDepartmentMenuDefault.name !== 'Select') {
                                if (actual.code === _scope.departmentMenuDefault.name + '_' + _scope.subDepartmentMenuDefault.name) {
                                    return true;
                                }
                            } else {
                                var _code = actual.code.split('_'),
                                    _page = parseInt(expected.replace('page-', ''), 10);
                                if (_code[0] === expected || _code[1] === expected || _page === actual.page) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    },
                    timeFrames: {
                        'weekend': {
                            working: false
                        }
                    },
                    dateFrames: {
                        'weekend': {
                            evaluator: function(date) {
                                return date.isoWeekday() === 6 || date.isoWeekday() === 7;
                            },
                            targets: ['weekend']
                        }
                    },
                    timeFramesNonWorkingMode: 'visible',
                    columnMagnet: '1 minute',
                    // shiftColumnMagnet: '',
                    timeFramesMagnet: true,
                    canDraw: function(event) {
                        var isLeftMouseButton = event.button === 0 || event.button === 1;
                        return _scope.options.draw && !_scope.options.readOnly && isLeftMouseButton;
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

                        if (false === ('t'+task.id in _scope.tasksMap)) {
                            _scope.tasksMap['t'+task.id] = task;
                        }
                        return task;
                    },
                    api: function(api) {
                        // API Object is used to control methods and events from angular-gantt.
                        _scope.api = api;

                        api.core.on.ready(_scope, function() {
                            // Log various events to console
                            api.scroll.on.scroll(_scope, Events.logScrollEvent);

                            api.tasks.on.add(_scope, Events.addEventName('tasks.on.add', Events.logTaskEvent));
                            api.tasks.on.change(_scope, Events.addEventName('tasks.on.change', Events.logTaskEvent));
                            api.tasks.on.rowChange(_scope, Events.addEventName('tasks.on.rowChange', Events.logTaskEvent));
                            api.tasks.on.remove(_scope, Events.addEventName('tasks.on.remove', Events.logTaskEvent));

                            if (api.tasks.on.moveBegin) {
                                api.tasks.on.moveBegin(_scope, Events.addEventName('tasks.on.moveBegin', Events.moveTaskBeginEvent));
                                api.tasks.on.move(_scope, Events.addEventName('tasks.on.move', Events.movingTaskEvent));
                                api.tasks.on.moveEnd(_scope, Events.addEventName('tasks.on.moveEnd', Events.moveTaskEndEvent));
                                api.tasks.on.resizeEnd(_scope, Events.addEventName('tasks.on.resizeEnd', Events.drawResizeEndEvent));
                            }

                            api.rows.on.add(_scope, Events.addEventName('rows.on.add', Events.logRowEvent));
                            api.rows.on.change(_scope, Events.addEventName('rows.on.change', Events.logRowEvent));
                            api.rows.on.move(_scope, Events.addEventName('rows.on.move', Events.logRowEvent));
                            api.rows.on.remove(_scope, Events.addEventName('rows.on.remove', Events.logRowEvent));
                            api.columns.on.generate(_scope, Events.logColumnsGenerateEvent);

                            api.rows.on.filter(_scope, Events.logRowsFilterEvent);
                            _scope.load();

                            // Add some DOM events
                            api.directives.on.new(_scope, function(directiveName, directiveScope, element) {
                                if (directiveName === 'ganttTask') {
                                    // Add the highlight box-shadow.
                                    var highlightScope = directiveScope.$new();
                                    var ifElement = $document[0].createElement('div');
                                    angular.element(ifElement).attr('class', 'gantt-task gantt-task-highlight').attr('data-ng-if', 'task.model.highlight');
                                    element.append($compile(ifElement)(highlightScope));

                                    element.bind('click', function(evt) {
                                        evt.stopPropagation();
                                        if (evt.shiftKey === true) {
                                            if (Events.multipleTaskSelected.indexOf(directiveScope.task.model.id) < 0) {
                                                Events.multipleTaskSelected.push(directiveScope.task.model.id);
                                            }
                                            directiveScope.task.model.highlight = true;
                                        } else {
                                            Events.multipleTaskSelected = [];
                                            if (directiveScope.task.model.highlight) {
                                                 directiveScope.task.model.highlight = false;
                                            }
                                        }
                                        directiveScope.$digest();

                                        Events.logTaskEvent('task-click', directiveScope.task);
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
                                } else if (directiveName === 'ganttRow') {
                                    element.bind('click', function(evt) {
                                        evt.stopPropagation();
                                        Events.logRowEvent('row-click', directiveScope.row);
                                    });
                                } else if (directiveName === 'ganttRowLabel') {
                                    directiveScope.autoExpand = {
                                        width: (directiveScope.row.model.title.length * 10 + 33) + 'em'
                                    };
                                    directiveScope.showTaskUI2 = function(model) {
                                        if (model.delete === true || model.finished === true) {
                                            return false;
                                        }
                                        return true;
                                    };
                                    directiveScope.readOnly = function(model) {
                                        if (_scope.options.readOnly === false) {
                                            if (model !== undefined) {
                                                if (model.inProcessing === true || model.finished === true) {
                                                    return true;
                                                }
                                            }
                                        }
                                        return _scope.options.readOnly;
                                    };
                                    directiveScope.taskColoured = function(bgColor, textColor) {
                                        return {
                                            background: bgColor,
                                            color: textColor
                                        };
                                    };
                                    directiveScope.renderHtml = function(text) {
                                        text = text.replace(/\r\n/g, '<br>');
                                        text = text.replace(/\n/g, '<br>');
                                        return $sce.trustAsHtml(text);
                                    };
                                    directiveScope.tasksOnMachine = $modal({
                                        scope: directiveScope,
                                        title: directiveScope.row.model.settingsMachine.name + ' ['+directiveScope.row.model.settingsMachine.code+']',
                                        templateUrl: '../app/views/machine.tpl.html',
                                        backdrop: false,
                                        placement: 'center',
                                        show: false
                                    });
                                    element.bind('dblclick', function(evt) {
                                        evt.stopPropagation();
                                        directiveScope.row.tasks.sort(function(a, b) { return a.model.from - b.model.from; });
                                        directiveScope.tasksOnMachine.$promise.then(directiveScope.tasksOnMachine.show);
                                    });
                                }
                            });
                            objectModel = new ObjectModel(api);
                            Events.initialize(_scope, objectModel);
                            Events.logReadyEvent(api);
                        });
                    }
                };
            },
            paginationFilter: paginationFilter,
            jumpToDate: jumpToDate,
            canAutoWidth: canAutoWidth,
            getColumnWidth: getColumnWidth,
            closeTaskEditor: closeTaskEditor,
            checkTaskData: checkTaskData,
            readyToGo: readyToGo,
            saveGanttData: saveGanttData,
            dataToRemove: dataToRemove,
        }
}]);