<!--
 * @Author: yangzhen
 * @Date: 2022-09-08 09:15:34
 * @LastEditTime: 2024-08-15 19:09:32
 * @LastEditors: fanhuijun fanhuijun
 * @Description: g-dialog组件重新封装
 * @FilePath: /fanqiedian/src/components/BasicDialog
-->
<template>
	<el-dialog
		:visible.sync="visible"
		:title="title"
		:before-close="beforeClose"
		fullscreen="false"
		modal="true"
		:custom-class="dialogWidth"
		modal-append-to-body="true"
		append-to-body="true"
		lock-scroll="true"
		show-close="true"
		destroy-on-close="true"
	>
		<slot></slot>
		<template v-slot:footer>
			<slot name="footer"></slot>
		</template>
		<template v-slot:title>
			<slot name="title"></slot>
		</template>
	</el-dialog>
</template>

<script>
export default {
	name: "BasicDialog",
	props: {
		visible: Boolean, // 对话框是否可见
		title: String, // 对话框标题
		size: String, // 对话框标题
		height: String, // 对话框标题
	},
	computed: {
		dialogWidth() {
			// 根据尺寸属性设置对话框宽度
			switch (this.size) {
				case "small":
					return "width-small";
				case "large":
					return "width-large";
				default:
					return "width-medium";
			}
		},
	},
	methods: {
		beforeClose(done) {
			this.$emit("update:visible", false);
			// 可以在此处添加 before-close 的逻辑
			this.$emit("beforeClose");
			done();
		},
	},
};
</script>

<style scoped>
/* 可以在此处添加自定义的样式 */
::v-deep .width-small {
	width: 480px !important;
	height: 320px;
}

::v-deep .width-large {
	width: 1040px !important;
	height: 590px;
}
::v-deep .width-medium {
	width: 800px !important;
	height: 480px;
}
</style>
