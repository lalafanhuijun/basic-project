<template>
	<div>
		<el-form
			class="search-form"
			ref="searchForm"
			:model="searchData"
			:size="size"
			:rules="rules"
			:label-width="labelWidth"
			inline
		>
			<el-form-item
				v-for="(item, index) in searchForm"
				:label="item.label"
				:prop="item.prop"
				:key="item.prop"
				class="formItem"
				v-show="displayItemCount > index || isDown"
				ref="formItem"
			>
				<!-- 树型下拉选择框 -->
				<treeselect
					class="treeSelect w260"
					v-if="item.type === 'treeSelect'"
					v-model="searchData[item.prop]"
					:searchable="false"
					:multiple="item.multiple"
					:options="item.options || []"
					:clearable="false"
					@input="treeSelectInput"
					@open="treeSelectOpen"
					@select="treeSelectChange"
					:load-options="loadOptions"
					:flat="item.flat"
					placeholder="请选择"
				>
					<div slot="value-label" slot-scope="{ node }">
						{{ node.raw.label }}
					</div>
				</treeselect>

				<!-- 输入框 -->
				<el-input-number
					:size="size"
					v-if="item.type === 'inputn'"
					v-model="searchData[item.prop]"
					controls-position="right"
					@change="handleStartChange"
					:min="item.min"
					:max="item.max"
					:precision="item.precision ? item.precision : 0"
					class="w260"
				></el-input-number>
				<el-input
					v-if="item.type === 'input'"
					v-model.trim="searchData[item.prop]"
					:size="size"
					:placeholder="item.placeholder || '请输入'"
					:style="{ width: item.width }"
					:disabled="item.disabled"
					class="w260"
				></el-input>
				<!-- 下拉框 -->
				<el-select
					v-if="item.type === 'select'"
					v-model="searchData[item.prop]"
					:size="size"
					ref="select"
					:multiple="item.multiple"
					:collapse-tags="item.multiple"
					:placeholder="item.placeholder || '请选择'"
					:disabled="item.disabled"
					@visible-change="
						(value) => {
							formItemVisibleChange(value, item);
						}
					"
					@change="item.change && item.change(searchData[item.prop])"
					:style="{ width: item.width }"
					:clearable="item.clearable || false"
					class="w260"
				>
					<template v-for="op in item.options">
						<el-option v-if="op" :label="op.name" :value="op.value"></el-option>
					</template>
				</el-select>
				<!-- 单选 -->
				<el-radio-group
					v-if="item.type === 'radio'"
					v-model="searchData[item.prop]"
					:disabled="item.disabled"
					@change="item.change && item.change(commonFormData[item.prop])"
					class="w260"
				>
					<el-radio
						v-for="ra in item.options"
						:label="ra.value"
						:key="ra.value"
						>{{ ra.name }}</el-radio
					>
				</el-radio-group>
				<!-- 单选按钮 -->
				<el-radio-group
					v-if="item.type === 'radioButton'"
					v-model="searchData[item.prop]"
					:disabled="item.disabled"
					@change="item.change && item.change(searchData[item.prop])"
					class="w260"
				>
					<el-radio-button
						v-for="ra in item.options"
						:label="ra.value"
						:key="ra.value"
						>{{ ra.name }}</el-radio-button
					>
				</el-radio-group>
				<!-- 复选框 -->
				<el-checkbox-group
					v-if="item.type === 'checkbox'"
					v-model="searchData[item.prop]"
					:disabled="item.disabled"
					@change="item.change && item.change(commonFormData[item.prop])"
					class="w260"
				>
					<el-checkbox
						v-for="ch in item.checkboxs"
						:label="ch.value"
						:key="ch.value"
						>{{ ch.name }}</el-checkbox
					>
				</el-checkbox-group>
				<!-- 计数器输入框 -->
				<div class="input-number" v-if="item.type === 'inputNumber'">
					<el-input-number
						class="iwidth96"
						:size="size"
						v-model="searchData[item.start]"
						controls-position="right"
						:min="item.min"
						:max="Number(searchData[item.end])"
						:precision="item.precision ? Number(item.precision) : 2"
						@input.native="changeInputPower($event, item.precision)"
					></el-input-number>
					<span style="margin-left: 8px">
						{{ item.inputType === "percent" ? "%" : "" }}</span
					>
					<span
						:style="{ padding: item.inputType === 'percent' ? '9px' : '29px' }"
						>~</span
					>
					<el-input-number
						:size="size"
						class="iwidth96"
						v-model="searchData[item.end]"
						controls-position="right"
						:min="Number(searchData[item.start])"
						:max="item.max"
						:precision="item.precision ? Number(item.precision) : 2"
						@input.native="changeInputPower($event, item.precision)"
					></el-input-number>
					<span style="margin-left: 8px">
						{{ item.inputType === "percent" ? "%" : "" }}</span
					>
				</div>
				<!-- 年、月、日查询时间 -->
				<template v-if="item.type === 'radioDatePicker'" style="height: 32px">
					<el-radio-group
						style="width: 116px"
						v-model="item.searchType"
						size="small"
						@change="
							(val) => {
								handelRadioChange(val, item);
							}
						"
					>
						<div class="flex-row-ad">
							<el-radio
								class="day-radio"
								:label="rItem.label"
								v-for="(rItem, rIndex) in item.rodioOptions"
								:key="rIndex"
								>{{ rItem.name }}</el-radio
							>
						</div>
					</el-radio-group>
					<el-date-picker
						v-if="
							item.searchType === 'year' &&
							!Array.isArray(searchData[item.prop])
						"
						ref="yearDate"
						v-model="searchData[item.prop]"
						format="yyyy"
						value-format="yyyy"
						type="year"
						:key="`picker-${item.searchType}`"
						placeholder="请选择年份"
						:clearable="item.clearable ? item.clearable : true"
						:editable="false"
						:picker-options="item.pickerOptions"
						:disabled="item.disabled"
						class="radio-picker"
						@change="item.change && item.change(searchData[item.prop])"
					></el-date-picker>
					<el-date-picker
						v-if="
							item.searchType === 'month' &&
							!Array.isArray(searchData[item.prop])
						"
						ref="monthDate"
						v-model="searchData[item.prop]"
						format="yyyy-MM"
						value-format="yyyy-MM"
						type="month"
						:key="`picker-${item.searchType}`"
						placeholder="请选择月份"
						:clearable="item.clearable ? item.clearable : true"
						:editable="false"
						:picker-options="item.pickerOptions"
						:disabled="item.disabled"
						class="radio-picker"
						@change="item.change && item.change(searchData[item.prop])"
					></el-date-picker>
					<el-date-picker
						v-if="item.searchType === 'date'"
						ref="dayDate"
						v-model="searchData[item.prop]"
						align="right"
						:type="item.dateType || 'daterange'"
						:clearable="item.clearable ? item.clearable : true"
						:editable="false"
						:disabled="item.disabled"
						placeholder="选择日期"
						:class="item.dateType ? 'radio-picker' : 'radio-day-picker'"
						format="yyyy-MM-dd"
						value-format="yyyy-MM-dd"
						:key="`picker-${item.searchType}`"
						:range-separator="!item.dateType ? '~' : ''"
						:start-placeholder="!item.dateType ? '开始日期' : ''"
						:end-placeholder="!item.dateType ? '结束日期' : ''"
						:picker-options="item.pickerOptions"
						@change="item.change && item.change(searchData[item.prop])"
					>
					</el-date-picker>
				</template>
				<!-- 日期 -->
				<el-date-picker
					v-if="item.type === 'datePicker'"
					ref="datePicker"
					v-model="searchData[item.prop]"
					:type="item.dateType"
					:format="item.format"
					:value-format="item.valueFormat"
					:placeholder="item.placeholder || '请选择'"
					:picker-options="item.pickerOptions"
					:disabled="item.disabled"
					:clearable="item.clearable ? item.clearable : true"
					:editable="false"
					@change="item.change && item.change(searchData[item.prop])"
					class="w260"
				></el-date-picker>
				<!-- 日期范围 -->
				<el-date-picker
					v-if="item.type === 'daterange'"
					ref="daterange"
					type="daterange"
					v-model="searchData[item.prop]"
					range-separator="~"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					:format="item.format"
					:value-format="item.valueFormat"
					:picker-options="item.pickerOptions"
					:disabled="item.disabled"
					:clearable="item.clearable ? item.clearable : true"
					:editable="false"
					@change="item.change && item.change(searchData[item.prop])"
					class="w260"
				>
				</el-date-picker>
				<!-- 月份范围 -->
				<el-date-picker
					v-if="item.type === 'monthrange'"
					ref="monthrange"
					v-model="searchData[item.prop]"
					type="monthrange"
					range-separator="~"
					start-placeholder="开始月份"
					end-placeholder="结束月份"
					:format="item.format"
					:value-format="item.valueFormat"
					:picker-options="item.pickerOptions"
					:disabled="item.disabled"
					:clearable="item.clearable ? item.clearable : true"
					:editable="false"
					@change="item.change && item.change(searchData[item.prop])"
					class="w260"
				>
				</el-date-picker>
				<!-- 日期时间范围 -->
				<el-date-picker
					v-if="item.type === 'datetimerange'"
					ref="datetimerange"
					type="datetimerange"
					v-model="searchData[item.prop]"
					range-separator="~"
					start-placeholder="开始时间"
					end-placeholder="结束时间"
					:format="item.format"
					:value-format="item.valueFormat"
					:picker-options="item.pickerOptions"
					:disabled="item.disabled"
					:clearable="item.clearable ? item.clearable : true"
					:editable="false"
					@change="item.change && item.change(searchData[item.prop])"
					class="w260"
				></el-date-picker>

				<!-- 滑块 -->
				<!-- <el-slider v-if="item.type==='Slider'" v-model="searchData[item.prop]"></el-slider> -->
				<!-- 开关 -->
				<el-switch
					v-if="item.type === 'switch'"
					v-model="searchData[item.prop]"
					class="w260"
				></el-switch>
			</el-form-item>
			<el-form-item
				v-for="(item, index) in searchCustomForm"
				:label="item.label"
				:prop="item.prop"
				:key="item.prop"
				class="formItem"
				v-show="displayItemCount > index + searchForm.length || isDown"
			>
				<slot :name="item.slotName"></slot>
			</el-form-item>
			<el-form-item
				style="
					float: right;
					width: 270px;
					text-align: right;
					margin-right: 0px !important;
				"
				class="formItem"
			>
				<el-button @click="handleReset">重置</el-button>
				<el-button @click="handleSearch" type="primary">查询</el-button>
				<el-button
					v-show="!isDown"
					type="text"
					class="collapse-button"
					:class="{ active: !isShowCollapse }"
					@click="isDown = !isDown"
					>展开<i class="el-icon-arrow-down"></i
				></el-button>
				<el-button
					v-show="isDown"
					type="text"
					class="collapse-button"
					:class="{ active: !isShowCollapse }"
					@click="isDown = !isDown"
					>收起<i class="el-icon-arrow-up"></i
				></el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
// import ElementResizeDetectorMaker from "element-resize-detector";
export default {
	name: "BasicSearch",
	// register the component
	components: { Treeselect },
	props: {
		//form表单label宽度
		labelWidth: {
			type: String,
			default: "150px",
		},
		//组件尺寸
		size: {
			type: String,
			default: "small",
		},
		//查询条件项
		searchForm: {
			type: Array,
			default: () => [],
		},
		//自定义条件项item
		searchCustomForm: {
			type: Array,
			default: () => [],
		},
		//查询条件默认绑定数据
		searchData: {
			type: Object,
			default: () => {},
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
	},
	data() {
		return {
			isDown: false, //搜索信息是否展开
			startNumber: 0,
			endNumber: 0,
			isShowCollapse: true, //展开查询按钮是否显示
			resetSearchData: {},
			formObserver: null, // 表单尺寸变动监听器
			displayItemCount: 6, // 展示表单项总数
		};
	},
	computed: {
		/** 解析表单的正则验证***/
		rules() {
			let rules = this.searchForm.reduce((map, i) => {
				if (i.rules) {
					map[i.prop] = i.rules;
				}
				return map;
			}, {});
			return rules;
		},
	},
	async created() {
		// if (this.isSearchCollapse) {
		//   this.isDown = true;
		// }
		// if (this.searchForm.length > 6) {
		//   this.isShowCollapse = true;
		// } else {
		//   this.isShowCollapse = false;
		// }
		this.resetSearchData = JSON.parse(JSON.stringify(this.searchData));
		this.$emit("getTableList", this.searchData);
		// Vue.prototype.$erd = ElementResizeDetectorMaker();
	},
	mounted() {
		// 动态设置查询表单每行列数
		const dom = this.$refs.searchForm.$el;
		this.formObserver = new ResizeObserver((elems) => {
			// 获取表单宽度
			const formItems = this.$refs.formItem;
			let width = elems[0].contentRect.width;
			// 展示总数 = 表单宽度 / 表单项宽度 * 2
			this.displayItemCount = Math.floor(width / 400) * 2;
			const isSearchCollapse =
				this.displayItemCount <=
				this.searchForm.length + this.searchCustomForm.length;
			// this.isSearchCollapse =
			// 	this.displayItemCount <=
			// 	this.searchForm.length + this.searchCustomForm.length;
			this.isShowCollapse = isSearchCollapse;
			console.log("form width=>", width);
		});
		this.formObserver.observe(dom, { box: "border-box" });
	},
	beforeDestroy() {
		this.formObserver.disconnect();
	},
	methods: {
		formItemVisibleChange(value, item) {
			if (item.type === "select" && item.multiple && value) {
				item.options.sort((a, b) => {
					const aIndex = this.searchData[item.prop].indexOf(a.value);
					const bIndex = this.searchData[item.prop].indexOf(b.value);
					return bIndex - aIndex;
				});
			}
		},
		// inputNumber小数位数截断
		changeInputPower(e, precision) {
			if (e.target.value.indexOf(".") >= 0) {
				precision = precision ? Number(precision) : 2;
				e.target.value = e.target.value.substring(
					0,
					e.target.value.indexOf(".") + precision + 1
				);
			}
		},
		//查询
		handleSearch() {
			//表单提交前进行表单校验
			this.$refs.searchForm.validate((valid) => {
				if (valid) {
					this.$emit("handleSearch", false);
				} else {
					return false;
				}
			});
		},
		//重置
		async handleReset() {
			for (let key in this.searchData) {
				this.$set(this.searchData, key, this.resetSearchData[key]);
			}
			const radioDatePicker = this.searchForm.filter(
				(item) => item.type === "radioDatePicker"
			);
			radioDatePicker.forEach((item) => {
				item.searchType = item.rodioOptions[0].label;
			});

			//如果列表页时跳转后的界面，重置时将跳转带过来的值全部清空
			if (this.isForceReset) {
				const inputList = this.searchForm.filter(
					(item) => item.type === "input" || item.type === "datePicker"
				);
				if (inputList.length > 0) {
					inputList.forEach((item) => {
						this.searchData[item.prop] = "";
					});
				}
				const selectList = this.searchForm.filter(
					(item) => item.type === "select"
				);
				if (selectList.length > 0) {
					selectList.forEach((item) => {
						this.searchData[item.prop] = item.options[0].value;
					});
				}

				const rangeList = this.searchForm.filter(
					(item) =>
						item.type === "daterange" ||
						item.type === "monthrange" ||
						item.type === "datetimerange"
				);
				if (rangeList.length > 0) {
					rangeList.forEach((item) => {
						this.searchData[item.prop] = [];
					});
				}
			}
			this.$nextTick(() => {
				this.$emit("handleSearch", true);
			});
		},
		treeSelectOpen() {
			console.log("-----下拉选择树打开触发");
			//下拉选择树框与下拉框、日期下拉框重叠，在下拉选择树展开时手动关闭下拉框、日期下拉框
			if (this.$refs.select) {
				this.$refs.select.map((item) => {
					item.blur();
				});
			}
			if (this.$refs.monthDate) {
				this.$refs.monthDate.map((item) => {
					item.hidePicker();
				});
			}
			if (this.$refs.dayDate) {
				this.$refs.dayDate.map((item) => {
					item.hidePicker();
				});
			}
			if (this.$refs.yearDate) {
				this.$refs.yearDate.map((item) => {
					item.hidePicker();
				});
			}
			if (this.$refs.datePicker) {
				this.$refs.datePicker.map((item) => {
					item.hidePicker();
				});
			}
			if (this.$refs.daterange) {
				this.$refs.daterange.map((item) => {
					item.hidePicker();
				});
			}
			if (this.$refs.monthrange) {
				this.$refs.monthrange.map((item) => {
					item.hidePicker();
				});
			}
			if (this.$refs.datetimerange) {
				this.$refs.datetimerange.map((item) => {
					item.hidePicker();
				});
			}
		},
		treeSelectInput(value, instanceId) {},
		treeSelectOpen() {
			console.log("-----下拉选择树打开触发");
		},
		treeSelectChange() {},
		/** 加载子节点数据 **/
		loadOptions() {},

		//imputNumber输入框开始数据发生变更
		handleStartChange(currentValue, oldValue, prop) {
			if (currentValue > this.endNumber && this.endNumber) {
				this.$nextTick(() => {
					this.searchData[prop] = oldValue;
				});
			}

			this.startNumber = currentValue;
		},
		//imputNumber输入框结束数据发生变更
		handleEndChange(currentValue, oldValue, prop) {
			if (currentValue < this.startNumber) {
				this.$nextTick(() => {
					this.searchData[prop] = oldValue;
				});
			}
			this.endNumber = currentValue;
		},
		//radio日期类型发生变更
		handelRadioChange(val, item) {
			if (val === "year") {
				if (item.defaultYear) {
					this.searchData[item.prop] = item.defaultYear;
				} else {
					this.searchData[item.prop] = new Date().getFullYear().toString();
				}
			} else if (val === "month") {
				console.log(this.searchData[item.prop]);
				if (item.defaultMonth) {
					this.searchData[item.prop] = item.defaultMonth;
				} else {
					this.searchData[item.prop] = `${new Date().getFullYear()}-${
						new Date().getMonth() + 1 < 10
							? "0" + (new Date().getMonth() + 1)
							: new Date().getMonth() + 1
					}`;
				}
			} else if (val === "date") {
				if (item.defaultDate) {
					this.searchData[item.prop] = item.defaultDate;
				} else {
					let date = new Date();
					let year = date.getFullYear().toString();
					let month =
						date.getMonth() + 1 < 10
							? "0" + (date.getMonth() + 1).toString()
							: (date.getMonth() + 1).toString();
					let da =
						date.getDate() < 10
							? "0" + date.getDate().toString()
							: date.getDate().toString();
					let end = year + "-" + month + "-" + da;
					let beg = year + "-" + month + "-01";
					if (item.dateType && item.dateType === "date") {
						this.searchData[item.prop] = end;
					} else {
						this.searchData[item.prop] = [beg, end];
					}
				}
			}
		},
	},
};
</script>
<style lang="scss" scoped>
.search-form {
	text-align: left;

	.iwidth80 {
		width: 80px !important;
		.el-input,
		.el-input-number {
			width: 80px !important;
		}
	}
	.iwidth96 {
		width: 96px !important;
		/deep/.el-input,
		/deep/ .el-input-number {
			width: 96px !important;
		}
	}
	.input-number {
		height: 32px;
		display: flex;
		align-items: center;
	}
	.collapse-button {
		padding: 0 !important;
		min-width: auto;
		&.active {
			display: none;
		}
	}
	.el-icon-arrow-down,
	.el-icon-arrow-up {
		margin-left: 8px;
	}
	.el-form-item {
		// margin-bottom: 16px !important;
	}
	.el-form-item__content {
		height: 32px;
	}
	.day-radio {
		margin-right: 5px;
		/deep/ .el-radio__label {
			padding-left: 5px;
		}
	}
	.month-radio {
		margin-right: 10px;
	}
	.radio-picker {
		width: 144px !important;
		/deep/.el-input__inner {
			padding-right: 0px;
		}
	}
	.radio-day-picker {
		/deep/ .el-input__inner {
			padding-right: 0px;
		}
	}
}
</style>
