<template>
  <div>
    <el-card>
      <el-button type="primary" @click="tj">添加角色</el-button>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed label="#" type="index"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
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

      <!-- 添加角色模态框 -->
      <el-dialog title="添加角色" :visible.sync="dialogVisible" width="50%">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="ruleForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="ruleForm.roleDesc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >确定</el-button
            >
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!-- 编辑模态框 -->
      <el-dialog title="编辑角色" :visible.sync="dialogVisible1" width="50%">
        <el-form
          :model="ruleForm1"
          :rules="rules"
          ref="ruleForm1"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="ruleForm1.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="ruleForm1.roleDesc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="xg('ruleForm1')">确定</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
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
      ruleForm: {
        roleDesc: "",
        roleName: "",
      },
      ruleForm1: {
        roleDesc: "",
        roleName: "",
      },
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
        roleDesc: [{ required: true, message: "角色描述", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 角色列表
    getroles() {
      this.$axios.get("roles").then((res) => {
        console.log(res);
        this.tableData = res.data.data;
      });
    },
    // 添加角色模态框
    tj() {
      this.dialogVisible = true;
    },
    // 删除
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios.delete(`roles/${id}`).then((res) => {
            console.log(res);
            if (res.status == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getroles();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 编辑数据回填
    bj(row) {
      this.dialogVisible1 = true;
      this.ruleForm1.roleName = row.roleName;
      this.ruleForm1.roleDesc = row.roleDesc;
      this.bjid = row.id;
    },
    // 编辑修改
    xg(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
          this.$axios.put(`roles/${this.bjid}`, this.ruleForm1).then((res) => {
            console.log(res);
            if (res.status == 200) {
              this.$message.success("修改成功");
              this.getroles();
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
          this.$axios.post("roles", this.ruleForm).then((res) => {
            console.log(res);
            if (res.status == 200) {
              this.$message.success("添加成功");
              this.getroles();
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
  },
  created() {
    this.getroles();
  },
};
</script>

<style></style>
