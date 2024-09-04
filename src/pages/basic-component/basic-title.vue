<!--
 * @Author: fanhuijun fanhuijun
 * @Date: 2024-08-16 15:29:10
 * @LastEditors: fanhuijun fanhuijun
 * @LastEditTime: 2024-09-03 19:58:32
 * @FilePath: /basic-project/src/pages/basic-component/basic-title.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<basic-title title="标题">
		<div class="button-area" slot="left">左侧slot</div>
		<div slot="edit" class="flex-row-vcenter">
			<div class="button-area" slot="right">右侧slot</div>
		</div>
	</basic-title>
</template>

<script>
export default {};
</script>

<style></style>
