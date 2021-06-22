<template>
  <div class="description_text">
    <div class="title">{{ title }}</div>
    <el-row :gutter="20" class="el-row">
      <el-col :span="8">
        <div class="term">学号</div>
        <div class="detail">{{ dataSource.userID }}</div>
      </el-col>
      <el-col :span="8">
        <div class="term">姓名</div>
        <div class="detail">{{ dataSource.username }}</div>
      </el-col>
      <el-col :span="8">
        <div class="term">年龄</div>
        <div class="detail">{{ dataSource.age }}</div>
      </el-col>
      <el-col :span="8">
        <div class="term">性别</div>
        <div class="detail">{{ dataSource.sex }}</div>
      </el-col>
      <el-col :span="8">
        <div class="term">邮箱</div>
        <div class="detail">{{ dataSource.usermail }}</div>
      </el-col>
      <el-col :span="8">
        <div class="term">电话</div>
        <div class="detail">{{ dataSource.userphone }}</div>
      </el-col>
      <el-col :span="8">
        <div class="term">角色</div>
        <div class="detail" v-if="dataSource.user_role !=2">{{ dataSource.user_role === 0 ? '学生' :'老师' }}</div>
        <div class="detail" v-else>管理员</div>
      </el-col>
      <el-col :span="8">
        <div class="term">创建时间</div>
        <div class="detail">{{ dataSource.create_time }}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "index",
  data() {
    return {
      title: '个人信息',
      dataSource: {
        'userID': '',
        'username': '',
        'age': '',
        'sex': '',
        'usermail': '',
        'userphone': '',
        'user_role':'',
        'create_time': ''
      }
    }
  },
  computed:{
    ...mapState({
      user:state => state.user
    })
  },
  methods: {
    getInfo() {
      let id = this.user.userID
      this.axios.get('/admin/users/profile/'+id,{token: true}).then(res=>{
        this.dataSource = res.data.data
      })
    }
  },
  created() {
    this.getInfo()
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.description_text .title {
  font-weight: 700;
  font-size: 16px;
  line-height: 1.5;
  margin-top: 30px;
  margin-bottom: 20px;
  color: rgba(0, 0, 0, 0.85);
}

.description_text .term {
  color: rgba(0, 0, 0, .85);
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  padding-bottom: 16px;
  margin-right: 8px;
  white-space: nowrap;
  display: table-cell;

}

.description_text .term:after {
  content: ":";
  margin: 0 8px 0 2px;
  position: relative;
  top: -0.5px;
}

.description_text .detail {
  font-size: 14px;
  line-height: 1.5;
  width: 100%;
  padding-bottom: 16px;
  color: rgba(0, 0, 0, 0.65);
  display: table-cell;
}

</style>
