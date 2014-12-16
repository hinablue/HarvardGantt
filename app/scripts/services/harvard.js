'use strict';

/**
 * @ngdoc service
 * @name HarvardApp.Harvard
 * @description
 * # Harvard
 * Service in the HarvardApp.
 */
angular.module('HarvardApp')
    .service('Harvard', function Harvard() {
        return {
            getGanttTimespans: function() {
                return [
                        // {
                        //     from: new Date(2013, 9, 21, 8, 0, 0),
                        //     to: new Date(2013, 9, 25, 15, 0, 0),
                        //     name: 'Sprint 1 Timespan'
                        //     //priority: undefined,
                        //     //classes: [], //Set custom classes names to apply to the timespan.
                        //     //data: undefined
                        // }
                    ];
            },
            getGanttData: function() {
                return {
                          'machines' : [ {
                            'machine' : {
                              'id' : 2,
                              'settingsMachine' : {
                                'id' : 2,
                                'code' : 'PT02',
                                'descript' : 'Komori 3',
                                'name' : 'Komori 3',
                                'settingsMachineType' : {
                                  'code' : 'Komori',
                                  'descript' : 'Komori',
                                  'color' : null
                                },
                                'dept' : {
                                  'id' : 7,
                                  'code' : 'Printing Dept_',
                                  'name' : 'Printing Dept',
                                  'subDept' : '',
                                  'sortBy' : 1
                                },
                                'unit' : 'SHEET',
                                'basicSetupTime' : 90,
                                'basicCapacity' : 31,
                                'basicPendingMinutes' : 0,
                                'processingType' : 'GANG',
                                'monitorAddress' : 'dashboard_PT02',
                                'camIp' : '10.100.0.11',
                                'ssQuantity' : 0,
                                'machineOrder' : 0
                              },
                              'factoryOperation' : {
                                'id' : 2,
                                'code' : 'PT',
                                'descript' : 'PT',
                                'displayNames' : 'PT',
                                'needMachine' : true,
                                'priority' : 200,
                                'color' : '#FFBF00'
                              },
                              'title' : 'PO#|OperationCode (Gang#)|Start/End Time|Sheet Qty|Data Format|Data Approval|Material|Sheet Size|Combo Type',
                              'currentTimeWorks' : 0,
                              'online' : true
                            },
                            'operationQueue' : [ {
                              'id' : '8667',
                              'oid' : '8667',
                              'part' : 0,
                              'operationCode' : '008061F',
                              'priority' : 190,
                              'job' : {
                                'id' : 277,
                                'comboType' : '1',
                                'comboId' : 1442,
                                'poNo' : 'ST102114',
                                'comboQuantity' : 250000
                              },
                              'process' : {
                                'id' : 1069,
                                'needWaitPrevProcess' : true,
                                'operations' : [ '8666', '8667', '8668', '8669', '8670', '8671', '8672' ],
                                'previousProcesses' : [ ],
                                'productId' : 3858
                              },
                              'previousOperation' : '8666',
                              'nextOperations' : [ '8668' ],
                              'runOnMachineId' : 2,
                              'actualRunOnMachineId' : null,
                              'quantity' : 3110,
                              'actualQuantity' : 0,
                              'processingType' : 'GANG',
                              'factoryOperation' : {
                                'id' : 2,
                                'code' : 'PT',
                                'descript' : 'PT',
                                'displayNames' : 'PT',
                                'needMachine' : true,
                                'priority' : 200,
                                'color' : '#FFBF00'
                              },
                              'jobFile' : null,
                              'manual' : false,
                              'pin' : false,
                              'setupTime' : 90,
                              'productionTime' : 101,
                              'productionCapacity' : 31,
                              's2sMins' : -1,
                              'up' : 90,
                              'sheetUp' : 90,
                              'face' : 'F',
                              'expectedStartTime' : '2014-12-03T14:45:00.000',
                              'expectedSetupFinishTime' : '2014-12-03T16:15:00.000',
                              'expectedFinishTime' : '2014-12-03T17:56:00.000',
                              'actualStartTime' : null,
                              'actualSetupFinishTime' : null,
                              'actualFinishTime' : null,
                              'finished' : false,
                              'inProcessing' : false,
                              'delete' : false,
                              'parallel' : false,
                              'parallelCode' : '',
                              'expectedMoldId' : null,
                              'tooltip1' : '008061B|1442|ST102114',
                              'tooltip' : 'ST102114|008061B|12-03 14:45 - 12-03 17:56|3110|N|N|White PVC|3110|CR80',
                              'tooltip3' : '008061B|1442|ST102114',
                              'color' : '#0000ff',
                              'color2' : '#b38600',
                              'timeclockEmployeeId' : null,
                              'rounds' : 2,
                              'taskGroup': 'taskGroup',
                              'new' : false
                            }, {
                              'id' : '7990',
                              'oid' : '7990',
                              'part' : 0,
                              'operationCode' : '008061F',
                              'priority' : 190,
                              'job' : {
                                'id' : 276,
                                'comboType' : '1',
                                'comboId' : 1441,
                                'poNo' : 'ST102114',
                                'comboQuantity' : 16750000
                              },
                              'process' : {
                                'id' : 1067,
                                'needWaitPrevProcess' : true,
                                'operations' : [ '7989', '7990', '7991', '7992', '7993', '7994', '7995' ],
                                'previousProcesses' : [ ],
                                'productId' : 3856
                              },
                              'previousOperation' : '7989',
                              'nextOperations' : [ '7991' ],
                              'runOnMachineId' : 2,
                              'actualRunOnMachineId' : null,
                              'quantity' : 201700,
                              'actualQuantity' : 0,
                              'processingType' : 'GANG',
                              'factoryOperation' : {
                                'id' : 2,
                                'code' : 'PT',
                                'descript' : 'PT',
                                'displayNames' : 'PT',
                                'needMachine' : true,
                                'priority' : 200,
                                'color' : '#FFBF00'
                              },
                              'jobFile' : null,
                              'manual' : false,
                              'pin' : false,
                              'setupTime' : 90,
                              'productionTime' : 6507,
                              'productionCapacity' : 31,
                              's2sMins' : -1,
                              'up' : 90,
                              'sheetUp' : 90,
                              'face' : 'F',
                              'expectedStartTime' : '2014-12-03T18:00:00.000',
                              'expectedSetupFinishTime' : '2014-12-03T19:27:00.000',
                              'expectedFinishTime' : '2014-12-04T07:00:00.000',
                              'actualStartTime' : null,
                              'actualSetupFinishTime' : null,
                              'actualFinishTime' : null,
                              'finished' : false,
                              'inProcessing' : false,
                              'delete' : false,
                              'parallel' : false,
                              'parallelCode' : '',
                              'expectedMoldId' : null,
                              'tooltip1' : '008060B|1441|ST102114',
                              'tooltip' : 'ST102114|008060B|12-03 17:57 - 12-08 07:54|201700|N|N|White PVC|201700|CR80',
                              'tooltip3' : '008060B|1441|ST102114',
                              'color' : '#0000ff',
                              'color2' : '#b38600',
                              'timeclockEmployeeId' : null,
                              'rounds' : 2,
                              'taskGroup': 'taskGroup',
                              'new' : false
                            }, {
                              'id' : '8668',
                              'oid' : '8668',
                              'part' : 0,
                              'operationCode' : '008061F',
                              'priority' : 200,
                              'job' : {
                                'id' : 277,
                                'comboType' : '1',
                                'comboId' : 1442,
                                'poNo' : 'ST102114',
                                'comboQuantity' : 250000
                              },
                              'process' : {
                                'id' : 1069,
                                'needWaitPrevProcess' : true,
                                'operations' : [ '8666', '8667', '8668', '8669', '8670', '8671', '8672' ],
                                'previousProcesses' : [ ],
                                'productId' : 3858
                              },
                              'previousOperation' : '8667',
                              'nextOperations' : [ '8669' ],
                              'runOnMachineId' : 2,
                              'actualRunOnMachineId' : null,
                              'quantity' : 3110,
                              'actualQuantity' : 0,
                              'processingType' : 'GANG',
                              'factoryOperation' : {
                                'id' : 2,
                                'code' : 'PT',
                                'descript' : 'PT',
                                'displayNames' : 'PT',
                                'needMachine' : true,
                                'priority' : 200,
                                'color' : '#FFBF00'
                              },
                              'jobFile' : null,
                              'manual' : false,
                              'pin' : false,
                              'setupTime' : 90,
                              'productionTime' : 101,
                              'productionCapacity' : 31,
                              's2sMins' : -1,
                              'up' : 90,
                              'sheetUp' : 90,
                              'face' : 'F',
                              'expectedStartTime' : '2014-12-04T07:55:00.000',
                              'expectedSetupFinishTime' : '2014-12-04T09:25:00.000',
                              'expectedFinishTime' : '2014-12-04T11:06:00.000',
                              'actualStartTime' : null,
                              'actualSetupFinishTime' : null,
                              'actualFinishTime' : null,
                              'finished' : false,
                              'inProcessing' : false,
                              'delete' : false,
                              'parallel' : false,
                              'parallelCode' : '',
                              'expectedMoldId' : null,
                              'tooltip1' : '008061F|1442|ST102114',
                              'tooltip' : 'ST102114|008061F|12-08 07:55 - 12-08 11:06|3110|N|N|White PVC|3110|CR80',
                              'tooltip3' : '008061F|1442|ST102114',
                              'color' : '#0000ff',
                              'color2' : '#b38600',
                              'timeclockEmployeeId' : null,
                              'rounds' : 1,
                              'new' : false
                            }, {
                              'id' : '7991',
                              'oid' : '7991',
                              'part' : 0,
                              'operationCode' : '008061F',
                              'priority' : 200,
                              'job' : {
                                'id' : 276,
                                'comboType' : '1',
                                'comboId' : 1441,
                                'poNo' : 'ST102114',
                                'comboQuantity' : 16750000
                              },
                              'process' : {
                                'id' : 1067,
                                'needWaitPrevProcess' : true,
                                'operations' : [ '7989', '7990', '7991', '7992', '7993', '7994', '7995' ],
                                'previousProcesses' : [ ],
                                'productId' : 3856
                              },
                              'previousOperation' : '7990',
                              'nextOperations' : [ '7992' ],
                              'runOnMachineId' : 2,
                              'actualRunOnMachineId' : null,
                              'quantity' : 201700,
                              'actualQuantity' : 0,
                              'processingType' : 'GANG',
                              'factoryOperation' : {
                                'id' : 2,
                                'code' : 'PT',
                                'descript' : 'PT',
                                'displayNames' : 'PT',
                                'needMachine' : true,
                                'priority' : 200,
                                'color' : '#FFBF00'
                              },
                              'jobFile' : null,
                              'manual' : false,
                              'pin' : false,
                              'setupTime' : 90,
                              'productionTime' : 6507,
                              'productionCapacity' : 31,
                              's2sMins' : -1,
                              'up' : 90,
                              'sheetUp' : 90,
                              'face' : 'F',
                              'expectedStartTime' : '2014-12-04T19:54:00.000',
                              'expectedSetupFinishTime' : '2014-12-04T21:24:00.000',
                              'expectedFinishTime' : '2015-02-15T09:51:00.000',
                              'actualStartTime' : null,
                              'actualSetupFinishTime' : null,
                              'actualFinishTime' : null,
                              'finished' : false,
                              'inProcessing' : false,
                              'delete' : false,
                              'parallel' : false,
                              'parallelCode' : '',
                              'expectedMoldId' : null,
                              'tooltip1' : '008060F|1441|ST102114',
                              'tooltip' : 'ST102114|008060F|12-08 19:54 - 12-03 09:51|201700|N|N|White PVC|201700|CR80',
                              'tooltip3' : '008060F|1441|ST102114',
                              'color' : '#0000ff',
                              'color2' : '#b38600',
                              'timeclockEmployeeId' : null,
                              'rounds' : 1,
                              'new' : false
                            } ]
                          },
                           {
                            'machine' : {
                              'id' : 3,
                              'settingsMachine' : {
                                'id' : 3,
                                'code' : 'PT02',
                                'descript' : 'Komori 4',
                                'name' : 'Komori 4',
                                'settingsMachineType' : {
                                  'code' : 'Komori',
                                  'descript' : 'Komori',
                                  'color' : null
                                },
                                'dept' : {
                                  'id' : 7,
                                  'code' : 'Printing Dept_',
                                  'name' : 'Printing Dept',
                                  'subDept' : '',
                                  'sortBy' : 1
                                },
                                'unit' : 'SHEET',
                                'basicSetupTime' : 90,
                                'basicCapacity' : 31,
                                'basicPendingMinutes' : 0,
                                'processingType' : 'GANG',
                                'monitorAddress' : 'dashboard_PT02',
                                'camIp' : '10.100.0.11',
                                'ssQuantity' : 0,
                                'machineOrder' : 0
                              },
                              'factoryOperation' : {
                                'id' : 2,
                                'code' : 'PT',
                                'descript' : 'PT',
                                'displayNames' : 'PT',
                                'needMachine' : true,
                                'priority' : 200,
                                'color' : '#FFBF00'
                              },
                              'title' : 'PO#|OperationCode (Gang#)|Start/End Time|Sheet Qty|Data Format|Data Approval|Material|Sheet Size|Combo Type',
                              'currentTimeWorks' : 0,
                              'online' : true
                            },
                            'operationQueue' : [ {
                              'id' : '8667',
                              'oid' : '8667',
                              'part' : 0,
                              'operationCode' : '008061F',
                              'priority' : 190,
                              'job' : {
                                'id' : 277,
                                'comboType' : '1',
                                'comboId' : 1442,
                                'poNo' : 'ST102114',
                                'comboQuantity' : 250000
                              },
                              'process' : {
                                'id' : 1069,
                                'needWaitPrevProcess' : true,
                                'operations' : [ '8666', '8667', '8668', '8669', '8670', '8671', '8672' ],
                                'previousProcesses' : [ ],
                                'productId' : 3858
                              },
                              'previousOperation' : '8666',
                              'nextOperations' : [ '8668' ],
                              'runOnMachineId' : 2,
                              'actualRunOnMachineId' : null,
                              'quantity' : 3110,
                              'actualQuantity' : 0,
                              'processingType' : 'GANG',
                              'factoryOperation' : {
                                'id' : 2,
                                'code' : 'PT',
                                'descript' : 'PT',
                                'displayNames' : 'PT',
                                'needMachine' : true,
                                'priority' : 200,
                                'color' : '#FFBF00'
                              },
                              'jobFile' : null,
                              'manual' : false,
                              'pin' : false,
                              'setupTime' : 90,
                              'productionTime' : 101,
                              'productionCapacity' : 31,
                              's2sMins' : -1,
                              'up' : 90,
                              'sheetUp' : 90,
                              'face' : 'F',
                              'expectedStartTime' : '2014-12-03T14:45:00.000',
                              'expectedSetupFinishTime' : '2014-12-03T16:15:00.000',
                              'expectedFinishTime' : '2014-12-03T17:56:00.000',
                              'actualStartTime' : null,
                              'actualSetupFinishTime' : null,
                              'actualFinishTime' : null,
                              'finished' : false,
                              'inProcessing' : false,
                              'delete' : false,
                              'parallel' : false,
                              'parallelCode' : '',
                              'expectedMoldId' : null,
                              'tooltip1' : '008061B|1442|ST102114',
                              'tooltip' : 'ST102114|008061B|12-03 14:45 - 12-03 17:56|3110|N|N|White PVC|3110|CR80',
                              'tooltip3' : '008061B|1442|ST102114',
                              'color' : '#0000ff',
                              'color2' : '#b38600',
                              'timeclockEmployeeId' : null,
                              'rounds' : 2,
                              'taskGroup': 'taskGroup',
                              'new' : false
                            }, {
                              'id' : '7990',
                              'oid' : '7990',
                              'part' : 0,
                              'operationCode' : '008061F',
                              'priority' : 190,
                              'job' : {
                                'id' : 276,
                                'comboType' : '1',
                                'comboId' : 1441,
                                'poNo' : 'ST102114',
                                'comboQuantity' : 16750000
                              },
                              'process' : {
                                'id' : 1067,
                                'needWaitPrevProcess' : true,
                                'operations' : [ '7989', '7990', '7991', '7992', '7993', '7994', '7995' ],
                                'previousProcesses' : [ ],
                                'productId' : 3856
                              },
                              'previousOperation' : '7989',
                              'nextOperations' : [ '7991' ],
                              'runOnMachineId' : 2,
                              'actualRunOnMachineId' : null,
                              'quantity' : 201700,
                              'actualQuantity' : 0,
                              'processingType' : 'GANG',
                              'factoryOperation' : {
                                'id' : 2,
                                'code' : 'PT',
                                'descript' : 'PT',
                                'displayNames' : 'PT',
                                'needMachine' : true,
                                'priority' : 200,
                                'color' : '#FFBF00'
                              },
                              'jobFile' : null,
                              'manual' : false,
                              'pin' : false,
                              'setupTime' : 90,
                              'productionTime' : 6507,
                              'productionCapacity' : 31,
                              's2sMins' : -1,
                              'up' : 90,
                              'sheetUp' : 90,
                              'face' : 'F',
                              'expectedStartTime' : '2014-12-03T17:57:00.000',
                              'expectedSetupFinishTime' : '2014-12-03T19:27:00.000',
                              'expectedFinishTime' : '2014-12-04T07:54:00.000',
                              'actualStartTime' : null,
                              'actualSetupFinishTime' : null,
                              'actualFinishTime' : null,
                              'finished' : false,
                              'inProcessing' : false,
                              'delete' : false,
                              'parallel' : false,
                              'parallelCode' : '',
                              'expectedMoldId' : null,
                              'tooltip1' : '008060B|1441|ST102114',
                              'tooltip' : 'ST102114|008060B|12-03 17:57 - 12-08 07:54|201700|N|N|White PVC|201700|CR80',
                              'tooltip3' : '008060B|1441|ST102114',
                              'color' : '#0000ff',
                              'color2' : '#b38600',
                              'timeclockEmployeeId' : null,
                              'rounds' : 2,
                              'taskGroup': 'taskGroup',
                              'new' : false
                            }, {
                              'id' : '8668',
                              'oid' : '8668',
                              'part' : 0,
                              'operationCode' : '008061F',
                              'priority' : 200,
                              'job' : {
                                'id' : 277,
                                'comboType' : '1',
                                'comboId' : 1442,
                                'poNo' : 'ST102114',
                                'comboQuantity' : 250000
                              },
                              'process' : {
                                'id' : 1069,
                                'needWaitPrevProcess' : true,
                                'operations' : [ '8666', '8667', '8668', '8669', '8670', '8671', '8672' ],
                                'previousProcesses' : [ ],
                                'productId' : 3858
                              },
                              'previousOperation' : '8667',
                              'nextOperations' : [ '8669' ],
                              'runOnMachineId' : 2,
                              'actualRunOnMachineId' : null,
                              'quantity' : 3110,
                              'actualQuantity' : 0,
                              'processingType' : 'GANG',
                              'factoryOperation' : {
                                'id' : 2,
                                'code' : 'PT',
                                'descript' : 'PT',
                                'displayNames' : 'PT',
                                'needMachine' : true,
                                'priority' : 200,
                                'color' : '#FFBF00'
                              },
                              'jobFile' : null,
                              'manual' : false,
                              'pin' : false,
                              'setupTime' : 90,
                              'productionTime' : 101,
                              'productionCapacity' : 31,
                              's2sMins' : -1,
                              'up' : 90,
                              'sheetUp' : 90,
                              'face' : 'F',
                              'expectedStartTime' : '2014-12-04T07:55:00.000',
                              'expectedSetupFinishTime' : '2014-12-04T09:25:00.000',
                              'expectedFinishTime' : '2014-12-04T11:06:00.000',
                              'actualStartTime' : null,
                              'actualSetupFinishTime' : null,
                              'actualFinishTime' : null,
                              'finished' : false,
                              'inProcessing' : false,
                              'delete' : false,
                              'parallel' : false,
                              'parallelCode' : '',
                              'expectedMoldId' : null,
                              'tooltip1' : '008061F|1442|ST102114',
                              'tooltip' : 'ST102114|008061F|12-08 07:55 - 12-08 11:06|3110|N|N|White PVC|3110|CR80',
                              'tooltip3' : '008061F|1442|ST102114',
                              'color' : '#0000ff',
                              'color2' : '#b38600',
                              'timeclockEmployeeId' : null,
                              'rounds' : 1,
                              'new' : false
                            }, {
                              'id' : '7991',
                              'oid' : '7991',
                              'part' : 0,
                              'operationCode' : '008061F',
                              'priority' : 200,
                              'job' : {
                                'id' : 276,
                                'comboType' : '1',
                                'comboId' : 1441,
                                'poNo' : 'ST102114',
                                'comboQuantity' : 16750000
                              },
                              'process' : {
                                'id' : 1067,
                                'needWaitPrevProcess' : true,
                                'operations' : [ '7989', '7990', '7991', '7992', '7993', '7994', '7995' ],
                                'previousProcesses' : [ ],
                                'productId' : 3856
                              },
                              'previousOperation' : '7990',
                              'nextOperations' : [ '7992' ],
                              'runOnMachineId' : 2,
                              'actualRunOnMachineId' : null,
                              'quantity' : 201700,
                              'actualQuantity' : 0,
                              'processingType' : 'GANG',
                              'factoryOperation' : {
                                'id' : 2,
                                'code' : 'PT',
                                'descript' : 'PT',
                                'displayNames' : 'PT',
                                'needMachine' : true,
                                'priority' : 200,
                                'color' : '#FFBF00'
                              },
                              'jobFile' : null,
                              'manual' : false,
                              'pin' : false,
                              'setupTime' : 90,
                              'productionTime' : 6507,
                              'productionCapacity' : 31,
                              's2sMins' : -1,
                              'up' : 90,
                              'sheetUp' : 90,
                              'face' : 'F',
                              'expectedStartTime' : '2014-12-04T19:54:00.000',
                              'expectedSetupFinishTime' : '2014-12-04T21:24:00.000',
                              'expectedFinishTime' : '2015-02-15T09:51:00.000',
                              'actualStartTime' : null,
                              'actualSetupFinishTime' : null,
                              'actualFinishTime' : null,
                              'finished' : false,
                              'inProcessing' : false,
                              'delete' : false,
                              'parallel' : false,
                              'parallelCode' : '',
                              'expectedMoldId' : null,
                              'tooltip1' : '008060F|1441|ST102114',
                              'tooltip' : 'ST102114|008060F|12-08 19:54 - 12-03 09:51|201700|N|N|White PVC|201700|CR80',
                              'tooltip3' : '008060F|1441|ST102114',
                              'color' : '#0000ff',
                              'color2' : '#b38600',
                              'timeclockEmployeeId' : null,
                              'rounds' : 1,
                              'new' : false
                            } ]
                          }  ],
                          'molds' : [ ],
                          'jobs' : [ ],
                          'messages' : [ { 'status': 'error' } ]
                        };
                // return [
                //         {name: 'Status meetings', tasks: [
                //             {name: 'Demo #1', color: '#9FC5F8', from: new Date(2013, 9, 25, 15, 0, 0), to: new Date(2013, 9, 25, 18, 30, 0)},
                //             {name: 'Demo #2', color: '#9FC5F8', from: new Date(2013, 10, 1, 15, 0, 0), to: new Date(2013, 10, 1, 18, 0, 0)},
                //             {name: 'Demo #3', color: '#9FC5F8', from: new Date(2013, 10, 8, 15, 0, 0), to: new Date(2013, 10, 8, 18, 0, 0)},
                //             {name: 'Demo #4', color: '#9FC5F8', from: new Date(2013, 10, 15, 15, 0, 0), to: new Date(2013, 10, 15, 18, 0, 0)},
                //             {name: 'Demo #5', color: '#9FC5F8', from: new Date(2013, 10, 24, 9, 0, 0), to: new Date(2013, 10, 24, 10, 0, 0)}
                //         ]},
                //         {name: 'Kickoff', movable: {allowResizing: false}, tasks: [
                //             {name: 'Day 1', color: '#9FC5F8', from: new Date(2013, 9, 7, 9, 0, 0), to: new Date(2013, 9, 7, 17, 0, 0),
                //                 progress: {percent: 100, color: '#3C8CF8'}, movable: false},
                //             {name: 'Day 2', color: '#9FC5F8', from: new Date(2013, 9, 8, 9, 0, 0), to: new Date(2013, 9, 8, 17, 0, 0),
                //                 progress: {percent: 100, color: '#3C8CF8'}},
                //             {name: 'Day 3', color: '#9FC5F8', from: new Date(2013, 9, 9, 8, 30, 0), to: new Date(2013, 9, 9, 12, 0, 0),
                //                 progress: {percent: 100, color: '#3C8CF8'}}
                //         ]},
                //         {name: 'Create concept', tasks: [
                //             {name: 'Create concept', color: '#F1C232', from: new Date(2013, 9, 10, 8, 0, 0), to: new Date(2013, 9, 16, 18, 0, 0), est: new Date(2013, 9, 8, 8, 0, 0), lct: new Date(2013, 9, 18, 20, 0, 0),
                //                 progress: 100}
                //         ]},
                //         {name: 'Finalize concept', tasks: [
                //             {name: 'Finalize concept', color: '#F1C232', from: new Date(2013, 9, 17, 8, 0, 0), to: new Date(2013, 9, 18, 18, 0, 0),
                //                 progress: 100}
                //         ]},
                //         {name: 'Sprint 1', tooltips: false, tasks: [
                //             {name: 'Product list view', color: '#F1C232', from: new Date(2013, 9, 21, 8, 0, 0), to: new Date(2013, 9, 25, 15, 0, 0),
                //                 progress: 25}
                //         ]},
                //         {name: 'Sprint 2', tasks: [
                //             {name: 'Order basket', color: '#F1C232', from: new Date(2013, 9, 28, 8, 0, 0), to: new Date(2013, 10, 1, 15, 0, 0)}
                //         ]},
                //         {name: 'Sprint 3', tasks: [
                //             {name: 'Checkout', color: '#F1C232', from: new Date(2013, 10, 4, 8, 0, 0), to: new Date(2013, 10, 8, 15, 0, 0)}
                //         ]},
                //         {name: 'Sprint 4', tasks: [
                //             {name: 'Login & Signup & Admin Views', color: '#F1C232', from: new Date(2013, 10, 11, 8, 0, 0), to: new Date(2013, 10, 15, 15, 0, 0)}
                //         ]},
                //         {name: 'Setup server', tasks: [
                //             {name: 'HW', color: '#F1C232', from: new Date(2013, 10, 18, 8, 0, 0), to: new Date(2013, 10, 18, 12, 0, 0)}
                //         ]},
                //         {name: 'Config server', tasks: [
                //             {name: 'SW / DNS/ Backups', color: '#F1C232', from: new Date(2013, 10, 18, 12, 0, 0), to: new Date(2013, 10, 21, 18, 0, 0)}
                //         ]},
                //         {name: 'Deployment', tasks: [
                //             {name: 'Depl. & Final testing', color: '#F1C232', from: new Date(2013, 10, 21, 8, 0, 0), to: new Date(2013, 10, 22, 12, 0, 0), 'classes': 'gantt-task-deployment'}
                //         ]},
                //         {name: 'Workshop', tasks: [
                //             {name: 'On-side education', color: '#F1C232', from: new Date(2013, 10, 24, 9, 0, 0), to: new Date(2013, 10, 25, 15, 0, 0)}
                //         ]},
                //         {name: 'Content', tasks: [
                //             {name: 'Supervise content creation', color: '#F1C232', from: new Date(2013, 10, 26, 9, 0, 0), to: new Date(2013, 10, 29, 16, 0, 0)}
                //         ]},
                //         {name: 'Documentation', tasks: [
                //             {name: 'Technical/User documentation', color: '#F1C232', from: new Date(2014, 10, 26, 8, 0, 0), to: new Date(2014, 10, 28, 18, 0, 0)}
                //         ]}
                //     ];
            }
        };
    })
;
