<template>
  <div>
    <el-card>
      <div class="header">
        <div>
          <el-input
            placeholder="请输入内容"
            v-model="page.query"
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="search"
            ></el-button>
          </el-input>
        </div>
        <div class="bt">
          <el-button type="primary" @click="tj">添加用户</el-button>
        </div>
      </div>
      <!-- table表格 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed type="index" label="#"> </el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="change(scope.row.id, scope.row.mg_state)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="del(scope.row.id)" type="text" size="small"
              >删除</el-button
            >
            <el-button type="text" size="small" @click="bj(scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加模态框 -->
      <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="ruleForm.mobile"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >确定</el-button
            >
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!-- 修改模态框 -->
      <el-dialog title="修改用户" :visible.sync="dialogVisible1" width="50%">
        <el-form
          :model="ruleForm1"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm1.username" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm1.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="ruleForm1.mobile"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="xg('ruleForm1')">确定</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="page.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      bjid: "",
      dialogVisible: false,
      dialogVisible1: false,
      total: 0,
      page: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      ruleForm: {
        username: "",
        password: "",
        mobile: "",
        email: "",
      },
      ruleForm1: {
        username: "",
        mobile: "",
        email: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入电话", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
      },
    };
  },
  methods: {
    yhlb() {
      this.$axios.get("users", { params: this.page }).then((res) => {
        console.log(res);
        this.tableData = res.data.data.users;
        this.total = res.data.data.total;
      });
    },
    // 修改用户状态
    change(id, type) {
      this.$axios.put(`users/${id}/state/${type}`).then((res) => {
        console.log(res);
        if (res.data.meta.status == 200) {
          this.$message.success(res.data.meta.msg);
        }
      });
    },
    // 删除
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$axios
          .delete(`users/${id}`)
          .then((res) => {
            console.log(res);
            if (res.data.meta.status == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            }
            this.yhlb();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      });
    },

    // 编辑
    // 数据回填
    bj(row) {
      this.dialogVisible1 = true;
      this.ruleForm1.username = row.username;
      this.ruleForm1.email = row.email;
      this.ruleForm1.mobile = row.mobile;
      this.bjid = row.id;
    },
    // 分页
    handleSizeChange(val) {
      this.page.pagesize = val;
      this.yhlb();
    },
    handleCurrentChange(val) {
      this.page.pagenum = val;
      this.yhlb();
    },
    // 搜索
    search() {
      this.yhlb();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
          this.$axios.post("users", this.ruleForm).then((res) => {
            console.log(res);
            if (res.status == 200) {
              this.$message.success("添加成功");
              this.yhlb();
              this.dialogVisible = false;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 修改
    xg(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
          this.$axios.put(`users/${this.bjid}`, this.ruleForm1).then((res) => {
            console.log(res);
            if (res.status == 200) {
              this.$message.success("修改成功");
              this.yhlb();
              this.dialogVisible1 = false;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    tj() {
      this.dialogVisible = true;
    },
  },
  created() {
    this.yhlb();
  },
};
</script>

<style>
.header {
  display: flex;
}
.bt {
  margin-left: 20px;
}
</style>
