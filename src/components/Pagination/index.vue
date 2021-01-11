<template>
  <div class="pagination">
    <el-pagination
      background
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="pagination.pageIndex"
      :page-size="pagination.pageSize"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script lang="ts">
/**
 * @author wht
 * @prop {number} total 总条目数
 * @callback callback 当前页数和每页显示条目个数改变时执行回调函数，重新查询数据
 */

import { State, Mutation } from 'vuex-class';
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class Pagination extends Vue {
  @Prop({ default: 0, type: Number }) readonly total!: number;

  @State pagination!: object;

  @Mutation setPagination!: Function;

  sizeChange(pageSize: number) {
    this.setPagination({ ...this.pagination, pageSize });
    this.$emit('callback');
  }

  currentChange(pageIndex: number) {
    this.setPagination({ ...this.pagination, pageIndex });
    this.$emit('callback');
  }
}
</script>
