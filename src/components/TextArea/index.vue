<template>
  <div>
    <el-input
      v-model="val"
      placeholder="请输入"
      clearable
      :disabled="disabled"
      type="textarea"
      :autosize="{ minRows: 1, maxRows: 4 }"
      v-if="autosize"
      :maxlength="maxLength"
      :show-word-limit="maxLength"
      size="small"
    ></el-input>
    <el-input
      v-model="val"
      placeholder="请输入"
      clearable
      :disabled="disabled"
      type="textarea"
      :autosize="false"
      :rows="4"
      :maxlength="maxLength"
      :show-word-limit="maxLength"
      size="small"
      v-else
    ></el-input>
  </div>
</template>
<script lang="ts">
/**
 * @author wht
 * @prop {String} value 输入框绑定的值
 * @prop {Boolean} autosize 是否自适应内容高度
 * @prop {Boolean} disabled 是否禁用、只读
 * @prop {Number} maxLength 最大输入长度
 */

import { Vue, Component, Prop, PropSync } from 'vue-property-decorator';
@Component
export default class TextArea extends Vue {
  @PropSync('value', String) val!: string;

  @Prop({ default: false, type: Boolean }) readonly autosize!: boolean;

  @Prop({ default: false, type: Boolean }) readonly disabled!: boolean;

  @Prop(Number) readonly maxLength!: number;
}
</script>
