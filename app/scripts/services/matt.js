'use strict';

/**
 * @ngdoc service
 * @name HarvardApp.Matt
 * @description
 * # Matt
 * Service in the HarvardApp.
 */
angular.module('HarvardApp')
    .service('Matt', ['$http', '$timeout', '$log', '$location', 'moment', function Matt($http, $timeout, $log, $location, moment) {
        var configuration = {
            // 奇怪$location.path()沒有用, 所以先用absUrl(), 7是’http://‘的長度
            serverLocation: '/' + $location.absUrl().substr(7).split('/')[1],
            jsLocationPrefix: '/',
            viewsFolder: '/resources/Gantt-v2/views',
            // 讀取 Gantt 資料 URL
            getGanttUrl: '/company/scheduler/gantt/machines',
            // 儲存或是運算 Gantt URL
            // 讀取 Gantt  的 Server response Timeout，單位秒
            getGanttDataTimeout: 15 * 60,
            // 儲存或是運算 Gantt 的 Server response Timeout，單位秒
            saveGanttDataTimeout: 60 * 60,
            // scrollTo的偏移量, 公式: 指定目標的位置 + 目前gantt寬度 * offset
            scrollToOffset: 0.01 * -1,
            // 訊息顯示時間，單位秒
            alertTimeout: 0,
            // 計算長度，單位週
            calculateWeeks: 12,
            // 計算演算法版本, 對應server端的tw.com.softleader.harvard.aps.enums.SolveStrategy
            solveStrategy: 'V2',
            // 以字串(term)模糊查詢符合的PoNo
            // url: GET /company/sales/pos/like/{term}
            // return: list of labelValueModel, label: poNo, value: poNo
            poFuzzySearch: '/company/sales/pos/like/#poNo#',

            // 以PoNo取得Po資料
            // url: GET /company/sales/po/{poNo}
            // return: po data
            getPoUrl: '/company/sales/po/#poNo#',

            // 以PoId取得其下的Combo
            // url: GET /company/sales/combo/by-po/{PoId}
            // return: list of labelValueModel, label: comboId, value: comboId
            getComboUrl: '/company/sales/combo/by-po/#poId#',

            // 以ComboId取得其下的Product
            // uurl: GET /company/sales/combo/product/by-combo/{comboId}
            // return list of labelValeModel, label: product info, value: productId
            getProductUrl: '/company/sales/combo/product/by-combo/#comboId#',

            // 取poNo, comboId, productId資訊
            getProductInfoUrl: '/aps/operations/pdt-info/#taskId#',

            // 以ProductId取得其下的Process
            // url: GET /aps/processes/by-product/{productId}?factoryOperationCode={factoryOperationCode}
            // request params:
            // factoryOperationCode, default: blank, 有給的話會過濾出所屬該factoryOperationCode的process, 沒給的話不過濾
            // return list of labelValueModel, label: process info, value processId
            // ?factoryOperationCode=#factoryOperationCode#
            getProcessUrl: '/aps/processes/by-product/#productId#',

            // url: /aps/operations/{operationIds} (operationIds用逗號分隔)
            getMoreInformationPage: '/aps/operations/#operationIds#',

            // confirm
            // url: POST or PUT /company/scheduler/plans/confirm
            // request params:

            // save, defautl: false, 是否要儲存
            // check, default: true, 計算前是否要執行precondition check?
            // calculate, defaul: true, 是否要計算
            // calculateFrom, default: system day + 1 day, 從哪一天開始計算
            // calculateWeeks, default: 12, 要計算幾周
            // return tw.com.softleader.harvard.aps.service.result.ApsMessage
            confirmGanttUrl: '/company/scheduler/gantt/calculate/',
            tooltipSeparator: '|',
        };

		var formatMessages = function (messages) {
        	var html = '';
        	if (messages && messages.length > 1) { // 第一個固定是title
	        	html = '<table class="table table-striped table-hover table-condensed">';
	        	for (var i in messages) {
	        		// title
	        		if (i === 0) {
	        			html += '<thead><tr><th>' + messages[i].replace(/\|/g, '</th><th>') + '</th></tr></thead>';
	        		}
	        		// content
	        		else {
	        			html += '<thead><tr><td>' + messages[i].replace(/\|/g, '</td><td>') + '</td></tr></thead>';
	        		}
	        	}
	        	html += '</table>';
        	}
        	return html;
        };

        var genericEditorValidation = function(taskData) {
			console.log(taskData);
			var dataChecking = true;
    		var errorMessage = [];
			var today = moment();

			if(!taskData.poNo) {
				dataChecking = false;
				errorMessage.push('[PO#] must not be empty');
			}
			if(!taskData.comboId) {
				dataChecking = false;
				errorMessage.push('[ComboId] must not be empty');
			}
			if(!taskData.productId) {
				dataChecking = false;
				errorMessage.push('[Product] must not be empty');
			}
			if(!taskData.processId) {
				dataChecking = false;
				errorMessage.push('[Process] must not be empty');
			}
			if(!taskData.processingType) {
				dataChecking = false;
				errorMessage.push('[Processing Type] must not be empty');
			}
			if(!taskData.operationCode) {
				dataChecking = false;
				errorMessage.push('[Operation Code] must not be empty');
			}
			if(taskData.rounds === null) {
				dataChecking = false;
				errorMessage.push('[Rounds] must not be empty');
			} else if(taskData.rounds <= 0) {
				dataChecking = false;
				errorMessage.push('[Rounds] must be greater then 0');
			}
			if(!taskData.priority) {
				dataChecking = false;
				errorMessage.push('[Priority] must not be empty');
			}
			if(!taskData.capacity) {
				dataChecking = false;
				errorMessage.push('[Capacity] must not be empty');
			}
			if(taskData.isPin === '1' && taskData.inProcessing === '1') {
				dataChecking = false;
				errorMessage.push('Pin can\'t use on pending task');
			}
			if(taskData.isPin === '1' && taskData.isFinish === '1') {
				dataChecking = false;
				errorMessage.push('Pin can\'t use on finished task');
			}
			if(taskData.inProcessing === '1' && taskData.isFinish === '1') {
				dataChecking = false;
				errorMessage.push('[Pending] & [Finish] can\'t set to Yes in the same time');
			}
			if(!taskData.expectedStartTime) {
				dataChecking = false;
				errorMessage.push('[Expect Start] must not be empty');
			}
			if(!taskData.expectedSetupFinishTime) {
				dataChecking = false;
				errorMessage.push('[Expect Setup Finish] must not be empty');
			}
			if(!taskData.expectedFinishTime) {
				dataChecking = false;
				errorMessage.push('[Expect Production Finish] must not be empty');
			}
			if(taskData.quantity === null) {
				dataChecking = false;
				errorMessage.push('[Expect Quantity] must not be empty');
			} else if(taskData.quantity <= 0) {
				dataChecking = false;
				errorMessage.push('[Expect Quantity] must be greater then 0');
			}

			if(taskData.expectedStartTime && taskData.expectedSetupFinishTime && taskData.expectedFinishTime) {
				if(!(taskData.expectedStartTime <= taskData.expectedSetupFinishTime && taskData.expectedSetupFinishTime <= taskData.expectedFinishTime)) {
					dataChecking = false;
					errorMessage.push('Some conflict in [Expect Time], please check');
				} else if(today > taskData.expectedFinishTime && taskData.isFinish === '0') {
					dataChecking = false;
					errorMessage.push('Task in past time must be Finished');
				}

			}

			if(taskData.up === null || taskData.up <= 0) {
				dataChecking = false;
				errorMessage.push('[Up] must not be empty or less then 0');
			}

			if(taskData.sheetUp === null || taskData.sheetUp <= 0) {
				dataChecking = false;
				errorMessage.push('[SheetUp] must not be empty or less then 0');
			}

			if(taskData.up != null && taskData.sheetUp !=null && taskData.up > taskData.sheetUp) {
				dataChecking = false;
				errorMessage.push('[SheetUp] must not be less then [Up]');
			}

			if(taskData.s2sMins === null || taskData.s2sMins < -1) {
				dataChecking = false;
				errorMessage.push('[Start to Start Minutes] must not be empty or less then -1');
			}

			if (taskData.isParallel === true && taskData.parallelCode === null) {
				dataChecking = false;
				errorMessage.push('Some thing is error');
			}
			if (taskData.inProcessing === '1') {
				if (!taskData.actualStartTime) {
					dataChecking = false;
					errorMessage.push('When [Pending] is Yes, [Actual Start] must not be empty');
				} else if(taskData.actualSetupFinishTime && taskData.actualStartTime > taskData.actualSetupFinishTime) {
					dataChecking = false;
					errorMessage.push('When [Pending] is Yes, [Actual Setup Finish] must be greater then [Actual Start]');
				} else if(today < taskData.actualStartTime) {
					dataChecking = false;
					errorMessage.push('When [Pending] is Yes, [Actual Start] can\'t be after now');
				}
			}
			if (taskData.isFinish === '1' || taskData.isFinish === '1') {
				if(!taskData.actualStartTime || !taskData.actualSetupFinishTime || !taskData.actualFinishTime) {
					if (!taskData.actualStartTime) {
						dataChecking = false;
						errorMessage.push('When [Finish] is Yes, [Actual Start] must not be empty');
					}
					if (!taskData.actualSetupFinishTime) {
						dataChecking = false;
						errorMessage.push('When [Finish] is Yes, [Actual Setup Finish] must not be empty');
					}
					if (!taskData.actualFinishTime) {
						dataChecking = false;
						errorMessage.push('When [Finish] is Yes, [Actual Production Finish] must not be empty');
					}
				} else {
					if(today < taskData.actualStartTime) {
						dataChecking = false;
						errorMessage.push('When [Finish] is Yes, [Actual Start] can\'t be after now');
					}
					if(today < taskData.actualSetupFinishTime) {
						dataChecking = false;
						errorMessage.push('When [Finish] is Yes, [Actual Setup Finish] can\'t be after now');
					}
					if(today < taskData.actualFinishTime) {
						dataChecking = false;
						errorMessage.push('When [Finish] is Yes, [Actual Production Finish] can\'t be after now');
					}

					if(!(taskData.actualStartTime <= taskData.actualSetupFinishTime && taskData.actualSetupFinishTime <= taskData.actualFinishTime)) {
						dataChecking = false;
						errorMessage.push('Some conflict in [Actual Time], please check');
					}
				}
			}
			if(taskData.isFinish !== '1' && taskData.inProcessing !== '1') {
				if (taskData.actualStartTime) {
					dataChecking = false;
					errorMessage.push('When [Pending] & [Finish] is No, [Actual Start] must be empty');
				}
				if (taskData.actualSetupFinishTime) {
					dataChecking = false;
					errorMessage.push('When [Pending] & [Finish] is No, [Actual Setup Finish] must be empty');
				}
				if (taskData.actualFinishTime) {
					dataChecking = false;
					errorMessage.push('When [Pending] & [Finish] is No, [Actual Production Finish] must be empty');
				}
				if (taskData.actualQuantity) {
					dataChecking = false;
					errorMessage.push('When [Pending] & [Finish] is No, [Actual Quantity] must be empty');
				}
			}

			if(dataChecking) {
				// 如果檢查通過
				return {
					state: 'ok'
				};
			} else {
				// 如果檢查失敗
				return {
					state: 'err',
					messages: {
						title: 'Data validation failed',
						content: errorMessage
					}
				};
			}
		};

        return {
        	showMoreInformation: function(taskData) {
        		var operations = taskData.taskGroupIdsVo;
        		var operationIds;
        		if(operations && operations.size > 1){
        			$.each(operations, function(index, operation){
            			if(!operationIds){
            				operationIds = operation.split('_')[0];
            			} else {
            				operationIds += ",";
            				operationIds += operation.split('_')[0];
            			}
            		});
        		} else {
        			operationIds = taskData.id;
        		}

        		return configuration.serverLocation + configuration.getMoreInformationPage.replace('#operationIds#', operationIds);
        	},
            editTaskData: function(taskData) {
				return genericEditorValidation(taskData);
            },
            addTaskData: function(taskData) {
                return genericEditorValidation(taskData);
            },
            switchMachineCondition: function(sourceMachine, targetMachine, task) {
            	// to prevent old style json file, which not contains 'group' in factoryOperation, gets error
            	if (!!targetMachine.factoryOperation.group) {
            		for (var i in targetMachine.factoryOperation.group) {
            			if (targetMachine.factoryOperation.group[i] === sourceMachine.factoryOperation.code) {
            				return true;
            			}
            		}
            		return false;
            	} else {
            		return sourceMachine.factoryOperation.code === targetMachine.factoryOperation.code;
            	}
            },
            getGanttData: function() {
                return {
                    success: function(response) {
                        console.log(response);
                        if (response.data.messagesEmpty) {
                            return {
                                state: 'ok',
                                messages: {
                                    title: (response.data.data.readOnly ? '<i class="fa fa-lock fa-lg"></i> ' : '') + 'Load Gantt Data Success!',
                                    content: formatMessages(response.data.data.messages)
                                },
                                data: response.data.data,
                                // 如果要鎖定 Gantt 無法操作，請使用 true
                                readonly: response.data.data.readOnly
                            };
                        } else {
                            return {
                                state: 'err',
                                messages: {
                                    title: (response.data.data.readOnly ? '<i class="fa fa-lock fa-lg"></i> ' : '') + 'Loading data break by: ',
                                    content: response.data.messages.map(function (msg) {return msg.value;}).join('<br>')
                                },
                                data: {},
                                // 如果要鎖定 Gantt 無法操作，請使用 true
                                readonly: response.data.data.readOnly
                            };
                        }
                    },
                    error: function(response) {
                        return {
                            state: 'err',
                            messages: {
                                title: 'Failed connecting to server!',
                                content: 'http status: [' + response.status + '] ' + response.statusText
                            },
                            data: {},
                            readonly: false
                        };
                    }
                };
            },
            saveOrCalcGanttData: function() {
                return {
                    success: function(response) {
                        if (response.data.messagesEmpty) {
                            return {
                                state: 'ok',
                                messages: {
                                    title: (response.data.data.readOnly ? '<i class="fa fa-lock fa-lg"></i> ' : '') + 'Recalculate/Save Data Success!',
                                    content: formatMessages(response.data.data.messages)
                                },
                                data: response.data.data,
                                // 如果要鎖定 Gantt 無法操作，請使用 true
                                readonly: response.data.data.readOnly
                            };
                        } else {
                            return {
                                state: 'err',
                                messages: {
                                    title: (response.data.data.readOnly ? '<i class="fa fa-lock fa-lg"></i> ' : '') + 'Recalculate/Save break by: ',
                                    content: response.data.messages.map(function (msg) {return msg.value;}).join('<br>')
                                },
                                data: {},
                                // 如果要鎖定 Gantt 無法操作，請使用 true
                                readonly: response.data.data.readOnly
                            };
                        }
                    },
                    error: function(response) {
                        return {
                            state: 'err',
                            messages: {
                                title: 'Failed connecting to server!',
                                content: 'http status: [' + response.status + '] ' + response.statusText
                            },
                            data: {},
                            // 如果要鎖定 Gantt 無法操作，請使用 true
                            readonly: false
                        };
                    }
                };
            },
            configuration: function() {
                return configuration;
            }
        };
    }]
);

angular.module('HarvardApp')
.filter('trimLeadingZero', function () {
	return function (input) {
		return (input) ? input.replace(/^0+/, '') : input;
	};
});
