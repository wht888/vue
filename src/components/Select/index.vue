<template>
  <div>
    <el-select
      v-model="val"
      placeholder="请选择"
      clearable
      filterable
      :disabled="disabled"
      style="width: 100%"
      size="small"
    >
      <el-option
        :label="item.label"
        :value="item.value"
        v-for="(item, index) in arr"
        :key="index"
      ></el-option>
    </el-select>
  </div>
</template>
<script lang="ts">
/**
 * @author 王海涛
 * @prop {Number, String, Boolean} value 输入框绑定的值
 * @prop {Array} arr 下拉列表，格式[{label:'姓名', value: 1}]
 * @prop {Boolean} disabled 是否禁用、只读
 */

import { Vue, Component, Prop, PropSync } from 'vue-property-decorator';
@Component
export default class Select extends Vue {
  @PropSync('value', [Number, String, Boolean]) val!: number | string | boolean;

  @Prop(Array) readonly arr!: object[];

  @Prop({ default: false, type: Boolean }) readonly disabled!: boolean;
}
</script>
