<!--
 * 基础柱状图
-->
<template>
	<div>
		<basic-chart
			:chart-option="echartsOption"
			:has-data="hasData"
			:auto-resize="true"
			class="chart1-bar"
			:height="height"
			:width="width"
		>
		</basic-chart>
	</div>
</template>

<script>
export default {
	name: "BasicPie",
	props: {
		//图表数据
		seriesData: {
			type: Array,
			default: () => [],
		},
		//多条数据名称
		legendData: {
			type: Array,
			default: () => [],
		},
		legendConfig: {
			type: Object,
			default: () => {},
		},
		//颜色
		color: {
			type: Array,
			default: () => [
				"#3AA1FF",
				"#4ECB73",
				"#36CBCB",
				"#FBD437",
				"#5254CF",
				"#F2637B",
				"#A97BE9",
				"#F2E870",
			],
		},
		//标题
		title: {
			type: String,
			default: "",
		},
		//副标题
		subText: {
			type: String,
			default: "",
		},
		//半径长度
		radius: {
			type: Array,
			default: () => ["35%", "55%"],
		},
		width: {
			type: String,
			default: "100%",
		},
		height: {
			type: String,
			default: "350px",
		},
		semiCircle: {
			type: Boolean,
			default: false,
		},
		center: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		const _this = this;
		return {
			echartsOption: {
				// graphic: [
				// 	{
				// 		type: "text",
				// 		left: "center",
				// 		top: "center",
				// 		style: {
				// 			fill: "#333333",
				// 			text: _this.title,
				// 			textAlign: "center",
				// 			fontSize: 14,
				// 			textVerticalAlign: "middle",
				// 		},
				// 	},
				// ],
				title: {
					text: _this.title, //主标题文本，
					subtext: _this.subText,
					textStyle: {
						//主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
						// fontSize: 14,
						// color: "#409EFF",
					},
					x: "center",
					y: _this.center ? "center" : "",
				},
				legend: {
					show: true,
					icon: "circle",
					itemWidth: 10, //图例图标宽度
					bottom: 0,
				},
				color: _this.color,
				tooltip: { trigger: "item" },
				series: [
					{
						type: "pie",
						radius: _this.radius,
						label: {
							normal: {
								formatter: "{d}%",
								textStyle: {
									fontWeight: "normal",
									fontSize: 12,
								},
							},
						},

						data: [],
					},
				],
			},
			hasData: true,
		};
	},
	//监听数据变化重新赋值
	watch: {
		seriesData: {
			handler(nVal, oVal) {
				this.echartsOption.series[0].data = nVal;
			},
			immediate: true,
		},
	},
	created() {
		this.echartsOption.legend = Object.assign(
			this.echartsOption.legend,
			this.legendConfig
		);
		if (this.semiCircle) {
			this.echartsOption.series[0].center = ["50%", "70%"];
			this.echartsOption.series[0].startAngle = 180;
			this.echartsOption.series[0].endAngle = 360;
		}
	},
	methods: {},
};
</script>

<style></style>
