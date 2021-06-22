<template>
  <div>
    <el-container>
      <el-header style="height: 90px">
        <div class="header-content">
          <div class="logo">
            <img src="../images/logoko.png" alt="logo">
          </div>
          <div class="btn">
            <span class="username">{{ username }}</span>
            <el-button type="success" @click="logout">退出登录</el-button>
          </div>
        </div>
      </el-header>
      <el-main>
        <el-menu :default-active="$route.path" exact mode="horizontal" router @select="handleSelect">
          <template v-for="item in User">
            <el-submenu v-if="item.items.length" :index="item.path" :key="item.key">
              <template slot="title">
                {{ item.title }}
              </template>
              <el-menu-item v-for="(items, key) in item.items" :key="key" :index="items.path">
                {{ items.title }}
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="item.path" :key="item.key">
              {{ item.title }}
            </el-menu-item>
          </template>
        </el-menu>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      User: [],
      NavigateItem: [],
      username: ''
    };
  },
  created() {
    this.User = this.$store.state.role
    this.username = this.$store.state.user.username
  },
  methods: {
    handleSelect(key, keyPath) {
    },
    logout() {
      this.$message({
        message: '退出成功',
        type: 'success'
      })
      // 清除状态和存储
      this.$store.commit('logout')
      // 返回到登录页
      this.$router.push({name: "login"})
    }
  }
}
</script>

<style scoped>
.header-content {
  padding-top: 20px;
  height: 70px;
  line-height: 70px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px
}

.header-content .logo, .header-content .logo img {
  height: 70px;
}

.header-content .username {
  margin-right: 20px;
}
</style>
