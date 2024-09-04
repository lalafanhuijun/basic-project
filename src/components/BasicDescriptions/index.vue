<!--
 * @Author: fanhj
 * @Date: 2022-04-08 17:17:34
 * @LastEditTime: 2024-09-03 21:59:11
 * @LastEditors: fanhuijun fanhuijun
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /fanqiedian/src/components/basic/hzwq-descriptions.vue
-->
<template>
	<el-descriptions
		:column="column"
		:size="size"
		:border="border"
		:colon="colon"
		:direction="direction"
		labelClassName="custom-descript-label"
		contentClassName="custom-descript-content"
	>
		<slot name="extra" slot="extra"></slot>
		<el-descriptions-item
			v-for="(item, index) in descriptionsItem"
			:label="item.label"
		>
			<basic-upload
				v-if="item.type && item.type === 'upload'"
				:disabled="true"
				:fileList="item.fileList"
				:type="item.uploadType"
			></basic-upload>
			<template v-else-if="item.type && item.type === 'select'">
				<span>{{ findNameByValue(item.options, item[item.prop]) }}</span>
			</template>
			<template v-else-if="item.type && item.type === 'radio'">
				<span>{{ findNameByValue(item.radios, item[item.prop]) }}</span>
			</template>
			<span v-else>
				{{ item[item.prop] || "--" }}
			</span>
		</el-descriptions-item>
	</el-descriptions>
</template>

<script>
export default {
	name: "BasicDescriptions",
	props: {
		//是否带有边框
		border: {
			type: Boolean,
			default: false,
		},
		//一行 Descriptions Item 的数量
		column: {
			type: Number,
			default: 3,
		},
		//是否显示冒号
		colon: {
			type: Boolean,
			default: false,
		},
		//排列的方向
		direction: {
			type: String,
			default: "horizontal",
		},
		//列表的尺寸
		size: {
			type: String,
			default: "medium", //medium / small / mini
		},
		descriptionsItem: {
			//[{label,prop}]
			type: Array,
			default: () => [],
		},
		descriptionsValue: {
			type: Object,
			default: () => {},
		},
	},
	watch: {
		descriptionsValue(val, oldVal) {
			this.descriptionsItem.forEach((item, index) => {
				if (this.descriptionsValue[item.prop])
					this.descriptionsItem[index][item.prop] =
						this.descriptionsValue[item.prop];
			});
		},
	},
	created() {
		this.descriptionsItem.forEach((item, index) => {
			if (this.descriptionsValue[item.prop])
				this.descriptionsItem[index][item.prop] =
					this.descriptionsValue[item.prop];
		});
	},
	methods: {
		findNameByValue(options, value) {
			let findIndex = options.findIndex((item) => value === item.value);
			let name = "";
			if (findIndex > -1) {
				name = options[findIndex].name;
			}
			return name;
		},
	},
};
</script>

<style lang="scss" scoped>
/deep/.custom-descript-label {
	line-height: 24px;
	color: #5f6563;
	text-align: right;
	min-width: 120px;
}
/deep/.custom-descript-content {
	line-height: 24px;
	color: #1c2623;
	.el-upload-list__item {
		line-height: 24px !important;
	}
}
</style>
