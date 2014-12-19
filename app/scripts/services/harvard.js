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
  'machines': [
    {
      'machine': {
        'id': 1,
        'settingsMachine': {
          'id': 1,
          'code': 'PT01',
          'descript': 'Komori 4',
          'name': 'Komori 4',
          'settingsMachineType': {
            'code': 'Komori',
            'descript': 'Komori',
            'color': null
          },
          'dept': {
            'id': 7,
            'code': 'Printing Dept_',
            'name': 'Printing Dept',
            'subDept': '',
            'sortBy': 1
          },
          'unit': 'SHEET',
          'basicSetupTime': 90,
          'basicCapacity': 31,
          'basicPendingMinutes': 0,
          'processingType': 'GANG',
          'monitorAddress': 'dashboard_PT01',
          'camIp': '10.100.0.12',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 2,
          'code': 'PT',
          'descript': 'PT',
          'displayNames': 'PT',
          'needMachine': true,
          'priority': 200,
          'color': '#FFBF00'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Sheet Qty|Data Format|Data Approval|Material|Sheet Size|Combo Type',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': [
        {
          'id': '3376',
          'oid': '3376',
          'part': 0,
          'operationCode': '008141F',
          'priority': 190,
          'job': {
            'id': 76,
            'comboType': '4',
            'comboId': 1684,
            'poNo': '203924',
            'comboQuantity': 15010
          },
          'process': {
            'id': 320,
            'needWaitPrevProcess': true,
            'operations': [
              '3375',
              '3376',
              '3377',
              '3378',
              '3379'
            ],
            'previousProcesses': [],
            'productId': 4486
          },
          'previousOperation': '3375',
          'nextOperations': [
            '3377'
          ],
          'runOnMachineId': 1,
          'actualRunOnMachineId': null,
          'quantity': 752,
          'actualQuantity': 0,
          'processingType': 'GANG',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 4,
          'sheetUp': 20,
          'face': 'F',
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-18T14:45:00.000',
          'expectedSetupFinishTime': '2014-12-18T16:15:00.000',
          'expectedFinishTime': '2014-12-18T16:31:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': '',
          'expectedMoldId': null,
          'tooltip': '203924|008141F|12-18 14:45 - 12-18 16:31|752|Y|Y|White PVC|752|MP',
          'color': '#F0AD4E',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412181445',
          'new': false
        },
        {
          'id': '3752',
          'oid': '3752',
          'part': 0,
          'operationCode': '008151F',
          'priority': 190,
          'job': {
            'id': 99,
            'comboType': '2',
            'comboId': 1738,
            'poNo': '205036e',
            'comboQuantity': 135010
          },
          'process': {
            'id': 390,
            'needWaitPrevProcess': true,
            'operations': [
              '3751',
              '3752',
              '3753',
              '3754',
              '3755',
              '1e21c025',
              '1f4c8062',
              '25ae0223'
            ],
            'previousProcesses': [],
            'productId': 4605
          },
          'previousOperation': '3751',
          'nextOperations': [
            '3753'
          ],
          'runOnMachineId': 1,
          'actualRunOnMachineId': null,
          'quantity': 3960,
          'actualQuantity': 0,
          'processingType': 'GANG',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 36,
          'sheetUp': 36,
          'face': 'F',
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-18T16:32:00.000',
          'expectedSetupFinishTime': '2014-12-18T18:02:00.000',
          'expectedFinishTime': '2014-12-18T19:37:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': '',
          'expectedMoldId': null,
          'tooltip': '205036e|008151F|12-18 16:32 - 12-18 19:37|3960|Y|N|Styrene|3960|M6',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412181445',
          'new': false
        },
        {
          'id': '3753',
          'oid': '3753',
          'part': 0,
          'operationCode': '008151B',
          'priority': 200,
          'job': {
            'id': 99,
            'comboType': '2',
            'comboId': 1738,
            'poNo': '205036e',
            'comboQuantity': 135010
          },
          'process': {
            'id': 390,
            'needWaitPrevProcess': true,
            'operations': [
              '3751',
              '3752',
              '3753',
              '3754',
              '3755',
              '1e21c025',
              '1f4c8062',
              '25ae0223'
            ],
            'previousProcesses': [],
            'productId': 4605
          },
          'previousOperation': '3752',
          'nextOperations': [
            '3754'
          ],
          'runOnMachineId': 1,
          'actualRunOnMachineId': null,
          'quantity': 3960,
          'actualQuantity': 0,
          'processingType': 'GANG',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 36,
          'sheetUp': 36,
          'face': 'B',
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-18T19:38:00.000',
          'expectedSetupFinishTime': '2014-12-18T19:38:00.000',
          'expectedFinishTime': '2014-12-18T21:13:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': '',
          'expectedMoldId': null,
          'tooltip': '205036e|008151B|12-18 19:38 - 12-18 21:13|3960|Y|N|Styrene|3960|M6',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 2,
          'taskGroup': '',
          'machineShiftLabel': '201412181445',
          'new': false
        }
      ]
    },
    {
      'machine': {
        'id': 2,
        'settingsMachine': {
          'id': 2,
          'code': 'PT02',
          'descript': 'Komori 3',
          'name': 'Komori 3',
          'settingsMachineType': {
            'code': 'Komori',
            'descript': 'Komori',
            'color': null
          },
          'dept': {
            'id': 7,
            'code': 'Printing Dept_',
            'name': 'Printing Dept',
            'subDept': '',
            'sortBy': 1
          },
          'unit': 'SHEET',
          'basicSetupTime': 90,
          'basicCapacity': 31,
          'basicPendingMinutes': 0,
          'processingType': 'GANG',
          'monitorAddress': 'dashboard_PT02',
          'camIp': '10.100.0.11',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 2,
          'code': 'PT',
          'descript': 'PT',
          'displayNames': 'PT',
          'needMachine': true,
          'priority': 200,
          'color': '#FFBF00'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Sheet Qty|Data Format|Data Approval|Material|Sheet Size|Combo Type',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': [
        {
          'id': '3553',
          'oid': '3553',
          'part': 0,
          'operationCode': '008150F',
          'priority': 190,
          'job': {
            'id': 87,
            'comboType': '2',
            'comboId': 1725,
            'poNo': '205034e',
            'comboQuantity': 122000
          },
          'process': {
            'id': 354,
            'needWaitPrevProcess': true,
            'operations': [
              '3552',
              '3553',
              '3554',
              '3555',
              '2111c3cc'
            ],
            'previousProcesses': [],
            'productId': 4577
          },
          'previousOperation': '3552',
          'nextOperations': [
            '3554'
          ],
          'runOnMachineId': 2,
          'actualRunOnMachineId': null,
          'quantity': 3520,
          'actualQuantity': 0,
          'processingType': 'GANG',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 36,
          'sheetUp': 36,
          'face': 'F',
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-18T14:45:00.000',
          'expectedSetupFinishTime': '2014-12-18T16:15:00.000',
          'expectedFinishTime': '2014-12-18T17:39:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': '',
          'expectedMoldId': null,
          'tooltip': '205034e|008150F|12-18 14:45 - 12-18 17:39|3520|Y|N|Styrene|3520|M6',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412181445',
          'new': false
        },
        {
          'id': '3554',
          'oid': '3554',
          'part': 0,
          'operationCode': '008150B',
          'priority': 200,
          'job': {
            'id': 87,
            'comboType': '2',
            'comboId': 1725,
            'poNo': '205034e',
            'comboQuantity': 122000
          },
          'process': {
            'id': 354,
            'needWaitPrevProcess': true,
            'operations': [
              '3552',
              '3553',
              '3554',
              '3555',
              '2111c3cc'
            ],
            'previousProcesses': [],
            'productId': 4577
          },
          'previousOperation': '3553',
          'nextOperations': [
            '3555'
          ],
          'runOnMachineId': 2,
          'actualRunOnMachineId': null,
          'quantity': 3520,
          'actualQuantity': 0,
          'processingType': 'GANG',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 36,
          'sheetUp': 36,
          'face': 'B',
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-18T17:40:00.000',
          'expectedSetupFinishTime': '2014-12-18T17:40:00.000',
          'expectedFinishTime': '2014-12-18T19:04:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': '',
          'expectedMoldId': null,
          'tooltip': '205034e|008150B|12-18 17:40 - 12-18 19:04|3520|Y|N|Styrene|3520|M6',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 2,
          'taskGroup': '',
          'machineShiftLabel': '201412181445',
          'new': false
        }
      ]
    },
    {
      'machine': {
        'id': 3,
        'settingsMachine': {
          'id': 3,
          'code': 'PT03',
          'descript': 'Silk Screen',
          'name': 'Silk Screen',
          'settingsMachineType': {
            'code': 'Silk Screen',
            'descript': 'Silk Screen',
            'color': null
          },
          'dept': {
            'id': 7,
            'code': 'Printing Dept_',
            'name': 'Printing Dept',
            'subDept': '',
            'sortBy': 1
          },
          'unit': 'SHEET',
          'basicSetupTime': 60,
          'basicCapacity': 16,
          'basicPendingMinutes': 0,
          'processingType': 'GANG',
          'monitorAddress': 'silkscreen',
          'camIp': '00001',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 3,
          'code': 'PT_SS',
          'descript': 'PT_SS',
          'displayNames': 'Silk Screen',
          'needMachine': true,
          'priority': 300,
          'color': '#30D5C8'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Sheet Qty|Data Format|Data Approval|Material|Sheet Size|Combo Type',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 4,
        'settingsMachine': {
          'id': 4,
          'code': 'MD01',
          'descript': 'MagMaster #1',
          'name': 'MagMaster #1',
          'settingsMachineType': {
            'code': 'MagMaster',
            'descript': 'MagMaster',
            'color': null
          },
          'dept': {
            'id': 8,
            'code': 'Mid Dept_Magnetic',
            'name': 'Mid Dept',
            'subDept': 'Magnetic',
            'sortBy': 2
          },
          'unit': 'CARD',
          'basicSetupTime': 30,
          'basicCapacity': 183,
          'basicPendingMinutes': 0,
          'processingType': 'JOB',
          'monitorAddress': 'magmaster1',
          'camIp': '00002',
          'ssQuantity': 50000,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 4,
          'code': 'MID_MAG_MASTER',
          'descript': 'MID_MAG_MASTER',
          'displayNames': 'Mid Mag',
          'needMachine': true,
          'priority': 500,
          'color': '#00FF00'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|Card Size|Card Name|Material|Magstripe Type|Magstripe Size|Magstripe Color|Magstripe Track#',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': [
        {
          'id': '3379',
          'oid': '3379',
          'part': 0,
          'operationCode': '008141',
          'priority': 1400,
          'job': {
            'id': 76,
            'comboType': '4',
            'comboId': 1684,
            'poNo': '203924',
            'comboQuantity': 15010
          },
          'process': {
            'id': 320,
            'needWaitPrevProcess': true,
            'operations': [
              '3375',
              '3376',
              '3377',
              '3378',
              '3379'
            ],
            'previousProcesses': [],
            'productId': 4486
          },
          'previousOperation': '3378',
          'nextOperations': [],
          'runOnMachineId': 4,
          'actualRunOnMachineId': null,
          'quantity': 752,
          'actualQuantity': 0,
          'processingType': 'GANG',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': 143,
          'up': 4,
          'sheetUp': 20,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-18T19:25:00.000',
          'expectedSetupFinishTime': '2014-12-18T19:55:00.000',
          'expectedFinishTime': '2014-12-18T20:00:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': '',
          'expectedMoldId': null,
          'tooltip': '203924|008141|12-18 19:25 - 12-18 20:00|CARD_QTY|2.125\'x3.375\'   CR-80|Ultra MP Parent SIM Bundle Kit ($29 Airtime + $5 SIM) $34($34.00)|White PVC|Lo-Co|0.33|Brown|2 Track',
          'color': '#F0AD4E',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412181445',
          'new': false
        }
      ]
    },
    {
      'machine': {
        'id': 5,
        'settingsMachine': {
          'id': 5,
          'code': 'MD02',
          'descript': 'MagMaster #2',
          'name': 'MagMaster #2',
          'settingsMachineType': {
            'code': 'MagMaster',
            'descript': 'MagMaster',
            'color': null
          },
          'dept': {
            'id': 8,
            'code': 'Mid Dept_Magnetic',
            'name': 'Mid Dept',
            'subDept': 'Magnetic',
            'sortBy': 2
          },
          'unit': 'CARD',
          'basicSetupTime': 30,
          'basicCapacity': 183,
          'basicPendingMinutes': 0,
          'processingType': 'JOB',
          'monitorAddress': 'magmaster2',
          'camIp': '00003',
          'ssQuantity': 50000,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 4,
          'code': 'MID_MAG_MASTER',
          'descript': 'MID_MAG_MASTER',
          'displayNames': 'Mid Mag',
          'needMachine': true,
          'priority': 500,
          'color': '#00FF00'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|Card Size|Card Name|Material|Magstripe Type|Magstripe Size|Magstripe Color|Magstripe Track#',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 7,
        'settingsMachine': {
          'id': 7,
          'code': 'MD03',
          'descript': 'MTL-700 #1 (Sheets)',
          'name': 'MTL-700 #1 (Sheets)',
          'settingsMachineType': {
            'code': 'MTL',
            'descript': 'MTL',
            'color': null
          },
          'dept': {
            'id': 8,
            'code': 'Mid Dept_Magnetic',
            'name': 'Mid Dept',
            'subDept': 'Magnetic',
            'sortBy': 2
          },
          'unit': 'SHEET',
          'basicSetupTime': 30,
          'basicCapacity': 7,
          'basicPendingMinutes': 0,
          'processingType': 'GANG',
          'monitorAddress': 'mtl700-1',
          'camIp': '10.100.0.13',
          'ssQuantity': 2000,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 5,
          'code': 'MID_MAG_MTL',
          'descript': 'MID_MAG_MTL',
          'displayNames': 'Mid Mag',
          'needMachine': true,
          'priority': 600,
          'color': '#000080'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Sheet Qty|Data Format|Data Approval|Card Size|Material|Lamination Front|Lamination Back|Magstripe Type|Magstripe Size|Magstripe Color|Magstripe Track#',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': [
        {
          'id': '3754',
          'oid': '3754',
          'part': 0,
          'operationCode': '008151',
          'priority': 467,
          'job': {
            'id': 99,
            'comboType': '2',
            'comboId': 1738,
            'poNo': '205036e',
            'comboQuantity': 135010
          },
          'process': {
            'id': 390,
            'needWaitPrevProcess': true,
            'operations': [
              '3751',
              '3752',
              '3753',
              '3754',
              '3755',
              '1e21c025',
              '1f4c8062',
              '25ae0223'
            ],
            'previousProcesses': [],
            'productId': 4605
          },
          'previousOperation': '3753',
          'nextOperations': [
            '1e21c025'
          ],
          'runOnMachineId': 7,
          'actualRunOnMachineId': null,
          'quantity': 637,
          'actualQuantity': 0,
          'processingType': 'GANG',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 36,
          'sheetUp': 36,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-18T21:14:00.000',
          'expectedSetupFinishTime': '2014-12-18T21:44:00.000',
          'expectedFinishTime': '2014-12-18T23:15:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': '',
          'expectedMoldId': null,
          'tooltip': '205036e|008151|12-18 21:14 - 12-18 23:15|637|Y|N|4.875\'x3.375\'|Styrene|||Lo-Co|0.391|Brown|2 Track',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412181445',
          'new': false
        },
        {
          'id': '1e21c025',
          'oid': '3754',
          'part': 1,
          'operationCode': '008151',
          'priority': 467,
          'job': {
            'id': 99,
            'comboType': '2',
            'comboId': 1738,
            'poNo': '205036e',
            'comboQuantity': 135010
          },
          'process': {
            'id': 390,
            'needWaitPrevProcess': true,
            'operations': [
              '3751',
              '3752',
              '3753',
              '3754',
              '3755',
              '1e21c025',
              '1f4c8062',
              '25ae0223'
            ],
            'previousProcesses': [],
            'productId': 4605
          },
          'previousOperation': '3754',
          'nextOperations': [
            '3755'
          ],
          'runOnMachineId': 7,
          'actualRunOnMachineId': null,
          'quantity': 3323,
          'actualQuantity': 0,
          'processingType': 'GANG',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 36,
          'sheetUp': 36,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-19T05:45:00.000',
          'expectedSetupFinishTime': '2014-12-19T05:45:00.000',
          'expectedFinishTime': '2014-12-19T13:40:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': '',
          'expectedMoldId': null,
          'tooltip': '',
          'color': '',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412190545',
          'new': true
        }
      ]
    },
    {
      'machine': {
        'id': 8,
        'settingsMachine': {
          'id': 8,
          'code': 'MD04',
          'descript': 'MTL-700 #2 (Sheets)',
          'name': 'MTL-700 #2 (Sheets)',
          'settingsMachineType': {
            'code': 'MTL',
            'descript': 'MTL',
            'color': null
          },
          'dept': {
            'id': 8,
            'code': 'Mid Dept_Magnetic',
            'name': 'Mid Dept',
            'subDept': 'Magnetic',
            'sortBy': 2
          },
          'unit': 'SHEET',
          'basicSetupTime': 30,
          'basicCapacity': 7,
          'basicPendingMinutes': 0,
          'processingType': 'GANG',
          'monitorAddress': 'mtl700-2',
          'camIp': '10.100.0.14',
          'ssQuantity': 2000,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 5,
          'code': 'MID_MAG_MTL',
          'descript': 'MID_MAG_MTL',
          'displayNames': 'Mid Mag',
          'needMachine': true,
          'priority': 600,
          'color': '#000080'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Sheet Qty|Data Format|Data Approval|Card Size|Material|Lamination Front|Lamination Back|Magstripe Type|Magstripe Size|Magstripe Color|Magstripe Track#',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': [
        {
          'id': '3768',
          'oid': '3768',
          'part': 0,
          'operationCode': '008153',
          'priority': 600,
          'job': {
            'id': 100,
            'comboType': '2',
            'comboId': 1739,
            'poNo': '205020e',
            'comboQuantity': 10000
          },
          'process': {
            'id': 393,
            'needWaitPrevProcess': true,
            'operations': [
              '3768',
              '3769',
              '3770'
            ],
            'previousProcesses': [],
            'productId': 4607
          },
          'previousOperation': null,
          'nextOperations': [
            '3769'
          ],
          'runOnMachineId': 8,
          'actualRunOnMachineId': null,
          'quantity': 218,
          'actualQuantity': 0,
          'processingType': 'GANG',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 55,
          'sheetUp': 55,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-18T14:45:00.000',
          'expectedSetupFinishTime': '2014-12-18T15:15:00.000',
          'expectedFinishTime': '2014-12-18T15:47:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': '',
          'expectedMoldId': null,
          'tooltip': '205020e|008153|12-18 14:45 - 12-18 15:47|218|N|N|5.25\'x3.375\'|Paper C2S|||Lo-Co|0.391|Brown|2 Track',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '8-008153-1-0-201412151445',
          'machineShiftLabel': '201412181445',
          'new': false
        }
      ]
    },
    {
      'machine': {
        'id': 9,
        'settingsMachine': {
          'id': 9,
          'code': 'MD05',
          'descript': 'MTL-700 #3 (Sheets)',
          'name': 'MTL-700 #3 (Sheets)',
          'settingsMachineType': {
            'code': 'MTL',
            'descript': 'MTL',
            'color': null
          },
          'dept': {
            'id': 8,
            'code': 'Mid Dept_Magnetic',
            'name': 'Mid Dept',
            'subDept': 'Magnetic',
            'sortBy': 2
          },
          'unit': 'SHEET',
          'basicSetupTime': 30,
          'basicCapacity': 7,
          'basicPendingMinutes': 0,
          'processingType': 'GANG',
          'monitorAddress': 'mtl700-3',
          'camIp': '10.100.0.15',
          'ssQuantity': 2000,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 5,
          'code': 'MID_MAG_MTL',
          'descript': 'MID_MAG_MTL',
          'displayNames': 'Mid Mag',
          'needMachine': true,
          'priority': 600,
          'color': '#000080'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Sheet Qty|Data Format|Data Approval|Card Size|Material|Lamination Front|Lamination Back|Magstripe Type|Magstripe Size|Magstripe Color|Magstripe Track#',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 88,
        'settingsMachine': {
          'id': 88,
          'code': 'MD27',
          'descript': 'MTL-700 #4 (Sheets)',
          'name': 'MTL-700 #4 (Sheets)',
          'settingsMachineType': {
            'code': 'MTL',
            'descript': 'MTL',
            'color': null
          },
          'dept': {
            'id': 8,
            'code': 'Mid Dept_Magnetic',
            'name': 'Mid Dept',
            'subDept': 'Magnetic',
            'sortBy': 2
          },
          'unit': 'SHEET',
          'basicSetupTime': 30,
          'basicCapacity': 7,
          'basicPendingMinutes': 0,
          'processingType': 'GANG',
          'monitorAddress': 'mtl700-4',
          'camIp': '',
          'ssQuantity': 2000,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 5,
          'code': 'MID_MAG_MTL',
          'descript': 'MID_MAG_MTL',
          'displayNames': 'Mid Mag',
          'needMachine': true,
          'priority': 600,
          'color': '#000080'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Sheet Qty|Data Format|Data Approval|Card Size|Material|Lamination Front|Lamination Back|Magstripe Type|Magstripe Size|Magstripe Color|Magstripe Track#',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 12,
        'settingsMachine': {
          'id': 12,
          'code': 'MD07',
          'descript': 'SYSCO (No actual Production)',
          'name': 'SYSCO (No actual Production)',
          'settingsMachineType': {
            'code': 'SYSCO',
            'descript': 'SYSCO',
            'color': null
          },
          'dept': {
            'id': 10,
            'code': 'Mid Dept_Lamination',
            'name': 'Mid Dept',
            'subDept': 'Lamination',
            'sortBy': 4
          },
          'unit': 'CARD',
          'basicSetupTime': 0,
          'basicCapacity': 2147483647,
          'basicPendingMinutes': 0,
          'processingType': 'GANG',
          'monitorAddress': '192.168.1.11',
          'camIp': '00007',
          'ssQuantity': 0,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 6,
          'code': 'MID_LAM_SYSCO',
          'descript': 'MID_LAM_SYSCO',
          'displayNames': 'Mid Lam',
          'needMachine': true,
          'priority': 700,
          'color': '#E32636'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Sheet Qty|Data Format|Data Approval|Card Size|Material|Lamination Front|Lamination Back|Magstripe Type|Magstripe Size|Magstripe Color|Magstripe Track#',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 13,
        'settingsMachine': {
          'id': 13,
          'code': 'MD20',
          'descript': 'SYSCO (No actual Production)',
          'name': 'SYSCO (No actual Production)',
          'settingsMachineType': {
            'code': 'SYSCO',
            'descript': 'SYSCO',
            'color': null
          },
          'dept': {
            'id': 10,
            'code': 'Mid Dept_Lamination',
            'name': 'Mid Dept',
            'subDept': 'Lamination',
            'sortBy': 4
          },
          'unit': 'CARD',
          'basicSetupTime': 0,
          'basicCapacity': 2147483647,
          'basicPendingMinutes': 0,
          'processingType': 'GANG',
          'monitorAddress': '192.168.1.12',
          'camIp': '00008',
          'ssQuantity': 0,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 6,
          'code': 'MID_LAM_SYSCO',
          'descript': 'MID_LAM_SYSCO',
          'displayNames': 'Mid Lam',
          'needMachine': true,
          'priority': 700,
          'color': '#E32636'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Sheet Qty|Data Format|Data Approval|Card Size|Material|Lamination Front|Lamination Back|Magstripe Type|Magstripe Size|Magstripe Color|Magstripe Track#',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 16,
        'settingsMachine': {
          'id': 16,
          'code': 'MD19',
          'descript': 'Collate #3',
          'name': 'Collate #3',
          'settingsMachineType': {
            'code': 'Collate',
            'descript': 'Collate',
            'color': null
          },
          'dept': {
            'id': 10,
            'code': 'Mid Dept_Lamination',
            'name': 'Mid Dept',
            'subDept': 'Lamination',
            'sortBy': 4
          },
          'unit': 'SHEET',
          'basicSetupTime': 30,
          'basicCapacity': 9,
          'basicPendingMinutes': 0,
          'processingType': 'GANG',
          'monitorAddress': '192.168.1.15',
          'camIp': '000011',
          'ssQuantity': 2000,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 7,
          'code': 'MID_LAM_COLLATE',
          'descript': 'MID_LAM_COLLATE',
          'displayNames': 'Mid Lam',
          'needMachine': true,
          'priority': 800,
          'color': '#4B0080'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Sheet Qty|Data Format|Data Approval|Card Size|Material|Lamination Front|Lamination Back|Magstripe Type|Magstripe Size|Magstripe Color|Magstripe Track#',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 14,
        'settingsMachine': {
          'id': 14,
          'code': 'MD08',
          'descript': 'Collate #1 (350/hr)',
          'name': 'Collate #1 (350/hr)',
          'settingsMachineType': {
            'code': 'Collate',
            'descript': 'Collate',
            'color': null
          },
          'dept': {
            'id': 10,
            'code': 'Mid Dept_Lamination',
            'name': 'Mid Dept',
            'subDept': 'Lamination',
            'sortBy': 4
          },
          'unit': 'SHEET',
          'basicSetupTime': 30,
          'basicCapacity': 5,
          'basicPendingMinutes': 0,
          'processingType': 'GANG',
          'monitorAddress': 'collate1',
          'camIp': '00009',
          'ssQuantity': 2000,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 7,
          'code': 'MID_LAM_COLLATE',
          'descript': 'MID_LAM_COLLATE',
          'displayNames': 'Mid Lam',
          'needMachine': true,
          'priority': 800,
          'color': '#4B0080'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Sheet Qty|Data Format|Data Approval|Card Size|Material|Lamination Front|Lamination Back|Magstripe Type|Magstripe Size|Magstripe Color|Magstripe Track#',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 15,
        'settingsMachine': {
          'id': 15,
          'code': 'MD09',
          'descript': 'Collate #2 (350/hr)',
          'name': 'Collate #2 (350/hr)',
          'settingsMachineType': {
            'code': 'Collate',
            'descript': 'Collate',
            'color': null
          },
          'dept': {
            'id': 10,
            'code': 'Mid Dept_Lamination',
            'name': 'Mid Dept',
            'subDept': 'Lamination',
            'sortBy': 4
          },
          'unit': 'SHEET',
          'basicSetupTime': 30,
          'basicCapacity': 5,
          'basicPendingMinutes': 0,
          'processingType': 'GANG',
          'monitorAddress': 'collate2',
          'camIp': '000010',
          'ssQuantity': 2000,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 7,
          'code': 'MID_LAM_COLLATE',
          'descript': 'MID_LAM_COLLATE',
          'displayNames': 'Mid Lam',
          'needMachine': true,
          'priority': 800,
          'color': '#4B0080'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Sheet Qty|Data Format|Data Approval|Card Size|Material|Lamination Front|Lamination Back|Magstripe Type|Magstripe Size|Magstripe Color|Magstripe Track#',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 17,
        'settingsMachine': {
          'id': 17,
          'code': 'MD10',
          'descript': 'OASYS #1',
          'name': 'OASYS #1',
          'settingsMachineType': {
            'code': 'OASYS',
            'descript': 'OASYS',
            'color': null
          },
          'dept': {
            'id': 10,
            'code': 'Mid Dept_Lamination',
            'name': 'Mid Dept',
            'subDept': 'Lamination',
            'sortBy': 4
          },
          'unit': 'SHEET',
          'basicSetupTime': 240,
          'basicCapacity': 5,
          'basicPendingMinutes': 0,
          'processingType': 'GANG',
          'monitorAddress': 'oasys1',
          'camIp': '000012',
          'ssQuantity': 2000,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 8,
          'code': 'MID_LAM_OASYS',
          'descript': 'MID_LAM_OASYS',
          'displayNames': 'Mid Lam',
          'needMachine': true,
          'priority': 900,
          'color': '#FFFF00'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Sheet Qty|Data Format|Data Approval|Card Size|Material|Lamination Front|Lamination Back|Magstripe Type|Magstripe Size|Magstripe Color|Magstripe Track#',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 18,
        'settingsMachine': {
          'id': 18,
          'code': 'MD11',
          'descript': 'OASYS #2',
          'name': 'OASYS #2',
          'settingsMachineType': {
            'code': 'OASYS',
            'descript': 'OASYS',
            'color': null
          },
          'dept': {
            'id': 10,
            'code': 'Mid Dept_Lamination',
            'name': 'Mid Dept',
            'subDept': 'Lamination',
            'sortBy': 4
          },
          'unit': 'SHEET',
          'basicSetupTime': 240,
          'basicCapacity': 5,
          'basicPendingMinutes': 0,
          'processingType': 'GANG',
          'monitorAddress': 'oasys2',
          'camIp': '000013',
          'ssQuantity': 2000,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 8,
          'code': 'MID_LAM_OASYS',
          'descript': 'MID_LAM_OASYS',
          'displayNames': 'Mid Lam',
          'needMachine': true,
          'priority': 900,
          'color': '#FFFF00'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Sheet Qty|Data Format|Data Approval|Card Size|Material|Lamination Front|Lamination Back|Magstripe Type|Magstripe Size|Magstripe Color|Magstripe Track#',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 19,
        'settingsMachine': {
          'id': 19,
          'code': 'MD12',
          'descript': 'Car 25  1 (CR-80)',
          'name': 'Car 25  1 (CR-80)',
          'settingsMachineType': {
            'code': 'CAR25',
            'descript': 'CAR25',
            'color': null
          },
          'dept': {
            'id': 11,
            'code': 'Mid Dept_Die Cut',
            'name': 'Mid Dept',
            'subDept': 'Die Cut',
            'sortBy': 5
          },
          'unit': 'SHEET',
          'basicSetupTime': 15,
          'basicCapacity': 5,
          'basicPendingMinutes': 0,
          'processingType': 'GANG',
          'monitorAddress': 'car25-1',
          'camIp': '10.100.0.16',
          'ssQuantity': 2000,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 9,
          'code': 'MID_DIE_CAR25',
          'descript': 'MID_DIE_CAR25',
          'displayNames': 'Mid Die Cut',
          'needMachine': true,
          'priority': 1000,
          'color': '#00FFFF'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Sheet Qty|Data Format|Data Approval|Card Size|Material|Lamination Front|Lamination Back|Magstripe Type|Magstripe Size|Magstripe Color|Magstripe Track#',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 20,
        'settingsMachine': {
          'id': 20,
          'code': 'MD13',
          'descript': 'Car  25 2',
          'name': 'Car  25 2',
          'settingsMachineType': {
            'code': 'CAR25',
            'descript': 'CAR25',
            'color': null
          },
          'dept': {
            'id': 11,
            'code': 'Mid Dept_Die Cut',
            'name': 'Mid Dept',
            'subDept': 'Die Cut',
            'sortBy': 5
          },
          'unit': 'SHEET',
          'basicSetupTime': 15,
          'basicCapacity': 5,
          'basicPendingMinutes': 0,
          'processingType': 'GANG',
          'monitorAddress': 'car25-2',
          'camIp': '10.100.0.17',
          'ssQuantity': 2000,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 9,
          'code': 'MID_DIE_CAR25',
          'descript': 'MID_DIE_CAR25',
          'displayNames': 'Mid Die Cut',
          'needMachine': true,
          'priority': 1000,
          'color': '#00FFFF'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Sheet Qty|Data Format|Data Approval|Card Size|Material|Lamination Front|Lamination Back|Magstripe Type|Magstripe Size|Magstripe Color|Magstripe Track#',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': [
        {
          'id': '3555',
          'oid': '3555',
          'part': 0,
          'operationCode': '008150',
          'priority': 1000,
          'job': {
            'id': 87,
            'comboType': '2',
            'comboId': 1725,
            'poNo': '205034e',
            'comboQuantity': 122000
          },
          'process': {
            'id': 354,
            'needWaitPrevProcess': true,
            'operations': [
              '3552',
              '3553',
              '3554',
              '3555',
              '2111c3cc'
            ],
            'previousProcesses': [],
            'productId': 4577
          },
          'previousOperation': '3554',
          'nextOperations': [],
          'runOnMachineId': 20,
          'actualRunOnMachineId': null,
          'quantity': 1175,
          'actualQuantity': 0,
          'processingType': 'GANG',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 36,
          'sheetUp': 36,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-18T19:05:00.000',
          'expectedSetupFinishTime': '2014-12-18T19:20:00.000',
          'expectedFinishTime': '2014-12-18T23:15:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': '',
          'expectedMoldId': 417,
          'tooltip': '205034e|008150|12-18 19:05 - 12-18 23:15|1175|Y|N|4.875\'x3.375\'|Styrene||||||',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412181445',
          'new': false
        },
        {
          'id': '2111c3cc',
          'oid': '3555',
          'part': 1,
          'operationCode': '008150',
          'priority': 1000,
          'job': {
            'id': 87,
            'comboType': '2',
            'comboId': 1725,
            'poNo': '205034e',
            'comboQuantity': 122000
          },
          'process': {
            'id': 354,
            'needWaitPrevProcess': true,
            'operations': [
              '3552',
              '3553',
              '3554',
              '3555',
              '2111c3cc'
            ],
            'previousProcesses': [],
            'productId': 4577
          },
          'previousOperation': '3555',
          'nextOperations': [],
          'runOnMachineId': 20,
          'actualRunOnMachineId': null,
          'quantity': 2345,
          'actualQuantity': 0,
          'processingType': 'GANG',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 36,
          'sheetUp': 36,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-19T05:45:00.000',
          'expectedSetupFinishTime': '2014-12-19T05:45:00.000',
          'expectedFinishTime': '2014-12-19T13:34:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': '',
          'expectedMoldId': 417,
          'tooltip': '',
          'color': '',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412190545',
          'new': true
        },
        {
          'id': '3755',
          'oid': '3755',
          'part': 0,
          'operationCode': '008151',
          'priority': 1000,
          'job': {
            'id': 99,
            'comboType': '2',
            'comboId': 1738,
            'poNo': '205036e',
            'comboQuantity': 135010
          },
          'process': {
            'id': 390,
            'needWaitPrevProcess': true,
            'operations': [
              '3751',
              '3752',
              '3753',
              '3754',
              '3755',
              '1e21c025',
              '1f4c8062',
              '25ae0223'
            ],
            'previousProcesses': [],
            'productId': 4605
          },
          'previousOperation': '1e21c025',
          'nextOperations': [],
          'runOnMachineId': 20,
          'actualRunOnMachineId': null,
          'quantity': 95,
          'actualQuantity': 0,
          'processingType': 'GANG',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': 286,
          'up': 36,
          'sheetUp': 36,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-19T13:41:00.000',
          'expectedSetupFinishTime': '2014-12-19T13:56:00.000',
          'expectedFinishTime': '2014-12-19T14:15:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': '',
          'expectedMoldId': 417,
          'tooltip': '205036e|008151|12-19 13:41 - 12-19 14:15|95|Y|N|4.875\'x3.375\'|Styrene|||Lo-Co|0.391|Brown|2 Track',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412190545',
          'new': false
        },
        {
          'id': '1f4c8062',
          'oid': '3755',
          'part': 1,
          'operationCode': '008151',
          'priority': 1000,
          'job': {
            'id': 99,
            'comboType': '2',
            'comboId': 1738,
            'poNo': '205036e',
            'comboQuantity': 135010
          },
          'process': {
            'id': 390,
            'needWaitPrevProcess': true,
            'operations': [
              '3751',
              '3752',
              '3753',
              '3754',
              '3755',
              '1e21c025',
              '1f4c8062',
              '25ae0223'
            ],
            'previousProcesses': [],
            'productId': 4605
          },
          'previousOperation': '3755',
          'nextOperations': [],
          'runOnMachineId': 20,
          'actualRunOnMachineId': null,
          'quantity': 2550,
          'actualQuantity': 0,
          'processingType': 'GANG',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 36,
          'sheetUp': 36,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-19T14:45:00.000',
          'expectedSetupFinishTime': '2014-12-19T14:45:00.000',
          'expectedFinishTime': '2014-12-19T23:15:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': '',
          'expectedMoldId': 417,
          'tooltip': '',
          'color': '',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412191445',
          'new': true
        },
        {
          'id': '25ae0223',
          'oid': '3755',
          'part': 2,
          'operationCode': '008151',
          'priority': 1000,
          'job': {
            'id': 99,
            'comboType': '2',
            'comboId': 1738,
            'poNo': '205036e',
            'comboQuantity': 135010
          },
          'process': {
            'id': 390,
            'needWaitPrevProcess': true,
            'operations': [
              '3751',
              '3752',
              '3753',
              '3754',
              '3755',
              '1e21c025',
              '1f4c8062',
              '25ae0223'
            ],
            'previousProcesses': [],
            'productId': 4605
          },
          'previousOperation': '1f4c8062',
          'nextOperations': [],
          'runOnMachineId': 20,
          'actualRunOnMachineId': null,
          'quantity': 1315,
          'actualQuantity': 0,
          'processingType': 'GANG',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 36,
          'sheetUp': 36,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-20T05:45:00.000',
          'expectedSetupFinishTime': '2014-12-20T05:45:00.000',
          'expectedFinishTime': '2014-12-20T10:08:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': '',
          'expectedMoldId': 417,
          'tooltip': '',
          'color': '',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412200545',
          'new': true
        }
      ]
    },
    {
      'machine': {
        'id': 21,
        'settingsMachine': {
          'id': 21,
          'code': 'MD14',
          'descript': 'Car  25 3 (Mini CR-80 or CR-80 option)',
          'name': 'Car  25 3 (Mini CR-80 or CR-80 option)',
          'settingsMachineType': {
            'code': 'CAR25',
            'descript': 'CAR25',
            'color': null
          },
          'dept': {
            'id': 11,
            'code': 'Mid Dept_Die Cut',
            'name': 'Mid Dept',
            'subDept': 'Die Cut',
            'sortBy': 5
          },
          'unit': 'SHEET',
          'basicSetupTime': 15,
          'basicCapacity': 5,
          'basicPendingMinutes': 0,
          'processingType': 'GANG',
          'monitorAddress': 'car25-3',
          'camIp': '10.100.0.18',
          'ssQuantity': 2000,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 9,
          'code': 'MID_DIE_CAR25',
          'descript': 'MID_DIE_CAR25',
          'displayNames': 'Mid Die Cut',
          'needMachine': true,
          'priority': 1000,
          'color': '#00FFFF'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Sheet Qty|Data Format|Data Approval|Card Size|Material|Lamination Front|Lamination Back|Magstripe Type|Magstripe Size|Magstripe Color|Magstripe Track#',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 22,
        'settingsMachine': {
          'id': 22,
          'code': 'MD15',
          'descript': 'Car  25 4',
          'name': 'Car  25 4',
          'settingsMachineType': {
            'code': 'CAR25',
            'descript': 'CAR25',
            'color': null
          },
          'dept': {
            'id': 11,
            'code': 'Mid Dept_Die Cut',
            'name': 'Mid Dept',
            'subDept': 'Die Cut',
            'sortBy': 5
          },
          'unit': 'SHEET',
          'basicSetupTime': 15,
          'basicCapacity': 5,
          'basicPendingMinutes': 0,
          'processingType': 'GANG',
          'monitorAddress': 'car25-4',
          'camIp': '10.100.0.19',
          'ssQuantity': 2000,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 9,
          'code': 'MID_DIE_CAR25',
          'descript': 'MID_DIE_CAR25',
          'displayNames': 'Mid Die Cut',
          'needMachine': true,
          'priority': 1000,
          'color': '#00FFFF'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Sheet Qty|Data Format|Data Approval|Card Size|Material|Lamination Front|Lamination Back|Magstripe Type|Magstripe Size|Magstripe Color|Magstripe Track#',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 23,
        'settingsMachine': {
          'id': 23,
          'code': 'MD16',
          'descript': 'Bobst 106E',
          'name': 'Bobst 106E',
          'settingsMachineType': {
            'code': 'BOBST106',
            'descript': 'BOBST106',
            'color': null
          },
          'dept': {
            'id': 11,
            'code': 'Mid Dept_Die Cut',
            'name': 'Mid Dept',
            'subDept': 'Die Cut',
            'sortBy': 5
          },
          'unit': 'SHEET',
          'basicSetupTime': 15,
          'basicCapacity': 27,
          'basicPendingMinutes': 0,
          'processingType': 'GANG',
          'monitorAddress': 'bobst106e',
          'camIp': '10.100.0.21',
          'ssQuantity': 2000,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 10,
          'code': 'MID_DIE_BOBST_106',
          'descript': 'MID_DIE_BOBST_106',
          'displayNames': 'Mid Die Cut',
          'needMachine': true,
          'priority': 1300,
          'color': '#6495ED'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Sheet Qty|Data Format|Data Approval|Card Size|Material|Lamination Front|Lamination Back|Magstripe Type|Magstripe Size|Magstripe Color|Magstripe Track#',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': [
        {
          'id': '3769',
          'oid': '3769',
          'part': 0,
          'operationCode': '008153',
          'priority': 867,
          'job': {
            'id': 100,
            'comboType': '2',
            'comboId': 1739,
            'poNo': '205020e',
            'comboQuantity': 10000
          },
          'process': {
            'id': 393,
            'needWaitPrevProcess': true,
            'operations': [
              '3768',
              '3769',
              '3770'
            ],
            'previousProcesses': [],
            'productId': 4607
          },
          'previousOperation': '3768',
          'nextOperations': [
            '3770'
          ],
          'runOnMachineId': 23,
          'actualRunOnMachineId': null,
          'quantity': 218,
          'actualQuantity': 0,
          'processingType': 'GANG',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': 286,
          'up': 55,
          'sheetUp': 55,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-18T15:48:00.000',
          'expectedSetupFinishTime': '2014-12-18T16:03:00.000',
          'expectedFinishTime': '2014-12-18T16:12:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': '',
          'expectedMoldId': 434,
          'tooltip': '205020e|008153|12-18 15:48 - 12-18 16:12|218|N|N|5.25\'x3.375\'|Paper C2S|||Lo-Co|0.391|Brown|2 Track',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '23-008153-1-0-201412151445',
          'machineShiftLabel': '201412181445',
          'new': false
        },
        {
          'id': '3377',
          'oid': '3377',
          'part': 0,
          'operationCode': '008141',
          'priority': 500,
          'job': {
            'id': 76,
            'comboType': '4',
            'comboId': 1684,
            'poNo': '203924',
            'comboQuantity': 15010
          },
          'process': {
            'id': 320,
            'needWaitPrevProcess': true,
            'operations': [
              '3375',
              '3376',
              '3377',
              '3378',
              '3379'
            ],
            'previousProcesses': [],
            'productId': 4486
          },
          'previousOperation': '3376',
          'nextOperations': [
            '3378'
          ],
          'runOnMachineId': 23,
          'actualRunOnMachineId': null,
          'quantity': 752,
          'actualQuantity': 0,
          'processingType': 'GANG',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 4,
          'sheetUp': 20,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-18T16:32:00.000',
          'expectedSetupFinishTime': '2014-12-18T16:47:00.000',
          'expectedFinishTime': '2014-12-18T17:15:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': '',
          'expectedMoldId': 446,
          'tooltip': '203924|008141|12-18 16:32 - 12-18 17:15|752|Y|Y|2.125\'x3.375\'   CR-80|White PVC|||Lo-Co|0.33|Brown|2 Track',
          'color': '#F0AD4E',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412181445',
          'new': false
        }
      ]
    },
    {
      'machine': {
        'id': 25,
        'settingsMachine': {
          'id': 25,
          'code': 'MD22',
          'descript': 'Blanker',
          'name': 'Blanker',
          'settingsMachineType': {
            'code': 'Blanker',
            'descript': 'Blanker',
            'color': null
          },
          'dept': {
            'id': 11,
            'code': 'Mid Dept_Die Cut',
            'name': 'Mid Dept',
            'subDept': 'Die Cut',
            'sortBy': 5
          },
          'unit': 'SHEET',
          'basicSetupTime': 60,
          'basicCapacity': 14,
          'basicPendingMinutes': 0,
          'processingType': 'GANG',
          'monitorAddress': '192.168.1.23',
          'camIp': '000052',
          'ssQuantity': 2000,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 11,
          'code': 'MID_DIE_BLANKER',
          'descript': 'MID_DIE_BLANKER',
          'displayNames': 'Mid Die Cut',
          'needMachine': true,
          'priority': 1400,
          'color': '#7FFFD4'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Sheet Qty|Data Format|Data Approval|Card Size|Material|Lamination Front|Lamination Back|Magstripe Type|Magstripe Size|Magstripe Color|Magstripe Track#',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': [
        {
          'id': '3770',
          'oid': '3770',
          'part': 0,
          'operationCode': '008153',
          'priority': 1400,
          'job': {
            'id': 100,
            'comboType': '2',
            'comboId': 1739,
            'poNo': '205020e',
            'comboQuantity': 10000
          },
          'process': {
            'id': 393,
            'needWaitPrevProcess': true,
            'operations': [
              '3768',
              '3769',
              '3770'
            ],
            'previousProcesses': [],
            'productId': 4607
          },
          'previousOperation': '3769',
          'nextOperations': [],
          'runOnMachineId': 25,
          'actualRunOnMachineId': null,
          'quantity': 218,
          'actualQuantity': 0,
          'processingType': 'GANG',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': 75,
          'up': 55,
          'sheetUp': 55,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-18T16:13:00.000',
          'expectedSetupFinishTime': '2014-12-18T17:13:00.000',
          'expectedFinishTime': '2014-12-18T17:29:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': '',
          'expectedMoldId': null,
          'tooltip': '205020e|008153|12-18 16:13 - 12-18 17:29|218|N|N|5.25\'x3.375\'|Paper C2S|||Lo-Co|0.391|Brown|2 Track',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '25-008153-1-0-201412160545',
          'machineShiftLabel': '201412181445',
          'new': false
        },
        {
          'id': '3378',
          'oid': '3378',
          'part': 0,
          'operationCode': '008141',
          'priority': 800,
          'job': {
            'id': 76,
            'comboType': '4',
            'comboId': 1684,
            'poNo': '203924',
            'comboQuantity': 15010
          },
          'process': {
            'id': 320,
            'needWaitPrevProcess': true,
            'operations': [
              '3375',
              '3376',
              '3377',
              '3378',
              '3379'
            ],
            'previousProcesses': [],
            'productId': 4486
          },
          'previousOperation': '3377',
          'nextOperations': [
            '3379'
          ],
          'runOnMachineId': 25,
          'actualRunOnMachineId': null,
          'quantity': 752,
          'actualQuantity': 0,
          'processingType': 'GANG',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': 75,
          'up': 4,
          'sheetUp': 20,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-18T17:30:00.000',
          'expectedSetupFinishTime': '2014-12-18T18:30:00.000',
          'expectedFinishTime': '2014-12-18T19:24:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': '',
          'expectedMoldId': null,
          'tooltip': '203924|008141|12-18 17:30 - 12-18 19:24|752|Y|Y|2.125\'x3.375\'   CR-80|White PVC|||Lo-Co|0.33|Brown|2 Track',
          'color': '#F0AD4E',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412181445',
          'new': false
        }
      ]
    },
    {
      'machine': {
        'id': 113,
        'settingsMachine': {
          'id': 113,
          'code': 'MD28',
          'descript': '',
          'name': 'Manual Blanker(V)',
          'settingsMachineType': {
            'code': 'Blanker',
            'descript': 'Blanker',
            'color': null
          },
          'dept': {
            'id': 11,
            'code': 'Mid Dept_Die Cut',
            'name': 'Mid Dept',
            'subDept': 'Die Cut',
            'sortBy': 5
          },
          'unit': 'SHEET',
          'basicSetupTime': 0,
          'basicCapacity': 2,
          'basicPendingMinutes': 0,
          'processingType': 'GANG',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 2000,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 11,
          'code': 'MID_DIE_BLANKER',
          'descript': 'MID_DIE_BLANKER',
          'displayNames': 'Mid Die Cut',
          'needMachine': true,
          'priority': 1400,
          'color': '#7FFFD4'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Sheet Qty|Data Format|Data Approval|Card Size|Material|Lamination Front|Lamination Back|Magstripe Type|Magstripe Size|Magstripe Color|Magstripe Track#',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 26,
        'settingsMachine': {
          'id': 26,
          'code': 'MD23',
          'descript': 'challenge',
          'name': 'challenge',
          'settingsMachineType': {
            'code': 'Challenge',
            'descript': 'Challenge',
            'color': null
          },
          'dept': {
            'id': 11,
            'code': 'Mid Dept_Die Cut',
            'name': 'Mid Dept',
            'subDept': 'Die Cut',
            'sortBy': 5
          },
          'unit': 'SHEET',
          'basicSetupTime': 30,
          'basicCapacity': 2147483647,
          'basicPendingMinutes': 0,
          'processingType': 'GANG',
          'monitorAddress': '192.168.1.25',
          'camIp': '000053',
          'ssQuantity': 0,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 12,
          'code': 'MID_DIE_SHEETCUT',
          'descript': 'MID_DIE_SHEETCUT',
          'displayNames': 'Mid Die Cut',
          'needMachine': true,
          'priority': 1500,
          'color': '#F0F8FF'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Sheet Qty|Data Format|Data Approval|Card Size|Material|Lamination Front|Lamination Back|Magstripe Type|Magstripe Size|Magstripe Color|Magstripe Track#',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 27,
        'settingsMachine': {
          'id': 27,
          'code': 'MD18',
          'descript': 'Spartanic (Need to cut half in advance)',
          'name': 'Spartanic (Need to cut half in advance)',
          'settingsMachineType': {
            'code': 'Spartanic',
            'descript': 'Spartanic',
            'color': null
          },
          'dept': {
            'id': 11,
            'code': 'Mid Dept_Die Cut',
            'name': 'Mid Dept',
            'subDept': 'Die Cut',
            'sortBy': 5
          },
          'unit': 'SHEET',
          'basicSetupTime': 15,
          'basicCapacity': 3,
          'basicPendingMinutes': 0,
          'processingType': 'GANG',
          'monitorAddress': 'spartanic',
          'camIp': '000054',
          'ssQuantity': 1600,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 13,
          'code': 'MID_DIE_SPARTANIC',
          'descript': 'MID_DIE_SPARTANIC',
          'displayNames': 'Mid Die Cut',
          'needMachine': true,
          'priority': 1600,
          'color': '#5E86C1'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Sheet Qty|Data Format|Data Approval|Card Size|Material|Lamination Front|Lamination Back|Magstripe Type|Magstripe Size|Magstripe Color|Magstripe Track#',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 10,
        'settingsMachine': {
          'id': 10,
          'code': 'MD06',
          'descript': 'Franklin #1',
          'name': 'Franklin #1',
          'settingsMachineType': {
            'code': 'Franklin',
            'descript': 'Franklin',
            'color': null
          },
          'dept': {
            'id': 9,
            'code': 'Mid Dept_Hot Stamp',
            'name': 'Mid Dept',
            'subDept': 'Hot Stamp',
            'sortBy': 3
          },
          'unit': 'CARD',
          'basicSetupTime': 180,
          'basicCapacity': 4,
          'basicPendingMinutes': 0,
          'processingType': 'JOB',
          'monitorAddress': '192.168.1.9',
          'camIp': '00005',
          'ssQuantity': 50000,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 14,
          'code': 'MID_HOT_STAMP',
          'descript': 'MID_HOT_STAMP',
          'displayNames': 'Mid Hot Stamp',
          'needMachine': true,
          'priority': 1800,
          'color': '#1E90FF'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Sheet Qty|Data Format|Data Approval|Card Size|Material|Lamination Front|Lamination Back|Magstripe Type|Magstripe Size|Magstripe Color|Magstripe Track#',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 11,
        'settingsMachine': {
          'id': 11,
          'code': 'MD21',
          'descript': 'Franklin #2',
          'name': 'Franklin #2',
          'settingsMachineType': {
            'code': 'Franklin',
            'descript': 'Franklin',
            'color': null
          },
          'dept': {
            'id': 9,
            'code': 'Mid Dept_Hot Stamp',
            'name': 'Mid Dept',
            'subDept': 'Hot Stamp',
            'sortBy': 3
          },
          'unit': 'CARD',
          'basicSetupTime': 180,
          'basicCapacity': 4,
          'basicPendingMinutes': 0,
          'processingType': 'JOB',
          'monitorAddress': '192.168.1.10',
          'camIp': '00006',
          'ssQuantity': 50000,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 14,
          'code': 'MID_HOT_STAMP',
          'descript': 'MID_HOT_STAMP',
          'displayNames': 'Mid Hot Stamp',
          'needMachine': true,
          'priority': 1800,
          'color': '#1E90FF'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Sheet Qty|Data Format|Data Approval|Card Size|Material|Lamination Front|Lamination Back|Magstripe Type|Magstripe Size|Magstripe Color|Magstripe Track#',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 80,
        'settingsMachine': {
          'id': 80,
          'code': 'MD26',
          'descript': 'TW Franklin #4',
          'name': 'TW Franklin #4',
          'settingsMachineType': {
            'code': 'Franklin',
            'descript': 'Franklin',
            'color': null
          },
          'dept': {
            'id': 9,
            'code': 'Mid Dept_Hot Stamp',
            'name': 'Mid Dept',
            'subDept': 'Hot Stamp',
            'sortBy': 3
          },
          'unit': 'CARD',
          'basicSetupTime': 180,
          'basicCapacity': 67,
          'basicPendingMinutes': 0,
          'processingType': 'JOB',
          'monitorAddress': '998',
          'camIp': '998',
          'ssQuantity': 0,
          'machineOrder': 10
        },
        'factoryOperation': {
          'id': 14,
          'code': 'MID_HOT_STAMP',
          'descript': 'MID_HOT_STAMP',
          'displayNames': 'Mid Hot Stamp',
          'needMachine': true,
          'priority': 1800,
          'color': '#1E90FF'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Sheet Qty|Data Format|Data Approval|Card Size|Material|Lamination Front|Lamination Back|Magstripe Type|Magstripe Size|Magstripe Color|Magstripe Track#',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 79,
        'settingsMachine': {
          'id': 79,
          'code': 'MD25',
          'descript': 'Franklin #3',
          'name': 'Franklin #3',
          'settingsMachineType': {
            'code': 'Franklin',
            'descript': 'Franklin',
            'color': null
          },
          'dept': {
            'id': 9,
            'code': 'Mid Dept_Hot Stamp',
            'name': 'Mid Dept',
            'subDept': 'Hot Stamp',
            'sortBy': 3
          },
          'unit': 'CARD',
          'basicSetupTime': 180,
          'basicCapacity': 41,
          'basicPendingMinutes': 0,
          'processingType': 'JOB',
          'monitorAddress': '999',
          'camIp': '999',
          'ssQuantity': 0,
          'machineOrder': 10
        },
        'factoryOperation': {
          'id': 14,
          'code': 'MID_HOT_STAMP',
          'descript': 'MID_HOT_STAMP',
          'displayNames': 'Mid Hot Stamp',
          'needMachine': true,
          'priority': 1800,
          'color': '#1E90FF'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Sheet Qty|Data Format|Data Approval|Card Size|Material|Lamination Front|Lamination Back|Magstripe Type|Magstripe Size|Magstripe Color|Magstripe Track#',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 28,
        'settingsMachine': {
          'id': 28,
          'code': 'PZ01',
          'descript': 'Inspection Cards #1',
          'name': 'Inspection Cards #1',
          'settingsMachineType': {
            'code': 'Inspection',
            'descript': 'Inspection',
            'color': null
          },
          'dept': {
            'id': 12,
            'code': 'PZ Dept_',
            'name': 'PZ Dept',
            'subDept': '',
            'sortBy': 6
          },
          'unit': 'CARD',
          'basicSetupTime': 30,
          'basicCapacity': 281,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': 'inspection1',
          'camIp': '000055',
          'ssQuantity': 135000,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 18,
          'code': 'PZ_INSPECT',
          'descript': 'PZ_INSPECT',
          'displayNames': 'Inspect',
          'needMachine': true,
          'priority': 2000,
          'color': '#002FA7'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|Card Size|Card Name|Material|Data Format Date|Data Approval Date',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 29,
        'settingsMachine': {
          'id': 29,
          'code': 'PZ02',
          'descript': 'Inspection Cards #2',
          'name': 'Inspection Cards #2',
          'settingsMachineType': {
            'code': 'Inspection',
            'descript': 'Inspection',
            'color': null
          },
          'dept': {
            'id': 12,
            'code': 'PZ Dept_',
            'name': 'PZ Dept',
            'subDept': '',
            'sortBy': 6
          },
          'unit': 'CARD',
          'basicSetupTime': 30,
          'basicCapacity': 281,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '192.168.1.28',
          'camIp': '000056',
          'ssQuantity': 135000,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 18,
          'code': 'PZ_INSPECT',
          'descript': 'PZ_INSPECT',
          'displayNames': 'Inspect',
          'needMachine': true,
          'priority': 2000,
          'color': '#002FA7'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|Card Size|Card Name|Material|Data Format Date|Data Approval Date',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 81,
        'settingsMachine': {
          'id': 81,
          'code': 'PZ13',
          'descript': 'Inspection Cards #3',
          'name': 'Inspection Cards #3',
          'settingsMachineType': {
            'code': 'Inspection',
            'descript': 'Inspection',
            'color': null
          },
          'dept': {
            'id': 12,
            'code': 'PZ Dept_',
            'name': 'PZ Dept',
            'subDept': '',
            'sortBy': 6
          },
          'unit': 'CARD',
          'basicSetupTime': 30,
          'basicCapacity': 281,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '996',
          'camIp': '996',
          'ssQuantity': 135000,
          'machineOrder': 11
        },
        'factoryOperation': {
          'id': 18,
          'code': 'PZ_INSPECT',
          'descript': 'PZ_INSPECT',
          'displayNames': 'Inspect',
          'needMachine': true,
          'priority': 2000,
          'color': '#002FA7'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|Card Size|Card Name|Material|Data Format Date|Data Approval Date',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 30,
        'settingsMachine': {
          'id': 30,
          'code': 'PZ03',
          'descript': 'Versa 5',
          'name': 'Versa 5',
          'settingsMachineType': {
            'code': 'Versa',
            'descript': 'Versa',
            'color': null
          },
          'dept': {
            'id': 12,
            'code': 'PZ Dept_',
            'name': 'PZ Dept',
            'subDept': '',
            'sortBy': 6
          },
          'unit': 'CARD',
          'basicSetupTime': 40,
          'basicCapacity': 292,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': 'versa5',
          'camIp': '10.0.0.50',
          'ssQuantity': 0,
          'machineOrder': 13
        },
        'factoryOperation': {
          'id': 19,
          'code': 'PZ_VERSA',
          'descript': 'PZ_VERSA',
          'displayNames': 'PZ',
          'needMachine': true,
          'priority': 2500,
          'color': '#0047AB'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|Card Size|Card Name|Sol/Hot Stamp|Data Approval Date',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': [
        {
          'id': '3765',
          'oid': '3765',
          'part': 0,
          'operationCode': '14d0052B',
          'priority': 2500,
          'job': {
            'id': 100,
            'comboType': '2',
            'comboId': 1739,
            'poNo': '205020e',
            'comboQuantity': 10000
          },
          'process': {
            'id': 392,
            'needWaitPrevProcess': true,
            'operations': [
              '3762',
              '3763',
              '3764',
              '3765',
              '3766',
              '3767',
              '3854',
              '25cccd85'
            ],
            'previousProcesses': [
              393
            ],
            'productId': 4607
          },
          'previousOperation': '3764',
          'nextOperations': [
            '3766'
          ],
          'runOnMachineId': 30,
          'actualRunOnMachineId': null,
          'quantity': 10000,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-18T18:02:00.000',
          'expectedSetupFinishTime': '2014-12-18T18:42:00.000',
          'expectedFinishTime': '2014-12-18T19:17:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'B',
          'expectedMoldId': null,
          'tooltip': '205020e|14d0052B|12-18 18:02 - 12-18 19:17|CARD_QTY|5.25\'x3.375\'|Hong Kong Xbox LIVE/Dual($150.00)|1 SOL|',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412181445',
          'new': false
        },
        {
          'id': '3543',
          'oid': '3543',
          'part': 0,
          'operationCode': '14d0038B',
          'priority': 2500,
          'job': {
            'id': 87,
            'comboType': '2',
            'comboId': 1725,
            'poNo': '205034e',
            'comboQuantity': 122000
          },
          'process': {
            'id': 353,
            'needWaitPrevProcess': true,
            'operations': [
              '3539',
              '3540',
              '3541',
              '3542',
              '3543',
              '3544',
              '3545',
              '3546',
              '3547',
              '3548',
              '3549',
              '3550',
              '3551',
              '666e1965',
              'a5a9502'
            ],
            'previousProcesses': [
              354
            ],
            'productId': 4577
          },
          'previousOperation': '3542',
          'nextOperations': [
            '3544'
          ],
          'runOnMachineId': 30,
          'actualRunOnMachineId': null,
          'quantity': 50001,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-19T13:35:00.000',
          'expectedSetupFinishTime': '2014-12-19T14:15:00.000',
          'expectedFinishTime': '2014-12-19T17:07:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'B',
          'expectedMoldId': null,
          'tooltip': '205034e|14d0038B|12-19 13:35 - 12-19 17:07|CARD_QTY|4.875\'x3.375\'|Riot League of Legends/IAB($25.00)|1 SOL|',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412190545',
          'new': false
        },
        {
          'id': '3544',
          'oid': '3544',
          'part': 0,
          'operationCode': '14d0038C',
          'priority': 2500,
          'job': {
            'id': 87,
            'comboType': '2',
            'comboId': 1725,
            'poNo': '205034e',
            'comboQuantity': 122000
          },
          'process': {
            'id': 353,
            'needWaitPrevProcess': true,
            'operations': [
              '3539',
              '3540',
              '3541',
              '3542',
              '3543',
              '3544',
              '3545',
              '3546',
              '3547',
              '3548',
              '3549',
              '3550',
              '3551',
              '666e1965',
              'a5a9502'
            ],
            'previousProcesses': [
              354
            ],
            'productId': 4577
          },
          'previousOperation': '3543',
          'nextOperations': [
            '3545'
          ],
          'runOnMachineId': 30,
          'actualRunOnMachineId': null,
          'quantity': 50001,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-19T17:08:00.000',
          'expectedSetupFinishTime': '2014-12-19T17:08:00.000',
          'expectedFinishTime': '2014-12-19T20:00:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'C',
          'expectedMoldId': null,
          'tooltip': '205034e|14d0038C|12-19 17:08 - 12-19 20:00|CARD_QTY|4.875\'x3.375\'|Riot League of Legends/IAB($25.00)|1 SOL|',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412191445',
          'new': false
        },
        {
          'id': '3545',
          'oid': '3545',
          'part': 0,
          'operationCode': '14d0038D',
          'priority': 2500,
          'job': {
            'id': 87,
            'comboType': '2',
            'comboId': 1725,
            'poNo': '205034e',
            'comboQuantity': 122000
          },
          'process': {
            'id': 353,
            'needWaitPrevProcess': true,
            'operations': [
              '3539',
              '3540',
              '3541',
              '3542',
              '3543',
              '3544',
              '3545',
              '3546',
              '3547',
              '3548',
              '3549',
              '3550',
              '3551',
              '666e1965',
              'a5a9502'
            ],
            'previousProcesses': [
              354
            ],
            'productId': 4577
          },
          'previousOperation': '3544',
          'nextOperations': [
            '3546'
          ],
          'runOnMachineId': 30,
          'actualRunOnMachineId': null,
          'quantity': 21998,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-19T20:01:00.000',
          'expectedSetupFinishTime': '2014-12-19T20:01:00.000',
          'expectedFinishTime': '2014-12-19T21:17:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'D',
          'expectedMoldId': null,
          'tooltip': '205034e|14d0038D|12-19 20:01 - 12-19 21:17|CARD_QTY|4.875\'x3.375\'|Riot League of Legends/IAB($25.00)|1 SOL|',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412191445',
          'new': false
        },
        {
          'id': '3742',
          'oid': '3742',
          'part': 0,
          'operationCode': '14d0051B',
          'priority': 2500,
          'job': {
            'id': 99,
            'comboType': '2',
            'comboId': 1738,
            'poNo': '205036e',
            'comboQuantity': 135010
          },
          'process': {
            'id': 389,
            'needWaitPrevProcess': true,
            'operations': [
              '3738',
              '3739',
              '3740',
              '3741',
              '3742',
              '3743',
              '3744',
              '3745',
              '3746',
              '3747',
              '3748',
              '3749',
              '3750',
              '48306cc8',
              '33cdd',
              '1d5b4a5b'
            ],
            'previousProcesses': [
              390
            ],
            'productId': 4605
          },
          'previousOperation': '3741',
          'nextOperations': [
            '3743'
          ],
          'runOnMachineId': 30,
          'actualRunOnMachineId': null,
          'quantity': 50001,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-20T10:09:00.000',
          'expectedSetupFinishTime': '2014-12-20T10:49:00.000',
          'expectedFinishTime': '2014-12-20T13:41:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'B',
          'expectedMoldId': null,
          'tooltip': '205036e|14d0051B|12-20 10:09 - 12-20 13:41|CARD_QTY|4.875\'x3.375\'|Xbox Live Microsoft 2014/Get1($25.00)|1 SOL|',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412200545',
          'new': false
        },
        {
          'id': '3743',
          'oid': '3743',
          'part': 0,
          'operationCode': '14d0051C',
          'priority': 2500,
          'job': {
            'id': 99,
            'comboType': '2',
            'comboId': 1738,
            'poNo': '205036e',
            'comboQuantity': 135010
          },
          'process': {
            'id': 389,
            'needWaitPrevProcess': true,
            'operations': [
              '3738',
              '3739',
              '3740',
              '3741',
              '3742',
              '3743',
              '3744',
              '3745',
              '3746',
              '3747',
              '3748',
              '3749',
              '3750',
              '48306cc8',
              '33cdd',
              '1d5b4a5b'
            ],
            'previousProcesses': [
              390
            ],
            'productId': 4605
          },
          'previousOperation': '3742',
          'nextOperations': [
            '48306cc8'
          ],
          'runOnMachineId': 30,
          'actualRunOnMachineId': null,
          'quantity': 9636,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-20T13:42:00.000',
          'expectedSetupFinishTime': '2014-12-20T13:42:00.000',
          'expectedFinishTime': '2014-12-20T14:15:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'C',
          'expectedMoldId': null,
          'tooltip': '205036e|14d0051C|12-20 13:42 - 12-20 14:15|CARD_QTY|4.875\'x3.375\'|Xbox Live Microsoft 2014/Get1($25.00)|1 SOL|',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412200545',
          'new': false
        },
        {
          'id': '48306cc8',
          'oid': '3743',
          'part': 1,
          'operationCode': '14d0051C',
          'priority': 2500,
          'job': {
            'id': 99,
            'comboType': '2',
            'comboId': 1738,
            'poNo': '205036e',
            'comboQuantity': 135010
          },
          'process': {
            'id': 389,
            'needWaitPrevProcess': true,
            'operations': [
              '3738',
              '3739',
              '3740',
              '3741',
              '3742',
              '3743',
              '3744',
              '3745',
              '3746',
              '3747',
              '3748',
              '3749',
              '3750',
              '48306cc8',
              '33cdd',
              '1d5b4a5b'
            ],
            'previousProcesses': [
              390
            ],
            'productId': 4605
          },
          'previousOperation': '3743',
          'nextOperations': [
            '3744'
          ],
          'runOnMachineId': 30,
          'actualRunOnMachineId': null,
          'quantity': 40365,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-20T14:45:00.000',
          'expectedSetupFinishTime': '2014-12-20T14:45:00.000',
          'expectedFinishTime': '2014-12-20T17:04:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'C',
          'expectedMoldId': null,
          'tooltip': '',
          'color': '',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412201445',
          'new': true
        },
        {
          'id': '3744',
          'oid': '3744',
          'part': 0,
          'operationCode': '14d0051D',
          'priority': 2500,
          'job': {
            'id': 99,
            'comboType': '2',
            'comboId': 1738,
            'poNo': '205036e',
            'comboQuantity': 135010
          },
          'process': {
            'id': 389,
            'needWaitPrevProcess': true,
            'operations': [
              '3738',
              '3739',
              '3740',
              '3741',
              '3742',
              '3743',
              '3744',
              '3745',
              '3746',
              '3747',
              '3748',
              '3749',
              '3750',
              '48306cc8',
              '33cdd',
              '1d5b4a5b'
            ],
            'previousProcesses': [
              390
            ],
            'productId': 4605
          },
          'previousOperation': '48306cc8',
          'nextOperations': [
            '3745'
          ],
          'runOnMachineId': 30,
          'actualRunOnMachineId': null,
          'quantity': 35008,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-20T17:05:00.000',
          'expectedSetupFinishTime': '2014-12-20T17:05:00.000',
          'expectedFinishTime': '2014-12-20T19:05:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'D',
          'expectedMoldId': null,
          'tooltip': '205036e|14d0051D|12-20 17:05 - 12-20 19:05|CARD_QTY|4.875\'x3.375\'|Xbox Live Microsoft 2014/Get1($25.00)|1 SOL|',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412201445',
          'new': false
        }
      ]
    },
    {
      'machine': {
        'id': 31,
        'settingsMachine': {
          'id': 31,
          'code': 'PZ04',
          'descript': 'Versa 6',
          'name': 'Versa 6',
          'settingsMachineType': {
            'code': 'Versa',
            'descript': 'Versa',
            'color': null
          },
          'dept': {
            'id': 12,
            'code': 'PZ Dept_',
            'name': 'PZ Dept',
            'subDept': '',
            'sortBy': 6
          },
          'unit': 'CARD',
          'basicSetupTime': 40,
          'basicCapacity': 292,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': 'versa6',
          'camIp': '10.0.0.51',
          'ssQuantity': 0,
          'machineOrder': 13
        },
        'factoryOperation': {
          'id': 19,
          'code': 'PZ_VERSA',
          'descript': 'PZ_VERSA',
          'displayNames': 'PZ',
          'needMachine': true,
          'priority': 2500,
          'color': '#0047AB'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|Card Size|Card Name|Sol/Hot Stamp|Data Approval Date',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 32,
        'settingsMachine': {
          'id': 32,
          'code': 'PZ05',
          'descript': 'Versa 7',
          'name': 'Versa 7',
          'settingsMachineType': {
            'code': 'Versa',
            'descript': 'Versa',
            'color': null
          },
          'dept': {
            'id': 12,
            'code': 'PZ Dept_',
            'name': 'PZ Dept',
            'subDept': '',
            'sortBy': 6
          },
          'unit': 'CARD',
          'basicSetupTime': 40,
          'basicCapacity': 292,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': 'versa7',
          'camIp': '10.0.0.52',
          'ssQuantity': 0,
          'machineOrder': 13
        },
        'factoryOperation': {
          'id': 19,
          'code': 'PZ_VERSA',
          'descript': 'PZ_VERSA',
          'displayNames': 'PZ',
          'needMachine': true,
          'priority': 2500,
          'color': '#0047AB'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|Card Size|Card Name|Sol/Hot Stamp|Data Approval Date',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': [
        {
          'id': '3372',
          'oid': '3372',
          'part': 0,
          'operationCode': 'M14d0001B',
          'priority': 2500,
          'job': {
            'id': 76,
            'comboType': '4',
            'comboId': 1684,
            'poNo': '203924',
            'comboQuantity': 15010
          },
          'process': {
            'id': 319,
            'needWaitPrevProcess': true,
            'operations': [
              '3370',
              '3371',
              '3372',
              '3373',
              '3374',
              '69676b9c'
            ],
            'previousProcesses': [
              320
            ],
            'productId': 4486
          },
          'previousOperation': '3371',
          'nextOperations': [
            '3373'
          ],
          'runOnMachineId': 32,
          'actualRunOnMachineId': null,
          'quantity': 15010,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-18T20:01:00.000',
          'expectedSetupFinishTime': '2014-12-18T20:41:00.000',
          'expectedFinishTime': '2014-12-18T21:33:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'B',
          'expectedMoldId': null,
          'tooltip': '203924|M14d0001B|12-18 20:01 - 12-18 21:33|CARD_QTY|2.125\'x3.375\'   CR-80|Ultra MP Parent SIM Bundle Kit ($29 Airtime + $5 SIM) $34($34.00)|1 SOL|12-02 ��:��',
          'color': '#F0AD4E',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412181445',
          'new': false
        }
      ]
    },
    {
      'machine': {
        'id': 33,
        'settingsMachine': {
          'id': 33,
          'code': 'PZ06',
          'descript': 'Versa 8',
          'name': 'Versa 8',
          'settingsMachineType': {
            'code': 'Versa',
            'descript': 'Versa',
            'color': null
          },
          'dept': {
            'id': 12,
            'code': 'PZ Dept_',
            'name': 'PZ Dept',
            'subDept': '',
            'sortBy': 6
          },
          'unit': 'CARD',
          'basicSetupTime': 40,
          'basicCapacity': 292,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': 'versa8',
          'camIp': '10.0.0.53',
          'ssQuantity': 0,
          'machineOrder': 13
        },
        'factoryOperation': {
          'id': 19,
          'code': 'PZ_VERSA',
          'descript': 'PZ_VERSA',
          'displayNames': 'PZ',
          'needMachine': true,
          'priority': 2500,
          'color': '#0047AB'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|Card Size|Card Name|Sol/Hot Stamp|Data Approval Date',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 34,
        'settingsMachine': {
          'id': 34,
          'code': 'PZ07',
          'descript': 'Versa 9',
          'name': 'Versa 9',
          'settingsMachineType': {
            'code': 'Versa',
            'descript': 'Versa',
            'color': null
          },
          'dept': {
            'id': 12,
            'code': 'PZ Dept_',
            'name': 'PZ Dept',
            'subDept': '',
            'sortBy': 6
          },
          'unit': 'CARD',
          'basicSetupTime': 40,
          'basicCapacity': 292,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': 'versa9',
          'camIp': '10.0.0.54',
          'ssQuantity': 0,
          'machineOrder': 13
        },
        'factoryOperation': {
          'id': 19,
          'code': 'PZ_VERSA',
          'descript': 'PZ_VERSA',
          'displayNames': 'PZ',
          'needMachine': true,
          'priority': 2500,
          'color': '#0047AB'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|Card Size|Card Name|Sol/Hot Stamp|Data Approval Date',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 35,
        'settingsMachine': {
          'id': 35,
          'code': 'PZ08',
          'descript': 'Versa 10',
          'name': 'Versa 10',
          'settingsMachineType': {
            'code': 'Versa',
            'descript': 'Versa',
            'color': null
          },
          'dept': {
            'id': 12,
            'code': 'PZ Dept_',
            'name': 'PZ Dept',
            'subDept': '',
            'sortBy': 6
          },
          'unit': 'CARD',
          'basicSetupTime': 40,
          'basicCapacity': 292,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': 'versa10',
          'camIp': '10.0.0.55',
          'ssQuantity': 0,
          'machineOrder': 13
        },
        'factoryOperation': {
          'id': 19,
          'code': 'PZ_VERSA',
          'descript': 'PZ_VERSA',
          'displayNames': 'PZ',
          'needMachine': true,
          'priority': 2500,
          'color': '#0047AB'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|Card Size|Card Name|Sol/Hot Stamp|Data Approval Date',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 83,
        'settingsMachine': {
          'id': 83,
          'code': 'PZ15',
          'descript': 'Versa 11',
          'name': 'Versa 11',
          'settingsMachineType': {
            'code': 'Versa',
            'descript': 'Versa',
            'color': null
          },
          'dept': {
            'id': 12,
            'code': 'PZ Dept_',
            'name': 'PZ Dept',
            'subDept': '',
            'sortBy': 6
          },
          'unit': 'CARD',
          'basicSetupTime': 40,
          'basicCapacity': 292,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': 'versa11',
          'camIp': '10.0.0.56',
          'ssQuantity': 0,
          'machineOrder': 13
        },
        'factoryOperation': {
          'id': 19,
          'code': 'PZ_VERSA',
          'descript': 'PZ_VERSA',
          'displayNames': 'PZ',
          'needMachine': true,
          'priority': 2500,
          'color': '#0047AB'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|Card Size|Card Name|Sol/Hot Stamp|Data Approval Date',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 37,
        'settingsMachine': {
          'id': 37,
          'code': 'PZ11',
          'descript': 'Bending Machine #1',
          'name': 'Bending Machine #1',
          'settingsMachineType': {
            'code': 'Bending',
            'descript': 'Bending',
            'color': null
          },
          'dept': {
            'id': 12,
            'code': 'PZ Dept_',
            'name': 'PZ Dept',
            'subDept': '',
            'sortBy': 6
          },
          'unit': 'CARD',
          'basicSetupTime': 30,
          'basicCapacity': 2147483647,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '192.168.1.37',
          'camIp': '000064',
          'ssQuantity': 0,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 20,
          'code': 'PZ_BENDING',
          'descript': 'PZ_BENDING',
          'displayNames': 'PZ',
          'needMachine': true,
          'priority': 2300,
          'color': '#66FF00'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|Card Size|Card Name|Sol/Hot Stamp|Data Approval Date',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': [
        {
          'id': '3764',
          'oid': '3764',
          'part': 0,
          'operationCode': '14d0052B',
          'priority': 2300,
          'job': {
            'id': 100,
            'comboType': '2',
            'comboId': 1739,
            'poNo': '205020e',
            'comboQuantity': 10000
          },
          'process': {
            'id': 392,
            'needWaitPrevProcess': true,
            'operations': [
              '3762',
              '3763',
              '3764',
              '3765',
              '3766',
              '3767',
              '3854',
              '25cccd85'
            ],
            'previousProcesses': [
              393
            ],
            'productId': 4607
          },
          'previousOperation': '3763',
          'nextOperations': [
            '3765'
          ],
          'runOnMachineId': 37,
          'actualRunOnMachineId': null,
          'quantity': 10000,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-18T17:30:00.000',
          'expectedSetupFinishTime': '2014-12-18T18:00:00.000',
          'expectedFinishTime': '2014-12-18T18:01:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'B',
          'expectedMoldId': null,
          'tooltip': '205020e|14d0052B|12-18 17:30 - 12-18 18:01|CARD_QTY|5.25\'x3.375\'|Hong Kong Xbox LIVE/Dual($150.00)|1 SOL|',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412181445',
          'new': false
        }
      ]
    },
    {
      'machine': {
        'id': 38,
        'settingsMachine': {
          'id': 38,
          'code': 'PZ12',
          'descript': 'Bending Machine #2',
          'name': 'Bending Machine #2',
          'settingsMachineType': {
            'code': 'Bending',
            'descript': 'Bending',
            'color': null
          },
          'dept': {
            'id': 12,
            'code': 'PZ Dept_',
            'name': 'PZ Dept',
            'subDept': '',
            'sortBy': 6
          },
          'unit': 'CARD',
          'basicSetupTime': 30,
          'basicCapacity': 2147483647,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '192.168.1.38',
          'camIp': '000065',
          'ssQuantity': 0,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 20,
          'code': 'PZ_BENDING',
          'descript': 'PZ_BENDING',
          'displayNames': 'PZ',
          'needMachine': true,
          'priority': 2300,
          'color': '#66FF00'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|Card Size|Card Name|Sol/Hot Stamp|Data Approval Date',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 36,
        'settingsMachine': {
          'id': 36,
          'code': 'PZ09',
          'descript': 'Cardline2',
          'name': 'Cardline2',
          'settingsMachineType': {
            'code': 'Carline',
            'descript': 'Carline',
            'color': null
          },
          'dept': {
            'id': 12,
            'code': 'PZ Dept_',
            'name': 'PZ Dept',
            'subDept': '',
            'sortBy': 6
          },
          'unit': 'CARD',
          'basicSetupTime': 50,
          'basicCapacity': 166,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': 'cardline2',
          'camIp': '000063',
          'ssQuantity': 0,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 21,
          'code': 'PZ_CARLINE',
          'descript': 'PZ_CARLINE',
          'displayNames': 'PZ',
          'needMachine': true,
          'priority': 2400,
          'color': '#808000'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|Card Size|Card Name|Sol/Hot Stamp|Data Approval Date',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 6,
        'settingsMachine': {
          'id': 6,
          'code': 'PZ10',
          'descript': 'MagMaster',
          'name': 'MagMaster',
          'settingsMachineType': {
            'code': 'MagMaster',
            'descript': 'MagMaster',
            'color': null
          },
          'dept': {
            'id': 12,
            'code': 'PZ Dept_',
            'name': 'PZ Dept',
            'subDept': '',
            'sortBy': 6
          },
          'unit': 'CARD',
          'basicSetupTime': 30,
          'basicCapacity': 166,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '00001',
          'camIp': '00004',
          'ssQuantity': 0,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 22,
          'code': 'PZ_MAG_MASTER',
          'descript': 'PZ_MAG_MASTER',
          'displayNames': 'PZ',
          'needMachine': true,
          'priority': 2600,
          'color': '#CCFF00'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|Card Size|Card Name|Sol/Hot Stamp|Data Approval Date',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 39,
        'settingsMachine': {
          'id': 39,
          'code': 'QA01',
          'descript': 'Proof Master 1',
          'name': 'Proof Master 1',
          'settingsMachineType': {
            'code': 'Proof Master',
            'descript': 'Proof Master',
            'color': null
          },
          'dept': {
            'id': 13,
            'code': 'QA Dept_',
            'name': 'QA Dept',
            'subDept': 'QA',
            'sortBy': 7
          },
          'unit': 'CARD',
          'basicSetupTime': 15,
          'basicCapacity': 292,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': 'proofmaster1',
          'camIp': '000066',
          'ssQuantity': 500,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 23,
          'code': 'QA',
          'descript': 'QA',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2700,
          'color': '#003366'
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 40,
        'settingsMachine': {
          'id': 40,
          'code': 'QA02',
          'descript': 'Proof Master 2',
          'name': 'Proof Master 2',
          'settingsMachineType': {
            'code': 'Proof Master',
            'descript': 'Proof Master',
            'color': null
          },
          'dept': {
            'id': 13,
            'code': 'QA Dept_',
            'name': 'QA Dept',
            'subDept': 'QA',
            'sortBy': 7
          },
          'unit': 'CARD',
          'basicSetupTime': 15,
          'basicCapacity': 292,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': 'proofmaster2',
          'camIp': '000067',
          'ssQuantity': 500,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 23,
          'code': 'QA',
          'descript': 'QA',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2700,
          'color': '#003366'
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': [
        {
          'id': '3546',
          'oid': '3546',
          'part': 0,
          'operationCode': '14d0038B',
          'priority': 2700,
          'job': {
            'id': 87,
            'comboType': '2',
            'comboId': 1725,
            'poNo': '205034e',
            'comboQuantity': 122000
          },
          'process': {
            'id': 353,
            'needWaitPrevProcess': true,
            'operations': [
              '3539',
              '3540',
              '3541',
              '3542',
              '3543',
              '3544',
              '3545',
              '3546',
              '3547',
              '3548',
              '3549',
              '3550',
              '3551',
              '666e1965',
              'a5a9502'
            ],
            'previousProcesses': [
              354
            ],
            'productId': 4577
          },
          'previousOperation': '3545',
          'nextOperations': [
            '666e1965'
          ],
          'runOnMachineId': 40,
          'actualRunOnMachineId': null,
          'quantity': 29784,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-19T21:18:00.000',
          'expectedSetupFinishTime': '2014-12-19T21:33:00.000',
          'expectedFinishTime': '2014-12-19T23:15:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'B',
          'expectedMoldId': null,
          'tooltip': '',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412191445',
          'new': false
        },
        {
          'id': '666e1965',
          'oid': '3546',
          'part': 1,
          'operationCode': '14d0038B',
          'priority': 2700,
          'job': {
            'id': 87,
            'comboType': '2',
            'comboId': 1725,
            'poNo': '205034e',
            'comboQuantity': 122000
          },
          'process': {
            'id': 353,
            'needWaitPrevProcess': true,
            'operations': [
              '3539',
              '3540',
              '3541',
              '3542',
              '3543',
              '3544',
              '3545',
              '3546',
              '3547',
              '3548',
              '3549',
              '3550',
              '3551',
              '666e1965',
              'a5a9502'
            ],
            'previousProcesses': [
              354
            ],
            'productId': 4577
          },
          'previousOperation': '3546',
          'nextOperations': [
            '3547'
          ],
          'runOnMachineId': 40,
          'actualRunOnMachineId': null,
          'quantity': 20217,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-20T05:45:00.000',
          'expectedSetupFinishTime': '2014-12-20T05:45:00.000',
          'expectedFinishTime': '2014-12-20T06:55:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'B',
          'expectedMoldId': null,
          'tooltip': '',
          'color': '',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412200545',
          'new': true
        },
        {
          'id': '3547',
          'oid': '3547',
          'part': 0,
          'operationCode': '14d0038C',
          'priority': 2700,
          'job': {
            'id': 87,
            'comboType': '2',
            'comboId': 1725,
            'poNo': '205034e',
            'comboQuantity': 122000
          },
          'process': {
            'id': 353,
            'needWaitPrevProcess': true,
            'operations': [
              '3539',
              '3540',
              '3541',
              '3542',
              '3543',
              '3544',
              '3545',
              '3546',
              '3547',
              '3548',
              '3549',
              '3550',
              '3551',
              '666e1965',
              'a5a9502'
            ],
            'previousProcesses': [
              354
            ],
            'productId': 4577
          },
          'previousOperation': '666e1965',
          'nextOperations': [
            '3548'
          ],
          'runOnMachineId': 40,
          'actualRunOnMachineId': null,
          'quantity': 50001,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': 2,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-20T06:56:00.000',
          'expectedSetupFinishTime': '2014-12-20T06:56:00.000',
          'expectedFinishTime': '2014-12-20T09:48:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'C',
          'expectedMoldId': null,
          'tooltip': '',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412200545',
          'new': false
        },
        {
          'id': '3548',
          'oid': '3548',
          'part': 0,
          'operationCode': '14d0038D',
          'priority': 2700,
          'job': {
            'id': 87,
            'comboType': '2',
            'comboId': 1725,
            'poNo': '205034e',
            'comboQuantity': 122000
          },
          'process': {
            'id': 353,
            'needWaitPrevProcess': true,
            'operations': [
              '3539',
              '3540',
              '3541',
              '3542',
              '3543',
              '3544',
              '3545',
              '3546',
              '3547',
              '3548',
              '3549',
              '3550',
              '3551',
              '666e1965',
              'a5a9502'
            ],
            'previousProcesses': [
              354
            ],
            'productId': 4577
          },
          'previousOperation': '3547',
          'nextOperations': [
            '3549'
          ],
          'runOnMachineId': 40,
          'actualRunOnMachineId': null,
          'quantity': 21998,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': 2,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-20T09:49:00.000',
          'expectedSetupFinishTime': '2014-12-20T09:49:00.000',
          'expectedFinishTime': '2014-12-20T11:05:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'D',
          'expectedMoldId': null,
          'tooltip': '',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412200545',
          'new': false
        },
        {
          'id': '3745',
          'oid': '3745',
          'part': 0,
          'operationCode': '14d0051B',
          'priority': 2700,
          'job': {
            'id': 99,
            'comboType': '2',
            'comboId': 1738,
            'poNo': '205036e',
            'comboQuantity': 135010
          },
          'process': {
            'id': 389,
            'needWaitPrevProcess': true,
            'operations': [
              '3738',
              '3739',
              '3740',
              '3741',
              '3742',
              '3743',
              '3744',
              '3745',
              '3746',
              '3747',
              '3748',
              '3749',
              '3750',
              '48306cc8',
              '33cdd',
              '1d5b4a5b'
            ],
            'previousProcesses': [
              390
            ],
            'productId': 4605
          },
          'previousOperation': '3744',
          'nextOperations': [
            '3746'
          ],
          'runOnMachineId': 40,
          'actualRunOnMachineId': null,
          'quantity': 50001,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-20T19:06:00.000',
          'expectedSetupFinishTime': '2014-12-20T19:21:00.000',
          'expectedFinishTime': '2014-12-20T22:13:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'B',
          'expectedMoldId': null,
          'tooltip': '',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412201445',
          'new': false
        },
        {
          'id': '3746',
          'oid': '3746',
          'part': 0,
          'operationCode': '14d0051C',
          'priority': 2700,
          'job': {
            'id': 99,
            'comboType': '2',
            'comboId': 1738,
            'poNo': '205036e',
            'comboQuantity': 135010
          },
          'process': {
            'id': 389,
            'needWaitPrevProcess': true,
            'operations': [
              '3738',
              '3739',
              '3740',
              '3741',
              '3742',
              '3743',
              '3744',
              '3745',
              '3746',
              '3747',
              '3748',
              '3749',
              '3750',
              '48306cc8',
              '33cdd',
              '1d5b4a5b'
            ],
            'previousProcesses': [
              390
            ],
            'productId': 4605
          },
          'previousOperation': '3745',
          'nextOperations': [
            '33cdd'
          ],
          'runOnMachineId': 40,
          'actualRunOnMachineId': null,
          'quantity': 17812,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': 2,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-20T22:14:00.000',
          'expectedSetupFinishTime': '2014-12-20T22:14:00.000',
          'expectedFinishTime': '2014-12-20T23:15:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'C',
          'expectedMoldId': null,
          'tooltip': '',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412201445',
          'new': false
        },
        {
          'id': '33cdd',
          'oid': '3746',
          'part': 1,
          'operationCode': '14d0051C',
          'priority': 2700,
          'job': {
            'id': 99,
            'comboType': '2',
            'comboId': 1738,
            'poNo': '205036e',
            'comboQuantity': 135010
          },
          'process': {
            'id': 389,
            'needWaitPrevProcess': true,
            'operations': [
              '3738',
              '3739',
              '3740',
              '3741',
              '3742',
              '3743',
              '3744',
              '3745',
              '3746',
              '3747',
              '3748',
              '3749',
              '3750',
              '48306cc8',
              '33cdd',
              '1d5b4a5b'
            ],
            'previousProcesses': [
              390
            ],
            'productId': 4605
          },
          'previousOperation': '3746',
          'nextOperations': [
            '3747'
          ],
          'runOnMachineId': 40,
          'actualRunOnMachineId': null,
          'quantity': 32189,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-21T05:45:00.000',
          'expectedSetupFinishTime': '2014-12-21T05:45:00.000',
          'expectedFinishTime': '2014-12-21T07:36:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'C',
          'expectedMoldId': null,
          'tooltip': '',
          'color': '',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412210545',
          'new': true
        },
        {
          'id': '3747',
          'oid': '3747',
          'part': 0,
          'operationCode': '14d0051D',
          'priority': 2700,
          'job': {
            'id': 99,
            'comboType': '2',
            'comboId': 1738,
            'poNo': '205036e',
            'comboQuantity': 135010
          },
          'process': {
            'id': 389,
            'needWaitPrevProcess': true,
            'operations': [
              '3738',
              '3739',
              '3740',
              '3741',
              '3742',
              '3743',
              '3744',
              '3745',
              '3746',
              '3747',
              '3748',
              '3749',
              '3750',
              '48306cc8',
              '33cdd',
              '1d5b4a5b'
            ],
            'previousProcesses': [
              390
            ],
            'productId': 4605
          },
          'previousOperation': '33cdd',
          'nextOperations': [
            '3748'
          ],
          'runOnMachineId': 40,
          'actualRunOnMachineId': null,
          'quantity': 35008,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': 2,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-21T07:37:00.000',
          'expectedSetupFinishTime': '2014-12-21T07:37:00.000',
          'expectedFinishTime': '2014-12-21T09:37:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'D',
          'expectedMoldId': null,
          'tooltip': '',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412210545',
          'new': false
        }
      ]
    },
    {
      'machine': {
        'id': 41,
        'settingsMachine': {
          'id': 41,
          'code': 'QA03',
          'descript': 'Proof Master 3',
          'name': 'Proof Master 3',
          'settingsMachineType': {
            'code': 'Proof Master',
            'descript': 'Proof Master',
            'color': null
          },
          'dept': {
            'id': 13,
            'code': 'QA Dept_',
            'name': 'QA Dept',
            'subDept': 'QA',
            'sortBy': 7
          },
          'unit': 'CARD',
          'basicSetupTime': 15,
          'basicCapacity': 292,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': 'proofmaster3',
          'camIp': '000068',
          'ssQuantity': 500,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 23,
          'code': 'QA',
          'descript': 'QA',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2700,
          'color': '#003366'
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': [
        {
          'id': '3766',
          'oid': '3766',
          'part': 0,
          'operationCode': '14d0052B',
          'priority': 2700,
          'job': {
            'id': 100,
            'comboType': '2',
            'comboId': 1739,
            'poNo': '205020e',
            'comboQuantity': 10000
          },
          'process': {
            'id': 392,
            'needWaitPrevProcess': true,
            'operations': [
              '3762',
              '3763',
              '3764',
              '3765',
              '3766',
              '3767',
              '3854',
              '25cccd85'
            ],
            'previousProcesses': [
              393
            ],
            'productId': 4607
          },
          'previousOperation': '3765',
          'nextOperations': [
            '3767'
          ],
          'runOnMachineId': 41,
          'actualRunOnMachineId': null,
          'quantity': 10000,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-18T19:18:00.000',
          'expectedSetupFinishTime': '2014-12-18T19:33:00.000',
          'expectedFinishTime': '2014-12-18T20:08:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'B',
          'expectedMoldId': null,
          'tooltip': '',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412181445',
          'new': false
        },
        {
          'id': '3373',
          'oid': '3373',
          'part': 0,
          'operationCode': 'M14d0001B',
          'priority': 2700,
          'job': {
            'id': 76,
            'comboType': '4',
            'comboId': 1684,
            'poNo': '203924',
            'comboQuantity': 15010
          },
          'process': {
            'id': 319,
            'needWaitPrevProcess': true,
            'operations': [
              '3370',
              '3371',
              '3372',
              '3373',
              '3374',
              '69676b9c'
            ],
            'previousProcesses': [
              320
            ],
            'productId': 4486
          },
          'previousOperation': '3372',
          'nextOperations': [
            '3374'
          ],
          'runOnMachineId': 41,
          'actualRunOnMachineId': null,
          'quantity': 15010,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-18T21:34:00.000',
          'expectedSetupFinishTime': '2014-12-18T21:49:00.000',
          'expectedFinishTime': '2014-12-18T22:41:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'B',
          'expectedMoldId': null,
          'tooltip': '',
          'color': '#F0AD4E',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412181445',
          'new': false
        }
      ]
    },
    {
      'machine': {
        'id': 42,
        'settingsMachine': {
          'id': 42,
          'code': 'QA04',
          'descript': 'Proof Master 4',
          'name': 'Proof Master 4',
          'settingsMachineType': {
            'code': 'Proof Master',
            'descript': 'Proof Master',
            'color': null
          },
          'dept': {
            'id': 13,
            'code': 'QA Dept_',
            'name': 'QA Dept',
            'subDept': 'QA',
            'sortBy': 7
          },
          'unit': 'CARD',
          'basicSetupTime': 15,
          'basicCapacity': 292,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': 'proofmaster4',
          'camIp': '000069',
          'ssQuantity': 500,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 23,
          'code': 'QA',
          'descript': 'QA',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2700,
          'color': '#003366'
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 43,
        'settingsMachine': {
          'id': 43,
          'code': 'QA05',
          'descript': 'Proof Master 5',
          'name': 'Proof Master 5',
          'settingsMachineType': {
            'code': 'Proof Master',
            'descript': 'Proof Master',
            'color': null
          },
          'dept': {
            'id': 13,
            'code': 'QA Dept_',
            'name': 'QA Dept',
            'subDept': 'QA',
            'sortBy': 7
          },
          'unit': 'CARD',
          'basicSetupTime': 15,
          'basicCapacity': 292,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': 'proofmaster5',
          'camIp': '000070',
          'ssQuantity': 500,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 23,
          'code': 'QA',
          'descript': 'QA',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2700,
          'color': '#003366'
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 44,
        'settingsMachine': {
          'id': 44,
          'code': 'QA06',
          'descript': 'Proof Master-MP',
          'name': 'Proof Master-MP',
          'settingsMachineType': {
            'code': 'Proof Master',
            'descript': 'Proof Master',
            'color': null
          },
          'dept': {
            'id': 13,
            'code': 'QA Dept_',
            'name': 'QA Dept',
            'subDept': 'QA',
            'sortBy': 7
          },
          'unit': 'CARD',
          'basicSetupTime': 30,
          'basicCapacity': 208,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '192.168.1.44',
          'camIp': '000071',
          'ssQuantity': 500,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 23,
          'code': 'QA',
          'descript': 'QA',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2700,
          'color': '#003366'
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 106,
        'settingsMachine': {
          'id': 106,
          'code': 'QA09',
          'descript': 'Proof Master-MP #2',
          'name': 'Proof Master-MP #2',
          'settingsMachineType': {
            'code': 'Proof Master',
            'descript': 'Proof Master',
            'color': null
          },
          'dept': {
            'id': 13,
            'code': 'QA Dept_',
            'name': 'QA Dept',
            'subDept': 'QA',
            'sortBy': 7
          },
          'unit': 'CARD',
          'basicSetupTime': 30,
          'basicCapacity': 208,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 500,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 23,
          'code': 'QA',
          'descript': 'QA',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2700,
          'color': '#003366'
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 45,
        'settingsMachine': {
          'id': 45,
          'code': 'QA07',
          'descript': 'Proof Master 6',
          'name': 'Proof Master 6',
          'settingsMachineType': {
            'code': 'Proof Master',
            'descript': 'Proof Master',
            'color': null
          },
          'dept': {
            'id': 13,
            'code': 'QA Dept_',
            'name': 'QA Dept',
            'subDept': 'QA',
            'sortBy': 7
          },
          'unit': 'CARD',
          'basicSetupTime': 30,
          'basicCapacity': 292,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '192.168.1.45',
          'camIp': '000072',
          'ssQuantity': 500,
          'machineOrder': 15
        },
        'factoryOperation': {
          'id': 23,
          'code': 'QA',
          'descript': 'QA',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2700,
          'color': '#003366'
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 84,
        'settingsMachine': {
          'id': 84,
          'code': 'QA08',
          'descript': 'Proof Master 7',
          'name': 'Proof Master 7',
          'settingsMachineType': {
            'code': 'Proof Master',
            'descript': 'Proof Master',
            'color': null
          },
          'dept': {
            'id': 13,
            'code': 'QA Dept_',
            'name': 'QA Dept',
            'subDept': 'QA',
            'sortBy': 7
          },
          'unit': 'CARD',
          'basicSetupTime': 30,
          'basicCapacity': 292,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '993',
          'camIp': '993',
          'ssQuantity': 500,
          'machineOrder': 15
        },
        'factoryOperation': {
          'id': 23,
          'code': 'QA',
          'descript': 'QA',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2700,
          'color': '#003366'
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 61,
        'settingsMachine': {
          'id': 61,
          'code': 'TP01',
          'descript': 'Tipping Machine #1',
          'name': 'Tipping Machine #1',
          'settingsMachineType': {
            'code': 'Tipping',
            'descript': 'Tipping',
            'color': null
          },
          'dept': {
            'id': 16,
            'code': 'Packing Dept_Tipping',
            'name': 'Packing Dept',
            'subDept': 'Tipping',
            'sortBy': 11
          },
          'unit': 'PACK',
          'basicSetupTime': 60,
          'basicCapacity': 187,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': 'tipping1',
          'camIp': '000088',
          'ssQuantity': 0,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 25,
          'code': 'TP',
          'descript': 'TP',
          'displayNames': 'TP',
          'needMachine': true,
          'priority': 3000,
          'color': '#082567'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|TP Style|Data Approval Date|Card Name|First Case|Shipping Date',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 62,
        'settingsMachine': {
          'id': 62,
          'code': 'TP02',
          'descript': 'Tipping Machine #2',
          'name': 'Tipping Machine #2',
          'settingsMachineType': {
            'code': 'Tipping',
            'descript': 'Tipping',
            'color': null
          },
          'dept': {
            'id': 16,
            'code': 'Packing Dept_Tipping',
            'name': 'Packing Dept',
            'subDept': 'Tipping',
            'sortBy': 11
          },
          'unit': 'PACK',
          'basicSetupTime': 60,
          'basicCapacity': 187,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': 'tipping2',
          'camIp': '000089',
          'ssQuantity': 0,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 25,
          'code': 'TP',
          'descript': 'TP',
          'displayNames': 'TP',
          'needMachine': true,
          'priority': 3000,
          'color': '#082567'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|TP Style|Data Approval Date|Card Name|First Case|Shipping Date',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 63,
        'settingsMachine': {
          'id': 63,
          'code': 'TP03',
          'descript': 'Tipping Machine #3',
          'name': 'Tipping Machine #3',
          'settingsMachineType': {
            'code': 'Tipping',
            'descript': 'Tipping',
            'color': null
          },
          'dept': {
            'id': 16,
            'code': 'Packing Dept_Tipping',
            'name': 'Packing Dept',
            'subDept': 'Tipping',
            'sortBy': 11
          },
          'unit': 'PACK',
          'basicSetupTime': 60,
          'basicCapacity': 187,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': 'tipping3',
          'camIp': '000090',
          'ssQuantity': 0,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 25,
          'code': 'TP',
          'descript': 'TP',
          'displayNames': 'TP',
          'needMachine': true,
          'priority': 3000,
          'color': '#082567'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|TP Style|Data Approval Date|Card Name|First Case|Shipping Date',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 85,
        'settingsMachine': {
          'id': 85,
          'code': 'TP04',
          'descript': 'Tipping Machine #4',
          'name': 'Tipping Machine #4',
          'settingsMachineType': {
            'code': 'Tipping',
            'descript': 'Tipping',
            'color': null
          },
          'dept': {
            'id': 16,
            'code': 'Packing Dept_Tipping',
            'name': 'Packing Dept',
            'subDept': 'Tipping',
            'sortBy': 11
          },
          'unit': 'PACK',
          'basicSetupTime': 60,
          'basicCapacity': 208,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '992',
          'camIp': '992',
          'ssQuantity': 0,
          'machineOrder': 18
        },
        'factoryOperation': {
          'id': 25,
          'code': 'TP',
          'descript': 'TP',
          'displayNames': 'TP',
          'needMachine': true,
          'priority': 3000,
          'color': '#082567'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|TP Style|Data Approval Date|Card Name|First Case|Shipping Date',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 86,
        'settingsMachine': {
          'id': 86,
          'code': 'TP05',
          'descript': 'Tipping Machine #5',
          'name': 'Tipping Machine #5',
          'settingsMachineType': {
            'code': 'Tipping',
            'descript': 'Tipping',
            'color': null
          },
          'dept': {
            'id': 16,
            'code': 'Packing Dept_Tipping',
            'name': 'Packing Dept',
            'subDept': 'Tipping',
            'sortBy': 11
          },
          'unit': 'PACK',
          'basicSetupTime': 60,
          'basicCapacity': 208,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '991',
          'camIp': '991',
          'ssQuantity': 0,
          'machineOrder': 18
        },
        'factoryOperation': {
          'id': 25,
          'code': 'TP',
          'descript': 'TP',
          'displayNames': 'TP',
          'needMachine': true,
          'priority': 3000,
          'color': '#082567'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|TP Style|Data Approval Date|Card Name|First Case|Shipping Date',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 46,
        'settingsMachine': {
          'id': 46,
          'code': 'MP01',
          'descript': 'Assembly (HO)',
          'name': 'Assembly (HO)',
          'settingsMachineType': {
            'code': 'Assembly',
            'descript': 'Assembly',
            'color': null
          },
          'dept': {
            'id': 14,
            'code': 'Multipack_Multi-Pack',
            'name': 'Multipack',
            'subDept': 'Multi-Pack',
            'sortBy': 9
          },
          'unit': 'PACK',
          'basicSetupTime': 120,
          'basicCapacity': 83,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': 'assembly',
          'camIp': '000073',
          'ssQuantity': 0,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 26,
          'code': 'MP_HO',
          'descript': 'MP_HO',
          'displayNames': 'MP',
          'needMachine': true,
          'priority': 3100,
          'color': '#FFCC00'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|MP Style|Pack|Card Name|First Case|Client Name|Multipack-Carrier|Multipack-# of Clam Shells',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 47,
        'settingsMachine': {
          'id': 47,
          'code': 'MP02',
          'descript': 'Haipi #1 Paper (HH1)',
          'name': 'Haipi #1 Paper (HH1)',
          'settingsMachineType': {
            'code': 'Haipi',
            'descript': 'Haipi',
            'color': null
          },
          'dept': {
            'id': 14,
            'code': 'Multipack_Multi-Pack',
            'name': 'Multipack',
            'subDept': 'Multi-Pack',
            'sortBy': 9
          },
          'unit': 'PACK',
          'basicSetupTime': 120,
          'basicCapacity': 34,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': 'haipi1',
          'camIp': '000074',
          'ssQuantity': 0,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 27,
          'code': 'MP_HH',
          'descript': 'MP_HH',
          'displayNames': 'MP',
          'needMachine': true,
          'priority': 3200,
          'color': '#2A52BE'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|MP Style|Pack|Card Name|First Case|Client Name|Multipack-Carrier|Multipack-# of Clam Shells',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 48,
        'settingsMachine': {
          'id': 48,
          'code': 'MP03',
          'descript': 'Haipi #2 Plastic (HH2)',
          'name': 'Haipi #2 Plastic (HH2)',
          'settingsMachineType': {
            'code': 'Haipi',
            'descript': 'Haipi',
            'color': null
          },
          'dept': {
            'id': 14,
            'code': 'Multipack_Multi-Pack',
            'name': 'Multipack',
            'subDept': 'Multi-Pack',
            'sortBy': 9
          },
          'unit': 'PACK',
          'basicSetupTime': 120,
          'basicCapacity': 34,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '192.168.1.48',
          'camIp': '000075',
          'ssQuantity': 0,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 27,
          'code': 'MP_HH',
          'descript': 'MP_HH',
          'displayNames': 'MP',
          'needMachine': true,
          'priority': 3200,
          'color': '#2A52BE'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|MP Style|Pack|Card Name|First Case|Client Name|Multipack-Carrier|Multipack-# of Clam Shells',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 107,
        'settingsMachine': {
          'id': 107,
          'code': 'MP08',
          'descript': 'Haipi #2 Plastic (HH2) - 2',
          'name': 'Haipi #2 Plastic (HH2) - 2',
          'settingsMachineType': {
            'code': 'Haipi',
            'descript': 'Haipi',
            'color': null
          },
          'dept': {
            'id': 14,
            'code': 'Multipack_Multi-Pack',
            'name': 'Multipack',
            'subDept': 'Multi-Pack',
            'sortBy': 9
          },
          'unit': 'PACK',
          'basicSetupTime': 120,
          'basicCapacity': 34,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 27,
          'code': 'MP_HH',
          'descript': 'MP_HH',
          'displayNames': 'MP',
          'needMachine': true,
          'priority': 3200,
          'color': '#2A52BE'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|MP Style|Pack|Card Name|First Case|Client Name|Multipack-Carrier|Multipack-# of Clam Shells',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 49,
        'settingsMachine': {
          'id': 49,
          'code': 'MP04',
          'descript': 'Haipi #3 Paper (HH3)',
          'name': 'Haipi #3 Paper (HH3)',
          'settingsMachineType': {
            'code': 'Haipi',
            'descript': 'Haipi',
            'color': null
          },
          'dept': {
            'id': 14,
            'code': 'Multipack_Multi-Pack',
            'name': 'Multipack',
            'subDept': 'Multi-Pack',
            'sortBy': 9
          },
          'unit': 'PACK',
          'basicSetupTime': 120,
          'basicCapacity': 33,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '192.168.1.49',
          'camIp': '000076',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 27,
          'code': 'MP_HH',
          'descript': 'MP_HH',
          'displayNames': 'MP',
          'needMachine': true,
          'priority': 3200,
          'color': '#2A52BE'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|MP Style|Pack|Card Name|First Case|Client Name|Multipack-Carrier|Multipack-# of Clam Shells',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 50,
        'settingsMachine': {
          'id': 50,
          'code': 'MP05',
          'descript': 'New Haipi Paper',
          'name': 'New Haipi Paper 4',
          'settingsMachineType': {
            'code': 'Haipi',
            'descript': 'Haipi',
            'color': null
          },
          'dept': {
            'id': 14,
            'code': 'Multipack_Multi-Pack',
            'name': 'Multipack',
            'subDept': 'Multi-Pack',
            'sortBy': 9
          },
          'unit': 'PACK',
          'basicSetupTime': 120,
          'basicCapacity': 33,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '192.168.1.50',
          'camIp': '000077',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 27,
          'code': 'MP_HH',
          'descript': 'MP_HH',
          'displayNames': 'MP',
          'needMachine': true,
          'priority': 3200,
          'color': '#2A52BE'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|MP Style|Pack|Card Name|First Case|Client Name|Multipack-Carrier|Multipack-# of Clam Shells',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 51,
        'settingsMachine': {
          'id': 51,
          'code': 'MP06',
          'descript': 'New Haipi Paper',
          'name': 'New Haipi Paper 5',
          'settingsMachineType': {
            'code': 'Haipi',
            'descript': 'Haipi',
            'color': null
          },
          'dept': {
            'id': 14,
            'code': 'Multipack_Multi-Pack',
            'name': 'Multipack',
            'subDept': 'Multi-Pack',
            'sortBy': 9
          },
          'unit': 'PACK',
          'basicSetupTime': 120,
          'basicCapacity': 33,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '192.168.1.51',
          'camIp': '000078',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 27,
          'code': 'MP_HH',
          'descript': 'MP_HH',
          'displayNames': 'MP',
          'needMachine': true,
          'priority': 3200,
          'color': '#2A52BE'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|MP Style|Pack|Card Name|First Case|Client Name|Multipack-Carrier|Multipack-# of Clam Shells',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 52,
        'settingsMachine': {
          'id': 52,
          'code': 'MP07',
          'descript': 'New Haipi Paper',
          'name': 'New Haipi Paper 6',
          'settingsMachineType': {
            'code': 'Haipi',
            'descript': 'Haipi',
            'color': null
          },
          'dept': {
            'id': 14,
            'code': 'Multipack_Multi-Pack',
            'name': 'Multipack',
            'subDept': 'Multi-Pack',
            'sortBy': 9
          },
          'unit': 'PACK',
          'basicSetupTime': 120,
          'basicCapacity': 33,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '192.168.1.52',
          'camIp': '000079',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 27,
          'code': 'MP_HH',
          'descript': 'MP_HH',
          'displayNames': 'MP',
          'needMachine': true,
          'priority': 3200,
          'color': '#2A52BE'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|MP Style|Pack|Card Name|First Case|Client Name|Multipack-Carrier|Multipack-# of Clam Shells',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 53,
        'settingsMachine': {
          'id': 53,
          'code': 'HS01',
          'descript': 'Paper Heat Seal 1',
          'name': 'Paper Heat Seal 1',
          'settingsMachineType': {
            'code': 'Heat Seal',
            'descript': 'Heat Seal',
            'color': null
          },
          'dept': {
            'id': 15,
            'code': 'Multipack_Heat Seal',
            'name': 'Multipack',
            'subDept': 'Heat Seal',
            'sortBy': 10
          },
          'unit': 'PACK',
          'basicSetupTime': 30,
          'basicCapacity': 26,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': 'paperheatseal1',
          'camIp': '000080',
          'ssQuantity': 0,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 28,
          'code': 'HS',
          'descript': 'HS',
          'displayNames': 'HS',
          'needMachine': true,
          'priority': 3300,
          'color': '#4169E1'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|MP Style|Pack|Card Name|Client Name|Multipack-Carrier|Multipack-# of Clam Shells',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 54,
        'settingsMachine': {
          'id': 54,
          'code': 'HS02',
          'descript': 'Paper Heat Seal 2',
          'name': 'Paper Heat Seal 2',
          'settingsMachineType': {
            'code': 'Heat Seal',
            'descript': 'Heat Seal',
            'color': null
          },
          'dept': {
            'id': 15,
            'code': 'Multipack_Heat Seal',
            'name': 'Multipack',
            'subDept': 'Heat Seal',
            'sortBy': 10
          },
          'unit': 'PACK',
          'basicSetupTime': 30,
          'basicCapacity': 26,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': 'paperheatseal2',
          'camIp': '000081',
          'ssQuantity': 0,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 28,
          'code': 'HS',
          'descript': 'HS',
          'displayNames': 'HS',
          'needMachine': true,
          'priority': 3300,
          'color': '#4169E1'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|MP Style|Pack|Card Name|Client Name|Multipack-Carrier|Multipack-# of Clam Shells',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 55,
        'settingsMachine': {
          'id': 55,
          'code': 'HS03',
          'descript': 'Paper Heat Seal 3',
          'name': 'Paper Heat Seal 3',
          'settingsMachineType': {
            'code': 'Heat Seal',
            'descript': 'Heat Seal',
            'color': null
          },
          'dept': {
            'id': 15,
            'code': 'Multipack_Heat Seal',
            'name': 'Multipack',
            'subDept': 'Heat Seal',
            'sortBy': 10
          },
          'unit': 'PACK',
          'basicSetupTime': 30,
          'basicCapacity': 26,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': 'paperheatseal3',
          'camIp': '000082',
          'ssQuantity': 0,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 28,
          'code': 'HS',
          'descript': 'HS',
          'displayNames': 'HS',
          'needMachine': true,
          'priority': 3300,
          'color': '#4169E1'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|MP Style|Pack|Card Name|Client Name|Multipack-Carrier|Multipack-# of Clam Shells',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 56,
        'settingsMachine': {
          'id': 56,
          'code': 'HS04',
          'descript': 'Paper Heat Seal 4',
          'name': 'Paper Heat Seal 4',
          'settingsMachineType': {
            'code': 'Heat Seal',
            'descript': 'Heat Seal',
            'color': null
          },
          'dept': {
            'id': 15,
            'code': 'Multipack_Heat Seal',
            'name': 'Multipack',
            'subDept': 'Heat Seal',
            'sortBy': 10
          },
          'unit': 'PACK',
          'basicSetupTime': 30,
          'basicCapacity': 26,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': 'paperheatseal4',
          'camIp': '000083',
          'ssQuantity': 0,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 28,
          'code': 'HS',
          'descript': 'HS',
          'displayNames': 'HS',
          'needMachine': true,
          'priority': 3300,
          'color': '#4169E1'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|MP Style|Pack|Card Name|Client Name|Multipack-Carrier|Multipack-# of Clam Shells',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 57,
        'settingsMachine': {
          'id': 57,
          'code': 'HS05',
          'descript': 'Plastic Heat Seal 1',
          'name': 'Plastic Heat Seal 1',
          'settingsMachineType': {
            'code': 'Heat Seal',
            'descript': 'Heat Seal',
            'color': null
          },
          'dept': {
            'id': 15,
            'code': 'Multipack_Heat Seal',
            'name': 'Multipack',
            'subDept': 'Heat Seal',
            'sortBy': 10
          },
          'unit': 'PACK',
          'basicSetupTime': 0,
          'basicCapacity': 22,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': 'plasticheatseal1',
          'camIp': '000084',
          'ssQuantity': 0,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 28,
          'code': 'HS',
          'descript': 'HS',
          'displayNames': 'HS',
          'needMachine': true,
          'priority': 3300,
          'color': '#4169E1'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|MP Style|Pack|Card Name|Client Name|Multipack-Carrier|Multipack-# of Clam Shells',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 58,
        'settingsMachine': {
          'id': 58,
          'code': 'HS06',
          'descript': 'Plastic Heat Seal 2',
          'name': 'Plastic Heat Seal 2',
          'settingsMachineType': {
            'code': 'Heat Seal',
            'descript': 'Heat Seal',
            'color': null
          },
          'dept': {
            'id': 15,
            'code': 'Multipack_Heat Seal',
            'name': 'Multipack',
            'subDept': 'Heat Seal',
            'sortBy': 10
          },
          'unit': 'PACK',
          'basicSetupTime': 0,
          'basicCapacity': 22,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': 'plasticheatseal2',
          'camIp': '000085',
          'ssQuantity': 0,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 28,
          'code': 'HS',
          'descript': 'HS',
          'displayNames': 'HS',
          'needMachine': true,
          'priority': 3300,
          'color': '#4169E1'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|MP Style|Pack|Card Name|Client Name|Multipack-Carrier|Multipack-# of Clam Shells',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 59,
        'settingsMachine': {
          'id': 59,
          'code': 'HS07',
          'descript': 'Plastic Heat Seal 3',
          'name': 'Plastic Heat Seal 3',
          'settingsMachineType': {
            'code': 'Heat Seal',
            'descript': 'Heat Seal',
            'color': null
          },
          'dept': {
            'id': 15,
            'code': 'Multipack_Heat Seal',
            'name': 'Multipack',
            'subDept': 'Heat Seal',
            'sortBy': 10
          },
          'unit': 'PACK',
          'basicSetupTime': 0,
          'basicCapacity': 22,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': 'plasticheatseal3',
          'camIp': '000086',
          'ssQuantity': 0,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 28,
          'code': 'HS',
          'descript': 'HS',
          'displayNames': 'HS',
          'needMachine': true,
          'priority': 3300,
          'color': '#4169E1'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|MP Style|Pack|Card Name|Client Name|Multipack-Carrier|Multipack-# of Clam Shells',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 60,
        'settingsMachine': {
          'id': 60,
          'code': 'HS08',
          'descript': 'Plastic Heat Seal 4',
          'name': 'Plastic Heat Seal 4',
          'settingsMachineType': {
            'code': 'Heat Seal',
            'descript': 'Heat Seal',
            'color': null
          },
          'dept': {
            'id': 15,
            'code': 'Multipack_Heat Seal',
            'name': 'Multipack',
            'subDept': 'Heat Seal',
            'sortBy': 10
          },
          'unit': 'PACK',
          'basicSetupTime': 0,
          'basicCapacity': 22,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': 'plasticheatseal4',
          'camIp': '000087',
          'ssQuantity': 0,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 28,
          'code': 'HS',
          'descript': 'HS',
          'displayNames': 'HS',
          'needMachine': true,
          'priority': 3300,
          'color': '#4169E1'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|MP Style|Pack|Card Name|Client Name|Multipack-Carrier|Multipack-# of Clam Shells',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 66,
        'settingsMachine': {
          'id': 66,
          'code': 'PK03',
          'descript': 'Auto Shrink Wrap 1',
          'name': 'Auto Shrink Wrap 1',
          'settingsMachineType': {
            'code': 'Auto Shrink Wrap',
            'descript': 'Auto Shrink Wrap',
            'color': null
          },
          'dept': {
            'id': 17,
            'code': 'Packing Dept_Shrink Wrap Packing',
            'name': 'Packing Dept',
            'subDept': 'Shrink Wrap Packing',
            'sortBy': 12
          },
          'unit': 'CARD',
          'basicSetupTime': 120,
          'basicCapacity': 458,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': 'autoshrinkwrap1',
          'camIp': '000093',
          'ssQuantity': 0,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 30,
          'code': 'PK_AUTO',
          'descript': 'PK_AUTO',
          'displayNames': 'Packing',
          'needMachine': true,
          'priority': 3500,
          'color': '#FFD700'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|Bundle Pack|Inner Pack|Card Style|Card Name|Card Size|Shipping Date',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': [
        {
          'id': '3772',
          'oid': '3772',
          'part': 0,
          'operationCode': '14d0052B',
          'priority': 3500,
          'job': {
            'id': 100,
            'comboType': '2',
            'comboId': 1739,
            'poNo': '205020e',
            'comboQuantity': 10000
          },
          'process': {
            'id': 394,
            'needWaitPrevProcess': false,
            'operations': [
              '3771',
              '3772'
            ],
            'previousProcesses': [
              392
            ],
            'productId': 4608
          },
          'previousOperation': '3771',
          'nextOperations': [],
          'runOnMachineId': 66,
          'actualRunOnMachineId': null,
          'quantity': 10000,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-19T08:39:00.000',
          'expectedSetupFinishTime': '2014-12-19T10:39:00.000',
          'expectedFinishTime': '2014-12-19T11:01:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'B',
          'expectedMoldId': null,
          'tooltip': '205020e|14d0052B|12-19 08:39 - 12-19 11:01|CARD_QTY|10|0|null|null(null)|5.25\'x3.375\'|',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412190545',
          'new': false
        },
        {
          'id': '3559',
          'oid': '3559',
          'part': 0,
          'operationCode': '14d0038B',
          'priority': 3500,
          'job': {
            'id': 87,
            'comboType': '2',
            'comboId': 1725,
            'poNo': '205034e',
            'comboQuantity': 122000
          },
          'process': {
            'id': 355,
            'needWaitPrevProcess': false,
            'operations': [
              '3556',
              '3557',
              '3558',
              '3559',
              '3560',
              '3561',
              '2028ecf4'
            ],
            'previousProcesses': [
              353
            ],
            'productId': 4578
          },
          'previousOperation': '3558',
          'nextOperations': [
            '2028ecf4'
          ],
          'runOnMachineId': 66,
          'actualRunOnMachineId': null,
          'quantity': 16946,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-20T20:38:00.000',
          'expectedSetupFinishTime': '2014-12-20T22:38:00.000',
          'expectedFinishTime': '2014-12-20T23:15:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'B',
          'expectedMoldId': null,
          'tooltip': '205034e|14d0038B|12-20 20:38 - 12-20 23:15|CARD_QTY|10|0|null|null(null)|4.875\'x3.375\'|',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412201445',
          'new': false
        },
        {
          'id': '2028ecf4',
          'oid': '3559',
          'part': 1,
          'operationCode': '14d0038B',
          'priority': 3500,
          'job': {
            'id': 87,
            'comboType': '2',
            'comboId': 1725,
            'poNo': '205034e',
            'comboQuantity': 122000
          },
          'process': {
            'id': 355,
            'needWaitPrevProcess': false,
            'operations': [
              '3556',
              '3557',
              '3558',
              '3559',
              '3560',
              '3561',
              '2028ecf4'
            ],
            'previousProcesses': [
              353
            ],
            'productId': 4578
          },
          'previousOperation': '3559',
          'nextOperations': [
            '3560'
          ],
          'runOnMachineId': 66,
          'actualRunOnMachineId': null,
          'quantity': 33055,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-21T05:45:00.000',
          'expectedSetupFinishTime': '2014-12-21T05:45:00.000',
          'expectedFinishTime': '2014-12-21T06:58:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'B',
          'expectedMoldId': null,
          'tooltip': '',
          'color': '',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412210545',
          'new': true
        },
        {
          'id': '3560',
          'oid': '3560',
          'part': 0,
          'operationCode': '14d0038C',
          'priority': 3500,
          'job': {
            'id': 87,
            'comboType': '2',
            'comboId': 1725,
            'poNo': '205034e',
            'comboQuantity': 122000
          },
          'process': {
            'id': 355,
            'needWaitPrevProcess': false,
            'operations': [
              '3556',
              '3557',
              '3558',
              '3559',
              '3560',
              '3561',
              '2028ecf4'
            ],
            'previousProcesses': [
              353
            ],
            'productId': 4578
          },
          'previousOperation': '2028ecf4',
          'nextOperations': [
            '3561'
          ],
          'runOnMachineId': 66,
          'actualRunOnMachineId': null,
          'quantity': 50001,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-21T06:59:00.000',
          'expectedSetupFinishTime': '2014-12-21T06:59:00.000',
          'expectedFinishTime': '2014-12-21T08:49:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'C',
          'expectedMoldId': null,
          'tooltip': '205034e|14d0038C|12-21 06:59 - 12-21 08:49|CARD_QTY|10|0|null|null(null)|4.875\'x3.375\'|',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412210545',
          'new': false
        },
        {
          'id': '3561',
          'oid': '3561',
          'part': 0,
          'operationCode': '14d0038D',
          'priority': 3500,
          'job': {
            'id': 87,
            'comboType': '2',
            'comboId': 1725,
            'poNo': '205034e',
            'comboQuantity': 122000
          },
          'process': {
            'id': 355,
            'needWaitPrevProcess': false,
            'operations': [
              '3556',
              '3557',
              '3558',
              '3559',
              '3560',
              '3561',
              '2028ecf4'
            ],
            'previousProcesses': [
              353
            ],
            'productId': 4578
          },
          'previousOperation': '3560',
          'nextOperations': [],
          'runOnMachineId': 66,
          'actualRunOnMachineId': null,
          'quantity': 21998,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-21T08:50:00.000',
          'expectedSetupFinishTime': '2014-12-21T08:50:00.000',
          'expectedFinishTime': '2014-12-21T09:39:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'D',
          'expectedMoldId': null,
          'tooltip': '205034e|14d0038D|12-21 08:50 - 12-21 09:39|CARD_QTY|10|0|null|null(null)|4.875\'x3.375\'|',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412210545',
          'new': false
        },
        {
          'id': '3759',
          'oid': '3759',
          'part': 0,
          'operationCode': '14d0051B',
          'priority': 3500,
          'job': {
            'id': 99,
            'comboType': '2',
            'comboId': 1738,
            'poNo': '205036e',
            'comboQuantity': 135010
          },
          'process': {
            'id': 391,
            'needWaitPrevProcess': false,
            'operations': [
              '3756',
              '3757',
              '3758',
              '3759',
              '3760',
              '3761',
              '6d9f3b1f'
            ],
            'previousProcesses': [
              389
            ],
            'productId': 4606
          },
          'previousOperation': '3758',
          'nextOperations': [
            '3760'
          ],
          'runOnMachineId': 66,
          'actualRunOnMachineId': null,
          'quantity': 50001,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-21T19:11:00.000',
          'expectedSetupFinishTime': '2014-12-21T21:11:00.000',
          'expectedFinishTime': '2014-12-21T23:01:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'B',
          'expectedMoldId': null,
          'tooltip': '205036e|14d0051B|12-21 19:11 - 12-21 23:01|CARD_QTY|10|0|null|null(null)|4.875\'x3.375\'|',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412211445',
          'new': false
        },
        {
          'id': '3760',
          'oid': '3760',
          'part': 0,
          'operationCode': '14d0051C',
          'priority': 3500,
          'job': {
            'id': 99,
            'comboType': '2',
            'comboId': 1738,
            'poNo': '205036e',
            'comboQuantity': 135010
          },
          'process': {
            'id': 391,
            'needWaitPrevProcess': false,
            'operations': [
              '3756',
              '3757',
              '3758',
              '3759',
              '3760',
              '3761',
              '6d9f3b1f'
            ],
            'previousProcesses': [
              389
            ],
            'productId': 4606
          },
          'previousOperation': '3759',
          'nextOperations': [
            '6d9f3b1f'
          ],
          'runOnMachineId': 66,
          'actualRunOnMachineId': null,
          'quantity': 5954,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-21T23:02:00.000',
          'expectedSetupFinishTime': '2014-12-21T23:02:00.000',
          'expectedFinishTime': '2014-12-21T23:15:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'C',
          'expectedMoldId': null,
          'tooltip': '205036e|14d0051C|12-21 23:02 - 12-21 23:15|CARD_QTY|10|0|null|null(null)|4.875\'x3.375\'|',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412211445',
          'new': false
        },
        {
          'id': '6d9f3b1f',
          'oid': '3760',
          'part': 1,
          'operationCode': '14d0051C',
          'priority': 3500,
          'job': {
            'id': 99,
            'comboType': '2',
            'comboId': 1738,
            'poNo': '205036e',
            'comboQuantity': 135010
          },
          'process': {
            'id': 391,
            'needWaitPrevProcess': false,
            'operations': [
              '3756',
              '3757',
              '3758',
              '3759',
              '3760',
              '3761',
              '6d9f3b1f'
            ],
            'previousProcesses': [
              389
            ],
            'productId': 4606
          },
          'previousOperation': '3760',
          'nextOperations': [
            '3761'
          ],
          'runOnMachineId': 66,
          'actualRunOnMachineId': null,
          'quantity': 44047,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-22T05:45:00.000',
          'expectedSetupFinishTime': '2014-12-22T05:45:00.000',
          'expectedFinishTime': '2014-12-22T07:22:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'C',
          'expectedMoldId': null,
          'tooltip': '',
          'color': '',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412220545',
          'new': true
        },
        {
          'id': '3761',
          'oid': '3761',
          'part': 0,
          'operationCode': '14d0051D',
          'priority': 3500,
          'job': {
            'id': 99,
            'comboType': '2',
            'comboId': 1738,
            'poNo': '205036e',
            'comboQuantity': 135010
          },
          'process': {
            'id': 391,
            'needWaitPrevProcess': false,
            'operations': [
              '3756',
              '3757',
              '3758',
              '3759',
              '3760',
              '3761',
              '6d9f3b1f'
            ],
            'previousProcesses': [
              389
            ],
            'productId': 4606
          },
          'previousOperation': '6d9f3b1f',
          'nextOperations': [],
          'runOnMachineId': 66,
          'actualRunOnMachineId': null,
          'quantity': 35008,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-22T07:23:00.000',
          'expectedSetupFinishTime': '2014-12-22T07:23:00.000',
          'expectedFinishTime': '2014-12-22T08:40:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'D',
          'expectedMoldId': null,
          'tooltip': '205036e|14d0051D|12-22 07:23 - 12-22 08:40|CARD_QTY|10|0|null|null(null)|4.875\'x3.375\'|',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412220545',
          'new': false
        }
      ]
    },
    {
      'machine': {
        'id': 67,
        'settingsMachine': {
          'id': 67,
          'code': 'PK04',
          'descript': 'Auto Shrink Wrap 2',
          'name': 'Auto Shrink Wrap 2',
          'settingsMachineType': {
            'code': 'Auto Shrink Wrap',
            'descript': 'Auto Shrink Wrap',
            'color': null
          },
          'dept': {
            'id': 17,
            'code': 'Packing Dept_Shrink Wrap Packing',
            'name': 'Packing Dept',
            'subDept': 'Shrink Wrap Packing',
            'sortBy': 12
          },
          'unit': 'CARD',
          'basicSetupTime': 120,
          'basicCapacity': 458,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': 'autoshrinkwrap2',
          'camIp': '000094',
          'ssQuantity': 0,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 30,
          'code': 'PK_AUTO',
          'descript': 'PK_AUTO',
          'displayNames': 'Packing',
          'needMachine': true,
          'priority': 3500,
          'color': '#FFD700'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|Bundle Pack|Inner Pack|Card Style|Card Name|Card Size|Shipping Date',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 68,
        'settingsMachine': {
          'id': 68,
          'code': 'PK05',
          'descript': 'Auto Shrink Wrap 3',
          'name': 'Auto Shrink Wrap 3',
          'settingsMachineType': {
            'code': 'Auto Shrink Wrap',
            'descript': 'Auto Shrink Wrap',
            'color': null
          },
          'dept': {
            'id': 17,
            'code': 'Packing Dept_Shrink Wrap Packing',
            'name': 'Packing Dept',
            'subDept': 'Shrink Wrap Packing',
            'sortBy': 12
          },
          'unit': 'CARD',
          'basicSetupTime': 10,
          'basicCapacity': 458,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': 'autoshrinkwrap3',
          'camIp': '000095',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 30,
          'code': 'PK_AUTO',
          'descript': 'PK_AUTO',
          'displayNames': 'Packing',
          'needMachine': true,
          'priority': 3500,
          'color': '#FFD700'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|Bundle Pack|Inner Pack|Card Style|Card Name|Card Size|Shipping Date',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 70,
        'settingsMachine': {
          'id': 70,
          'code': 'PK09',
          'descript': 'New Machine Upack #2',
          'name': 'New Machine Upack #2',
          'settingsMachineType': {
            'code': 'Auto Shrink Wrap',
            'descript': 'Auto Shrink Wrap',
            'color': null
          },
          'dept': {
            'id': 17,
            'code': 'Packing Dept_Shrink Wrap Packing',
            'name': 'Packing Dept',
            'subDept': 'Shrink Wrap Packing',
            'sortBy': 12
          },
          'unit': 'CARD',
          'basicSetupTime': 30,
          'basicCapacity': 312,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '192.168.1.70',
          'camIp': '000097',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 30,
          'code': 'PK_AUTO',
          'descript': 'PK_AUTO',
          'displayNames': 'Packing',
          'needMachine': true,
          'priority': 3500,
          'color': '#FFD700'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|Bundle Pack|Inner Pack|Card Style|Card Name|Card Size|Shipping Date',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 109,
        'settingsMachine': {
          'id': 109,
          'code': 'PK11',
          'descript': 'New Machine Upack #4',
          'name': 'New Machine Upack #4',
          'settingsMachineType': {
            'code': 'Auto Shrink Wrap',
            'descript': 'Auto Shrink Wrap',
            'color': null
          },
          'dept': {
            'id': 17,
            'code': 'Packing Dept_Shrink Wrap Packing',
            'name': 'Packing Dept',
            'subDept': 'Shrink Wrap Packing',
            'sortBy': 12
          },
          'unit': 'CARD',
          'basicSetupTime': 30,
          'basicCapacity': 312,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 30,
          'code': 'PK_AUTO',
          'descript': 'PK_AUTO',
          'displayNames': 'Packing',
          'needMachine': true,
          'priority': 3500,
          'color': '#FFD700'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|Bundle Pack|Inner Pack|Card Style|Card Name|Card Size|Shipping Date',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 69,
        'settingsMachine': {
          'id': 69,
          'code': 'PK08',
          'descript': 'New Machine Upack #1',
          'name': 'New Machine Upack #1',
          'settingsMachineType': {
            'code': 'Auto Shrink Wrap',
            'descript': 'Auto Shrink Wrap',
            'color': null
          },
          'dept': {
            'id': 17,
            'code': 'Packing Dept_Shrink Wrap Packing',
            'name': 'Packing Dept',
            'subDept': 'Shrink Wrap Packing',
            'sortBy': 12
          },
          'unit': 'CARD',
          'basicSetupTime': 30,
          'basicCapacity': 250,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '192.168.1.69',
          'camIp': '000096',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 30,
          'code': 'PK_AUTO',
          'descript': 'PK_AUTO',
          'displayNames': 'Packing',
          'needMachine': true,
          'priority': 3500,
          'color': '#FFD700'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|Bundle Pack|Inner Pack|Card Style|Card Name|Card Size|Shipping Date',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 108,
        'settingsMachine': {
          'id': 108,
          'code': 'PK10',
          'descript': 'New Machine Upack #3',
          'name': 'New Machine Upack #3',
          'settingsMachineType': {
            'code': 'Auto Shrink Wrap',
            'descript': 'Auto Shrink Wrap',
            'color': null
          },
          'dept': {
            'id': 17,
            'code': 'Packing Dept_Shrink Wrap Packing',
            'name': 'Packing Dept',
            'subDept': 'Shrink Wrap Packing',
            'sortBy': 12
          },
          'unit': 'CARD',
          'basicSetupTime': 30,
          'basicCapacity': 250,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 30,
          'code': 'PK_AUTO',
          'descript': 'PK_AUTO',
          'displayNames': 'Packing',
          'needMachine': true,
          'priority': 3500,
          'color': '#FFD700'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|Bundle Pack|Inner Pack|Card Style|Card Name|Card Size|Shipping Date',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 64,
        'settingsMachine': {
          'id': 64,
          'code': 'PK01',
          'descript': 'Manual Packing 1',
          'name': 'Manual Packing 1',
          'settingsMachineType': {
            'code': 'Manual Packing',
            'descript': 'Manual Packing',
            'color': null
          },
          'dept': {
            'id': 17,
            'code': 'Packing Dept_Shrink Wrap Packing',
            'name': 'Packing Dept',
            'subDept': 'Shrink Wrap Packing',
            'sortBy': 12
          },
          'unit': 'CARD',
          'basicSetupTime': 15,
          'basicCapacity': 83,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': 'manualpacking1',
          'camIp': '000091',
          'ssQuantity': 0,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 31,
          'code': 'PK_MANUAL',
          'descript': 'PK_MANUAL',
          'displayNames': 'Packing',
          'needMachine': true,
          'priority': 3600,
          'color': '#008080'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|Bundle Pack|Inner Pack|Card Style|Card Name|Card Size|Shipping Date',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 65,
        'settingsMachine': {
          'id': 65,
          'code': 'PK02',
          'descript': 'Manual Packing 2',
          'name': 'Manual Packing 2',
          'settingsMachineType': {
            'code': 'Manual Packing',
            'descript': 'Manual Packing',
            'color': null
          },
          'dept': {
            'id': 17,
            'code': 'Packing Dept_Shrink Wrap Packing',
            'name': 'Packing Dept',
            'subDept': 'Shrink Wrap Packing',
            'sortBy': 12
          },
          'unit': 'CARD',
          'basicSetupTime': 15,
          'basicCapacity': 83,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': 'manualpacking2',
          'camIp': '000092',
          'ssQuantity': 0,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 31,
          'code': 'PK_MANUAL',
          'descript': 'PK_MANUAL',
          'displayNames': 'Packing',
          'needMachine': true,
          'priority': 3600,
          'color': '#008080'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|Bundle Pack|Inner Pack|Card Style|Card Name|Card Size|Shipping Date',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 114,
        'settingsMachine': {
          'id': 114,
          'code': 'PK14',
          'descript': '',
          'name': 'Human Packing(V)',
          'settingsMachineType': {
            'code': 'Manual Packing',
            'descript': 'Manual Packing',
            'color': null
          },
          'dept': {
            'id': 17,
            'code': 'Packing Dept_Shrink Wrap Packing',
            'name': 'Packing Dept',
            'subDept': 'Shrink Wrap Packing',
            'sortBy': 12
          },
          'unit': 'CARD',
          'basicSetupTime': 0,
          'basicCapacity': 1000,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 31,
          'code': 'PK_MANUAL',
          'descript': 'PK_MANUAL',
          'displayNames': 'Packing',
          'needMachine': true,
          'priority': 3600,
          'color': '#008080'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|Bundle Pack|Inner Pack|Card Style|Card Name|Card Size|Shipping Date',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 111,
        'settingsMachine': {
          'id': 111,
          'code': 'PK13',
          'descript': '',
          'name': 'SBX',
          'settingsMachineType': {
            'code': 'Manual Packing',
            'descript': 'Manual Packing',
            'color': null
          },
          'dept': {
            'id': 17,
            'code': 'Packing Dept_Shrink Wrap Packing',
            'name': 'Packing Dept',
            'subDept': 'Shrink Wrap Packing',
            'sortBy': 12
          },
          'unit': 'PACK',
          'basicSetupTime': 15,
          'basicCapacity': 291,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 31,
          'code': 'PK_MANUAL',
          'descript': 'PK_MANUAL',
          'displayNames': 'Packing',
          'needMachine': true,
          'priority': 3600,
          'color': '#008080'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|Bundle Pack|Inner Pack|Card Style|Card Name|Card Size|Shipping Date',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 71,
        'settingsMachine': {
          'id': 71,
          'code': 'PK07',
          'descript': 'Multi-pack Auto Pack',
          'name': 'Multi-pack Auto Pack',
          'settingsMachineType': {
            'code': 'Multipack',
            'descript': 'Multipack',
            'color': null
          },
          'dept': {
            'id': 17,
            'code': 'Packing Dept_Shrink Wrap Packing',
            'name': 'Packing Dept',
            'subDept': 'Shrink Wrap Packing',
            'sortBy': 12
          },
          'unit': 'PACK',
          'basicSetupTime': 30,
          'basicCapacity': 166,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': 'multipackautopacking',
          'camIp': '000098',
          'ssQuantity': 0,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 33,
          'code': 'PK_MP',
          'descript': 'PK_MP',
          'displayNames': 'Packing',
          'needMachine': true,
          'priority': 3800,
          'color': '#FF2400'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Card qty-No job file|Bundle Pack|Inner Pack|MP Style|Pack|Card Name|Multipack-Carrier|Multipack-# of Clam Shells',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': [
        {
          'id': '3381',
          'oid': '3381',
          'part': 0,
          'operationCode': 'M14d0001B',
          'priority': 3800,
          'job': {
            'id': 76,
            'comboType': '4',
            'comboId': 1684,
            'poNo': '203924',
            'comboQuantity': 15010
          },
          'process': {
            'id': 321,
            'needWaitPrevProcess': true,
            'operations': [
              '3380',
              '3381'
            ],
            'previousProcesses': [
              319
            ],
            'productId': 4488
          },
          'previousOperation': '3380',
          'nextOperations': [],
          'runOnMachineId': 71,
          'actualRunOnMachineId': null,
          'quantity': 15010,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-19T08:12:00.000',
          'expectedSetupFinishTime': '2014-12-19T08:42:00.000',
          'expectedFinishTime': '2014-12-19T10:13:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'B',
          'expectedMoldId': null,
          'tooltip': '203924|M14d0001B|12-19 08:12 - 12-19 10:13|CARD_QTY|5|0|Dome|Incomm|Ultra MP Parent SIM Bundle Kit ($29 Airtime + $5 SIM) $34($34.00)|1 Piece|None',
          'color': '#F0AD4E',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412190545',
          'new': false
        },
        {
          'id': '3383',
          'oid': '3383',
          'part': 0,
          'operationCode': 'M14d0001B',
          'priority': 3800,
          'job': {
            'id': 76,
            'comboType': '4',
            'comboId': 1684,
            'poNo': '203924',
            'comboQuantity': 15010
          },
          'process': {
            'id': 322,
            'needWaitPrevProcess': false,
            'operations': [
              '3382',
              '3383'
            ],
            'previousProcesses': [
              321
            ],
            'productId': 4487
          },
          'previousOperation': '3382',
          'nextOperations': [],
          'runOnMachineId': 71,
          'actualRunOnMachineId': null,
          'quantity': 15010,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-19T10:14:00.000',
          'expectedSetupFinishTime': '2014-12-19T10:44:00.000',
          'expectedFinishTime': '2014-12-19T12:15:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'B',
          'expectedMoldId': null,
          'tooltip': '203924|M14d0001B|12-19 10:14 - 12-19 12:15|CARD_QTY|5|0|Dome|Incomm|null(null)|1 Piece|None',
          'color': '#F0AD4E',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412190545',
          'new': false
        }
      ]
    },
    {
      'machine': {
        'id': 87,
        'settingsMachine': {
          'id': 87,
          'code': 'MD24',
          'descript': 'Sheet Cutter',
          'name': 'Sheet Cutter',
          'settingsMachineType': {
            'code': 'Sheet Cutter',
            'descript': 'Sheet Cutter',
            'color': null
          },
          'dept': {
            'id': 10,
            'code': 'Mid Dept_Lamination',
            'name': 'Mid Dept',
            'subDept': 'Lamination',
            'sortBy': 4
          },
          'unit': 'SHEET',
          'basicSetupTime': 60,
          'basicCapacity': 8,
          'basicPendingMinutes': 0,
          'processingType': 'GANG',
          'monitorAddress': '997',
          'camIp': '997',
          'ssQuantity': 0,
          'machineOrder': 6
        },
        'factoryOperation': {
          'id': 37,
          'code': 'MID_SHEET_CUT_EDGE',
          'descript': 'MID_SHEET_CUT_EDGE',
          'displayNames': 'Mid Lam',
          'needMachine': true,
          'priority': 1100,
          'color': '#CCCCFF'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Sheet Qty|Data Format|Data Approval|Card Size|Material|Lamination Front|Lamination Back|Magstripe Type|Magstripe Size|Magstripe Color|Magstripe Track#',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 24,
        'settingsMachine': {
          'id': 24,
          'code': 'MD17',
          'descript': 'Bobst 104SP',
          'name': 'Bobst 104SP',
          'settingsMachineType': {
            'code': 'BOBST104',
            'descript': 'BOBST104',
            'color': null
          },
          'dept': {
            'id': 11,
            'code': 'Mid Dept_Die Cut',
            'name': 'Mid Dept',
            'subDept': 'Die Cut',
            'sortBy': 5
          },
          'unit': 'SHEET',
          'basicSetupTime': 30,
          'basicCapacity': 31,
          'basicPendingMinutes': 0,
          'processingType': 'GANG',
          'monitorAddress': 'bobst104sp',
          'camIp': '10.100.0.20',
          'ssQuantity': 2000,
          'machineOrder': null
        },
        'factoryOperation': {
          'id': 38,
          'code': 'MID_DIE_BOBST_104',
          'descript': 'MID_DIE_BOBST_104',
          'displayNames': 'Mid Lam',
          'needMachine': true,
          'priority': 1200,
          'color': '#FF00FF'
        },
        'title': 'PO#|OperationCode (Gang#)|Start/End Time|Sheet Qty|Data Format|Data Approval|Card Size|Material|Lamination Front|Lamination Back|Magstripe Type|Magstripe Size|Magstripe Color|Magstripe Track#',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 115,
        'settingsMachine': {
          'id': 115,
          'code': 'QAR01',
          'descript': 'QA Remake 1',
          'name': 'REMAKE01',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': [
        {
          'id': '3767',
          'oid': '3767',
          'part': 0,
          'operationCode': '14d0052B',
          'priority': 2800,
          'job': {
            'id': 100,
            'comboType': '2',
            'comboId': 1739,
            'poNo': '205020e',
            'comboQuantity': 10000
          },
          'process': {
            'id': 392,
            'needWaitPrevProcess': true,
            'operations': [
              '3762',
              '3763',
              '3764',
              '3765',
              '3766',
              '3767',
              '3854',
              '25cccd85'
            ],
            'previousProcesses': [
              393
            ],
            'productId': 4607
          },
          'previousOperation': '3766',
          'nextOperations': [
            '3854'
          ],
          'runOnMachineId': 115,
          'actualRunOnMachineId': null,
          'quantity': 4816,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': 2,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-18T20:09:00.000',
          'expectedSetupFinishTime': '2014-12-18T20:09:00.000',
          'expectedFinishTime': '2014-12-18T23:08:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'B',
          'expectedMoldId': null,
          'tooltip': '',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412181445',
          'new': false
        },
        {
          'id': '3854',
          'oid': '3854',
          'part': 0,
          'operationCode': '14d0052B',
          'priority': 2800,
          'job': {
            'id': 100,
            'comboType': '2',
            'comboId': 1739,
            'poNo': '205020e',
            'comboQuantity': 10000
          },
          'process': {
            'id': 392,
            'needWaitPrevProcess': true,
            'operations': [
              '3762',
              '3763',
              '3764',
              '3765',
              '3766',
              '3767',
              '3854',
              '25cccd85'
            ],
            'previousProcesses': [
              393
            ],
            'productId': 4607
          },
          'previousOperation': '3767',
          'nextOperations': [],
          'runOnMachineId': 115,
          'actualRunOnMachineId': null,
          'quantity': 174,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-18T23:09:00.000',
          'expectedSetupFinishTime': '2014-12-18T23:09:00.000',
          'expectedFinishTime': '2014-12-18T23:15:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'B',
          'expectedMoldId': null,
          'tooltip': '',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412181445',
          'new': false
        },
        {
          'id': '25cccd85',
          'oid': '3854',
          'part': 1,
          'operationCode': '14d0052B',
          'priority': 2800,
          'job': {
            'id': 100,
            'comboType': '2',
            'comboId': 1739,
            'poNo': '205020e',
            'comboQuantity': 10000
          },
          'process': {
            'id': 392,
            'needWaitPrevProcess': true,
            'operations': [
              '3762',
              '3763',
              '3764',
              '3765',
              '3766',
              '3767',
              '3854',
              '25cccd85'
            ],
            'previousProcesses': [
              393
            ],
            'productId': 4607
          },
          'previousOperation': '3854',
          'nextOperations': [],
          'runOnMachineId': 115,
          'actualRunOnMachineId': null,
          'quantity': 5010,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-19T05:45:00.000',
          'expectedSetupFinishTime': '2014-12-19T05:45:00.000',
          'expectedFinishTime': '2014-12-19T08:38:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'B',
          'expectedMoldId': null,
          'tooltip': '',
          'color': '',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412190545',
          'new': true
        },
        {
          'id': '3549',
          'oid': '3549',
          'part': 0,
          'operationCode': '14d0038B',
          'priority': 2800,
          'job': {
            'id': 87,
            'comboType': '2',
            'comboId': 1725,
            'poNo': '205034e',
            'comboQuantity': 122000
          },
          'process': {
            'id': 353,
            'needWaitPrevProcess': true,
            'operations': [
              '3539',
              '3540',
              '3541',
              '3542',
              '3543',
              '3544',
              '3545',
              '3546',
              '3547',
              '3548',
              '3549',
              '3550',
              '3551',
              '666e1965',
              'a5a9502'
            ],
            'previousProcesses': [
              354
            ],
            'productId': 4577
          },
          'previousOperation': '3548',
          'nextOperations': [
            '3550'
          ],
          'runOnMachineId': 115,
          'actualRunOnMachineId': null,
          'quantity': 50001,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': 2,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-20T11:06:00.000',
          'expectedSetupFinishTime': '2014-12-20T11:06:00.000',
          'expectedFinishTime': '2014-12-20T14:06:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'B',
          'expectedMoldId': null,
          'tooltip': '',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412200545',
          'new': false
        },
        {
          'id': '3550',
          'oid': '3550',
          'part': 0,
          'operationCode': '14d0038C',
          'priority': 2800,
          'job': {
            'id': 87,
            'comboType': '2',
            'comboId': 1725,
            'poNo': '205034e',
            'comboQuantity': 122000
          },
          'process': {
            'id': 353,
            'needWaitPrevProcess': true,
            'operations': [
              '3539',
              '3540',
              '3541',
              '3542',
              '3543',
              '3544',
              '3545',
              '3546',
              '3547',
              '3548',
              '3549',
              '3550',
              '3551',
              '666e1965',
              'a5a9502'
            ],
            'previousProcesses': [
              354
            ],
            'productId': 4577
          },
          'previousOperation': '3549',
          'nextOperations': [
            'a5a9502'
          ],
          'runOnMachineId': 115,
          'actualRunOnMachineId': null,
          'quantity': 2224,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-20T14:07:00.000',
          'expectedSetupFinishTime': '2014-12-20T14:07:00.000',
          'expectedFinishTime': '2014-12-20T14:15:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'C',
          'expectedMoldId': null,
          'tooltip': '',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412200545',
          'new': false
        },
        {
          'id': 'a5a9502',
          'oid': '3550',
          'part': 1,
          'operationCode': '14d0038C',
          'priority': 2800,
          'job': {
            'id': 87,
            'comboType': '2',
            'comboId': 1725,
            'poNo': '205034e',
            'comboQuantity': 122000
          },
          'process': {
            'id': 353,
            'needWaitPrevProcess': true,
            'operations': [
              '3539',
              '3540',
              '3541',
              '3542',
              '3543',
              '3544',
              '3545',
              '3546',
              '3547',
              '3548',
              '3549',
              '3550',
              '3551',
              '666e1965',
              'a5a9502'
            ],
            'previousProcesses': [
              354
            ],
            'productId': 4577
          },
          'previousOperation': '3550',
          'nextOperations': [
            '3551'
          ],
          'runOnMachineId': 115,
          'actualRunOnMachineId': null,
          'quantity': 47777,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-20T14:45:00.000',
          'expectedSetupFinishTime': '2014-12-20T14:45:00.000',
          'expectedFinishTime': '2014-12-20T17:37:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'C',
          'expectedMoldId': null,
          'tooltip': '',
          'color': '',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412201445',
          'new': true
        },
        {
          'id': '3551',
          'oid': '3551',
          'part': 0,
          'operationCode': '14d0038D',
          'priority': 2800,
          'job': {
            'id': 87,
            'comboType': '2',
            'comboId': 1725,
            'poNo': '205034e',
            'comboQuantity': 122000
          },
          'process': {
            'id': 353,
            'needWaitPrevProcess': true,
            'operations': [
              '3539',
              '3540',
              '3541',
              '3542',
              '3543',
              '3544',
              '3545',
              '3546',
              '3547',
              '3548',
              '3549',
              '3550',
              '3551',
              '666e1965',
              'a5a9502'
            ],
            'previousProcesses': [
              354
            ],
            'productId': 4577
          },
          'previousOperation': 'a5a9502',
          'nextOperations': [],
          'runOnMachineId': 115,
          'actualRunOnMachineId': null,
          'quantity': 21998,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-20T17:38:00.000',
          'expectedSetupFinishTime': '2014-12-20T17:38:00.000',
          'expectedFinishTime': '2014-12-20T20:37:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'D',
          'expectedMoldId': null,
          'tooltip': '',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412201445',
          'new': false
        },
        {
          'id': '3748',
          'oid': '3748',
          'part': 0,
          'operationCode': '14d0051B',
          'priority': 2800,
          'job': {
            'id': 99,
            'comboType': '2',
            'comboId': 1738,
            'poNo': '205036e',
            'comboQuantity': 135010
          },
          'process': {
            'id': 389,
            'needWaitPrevProcess': true,
            'operations': [
              '3738',
              '3739',
              '3740',
              '3741',
              '3742',
              '3743',
              '3744',
              '3745',
              '3746',
              '3747',
              '3748',
              '3749',
              '3750',
              '48306cc8',
              '33cdd',
              '1d5b4a5b'
            ],
            'previousProcesses': [
              390
            ],
            'productId': 4605
          },
          'previousOperation': '3747',
          'nextOperations': [
            '3749'
          ],
          'runOnMachineId': 115,
          'actualRunOnMachineId': null,
          'quantity': 50001,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': 2,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-21T09:38:00.000',
          'expectedSetupFinishTime': '2014-12-21T09:38:00.000',
          'expectedFinishTime': '2014-12-21T12:38:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'B',
          'expectedMoldId': null,
          'tooltip': '',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412210545',
          'new': false
        },
        {
          'id': '3749',
          'oid': '3749',
          'part': 0,
          'operationCode': '14d0051C',
          'priority': 2800,
          'job': {
            'id': 99,
            'comboType': '2',
            'comboId': 1738,
            'poNo': '205036e',
            'comboQuantity': 135010
          },
          'process': {
            'id': 389,
            'needWaitPrevProcess': true,
            'operations': [
              '3738',
              '3739',
              '3740',
              '3741',
              '3742',
              '3743',
              '3744',
              '3745',
              '3746',
              '3747',
              '3748',
              '3749',
              '3750',
              '48306cc8',
              '33cdd',
              '1d5b4a5b'
            ],
            'previousProcesses': [
              390
            ],
            'productId': 4605
          },
          'previousOperation': '3748',
          'nextOperations': [
            '1d5b4a5b'
          ],
          'runOnMachineId': 115,
          'actualRunOnMachineId': null,
          'quantity': 26688,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-21T12:39:00.000',
          'expectedSetupFinishTime': '2014-12-21T12:39:00.000',
          'expectedFinishTime': '2014-12-21T14:15:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'C',
          'expectedMoldId': null,
          'tooltip': '',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412210545',
          'new': false
        },
        {
          'id': '1d5b4a5b',
          'oid': '3749',
          'part': 1,
          'operationCode': '14d0051C',
          'priority': 2800,
          'job': {
            'id': 99,
            'comboType': '2',
            'comboId': 1738,
            'poNo': '205036e',
            'comboQuantity': 135010
          },
          'process': {
            'id': 389,
            'needWaitPrevProcess': true,
            'operations': [
              '3738',
              '3739',
              '3740',
              '3741',
              '3742',
              '3743',
              '3744',
              '3745',
              '3746',
              '3747',
              '3748',
              '3749',
              '3750',
              '48306cc8',
              '33cdd',
              '1d5b4a5b'
            ],
            'previousProcesses': [
              390
            ],
            'productId': 4605
          },
          'previousOperation': '3749',
          'nextOperations': [
            '3750'
          ],
          'runOnMachineId': 115,
          'actualRunOnMachineId': null,
          'quantity': 23313,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-21T14:45:00.000',
          'expectedSetupFinishTime': '2014-12-21T14:45:00.000',
          'expectedFinishTime': '2014-12-21T16:09:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'C',
          'expectedMoldId': null,
          'tooltip': '',
          'color': '',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412211445',
          'new': true
        },
        {
          'id': '3750',
          'oid': '3750',
          'part': 0,
          'operationCode': '14d0051D',
          'priority': 2800,
          'job': {
            'id': 99,
            'comboType': '2',
            'comboId': 1738,
            'poNo': '205036e',
            'comboQuantity': 135010
          },
          'process': {
            'id': 389,
            'needWaitPrevProcess': true,
            'operations': [
              '3738',
              '3739',
              '3740',
              '3741',
              '3742',
              '3743',
              '3744',
              '3745',
              '3746',
              '3747',
              '3748',
              '3749',
              '3750',
              '48306cc8',
              '33cdd',
              '1d5b4a5b'
            ],
            'previousProcesses': [
              390
            ],
            'productId': 4605
          },
          'previousOperation': '1d5b4a5b',
          'nextOperations': [],
          'runOnMachineId': 115,
          'actualRunOnMachineId': null,
          'quantity': 35008,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-21T16:10:00.000',
          'expectedSetupFinishTime': '2014-12-21T16:10:00.000',
          'expectedFinishTime': '2014-12-21T19:10:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'D',
          'expectedMoldId': null,
          'tooltip': '',
          'color': '#5CB85C',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412211445',
          'new': false
        }
      ]
    },
    {
      'machine': {
        'id': 116,
        'settingsMachine': {
          'id': 116,
          'code': 'QAR02',
          'descript': 'QA Remake 2',
          'name': 'REMAKE02',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': [
        {
          'id': '3374',
          'oid': '3374',
          'part': 0,
          'operationCode': 'M14d0001B',
          'priority': 2800,
          'job': {
            'id': 76,
            'comboType': '4',
            'comboId': 1684,
            'poNo': '203924',
            'comboQuantity': 15010
          },
          'process': {
            'id': 319,
            'needWaitPrevProcess': true,
            'operations': [
              '3370',
              '3371',
              '3372',
              '3373',
              '3374',
              '69676b9c'
            ],
            'previousProcesses': [
              320
            ],
            'productId': 4486
          },
          'previousOperation': '3373',
          'nextOperations': [],
          'runOnMachineId': 116,
          'actualRunOnMachineId': null,
          'quantity': 2772,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': 2,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-18T22:42:00.000',
          'expectedSetupFinishTime': '2014-12-18T22:42:00.000',
          'expectedFinishTime': '2014-12-18T23:15:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'B',
          'expectedMoldId': null,
          'tooltip': '',
          'color': '#F0AD4E',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412181445',
          'new': false
        },
        {
          'id': '69676b9c',
          'oid': '3374',
          'part': 1,
          'operationCode': 'M14d0001B',
          'priority': 2800,
          'job': {
            'id': 76,
            'comboType': '4',
            'comboId': 1684,
            'poNo': '203924',
            'comboQuantity': 15010
          },
          'process': {
            'id': 319,
            'needWaitPrevProcess': true,
            'operations': [
              '3370',
              '3371',
              '3372',
              '3373',
              '3374',
              '69676b9c'
            ],
            'previousProcesses': [
              320
            ],
            'productId': 4486
          },
          'previousOperation': '3374',
          'nextOperations': [],
          'runOnMachineId': 116,
          'actualRunOnMachineId': null,
          'quantity': 12238,
          'actualQuantity': 0,
          'processingType': 'JOB_FILE',
          'factoryOperation': null,
          'pin': false,
          'capacity': 0,
          's2sMins': -1,
          'up': 1,
          'sheetUp': 1,
          'face': null,
          'pendingMinutes': 0,
          'expectedStartTime': '2014-12-19T05:45:00.000',
          'expectedSetupFinishTime': '2014-12-19T05:45:00.000',
          'expectedFinishTime': '2014-12-19T08:11:00.000',
          'actualStartTime': null,
          'actualSetupFinishTime': null,
          'actualFinishTime': null,
          'finished': false,
          'inProcessing': false,
          'delete': false,
          'parallelCode': 'B',
          'expectedMoldId': null,
          'tooltip': '',
          'color': '',
          'timeclockEmployeeId': null,
          'rounds': 1,
          'taskGroup': '',
          'machineShiftLabel': '201412190545',
          'new': true
        }
      ]
    },
    {
      'machine': {
        'id': 117,
        'settingsMachine': {
          'id': 117,
          'code': 'QAR03',
          'descript': 'QA Remake 3',
          'name': 'REMAKE03',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 118,
        'settingsMachine': {
          'id': 118,
          'code': 'QAR04',
          'descript': 'QA Remake 4',
          'name': 'REMAKE04',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 119,
        'settingsMachine': {
          'id': 119,
          'code': 'QAR05',
          'descript': 'QA Remake 5',
          'name': 'REMAKE05',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 120,
        'settingsMachine': {
          'id': 120,
          'code': 'QAR06',
          'descript': 'QA Remake 6',
          'name': 'REMAKE06',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 121,
        'settingsMachine': {
          'id': 121,
          'code': 'QAR07',
          'descript': 'QA Remake 7',
          'name': 'REMAKE07',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 122,
        'settingsMachine': {
          'id': 122,
          'code': 'QAR08',
          'descript': 'QA Remake 8',
          'name': 'REMAKE08',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 123,
        'settingsMachine': {
          'id': 123,
          'code': 'QAR09',
          'descript': 'QA Remake 9',
          'name': 'REMAKE09',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 124,
        'settingsMachine': {
          'id': 124,
          'code': 'QAR10',
          'descript': 'QA Remake 10',
          'name': 'REMAKE10',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 125,
        'settingsMachine': {
          'id': 125,
          'code': 'QAR11',
          'descript': 'QA Remake 11',
          'name': 'REMAKE11',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 126,
        'settingsMachine': {
          'id': 126,
          'code': 'QAR12',
          'descript': 'QA Remake 12',
          'name': 'REMAKE12',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 127,
        'settingsMachine': {
          'id': 127,
          'code': 'QAR13',
          'descript': 'QA Remake 13',
          'name': 'REMAKE13',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 128,
        'settingsMachine': {
          'id': 128,
          'code': 'QAR14',
          'descript': 'QA Remake 14',
          'name': 'REMAKE14',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 129,
        'settingsMachine': {
          'id': 129,
          'code': 'QAR15',
          'descript': 'QA Remake 15',
          'name': 'REMAKE15',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 130,
        'settingsMachine': {
          'id': 130,
          'code': 'QAR16',
          'descript': 'QA Remake 16',
          'name': 'REMAKE16',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 131,
        'settingsMachine': {
          'id': 131,
          'code': 'QAR17',
          'descript': 'QA Remake 17',
          'name': 'REMAKE17',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 132,
        'settingsMachine': {
          'id': 132,
          'code': 'QAR18',
          'descript': 'QA Remake 18',
          'name': 'REMAKE18',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 133,
        'settingsMachine': {
          'id': 133,
          'code': 'QAR19',
          'descript': 'QA Remake 19',
          'name': 'REMAKE19',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 134,
        'settingsMachine': {
          'id': 134,
          'code': 'QAR20',
          'descript': 'QA Remake 20',
          'name': 'REMAKE20',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 135,
        'settingsMachine': {
          'id': 135,
          'code': 'QAR21',
          'descript': 'QA Remake 21',
          'name': 'REMAKE21',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 136,
        'settingsMachine': {
          'id': 136,
          'code': 'QAR22',
          'descript': 'QA Remake 22',
          'name': 'REMAKE22',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 137,
        'settingsMachine': {
          'id': 137,
          'code': 'QAR23',
          'descript': 'QA Remake 23',
          'name': 'REMAKE23',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 138,
        'settingsMachine': {
          'id': 138,
          'code': 'QAR24',
          'descript': 'QA Remake 24',
          'name': 'REMAKE24',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 139,
        'settingsMachine': {
          'id': 139,
          'code': 'QAR25',
          'descript': 'QA Remake 25',
          'name': 'REMAKE25',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 140,
        'settingsMachine': {
          'id': 140,
          'code': 'QAR26',
          'descript': 'QA Remake 26',
          'name': 'REMAKE26',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 141,
        'settingsMachine': {
          'id': 141,
          'code': 'QAR27',
          'descript': 'QA Remake 27',
          'name': 'REMAKE27',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 142,
        'settingsMachine': {
          'id': 142,
          'code': 'QAR28',
          'descript': 'QA Remake 28',
          'name': 'REMAKE28',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 143,
        'settingsMachine': {
          'id': 143,
          'code': 'QAR29',
          'descript': 'QA Remake 29',
          'name': 'REMAKE29',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 144,
        'settingsMachine': {
          'id': 144,
          'code': 'QAR30',
          'descript': 'QA Remake 30',
          'name': 'REMAKE30',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 145,
        'settingsMachine': {
          'id': 145,
          'code': 'QAR31',
          'descript': 'QA Remake 31',
          'name': 'REMAKE31',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 146,
        'settingsMachine': {
          'id': 146,
          'code': 'QAR32',
          'descript': 'QA Remake 32',
          'name': 'REMAKE32',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 147,
        'settingsMachine': {
          'id': 147,
          'code': 'QAR33',
          'descript': 'QA Remake 33',
          'name': 'REMAKE33',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 148,
        'settingsMachine': {
          'id': 148,
          'code': 'QAR34',
          'descript': 'QA Remake 34',
          'name': 'REMAKE34',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 149,
        'settingsMachine': {
          'id': 149,
          'code': 'QAR35',
          'descript': 'QA Remake 35',
          'name': 'REMAKE35',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 150,
        'settingsMachine': {
          'id': 150,
          'code': 'QAR36',
          'descript': 'QA Remake 36',
          'name': 'REMAKE36',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 151,
        'settingsMachine': {
          'id': 151,
          'code': 'QAR37',
          'descript': 'QA Remake 37',
          'name': 'REMAKE37',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 152,
        'settingsMachine': {
          'id': 152,
          'code': 'QAR38',
          'descript': 'QA Remake 38',
          'name': 'REMAKE38',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 153,
        'settingsMachine': {
          'id': 153,
          'code': 'QAR39',
          'descript': 'QA Remake 39',
          'name': 'REMAKE39',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 154,
        'settingsMachine': {
          'id': 154,
          'code': 'QAR40',
          'descript': 'QA Remake 40',
          'name': 'REMAKE40',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 155,
        'settingsMachine': {
          'id': 155,
          'code': 'QAR41',
          'descript': 'QA Remake 41',
          'name': 'REMAKE41',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 156,
        'settingsMachine': {
          'id': 156,
          'code': 'QAR42',
          'descript': 'QA Remake 42',
          'name': 'REMAKE42',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 157,
        'settingsMachine': {
          'id': 157,
          'code': 'QAR43',
          'descript': 'QA Remake 43',
          'name': 'REMAKE43',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 158,
        'settingsMachine': {
          'id': 158,
          'code': 'QAR44',
          'descript': 'QA Remake 44',
          'name': 'REMAKE44',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 159,
        'settingsMachine': {
          'id': 159,
          'code': 'QAR45',
          'descript': 'QA Remake 45',
          'name': 'REMAKE45',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 160,
        'settingsMachine': {
          'id': 160,
          'code': 'QAR46',
          'descript': 'QA Remake 46',
          'name': 'REMAKE46',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 161,
        'settingsMachine': {
          'id': 161,
          'code': 'QAR47',
          'descript': 'QA Remake 47',
          'name': 'REMAKE47',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 162,
        'settingsMachine': {
          'id': 162,
          'code': 'QAR48',
          'descript': 'QA Remake 48',
          'name': 'REMAKE48',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 163,
        'settingsMachine': {
          'id': 163,
          'code': 'QAR49',
          'descript': 'QA Remake 49',
          'name': 'REMAKE49',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 164,
        'settingsMachine': {
          'id': 164,
          'code': 'QAR50',
          'descript': 'QA Remake 50',
          'name': 'REMAKE50',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 165,
        'settingsMachine': {
          'id': 165,
          'code': 'QAR51',
          'descript': 'QA Remake 51',
          'name': 'REMAKE51',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 166,
        'settingsMachine': {
          'id': 166,
          'code': 'QAR52',
          'descript': 'QA Remake 52',
          'name': 'REMAKE52',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 167,
        'settingsMachine': {
          'id': 167,
          'code': 'QAR53',
          'descript': 'QA Remake 53',
          'name': 'REMAKE53',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 168,
        'settingsMachine': {
          'id': 168,
          'code': 'QAR54',
          'descript': 'QA Remake 54',
          'name': 'REMAKE54',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 169,
        'settingsMachine': {
          'id': 169,
          'code': 'QAR55',
          'descript': 'QA Remake 55',
          'name': 'REMAKE55',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 170,
        'settingsMachine': {
          'id': 170,
          'code': 'QAR56',
          'descript': 'QA Remake 56',
          'name': 'REMAKE56',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 171,
        'settingsMachine': {
          'id': 171,
          'code': 'QAR57',
          'descript': 'QA Remake 57',
          'name': 'REMAKE57',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 172,
        'settingsMachine': {
          'id': 172,
          'code': 'QAR58',
          'descript': 'QA Remake 58',
          'name': 'REMAKE58',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 173,
        'settingsMachine': {
          'id': 173,
          'code': 'QAR59',
          'descript': 'QA Remake 59',
          'name': 'REMAKE59',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 174,
        'settingsMachine': {
          'id': 174,
          'code': 'QAR60',
          'descript': 'QA Remake 60',
          'name': 'REMAKE60',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 175,
        'settingsMachine': {
          'id': 175,
          'code': 'QAR61',
          'descript': 'QA Remake 61',
          'name': 'REMAKE61',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 176,
        'settingsMachine': {
          'id': 176,
          'code': 'QAR62',
          'descript': 'QA Remake 62',
          'name': 'REMAKE62',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 177,
        'settingsMachine': {
          'id': 177,
          'code': 'QAR63',
          'descript': 'QA Remake 63',
          'name': 'REMAKE63',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 178,
        'settingsMachine': {
          'id': 178,
          'code': 'QAR64',
          'descript': 'QA Remake 64',
          'name': 'REMAKE64',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 179,
        'settingsMachine': {
          'id': 179,
          'code': 'QAR65',
          'descript': 'QA Remake 65',
          'name': 'REMAKE65',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 180,
        'settingsMachine': {
          'id': 180,
          'code': 'QAR66',
          'descript': 'QA Remake 66',
          'name': 'REMAKE66',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 181,
        'settingsMachine': {
          'id': 181,
          'code': 'QAR67',
          'descript': 'QA Remake 67',
          'name': 'REMAKE67',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 182,
        'settingsMachine': {
          'id': 182,
          'code': 'QAR68',
          'descript': 'QA Remake 68',
          'name': 'REMAKE68',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 183,
        'settingsMachine': {
          'id': 183,
          'code': 'QAR69',
          'descript': 'QA Remake 69',
          'name': 'REMAKE69',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 184,
        'settingsMachine': {
          'id': 184,
          'code': 'QAR70',
          'descript': 'QA Remake 70',
          'name': 'REMAKE70',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 185,
        'settingsMachine': {
          'id': 185,
          'code': 'QAR71',
          'descript': 'QA Remake 71',
          'name': 'REMAKE71',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 186,
        'settingsMachine': {
          'id': 186,
          'code': 'QAR72',
          'descript': 'QA Remake 72',
          'name': 'REMAKE72',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 187,
        'settingsMachine': {
          'id': 187,
          'code': 'QAR73',
          'descript': 'QA Remake 73',
          'name': 'REMAKE73',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 188,
        'settingsMachine': {
          'id': 188,
          'code': 'QAR74',
          'descript': 'QA Remake 74',
          'name': 'REMAKE74',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 189,
        'settingsMachine': {
          'id': 189,
          'code': 'QAR75',
          'descript': 'QA Remake 75',
          'name': 'REMAKE75',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 190,
        'settingsMachine': {
          'id': 190,
          'code': 'QAR76',
          'descript': 'QA Remake 76',
          'name': 'REMAKE76',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 191,
        'settingsMachine': {
          'id': 191,
          'code': 'QAR77',
          'descript': 'QA Remake 77',
          'name': 'REMAKE77',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 192,
        'settingsMachine': {
          'id': 192,
          'code': 'QAR78',
          'descript': 'QA Remake 78',
          'name': 'REMAKE78',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 193,
        'settingsMachine': {
          'id': 193,
          'code': 'QAR79',
          'descript': 'QA Remake 79',
          'name': 'REMAKE79',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 194,
        'settingsMachine': {
          'id': 194,
          'code': 'QAR80',
          'descript': 'QA Remake 80',
          'name': 'REMAKE80',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 195,
        'settingsMachine': {
          'id': 195,
          'code': 'QAR81',
          'descript': 'QA Remake 81',
          'name': 'REMAKE81',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 196,
        'settingsMachine': {
          'id': 196,
          'code': 'QAR82',
          'descript': 'QA Remake 82',
          'name': 'REMAKE82',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 197,
        'settingsMachine': {
          'id': 197,
          'code': 'QAR83',
          'descript': 'QA Remake 83',
          'name': 'REMAKE83',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 198,
        'settingsMachine': {
          'id': 198,
          'code': 'QAR84',
          'descript': 'QA Remake 84',
          'name': 'REMAKE84',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 199,
        'settingsMachine': {
          'id': 199,
          'code': 'QAR85',
          'descript': 'QA Remake 85',
          'name': 'REMAKE85',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 200,
        'settingsMachine': {
          'id': 200,
          'code': 'QAR86',
          'descript': 'QA Remake 86',
          'name': 'REMAKE86',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 201,
        'settingsMachine': {
          'id': 201,
          'code': 'QAR87',
          'descript': 'QA Remake 87',
          'name': 'REMAKE87',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 202,
        'settingsMachine': {
          'id': 202,
          'code': 'QAR88',
          'descript': 'QA Remake 88',
          'name': 'REMAKE88',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 203,
        'settingsMachine': {
          'id': 203,
          'code': 'QAR89',
          'descript': 'QA Remake 89',
          'name': 'REMAKE89',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 204,
        'settingsMachine': {
          'id': 204,
          'code': 'QAR90',
          'descript': 'QA Remake 90',
          'name': 'REMAKE90',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 205,
        'settingsMachine': {
          'id': 205,
          'code': 'QAR91',
          'descript': 'QA Remake 91',
          'name': 'REMAKE91',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 206,
        'settingsMachine': {
          'id': 206,
          'code': 'QAR92',
          'descript': 'QA Remake 92',
          'name': 'REMAKE92',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 207,
        'settingsMachine': {
          'id': 207,
          'code': 'QAR93',
          'descript': 'QA Remake 93',
          'name': 'REMAKE93',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 208,
        'settingsMachine': {
          'id': 208,
          'code': 'QAR94',
          'descript': 'QA Remake 94',
          'name': 'REMAKE94',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 209,
        'settingsMachine': {
          'id': 209,
          'code': 'QAR95',
          'descript': 'QA Remake 95',
          'name': 'REMAKE95',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 210,
        'settingsMachine': {
          'id': 210,
          'code': 'QAR96',
          'descript': 'QA Remake 96',
          'name': 'REMAKE96',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 211,
        'settingsMachine': {
          'id': 211,
          'code': 'QAR97',
          'descript': 'QA Remake 97',
          'name': 'REMAKE97',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 212,
        'settingsMachine': {
          'id': 212,
          'code': 'QAR98',
          'descript': 'QA Remake 98',
          'name': 'REMAKE98',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    },
    {
      'machine': {
        'id': 213,
        'settingsMachine': {
          'id': 213,
          'code': 'QAR99',
          'descript': 'QA Remake 99',
          'name': 'REMAKE99',
          'settingsMachineType': {
            'code': 'QA Remake',
            'descript': 'QA Remake',
            'color': null
          },
          'dept': {
            'id': 19,
            'code': 'QA Dept_Remake',
            'name': 'QA Dept',
            'subDept': 'Remake',
            'sortBy': 8
          },
          'unit': 'CARD',
          'basicSetupTime': 1,
          'basicCapacity': 1,
          'basicPendingMinutes': 0,
          'processingType': 'JOB_FILE',
          'monitorAddress': '',
          'camIp': '',
          'ssQuantity': 0,
          'machineOrder': 0
        },
        'factoryOperation': {
          'id': 42,
          'code': 'QA_REMAKE',
          'descript': '',
          'displayNames': 'QA',
          'needMachine': true,
          'priority': 2800,
          'color': null
        },
        'title': '',
        'currentTimeWorks': 0,
        'online': true
      },
      'operationQueue': []
    }
  ],
  'messages': []
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
