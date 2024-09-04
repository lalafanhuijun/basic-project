<!-- 附件上传组件 -->
<template>
	<div :key="timer">
		<!-- 图片上传 -->
		<el-upload
			v-if="type === 'picture'"
			action
			multiple
			ref="upload"
			class="upload-demo-picture-card"
			:class="{ active: disabled, limit: newFileList.length >= limit }"
			:limit="limit"
			:file-list="newFileList"
			:accept="accept"
			:on-change="handleChange"
			:auto-upload="false"
			:on-exceed="handleExceed"
			show-file-list
			:disabled="disabled"
			list-type="picture-card"
		>
			<div
				slot="tip"
				class="el-upload__tip"
				v-show="newFileList.length !== limit && isTipShow"
			>
				{{
					`支持格式：${accept} ，单文件最大不超过${maxSize}M，${
						limit === 1 ? "只允许上传一条附件！" : `最多上传${limit}个文件！`
					}`
				}}
			</div>
			<i class="el-icon-plus"></i>
			<div slot="file" slot-scope="{ file }">
				<img class="el-upload-list__item-thumbnail" :src="file.url" alt />
				<span class="el-upload-list__item-actions">
					<!-- 图片预览 -->
					<span
						class="el-upload-list__item-preview"
						@click="handlePictureCardPreview(file, fileList)"
					>
						<i class="el-icon-zoom-in"></i>
					</span>
					<!-- 图片下载 -->
					<span
						class="el-upload-list__item-delete"
						@click="handleDownload(file, fileList)"
					>
						<i class="el-icon-download"></i>
					</span>
					<!-- 图片删除 -->
					<span
						v-if="!disabled && (file.isDelete || file.isDelete === undefined)"
						class="el-upload-list__item-delete"
						@click="handlePictureCardRemove(file, fileList)"
					>
						<i class="el-icon-delete"></i>
					</span>
				</span>
			</div>
		</el-upload>

		<!-- 文件列表上传 -->
		<el-upload
			v-else
			class="upload-demo eas-upload"
			:class="{
				active: disabled,
				'text--picture-card': listType === 'picture-card',
			}"
			ref="upload"
			action=""
			:accept="accept"
			:limit="limit"
			:file-list="newFileList"
			:auto-upload="false"
			:on-exceed="handleExceed"
			:on-preview="handlePreview"
			:on-change="handleChange"
			:on-remove="handleRemove"
			:disabled="disabled"
			multiple
			drag
		>
			<i class="el-icon-upload"></i>
			<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
			<div class="el-upload__tip" slot="tip">
				{{
					`支持格式：${accept} ，单文件最大不超过${maxSize}M，${
						limit === 1 ? "只允许上传一条附件！" : `最多上传${limit}个文件！`
					}`
				}}
			</div>
		</el-upload>
		<!-- 大图预览 -->
		<el-image
			v-show="false"
			style="width: 0px; height: 0px"
			:src="preViewUrl"
			:preview-src-list="imagePreviewUrls"
			ref="preview"
		>
		</el-image>
	</div>
</template>

<script>
// import {
// 	uploadFile,
// 	downloadUrl,
// 	deleteFile,
// } from "@/api/modules/easApi/common";

export default {
	name: "BasicUpload",
	props: {
		//上传类型
		type: {
			type: String,
			default: "",
		},
		//接受上传的文件类型
		accept: {
			type: String,
			default: " .doc,.docx,.xls,.xlsx,.pdf,.jpg,.jpeg,.png",
		},
		//最大允许上传个数
		limit: {
			type: Number,
			default: 6,
		},
		//上传的文件列表
		fileList: {
			type: Array,
			default: () => [],
		},
		//单文件大小限制
		maxSize: {
			type: Number,
			default: 10,
		},
		//文件类型
		fileClass: {
			type: String,
			default: "01",
		},
		//附件上传是否可用
		disabled: {
			type: Boolean,
			default: false,
		},
		listType: {
			type: String,
			default: "",
		},
		//是否显示提示信息
		isTipShow: {
			type: Boolean,
			default: true,
		},
		width: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			delFileIds: [], // 删除的file id
			delFileNames: [], // 删除的file name
			newFileList: [],
			progressPercent: 0, // 进度条默认为0
			showImgViewer: false,
			initialImgPreviewIndex: 0, // 预览打开看到的图片下标
			imagePreviewUrls: [], // 预览图片的下标
			preViewUrl: "",
			finishfiles: [], //已上传的文件
			timer: new Date().getTime(),
		};
	},
	watch: {
		fileList(val, oVal) {
			// const defaultFileNos = oVal.map((item) => {
			//   return item.fileNo;
			// });
			// const deleteFileNos = this.newFileList.map((item) => {
			//   if (!defaultFileNos.includes(item.fileNo)) {
			//     return item.fileNo;
			//   }
			// });
			// this.deleteFile(deleteFileNos);
			this.newFileList = [];
			this.imagePreviewUrls = [];
			this.initFileList();
		},
	},
	async created() {
		this.initFileList();
	},
	//销毁前删除冗余附件
	beforeDestroy() {
		// if (this.delFileIds.length > 0) {
		//   this.deleteFile(this.delFileIds);
		// }
	},
	methods: {
		/**
		 * @description: 初始化文件信息
		 * @return {*}
		 */
		initFileList() {
			let newFileListCopy = [];
			if (this.fileList.length > 0) {
				this.fileList.map(async (item, index, arr) => {
					let imageUrl = "";
					if (this.type === "picture") {
						let param = {
							fileNo: item.fileNo,
							fileName: item.fileName,
						};
						//获取图片URL
						// await downloadUrl(param).then((res) => {
						// 	let imageType = res.headers["content-type"];
						// 	const blob = new Blob([res.data], { type: imageType });
						// 	imageUrl = (window.URL || window.webkitURL).createObjectURL(blob);
						// 	this.imagePreviewUrls.push(imageUrl);
						// });
					}
					newFileListCopy.push({
						id: item.fileId,
						name: item.fileName,
						fileName: item.fileName,
						fileNo: item.fileNo,
						url: imageUrl,
					});
					if (index === arr.length - 1) {
						this.newFileList = [...newFileListCopy];
					}
				});
			}
		},
		//图片放大预览
		handlePictureCardPreview(file) {
			const urlIndex = this.imagePreviewUrls.findIndex(
				(item) => item === file.url
			);
			this.initialImgPreviewIndex = urlIndex;
			this.showImgViewer = true;
			this.preViewUrl = file.url;
			this.$refs.preview.clickHandler();
		},
		//图片列表移除文件时的钩子
		handlePictureCardRemove(file, fileList) {
			const vIndex = this.imagePreviewUrls.findIndex(
				(item) => item === file.url
			);
			const fIndex = this.newFileList.findIndex(
				(item) => item.fileNo === file.fileNo
			);
			if (file.fileNo) {
				this.delFileIds.push(file.fileNo);
				this.delFileNames.push(file.fileName);
			}
			this.newFileList.splice(fIndex, 1);
			this.finishfiles.splice(fIndex, 1);
			this.imagePreviewUrls.splice(vIndex, 1);
			this.$emit("uploadFilesChange", this.newFileList);
		},
		// 图片点击下载
		handleDownload(file) {
			console.log(file);
			// 如果浏览器支持msSaveOrOpenBlob方法（也就是使用IE浏览器的时候），那么调用该方法去下载图片
			if (window.navigator.msSaveOrOpenBlob) {
				let bstr = atob(file.url.split(",")[1]);
				let n = bstr.length;
				let u8arr = new Uint8Array(n);
				while (n--) {
					u8arr[n] = bstr.charCodeAt(n);
				}
				let blob = new Blob([u8arr]);
				window.navigator.msSaveOrOpenBlob(blob, "chart-download" + "." + "png");
			} else {
				// 这里就按照chrome等新版浏览器来处理
				let a = document.createElement("a");
				a.href = file.url;
				a.setAttribute("download", file.name);
				a.click();
			}
		},

		//文件列表移除文件时的钩子
		handleRemove(file, fileList) {
			if (file.url) {
				//上传的图片文件,删除预览
				const index = this.imagePreviewUrls.findIndex(
					(item) => item === file.url
				);
				this.imagePreviewUrls.splice(index, 1);
			}
			const fIndex = this.newFileList.findIndex(
				(item) => item.fileNo === file.fileNo
			);
			if (file.fileNo) {
				this.delFileIds.push(file.fileNo);
				this.delFileNames.push(file.fileName);
			}
			this.newFileList = fileList;
			this.finishfiles.splice(fIndex, 1);
			this.$emit("uploadFilesChange", this.newFileList);
		},
		//文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
		async handleChange(file, fileList) {
			let testmsg = file.name
				.substring(file.name.lastIndexOf(".") + 1)
				.toLocaleLowerCase();
			if (this.accept.indexOf(testmsg) === -1) {
				this.$easUtil.resetMessage({
					message: `上传文件只能是${this.accept}格式!`,
					type: "warning",
				});
				fileList.pop();
				return;
			}

			if (file.size / 1024 / 1024 > this.maxSize) {
				this.$easUtil.resetMessage({
					message: `上传文件大小不能超过${this.maxSize}MB!`,
					type: "warning",
				});
				fileList.pop();
				return;
			}
			if (file.url) {
				//照片墙上传
				// this.imagePreviewUrls.push(file.url);
				this.uploadFile(file, fileList);
			} else if (/^image\/(jpeg|png|jpg|gif|bmp)$/.test(file.raw.type)) {
				//文件上传照片类型
				const _this = this;
				const fr = new FileReader();
				fr.readAsDataURL(file.raw);
				fr.onload = function () {
					_this.$set(file, "url", fr.result);
					_this.uploadFile(file, fileList);
				};
			} else {
				//其余pdf类型
				this.uploadFile(file, fileList);
			}
		},
		//文件超出个数限制时的钩子
		handleExceed(files, fileList) {
			this.$easUtil.resetMessage({
				message: `当前限制选择${this.limit}个文件，本次上传数量已超额，请重新选择上传！`,
				type: "warning",
			});
		},
		//点击文件列表中已上传的文件时的钩子(下载附件)
		handlePreview(file) {
			if (file.raw && /^image\/(jpeg|png|jpg|gif|bmp)$/.test(file.raw.type)) {
				const _this = this;
				const fr = new FileReader();
				fr.readAsDataURL(file.raw);
				fr.onload = function () {
					const urlIndex = _this.imagePreviewUrls.findIndex(
						(item) => item === fr.result
					);
					_this.initialImgPreviewIndex = urlIndex;
					_this.showImgViewer = true;
				};
			} else if (file.status === "success") {
				if (
					file.url &&
					["jpeg", "png", "jpg", "gif", "bmp"].includes(
						file.name.substring(file.name.lastIndexOf(".") + 1)
					)
				) {
					this.handleDownload(file);
				} else {
					let param = {
						fileNo: file.fileNo,
						// fileName: file.fileName,
					};
					// downloadUrl(param).then((res) => {
					// 	this.$easUtil.downloadFile(res, file.fileName);
					// });
				}
			} else {
				// let a = document.createElement('a');
				// var event = new MouseEvent('click');
				// a.download = file.name;
				// a.href = URL.createObjectURL(file.raw);
				// a.dispatchEvent(event);
				// console.log(file);
			}
		},
		closeImgViewer() {
			this.showImgViewer = false;
		},
		//附件上传
		uploadFile(file, fileList) {
			const _this = this;
			//文件上传formData参数自定义
			let formData = new FormData();
			formData.append("fileClass", this.fileClass);
			formData.append("file", file.raw);
			this.$store.commit("setloadingText", "文件上传中......");
			// uploadFile(formData)
			// 	.then((res) => {
			// 		if (res.data.code === 200) {
			// 			if (file.url) {
			// 				this.imagePreviewUrls.push(file.url);
			// 			} //添加预览照片
			// 			// res.data.data[0].uid = file.uid;
			// 			file.fileNo = res.data.data[0].fileNo;
			// 			file.fileName = res.data.data[0].fileName;
			// 			_this.newFileList = fileList;
			// 			_this.finishfiles = _this.finishfiles.concat(res.data.data); //保存已上传照片
			// 			this.$emit("uploadFilesChange", this.newFileList);
			// 		} else {
			// 			fileList.splice(fileList.length - 1, 1);
			// 			_this.$message.error(res.data.message);
			// 		}
			// 	})
			// 	.catch(function (error) {
			// 		fileList.splice(fileList.length - 1, 1);
			// 	});
		},
		//删除文件
		deleteFile(delIds) {
			let fileNos =
				delIds ||
				this.newFileList.map((item) => {
					return item.fileNo;
				});
			if (fileNos.length === 0) {
				return;
			}
			let params = {
				fileNos: fileNos,
			};
			// deleteFile(params).then((res) => {});
		},
	},
};
</script>

<style lang="scss" scoped>
/deep/.el-upload-dragger {
	height: 136px;
	width: 400px;
	.el-icon-upload {
		font-size: 40px;
		margin: 16px;
		// color: #409EFF;
	}
}
.el-upload__tip {
	color: #8c8c8c;
	line-height: 12px;
}

.upload-demo,
.upload-demo-picture-card {
	&.active {
		/deep/.el-upload--text,
		/deep/.el-upload-list__item-status-label,
		.iconshangchuan,
		.el-upload__text,
		.el-upload__tip {
			display: none !important;
		}
		/deep/.el-upload-list__item-name {
			// color: #409EFF;
		}
		/deep/.el-upload-list__item:first-child {
			margin-top: 0px;
			line-height: 32px;
		}
	}
}
.upload-demo {
	width: 500px !important;
}
/deep/.upload-demo.hzwq-upload .el-upload--text {
	width: 160px;
	height: 48px;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	border: 1px dashed #dcdfe6;
	border-radius: 4px;
}
.upload-demo-picture-card {
	&.active,
	&.limit {
		/deep/.el-upload--picture-card {
			display: none;
		}
	}
}
</style>
