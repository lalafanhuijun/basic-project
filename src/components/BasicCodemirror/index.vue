<!--
 * @Author: fanhuijun fanhuijun
 * @Date: 2024-09-03 20:16:18
 * @LastEditors: fanhuijun fanhuijun
 * @LastEditTime: 2024-09-03 21:03:36
 * @FilePath: /basic-project/src/components/BasicCodemirror/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div class="">
		<codemirror v-model="code" :options="options"></codemirror>
	</div>
</template>

<script>
// 文件内引入
import { codemirror } from "vue-codemirror";
// 引入样式、主题、代码风格等配置或样式文件
import "@/utils/cm-setting.js";
export default {
	name: "BasicCodemirror",
	// 注册使用
	components: {
		codemirror,
	},
	props: {
		code: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			// code: "",
			options: {
				line: true,
				// theme: "rubyblue", // 主题
				tabSize: 2, // 制表符的宽度
				indentUnit: 2, // 一个块应该缩进多少个空格（无论这在编辑语言中意味着什么）。默认值为 2。
				firstLineNumber: 1, // 从哪个数字开始计算行数。默认值为 1。
				readOnly: true, // 只读
				autorefresh: true,
				smartIndent: false, // 上下文缩进
				lineNumbers: true, // 是否显示行号
				styleActiveLine: true, // 高亮选中行
				viewportMargin: Infinity, //处理高度自适应时搭配使用
				showCursorWhenSelecting: true, // 当选择处于活动状态时是否应绘制游标
				// mode: "text/vue",
			},
		};
	},
};
</script>
