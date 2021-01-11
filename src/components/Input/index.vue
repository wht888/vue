<template>
  <div>
    <el-input
      v-model="val"
      placeholder="请输入"
      clearable
      :disabled="disabled"
      :type="type"
      @input="change"
      size="small"
      @keyup.enter.native="keyupEnter"
    ></el-input>
  </div>
</template>
<script lang="ts">
/**
 * @author wht
 * @prop {Number, String} value 输入框绑定的值
 * @prop {Boolean} disabled 是否禁用、只读
 * @prop {String} type 输入框类型（text, number），默认text，
 */

import { Vue, Prop, Component, PropSync } from 'vue-property-decorator';
@Component
export default class Input extends Vue {
  @PropSync('value', [Number, String]) val!: number | string;

  @Prop({ default: false, type: Boolean }) readonly disabled!: boolean;

  @Prop({ default: 'text', type: String }) readonly type!: string;

  change(arg: number) {
    if (this.type === 'number') {
      this.val = Math.abs(Number(arg));
    }
  }

  keyupEnter() {
    this.$emit('keyupEnter');
  }
}
</script>
