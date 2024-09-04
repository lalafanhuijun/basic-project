<template>
	<div class="el-page">
		<!-- <el-space direction="vertical"> -->

		<el-card class="el-box-card content-detail el-box-card-search">
			<!-- <Basic-title titleText="查询条件"></Basic-title> -->

			<basic-search
				ref="searchForm"
				size="small"
				:labelWidth="labelWidth"
				:searchForm="searchForm"
				:searchCustomForm="searchCustomForm"
				:searchData="searchData"
				:isForceReset="isForceReset"
				:isSearchCollapse="isSearchCollapse"
				@handleSearch="handleSearch"
				@getTableList="getTableList"
			>
				<slot
					v-for="item in searchCustomForm"
					:name="item.slotName"
					:slot="item.slotName"
				></slot>
			</basic-search>
		</el-card>
		<slot name="middle-content"></slot>

		<div
			:key="timer"
			class="el-box-card content-detail flex1-col flex-col el-box-card-table"
			:class="{
				'active-pagination': isFixedPagination && paginationShow,
			}"
		>
			<basic-title :title="tableText">
				<div slot="edit" class="flex-row-vcenter">
					<div class="button-area" slot="right">
						<el-button
							v-for="(item, index) in buttonList"
							:key="index + 1"
							@click="operateClick(item.method)"
						>
							<i class="iconfont-eas icon-button" :class="item.icon"></i
							>{{ item.label }}</el-button
						>
						<el-popover placement="bottom" width="250" trigger="click">
							<div class="show-icon">
								<el-checkbox
									:indeterminate="isIndeterminate"
									v-model="headCheckAll"
									@change="handleCheckAllChange"
									>全部展示</el-checkbox
								>
								<el-checkbox-group
									v-model="showHeadData"
									@change="handleCheckChange"
									class="flex-col"
								>
									<el-checkbox
										class="mt-mini"
										v-for="(head, index) in headData"
										:label="head.prop"
										:key="head.prop"
										:disabled="index === 0"
										>{{ head.label }}</el-checkbox
									>
								</el-checkbox-group>
							</div>
							<i
								class="el-icon-setting hand"
								slot="reference"
								style="margin-left: 8px"
							></i>
						</el-popover>
					</div>
				</div>
			</basic-title>

			<basic-table
				ref="pageTable"
				class="common-table"
				:class="{ 'active-pagination': isFixedPagination }"
				:tableData="tableData"
				:headData="headData"
				:stripe="stripe"
				:height="height"
				:selectionShow="selectionShow"
				:highlightCurrentRow="highlightCurrentRow"
				:tableOption="tableOption"
				:paginationShow="paginationShow"
				:pageSizes="pageSizes"
				:total="total"
				:isFixedPagination="false"
				:cellClassName="cellClassName"
				:headerCellClassName="headerCellClassName"
				:cellStyle="cellStyle"
				:headerCellStyle="headerCellStyle"
				:showSummary="showSummary"
				:sumText="sumText"
				:summaryMethod="summaryMethod"
				:arraySpanMethod="arraySpanMethod"
				:isEmpty="isEmpty"
				:defaultSort="defaultSort"
				:isNumber="isNumber"
				:isExport="isExport"
				@getTableList="getTableList"
				@handleSelect="handleSelect"
				@handleSelectAll="handleSelectAll"
				@handleTableCurrentChange="handleTableCurrentChange"
				@handleSelectionChange="handleSelectionChange"
				@handleRowClick="handleRowClick"
				@handleSortChange="handleSortChange"
				@customClick="customClick"
				@handleOperation="handleOperation"
				@handleSizeChange="handleSizeChange"
				@handleCurrentChange="handleCurrentChange"
				@exportList="exportList"
			>
				<!-- 表格上方区域自定义内容 -->
				<slot name="subhead" slot="subhead"></slot>
				<!-- 单元格自定义插槽 -->
				<template v-for="item in headData" :slot="`head${item.prop}`">
					<slot :name="`head${item.prop}`"></slot>
				</template>
				<!-- 单元格自定义插槽 -->
				<template
					v-for="item in headData"
					#[item.prop]="{ row, column, index }"
				>
					<slot :name="item.prop" :row="row" :column="column" :index="index">
					</slot>
					<slot :name="`head${item.prop}`"></slot>
				</template>
				<!-- 自定义列插槽 -->
				<slot name="column" slot="column"></slot>
				<!-- 分页左下角插槽 -->
				<slot name="footer" slot="footer"></slot>
			</basic-table>

			<!-- </div> -->
		</div>
		<!-- </el-space> -->
	</div>
</template>

<script>
// import { excelExport } from "@/api/modules/easApi/common";
// import { exportFile } from "@/utils/exportFile";
// import exportFileMixin from "@/mixins/exportFileMixin";

//引入组件
export default {
	name: "BasicPage",
	// mixins: [exportFileMixin],
	props: {
		searchData: {
			type: Object,
			default: () => {},
		},
		searchForm: {
			type: Array,
			default: () => [],
		},
		searchCustomForm: {
			type: Array,
			default: () => [],
		},
		labelWidth: {
			type: String,
			default: "130px",
		},
		//二级标题信息
		tableText: {
			type: String,
			default: "",
		},
		//列表右上角按钮区数据
		buttonList: {
			type: Array,
			default: () => [],
		},
		//是否显示列表按钮事件
		isOperateShow: {
			type: Boolean || String,
			default: true,
		},
		//表体数据
		// tableData: {
		//   type: Array,
		//   default: () => [],
		// },
		//表头数据
		headData: {
			type: Array,
			default: () => [],
		},
		height: {
			type: [String, Number],
			default: "",
		},
		//是否为斑马纹 table
		stripe: {
			type: Boolean,
			default: true,
		},
		//是否显示复选框
		selectionShow: {
			type: Boolean,
			default: false,
		},
		isNumber: {
			type: Boolean,
			default: false,
		},
		//是否显示导出按钮
		isExport: {
			type: Boolean,
			default: true,
		},
		//是否高亮当前行
		highlightCurrentRow: {
			type: Boolean,
			default: false,
		},
		//是否显示自定义列
		tableOption: {
			type: Array,
			default: () => [],
		},
		//是否显示分页
		paginationShow: {
			type: Boolean,
			default: true,
		},
		//每页显示个数选择器的选项设置
		pageSizes: {
			type: Array,
			default: () => [10, 20, 30, 40],
		},
		sort: {
			type: String,
			default: "desc",
		},

		//总条目数
		// total: {
		//   type: Number,
		//   default: 0,
		// },
		//分页是否固定定位
		isFixedPagination: {
			type: Boolean,
			default: false,
		},
		//单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className
		cellClassName: {
			type: Function,
			default: (row, column, rowIndex, columnIndex) => {
				// console.log(row, column, rowIndex, columnIndex);
			},
		},
		//表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。
		headerCellClassName: {
			type: Function,
			default: (row, column, rowIndex, columnIndex) => {
				// console.log(row, column, rowIndex, columnIndex);
			},
		},
		//表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。
		headerCellStyle: {
			type: Function,
			default: (row, column, rowIndex, columnIndex) => {
				// console.log(row, column, rowIndex, columnIndex);
			},
		},
		//单元格的 style 的回调方法
		cellStyle: {
			type: Function,
			default: (row, column, rowIndex, columnIndex) => {
				// console.log(row, column, rowIndex, columnIndex);
			},
		},
		//页面是否为跳转后重置
		isForceReset: {
			type: Boolean,
			default: false,
		},
		//查询条件默认展开/收起
		isSearchCollapse: {
			type: Boolean,
			default: false,
		},
		//是否在表尾显示合计行
		showSummary: {
			type: Boolean,
			default: false,
		},
		sumText: {
			type: String,
			default: "合计",
		},
		defaultSort: {
			type: Object,
			default: () => {},
		},
		//自定义的合计计算方法
		summaryMethod: {
			type: Function,
			default: (param) => {
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
		},
		arraySpanMethod: {
			type: Function,
			default: (row, column, rowIndex, columnIndex, tableData) => {
				// console.log(row, column, rowIndex, columnIndex, tableData);
			},
		},
		isIgnorePage: {
			//导出时是否忽略分页参数
			type: Boolean,
			default: true,
		},
		excelObj: {
			type: Object,
			default: () => {
				return {
					packageName: "", //导出包名称
					voName: "", //导出VO对象名称
				};
			},
		},
	},
	data() {
		return {
			//表格数据
			total: 0,
			tableData: [],
			//表格选择数据
			selectData: [],
			//表格复选框不存在时，单选中的数据
			currentRow: {},
			//每页显示条目个数
			pageSize: 10,
			//当前页数
			pageIndex: 1,
			isEmpty: false,
			gridHeadData: [], //表格列头隐藏/显示数据
			showHeadData: [],
			isIndeterminate: false,
			headCheckAll: true,
			timer: "",
			searchDataCopy: {},
		};
	},
	computed: {
		isQiankun() {
			return !!window.__POWERED_BY_QIANKUN__;
		},
	},
	created() {
		// this.initFormData();
		this.initGridHeadData();
		this.searchDataCopy = Object.assign({}, this.searchData);
	},
	methods: {
		/**
		 * @description: 初始化表格列头隐藏/显示数据
		 * @return {*}
		 */
		initGridHeadData() {
			// this.headData = [...this.headData];
			this.headData.forEach((item) => {
				this.$set(
					item,
					"columnShow",
					item.columnShow === undefined ? true : item.columnShow
				);
				// let gridItem = { checked: true, key: item.prop, label: item.label };
				// this.gridHeadData.push(gridItem);
				if (item.columnShow) {
					this.showHeadData.push(item.prop);
				}
			});
			const _this = this;
		},
		//加载表格数据
		getTableList(searchData) {
			this.$nextTick(() => {
				let params = {};
				if (this.paginationShow) {
					params = {
						filter: searchData || this.searchDataCopy,
						pageIndex: this.pageIndex,
						pageSize: this.pageSize,
						// sort: this.sort,
					};
				} else {
					params = searchData || this.searchDataCopy;
				}
				const _this = this;
				this.searchDataCopy = Object.assign(
					{},
					searchData || this.searchDataCopy
				);

				this.$emit("getTableList", params, (res) => {
					this.refreshTable(res);
				});
			});
		},
		//查询
		handleSearch(reset) {
			this.$refs.pageTable.pageIndex = 1;
			this.pageIndex = 1;
			this.getTableList(this.searchData);
			this.$emit("handleSearch", reset);
		},
		refreshTable(res) {
			this.timer = new Date().getTime();
			this.isEmpty = true;
			if (this.paginationShow) {
				if (res.data && res.code === 0) {
					this.total = res.data.totalCount;
					this.tableData = res.data.list;
				} else {
					this.total = 0;
					this.tableData = [];
				}
				this.$nextTick(() => {
					this.$refs.pageTable.pageIndex = this.pageIndex;
					this.$refs.pageTable.pageSize = this.pageSize;
				});
			} else {
				if (res.data && res.code === 0) {
					this.tableData = res.data;
				} else {
					this.tableData = [];
				}
			}
			// this.pageIndex = 1;
		},
		//操作区按钮点击事件
		operateClick(method) {
			this.$emit("operateClick", method);
		},
		/**
		 * @description: 当用户手动勾选数据行的 Checkbox 时触发的事件
		 * @param {*} selection
		 * @param {*} row
		 * @return {*}
		 */
		handleSelect(selection, row) {
			this.$emit("handleSelect", selection, row);
		},
		/**
		 * @description: 当用户手动勾选全选 Checkbox 时触发的事件
		 * @param {*} selection
		 * @return {*}
		 */
		handleSelectAll(selection) {
			this.$emit("handleSelectAll", selection);
		},
		//行选中事件
		handleTableCurrentChange(val) {
			this.currentRow = val;
			this.$emit("handleTableCurrentChange", val.row);
		},
		//复选框触发事件
		handleSelectionChange(val) {
			this.selectData = val;
			this.$emit("handleSelectionChange", val);
		},
		//当某一行被点击时会触发该事件
		handleRowClick(row, column, event) {
			this.currentRow = row;
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
		handleOperation(methods, row, index) {
			this.$emit("handleOperation", methods, row, index);
			// this.$emit(methods, row);
		},
		//pageSize 改变时会触发
		handleSizeChange(val) {
			this.pageSize = val;
			this.pageIndex = 1;
			this.$emit("handleSizeChange", val);
		},
		//currentPage 改变时会触发
		handleCurrentChange(val) {
			this.pageIndex = val;
			this.$emit("handleCurrentChange", val);
		},
		clearSelection() {
			this.$refs.pageTable.$refs.mainTable.clearSelection();
		},
		getOrgNoTreeData() {
			return this.$refs.searchForm.orgNoTreeData;
		},
		/**
		 * @description: 全选时触发
		 * @param {*} val
		 * @return {*}
		 */
		handleCheckAllChange(val) {
			let showHeadDataProp = [];
			this.headData.forEach((item, index) => {
				if (val) {
					item.columnShow = true;
					showHeadDataProp.push(item.prop);
				} else {
					if (index !== 0) {
						item.columnShow = false;
					} else {
						showHeadDataProp.push(item.prop);
					}
				}
			});

			this.showHeadData = val ? showHeadDataProp : [];
			this.isIndeterminate = false;
		},
		/**
		 * @description: 当绑定值变化时触发的事件
		 * @param {*} value 更新后的值
		 * @return {*}
		 */
		handleCheckChange(value) {
			let checkedCount = value.length;
			this.headCheckAll = checkedCount === this.headData.length;
			this.isIndeterminate =
				checkedCount > 0 && checkedCount < this.headData.length;

			this.headData.forEach((hItem) => {
				if (value.includes(hItem.prop)) {
					hItem.columnShow = true;
				} else {
					hItem.columnShow = false;
				}
			});
		},

		/**
		 * @description: 隐藏显示某列
		 * @param {*} prop 列
		 * @param {*} show 显示、隐藏
		 * @return {*}
		 */
		hideColumn(prop, show) {
			let findIndex = this.headData.findIndex((item) => item.prop === prop);
			if (findIndex > -1) {
				this.headData[findIndex].columnShow = show;
				// const _this = this;
				// this.$nextTick(() => {
				//   _this.$refs.pageTable.$refs.easTable.doLayout();
				// });
			}
		},
		exportList() {
			this.$emit("exportList", this.searchDataCopy);
			this.export();
		},
		export() {
			let pageQuery = {
				filter: this.searchDataCopy,
				// sort: this.sort,
			};
			// this.openFlileMessage();
			if (!this.isIgnorePage) {
				this.$set(pageQuery, "pageIndex", this.pageIndex);
				this.$set(pageQuery, "pageSize", this.pageSize);
			}
			let params = {
				// isIgnorePage: this.isIgnorePage,
				// packageName: this.excelObj.packageName,
				// voName: this.excelObj.voName,
				address: this.excelObj.address,
				pageQuery: pageQuery,
			};
			// excelExport(params)
			// 	.then((res) => {
			// 		exportFile(res);
			// 	})
			// 	.catch(() => {
			// 		// this.closeFlileMessage();
			// 	});
		},
	},
	watch: {
		total(val) {
			if (this.paginationShow) {
				const totalPage =
					Math.ceil(val / this.pageSize) === 0
						? 1
						: Math.ceil(val / this.pageSize);
				if (this.pageIndex > totalPage) {
					this.pageIndex = totalPage;
					let params = {
						filter: this.searchDataCopy,
						pageIndex: this.pageIndex,
						pageSize: this.pageSize,
						sort: this.sort,
					};
					this.$emit("getTableList", params, (res) => {
						this.refreshTable(res);
					});
				}
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.el-tabs-wrapper {
	.el-box-card-search {
		border-radius: 0 0 8px 8px !important;
		box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.05);
	}
}
/deep/.el-space__item {
	width: 100%;
}

.content-detail + .content-detail {
	margin-top: 16px;
}

.el-page {
	display: flex;
	flex-direction: column;
	min-height: 100%;
	&.is-qiankun-pad {
		padding-bottom: 16px;
	}
	.el-box-card-table {
		padding: 16px 16px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
		border-radius: 8px;
		background-color: #fff;
		// overflow: hidden;
		color: #333;
		/deep/.el-card__body {
			display: flex;
			flex-direction: column;
			flex: 1;
		}
		// &.active-pagination {
		//   padding-bottom: 52px; //分页固定在下方位置
		// }
	}
	.common-table {
		flex: 1;
		height: 1px;
		display: flex;
		flex-direction: column;
		// &.active-pagination {
		// }
		&.active {
			height: 100%;
		}
	}
}
</style>
