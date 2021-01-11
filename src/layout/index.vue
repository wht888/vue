<template>
  <div>
    <router-view v-if="$route.path == '/login' || $route.path == '/'" />
    <div v-else class="layout" :style="{ height: windowHeight + 'px' }">
      <Aside></Aside>
      <el-container>
        <Ahead></Ahead>
        <el-main :style="{ padding: '0 0.16rem 0.16rem 0.16rem' }">
          <router-view />
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import Aside from '@/layout/Aside';
import Ahead from '@/layout/Ahead';
import { mapState } from 'vuex';
export default {
  name: 'Layout',
  components: { Aside, Ahead },
  data() {
    return {};
  },
  computed: mapState(['windowHeight'])
};
</script>

<style lang="scss">
.layout {
  display: flex;
}
.el-container {
  display: flex;
  flex: 1;
  flex-direction: column !important;
}
</style>
