<template>
  <div style="margin-top: 10px">
    <el-tabs v-model="tabIndex" @tab-click="handleClick">
      <el-tab-pane :label="tab.name" :key="tabI" v-for="(tab,tabI) in tabbars">
      </el-tab-pane>
    </el-tabs>
    <el-table border :data="tableData" style="width: 100%">
      <el-table-column prop="subNO" label="题目编号" align="center" width="70">
      </el-table-column>
      <el-table-column prop="subTitle" label="题目标题" align="center" width="150">
      </el-table-column>
      <el-table-column prop="teacherNO" label="指导教师" align="center" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.teacherNO }}</span>
          <span style="font-size: 12px;margin-left: 10px;cursor: pointer" @click="openModel(scope)">查看详情</span>
        </template>
      </el-table-column>
      <el-table-column prop="subDetail" label="题目内容" align="center">
      </el-table-column>
      <el-table-column label="题目状态" align="center" width="150">
        <template slot-scope="scope">
					<span v-if="scope.row.status === 0">
            审核中
					</span>
          <span v-else-if="scope.row.status === 1">
            审核通过
					</span>
          <span v-else>
            未通过审核
					</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="100">
        <template slot-scope="scope">
          <div class="han" v-if="scope.row.status !== 1">
            <el-button type="info" size="mini" plain @click="openSub(scope.row)">
              重新编辑
            </el-button>
            <el-button style="margin-left: 0;margin-top: 10px" type="danger" size="mini" plain
                       @click="deleteItem(scope.row)">
              删除题目
            </el-button>
          </div>
          <div v-else>
            <el-button type="danger" size="mini" plain @click="deleteItem(scope.row)">
              删除题目
            </el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="note" label="审核意见" align="center">
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
          <el-input v-model="form2.subTitle" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="选题内容" prop="subDetail">
          <el-input type="textarea" :autosize="{ minRows: 3}" v-model="form2.subDetail" style="width: 250px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="subVisible = false">取 消</el-button>
        <el-button type="primary" @click="resubmit">提交</el-button>
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
      },
        {
          name: "查看未通过审核的课题",
          key: "unpassed"
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
    handleClick(tab, event) {
      this.unchecked = this.tabbars[this.tabIndex].key
      this.status = 1
      if (this.unchecked !== 'all') this.status = 2
      this.getList()
    },
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
        status: this.status,
        currentPage: this.page.current,
        pageSize: this.page.size,
        id: this.user.userID,
        role: this.user.user_role
      }
      this.axios.post('/admin/info/getsub', form,{
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
    openSub(e){
      this.form2 = {
        subNO: e.subNO,
        subTitle: e.subTitle,
        subDetail: e.subDetail
      }
      this.subVisible = true
    },
    resubmit() {
      this.axios.put('/admin/teacher/updatequs',this.form2,{
        token:true
      }).then(res=>{
        if (res.data.code != '200') {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        } else {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          this.subVisible = false
          this.getList()
        }
      })
    },
    deleteItem(item) {
      this.$confirm('是否要删除该选题?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.delete('/admin/teacher/deletequs/' + item.subNO, {
          token: true
        }).then(res => {
          this.getList()
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
        })
      })
    }
  }
}
</script>

<style scoped>
div.han {
  display: flex;
  flex-direction: column;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 200px;
  right: 0;
  z-index: 100;
}
</style>
