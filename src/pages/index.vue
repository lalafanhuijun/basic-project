<!--
 * @Author: fanhuijun fanhuijun
 * @Date: 2024-08-15 17:06:19
 * @LastEditors: fanhuijun fanhuijun
 * @LastEditTime: 2024-09-03 18:58:50
 * @FilePath: /basic-project/src/pages/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<div class="h100 main-wrapper flex-row">
		<!-- <basic-title title="111"></basic-title> -->
		<div class="menu">
			<el-menu
				router
				:default-active="this.$router.path"
				class="el-menu-vertical-demo"
				@open="handleOpen"
				@close="handleClose"
			>
				<template v-for="(item, index) in menus" :index="item.menuNo">
					<el-submenu :index="item.menuNo" v-if="item.hasChildren">
						<template slot="title">
							<i class="el-icon-menu"></i>
							<span>{{ item.menuName }}</span>
						</template>

						<el-menu-item
							:index="`/${cItem.path}`"
							:key="cItem.menuNo"
							v-for="(cItem, cIndex) in item.children"
						>
							{{ cItem.menuName }}</el-menu-item
						>
					</el-submenu>
					<el-menu-item :index="`/${item.path}`" v-else
						><i class="el-icon-menu"></i
						><span slot="title">{{ item.menuName }}</span></el-menu-item
					>
				</template>
			</el-menu>
		</div>
		<div class="content flex1-row">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>
	</div>
</template>

<script>
import { getMenus } from "@/api/index/menus.js";
export default {
	data() {
		return {
			menus: [],
		};
	},
	created() {
		this.getMenus();
	},
	methods: {
		handleOpen() {},
		handleClose() {},
		getMenus() {
			getMenus()
				.then((res) => {
					if (res.code === 0) {
						this.menus = res.data;
					}
				})
				.catch((err) => {
					console.log(err);
				});
		},
	},
};
</script>

<style lang="scss" scoped>
.main-wrapper {
	display: flex;
}
.menu {
	width: 15%;
	height: 100%;
	.el-menu {
		height: 100%;
	}
}
.content {
	overflow: auto;
}
</style>
