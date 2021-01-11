<template>
  <div>
    <div class="search-form">
      <el-form
        :inline="true"
        ref="searchFormRef"
        label-width="85px"
        class="flex demo-form-inline"
        size="small"
      >
        <el-row>
          <el-col
            :lg="item.lg || 8"
            :xl="item.xl || 6"
            v-for="(item, index) in searchOptions"
            :key="index"
          >
            <el-form-item :label="item.label">
              <Input
                :value.sync="searchParams[item.model]"
                @keyupEnter="onSubmit"
                v-if="item.type == 'input'"
              />
              <Select
                :value.sync="searchParams[item.model]"
                :arr="item.options"
                v-else-if="item.type == 'select'"
              />
              <DateCheck
                :value.sync="searchParams[item.model]"
                v-else-if="item.type == 'date'"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xl="6">
            <el-button
              type="primary"
              @click="onSubmit"
              icon="el-icon-search"
              size="small"
              >查询</el-button
            >
            <el-button @click="onReset" icon="el-icon-refresh" size="small"
              >重置</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * @author wht
 * @prop {Array[SearchObj]} searchOptions 绑定值
 * @interface SearchObj type可传值 input, select, date
 * @callback callback 回调函数，查询
 */

interface SearchObj {
  type: string;
  label: string;
  model: string;
  options?: [];
}
import Input from '@/components/Input/index.vue';
import Select from '@/components/Select/index.vue';
import DateCheck from '@/components/DateCheck/index.vue';
import { State, Mutation } from 'vuex-class';
import { Vue, Component, Prop, Ref } from 'vue-property-decorator';
@Component({
  components: { Input, Select, DateCheck }
})
export default class SearchForm extends Vue {
  @Prop(Array) readonly searchOptions!: SearchObj[];

  @State searchParams!: object;

  @State pagination!: object;

  @Mutation setSearchParams!: Function;

  @Mutation setPagination!: Function;

  @Ref() readonly searchFormRef!: HTMLFormElement;

  // 查询
  onSubmit() {
    this.setPagination({ ...this.pagination, pageIndex: 1 });
    this.setSearchParams(this.searchParams);
    this.$emit('callback');
  }

  // 重置
  onReset() {
    this.searchFormRef.resetFields();
    this.setSearchParams({});
  }
}
</script>
<style scoped>
.high-search {
  padding: 0.08rem 0.16rem;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
</style>
