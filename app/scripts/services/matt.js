'use strict';

/**
 * @ngdoc service
 * @name HarvardApp.Matt
 * @description
 * # Matt
 * Service in the HarvardApp.
 */
angular.module('HarvardApp')
    .service('Matt', ['$http', '$timeout', '$log', '$location', function Matt($http, $timeout, $log, $location) {
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
            saveGanttDataTimeout: 15 * 60,
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
        };

        var genericEditorValidation = function(taskData){
			var data_checking = true;
    		var error_message = new Array();
			var today = new Date();
			
			if(!taskData.poNo){
				data_checking = false;
				error_message.push('[PO#] must not be empty');
			}
			if(!taskData.comboId){
				data_checking = false;
				error_message.push('[ComboId] must not be empty');
			}
			if(!taskData.processId){
				data_checking = false;
				error_message.push('[Process] must not be empty');
			}
			if(!taskData.processingType){
				data_checking = false;
				error_message.push('[Processing Type] must not be empty');
			}
			if(!taskData.operationCode){
				data_checking = false;
				error_message.push('[Operation Code] must not be empty');
			}
			if(taskData.rounds === null){
				data_checking = false;
				error_message.push('[Rounds] must not be empty');
			} else if(taskData.rounds <= 0){
				data_checking = false;
				error_message.push('[Rounds] must be greater then 0');
			}
			if(!taskData.priority){
				data_checking = false;
				error_message.push('[Priority] must not be empty');
			}
			if(!taskData.capacity){
				data_checking = false;
				error_message.push('[Capacity] must not be empty');
			}
			if(!taskData.expectedStartTime){
				data_checking = false;
				error_message.push('[Expect Start] must not be empty');
			}
			if(!taskData.expectedSetupFinishTime){
				data_checking = false;
				error_message.push('[Expect Setup Finish] must not be empty');
			}
			if(!taskData.expectedFinishTime){
				data_checking = false;
				error_message.push('[Expect Production Finish] must not be empty');
			}
			if(taskData.quantity === null){
				data_checking = false;
				error_message.push('[Expect Quantity] must not be empty');
			} else if(taskData.quantity <= 0){
				data_checking = false;
				error_message.push('[Expect Quantity] must be greater then 0');
			}

			if(taskData.expectedStartTime && taskData.expectedSetupFinishTime && taskData.expectedFinishTime &&
				!(taskData.expectedStartTime <= taskData.expectedSetupFinishTime && taskData.expectedSetupFinishTime <= taskData.expectedFinishTime)){
				data_checking = false;
				error_message.push('[Expect Production Finish] must be greater then [Expect Setup Finish] and [Expect Start]');
			}

			if(taskData.up === null || taskData.up <= 0){
				data_checking = false;
				error_message.push('[Up] must not be empty or less then 0');
			}

			if(taskData.sheetUp === null || taskData.sheetUp <= 0){
				data_checking = false;
				error_message.push('[SheetUp] must not be empty or less then 0');
			}

			if (taskData.isParallel === true && taskData.parallelCode === null) {
				data_checking = false;
				error_message.push('Some thing is error');
			}
			if (taskData.inProcessing === true){
				if (!taskData.actualStartTime){
					data_checking = false;
					error_message.push('When [Pending] is Yes, [Actual Start] must not be empty');
				} else if( taskData.actualSetupFinishTime && !(taskData.actualStartTime <= taskData.actualSetupFinishTime)){
					data_checking = false;
					error_message.push('When [Pending] is Yes, [Actual Setup Finish] must be greater then [Actual Start]');
				}
			}
			if (taskData.isFinished == true || taskData.isFinished == "true"){
				if(!taskData.actualStartTime || !taskData.actualSetupFinishTime || !taskData.actualFinishTime){
					if (!taskData.actualStartTime){
						data_checking = false;
						error_message.push('When [Finish] is Yes, [Actual Start] must not be empty');
					}
					if (!taskData.actualSetupFinishTime){
						data_checking = false;
						error_message.push('When [Finish] is Yes, [Actual Setup Finish] must not be empty');
					}
					if (!taskData.actualFinishTime){
						data_checking = false;
						error_message.push('When [Finish] is Yes, [Actual Production Finish] must not be empty');
					}
				} else if(today > new Date(taskData.actualStartTime)){
					data_checking = false;
					error_message = '[Actual Start] can\'t be after now';
				} else if(taskData.actualStartTime <= taskData.actualSetupFinishTime && taskData.actualSetupFinishTime <= taskData.actualFinishTime){
					data_checking = false;
					error_message = '[Actual Production Finish] must be greater then [Actual Setup Finish] and [Actual Start]';
				}
			} else if(taskData.inProcessing != true){
				if (taskData.actualStartTime){
					data_checking = false;
					error_message.push('When [Pending] & [Finish] is No, [Actual Start] must be empty');
				}
				if (taskData.actualSetupFinishTime){
					data_checking = false;
					error_message.push('When [Pending] & [Finish] is No, [Actual Setup Finish] must be empty');
				}
				if (taskData.actualFinishTime){
					data_checking = false;
					error_message.push('When [Pending] & [Finish] is No, [Actual Production Finish] must be empty');
				}
			}
			
			if(data_checking){
				// 如果檢查通過
				return {
					state: 'ok'
				};
			} else {
				// 如果檢查失敗
				return {
					state: 'err',
					messages: {
						title: '',
						content: error_message
					}
				};
			}
		};

        return {
            editTaskData: function(taskData) {
				return genericEditorValidation(taskData);
            },
            addTaskData: function(taskData) {
                return genericEditorValidation(taskData);
            },
            getGanttData: function() {
                return {
                    success: function(response) {
                        if (response.data.messagesEmpty) {
                            return {
                                state: 'ok',
                                data: response.data.data
                            };
                        } else {
                            return {
                                state: 'err',
                                messages: {
                                    title: 'Load Gantt Data Error!',
                                    content: response.data.data.messages
                                },
                                data: {}
                            };
                        }
                    },
                    error: function(response) {
                        return {
                            state: 'err',
                            messages: {
                                title: 'Load Gantt Data Error!',
                                content: 'Something wrong with server response.'
                            },
                            data: {}
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
                                    title: 'Load Gantt Data Ok!',
                                    content: response.data.data.messages
                                },
                                data: response.data.data,
                                // 如果要鎖定 Gantt 無法操作，請使用 true
                                readonly: false
                            };
                        } else {
                            return {
                                state: 'err',
                                messages: {
                                    title: 'Load Gantt Data Error!',
                                    content: 'Something wrong with server response.'
                                },
                                data: {},
                                // 如果要鎖定 Gantt 無法操作，請使用 true
                                readonly: false
                            };
                        }
                    },
                    error: function(response) {
                        return {
                            state: 'err',
                            messages: {
                                title: 'Load Gantt Data Error!',
                                content: 'Something wrong with server response.'
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