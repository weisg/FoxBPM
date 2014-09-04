var pagefunction = function() {
	var runningTrackTable = $('#datatable_col_reorder')
			.DataTable(
					{
						columns : [
								{
									data : 'subject'
								},
								{
									data : 'startTime'
								},
								{
									"orderable" : false,
									"data" : 'instanceStatus',
									"defaultContent" : "-"
								},
								{
									data : 'initiator'
								},
								{
									"orderable" : false,
									"data" : 'processLocation',
									"defaultContent" : "-"
								},
								{
									"orderable" : false,
									"data" : null,
									"defaultContent" : ""//"<a href='javascript:void(0);' class='btn btn-danger'>查看</a> "
								} ],
						columnDefs : [ 
								{
									"targets" : [ 2 ],
									"orderable" : true,
									"createdCell" : function(td, cellData,
											rowData, row, col) {
										if (rowData.endTime == null) {
											$(td)
													.html(
															"<span class='label label-default'>激活</span>");
											if (rowData.isSuspended == 'true') {
												$(td)
														.html(
																"<span class='label label-default'>暂停</span>");
											}
											if (rowData.assignee == null) {
												$(td)
														.html(
																"<span class='label label-default'>未领取</span>");
											}

										} else {
											$(td)
													.html(
															"<span class='label label-default'>完成</span>");
										}

									}
								},
								{
									"targets" : [ 3 ],
									"orderable" : true,
									"createdCell" : function(td, cellData,
											rowData, row, col) {
										if (cellData != "") {
											$(td)
													.html(
															"<img width='20' height='20' class='online' src='/foxbpm-webapps-common/service/identity/users/"
																	+ cellData
																	+ "/picture'/> ("
																	+ cellData
																	+ ")");

										}
									}
								} ],

						"processing" : true,
						"orderable" : true,
						"serverSide" : true,
						"ajax" : "/foxbpm-webapps-common/service/runtime/process-instances",
						"sDom" : "<'dt-toolbar'<'col-sm-6 col-xs-12 hidden-xs'f><'col-sm-6 col-xs-12 hidden-xs'>C>"
								+ "t"
								+ "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-sm-6 col-xs-12'p l>>",
						"autoWidth" : true,
						"colVis" : {
							"buttonText" : "选择展示的列",
							"restore" : "恢复默认展示",
							"showAll" : "展示所有列",
							"showNone" : "不展示列",
							"groups" : [ {
								title : "领到查看",
								columns : [ 0, 3, 4 ]
							} ]
						},
						"oLanguage" : {
							"sProcessing" : "正在加载中......",
							"sZeroRecords" : "对不起，查询不到相关数据！",
							"sEmptyTable" : "表中无数据存在！",
							"sInfo" : "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
							"sInfoFiltered" : "数据表中共为 _MAX_ 条记录",
							"sSearch" : "搜索",
							"oPaginate" : {
								"sFirst" : "首页",
								"sPrevious" : "上一页",
								"sNext" : "下一页",
								"sLast" : "末页"
							},
							"sSearch": "<form>任务主题：_INPUT_ &nbsp;&nbsp;任务发起人：<input id='INITIATOR_SEARCH' type='text' class='form-control' value='' style='width:15%' />" +
                    		"&nbsp;&nbsp;任务状态：<select id='TASKSTATE_SEARCH' class='form-control'><option value='0'>未领取</option><option value='1'>领取</option><option value='2' selected>所有</option></select> " +
                    		"&nbsp;&nbsp; 创建：<input id='createtime_start_dateselect_filter' type='text'  class='form-control datepicker' data-dateformat='yy-mm-dd' style='width:10%'>" +
                    		"<label for='createtime_start_dateselect_filter' class='glyphicon glyphicon-calendar no-margin padding-top-15' rel='tooltip' title='' style='left:-207px;top:-5px'></label>" +
                    		" - " +
                    		"<input id='createtime_end_dateselect_filter' type='text' value='' class='form-control datepicker' data-dateformat='yy-mm-dd' style='width:10%'>"+
                    		"<label for='createtime_end_dateselect_filter' class='glyphicon glyphicon-calendar no-margin padding-top-15' rel='tooltip' title=''  style='left:-80px;top:-5px'></label> " +
                    		"<div style='padding-top:3px'>" +
                    		"&nbsp;<a class='btn btn-primary' style='height: 30px; disabled: true;' onclick='searchTodoTask();' href='javascript:void(0);'>搜索</a>&nbsp;&nbsp;<a class='btn btn-primary' style='height: 30px; disabled: true;' href='javascript:void(0);'>重置</a></div></form>"
						},
						"bStateSave" : false,
						"bAutoWidth" : true,
						"sPaginationType" : 'full_numbers',
						"drawCallback":function(){
							//调整页面布局
							$("#datatable_col_reorder_length").css("padding-right","10px");
							$(".dt-toolbar").css("padding-bottom","6px");
							$("#datatable_col_reorder_filter").css("width","1000px");
							 
							pageSetUp();		
						}

					});
     searchTodoTask = function() {
    	var baseUrl = "/foxbpm-webapps-common/service/runtime/process-instances?";
    	var assigneed = $("#TASKSTATE_SEARCH").val();
    	var subjectLike =  $("[type='search']").val();
    	baseUrl = baseUrl + "assigneed="+assigneed;
    	if(subjectLike != ""){
    		baseUrl = baseUrl + "&subjectLike="+ subjectLike;
    	}
     	var initiator = $("#INITIATOR_SEARCH").val();
     	if(initiator != ""){
     		baseUrl = baseUrl + "&initiator="+ initiator;
     	}
    	 
	    //创建
	    var  createTimeB =  $("#createtime_start_dateselect_filter").val();
	    if(createTimeB != ""){
	    	baseUrl = baseUrl + "&createTimeB="+ createTimeB;
	    }
	    var createTimeE = $("#createtime_end_dateselect_filter").val();
	    if(createTimeE != "")
	    {
	    	baseUrl = baseUrl + "&createTimeE="+ createTimeE;
	    }
     	
	    runningTrackTable.ajax.url(baseUrl).load();
     };
};
