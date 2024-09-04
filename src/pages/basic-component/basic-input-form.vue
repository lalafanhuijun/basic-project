<template>
	<div class="pad24">
		<div id="codeText">
			<basic-form
				ref="demoForm"
				:editForm="editForm"
				:editFormData="editFormData"
			>
			</basic-form>
		</div>

		<el-button @click="cancelForm">取 消</el-button>
		<el-button type="primary" @click="saveForm">确 定</el-button>
		<basic-codemirror :code="code" class="pad24"></basic-codemirror>
	</div>
</template>

<script>
import { ref } from "vue";
export default {
	data() {
		return {
			//表单数据对象
			editFormData: {
				orgNo: null,
				consName: "",
				consType: "1",
				isIncludeCons: "00",
				isIncludeConsButton: "00",
				workStatement: "ceshi",
				consType1: ["1"],
				awardTime1: "",
				awardTime2: "",
				awardtime3: [
					new Date().getFullYear() + "-" + new Date().getMonth(),
					new Date().getFullYear() + "-" + new Date().getMonth(),
				],
			},
			//表单详情
			editForm: [
				{
					title: true,
					titleText: "基本信息",
				},
				{
					type: "treeSelect",
					label: "供电单位",
					prop: "orgNo",
					searchable: true,
					// rules: [{ required: true, message: '请选择供电单位', trigger: 'change' }]
				},
				{
					type: "input",
					label: "用户名称",
					prop: "consName",
					rules: [
						{ required: true, message: "请输入用户名称", trigger: "blur" },
						{
							min: 3,
							max: 5,
							message: "长度在 3 到 5 个字符",
							trigger: "blur",
						},
					],
				},
				{
					type: "select",
					label: "用户类型",
					prop: "consType",
					options: [
						{ name: "全部", code: "1" },
						{ name: "高压", code: "2" },
						{ name: "低压非居民", code: "3" },
						{ name: "低压居民", code: "4" },
					],
					disabled: false,
					rules: [
						{ required: true, message: "请选择用户类型", trigger: "change" },
					],
				},
				{
					title: true,
					titleText: "附件信息",
				},
				{
					type: "upload",
					label: "上传图片",
					prop: "fileList1",
					uploadType: "picture",
					fileList: [],
					accept: ".jpg, .jpeg, .png, .pdf, .doc, .docx",
					limit: 10,
					rules: [{ required: true, trigger: "change" }],
				},
				{
					type: "upload",
					label: "添加附件",
					prop: "fileList",
					fileList: [],
					accept: ".jpg, .jpeg, .png, .pdf, .doc, .docx",
					limit: 10,
					rules: [{ required: true, trigger: "change" }],
				},
				{
					type: "radio",
					label: "异常用户",
					prop: "isIncludeCons",
					radios: [
						{
							value: "00",
							name: "已明确",
						},
						{
							value: "01",
							name: "未明确",
						},
					],
					change: this.isIncludeConsChange,
				},
				{
					type: "radioButton",
					label: "异常用户",
					prop: "isIncludeConsButton",
					radios: [
						{
							value: "00",
							name: "已明确",
						},
						{
							value: "01",
							name: "未明确",
						},
					],
					change: this.isIncludeConsChange,
				},
				{
					type: "textarea",
					label: "任务要求",
					prop: "workStatement",
					rules: [
						{ required: true, message: "请输入任务要求", trigger: "blur" },
					],
				},
				{
					type: "checkbox",
					label: "用户类型",
					prop: "consType1",
					checkboxs: [
						{ name: "全部", value: "1" },
						{ name: "高压", value: "2" },
						{ name: "低压非居民", value: "3" },
						{ name: "低压居民", value: "4" },
					],
					change: this.isIncludeConsChange,
				},
				{ type: "daterange", label: "查询时间", prop: "awardTime2" },
				{
					type: "datetimerange",
					label: "查询时间",
					prop: "awardTime1",
					valueFormat: "yyyy-MM-dd",
				},
				{
					type: "monthrange",
					label: "查询月份",
					prop: "awardtime3",
					valueFormat: "yyyy-MM",
				},
			],
			drawerVisible: false,
			code: "",
		};
	},
	created() {
		this.code = ref(
			`<basic-form\n	ref="demoForm2"\n	:editForm="editForm"\n	:editFormData="editFormData">\n</basic-form>`
		);
	},
	methods: {
		//radio change时触发事件，与select写法一致
		isIncludeConsChange(val) {
			console.log(val);
		},
		addClick() {
			this.drawerVisible = true;
		},
		async saveForm() {
			//表单提交前进行表单校验
			let saveFlag = this.$refs.demoForm2.submitForm();
			if (!saveFlag) {
				return;
			}
			//uploadFiles上传文件接口已在组件中封装，直接调用对应prop的方法;接口成功返回数组，失败返回false
			const uploadFileList = await this.$refs.demoForm2.uploadFiles("fileList");
			console.log("保存数据---", uploadFileList);
			// this.drawerVisible = false;
		},
		cancelForm() {
			//重置表单信息
			this.$refs.demoForm2.resetForm();
			this.drawerVisible = false;
		},
		//表格超出宽度鼠标悬停显示td内容
	},
};
</script>

<style></style>
