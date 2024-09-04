<!--
 * @Author: fanhuijun fanhuijun
 * @Date: 2024-08-16 15:28:50
 * @LastEditors: fanhuijun fanhuijun
 * @LastEditTime: 2024-08-17 14:32:50
 * @FilePath: /basic-project/src/pages/basic-component/basic-table.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div class="pad24">
		<basic-table
			ref="commonTable"
			class="common-table"
			:class="{ active: !isOperateShow }"
			:tableData="tableData"
			:headData="headData"
			:stripe="stripe"
			:selectionShow="selectionShow"
			:highlightCurrentRow="highlightCurrentRow"
			:tableOption="tableOption"
			:paginationShow="paginationShow"
			:pageSizes="pageSizes"
			:total="total"
			:cellClassName="cellClassName"
			:headerCellClassName="headerCellClassName"
			:cellStyle="cellStyle"
			:headerCellStyle="headerCellStyle"
			:showSummary="showSummary"
			:sumText="sumText"
			:summaryMethod="summaryMethod"
			:arraySpanMethod="arraySpanMethod"
			@handleTableCurrentChange="handleTableCurrentChange"
			@handleSelectionChange="handleSelectionChange"
			@handleRowClick="handleRowClick"
			@handleSortChange="handleSortChange"
			@customClick="customClick"
			@handleOperation="handleOperation"
			@handleSizeChange="handleSizeChange"
			@handleCurrentChange="handleCurrentChange"
		>
			<!-- 表格上方区域自定义内容 -->
			<slot name="subhead" slot="subhead"></slot>
			<!-- 单元格自定义插槽 -->
			<template v-for="item in headData" :slot="`head${item.prop}`">
				<slot :name="`head${item.prop}`"></slot>
				<span>自定义表头插槽</span>
			</template>
			<!-- 单元格自定义插槽 -->
			<template v-for="item in headData" #[item.prop]="{ row, column, index }">
				<span>自定义单元格插槽</span>
			</template>
			<!-- 自定义列插槽 -->
			<slot name="column" slot="column"></slot>
			<!-- 分页左下角插槽 -->
			<slot name="footer" slot="footer"></slot>
		</basic-table>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isOperateShow: true, //是否显示列表按钮事件
			stripe: true, //是否为斑马纹 table
			selectionShow: false, //是否显示复选框
			highlightCurrentRow: true, ////是否高亮当前行
			paginationShow: true, //是否显示分页
			pageSizes: [10, 20, 30, 40], //每页显示个数选择器的选项设置
			showSummary: false, //是否在表尾显示合计行
			sumText: "合计",
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
			tableData: [
				{ proOrgName: "测试" },
				{ proOrgName: "测试" },
				{ proOrgName: "测试" },
				{ proOrgName: "测试" },
			],
			total: 0,
			tableOption: [
				//子任务操作列
				{
					label: "操作",
					width: "100",
					options: [
						{ label: "详情", type: "text", methods: "click55" },
						{ label: "详情", type: "text", methods: "click44", disabled: true },
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
		};
	},
	methods: {
		//单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className
		cellClassName(row, column, rowIndex, columnIndex) {
			// return 'textAlign: center';
		},
		//表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。
		headerCellClassName(row, column, rowIndex, columnIndex) {
			// return 'textAlign: center';
		},
		//表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。
		headerCellStyle(row, column, rowIndex, columnIndex) {
			return "textAlign: center";
		},
		//单元格的 style 的回调方法
		cellStyle(row, column, rowIndex, columnIndex) {
			// return 'textAlign: left';
		},
		//行选中事件
		handleTableCurrentChange(val) {
			this.currentRow = val;
			this.$emit("handleTableCurrentChange", val);
		},
		//复选框触发事件
		handleSelectionChange(val) {
			this.selectData = val;
			this.$emit("handleSelectionChange", val);
		},
		//当某一行被点击时会触发该事件
		handleRowClick(row, column, event) {
			this.$emit("handleRowClick", row, column, event);
		},
		handleSortChange(column, prop, order) {
			this.$emit("handleSortChange", column, prop, order);
		},
		//自定义列点击事件触发
		customClick(prop, index, row) {
			this.$emit("customClick", prop, index, row);
			// this.$emit(prop, index, row);
		},
		//操作列事件触发
		handleOperation(methods, row) {
			this.$emit("handleOperation", methods, row);
			// this.$emit(methods, row);
		},
		//pageSize 改变时会触发
		handleSizeChange(val) {
			this.pageSize = val;
			this.pageIndex = 1;
			this.$emit("getTableList");
			this.$emit("handleSizeChange", val);
		},
		//currentPage 改变时会触发
		handleCurrentChange(val) {
			this.pageIndex = val;
			this.$emit("getTableList");
			this.$emit("handleCurrentChange", val);
		},
		/**
		 * 自定义合计
		 * @param {*} columns 列
		 * @param {*} data 数据集
		 */
		summaryMethod() {
			const { columns, data } = param;
			const sums = [];
			columns.forEach((column, index) => {
				if (index === 0) {
					sums[index] = "合计";
					return;
				}
				const values = data.map((item) => Number(item[column.property]));
				if (!values.every((value) => isNaN(value))) {
					sums[index] = values.reduce((prev, curr) => {
						const value = Number(curr);
						if (!isNaN(value)) {
							return prev + curr;
						} else {
							return prev;
						}
					}, 0);
					// sums[index] += ' ';
				} else {
					sums[index] = "";
				}
			});
			return sums;
		},
		/**
		 * 合并单元格
		 * @param {Object} args[0].row 当前行
		 * @param {Object} args[0].column 当前列
		 * @param {Object} args[0].rowIndex 当前行索引
		 * @param {Object} args[0].columnIndex 当前列索引
		 * @param {Array} args[0].tableData 当前表格数据
		 * @return {Object}
		 */
		arraySpanMethod(row, column, rowIndex, columnIndex, tableData) {},
	},
};
</script>

<style></style>
