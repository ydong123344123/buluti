<template>
  <div>
    <el-container>
      <el-header>
        <div class="headers">
          <div>电商后台管理系统</div>
          <div>
            <el-button @click="tc">退出</el-button>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            router
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#333744"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu :index="item.path" v-for="item in menus" :key="item.id">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item.authName }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  :index="ele.path"
                  v-for="ele in item.children"
                  :key="ele.id"
                  >{{ ele.authName }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menus: [],
    };
  },
  methods: {
    tc() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
  created() {
    this.$axios.get("menus").then((res) => {
      console.log(res);
      this.menus = res.data.data;
    });
  },
};
</script>

<style>
.el-header {
  background-color: #373d41;
  color: white;
}

.el-aside {
  background-color: #333744;
  color: #333;
  height: 100vh;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
.headers {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
