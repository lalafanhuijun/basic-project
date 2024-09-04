<template>
	<div>
		<el-drawer
			:visible.sync="drawerVisible"
			:title="title"
			:append-to-body="appendToBody"
			:direction="direction"
			:modal="modal"
			:show-close="showClose"
			:size="size"
			:before-close="beforeClose"
			:destroy-on-close="destroyOnClose"
			:modal-append-to-body="modalAppendToBody"
			:style="drawerStyle"
			:custom-class="customDrawer"
			:close-on-press-escape="closeOnPressEscape"
			:wrapperClosable="wrapperClosable"
		>
			<slot name="title" slot="title"></slot>
			<div :class="{ 'margin-footer': withFooter }">
				<slot />
			</div>

			<div class="drawer-footer" v-if="withFooter">
				<slot name="footer"></slot>
			</div>
		</el-drawer>
	</div>
</template>

<script>
export default {
	name: "BasicDrawer",
	props: {
		//Drawer 自身是否插入至 body 元素上。嵌套的 Drawer 必须指定该属性并赋值为 true
		appendToBody: {
			type: Boolean,
			default: false,
		},
		//是否显示 Drawer
		visible: {
			type: Boolean,
			default: false,
		},
		//Drawer 的标题，也可通过具名 slot （见下表）传入
		title: {
			type: String,
			default: "",
		},
		//控制是否显示 header 栏, 默认为 true, 当此项为 false 时, title attribute 和 title slot 均不生效
		withHeader: {
			type: Boolean,
			default: true,
		},
		//控制是否显示 footer 栏
		withFooter: {
			type: Boolean,
			default: false,
		},
		modal: {
			type: Boolean,
			default: false,
		},
		//Drawer 打开的方向
		direction: {
			type: String,
			default: "rtl",
		},
		modalAppendToBody: {
			type: Boolean,
			default: false,
		},
		//是否显示关闭按钮
		showClose: {
			type: Boolean,
			default: true,
		},
		size: {
			type: String,
			default: "100%",
		},
		//控制是否在关闭 Drawer 之后将子元素全部销毁
		destroyOnClose: {
			type: Boolean,
			default: true,
		},
		drawerStyle: {
			type: String,
			default: "position: absolute;",
		},
		customDrawer: {
			type: String,
			default: "custom-drawer",
		},
		//是否可以通过按下 ESC 关闭 Drawer
		closeOnPressEscape: {
			type: Boolean,
			default: true,
		},
		//点击遮罩层是否可以关闭 Drawer
		wrapperClosable: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {};
	},
	computed: {
		drawerVisible: {
			get() {
				return this.visible;
			},
			set(val) {
				console.log(val);
				this.$emit("update:visible", val); // openCardDialog改变的时候通知父组件
			},
		},
	},
	methods: {
		beforeClose(done) {
			// 关闭前回调
			this.$emit("beforeClose");
			this.$nextTick(() => {
				done();
			});
		},
	},
};
</script>

<style lang="scss" scoped>
/deep/.custom-drawer {
	position: relative;
	.el-drawer__header {
		color: #1c2623;
		margin-bottom: 0;
		// font-size: 16px;
		font-weight: bold;
		padding: 10px 20px;
		border-bottom: 1px solid #e2e2e2;
	}
	.el-drawer__body {
		padding: 0 16px;
		// margin-bottom: 52px;
		display: flex;
		flex-direction: column;
		overflow: auto;
	}
	.drawer-footer {
		position: absolute;
		// margin: 0 16px;
		padding: 10px 20px;
		width: 100%;
		z-index: 9999;
		bottom: 0;
		right: 0;
		background: white;
		text-align: right;
		box-shadow: 0px -2px 4px rgba(163, 163, 163, 0.16);
	}
	.margin-footer {
		margin-bottom: 68px;
	}
}
</style>
