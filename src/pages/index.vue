<template>
  <div>
    首页
    <NoData />
    <Pagination :total="300" />
    <Input :value.sync="nul" />
    <SearchForm :searchOptions="arr" />
    <DateRange :value.sync="arr" />
  </div>
</template>
<script lang="ts">
/**
 * @author wht
 */

import Input from '@/components/Input/index.vue';
import NoData from '@/components/NoData/index.vue';
import Pagination from '@/components/Pagination/index.vue';
import SearchForm from '@/components/SearchForm/index.vue';
import DateRange from '@/components/DateRange/index.vue';
import { Vue, Component } from 'vue-property-decorator';
import { State } from 'vuex-class';
@Component({
  components: { NoData, Pagination, Input, SearchForm, DateRange }
})
export default class Index extends Vue {
  @State windowHeight!: number;

  @State windowWidth!: number;

  @State searchParams!: object;

  str = '12';

  arr = [];

  nul = null;

  searchOptions = [
    {
      type: 'input',
      label: '客户名称',
      model: 'custName'
    },
    {
      type: 'select',
      label: '所属城市',
      model: 'city',
      options: [
        {
          label: '郑州',
          value: 1
        },
        {
          label: '洛阳',
          value: 2
        }
      ]
    },
    {
      type: 'date',
      label: '创建日期',
      model: 'custDate'
    }
  ];

  created() {
    this.str = '';
    document.title = '首页';
  }
}
</script>
<style scoped lang="scss">
.dialog {
  position: absolute;
  background: #000;
}
</style>
