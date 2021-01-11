<template>
  <div>
    <div
      :style="{
        itemAlign: 'center',
        marginTop: btnVisible ? '' : '-30px',
        width: '460px'
      }"
    >
      <el-upload
        class="upload-demo"
        action="/legal/FileManage/UploadFiles"
        :headers="{ Authorization: `Bearer ${$store.state.token}` }"
        :data="{ proNumInChild }"
        :on-preview="handlePreview"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        :on-remove="handleRemove"
        multiple
        :file-list="callbackList"
        :disabled="disabled"
      >
        <el-button
          size="small"
          :disabled="disabled"
          v-if="btnVisible"
          :loading="loading"
          >{{ btnName ? btnName : '选择附件' }}</el-button
        >
      </el-upload>
      <div class="tl">
        <span class="color-text2 fs-12" v-if="btnVisible"
          >支持格式：.jpg .jpeg .png .doc .docx .xls .xlsx .pdf
          .rar，单个文件不能超过20MB。</span
        >
      </div>
    </div>
  </div>
</template>
<script>
import { DownFileNoLogin } from '@/api/common';
import { downBlob } from '@/utils/utils';
export default {
  name: 'BaseUpload',
  props: {
    // 是否禁用组件
    disabled: Boolean,
    // 组件按钮名，不填默认为选择附件
    btnName: String,
    // 组件需要的proNumInChild
    proNumInChild: String,
    // 组件默认值
    fileList: Array,
    btnVisible: {
      // 是否显示按钮和提示
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    callbackList() {
      return this.apiFilesToFileList(this.fileList);
    }
  },

  /**
   * @callback 返回文件列表
   */
  methods: {
    async handlePreview(file) {
      const params = (file.response && file.response.data) || file,
        res = await DownFileNoLogin(params);
      downBlob(res.data, file.name);
    },
    handleRemove(file, fileList) {
      const callbackList = [];
      fileList.map(item => {
        if (item.response) {
          callbackList.push(item.response.data);
        } else {
          callbackList.push(item);
        }
        return item;
      });
      this.$emit('callback', callbackList);
    },
    handleSuccess(res, file, fileList) {
      this.loading = false;
      if (res.success) {
        const callbackList = [];
        fileList.map(item => {
          if (item.response) {
            callbackList.push(item.response.data);
          } else {
            callbackList.push(item);
          }
          return item;
        });
        this.$emit('callback', callbackList);
      } else {
        this.$message.error(res.msg);
      }
    },
    apiFilesToFileList(list) {
      const fileList = [];
      if (list && list.length) {
        list.map(item => {
          fileList.push({
            ...item,
            name: item.originalname,
            url: item.filePath || item.showFilePath
          });
          return item;
        });
      }

      return fileList;
    },
    beforeUpload(file) {
      const officedocument =
          // eslint-disable-next-line max-len
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        fileSize = 1024,
        maxSize = 20,
        minusOne = -1,
        isLt2M = file.size / fileSize / fileSize < maxSize;
      let isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'application/msword' ||
        file.type === officedocument ||
        file.type === 'application/vnd.ms-excel' ||
        file.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.type === 'application/pdf' ||
        file.type === 'image/png';
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 20MB!');
      }
      if (file.name.indexOf('rar') !== minusOne) {
        isJPG = true;
      }
      if (!isJPG) {
        const msg =
          '请上传.jpg .jpeg .png .doc .docx .xls .xlsx .pdf .rar格式文件';
        this.$message.error(msg);
      }
      if (isJPG && isLt2M) {
        this.loading = true;
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style scoped lang="scss">
/deep/.el-upload-list__item .el-icon-close-tip {
  display: none !important;
}
</style>
