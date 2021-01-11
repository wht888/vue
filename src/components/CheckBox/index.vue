<template>
  <div style="text-align:left">
    <el-checkbox-group v-model="val" :disabled="disabled" size="small">
      <el-checkbox
        :label="item.value"
        v-for="(item, index) in arr"
        :key="index"
        >{{ item.label }}</el-checkbox
      >
    </el-checkbox-group>
  </div>
</template>
<script lang="ts">
/**
 * @author wht
 * @prop {Array} value 输入框绑定的值
 * @prop {Boolean} disabled 是否禁用、只读
 * @prop {Array} arr 下拉列表，格式[{label:'姓名', value: 1}]
 */

import { Vue, Component, PropSync, Prop } from 'vue-property-decorator';
@Component
export default class CheckBox extends Vue {
  @PropSync('value', Array) val!: [];

  @Prop({ default: false, type: Boolean }) readonly disabled!: boolean;

  @Prop(Array) readonly arr!: [];
}
</script>
