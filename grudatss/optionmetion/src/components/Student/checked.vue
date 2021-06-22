<template>
  <div style="margin-top: 20px">
    <el-table border class="mt-3" :data="tableData" style="width: 100%">
      <el-table-column prop="selectNO" label="题目编号" align="center" width="70">
      </el-table-column>
      <el-table-column prop="teacherNO" label="指导教师" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.teacherNO }}</span>
          <span style="font-size: 12px;margin-left: 10px;cursor: pointer" @click="openModel(scope,scope.row.teacherNO)">查看详情</span>
        </template>
      </el-table-column>
      <el-table-column prop="subNO" label="题目内容" align="center">
        <template slot-scope="scope">
          <span style="margin-right: 10px">题目编号:</span>
          <span>{{ scope.row.subNO }}</span>
          <span style="font-size: 12px;margin-left: 10px;cursor: pointer" @click="openSub(scope.row)">查看详情</span>
        </template>
      </el-table-column>
      <el-table-column prop="checkflag" label="状态" align="center" width="200">
        <template slot-scope="scope">
          <span v-if="scope.row.checkflag == 0">正在等待老师的选择</span>
          <span v-else-if="scope.row.checkflag == 1">老师选择了你</span>
          <span v-else>老师拒绝了你的选择</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="220">
        <template slot-scope="scope">
          <el-button style="margin-left: 10px;margin-top: 10px" type="danger" size="mini" plain
                     @click="checkStu(scope.row)">
            退选
          </el-button>
        </template>
      </el-table-column>
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
    <el-dialog title="题目详情" :visible.sync="subVisible" width="40%" :before-close="handleClose">
      <el-form ref="form2" :model="form2" label-width="80px">
        <el-form-item label="选题编号" prop="subNO">
          <el-input v-model="form2.subNO" style="width: 250px" disabled></el-input>
        </el-form-item>
        <el-form-item label="选题标题" prop="subTitle">
          <el-input v-model="form2.subTitle" style="width: 250px" disabled></el-input>
        </el-form-item>
        <el-form-item label="选题内容" prop="subDetail">
          <el-input type="textarea" :autosize="{ minRows: 3}" v-model="form2.subDetail" style="width: 250px"
                    disabled></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="subVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "checked",
  data() {
    return {
      tabIndex: 0,
      unchecked: 'all',
      tableData: [],
      dialogVisible: false,
      subVisible: false,
      form: {
        userID: '',
        username: '',
        userphone:''
      },
      form2: {
        subNO: '',
        subTitle: '',
        subDetail: ''
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
    getList() {
      let that = this
      let form = {
        id: this.user.userID,
        role: this.user.user_role
      }
      this.axios.post('/admin/info/getseletsub', form, {
        token: true
      }).then(res => {
        that.tableData = res.data.data
      })
    },
    openModel(e, id) {
      this.axios.get('/admin/users/profile/' + id, {
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
    openSub(e) {
      let that = this
      this.axios.get('/admin/info/searchinfo/' + e.subNO, {
        token: true
      }).then(res => {
        if (res.data.code != '200') {
          return this.$message({
            message: res.data.msg,
            type: 'error'
          })
        } else {
          let data = res.data.data
          that.form2 = {
            subNO: data[0].subNO,
            subTitle: data[0].subTitle,
            subDetail: data[0].subDetail
          }
        }
      })
      this.subVisible = true
    },
    checkStu(item) {
      let info = {
        flag: false,
        stuNO: item.stuNO
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
