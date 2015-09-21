'use strict';

/**
 * @ngdoc service
 * @name HarvardApp.Harvard
 * @description
 * # Harvard
 * Service in the HarvardApp.
 */
angular.module('HarvardApp')
    .service('Events', ['$http', '$log', '$timeout', '$modal', '$alert', 'ganttUtils', 'Coloured', 'Harvard', 'Matt', 'TaskEditor', 'moment',
    function Events($http, $log, $timeout, $modal, $alert, utils, Coloured, Harvard, Matt, TaskEditor, moment) {

        var editTaskModalOptions = TaskEditor.editTaskModalOptions;
        var i, k, l, _movingTask, objectModel, _jumpTrigger = false;
        var multipleTaskSelected = [], scope;

        var movableEnableCondition = function(task) {
            if (scope.options.readOnly === true) {
                return false;
            } else {
                if (task === undefined || task instanceof MouseEvent) {
                    return !scope.options.readOnly;
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

        var editTaskHandleError = function(response) {
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
                    duration: scope.configuration.alertTimeout,
                    dismissable: true,
                    html: true,
                    container: '#gantt-editor-alert',
                    show: true
                });
            }

            var i, k, l, _clickFunc;
            switch(response.config.data) {
                case 'poFuzzySearch':
                    scope.editTask.poFuzzySearch = [];
                    var _poNo = [];
                    _clickFunc = function(poNo) {
                        return function(poNo) {
                            scope.editTask.poNo = poNo;
                            scope.editTask.fuzzyPoNo = poNo;
                        }.bind(this, poNo);
                    };
                    for (i = 0, k = Object.keys(scope.jobsMap), l = k.length; i < l; i++) {
                        if (_poNo.indexOf(scope.jobsMap[k[i]].poNo) < 0) {
                            scope.editTask.poFuzzySearch.push({
                                text: scope.jobsMap[k[i]].poNo,
                                click: _clickFunc.call(null, scope.jobsMap[k[i]].poNo)
                            });
                            _poNo.push(scope.jobsMap[k[i]].poNo);
                        }
                    }
                break;
                case 'getPoUrl':
                    scope.editTask.poId = scope.editTask.poNo;
                break;
                case 'getComboUrl':
                    scope.editTask.comboList = [];
                    for (i = 0, k = Object.keys(scope.jobsMap), l = k.length; i < l; ++i) {
                        if (scope.jobsMap[k[i]].poNo === scope.editTask.poNo) {
                            scope.editTask.comboList.push({
                                label: scope.jobsMap[k[i]].comboId,
                                value: scope.jobsMap[k[i]].comboId
                            });
                        }
                    }
                break;
                case 'getProductUrl':
                    scope.editTask.productList = [];
                    var _productId = [];
                    for (i = 0, k = Object.keys(scope.processesMap), l = k.length; i < l; ++i) {
                        if (_productId.indexOf(scope.processesMap[k[i]].productId) < 0) {
                            scope.editTask.productList.push({
                                label: scope.processesMap[k[i]].productId,
                                value: scope.processesMap[k[i]].productId
                            });
                            _productId.push(scope.processesMap[k[i]].productId);
                        }
                    }
                break;
                case 'getProcessUrl':
                    scope.editTask.processList = [];
                    for (i = 0, k = Object.keys(scope.processesMap), l = k.length; i < l; ++i) {
                        if (scope.processesMap[k[i]].productId === scope.editTask.productId) {
                            scope.editTask.processList.push({
                                label: scope.processesMap[k[i]].id,
                                value: scope.processesMap[k[i]].id
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
                            scope.editTask.poFuzzySearch = [];
                            var _poNo = [];
                            _clickFunc = function(poNo) {
                                return function(poNo) {
                                    scope.editTask.poNo = poNo;
                                    scope.editTask.fuzzyPoNo = poNo;
                                }.bind(this, poNo);
                            };
                            for (i = 0, k = response.data.data, l = k.length; i < l; i++) {
                                if (_poNo.indexOf(k[i].value) < 0) {
                                    scope.editTask.poFuzzySearch.push({
                                        text: k[i].label,
                                        click: _clickFunc.call(null, k[i].value)
                                    });
                                    _poNo.push(k[i]);
                                }
                            }
                        break;
                        case 'getPoUrl':
                            scope.editTask.poId = response.data.data.id;
                        break;
                        case 'getComboUrl':
                            scope.editTask.comboList = [];
                            for (i = 0, k = response.data.data, l = k.length; i < l; ++i) {
                                scope.editTask.comboList.push({
                                    label: k[i].label,
                                    value: k[i].value
                                });
                            }
                        break;
                        case 'getProductUrl':
                            scope.editTask.productList = [];
                            var _productId = [];
                            for (i = 0, k = response.data.data, l = k.length; i < l; ++i) {
                                if (_productId.indexOf(k[i].value.productId) < 0) {
                                    scope.editTask.productList.push({
                                        label: k[i].label,
                                        value: k[i].value
                                    });
                                    _productId.push(k[i].value);
                                }
                            }
                        break;
                        case 'getProcessUrl':
                            scope.editTask.processList = [];
                            for (i = 0, k = response.data.data, l = k.length; i < l; ++i) {
                                scope.editTask.processList.push({
                                    label: k[i].label,
                                    value: k[i].value
                                });
                            }
                        break;
                        case 'getProductInfoUrl':
                            scope.editTask.comboList = [];
                            scope.editTask.comboList.push({
                                text: response.data.data.comboId,
                                click: function(comboId) {
                                    editTask.comboId = comboId;
                                }.bind(scope, response.data.data.comboId)
                            });
                            scope.editTask.productList = [];
                            scope.editTask.processList.push({
                                text: response.data.data.productId,
                                click: function(id) {
                                    editTask.productId = id;
                                }.bind(scope, response.data.data.productId)
                            });
                            scope.editTask.comboId = response.data.data.comboId;
                            scope.editTask.productId = response.data.data.productId;
                            scope.editTask.poNo = response.data.data.poNo;
                            scope.editTask.poId = response.data.data.poNo;
                        break;
                        default:
                            $alert({
                                title: 'Error!<br>',
                                content: 'Server JSON Data error.',
                                placement: 'top',
                                type: 'info',
                                duration: scope.configuration.alertTimeout,
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

        var drawResizeEndEvent = function(eventName, task) {
            scope.editTask = angular.copy(TaskEditor.editTaskTemplate);
            scope.editTask.id = task.model.id;
            scope.editTask.rowId = task.row.model.id;
            scope.editTask.runOnMachineId = task.row.model.id;
            scope.editTask.modifyType = 'create';
            scope.editTask.priority = Object.keys(scope.tasksMap).length + 1;
            scope.editTask.drawTask = true;
            scope.editTask.expectedStartTime = task.model.from.clone().format('YYYY/MM/DD HH:mm');
            scope.editTask.expectedSetupFinishTime = task.model.from.clone().add(1, 'm').format('YYYY/MM/DD HH:mm');
            scope.editTask.expectedFinishTime = task.model.to.clone().format('YYYY/MM/DD HH:mm');
            scope.editTask.modal = $modal(editTaskModalOptions);
        };
        var taskContextMenuEvent = function(type, task, evt) {
            evt.stopPropagation();
            var key, _clickFunc, _poNo = [], _productId = [];
            var _dropdown = angular.element(document.getElementById('taskmenu-'+task.model.id));
            if (_dropdown[0] !== undefined && _dropdown[0].classList !== undefined && _dropdown[0].classList.contains('open')) {
                _dropdown[0].classList.remove('open');
                task.contextMenuOnClose(task);
            }
            task.$element.css('z-index', task.model.priority);
            switch(type) {
                case 'cut':
                    if (scope.options.readOnly === false) {
                        scope.cutModalTask = task;
                        scope.taskCutQuantity = angular.copy(task.model.cutQuantity);
                        scope.taskCutStatus = angular.copy(task.model.cut);
                        if (scope.cutModal !== undefined) {
                            scope.cutModal.hide();
                            scope.cutModal = undefined;
                        }
                        var modalTitle ='Cut: ' + scope.cutModalTask.model.name +
                                        ' Round:' + scope.cutModalTask.model.rounds +
                                        ' Part:' + scope.cutModalTask.model.part +
                                        (scope.cutModalTask.model.new?' (Invent)':'');

                        scope.cutModal = $modal({
                            scope: scope,
                            title: modalTitle,
                            templateUrl: '../app/views/cutModal.tpl.html',
                            backdrop: false,
                            show: true
                        });
                    }
                break;
                case 'lock':
                    if (scope.options.readOnly === false) {
                        task.model.lock = !task.model.lock;

                        if (task.model.lock === true) {
                            task.model.pin = false;
                            task.model.lockColor = task.model.color;
                            task.model.color = scope.configuration.lockColor;
                            task.model.textColor = Coloured.isDarkColoured(scope.configuration.lockColor) ? '#ffffff' : '#000000';
                        } else {
                            task.model.color = task.model.lockColor;
                            task.model.textColor = Coloured.isDarkColoured(task.model.color) ? '#ffffff' : '#000000';
                        }
                    }
                break;
                case 'pin':
                    if (scope.options.readOnly === false) {
                        task.model.pin = !task.model.pin;
                        if (task.model.pin === true) {
                            if (task.model.lock === true) {
                                task.model.lock = false;
                                task.model.color = task.model.lockColor;
                                task.model.textColor = Coloured.isDarkColoured(task.model.color) ? '#ffffff' : '#000000';
                            }
                        }
                    }
                break;
                case 'edit':
                    if (scope.options.readOnly === false) {
                        // Calculate the expected setup finish datetime.
                        var _setupFinishTime = moment(task.model.expectedSetupFinishTime) + (task.model.from - moment(task.model.expectedStartTime));
                        _setupFinishTime = moment(_setupFinishTime).format('YYYY/MM/DD HH:mm');

                        scope.editTask = {
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
                            cut: task.model.cut,
                            lock: task.model.lock ? '1' : '0',
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
                        scope.editTask.poFuzzySearch = [];
                        scope.editTask.productList = [];
                        scope.editTask.comboList = [];
                        scope.editTask.processList = [];
                        _poNo = [];
                        _productId = [];
                        _clickFunc = function(poNo) {
                            return function(poNo) {
                                scope.editTask.poNo = poNo;
                                scope.editTask.fuzzyPoNo = poNo;
                            }.bind(this, poNo);
                        };
                        for (i = 0, k = Object.keys(scope.jobsMap), l = k.length; i < l; i++) {
                            if (_poNo.indexOf(scope.jobsMap[k[i]].poNo) < 0) {
                                scope.editTask.poFuzzySearch.push({
                                    text: scope.jobsMap[k[i]].poNo,
                                    click: _clickFunc.call(null, scope.jobsMap[k[i]].poNo)
                                });
                                _poNo.push(scope.jobsMap[k[i]].poNo);
                            }
                        }
                        for (i = 0, k = Object.keys(scope.jobsMap), l = k.length; i < l; ++i) {
                            if (scope.jobsMap[k[i]].poNo === scope.editTask.poNo) {
                                scope.editTask.comboList.push({
                                    label: scope.jobsMap[k[i]].comboId,
                                    value: scope.jobsMap[k[i]].comboId
                                });
                            }
                        }
                        for (i = 0, k = Object.keys(scope.processesMap), l = k.length; i < l; ++i) {
                            if (_productId.indexOf(scope.processesMap[k[i]].productId) < 0) {
                                scope.editTask.productList.push({
                                    label: scope.processesMap[k[i]].productId,
                                    value: scope.processesMap[k[i]].productId
                                });
                                _productId.push(scope.processesMap[k[i]].productId);
                            }
                        }
                        for (i = 0, k = Object.keys(scope.processesMap), l = k.length; i < l; ++i) {
                            if (scope.processesMap[k[i]].productId === scope.editTask.productId) {
                                scope.editTask.processList.push({
                                    label: scope.processesMap[k[i]].id,
                                    value: scope.processesMap[k[i]].id
                                });
                                break;
                            }
                        }

                        scope.editTask.modal = $modal(editTaskModalOptions);
                    }
                break;
                case 'create':
                    if (scope.options.readOnly === false) {
                        var _point = moment();
                        if (evt !== undefined) {
                            _point = evt.x - task.rowsManager.gantt.side.getWidth() + task.rowsManager.gantt.scroll.getScrollLeft() - 60;
                            _point = task.rowsManager.gantt.getDateByPosition(_point);
                        }
                        scope.editTask = angular.copy(TaskEditor.editTaskTemplate);
                        scope.editTask.id = utils.randomUuid();
                        scope.editTask.rowId = task.row.model.id;
                        scope.editTask.runOnMachineId = task.row.model.id;
                        scope.editTask.modifyType = type;
                        scope.editTask.priority = Object.keys(scope.tasksMap).length + 1;
                        scope.editTask.expectedStartTime = _point.clone().format('YYYY/MM/DD HH:mm');
                        scope.editTask.expectedSetupFinishTime = _point.clone().add(1, 'm').format('YYYY/MM/DD HH:mm');
                        scope.editTask.expectedFinishTime = _point.clone().add(2, 'm').format('YYYY/MM/DD HH:mm');
                        scope.editTask.modal = $modal(editTaskModalOptions);
                        scope.editTask.lock = '0';

                        scope.editTask.poFuzzySearch = [];
                        _poNo = [];
                        _clickFunc = function(poNo) {
                            return function(poNo) {
                                scope.editTask.poNo = poNo;
                                scope.editTask.fuzzyPoNo = poNo;
                            }.bind(this, poNo);
                        };
                        for (i = 0, k = Object.keys(scope.jobsMap), l = k.length; i < l; i++) {
                            if (_poNo.indexOf(scope.jobsMap[k[i]].poNo) < 0) {
                                scope.editTask.poFuzzySearch.push({
                                    text: scope.jobsMap[k[i]].poNo,
                                    click: _clickFunc.call(null, scope.jobsMap[k[i]].poNo)
                                });
                                _poNo.push(scope.jobsMap[k[i]].poNo);
                            }
                        }
                    }
                break;
                case 'delete':
                    if (scope.options.readOnly === false) {
                        if (angular.element(window).confirm('Are you sure to delete this task?') === true) {
                            task.model.delete = true;
                            task.row.removeTask(task.model.id, true, false);
                        }
                    }
                break;
                case 'zoomIn':
                    key = scope.defaultScale.indexOf(scope.options.scale);
                    if (key - 1 >= 0) {
                        scope.options.scale = scope.defaultScale[(key - 1)];
                    }
                break;
                case 'zoomOut':
                    key = scope.defaultScale.indexOf(scope.options.scale);
                    if (key + 1 < scope.defaultScale.length) {
                        scope.options.scale = scope.defaultScale[(key + 1)];
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
            if (scope.groupTask === true) {
                if (multipleTaskSelected.length > 0) {
                    for (i = 0, t = multipleTaskSelected, l = t.length; i < l; i++) {
                        scope.tasksMap['t'+t[i]].model.highlight = false;
                    }
                }
                multipleTaskSelected = [];
                if (scope.taskGroups['g' + task.model.taskGroup] !== undefined) {
                    multipleTaskSelected = scope.taskGroups['g' + task.model.taskGroup];
                    for (i = 0, t = multipleTaskSelected, l = t.length; i < l; i++) {
                        scope.tasksMap['t'+t[i]].model.highlight = true;
                    }
                }
            } else {
                if (multipleTaskSelected.length > 0) {
                    if (multipleTaskSelected.indexOf(task.model.id) < 0) {
                        for (i = 0, t = multipleTaskSelected, l = t.length; i < l; i++) {
                            scope.tasksMap['t'+t[i]].model.highlight = false;
                        }
                        multipleTaskSelected = [];
                    }
                }
            }
        };
        var movingTaskEvent = function(eventName, task) {
            var _dateline, _shift = task.model.from.clone() - _movingTask;
            var _firstColumn = scope.api.gantt.columnsManager.getFirstColumn().date;
            if (multipleTaskSelected.length > 0) {
                for (var i = 0, t = multipleTaskSelected, l = t.length; i < l; i++) {
                    if (scope.tasksMap['t'+t[i]].model.id !== task.model.id) {
                        _dateline = scope.tasksMap['t'+t[i]].model.from.clone().add(_shift, 'ms');
                        if (_dateline <= _firstColumn || scope.tasksMap['t'+t[i]].model.finished === true ||  scope.tasksMap['t'+t[i]].model.inProcessing === true) {
                            continue;
                        } else {
                            _dateline = objectModel.api.gantt.getPositionByDate(_dateline, false);
                            scope.tasksMap['t'+t[i]].moveTo(_dateline, false);
                        }
                    }
                }
                _movingTask = task.model.from.clone();
            } else {
                if (task.model.from <= _firstColumn) {
                    return false;
                }
            }
            scope.$digest();
        };
        var moveTaskEndEvent = function(eventName, task) {
            var i, t, l, _dateline;
            for (i = 0, t = Object.keys(scope.tasksMap), l = t.length; i < l; i++) {
                if (scope.tasksMap[t[i]].model.highlight === true) {
                    scope.tasksMap[t[i]].model.highlight = false;
                    if (scope.tasksMap[t[i]].scope !== undefined) {
                        scope.tasksMap[t[i]].scope.$digest();
                    }
                }
            }
            if (multipleTaskSelected.length > 0) {
                for (i = 0, t = multipleTaskSelected, l = t.length; i < l; i++) {
                    if (scope.tasksMap['t'+t[i]] !== undefined && scope.tasksMap['t'+t[i]].model.id !== task.model.id) {
                        _dateline = scope.tasksMap['t'+t[i]].model.from.clone() - scope.tasksMap['t'+t[i]].model.expectedStartTime.clone();
                        scope.tasksMap['t'+t[i]].model.expectedStartTime = scope.tasksMap['t'+t[i]].model.from.clone();
                        scope.tasksMap['t'+t[i]].model.expectedSetupFinishTime.add(_dateline, 'ms');
                        scope.tasksMap['t'+t[i]].model.expectedFinishTime = scope.tasksMap['t'+t[i]].model.to.clone();
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
                if (typeof task.model.tooltip !== 'object') {
                    task.model.tooltip = [];
                }
                if (task.model.tooltip.length < task.row.model.title.length) {
                    for (i = task.model.tooltip.length, k = task.row.model.title, l = k.length; i < l; i++) {
                        task.model.tooltip.push('N');
                    }
                }
                task.switchCut = function(task, evt) {
                    taskContextMenuEvent('cut', task, evt);
                };
                task.switchLock = function(task, evt) {
                    taskContextMenuEvent('lock', task, evt);
                };
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
                        scope: scope,
                        title: 'More Information',
                        content: '<iframe src="'+_url+'" style="width:100%;height:'+(angular.element(window).innerHeight * 0.75)+'px;border:0 none;"></iframe>',
                        templateUrl: '../app/views/moreInformation.tpl.html',
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
                scope.tasksMap['t' + task.model.id] = task;
            } else if (eventName === 'tasks.on.rowChange') {
                task.model.runOnMachineId = task.row.model.id;
                if (task.model.actualRunOnMachineId !== null && task.model.actualRunOnMachineId !== undefined) {
                    task.model.actualRunOnMachineId = task.row.model.id;
                }
            } else if (eventName === 'task-click') {
                $log.info(task);
                scope.task = task;
                scope.$digest();
            }
        };

        // Event handler
        var logRowEvent = function(eventName, row) {
            if (eventName === 'rows.on.add' || eventName === 'rows.on.change') {
                row.createTask = function(row, evt) {
                    evt.stopPropagation();
                    if (scope.options.readOnly === false) {
                        var _point = moment();
                        if (evt !== undefined) {
                            _point = event.x - row.rowsManager.gantt.side.getWidth() + row.rowsManager.gantt.scroll.getScrollLeft() - 60;
                            _point = row.rowsManager.gantt.getDateByPosition(_point);
                        }
                        scope.editTask = angular.copy(TaskEditor.editTaskTemplate);
                        scope.editTask.id = utils.randomUuid();
                        scope.editTask.rowId = row.model.id;
                        scope.editTask.runOnMachineId = row.model.id;
                        scope.editTask.modifyType = 'create';
                        scope.editTask.priority = Object.keys(scope.tasksMap).length + 1;
                        scope.editTask.expectedStartTime = _point.clone().format('YYYY/MM/DD HH:mm');
                        scope.editTask.expectedSetupFinishTime = _point.clone().add(1, 'm').format('YYYY/MM/DD HH:mm');
                        scope.editTask.expectedFinishTime = _point.clone().add(2, 'm').format('YYYY/MM/DD HH:mm');
                        scope.editTask.modal = $modal(editTaskModalOptions);

                        scope.editTask.poFuzzySearch = [];
                        var _poNo = [];
                        var _clickFunc = function(poNo) {
                            return function(poNo) {
                                scope.editTask.poNo = poNo;
                                scope.editTask.fuzzyPoNo = poNo;
                            }.bind(this, poNo);
                        };
                        for (var i = 0, k = Object.keys(scope.jobsMap), l = k.length; i < l; i++) {
                            if (_poNo.indexOf(scope.jobsMap[k[i]].poNo) < 0) {
                                scope.editTask.poFuzzySearch.push({
                                    text: scope.jobsMap[k[i]].poNo,
                                    click: _clickFunc.call(null, scope.jobsMap[k[i]].poNo)
                                });
                                _poNo.push(scope.jobsMap[k[i]].poNo);
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
                    var key = scope.defaultScale.indexOf(scope.options.scale);
                    if (key - 1 >= 0) {
                        scope.options.scale = scope.defaultScale[(key - 1)];
                    }
                    var _dropdown = angular.element(document.getElementById('rowmenu-'+row.model.id));
                    if (_dropdown[0] !== undefined && _dropdown[0].classList !== undefined && _dropdown[0].classList.contains('open')) {
                        _dropdown[0].classList.remove('open');
                    }
                };
                row.zoomOut = function(row, evt) {
                    evt.stopPropagation();
                    var key = scope.defaultScale.indexOf(scope.options.scale);
                    if (key + 1 < scope.defaultScale.length) {
                        scope.options.scale = scope.defaultScale[(key + 1)];
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

        var logScrollEvent = function(left, date, direction) {
            _jumpTrigger = false;
        };

        // Event handler
        var logColumnsGenerateEvent = function(columns, headers) {
            // Regenerate the columns for fill full gantt table
            var splittedViewScale = scope.options.scale.split(' '), viewScaleUnit, from, to;
            if (splittedViewScale && splittedViewScale.length > 1) {
                viewScaleUnit = splittedViewScale[splittedViewScale.length - 1];
            } else {
                viewScaleUnit = scope.options.scale;
            }
            from = moment(columns[columns.length - 1].date, 'YYYY-MM-DDTHH:mm:ss');

            if (parseInt(columns[0].date.format('H'), 10) !== 0) {
                from = moment(columns[0].date.format('YYYY-MM-DDT00:00:00'), 'YYYY-MM-DDTHH:mm:ss');
                to = columns[columns.length - 1].date.clone();
                scope.api.gantt.columnsManager.generateColumns(from, to);
                scope.options.fromDate = from;
            }

            // if (scope.api.gantt.width + scope.api.gantt.scroll.getBordersWidth() < $element[0].offsetWidth) {
            //     if (['minute', 'minutes', 'hour', 'hours'].indexOf(viewScaleUnit) > -1) {
            //         to = from.clone().add(3, 'd');
            //     } else if (['day', 'week', 'weeks'].indexOf(viewScaleUnit) > -1) {
            //         to = from.clone().add(1, 'M');
            //     } else if (['month', 'months', 'quarter', 'year'].indexOf(viewScaleUnit) > -1) {
            //         to = from.clone().add(1, 'Q');
            //     }
            //     scope.options.toDate = to;
            // }

            if (_jumpTrigger === true) {
                var position = Math.ceil(objectModel.api.gantt.getPositionByDate(columns[columns.length - 1].date));
                if (scope.api.gantt.scroll.getScrollWidth() > position) {
                    scope.api.gantt.scroll.scrollTo(position);
                } else {
                    $timeout(function() {
                        scope.api.gantt.scroll.scrollTo(position);
                    }, 500);
                }
            }
        };

        var logRowsFilterEvent = function(rows, filteredRows) {
            $log.info('[Event] rows.on.filter: ' + filteredRows.length + '/' + rows.length + ' rows displayed.');
        };

        var logReadyEvent = function() {
            $log.info('[Event] core.on.ready');
        };

        var addEventName = function(eventName, func) {
            return function(data) {
                return func(eventName, data);
            };
        };

        return {
            initialize: function(_scope, _objectModel) {
                scope = _scope;
                objectModel = _objectModel;
                return this;
            }.bind(this),
            editTaskModalOptions: editTaskModalOptions,
            multipleTaskSelected: multipleTaskSelected,
            editTaskHandleSuccess: editTaskHandleSuccess,
            editTaskHandleError: editTaskHandleError,
            movableEnableCondition: movableEnableCondition,
            drawResizeEndEvent: drawResizeEndEvent,
            taskContextMenuEvent: taskContextMenuEvent,
            moveTaskBeginEvent: moveTaskBeginEvent,
            movingTaskEvent: movingTaskEvent,
            moveTaskEndEvent: moveTaskEndEvent,
            logTaskEvent: logTaskEvent,
            logRowEvent: logRowEvent,
            logScrollEvent: logScrollEvent,
            logColumnsGenerateEvent: logColumnsGenerateEvent,
            logRowsFilterEvent: logRowsFilterEvent,
            logReadyEvent: logReadyEvent,
            addEventName: addEventName,
        };
    }])
;
