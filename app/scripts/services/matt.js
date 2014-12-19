'use strict';

/**
 * @ngdoc service
 * @name HarvardApp.Matt
 * @description
 * # Matt
 * Service in the HarvardApp.
 */
angular.module('HarvardApp')
    .service('Matt', ['$http', '$timeout', '$log', function Matt($http, $timeout, $log) {
        var configuration = {
            serverLocation: '',
            jsLocationPrefix: '/',
            // 讀取 Gantt 資料 URL
            getGanttUrl: '/machines',
            // 儲存或是運算 Gantt URL
            saveGanttUrl: '/calculate',
            calcGanttUrl: '/calculate',
            // 讀取 Gantt  的 Server response Timeout，單位秒
            getGanttDataTimeout: 20,
            // 儲存或是運算 Gantt 的 Server response Timeout，單位秒
            saveGanttDataTimeout: 20,
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
            confirmGanttUrl: '/company/scheduler/plans/calculate/',
        };

        return {
            editTaskData: function(taskData) {
                $log.info('console.log');

                // 如果檢查通過
                return {
                    state: 'ok'
                };

                // 如果檢查失敗
                return {
                    state: 'err',
                    messages: {
                        title: '',
                        content: ''
                    }
                };
            },
            addTaskData: function(taskData) {

                // 如果檢查通過
                return {
                    state: 'ok'
                };

                // 如果檢查失敗
                return {
                    state: 'err',
                    messages: {
                        title: '',
                        content: ''
                    }
                };
            },
            getGanttData: function() {
                return {
                    success: function(response) {
                        if (response.data.messagesEmpty) {
                            return {
                                state: 'ok',
                                data: {}
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