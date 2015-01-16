'use strict';
angular.module('harvard.templates', []).run(['$templateCache', function($templateCache) {
    $templateCache.put('../app/views/alert.tpl.html',
        '<div class="alert" ng-class="[type ? \'alert-\' + type : null]">\n' +
        '  <button type="button" class="close" ng-if="dismissable" ng-click="$hide()">&times;</button>\n' +
        '  <strong ng-bind="title"></strong>\n' +
        '  <div show-content="{{content}}"></div>\n' +
        '</div>');
    $templateCache.put('../app/views/editor.tpl.html',
        '<div class="modal" tabindex="-1" role="dialog">\n' +
        '  <div class="modal-dialog" style="width: 70%;">\n' +
        '    <div class="modal-content">\n' +
        '      <div class="modal-header" ng-show="title">\n' +
        '        <h4 class="modal-title" ng-bind-html="title"></h4>\n' +
        '      </div>\n' +
        '      <div class="modal-body clearfix">\n' +
        '        <div class="col-md-1"></div>\n' +
        '        <form class="col-md-10 clearfix" action="#" method="post" role="form">\n' +
        '          <input type="hidden" name="type" value="{{content}}">\n' +
        '          <input type="hidden" name="rowId" ng-model="editTask.rowId" value="{{editTask.rowId}}">\n' +
        '          <input type="hidden" name="fuzzyPoNo" ng-model="editTask.fuzzyPoNo" value="{{editTask.fuzzyPoNo}}">\n' +
        '          <input type="hidden" name="poId" ng-model="editTask.poId" value="{{editTask.poId}}">\n' +
        '          <input type="hidden" name="weight" ng-model="editTask.weight" value="{{editTask.weight}}">\n' +
        '          <div class="form-group col-md-12">\n' +
        '            <label for="poNo" class="col-md-3 control-label require_field"><font color="red">*&nbsp;</font>PO# </label>\n' +
        '            <div class="form-group col-md-3">\n' +
        '              <input type="text" class="form-control" name="modifyTask_poNo" id="modifyTask_poNo" ng-model="editTask.poNo" value="{{ editTask.poNo }}" required ng-disabled="editTask.modifyType === \'edit\'" bs-dropdown="editTask.poFuzzySearch | filter:editTask.poNo">\n' +
        '            </div>\n' +
        '            <label for="ComboId" class="col-md-3 control-label require_field"><font color="red">*&nbsp;</font>ComboId </label>\n' +
        '            <div class="form-group col-md-3">\n' +
        '              <!-- <input class="form-control" name="modifyTask_comboList" ng-model="editTask.comboId" value="{{ editTask.comboId }}" required ng-disabled="editTask.modifyType === \'edit\'" bs-dropdown="editTask.comboList"> -->\n' +
        '              <button type="button" class="form-control btn btn-default" name="modifyTask_comboList" ng-model="editTask.comboId" ng-options="task.value as task.label for task in editTask.comboList" required ng-disabled="editTask.modifyType === \'edit\'" bs-select></button>\n' +
        '            </div>\n' +
        '          </div>\n' +
        '\n' +
        '          <div class="form-group col-md-12">\n' +
        '            <label for="productId" class="col-md-3 control-label require_field"><font color="red">*&nbsp;</font>Job# </label>\n' +
        '            <div class="form-group col-md-3">\n' +
        '              <!-- <input type="text" class="form-control" name="modifyTask_productId" id="modifyTask_productId" ng-model="editTask.productId" value="{{  editTask.productId }}" required ng-disabled="editTask.modifyType === \'edit\'" bs-dropdown="editTask.productList"> -->\n' +
        '              <button type="button" class="form-control btn btn-default" name="modifyTask_productId" ng-model="editTask.productId" ng-options="task.value as task.label for task in editTask.productList" ng-disabled="editTask.modifyType === \'edit\'" bs-select></button>\n' +
        '            </div>\n' +
        '            <label for="processId" class="col-md-3 control-label require_field"><font color="red">*&nbsp;</font>Process </label>\n' +
        '            <div class="form-group col-md-3">\n' +
        '              <!-- <input type="text" class="form-control" name="modifyTask_processId" id="modifyTask_processId" ng-model="editTask.processId" value="{{ editTask.processId }}" required ng-disabled="editTask.modifyType === \'edit\'" bs-dropdown="editTask.processList"> -->\n' +
        '              <button type="button" class="form-control btn btn-default" name="modifyTask_processId" ng-model="editTask.processId" ng-options="task.value as task.label for task in editTask.processList" ng-disabled="editTask.modifyType === \'edit\'" bs-select></button>\n' +
        '            </div>\n' +
        '          </div>\n' +
        '\n' +
        '          <div class="form-group col-md-12" ng-if="editTask.modifyType === \'create\'">\n' +
        '            <label for="previousOperation" class="col-md-3 control-label">Previous Task </label>\n' +
        '            <div class="form-group col-md-9">\n' +
        '              <button type="button" class="form-control btn btn-default" name="modifyTask_previousTask" ng-model="editTask.previousTaskId" ng-options="task.value as task.label for task in editTask.previousTask" required bs-select></button>\n' +
        '            </div>\n' +
        '            <label for="nextOperation" class="col-md-3 control-label">Next Task </label>\n' +
        '            <div class="form-group col-md-9">\n' +
        '              <button type="button" class="form-control btn btn-default" name="modifyTask_nextTask" ng-model="editTask.nextTaskId" ng-options="task.value as task.label for task in editTask.nextTask" required bs-select></button>\n' +
        '            </div>\n' +
        '          </div>\n' +
        '\n' +
        '          <div class="form-group col-md-12">\n' +
        '            <label for="processingType" class="col-md-3 control-label require_field"><font color="red">*&nbsp;</font>Processing Type </label>\n' +
        '            <div class="form-group col-md-3">\n' +
        '              <div class="input-group">\n' +
        '                <select class="form-control" name="modifyTask_processingType" ng-model="editTask.processingType" required>\n' +
        '                  <option value="GANG" ng-selected="editTask.processingType === \'GANG\'">Gang</option>\n' +
        '                  <option value="JOB" ng-selected="editTask.processingType === \'JOB\'">Job</option>\n' +
        '                  <option value="JOB_FILE" ng-selected="editTask.processingType === \'JOB_FILE\'">Job File</option>\n' +
        '                </select>\n' +
        '              </div>\n' +
        '            </div>\n' +
        '            <label for="operationCode" class="col-md-3 control-label require_field"><font color="red">*&nbsp;</font>Operation Code </label>\n' +
        '            <div class="form-group col-md-3">\n' +
        '              <input type="text" class="form-control" name="modifyTask_operationCode" ng-model="editTask.operationCode" value="{{ editTask.operationCode }}" required>\n' +
        '            </div>\n' +
        '          </div>\n' +
        '\n' +
        '          <div class="form-group col-md-6">\n' +
        '            <label for="rounds" class="col-md-6 control-label require_field"><font color="red">*&nbsp;</font>Rounds </label>\n' +
        '            <div class="form-group col-md-6">\n' +
        '              <input type="number" class="form-control" name="modifyTask_rounds" ng-model="editTask.rounds" required value="{{ editTask.rounds }}">\n' +
        '            </div>\n' +
        '          </div>\n' +
        '          <div class="form-group col-md-6">\n' +
        '            <label for="priority" class="col-md-6 control-label"><font color="red">*&nbsp;</font>Priority </label>\n' +
        '            <div class="form-group col-md-6">\n' +
        '              <div class="input-group">\n' +
        '                <input type="number" class="form-control" id="priority" name="modifyTask_priority" ng-model="editTask.priority" value="{{ editTask.priority }}" required ><!--User ¨ú®ø¤F priorityªºdisable-->\n' +
        '              </div>\n' +
        '            </div>\n' +
        '          </div>\n' +
        '          <div class="form-group col-md-6">\n' +
        '            <label for="rounds" class="col-md-6 control-label require_field"><font color="red">*&nbsp;</font>Capacity </label>\n' +
        '            <div class="form-group col-md-6">\n' +
        '              <input type="number" class="form-control" name="modifyTask_capacity" ng-model="editTask.capacity" value="{{ editTask.capacity }}">\n' +
        '            </div>\n' +
        '          </div>\n' +
        '          <div class="form-group col-md-6"></div>\n' +
        '\n' +
        '          <hr class="clearfix col-md-12">\n' +
        '\n' +
        '          <div class="form-group col-md-12">\n' +
        '            <label for="pin" class="col-md-2 control-label" title="Pin"><span class="glyphicon glyphicon-pushpin"></span>&nbsp;Pin</label>\n' +
        '            <div class="form-group col-md-2">\n' +
        '              <select class="form-control" name="modifyTask_isPin" id="pin" ng-model="editTask.isPin" required>\n' +
        '                <option value="0" ng-selected="editTask.isPin === \'0\'">N</option>\n' +
        '                <option value="1" ng-selected="editTask.isPin === \'1\'">Y</option>\n' +
        '              </select>\n' +
        '            </div>\n' +
        '            <label for="inProcessing" class="col-md-2 control-label" title="Pending"><span class="glyphicon glyphicon-transfer"></span>&nbsp;Pending</label>\n' +
        '            <div class="form-group col-md-2">\n' +
        '              <select class="form-control" name="modifyTask_inProcessing" id="inProcessing" ng-model="editTask.inProcessing" required>\n' +
        '                <option value="0" ng-selected="editTask.inProcessing === \'0\'">N</option>\n' +
        '                <option value="1" ng-selected="editTask.inProcessing === \'1\'">Y</option>\n' +
        '              </select>\n' +
        '            </div>\n' +
        '            <label for="finished" class="col-md-2 control-label" title="Finish"><span class="glyphicon glyphicon-thumbs-up"></span>&nbsp;Finish</label>\n' +
        '            <div class="form-group col-md-2">\n' +
        '              <select class="form-control" name="modifyTask_isFinished" id="finished" ng-model="editTask.isFinish" required>\n' +
        '                <option value="0" ng-selected="editTask.isFinish === \'0\'">N</option>\n' +
        '                <option value="1" ng-selected="editTask.isFinish === \'1\'">Y</option>\n' +
        '              </select>\n' +
        '            </div>\n' +
        '          </div>\n' +
        '\n' +
        '          <div class="form-group col-md-12">\n' +
        '            <label for="up" class="col-md-2 control-label"><font color="red">*&nbsp;</font>Up </label>\n' +
        '            <div class="form-group col-md-10">\n' +
        '              <div class="input-group">\n' +
        '                <span class="input-group-addon">PDT</span>\n' +
        '                <input type="number" class="form-control" id="up" name="modifyTask_up" ng-model="editTask.up" value="{{ editTask.up }}" placeholder="Up" ng-required="editTask.processingType === \'GANG\'">\n' +
        '                <span class="input-group-addon">SHT</span>\n' +
        '                <input type="number" class="form-control" id="sheetUp" name="modifyTask_sheetUp" ng-model="editTask.sheetUp" value="{{ editTask.sheetUp }}"  placeholder="Sheet Up">\n' +
        '              </div>\n' +
        '            </div>\n' +
        '          </div>\n' +
        '\n' +
        '          <div class="form-group col-md-6">\n' +
        '            <label for="s2sMins" class="col-md-6 control-label"><font color="red">*&nbsp;</font>Start to Start Minutes</label>\n' +
        '            <div class="form-group col-md-6">\n' +
        '              <input type="number" class="form-control" id="s2sMins" name="modifyTask_s2sMins" ng-model="editTask.s2sMins" value="{{ editTask.s2sMins }}">\n' +
        '            </div>\n' +
        '          </div>\n' +
        '          <div class="form-group col-md-6">\n' +
        '            <label for="timeclockEmployeeId" class="col-md-6 control-label">EmployeeId </label>\n' +
        '            <div class="form-group col-md-6">\n' +
        '              <input type="number" class="form-control" id="timeclockEmployeeId" name="modifyTask_timeclockEmployeeId" ng-model="editTask.timeclockEmployeeId" value="{{ editTask.timeclockEmployeeId }}">\n' +
        '            </div>\n' +
        '          </div>\n' +
        '\n' +
        '          <hr class="clearfix col-md-12">\n' +
        '\n' +
        '          <div class="form-group col-md-3">\n' +
        '            <label for="expectedStartTime" class="control-label require_field"><font color="red">*&nbsp;</font>Expect Start </label>\n' +
        '            <div class="form-group">\n' +
        '              <input type="text" class="form-control" size="10" id="expectedStartDate" name="modifyTask_expectedStartDate" placeholder="yyyy/MM/dd" ng-model="editTask.expectedStartTime" value="{{ editTask.expectedStartTime | date: \'yyyy/MM/dd\' }}" data-autoclose="1" data-date-format="yyyy/MM/dd" model-date-format="yyyy/MM/dd" container="body" bs-datepicker>\n' +
        '            </div>\n' +
        '            <div class="form-group">\n' +
        '              <input type="text" class="form-control" size="8" id="expectedStartTime" name="modifyTask_expectedStartTime" placeholder="yyyy/MM/dd" ng-model="editTask.expectedStartTime" value="{{ editTask.expectedStartTime | date: \'HH:mm\' }}" data-autoclose="1" data-time-format="HH:mm" model-time-format="HH:mm" data-minute-step="1" container="body" bs-timepicker>\n' +
        '            </div>\n' +
        '          </div>\n' +
        '          <div class="form-group col-md-3">\n' +
        '            <label for="expectedSetupFinishTime" class="control-label"><font color="red">*&nbsp;</font>Expect Setup Finish </label>\n' +
        '            <div class="form-group">\n' +
        '              <input type="text" class="form-control" size="10" id="expectedSetupFinishDate" name="modifyTask_expectedSetupFinishDate" placeholder="YYYY/MM/DD" ng-model="editTask.expectedSetupFinishTime" value="{{ editTask.expectedSetupFinishTime | date: \'yyyy/MM/dd\' }}" ng-required="editTask.inProcessing === true || editTask.isPin === true" data-autoclose="1" data-date-format="yyyy/MM/dd" model-date-format="yyyy/MM/dd" container="body" bs-datepicker>\n' +
        '            </div>\n' +
        '            <div class="form-group">\n' +
        '              <input type="text" class="form-control" size="8" id="expectedSetupFinishTime" name="modifyTask_expectedSetupFinishTime" placeholder="HH:mm" ng-model="editTask.expectedSetupFinishTime" value="{{ editTask.expectedSetupFinishTime | date: \'HH:mm\' }}" ng-required="editTask.inProcessing === true || editTask.isPin === true" data-autoclose="1" data-time-format="HH:mm" model-time-format="HH:mm" data-minute-step="1" container="body" bs-timepicker>\n' +
        '            </div>\n' +
        '          </div>\n' +
        '\n' +
        '          <div class="form-group col-md-3">\n' +
        '            <label for="expectedFinishTime" class="control-label require_field"><font color="red">*&nbsp;</font>Expect Production Finish </label>\n' +
        '            <div class="form-group">\n' +
        '              <input type="text" class="form-control" size="10" id="expectedFinishDate" name="modifyTask_expectedFinishDate" placeholder="YYYY/MM/DD" ng-model="editTask.expectedFinishTime" value="{{ editTask.expectedFinishTime | date: \'yyyy/MM/dd\' }}" ng-required="editTask.inProcessing === true || editTask.isPin === true" data-autoclose="1" data-date-format="yyyy/MM/dd" model-date-format="yyyy/MM/dd" container="body" bs-datepicker>\n' +
        '            </div>\n' +
        '            <div class="form-group">\n' +
        '              <input type="text" class="form-control" size="8" id="expectedFinishTime" name="modifyTask_expectedFinishTime" placeholder="HH:mm" ng-model="editTask.expectedFinishTime" value="{{ editTask.expectedFinishTime | date: \'HH:mm\' }}" ng-required="editTask.inProcessing === true || editTask.isPin === true" data-autoclose="1" data-time-format="HH:mm" model-time-format="HH:mm" data-minute-step="1" container="body" bs-timepicker>\n' +
        '            </div>\n' +
        '          </div>\n' +
        '          <div class="form-group col-md-3">\n' +
        '            <label for="quantity" class="control-label"><font color="red">*&nbsp;</font>Expect Quantity </label>\n' +
        '            <div class="form-group">\n' +
        '              <input type="number" class="form-control" id="quantity" name="modifyTask_quantity" placeholder="Expect Quantity"\n' +
        '                 ng-model="editTask.quantity" value="{{ editTask.quantity }}" ng-required="editTask.inProcessing === true || editTask.isPin === true">\n' +
        '            </div>\n' +
        '          </div>\n' +
        '\n' +
        '          <hr class="clearfix col-md-12">\n' +
        '\n' +
        '          <div class="form-group col-md-3">\n' +
        '            <label for="actualStartTime" class="control-label">Actual Start </label>\n' +
        '            <div class="form-group">\n' +
        '              <input type="text" class="form-control" size="10" id="actualStartDate" name="modifyTask_actualStartDate" ng-model="editTask.actualStartTime" placeholder="YYYY/MM/DD" value="{{ editTask.actualStartTime | date: \'yyyy/MM/dd\' }}" ng-required="editTask.inProcessing === true" data-autoclose="1" data-date-format="yyyy/MM/dd" model-date-format="yyyy/MM/dd" container="body" placement="top-left" bs-datepicker>\n' +
        '            </div>\n' +
        '            <div class="form-group">\n' +
        '              <input type="text" class="form-control" size="8" id="actualStartTime" name="modifyTask_actualStartTime" ng-model="editTask.actualStartTime" placeholder="HH:mm" value="{{ editTask.actualStartTime | date: \'HH:mm\' }}" ng-required="editTask.inProcessing === true" data-autoclose="1" data-time-format="HH:mm" model-time-format="HH:mm" data-minute-step="1" container="body" placement="top-left" bs-timepicker>\n' +
        '            </div>\n' +
        '          </div>\n' +
        '          <div class="form-group col-md-3">\n' +
        '            <label for="actualSetupFinishTime" class="control-label">Actual Setup Finish </label>\n' +
        '            <div class="form-group">\n' +
        '              <input type="text" class="form-control" size="10" id="actualSetupFinishDate" name="modifyTask_actualSetupFinishDate" ng-model="editTask.actualSetupFinishTime" placeholder="YYYY/MM/DD" value="{{ editTask.actualSetupFinishTime | date: \'yyyy/MM/dd\' }}" ng-required="editTask.inProcessing === true" data-autoclose="1" data-date-format="yyyy/MM/dd" model-date-format="yyyy/MM/dd" container="body" placement="top-left" bs-datepicker>\n' +
        '            </div>\n' +
        '            <div class="form-group">\n' +
        '              <input type="text" class="form-control" size="8" id="actualSetupFinishTime" name="modifyTask_actualSetupFinishTime" ng-model="editTask.actualSetupFinishTime" placeholder="HH:mm" value="{{ editTask.actualSetupFinishTime | date: \'HH:mm\' }}" ng-required="editTask.inProcessing === true" data-autoclose="1" data-time-format="HH:mm" model-time-format="HH:mm" data-minute-step="1" container="body" placement="top-left" bs-timepicker>\n' +
        '            </div>\n' +
        '          </div>\n' +
        '\n' +
        '          <div class="form-group col-md-3">\n' +
        '            <label for="actualFinishTime" class="control-label">Actual Production Finish </label>\n' +
        '            <div class="form-group">\n' +
        '              <input type="text" class="form-control" size="10" id="actualFinishDate" name="modifyTask_actualFinishDate" ng-model="editTask.actualFinishTime" placeholder="YYYY/MM/DD" value="{{ editTask.actualFinishTime | date: \'yyyy/MM/dd\' }}" ng-required="editTask.inProcessing === true" data-autoclose="1" data-date-format="yyyy/MM/dd" model-date-format="yyyy/MM/dd" container="body" placement="top-left" bs-datepicker>\n' +
        '            </div>\n' +
        '            <div class="form-group">\n' +
        '              <input type="text" class="form-control" size="8" id="actualFinishTime" name="modifyTask_actualFinishTime" ng-model="editTask.actualFinishTime" placeholder="HH:mm" value="{{ editTask.actualFinishTime | date: \'HH:mm\' }}" ng-required="editTask.inProcessing === true" data-autoclose="1" data-time-format="HH:mm" model-time-format="HH:mm" data-minute-step="1" container="body" placement="top-left" bs-timepicker>\n' +
        '            </div>\n' +
        '          </div>\n' +
        '          <div class="form-group col-md-3">\n' +
        '            <label for="actualQuantity" class="control-label">Actual Quantity </label>\n' +
        '            <div class="form-group">\n' +
        '              <input type="number" class="form-control" id="actualQuantity" name="modifyTask_actualQuantity" placeholder="Actual Quantity"\n' +
        '                 ng-model="editTask.actualQuantity" value="{{ editTask.actualQuantity }}" ng-required="editTask.inProcessing === true">\n' +
        '            </div>\n' +
        '          </div>\n' +
        '        </form>\n' +
        '        <div class="col-md-1"></div>\n' +
        '      </div>\n' +
        '      <div class="modal-footer">\n' +
        '        <div class="col-md-12" id="gantt-editor-alert"></div>\n' +
        '        <button type="button" class="btn btn-default" ng-click="closeTaskEditor()">Close</button>\n' +
        '        <button type="button" class="btn btn-primary" ng-click="checkTaskData()">Save changes</button>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</div>');
    $templateCache.put('../app/views/machine.tpl.html',
        '<div class="modal" id="machineTasks" tabindex="-1" role="dialog">\n' +
        '  <div class="modal-dialog" style="width: 90%;">\n' +
        '    <div class="modal-content">\n' +
        '      <div class="modal-header" ng-show="title">\n' +
        '        <button type="button" class="close" ng-click="$hide()">&times;</button>\n' +
        '        <h4 class="modal-title" ng-bind-html="title"></h4>\n' +
        '      </div>\n' +
        '      <div class="modal-body clearfix">\n' +
        '      	<div class="machine" ng-style="autoExpand">\n' +
        '	      	<div class="header">\n' +
        '	  			<span class="column pin">Pin</span>\n' +
        '          <span class="column weight">Weight</span>\n' +
        '	  			<span class="column data" ng-repeat="title in row.model.title track by $index">\n' +
        '            <span ng-bind-html="renderHtml(title)"></span>\n' +
        '          </span>\n' +
        '	  			<span class="column from">From</span>\n' +
        '	  			<span class="column to">To</span>\n' +
        '	  			<span class="column during">Duration</span>\n' +
        '	  		</div>\n' +
        '	  	</div>\n' +
        '      	<div class="machine" ng-style="autoExpand" ng-model="row.tasks">\n' +
        '      		<div class="tasks" ng-repeat="task in row.tasks track by $index">\n' +
        '      			<div class="task" ng-style="taskColoured(task.model.color, task.model.textColor)">\n' +
        '	      			<span class="column pin"><a class="btn {{ task.model.pin === true && \'btn-warning\' || \'btn-default\' }} pin" ng-model="task.model.pin" ng-disabled="readOnly()" bs-checkbox><i class="fa {{ task.model.pin === true && \'fa-check\' || \'fa-close\' }}"></i></a></span>\n' +
        '              <span class="column weight"><input type="number" class="form-control" value="{{task.model.weight}}" style="width:90%;" ng-model="task.model.weight" ng-disabled="readOnly()" ng-blur="reSortingTasks()"></span>\n' +
        '	      			<span class="column data" ng-repeat="data in task.model.tooltip track by $index">\n' +
        '                <span ng-bind-html="renderHtml(data)"></span>\n' +
        '              </span>\n' +
        '    					<span class="column from">{{ task.model.from.format("YYYY/MM/DD HH:mm") }}</span>\n' +
        '    					<span class="column to">{{ task.model.to.format("YYYY/MM/DD HH:mm") }}</span>\n' +
        '    					<span class="column during">{{ ((task.model.to - task.model.from) / 60 / 1000).toFixed(0) }}</span>\n' +
        '    				</div>\n' +
        '      		</div>\n' +
        '      	</div>\n' +
        '      </div>\n' +
        '      <div class="modal-footer">\n' +
        '        <button type="button" class="btn btn-default" ng-click="$hide()">Close</button>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</div>');
    $templateCache.put('../app/views/moreInformation.tpl.html',
        '<div class="modal" id="machineTasks" tabindex="-1" role="dialog">\n' +
        '  <div class="modal-dialog" style="width: 90%;">\n' +
        '    <div class="modal-content">\n' +
        '      <div class="modal-header" ng-show="title">\n' +
        '        <button type="button" class="close" ng-click="$hide()">&times;</button>\n' +
        '        <h4 class="modal-title" ng-bind-html="title"></h4>\n' +
        '      </div>\n' +
        '      <div class="modal-body" ng-bind-html="content"></div>\n' +
        '      <div class="modal-footer">\n' +
        '        <button type="button" class="btn btn-default" ng-click="$hide()">Close</button>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</div>');
    $templateCache.put('../app/views/processing.tpl.html',
        '<div class="modal" id="machineTasks" tabindex="-1" role="dialog">\n' +
        '  <div class="modal-dialog">\n' +
        '    <div class="modal-content">\n' +
        '      <div class="modal-header" ng-show="title">\n' +
        '        <h4 class="modal-title" ng-bind-html="title"></h4>\n' +
        '      </div>\n' +
        '      <div class="modal-body clearfix">\n' +
        '        <p ng-bind-html="content"></p>\n' +
        '      </div>\n' +
        '      <div class="modal-footer">\n' +
        '      </div>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</div>');
    $templateCache.put('../app/views/rowContextMenu.tpl.html',
        '<ul class="dropdown-menu" role="menu">\n' +
        '    <li>\n' +
        '        <a class="pointer" role="menuitem" tabindex="1" ng-click="row.createTask(row, $event)">Create</a>\n' +
        '    </li>\n' +
        '    <li>\n' +
        '        <a class="pointer" role="menuitem" tabindex="2" ng-click="row.zoomIn(row, $event)">Zoom In</a>\n' +
        '    </li>\n' +
        '    <li>\n' +
        '        <a class="pointer" role="menuitem" tabindex="3" ng-click="row.zoomOut(row, $event)">Zoom Out</a>\n' +
        '    </li>\n' +
        '</ul>');
    $templateCache.put('../app/views/taskContent.tpl.html',
        '<span>{{task.model.name | trimLeadingZero}}</span>');
    $templateCache.put('../app/views/taskContextMenu.tpl.html',
        '<ul class="dropdown-menu" role="menu">\n' +
        '    <li>\n' +
        '        <a class="pointer" role="menuitem" tabindex="1" ng-click="task.switchPin(task, $event)">{{ task.model.pin === true && \'Pined\' || \'Pin\' }}</a>\n' +
        '    </li>\n' +
        '    <li>\n' +
        '        <a class="pointer" role="menuitem" tabindex="2" ng-click="task.editTask(task, $event)">Edit</a>\n' +
        '    </li>\n' +
        '    <li>\n' +
        '        <a class="pointer" role="menuitem" tabindex="3" ng-click="task.createTask(task, $event)">Create</a>\n' +
        '    </li>\n' +
        '    <li>\n' +
        '        <a class="pointer" role="menuitem" tabindex="4" ng-click="task.zoomIn(task, $event)">Zoom In</a>\n' +
        '    </li>\n' +
        '    <li>\n' +
        '        <a class="pointer" role="menuitem" tabindex="5" ng-click="task.zoomOut(task, $event)">Zoom Out</a>\n' +
        '    </li>\n' +
        '    <li>\n' +
        '        <a class="pointer" role="menuitem" tabindex="6" ng-click="task.moreInformation(task, $event)">More Information</a>\n' +
        '    </li>\n' +
        '    <li><div class="divider"></div></li>\n' +
        '    <li>\n' +
        '        <a class="pointer" role="menuitem" tabindex="6" ng-click="task.deleteTask(task, $event)">Delete</a>\n' +
        '    </li>\n' +
        '</ul>');
    $templateCache.put('../app/views/taskTooltip.tpl.html',
        '<div class="row">\n' +
        '	<div class="col-md-3">\n' +
        '		<span ng-if="task.model.taskGroupIdsVo.length && task.model.taskGroupIdsVo.length > 1">\n' +
        '			<span ng-repeat="item in task.model.taskGroupIdsVo">\n' +
        '				<strong>Po#</strong>: {{item.split(\'_\')[1].split(\'&\')[3]}} <strong>Combo#</strong>: {{item.split(\'_\')[1].split(\'&\')[1]}}</br>\n' +
        '			</span>\n' +
        '		</span>\n' +
        '		<span ng-if="!task.model.taskGroupIdsVo.length || task.model.taskGroupIdsVo.length <= 1">\n' +
        '			<strong>Po#</strong>: {{task.model.job.poNo}} <strong>Combo</strong>: {{task.model.job.comboId}}</br>\n' +
        '		</span>\n' +
        '	</div>\n' +
        '	<div class="col-md-3">\n' +
        '		<strong>Operaction Code</strong>: {{task.model.operationCode | trimLeadingZero}}\n' +
        '	</div>\n' +
        '	<div class="col-md-3">\n' +
        '		<strong>Processing Type</strong>: {{task.model.processingType}}\n' +
        '	</div>\n' +
        '	<div class="col-md-3">\n' +
        '		<strong>Round-Part</strong>: {{task.model.rounds}} - {{task.model.part}}\n' +
        '	</div>\n' +
        '	<div class="col-md-3">\n' +
        '		<strong>Priority</strong>: {{task.model.priority}}\n' +
        '	</div>\n' +
        '	<div class="col-md-3">\n' +
        '		<strong>QTY</strong>: {{task.model.quantity}}\n' +
        '	</div>\n' +
        '	<div class="col-md-3">\n' +
        '		<small>\n' +
        '    		{{task.isMilestone() === true && (task.model.from.format(\'MMM DD, HH:mm\')) || (task.model.from.format(\'MMM DD, HH:mm\') + \' - \' + task.model.to.format(\'MMM DD, HH:mm\'))}} ({{((task.model.to - task.model.from) / 1000 / 3600).toFixed(2)}} hrs)\n' +
        '    	</small>\n' +
        '	</div>\n' +
        '	<div class="col-md-3">\n' +
        '		<span class="tooltip-icon" ng-if="task.model.pin"><i class="glyphicon glyphicon-pushpin"></i>&nbsp;Pined</span>\n' +
        '		<span class="tooltip-icon" ng-if="task.model.inProcessing"><i class="glyphicon glyphicon-transfer"></i>&nbsp;Pending</span>\n' +
        '		<span class="tooltip-icon" ng-if="task.model.finished"><i class="glyphicon glyphicon-thumbs-up"></i>&nbsp;Finished</span>\n' +
        '		<span class="tooltip-icon" ng-if="task.model.taskGroupIdsVo.length && task.model.taskGroupIdsVo.length > 1"><i class="glyphicon glyphicon-exclamation-sign"></i>&nbsp;Grouped</span>\n' +
        '	</div>\n' +
        '</div>');
}]);
