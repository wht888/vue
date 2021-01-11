<template>
  <div>
    <el-date-picker
      v-model="val"
      :type="type"
      :placeholder="type == 'datetime' ? '选择日期时间' : '选择日期'"
      style="width: 100%"
      :disabled="disabled"
      @change="change"
    >
    </el-date-picker>
  </div>
</template>
<script lang="ts">
/**
 * @author wht
 * @prop {String} value 绑定值
 * @prop {Boolean} disabled 是否禁用、只读
 * @prop {String} type 类型（date, datetime），默认date，
 */

import moment from 'moment';
import { Vue, Component, PropSync, Prop } from 'vue-property-decorator';
@Component
export default class DateCheck extends Vue {
  @PropSync('value', [String, Date]) val!: string | Date;

  @Prop({ default: false, type: Boolean }) readonly disabled!: boolean;

  @Prop({ default: 'date', type: String }) readonly type!: string;

  change(arg: Date) {
    const str = this.type === 'datetime' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
    this.val = arg ? moment(arg).format(str) : '';
  }
}
</script>
