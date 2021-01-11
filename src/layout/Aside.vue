<template>
  <el-aside
    :width="$store.state.windowWidth < 1920 ? '180px' : '208px'"
    :class="isCollapse ? 'aside' : 'collapse aside'"
    style="overflow-y: auto; padding-bottom: 50px;"
  >
    <div class="logo" @click="$router.push('/index')">
      <img src="../assets/images/logo.png" />
      <div>法务管理系统</div>
    </div>
    <el-menu
      :default-active="$route.fullPath"
      :unique-opened="true"
      class="el-menu-vertical-demo"
      router
    >
      <div v-for="(item, index) in menuList" :key="index">
        <el-submenu :index="item.name" v-if="item.children">
          <template slot="title">
            <i :class="`iconfont ${item.icon} mr-8 fs-16`"></i>
            <span slot="title">{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="(itemChild, indexChild) in item.children"
            :key="indexChild"
            :index="itemChild.path"
            @click="clearStore"
          >
            <span>{{ itemChild.name }}</span></el-menu-item
          >
        </el-submenu>
        <el-menu-item :index="item.path" v-else
          ><i :class="`iconfont ${item.icon} mr-8`"></i>
          {{ item.name }}</el-menu-item
        >
      </div>
    </el-menu>
  </el-aside>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Aside',
  data() {
    return {
      active: 0,
      isCollapse: false
    };
  },
  computed: mapState(['menuList']),
  methods: {
    clearStore() {
      this.$store.commit('setSearchParams', {});
      this.$store.commit('setPagination', { pageIndex: 1, pageSize: 10 });
      this.$store.commit('setTableSelection', []);
    }
  }
};
</script>
<style lang="scss" scoped>
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
$--color-background: #4451b1;
/deep/ .el-menu {
  border-right: 0;
  background: $--color-background;
}
/deep/ .is-active .el-menu {
  background: #4b57b4;
}
.el-header {
  padding: 0;
}
.el-aside {
  overflow: hidden;
  background: #4451b1;
}
.collapse.el-aside {
  background: #4451b1;
}
.isCollapse {
  position: absolute;
  left: 15px;
  bottom: 30px;
  color: #fff;
}
.collapse {
  .el-menu-item {
    height: 40px !important;
    line-height: 40px !important;
    background: $--color-background;
    padding-left: 20px !important;
    color: rgba(255, 255, 255, 0.7);
  }
  .el-menu-item.is-active {
    background-color: #f4f5f9 !important;
    color: #15d0ff;
  }
}
/deep/ .el-submenu .el-menu-item {
  height: 40px;
  line-height: 40px;
  background: #4b57b4;
  color: rgba(255, 255, 255, 0.65);
  padding-left: 50px !important;
  &:hover {
    color: #fff;
    background: #4b57b4;
  }
}
.el-menu-item {
  height: 40px !important;
  line-height: 40px !important;
  // background: #4451b1;
  color: rgba(255, 255, 255, 0.65);
  i {
    color: rgba(255, 255, 255, 0.65);
  }
}
.el-menu-item.is-active,
.el-menu-item:hover,
.el-menu-item.is-active:hover {
  color: #15d0ff;
  i {
    color: #15d0ff;
  }
}
/deep/ .el-submenu__title {
  height: 40px !important;
  line-height: 40px !important;
  color: rgba(255, 255, 255, 0.65);
  i {
    color: rgba(255, 255, 255, 0.65);
  }

  &:hover {
    background: $--color-background;
    color: #fff;
    i {
      color: #fff;
    }
  }
}
/deep/ .is-active .el-submenu__title {
  background: #4b57b4;
  color: #fff;
  i {
    color: #fff;
  }
}
/deep/ .el-submenu__title i.el-submenu__icon-arrow {
  top: 23px;
}
.logo {
  height: 130px;
  color: #fff;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
  img {
    margin: 25px 0 15px 0;
  }
}
</style>
