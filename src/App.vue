<!--
 * @Author: fanhuijun fanhuijun
 * @Date: 2024-08-15 14:48:25
 * @LastEditors: fanhuijun fanhuijun
 * @LastEditTime: 2024-09-03 21:02:10
 * @FilePath: /basic-project/src/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div id="app">
		<!-- <img alt="Vue logo" src="./assets/logo.png" />
		<HelloWorld msg="Welcome to Your Vue.js App" /> -->
		<router-view></router-view>
	</div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";

export default {
	name: "App",
	components: {
		// HelloWorld,
	},
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	/* text-align: center; */
	color: #2c3e50;
	height: 100%;
	/* margin-top: 60px; */
}
</style>
