<!--
 * @Author: fanhuijun fanhuijun
 * @Date: 2024-08-16 15:28:33
 * @LastEditors: fanhuijun fanhuijun
 * @LastEditTime: 2024-09-03 19:47:10
 * @FilePath: /basic-project/src/pages/basic-component/basic-search-form.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div class="pad24">
		<basic-search
			ref="searchForm"
			size="small"
			:searchForm="searchForm"
			:searchCustomForm="searchCustomForm"
			:searchData="searchData"
			:isSearchCollapse="isSearchCollapse"
			@handleSearch="handleSearch"
			@getTableList="getTableList"
		>
			<slot
				v-for="item in searchCustomForm"
				:name="item.slotName"
				:slot="item.slotName"
			>
				<el-input></el-input>
			</slot>
		</basic-search>
		<div>
			<span>查询数据</span>
			{{ searchData }}
		</div>
	</div>
</template>

<script>
import Vue from "vue";
export default {
	data() {
		return {
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
				hyId: null,
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
					options: [],
				},
				{
					type: "treeSelect",
					label: "行业",
					prop: "hyId",
					searchable: true,
					options: [],
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
			isSearchCollapse: true,
		};
	},
	methods: {
		//查询
		handleSearch(flag) {
			//   this.queryClueList();
		},
		getTableList(params) {},
	},
};
</script>

<style></style>
