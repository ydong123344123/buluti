<template>
  <div>
    <el-card>
      <div class="header">
        <div>
          <el-input
            placeholder="请输入内容"
            v-model="input3"
            class="input-with-select"
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <div class="bt">
          <el-button type="primary">添加商品</el-button>
        </div>
      </div>
      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed label="#" type="index"> </el-table-column>
        <el-table-column prop="goods_name" label="商品名称"> </el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量">
        </el-table-column>
        <el-table-column prop="add_time" label="创建时间"> </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >删除</el-button
            >
            <el-button type="text" size="small">编辑</el-button>
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
      input3: "",
      page: {
        query: "",
        pagesize: 10,
        pagenum: 1,
      },
      tableData: [],
    };
  },
  methods: {
    spgl() {
      this.$axios.get("goods", { params: this.page }).then((res) => {
        console.log(res);
        this.tableData = res.data.data.goods;
      });
    },
  },
  created() {
    this.spgl();
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
