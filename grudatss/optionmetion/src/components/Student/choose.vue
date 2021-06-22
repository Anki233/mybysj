<template>
  <div style="margin-top: 10px">
    <el-tabs v-model="tabIndex">
      <el-tab-pane :label="tab.name" :key="tabI" v-for="(tab,tabI) in tabbars">
      </el-tab-pane>
    </el-tabs>
    <el-table border :data="tableData" style="width: 100%">
      <el-table-column prop="subNO" label="题目编号" align="center" width="70">
      </el-table-column>
      <el-table-column prop="subTitle" label="题目标题" align="center" width="200">
      </el-table-column>
      <el-table-column prop="teacherNO" label="指导教师" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.teacherNO }}</span>
          <span style="font-size: 12px;margin-left: 10px;cursor: pointer" @click="openModel(scope)">查看详情</span>
        </template>
      </el-table-column>
      <el-table-column prop="subDetail" label="题目内容" align="center">
      </el-table-column>
      <el-table-column label="操作" prop="_id" align="center" width="180">
        <template slot-scope="scope">
          <el-button type="success" size="mini" plain @click="checkSub(scope.row)">
            选择
          </el-button>
        </template>
      </el-table-column>
      <!--      <el-table-column prop="note" label="审核意见" align="center">-->
      <!--        &lt;!&ndash;        <template slot-scope="scope">&ndash;&gt;-->
      <!--        &lt;!&ndash;          <el-input v-if="user.user_role === 2" type="text" v-model="scope.row.note" @blur="addNote"></el-input>&ndash;&gt;-->
      <!--        &lt;!&ndash;          {{scope.row.note}}&ndash;&gt;-->
      <!--        &lt;!&ndash;        </template>&ndash;&gt;-->
      <!--      </el-table-column>-->
    </el-table>
    <el-dialog title="教师详情" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="学号" prop="userID">
          <el-input v-model="form.userID" size="mini" style="width: 50%" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" size="mini" style="width: 50%" disabled></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="userphone">
          <el-input v-model="form.userphone" size="mini" style="width: 50%" disabled></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <div style="height: 65px;"></div>
    <el-footer class="footer">
      <el-pagination :current-page="page.current" :page-sizes="page.sizes" :page-size="page.size"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="page.total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </el-footer>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "choose",
  data() {
    return {
      tabIndex: 0,
      tabbars: [{
        name: "查看所有课题",
        key: "all"
      }],
      unchecked: 'all',
      tableData: [],
      page: {
        current: 1,
        sizes: [10, 20, 50, 100],
        size: 10,
        total: 0
      },
      status: 1,
      dialogVisible: false,
      form: {
        userID: '',
        username: '',
        userphone: ''
      }
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  created() {
    this.getList()
  },
  methods: {
    handleSizeChange(val) {
      this.page.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.page.current = val
      this.getList()
    },
    getList() {
      let that = this
      let form = {
        currentPage: this.page.current,
        pageSize: this.page.size,
        id: this.user.userID,
        role: this.user.user_role
      }
      this.axios.post('/admin/info/getsub', form,{
        token:true
      }).then(res => {
        if (res.data.code != '200') {
          return this.$message({
            message: res.data.msg,
            type: 'error'
          })
        } else {
          that.tableData = res.data.data[0]
          that.page.total = res.data.data[1]
        }
      })
    },
    openModel(e) {
      this.axios.get('/admin/users/profile/' + e.row.teacherNO, {
        token: true
      }).then(res => {
        this.form = {
          userID: res.data.data.userID,
          username: res.data.data.username,
          userphone: res.data.data.userphone
        }
      })
      this.dialogVisible = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },
    checkSub(item) {
      this.$notify.info({
        title: '提醒',
        message: '如果要退选课题，请到‘已选课题‘页面进行退选！'
      })
      let info = {
        flag: true,
        stuNO: this.user.userID,
        subNO: item.subNO,
        teacherNO: item.teacherNO
      }
      this.axios.put('/admin/student/topsele', info, {
        token: true
      }).then(res => {
        if (res.data.code != '200') {
          return this.$message({
            message: res.data.msg,
            type: 'error'
          })
        } else {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          this.getList()
        }
      })
    }
  }
}
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 200px;
  right: 0;
  z-index: 100;
}
</style>
