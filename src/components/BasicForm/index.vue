<template>
	<div class="edit-form">
		<el-form
			class="basic-form"
			:class="{ 'desc-edit-form': !isEdit }"
			ref="editForm"
			:model="editFormData"
			:size="size"
			:inline="inline"
			:label-width="labelWidth"
			:rules="isEdit ? rules : {}"
			:disabled="disabled"
			:hide-required-asterisk="hideRequiredAsterisk"
		>
			<template v-for="item in editForm">
				<el-form-item
					v-if="
						item.isShow === undefined
							? getOptionsShow(item, editFormData)
							: item.isShow
					"
					:label="item.label"
					:prop="item.prop"
					:key="item.prop"
					class="formItem"
					:class="[
						{
							'title-item-content': item.title,
							'file-item-content': item.type === 'upload',
							'textarea-item-content': item.type === 'textarea',
							'unit-item-content': item.text,
							'slot-item-content': item.slot,
						},
						item.className,
					]"
					:style="{ margin: item.title ? '0 !important' : '' }"
				>
					<!-- 不可编辑 -->
					<template v-if="(!isEdit && !item.slot) || item.isEdit">
						<span
							v-if="
								item.type === 'daterange' ||
								item.type === 'monthrange' ||
								item.type === 'datetimerange'
							"
						>
							{{
								` ${editFormData[item.prop][0] || ""}    至    ${
									editFormData[item.prop][1] || ""
								}`
							}}
						</span>
						<template v-else-if="item.title">
							<basic-title :titleText="item.titleText"></basic-title>
						</template>
						<basic-upload
							v-else-if="item.type === 'upload'"
							:disabled="true"
							:fileList="editFormData[item.prop]"
							:type="item.uploadType"
						></basic-upload>
						<template
							v-else-if="['radioButton', 'radio', 'select'].includes(item.type)"
						>
							<span>{{
								findNameByValue(item.options, editFormData[item.prop])
							}}</span>
						</template>
						<template v-else-if="['switch'].includes(item.type)">
							<span>{{ findNameBySwitch(item, editFormData[item.prop]) }}</span>
						</template>
						<template v-else-if="['checkbox'].includes(item.type)">
							<span>{{
								findNameByCheckBox(item.options, editFormData[item.prop])
							}}</span>
						</template>
						<div
							v-else
							:class="{
								'default-textarea-not':
									item.type === 'textarea' && editFormData[item.prop],
							}"
						>
							{{ editFormData[item.prop] }}
						</div>
					</template>
					<template v-else>
						<!-- <org-select
							v-if="item.type === 'orgSelect'"
							v-model="defaultOrgNo[item.prop]"
							:dirFlag="item.dirFlag"
							:mgt-org-type="'mgtorg'"
							:append-to-body="true"
							:ref="`${item.prop}Org`"
							:placeholder="item.placeholder || `请选择`"
							@on-input-change="(data) => selectTreeOption(data, item)"
							:clearable="false"
							:disabled="item.disabled"
							:multiple="item.multiple"
							class="org-select-disabled"
						></org-select> -->

						<!-- 输入框 -->
						<el-input
							v-if="analyzeInput(item)"
							v-model.trim="editFormData[item.prop]"
							:size="size"
							:disabled="item.disabled"
							:maxlength="item.maxlength"
							:placeholder="item.placeholder || `请输入`"
							:style="{ width: item.width }"
							@blur="
								(event) => {
									formItemChange(event.target.value, item);
								}
							"
							class="w260"
						></el-input>
						<!-- 输入框 -->
						<el-input-number
							:size="size"
							v-if="item.type === 'inputNum'"
							v-model="editFormData[item.prop]"
							controls-position="right"
							:controls="false"
							:min="item.min"
							:max="item.max"
							:step="item.step"
							:disabled="item.disabled"
							:precision="item.precision"
							:class="{
								'input-aligh-left': item.placeholder,
								iwidth100: item.width === 100,
								iwidth80: item.width === 80,
							}"
							:placeholder="item.placeholder || `请输入`"
							@change="
								(value) => {
									formItemChange(value, item);
								}
							"
						>
						</el-input-number>
						<!-- 限制输入框 -->
						<el-input
							v-else-if="item.type === 'textarea'"
							type="textarea"
							resize="none"
							:disabled="item.disabled"
							:placeholder="item.placeholder || `请输入`"
							v-model.trim="editFormData[item.prop]"
							:rows="item.rows ? item.rows : 5"
							:maxlength="item.maxlength ? item.maxlength : 200"
							show-word-limit
							@change="
								(value) => {
									formItemChange(value, item);
								}
							"
							class="w400"
						>
						</el-input>
						<!-- 数据字典下拉框 -->
						<code-select
							v-if="item.type === 'codeSelect'"
							v-model="editFormData[item.prop]"
							:searchable="false"
							:clearable="false"
							:disabled="item.disabled"
							:codeClsType="item.codeClsType"
							:selectSize="size"
							:append-to-body="true"
							:hideOptions="item.hideOptions"
							@on-select="(data) => selectCodeOption(data, item)"
						></code-select>
						<!-- 下拉框 -->
						<el-select
							ref="select"
							:multiple="item.multiple"
							:collapse-tags="item.multiple"
							v-else-if="item.type === 'select'"
							v-model="editFormData[item.prop]"
							:size="size"
							:disabled="item.disabled"
							:placeholder="item.placeholder || `请选择`"
							:clearable="item.clearable || false"
							@visible-change="
								(value) => {
									formItemVisibleChange(value, item);
								}
							"
							@change="
								(value) => {
									formItemChange(value, item);
								}
							"
							:style="{ width: item.width }"
							class="w260"
						>
							<el-option
								v-for="op in item.options"
								:label="op.name"
								:value="op.code"
								:key="op.code"
							></el-option>
						</el-select>
						<!-- 单选 -->
						<el-radio-group
							v-else-if="item.type === 'radio'"
							v-model="editFormData[item.prop]"
							:disabled="item.disabled"
							@change="
								(value) => {
									formItemChange(value, item);
								}
							"
							class="w260"
						>
							<el-radio
								v-for="ra in item.options"
								:label="ra.code"
								:key="ra.code"
								>{{ ra.name }}</el-radio
							>
						</el-radio-group>
						<!-- 单选按钮 -->
						<el-radio-group
							v-else-if="item.type === 'radioButton'"
							v-model="editFormData[item.prop]"
							:disabled="item.disabled"
							@change="
								(value) => {
									formItemChange(value, item);
								}
							"
						>
							<el-radio-button
								v-for="ra in item.options"
								:label="ra.code"
								:key="ra.code"
								>{{ ra.name }}</el-radio-button
							>
						</el-radio-group>
						<!-- 复选框 -->

						<el-checkbox-group
							v-else-if="item.type === 'checkbox'"
							v-model="editFormData[item.prop]"
							:disabled="item.disabled"
							@change="
								(value) => {
									formItemChange(value, item);
								}
							"
							class="w260"
						>
							<el-checkbox
								v-for="ch in item.options"
								:label="ch.code"
								:key="ch.code"
								>{{ ch.name }}</el-checkbox
							>
						</el-checkbox-group>
						<!-- 日期 -->
						<el-date-picker
							ref="datePicker"
							v-else-if="item.type === 'datePicker'"
							class="w260"
							v-model="editFormData[item.prop]"
							:disabled="item.disabled"
							:type="item.dateType"
							:placeholder="item.placeholder || `请选择日期`"
							:format="item.format"
							:value-format="item.valueFormat || 'yyyy-MM-dd'"
							:picker-options="item.pickerOptions"
							:clearable="item.clearable == undefined ? true : item.clearable"
							@change="
								(value) => {
									formItemChange(value, item);
								}
							"
						></el-date-picker>
						<!-- 日期范围 -->
						<el-date-picker
							ref="daterange"
							v-else-if="item.type === 'daterange'"
							type="daterange"
							class="w260"
							v-model="editFormData[item.prop]"
							:disabled="item.disabled"
							range-separator="~"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							:default-time="['00:00:00', '00:00:00']"
							:format="item.format"
							:value-format="item.valueFormat || 'yyyy-MM-dd'"
							:picker-options="item.pickerOptions"
							:clearable="item.clearable == undefined ? true : item.clearable"
							@change="
								(value) => {
									formItemChange(value, item);
								}
							"
						>
						</el-date-picker>
						<!-- 月份范围 -->
						<el-date-picker
							ref="monthrange"
							v-else-if="item.type === 'monthrange'"
							class="w260"
							v-model="editFormData[item.prop]"
							type="monthrange"
							:disabled="item.disabled"
							range-separator="~"
							start-placeholder="开始月份"
							end-placeholder="结束月份"
							:format="item.format"
							:value-format="item.valueFormat || 'yyyy-MM'"
							:picker-options="item.pickerOptions"
							:clearable="item.clearable == undefined ? true : item.clearable"
							@change="
								(value) => {
									formItemChange(value, item);
								}
							"
						>
						</el-date-picker>
						<!-- 日期时间范围 -->
						<el-date-picker
							ref="datetimerange"
							v-else-if="item.type === 'datetimerange'"
							class="w260"
							type="datetimerange"
							v-model="editFormData[item.prop]"
							:disabled="item.disabled"
							range-separator="~"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							:format="item.format"
							:value-format="item.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
							:picker-options="item.pickerOptions"
							:clearable="item.clearable == undefined ? true : item.clearable"
							@change="
								(value) => {
									formItemChange(value, item);
								}
							"
						></el-date-picker>

						<!-- 滑块 -->
						<el-slider
							v-else-if="item.type === 'slider'"
							v-model="editFormData[item.prop]"
							:disabled="item.disabled"
						></el-slider>
						<!-- 开关 -->
						<el-switch
							v-else-if="item.type === 'switch'"
							v-model="editFormData[item.prop]"
							:disabled="item.disabled"
							:active-value="item.activeValue"
							:inactive-value="item.inactiveValue"
							@change="
								(value) => {
									formItemChange(value, item);
								}
							"
						></el-switch>
						<!-- 文件上传 -->
						<basic-upload
							v-else-if="item.type === 'upload'"
							:ref="item.prop"
							:type="item.uploadType"
							:disabled="item.disabled"
							:accept="item.accept"
							:limit="item.limit"
							:url="item.url"
							:file-list="item.fileList"
							:maxSize="item.maxSize"
							:fileClass="item.fileClass"
							:listType="item.listType"
							class="w400"
							@uploadFilesChange="
								(files) => {
									uploadFilesChange(files, item.prop);
								}
							"
						>
						</basic-upload>
						<span v-else-if="item.type === 'text'">{{
							editFormData[item.prop]
						}}</span>
						<!-- 插槽：实现自定义内容，例如表格等信息 -->
						<template v-else-if="item.slot">
							<slot :name="item.prop" :data="editFormData"></slot>
						</template>
					</template>

					<!-- 标题 -->
					<template v-if="item.title">
						<basic-title :title="item.titleText"></basic-title>
					</template>
					<!-- 输入框等后有单位等文字 -->
					<span v-if="item.text" style="margin-left: 6px" class="unit-text">{{
						item.text
					}}</span>
					<slot :name="item.prop + 'End'"></slot>
				</el-form-item>
			</template>

			<slot name="custom"></slot>
			<slot name="footer"></slot>
		</el-form>
	</div>
</template>

<script>
export default {
	name: "BasicForm",
	props: {
		//表单域标签的宽度
		labelWidth: {
			type: String,
			default: "130px",
		},
		//是否隐藏必填字段的标签旁边的红色星号
		hideRequiredAsterisk: {
			type: Boolean,
			default: false,
		},
		//用于控制该表单内组件的尺寸
		size: {
			type: String,
			default: "small",
		},
		//行内表单模式
		inline: {
			type: Boolean,
			default: false,
		},
		//表单项
		editForm: {
			type: Array,
			default: () => [],
		},
		editFormData: {
			type: Object,
			default: () => {},
		},
		//是否禁用该表单内的所有组件
		disabled: {
			type: Boolean,
			default: false,
		},
		//该表单内的所有组件是否以文本展示
		isEdit: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			orgNoTreeData: [],
			shows: [],
			defaultOrgNo: {}, //供电单位树绑定值
		};
	},
	computed: {
		/** 解析表单的正则验证***/
		rules() {
			let rules = this.editForm.reduce((map, i) => {
				if (i.rules) {
					map[i.prop] = i.rules;
				}
				return map;
			}, {});
			return rules;
		},
	},
	async created() {
		this.editForm.forEach((item) => {
			if (item.type === "orgSelect") {
				if (item.multiple) {
					this.$set(this.defaultOrgNo, item.prop, []);
				} else {
					this.$set(this.defaultOrgNo, item.prop, "");
				}
				this.queryOrgTree(item);
			}
		});
		/** 解析表单项的显示/隐藏条件***/
		this.shows = this.editForm.reduce((map, i) => {
			if (i.show) {
				i.show.forEach((sItem) => {
					if (map[sItem.targetProp]) {
						map[sItem.targetProp].push({
							prop: i.prop,
							data: this.editFormData[i.prop],
						});
					} else {
						map[sItem.targetProp] = [
							{ prop: i.prop, data: this.editFormData[i.prop] },
						];
					}
				});
			}
			return map;
		}, {});
	},
	mounted() {
		const _this = this;
		const files = this.editForm.filter((item, index) => {
			if ("upload" === item.type) {
				if (
					_this.editForm[index].rules &&
					_this.editForm[index].rules.length !== 0
				) {
					_this.editForm[index].rules[0].validator = (
						rule,
						value,
						callback
					) => {
						if (_this.$refs[item.prop][0].newFileList.length > 0) {
							callback();
						} else {
							callback(new Error(`请上传${item.label}`));
						}
					};
				}
			}
		});
		console.log(files);
	},

	methods: {
		analyzeInput(item) {
			let type = item.type;
			if (type) {
				if (type === "input") {
					return true;
				}
				if (type === "inputNum") {
					return false;
				}
				if (type.indexOf("input") > -1) {
					let maxLength = type.substr("input".length);
					if (!isNaN(Number(maxLength, 10))) {
						item.maxlength = maxLength;
						return true;
					} else {
						console.error(`${type}格式错误`);
					}
				}
			}
			return false;
		},
		/**
		 * @description:
		 * @param {*} showArr
		 * @param {*} row
		 * @return {*}
		 */
		getOptionsShow(formItem, row) {
			let isShow = true;
			const showArr = formItem.show;
			if (showArr && showArr.length > 0) {
				for (let i = 0; i < showArr.length; i++) {
					const oItem = showArr[i];
					if (oItem.condition === "includes") {
						//包含
						if (oItem.value.includes(row[oItem.targetProp])) {
							isShow = true;
						} else {
							isShow = false;
						}
					} else if (oItem.condition === "equal") {
						//等于
						if (row[oItem.targetProp] === oItem.value) {
							isShow = true;
						} else {
							isShow = false;
						}
					} else if (oItem.condition === "notEqual") {
						//不等于
						if (row[oItem.targetProp] !== oItem.value) {
							isShow = true;
						} else {
							isShow = false;
						}
					} else if (oItem.condition === "lessThan") {
						//小于
						if (row[oItem.targetProp] < oItem.value) {
							isShow = true;
						} else {
							isShow = false;
						}
					} else if (oItem.condition === "greaterThan") {
						//大于
						if (row[oItem.targetProp] > oItem.value) {
							isShow = true;
						} else {
							isShow = false;
						}
					} else if (oItem.condition === "intersection") {
						//交集
						isShow = false;
						for (let item of row[oItem.targetProp]) {
							if (oItem.value.includes(item)) {
								isShow = true;
								break;
							} else {
								isShow = false;
							}
						}
					}
					if (!isShow) {
						break;
					}
				}
			}
			// if (!isShow) {
			//   if (formItem.type === "upload") {
			//     if (this.$refs[formItem.prop] && this.$refs[formItem.prop].length > 0) {
			//       this.$refs[formItem.prop][0].deleteFile();
			//     }
			//   }
			// }
			return isShow;
		},
		// 初始化单位树
		queryOrgTree(orgNoObj) {
			const orgObj = this.$easUtil.setCurrentOrg();
			let currentOrg = orgObj.orgNo;
			if (orgNoObj.multiple) {
				if (
					this.editFormData[orgNoObj.prop] &&
					this.editFormData[orgNoObj.prop].length > 0
				) {
					currentOrg = this.editFormData[orgNoObj.prop].map((item) => {
						return { mgtOrgCode: item };
					});
				} else {
					currentOrg = [{ mgtOrgCode: orgObj.orgNo }];
				}
			} else {
				if (this.editFormData[orgNoObj.prop]) {
					currentOrg = this.editFormData[orgNoObj.prop];
				} else {
					currentOrg = orgObj.orgNo;
				}
			}

			this.defaultOrgNo[orgNoObj.prop] = currentOrg;
			orgNoObj.dirFlag = orgObj.dirFlag;
			this.editFormData[orgNoObj.prop] = currentOrg;
		},
		/**
		 * @description: 单位树选中值
		 * @param {*} data
		 * @return {*}
		 */
		selectTreeOption(data, item) {
			if (item.multiple) {
				this.editFormData[item.prop] = data.map((item) => item.split("-")[0]);
			} else {
				this.defaultOrgNo[item.prop] = data;
				this.editFormData[item.prop] = data?.split("-")[0] || "";
			}
		},
		/**
		 * @description: 数据字典下拉框选中值
		 * @return {*}
		 */
		selectCodeOption(data, item) {
			this.editFormData[item.prop] = data.code;
			this.$refs.editForm.validateField(item.prop);
		},
		/** 加载子节点数据 **/
		// loadOptions({ action, parentNode, callback }) {
		// 	if (action === LOAD_CHILDREN_OPTIONS) {
		// 		let params = {
		// 			pid: parentNode.id,
		// 		};
		// 		queryOrgTree(params).then((res) => {
		// 			if (res.data.length === 0) {
		// 				this.$delete(parentNode, "children");
		// 			} else {
		// 				parentNode.children = res.data;
		// 			}
		// 			callback();
		// 		});
		// 	}
		// },
		//文件上传校验
		uploadFilesChange(files, prop) {
			// this.editFormData[prop] = files;
			console.log(files);
			this.$refs.editForm.validateField(prop);
		},
		//附件上传
		async uploadFiles(prop, callback) {
			if (this.$refs[prop]) {
				this.$refs[prop][0].uploadFiles((res) => {
					this.$emit("uploadFileFinish", res);
					callback(res);
				});
			}
		},
		findNameByValue(options, code) {
			let findIndex = options.findIndex((item) => code === item.code);
			let name = "";
			if (findIndex > -1) {
				name = options[findIndex].name;
			}
			return name;
		},
		findNameBySwitch(item, code) {
			let name = "是";
			if (code === item.inactiveValue) {
				name = "否";
			}
			return name;
		},
		findNameByCheckBox(options, code) {
			let name = [];
			code.map((item) => {
				name.push(options.find((oItem) => oItem.code === item).name);
			});
			return name.join(",");
		},
		formItemVisibleChange(value, item) {
			if (item.type === "select" && item.multiple && value) {
				item.options.sort((a, b) => {
					const aIndex = this.editFormData[item.prop].indexOf(a.code);
					const bIndex = this.editFormData[item.prop].indexOf(b.code);
					return bIndex - aIndex;
				});
			}
		},
		/**
		 * @description: 表单项值发生变更时触发事件
		 * @param {*} value
		 * @param {*} item
		 * @return {*}
		 */
		formItemChange(value, item) {
			const showsItem = this.shows[item.prop];
			if (showsItem) {
				showsItem.forEach((item) => {
					this.editFormData[item.prop] = item.data;
				});
			}
			if (item.change) {
				item.change(value);
			}
		},
		//表单提交校验
		submitForm() {
			// let validFlag = false;
			// this.$refs["editForm"].validate((valid, obj) => {
			//   debugger;
			//   validFlag = valid;
			// });
			const showFroms = this.editForm.filter((item) => {
				let isShow =
					item.isShow === undefined
						? this.getOptionsShow(item, this.editFormData)
						: item.isShow;
				if (isShow) {
					return item.prop;
				}
			});
			const arrProp = showFroms.map((item) => item.prop);
			let validFlag = this.validateField(arrProp);
			if (!validFlag) {
				// 校验未通过，滚动到指定位置
				this.$nextTick(() => {
					// 获取第一个校验错误的元素
					const element = document.querySelectorAll(".el-form-item__error")[0];
					// 滚动到错误元素对应位置
					element.scrollIntoView({
						behavior: "smooth",
						block: "center",
					});
				});
			}
			return validFlag;
		},
		//重置表单
		resetForm() {
			this.$refs["editForm"].resetFields();
		},
		clearValidate(arr) {
			this.$refs["editForm"].clearValidate(arr);
		},
		validateField(prop) {
			let saveFlag = true;
			this.$refs["editForm"].validateField(prop, (res) => {
				if (res) {
					saveFlag = false;
				}
			});
			return saveFlag;
		},
	},
};
</script>
<style lang="scss" scoped>
.basic-form {
	/deep/.el-form-item__content {
		text-align: left;
	}
	/deep/.el-radio {
		line-height: 32px;
	}
	/deep/ .el-input,
	/deep/.el-range-editor--small.el-input__inner,
	.is-controls-right,
	/deep/.vue-treeselect,
	/deep/.el-input-number--small,
	/deep/.el-select-tree {
		// width: 260px;
		// display: inline-flex;
	}
	/deep/.el-textarea {
		width: 400px;
	}
	/deep/.el-input-number--small .el-input__inner {
		text-align: left;
	}

	.title-item-content {
		margin-right: 0 !important;
		margin-bottom: 0 !important;
		/deep/.el-form-item__content {
			margin-left: 0 !important;
		}
	}
	.unit-item-content {
		width: fit-content;
		.unit-text {
			position: absolute;
			right: 12px;
			// color: #cccccc;
		}
		/deep/.el-input__inner {
			padding-right: 40px;
		}
	}
}
.desc-edit-form {
	/deep/.el-form-item__label {
		color: #666666 !important;
	}
	/deep/.el-form-item__content {
		color: #333333;
		width: 260px;
	}
	.slot-item-content {
		/deep/.el-form-item__content {
			color: #333333;
			width: auto;
		}
	}
	.file-item-content,
	.textarea-item-content {
		/deep/.el-form-item__content {
			width: 500px;
		}
	}
}
</style>
