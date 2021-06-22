<template>
  <div style="margin-top: 20px">
    <el-form ref="subform" :model="subform" label-width="80px">
      <el-form-item label="选题编号" prop="subNO">
        <el-input v-model="subform.subNO" style="width: 250px"></el-input>
      </el-form-item>
      <el-form-item label="选题标题" prop="subTitle">
        <el-input v-model="subform.subTitle" style="width: 250px"></el-input>
      </el-form-item>
      <el-form-item label="选题内容" prop="subDetail">
        <el-input type="textarea" :autosize="{ minRows: 3}" v-model="subform.subDetail" style="width: 250px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="resetForm('subform')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "addsub",
  data() {
    return {
      subform: {
        subNO: '',
        subTitle: '',
        subDetail: ''
      },
      teacherNO:''
    }
  },
  created() {
    this.teacherNO = this.user.userID
  },
  computed:{
    ...mapState({
      user:state => state.user
    })
  },
  methods: {
    onSubmit() {
      this.subform.teacherNO = this.teacherNO
      this.axios.post('/admin/teacher/submitqus',this.subform,{
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
          this.resetForm('subform')
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$router.push({
        path:'/teacher/mysub'
      })
    }
  }
}
</script>

<style scoped>

</style>
