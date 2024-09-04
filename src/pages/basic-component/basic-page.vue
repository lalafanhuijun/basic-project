<!--
 * @Author: fanhuijun fanhuijun
 * @Date: 2024-08-16 15:30:44
 * @LastEditors: fanhuijun fanhuijun
 * @LastEditTime: 2024-09-03 18:57:06
 * @FilePath: /basic-project/src/pages/basic-component/basic-page.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div class="h100">
		<basic-page
			v-if="isShow && !isEdit"
			ref="demoPage"
			:searchForm="searchForm"
			:searchCustomForm="searchCustomForm"
			:searchData="searchData"
			tableText="线索列表"
			:buttonList="buttonList"
			:headData="headData"
			:tableData="tableData"
			:total="total"
			:tableOption="tableOption"
			:cellStyle="cellStyle"
			:cellClassName="cellClassName"
			:selectionShow="true"
			:paginationShow="true"
			:showSummary="false"
			@getTableList="getTableList"
			@operateClick="operateClick"
			@handleRowClick="handleRowClick"
			@handleSelectionChange="handleSelectionChange"
			@customClick="customClick"
			@handleOperation="handleOperation"
		>
			<div slot="footer">底部slot</div>
			<el-input
				slot="operUrl"
				style="min-width: 400px"
				v-model="searchData.operUrl"
			></el-input>
			<template #consNameSlot="{ row, column, index }">
				<div>内容slot</div>
			</template>
			<el-table-column slot="column" prop="name" label="姓名" width="180">
			</el-table-column>
			<el-breadcrumb separator="/" slot="subhead" class="subhead-breadcrumb">
				<el-breadcrumb-item :to="{ path: '/' }">首页slot</el-breadcrumb-item>
				<el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
				<el-breadcrumb-item>活动列表</el-breadcrumb-item>
				<el-breadcrumb-item>活动详情</el-breadcrumb-item>
			</el-breadcrumb>
			<div slot="headproOrgName">
				标题slot <i class="iconfont iconjieshi greenTxt"></i>
			</div>
		</basic-page>
	</div>
</template>

<script>
import { getTableList } from "@/api/basic-component";
export default {
	data() {
		return {
			isShow: true,
			isEdit: false,
			//查询条件默认绑定数据对象（key值与查询条件项prop保持一致）
			searchData: {
				orgNo: null,
				consNo: "",
				consName: "",
				consType: null,
				barCode: "",
				sumOrder: null,
				barCode: "",
				tgNo: "",
				tgName: "",
				hyid: "A000",
				lineLossStart: 0,
				lineLossEnd: 0,
				awardTime: null,
				awardTime1: "",
				awardTime2: ["2022-07-11", "2022-07-18"],
				awardtime3: [
					new Date().getFullYear() + "-" + new Date().getMonth(),
					new Date().getFullYear() + "-" + new Date().getMonth(),
				],
				operUrl: "",
			},
			//查询条件项（prop值不需要自定义字段，与后端接口字段保持一致）
			searchForm: [
				{
					type: "treeSelect",
					label: "供电单位",
					prop: "orgNo",
					searchable: true,
				},
				{
					type: "treeSelect",
					label: "行业",
					prop: "hyid",
					searchable: true,
				},
				{
					type: "input",
					label: "用户编号",
					prop: "consNo",
				},
				{ type: "input", label: "用户名称", prop: "consName" },
				{
					type: "select",
					label: "用户类型",
					prop: "consType",
					options: [{ name: "全部", value: "1" }],
				},
				{ type: "input", label: "电能表资产编号", prop: "barCode" },
				{
					type: "select",
					label: "历史是否窃电",
					prop: "orderType",
					options: [{ name: "全部", value: "1" }],
				},
				{ type: "inputn", label: "台区编号", prop: "tgNo" },
				{ type: "input", label: "台区名称", prop: "tgName" },
				{
					type: "inputNumber",
					label: "线损率",
					prop: "loss",
					start: "lineLossStart",
					end: "lineLossEnd",
					min: -100,
					max: 100,
					precision: "0",
					inputType: "percent",
				},
				//查询方式年、月前切换
				{
					type: "radioDatePicker",
					label: "查询方式",
					prop: "awardTime",
					searchType: "year",
					rodioOptions: [
						{ label: "year", name: "年" },
						{ label: "month", name: "月" },
					],
				},
				{ type: "daterange", label: "查询时间", prop: "awardTime2" },
				{
					type: "datetimerange",
					label: "查询时间",
					prop: "awardTime1",
					valueFormat: "yyyy-MM-dd",
				},
				{
					type: "monthrange",
					label: "查询月份",
					prop: "awardtime3",
					valueFormat: "yyyy-MM",
				},
			],
			//自定义查询项，通过插槽实现
			searchCustomForm: [
				{ label: "操作slot", prop: "operUrl", slotName: "operUrl" },
			],
			tableText: "线索列表",
			buttonList: [
				{
					method: "click1",
					label: "设为关注",
					icon: "iconyusuanqiediandianliang",
				},
				{ method: "click2", label: "生成工单", icon: "iconscgd_def" },
			],
			headData: [
				//异常用户表头信息
				{
					prop: "proOrgName",
					label: "市",
					width: "200",
					slotHeader: true,
				},
				{
					prop: "porgName",
					label: "区/县",
				},
				{
					prop: "orgName",
					label: "供电单位",
				},
				{
					prop: "consNo",
					label: "用户编号",
					custom: true, //表格列自定义事件
					sortable: true,
					sortChange: (column, prop, order) => {},
				},
				{
					prop: "consName",
					label: "用户名称",
				},
				{
					prop: "consNameSlot",
					label: "用户名称Slot",
					slot: true,
				},
				{
					prop: "consType",
					label: "用户类型",
					formatProp: "USER_TYPE_CODE",
					formatter: (row, column) => {},
				},
				{
					prop: "dataSource",
					label: "线索来源",
					custom: true, //表格列自定义事件
					customCode: ["02"], //根据状态判断单元格是否可点击
					//handel可自定义表格单元格内容，当表格实际值于显示值固定时可采用handel
					handle: [
						{ key: "01", value: "模型预警" },
						{ key: "02", value: "现场发起" },
						{ key: "03", value: "95598" },
						{ key: "04", value: "外部转派" },
						{ key: "05", value: "其他专业移交" },
						{ key: "06", value: "专项任务" },
						{ key: "07", value: "其他线索" },
					],
					//formatter可自定义表格单元格内容方法，可自定义方法进行format，如果是用户类型、线索来源等列显示值是从接口获取，可传formatProp为标准代码全局变量对应key值
					formatProp: "DATA_SOURCE",
					formatter: this.formatter,
				},
				{
					prop: "barCode",
					label: "电能表资产编号",
				},
				{
					prop: "tgNo",
					label: "台区编号",
				},
			],
			//表格数据
			tableData: [],
			total: 0,
			tableOption: [
				//子任务操作列
				{
					label: "操作",
					width: "100",
					options: [
						{ label: "详情", type: "text", methods: "click55" },
						{
							label: "详情",
							type: "text",
							methods: "click44",
							disabled: true,
						},
					],
				},
				{
					label: "操作1",
					width: "100",
					status: "dataSource", //根据返回字段判断每行操作列显示不同的操作按钮，statusCode传对应值，多状态控制按钮，不传status则操作按钮默认全部显示
					options: [
						{
							label: "新增",
							type: "text",
							methods: "click11",
							statusCode: ["01", "02"],
						},
						{
							label: "删除",
							type: "text",
							methods: "click22",
							statusCode: ["02"],
							disabled: true,
						},
					],
				},
				{
					label: "诊断报告",
					width: "100",
					status: "consType", //是否显示操作列按钮显示字段，如果当前行存在consType值则显示按钮，否则不显示如不传参数status，则默认操作列按钮全部显示
					options: [
						{
							label: "详情",
							type: "text",
							methods: "click33",
							style: "color: red",
						},
					],
				},
			],
			//自定义单元格样式
			cellStyle: (row, column, rowIndex, columnIndex) => {
				if (rowIndex === 0 && columnIndex === 4) {
					return "color: red !important";
				} else {
					return "textAlign: center;";
				}
			},
			cellClassName: (row, column, rowIndex, columnIndex) => {
				if (rowIndex === 0 && columnIndex === 4) {
					return "user-cell";
				}
			},
		};
	},
	methods: {
		//获取表格数据
		getTableList(params, callback) {
			getTableList(params)
				.then((res) => {
					//返回接口请求回数据
					callback(res);
				})
				.catch((err) => {});
		},
		//操作区按钮点击事件
		operateClick(method) {
			this.$refs.demoPage.selectData; //表格选择数据
			if (method === "click1") {
				// this.isEdit = true;
				this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				})
					.then(() => {
						this.isEdit = true;
						this.$message({
							type: "success",
							message: "删除成功!",
						});
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消删除",
						});
					});
			} else if (method === "click2") {
				this.dialogVisible = true;
			}
			console.log("---操作区按钮点击事件");
		},
		//行点击事件
		handleRowClick(row, column, event) {
			console.log("---行点击事件");
		},
		//复选框触发事件
		handleSelectionChange(val) {
			console.log("----选中数据：", val);
		},
		//自定义列点击事件触发
		customClick(prop, index, row) {
			console.log("---自定义列点击事件触发");
		},
		//操作列事件触发
		handleOperation(methods, row) {
			console.log("---操作列事件触发");
		},
		//列formtter方法
		formatter(row, column) {
			let data = this.codeData[column.formatProp];
			for (let i = 0; i < data.length; i++) {
				if (data[i].value == row[column.prop]) {
					return data[i].name;
				}
			}
		},
	},
};
</script>

<style></style>
