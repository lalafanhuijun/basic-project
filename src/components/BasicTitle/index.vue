<!--
 * @Author: fanhuijun fanhuijun
 * @Date: 2023-09-13 10:12:27
 * @LastEditors: fanhuijun fanhuijun
 * @LastEditTime: 2024-09-03 20:02:21
 * @FilePath: /basic-project/src/components/BasicTitle/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div class="title-text" :class="{ border: border }">
		<div class="left-text">
			<span class="title-icon"></span>
			<span class="text">{{ title }}</span>
			<slot name="left"></slot>
		</div>
		<slot name="edit">
			<slot name="right"></slot>
		</slot>
	</div>
</template>

<script>
export default {
	name: "BasicTitle",
	props: {
		//标题信息
		title: {
			type: String,
			default: "",
		},
		border: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<style lang="scss" scoped>
/*二级标题区域*/

.title-text {
	height: 32px;
	//  border-bottom: $--border;
	display: flex;
	align-items: center;
	justify-content: space-between;

	margin-bottom: 16px;
	&.border {
		border-bottom: $--border;
		padding-bottom: 12px;
	}
	/*二级标题*/
	.left-text {
		font-size: 16px;
		font-weight: 700;
		display: flex;
		align-items: center;
	}
	.title-icon {
		width: 5px;
		height: 18px;
		margin-right: 16px;
		border-radius: 15px;
		display: inline-block;
		background: #409eff;
	}
	.text {
		color: #1c2623;
	}
}
</style>
