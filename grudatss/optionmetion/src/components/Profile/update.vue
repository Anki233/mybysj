<template>
  <div class="up-container">
    <el-table :data="tableData" style="width: 80%" :show-header="false" size="medium" border>
      <el-table-column label="日期">
        <template slot-scope="scope">
          <i class="el-icon-success" style="color: greenyellow"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          <el-tag type="warning" size="medium">{{ scope.row.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="success"
                     @click="handleEdit(scope.$index)">更换
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "update",
  data() {
    return {
      tableData: [{
        date: '登录密码',
        name: '若密码泄露，请及时更换'
      }, {
        date: '性别年龄',
        name: '若性别年龄不对，请及时修改'
      }, {
        date: '邮箱绑定',
        name: '若帐号停用，请及时更换'
      }, {
        date: '手机绑定',
        name: '若手机号停用，请及时更换'
      }],
      createModel: false
    }
  },
  methods: {
    handleEdit(index) {
      this.$router.push({
        path: '/profile/safe',
        query: {
          id: index
        }
      })
    }
  }
}
</script>

<style scoped>
.up-container {
  margin-top: 40px;
  padding-left: 30px;
}
</style>
