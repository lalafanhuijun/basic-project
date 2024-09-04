<!--
 * @Author: fanhuijun fanhuijun
 * @Date: 2023-09-13 10:12:26
 * @LastEditors: fanhuijun fanhuijun
 * @LastEditTime: 2024-08-16 18:38:44
 * @FilePath: /basic-project/src/components/BasicTabs/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
    列表页页签组件
 -->
<template>
	<el-tabs v-model="activeName" @tab-click="tabClick" class="eas-tabs">
		<el-tab-pane
			v-for="(tab, index) in tabList"
			:label="tab.label"
			:name="tab.name"
			:key="index"
		/>
	</el-tabs>
</template>

<script>
export default {
	name: "BasicTabs",
	props: {
		tabList: {
			type: Array,
			default: () => [],
		},
		activeName: {
			type: String,
			default: "",
		},
	},
	created() {},
	methods: {
		tabClick(tab, event) {
			this.$emit("tabClick", tab, event);
		},
	},
};
</script>

<style lang="scss" scoped>
.eas-tabs {
	background: #fff;
	box-shadow: 0px -1px 8px 1px rgba(3, 43, 36, 0.08);
	border-radius: 8px 8px 0 0;
	/deep/.el-tabs__header {
		margin: 0;
		.el-tabs__nav-wrap::after {
			height: 1px;
		}
	}
}
</style>
