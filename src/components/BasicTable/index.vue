<template>
	<div class="table-content">
		<slot name="subhead"></slot>
		<div
			class="eas-table"
			:class="{
				'active-pagination': paginationShow && isFixedPagination,
				'active-summary': showSummary,
				'active-summary-children': isChildrenTable() && showSummary,
				'active-pagination-summary':
					paginationShow && showSummary && isFixedPagination,
				isChildrenTable: isChildrenTable(),
			}"
		>
			<el-table
				@header-cell-click="headerCellClickEvent"
				:height="height ? height : isFixedPagination ? undefined : '100%'"
				:stripe="stripe"
				:border="false"
				ref="easTable"
				:id="elId"
				:data="tableData"
				:show-summary="showSummary"
				:sum-text="sumText"
				:default-sort="defaultSort"
				:summary-method="
					({ columns, data }) => {
						return summaryMethod(columns, data);
					}
				"
				:span-method="
					({ row, column, rowIndex, columnIndex }) => {
						return arraySpanMethod(
							row,
							column,
							rowIndex,
							columnIndex,
							tableData
						);
					}
				"
				:inline-border="inlineBorder"
				@select="handleSelect"
				@select-all="handleSelectAll"
				@current-change="handleTableCurrentChange"
				@selection-change="handleSelectionChange"
				@cell-click="handleRowClick"
				@sort-change="handleSortChange"
				:highlight-current-row="!selectionShow && highlightCurrentRow"
				:cell-class-name="
					({ row, column, rowIndex, columnIndex }) => {
						return cellClassName(row, column, rowIndex, columnIndex);
					}
				"
				:header-cell-class-name="
					({ row, column, rowIndex, columnIndex }) => {
						return headerCellClassName(row, column, rowIndex, columnIndex);
					}
				"
				:header-cell-style="
					({ row, column, rowIndex, columnIndex }) => {
						return headerCellStyle(row, column, rowIndex, columnIndex);
					}
				"
				:cell-style="
					({ row, column, rowIndex, columnIndex }) => {
						return cellStyle(row, column, rowIndex, columnIndex);
					}
				"
				headerStripe
			>
				<el-table-column
					v-if="selectionShow"
					type="selection"
					width="55"
					fixed="left"
					align="center"
				>
				</el-table-column>
				<el-table-column
					v-if="isNumber"
					type="index"
					width="55"
					label="序号"
					align="center"
				>
				</el-table-column>
				<template v-for="(item, index) in headData">
					<el-table-column
						v-if="item.columnShow === undefined || item.columnShow"
						:min-width="item.minWidth ? item.minWidth : '150'"
						:width="item.width"
						:header-align="
							item.headerAlign
								? item.headerAlign
								: item.children && item.children.length > 0
								? 'center'
								: 'left'
						"
						:key="item.prop"
						:align="item.align ? item.align : 'left'"
						:label="item.label"
						:prop="item.prop"
						:sortable="item.sortable ? 'custom' : false"
						:show-overflow-tooltip="
							item.showOverflowTooltip == undefined
								? true
								: item.showOverflowTooltip
						"
					>
						<template slot="header" slot-scope="scope">
							<div v-if="item.label.split('/').length > 1 && item.renderHeader">
								<div>{{ item.label.split("/")[0] }}</div>
								<div :style="item.style">{{ item.label.split("/")[1] }}</div>
							</div>

							<span v-else-if="item.slotHeader">
								<slot :name="`head${item.prop}`"></slot>
							</span>

							<span v-else>{{ item.label }}</span>
						</template>
						<template slot-scope="scope">
							<!-- 表格列可点击 -->
							<span
								v-if="
									item.custom
										? item.customCode
											? item.customCode.includes(scope.row[item.prop])
											: true
										: false
								"
								class="link-text"
								@click="customClick(item.prop, scope.$index, scope.row)"
							>
								<span v-if="item.handle">
									<template
										v-for="(item_h, index) in item.handle"
										v-if="item_h.key == scope.row[item.prop]"
									>
										<span>{{ item_h.value }}</span>
									</template>
								</span>
								<span v-else-if="item.formatter">
									<span>{{ item.formatter(scope.row, item) }}</span>
								</span>
								<span v-else>{{ scope.row[item.prop] }}</span>
							</span>
							<!-- 表格列值进行重新渲染，值固定 -->
							<span v-else-if="item.handle">
								<template
									v-for="(item_h, index) in item.handle"
									v-if="item_h.key == scope.row[item.prop]"
								>
									<span>{{ item_h.value }}</span>
								</template>
							</span>
							<!-- 表格列值自定义方法进行重新渲染 -->
							<span v-else-if="item.formatter">
								<span :style="item.style">{{
									item.formatter(scope.row, item)
								}}</span>
							</span>
							<template v-else-if="item.slot">
								<slot
									:name="item.prop"
									:row="scope.row"
									:column="scope.column"
									:index="scope.$index"
								></slot>
							</template>
							<span v-else>
								<span>{{ scope.row[item.prop] }}</span>
							</span>
						</template>
						<el-table-column
							v-for="(cItem, index) in item.children"
							:min-width="cItem.minWidth ? cItem.minWidth : '150'"
							:width="cItem.width"
							:key="cItem.label"
							:header-align="cItem.headerAlign ? cItem.headerAlign : 'left'"
							:align="cItem.align ? cItem.align : 'left'"
							:label="cItem.label"
							:prop="cItem.prop"
							:sortable="cItem.sortable ? 'custom' : false"
							show-overflow-tooltip
						>
							<template slot-scope="scope">
								<!-- 表格列可点击 -->
								<span
									v-if="cItem.custom"
									class="link-text"
									@click="customClick(cItem.prop, scope.$index, scope.row)"
								>
									{{ scope.row[cItem.prop] }}
								</span>
								<span v-else>{{ scope.row[cItem.prop] }}</span>
							</template>
						</el-table-column>
					</el-table-column>
				</template>

				<slot name="column"></slot>
				<el-table-column
					v-for="(item, index) in tableOption"
					:key="item.label"
					:label="item.label"
					min-width="104"
					:width="item.width"
					align="center"
					fixed="right"
					class-name="small-padding"
				>
					<template slot-scope="scope">
						<template
							v-for="(op, opIndex) in conditionShowOptions(item, scope.row)"
						>
							<el-button
								class="option-button"
								v-if="!item.showDropdown || (item.showDropdown && opIndex < 2)"
								:type="op.type"
								:icon="op.icon"
								:style="op.disabledStatus ? {} : op.style"
								:disabled="op.disabledStatus"
								@click="handleOperation(op.methods, scope.row, scope.$index)"
								size="small"
							>
								{{ op.label }}
							</el-button>

							<el-divider
								direction="vertical"
								v-if="
									(!item.showDropdown &&
										opIndex < item.showOptions.length - 1) ||
									(item.showDropdown && opIndex < 2)
								"
							></el-divider>
						</template>
						<template>
							<el-dropdown
								v-if="item.showDropdown"
								class="more-settings"
								trigger="click"
								@command="
									(command) => {
										handleOperation(command, scope.row, scope.$index);
									}
								"
								@visible-change="dropdownVisibleChange"
							>
								<span class="el-dropdown-link">
									更多<i class="el-icon-arrow-down el-icon--right"></i>
								</span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item
										v-for="(op, opIndex) in item.showOptions.slice(
											2,
											item.showOptions.length
										)"
										:key="opIndex"
										:command="op.methods"
										:disabled="op.disabledStatus"
										class="primary-text hand"
										:style="op.style"
										>{{ op.label }}</el-dropdown-item
									>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</template>
				</el-table-column>
				<slot name="append" slot="append"></slot>
			</el-table>
		</div>

		<slot name="footer"></slot>
		<div
			v-if="paginationShow"
			class="eas-el-footer flex-row-vcenter flex-row-end"
			:class="{
				active: isFixedPagination,
				'width-reduce': isQiankun && isFixedPagination,
			}"
		>
			<el-pagination
				background
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="pageIndex"
				:page-sizes="pageSizes"
				:page-size="pageSize"
				:total="total"
				:pager-count="5"
				layout="total, prev, pager, next, sizes, jumper"
				popper-class="pagination-popper"
			>
			</el-pagination>
			<i
				v-if="isExport"
				class="icon iconfont-eas excel-icon hand iconexcel"
				@click="exportList"
			></i>
		</div>
		<div
			class="margin-footer"
			v-if="isFixedPagination && paginationShow"
			:class="{
				active: isFixedPagination,
				'width-reduce': isQiankun && isFixedPagination,
			}"
		></div>
	</div>
</template>

<script>
import { v4 } from "uuid";
// import scroll from "@/mixins/easTableScroll";
export default {
	// mixins: [scroll],
	name: "BasicTable",
	props: {
		height: {
			type: String / Number,
			default: "",
		},
		maxHeight: {
			type: String / Number,
			default: undefined,
		},
		//表体数据
		tableData: {
			type: Array,
			default: () => [],
		},
		//表头数据
		headData: {
			type: Array,
			default: () => [],
		},
		//是否为斑马纹 table
		stripe: {
			type: Boolean,
			default: true,
		},
		//是否显示序号
		isNumber: {
			type: Boolean,
			default: false,
		},
		//是否显示复选框
		selectionShow: {
			type: Boolean,
			default: false,
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
		//表头是否/换行
		renderHeader: {
			type: Boolean,
			default: false,
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
		//总条目数
		total: {
			type: Number,
			default: 0,
		},
		//分页是否固定定位
		isFixedPagination: {
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
			default: (columns, data) => {
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
		//合并行或列的计算方法
		arraySpanMethod: {
			type: Function,
			default: (row, column, rowIndex, columnIndex, tableData) => {
				// console.log(row, column, rowIndex, columnIndex, tableData);
			},
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
		//单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。
		cellStyle: {
			type: Function,
			default: (row, column, rowIndex, columnIndex) => {
				// console.log(row, column, rowIndex, columnIndex);
			},
		},
		inlineBorder: { type: Boolean, default: true }, //隐藏表格内的边框
		//是否显示导出按钮
		isExport: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			elId: "table-box-",
			operateClick: false, //点击行时是否是操作列或者表格列点击事件
			//每页显示条目个数
			pageSize: 10,
			//当前页数
			pageIndex: 1,
			//表格选择数据
			selectData: [],
			//表格复选框不存在时，单选中的数据
			currentRow: {},
			isTableShow: false,
		};
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
					this.$emit("getTableList");
				}
			}
		},
	},
	computed: {
		isQiankun() {
			return !!window.__POWERED_BY_QIANKUN__;
		},
	},
	mounted() {
		this.elId = this.elId + v4();
	},
	created() {},
	methods: {
		headerCellClickEvent(item) {
			if (item.column.type === "checkbox" && item.$rowIndex === 0) {
				this.handleSelectionChange(item.$table._data.selection);
			}
		},
		/**
		 * @description: 根据条件判断操作列按钮是否显示
		 * @param {*} item 当前操作按钮信息
		 * @param {*} row 当前行数据
		 * @return {*}
		 */
		conditionShowOptions(item, row) {
			let showOptions = [];
			item.options.forEach((oItem) => {
				let isShow = this.getOptionsShow(oItem.show, row);
				let disabledStatus = false;
				if (isShow) {
					if (oItem.disabled) {
						disabledStatus = true;
					}
				} else {
					if (oItem.showDisabled) {
						isShow = true;
						disabledStatus = true;
					} else {
						isShow = false;
					}
				}
				oItem.disabledStatus = disabledStatus;
				if (isShow) {
					showOptions.push(oItem);
				}
			});
			if (showOptions.length > 3) {
				item.showDropdown = true;
			} else {
				item.showDropdown = false;
			}
			item.showOptions = showOptions;
			return showOptions;
		},
		/**
		 * @description: 计算操作列展示按钮
		 * @param {*} showArr 传入按钮
		 * @param {*} row 当前行数据
		 * @return {*}
		 */
		getOptionsShow(showArr, row) {
			let isShow = true;
			if (showArr && showArr.length > 0) {
				for (let i = 0; i < showArr.length; i++) {
					const oItem = showArr[i];
					if (oItem.condition === "includes") {
						//包含
						if (oItem.value.includes(row[oItem.targetProp])) {
							isShow = true;
						} else {
							isShow = false;
						}
					} else if (oItem.condition === "equal") {
						//等于
						if (row[oItem.targetProp] === oItem.value) {
							isShow = true;
						} else {
							isShow = false;
						}
					} else if (oItem.condition === "notEqual") {
						//不等于
						if (row[oItem.targetProp] !== oItem.value) {
							isShow = true;
						} else {
							isShow = false;
						}
					} else if (oItem.condition === "lessThan") {
						//小于
						if (row[oItem.targetProp] < oItem.value) {
							isShow = true;
						} else {
							isShow = false;
						}
					} else if (oItem.condition === "greaterThan") {
						//大于
						if (row[oItem.targetProp] > oItem.value) {
							isShow = true;
						} else {
							isShow = false;
						}
					}
					if (!isShow) {
						break;
					}
				}
			}
			return isShow;
		},
		isChildrenTable() {
			return this.headData.some((item) => item.children);
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
			this.$emit("handleTableCurrentChange", val);
		},
		//复选框触发事件
		handleSelectionChange(val) {
			this.selectData = val;
			this.$emit("handleSelectionChange", val);
		},
		//当某一行被点击时会触发该事件
		handleRowClick(row, column, event) {
			if (this.operateClick) {
				this.operateClick = false;
				this.$refs.easTable.clearSelection();
				return;
			}
			// this.$refs.easTable.toggleRowSelection(row);
			this.$emit("handleRowClick", row.row, column, event);
		},
		handleSortChange({ column, prop, order }) {
			this.$emit("handleSortChange", column, prop, order);
		},
		//自定义列点击事件触发
		customClick(prop, index, row) {
			this.operateClick = true;
			this.$emit("customClick", prop, index, row);
		},
		//操作列事件触发
		handleOperation(methods, row, index) {
			this.operateClick = true;
			this.$emit("handleOperation", methods, row, index);
		},
		dropdownVisibleChange() {
			this.operateClick = true;
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
		exportList() {
			this.$emit("exportList");
		},
		forceUpdate() {
			this.$forceUpdate();
		},
		//对 Table 进行重新布局。当 Table 或其祖先元素由隐藏切换为显示时，可能需要调用此方法
		doLayout() {
			this.$refs.easTable.doLayout();
		},
	},
};
</script>
<style lang="scss" scoped>
/deep/.el-table--headerStripe thead tr > th {
	background: #ededed !important;
}
/deep/.el-table--striped .el-table__body tr.el-table__row--striped td {
	background: #f8f8f8;
}
.table-content {
	/deep/.eas-table {
		width: 100%;
		height: 100%;
		flex: 1;

		// &.active-pagination {
		//   margin-bottom: 68px;
		//   .el-table__body-wrapper {
		//     height: calc(100% - 38px);
		//   }
		// }
		// &.active-pagination-summary {
		//   .el-table__body-wrapper {
		//     height: calc(100% - 77px);
		//   }
		// }
		// &.active-summary {
		//   .el-table__body-wrapper {
		//     height: calc(100% - 77px);
		//   }
		// }

		&.isChildrenTable {
			.el-table__body-wrapper {
				height: calc(100% - 76px);
			}
		}
		&.active-summary-children {
			.el-table__body-wrapper {
				height: calc(100% - 115px);
			}
		}
		&.active-pagination {
			// height: calc(100% - 56px);
		}
	}
	.eas-el-footer {
		padding-top: 20px;
		text-align: right;
		&.active {
			position: fixed;
			// margin: 0 16px;
			padding: 16px;
			width: calc(100% - 310px);
			z-index: 999;
			bottom: 16px;
			right: 0;
			background: rgb(255, 255, 255);
		}
		&.width-reduce {
			margin: 0 16px;
			width: calc(100% - 32px);
		}
		.excel-icon {
			margin-left: 16px;
			// color: #409EFF;
		}
	}
	.margin-footer {
		position: fixed;
		height: 16px;
		z-index: 999;
		bottom: 0;
		right: 0;
		width: 100%;
		background: #ececec;
		&.active {
			width: calc(100% - 310px);
		}
		&.width-reduce {
			margin: 0 16px;
			width: calc(100% - 32px);
		}
	}
	.option-button {
		margin-left: 0;
	}
	.more-settings {
		cursor: pointer;
		color: #409eff;
	}
	/deep/.el-table__body tr.current-row > td {
		background-color: #409eff !important;
		color: #fff;
	}
	/deep/.el-table--striped
		.el-table__body
		tr.el-table__row--striped.current-row
		td {
		background-color: #409eff !important;
		color: #fff;
	}
}
</style>
