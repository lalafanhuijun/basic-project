<!--
 * @Author: fanhuijun fanhuijun
 * @Date: 2024-09-03 21:52:01
 * @LastEditors: fanhuijun fanhuijun
 * @LastEditTime: 2024-09-03 22:06:26
 * @FilePath: /basic-project/src/pages/basic-component/basic-descriptions.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div class="pad24 card-content">
		<basic-descriptions
			:descriptionsItem="descriptionsItem"
			:descriptionsValue="descriptionsValue"
		></basic-descriptions>
	</div>
</template>

<script>
export default {
	data() {
		return {
			descriptionsItem: [
				{ label: "检查人员", prop: "entourage" },
				{ label: "检查时间", prop: "chkTime" },
				{ label: "检查结果", prop: "chkResult" },
				{ label: "备案部门", prop: "bEntourage" },
				{ label: "备案时间", prop: "bTime" },
				{ label: "备案说明", prop: "bResult" },
				{
					label: "用电工作检查单",
					prop: "worksheet",
					fileList: [{ fileName: "文件1" }, { fileName: "文件1" }],
					type: "upload",
				},
			],
			descriptionsValue: {
				entourage: "测试人员",
				chkTime: "2024-08-01",
				chkResult: "不通过",
				worksheet: [],
				bEntourage: "",
				bTime: "",
				bResult: "",
			},
		};
	},
};
</script>

<style lang="scss" scoped>
.card-content {
	margin: 24px;
	padding: 24px;
	background: #fff;
	border-radius: 8px;
}
</style>
