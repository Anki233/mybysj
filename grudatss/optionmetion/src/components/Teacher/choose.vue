<template>
  <div style="margin-top: 10px">
    <el-table border class="mt-3" :data="tableData" style="width: 100%">
      <el-table-column prop="selectNO" label="题目编号" align="center" width="70">
      </el-table-column>
      <el-table-column prop="teacherNO" label="指导教师" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.teacherNO }}</span>
          <span style="font-size: 12px;margin-left: 10px;cursor: pointer" @click="openModel(scope,scope.row.teacherNO)">查看详情</span>
        </template>
      </el-table-column>
      <el-table-column prop="stuNO" label="学生" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.stuNO }}</span>
          <span style="font-size: 12px;margin-left: 10px;cursor: pointer"
                @click="openModel(scope,scope.row.stuNO)">查看详情</span>
        </template>
      </el-table-column>
      <el-table-column prop="subNO" label="题目内容" align="center">
        <template slot-scope="scope">
          <span style="margin-right: 10px">题目编号:</span>
          <span>{{ scope.row.subNO }}</span>
          <span style="font-size: 12px;margin-left: 10px;cursor: pointer" @click="openSub(scope.row)">查看详情</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="scope">
          <div class="han" v-if="scope.row.checkflag === 0">
            <el-button type="success" size="mini" plain @click="checkStu(scope.row,1)">
              选择
            </el-button>
            <el-button style="margin-left: 10px;margin-top: 10px" type="danger" size="mini" plain
                       @click="checkStu(scope.row,2)">
              拒绝
            </el-button>
          </div>
          <div v-else>
            {{ scope.row.checkflag === 1 ? '已选择' : '已拒绝' }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="信息详情" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
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
      unchecked: 'all',
      tableData: [],
      page: {
        current: 1,
        sizes: [10, 20, 50, 100],
        size: 10,
        total: 0
      },
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
      this.axios.post('/admin/info/getseletsub', form, {
        token: true
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
    checkStu(item, ischeck) {
      let info = {
        teacherNO: item.teacherNO,
        checkflag: ischeck,
        subNO: item.subNO
      }
      this.axios.put('/admin/teacher/choosestu', info, {
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
