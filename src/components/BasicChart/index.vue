<template>
	<div class="chart">
		<div
			ref="chart"
			:class="{ 'opacity-0': loading || !hasData }"
			:style="{ height: height, width: width }"
		/>
		<div class="loading-box" v-loading="loading" v-if="loading">
			<!-- 1使用相关组件库的loading -->
			<!-- <van-loading /> -->
			<!-- 2使用自定义的Loading -->
			<!-- <div class="loading"></div> -->
		</div>
		<div v-if="!loading && !hasData" class="empty-box">
			<slot v-if="$slots.default"></slot>
			<div v-else class="empty-tip">
				<img src="" alt="" class="empty-bg" />
				<div class="tip">暂无数据</div>
			</div>
		</div>
	</div>
</template>
<script>
// import { Loading } from "vant";
import { addListener, removeListener } from "resize-detector"; //兼容性更好的resize监听
import { debounce } from "@/utils";
export default {
	name: "BasicChart",
	// components: { VanLoading: Loading },
	props: {
		width: {
			type: String,
			default: "100%",
		},
		height: {
			type: String,
			default: "350px",
		},
		autoResize: {
			type: Boolean,
			default: true,
		},
		chartOption: {
			type: Object,
			required: true,
		},
		type: {
			type: String,
			default: "canvas",
		},
		hasData: {
			type: Boolean,
			default: true,
		},
		loading: {
			type: Boolean,
			default: false,
		},
		flushClear: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			chart: null,
		};
	},
	watch: {
		chartOption: {
			deep: true,
			handler(newVal) {
				this.setOptions(newVal);
			},
		},
	},
	mounted() {
		this.initChart();
		if (this.autoResize) {
			addListener(this.$el, this.resizeHandler);
		}
	},
	beforeDestroy() {
		if (!this.chart) {
			return;
		}
		if (this.autoResize) {
			removeListener(this.$el, this.resizeHandler);
		}
		this.chart.dispose();
		this.chart = null;
	},
	methods: {
		resizeHandler: debounce(function () {
			//this存在
			this.chart.resize();
		}),
		initChart() {
			this.chart = this.$echarts.init(this.$refs.chart, "", {
				renderer: this.type,
			});
			this.chart.setOption(this.chartOption);
			this.chart.on("click", this.handleClick);
		},
		handleClick(params) {
			this.$emit("click", params);
		},
		setOptions(option) {
			this.flushClear && this.clearChart();
			this.resizeHandler();
			if (this.chart) {
				this.chart.setOption(option);
			}
		},
		refresh() {
			this.setOptions(this.chartOption);
		},
		clearChart() {
			this.chart && this.chart.clear();
		},
		setOption(option) {
			if (this.chart) {
				this.chart.setOption(option);
			}
		},
	},
};
</script>
<style scope lang="scss">
.chart {
	height: 100%;
	position: relative;
}
.loading-box {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	.loading {
		width: 30px;
		height: 30px;
		border: 2px solid #000;
		border-top-color: transparent;
		border-radius: 100%;
		animation: circle infinite 0.75s linear;
	}

	@keyframes circle {
		0% {
			transform: rotate(0);
		}
		100% {
			transform: rotate(360deg);
		}
	}
}
.empty-box {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.opacity-0 {
	opacity: 0;
}
</style>
