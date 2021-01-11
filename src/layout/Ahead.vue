<template>
  <div style="background: #fff" class="mb-16">
    <div class="top-menu">
      <div class="top-menu-right" style="padding-left: 0.16rem"></div>
      <div class="top-menu-right">
        <span class="mr-24 color-text">{{ userName }}</span>
        <span @click="herfMessageList" class="pointer">
          <el-badge
              :value="this.unReadMessageCount"
              :max="99"
              style="margin-right: 24px"
            >
              <i class="el-icon-message-solid color-text pointer fs-16"></i>
            </el-badge>
        </span>
        <el-link @click="loginOut">退出</el-link>
      </div>
    </div>

    <div
      class="flex-between"
      style="padding: 0.16rem"
      v-if="$route.path != '/index'"
    >
      <el-page-header
        @back="$router.go(-1)"
        content="案件详情"
        v-if="$route.path.indexOf('Detail') != -1"
      >
      </el-page-header>
      <el-breadcrumb separator="/" v-else>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ supTitle }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Ahead',
  data() {
    return {
      locale: 'zh',
      supTitle: ''
    };
  },
  computed: mapState(['menuList', 'userName', 'unReadMessageCount']),
  watch: {
    $route() {
      this.getSupTitle();
    },
    menuList() {
      this.getSupTitle();
    }
  },
  mounted() {
    const time = 1300;
    setTimeout(this.getSupTitle, time);
  },
  methods: {
    loginOut() {
      this.$confirm('确定退出登录吗', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('removeToken');
        this.$router.push('/login');
        this.$message({
          type: 'success',
          message: '退出登录'
        });
      });
    },
    getSupTitle() {
      const minusOne = -1;
      this.menuList.map(item => {
        item.children.map(item2 => {
          if (item2.path.indexOf(this.$route.path) !== minusOne) {
            this.supTitle = item.name;
          }
          return item2;
        });
        return item;
      });
    },
    herfMessageList() {
      this.$router.push('/message/messageList');
    }
  }
};
</script>
<style lang="scss" scoped>
.top-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0.48rem;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding-right: 20px;
  color: #333;
  border-bottom: 1px solid #eee;
  .top-menu-right {
    display: flex;
    align-items: center;
    .page-title {
      line-height: 36px;
    }
    .btn {
      width: 110px;
      height: 34px;
      font-size: 14px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      border-radius: 2px;
      margin-left: 20px;
      cursor: pointer;
      background-color: white;
      border: 1px solid #4451b1;
      i {
        margin-right: 5px;
        color: #4451b1;
        &::before {
          width: 16px;
          height: 20px;
          display: inline-block;
          font-size: 18px;
        }
      }
      &:hover {
        background-color: #4451b1;
        color: white;
        i {
          color: white;
        }
      }
    }
    :first-of-type {
      margin-left: 0;
    }
  }
}
.el-dropdown-link {
  display: flex;
  align-items: center;
}
.goBack {
  margin: 0 20px 0 0;
}
.detailTitle {
  font-size: 18px;
}
.title-bar {
  border-left: 3px solid #4451b1;
  padding-left: 0.08rem;
}
</style>
