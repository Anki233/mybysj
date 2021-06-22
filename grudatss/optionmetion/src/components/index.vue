<template>
  <div style="margin-top: 20px">
    <el-tooltip class="item" effect="dark" content="使用本系统前，请务必观看下面的提示" placement="top">
      <h2 style="text-align: center">公告</h2>
    </el-tooltip>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="8" v-if="user.user_role == 0">
        <div class="grid-content bg-purple">
          <el-card :span="8" class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span>学生请注意：</span>
            </div>
            <div v-for="(value,index) in student" :key="index" class="text item">
              {{ index + 1 }}: {{ value }}
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8" v-else-if="user.user_role == 1">
        <div class="grid-content bg-purple-light">
          <el-card :span="8" class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span>教师请注意：</span>
            </div>
            <div v-for="(value,index) in teacher" :key="index" class="text item">
              {{ index + 1 }}: {{ value }}
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8" v-else>
        <div class="grid-content bg-purple">
          <el-card :span="8" class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span>管理员请注意：</span>
            </div>
            <div v-for="(value,index) in admin" :key="index" class="text item">
              {{ index + 1 }}: {{ value }}
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "index",
  data() {
    return {
      student: [
        "选择课题在’课题‘页面查看",
        "退选课题只能在’已选课题‘页面进行退选操作",
        "每人只能选择一个题目",
        "选题完成后，需要等待老师进行选择",
        "个人信息等操作在’账号安全‘页面进行操作"
      ],
      teacher: [
        "新增选题在‘发布选题’页面进行",
        "查看自身的选题在’我的选题‘页面进行",
        "对未通过的课题在’我的选题‘页面进行重新编辑操作",
        "也可对自身的课题在’我的选题‘页面进行删除操作",
        "对学生进行选择需在’选择学生‘页面进行",
        "个人信息等操作在’账号安全‘页面进行操作"
      ],
      admin: [
        "查看所有的选题在’管理课题‘页面进行",
        "对老师提交的选题也在’管理课题‘页面进行管理等操作",
        "对老师未选择学生的课题进行删除需在’管理未通过老师筛选的学生‘页面进行",
        "个人信息等操作在’账号安全‘页面进行操作"
      ]
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  }
}
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 550px;
  height: 350px;
}

.box-card div {
  padding: 10px;
}
</style>
