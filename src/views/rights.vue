<template>
  <div>
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed label="#" type="index"> </el-table-column>
        <el-table-column prop="authName" label="权限名称"> </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level == 0">一级</el-tag>
            <el-tag type="success" v-if="scope.row.level == 1">二级</el-tag>
            <el-tag type="info" v-if="scope.row.level == 2">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    qxgl() {
      this.$axios.get("rights/list").then((res) => {
        console.log(res);
        this.tableData = res.data.data;
      });
    },
  },
  created() {
    this.qxgl();
  },
};
</script>

<style></style>
