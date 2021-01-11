<template>
  <div class="no-data color-text2" :style="{height: `${height}px`}">
    {{ title }}
  </div>
</template>
<script lang="ts">
/**
 * @author wht
 * @prop {String} title 显示内容
 * @prop {Number} height 高度
 */

import { Vue, Prop, Component } from 'vue-property-decorator';
@Component
export default class NoData extends Vue {
  @Prop({ default: '暂无数据', type: String }) readonly title!: string;

  @Prop({ default: 100, type: Number }) readonly height!: number;
}
</script>
<style scoped lang="scss">
.no-data {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
