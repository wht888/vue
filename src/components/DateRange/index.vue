<template>
  <div>
    <el-date-picker
      v-model="val"
      :type="`${type}range`"
      style="width: 100%"
      :disabled="disabled"
      range-separator="至"
      :start-placeholder="`开始${tip[type]}`"
      :end-placeholder="`结束${tip[type]}`"
      @change="change"
    >
    </el-date-picker>
  </div>
</template>
<script lang="ts">
/**
 * @author wht
 * @prop {[string, string]} value 绑定值
 * @prop {Boolean} disabled 是否禁用、只读
 * @prop {String} type 类型（date, datetime），默认date，
 */

import moment from 'moment';
import { Vue, Component, PropSync, Prop } from 'vue-property-decorator';
@Component
export default class DateRange extends Vue {
  @PropSync('value', Array) val!: [string, string];

  @Prop({ default: false, type: Boolean }) readonly disabled!: boolean;

  @Prop({ default: 'date', type: String }) readonly type!: string;

  readonly tip = { date: '日期', datetime: '日期时间' };

  change([startDate, endDate]: [string, string]) {
    const str = this.type === 'datetime' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
    this.val = startDate
      ? [moment(startDate).format(str), moment(endDate).format(str)]
      : ['', ''];
  }
}
</script>
