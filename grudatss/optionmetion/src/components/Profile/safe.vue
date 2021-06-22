<template>
  <div>
    <router-link :to="{name:'profile-update'}" style="position: relative;top: 14px;left: 20px;">
      <el-button size="medium">回到账号安全页面</el-button>
    </router-link>
    <div style="height: 30px;"></div>
    <div v-if="id==0" class="box">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="旧密码" prop="old_pass">
          <el-input type="password" v-model="ruleForm.old_pass" placeholder="请输入当前的登录密码" show-password
                    style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_pass">
          <el-input type="password" v-model="ruleForm.new_pass" placeholder="请输入新密码" autocomplete="off" show-password
                    style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" placeholder="再次输入新密码" autocomplete="off" show-password
                    style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-else-if="id==1" class="box">
      <el-form :model="infoForm" status-icon :rules="rules" ref="infoForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="infoForm.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="infoForm.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('infoForm')">提交</el-button>
          <el-button @click="resetForm('infoForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-else-if="id==2" class="box">
      <el-form :model="emailForm" ref="emailForm" label-width="100px" class="demo-dynamic">
        <el-form-item
            prop="usermail"
            label="邮箱"
            :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]">
          <el-input v-model="emailForm.usermail" placeholder="请输入你的常用邮箱" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('emailForm')">提交</el-button>
          <el-button @click="resetForm('emailForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-else class="box">
      <el-form :model="phoneForm" :rules="rules" ref="phoneForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="联系电话:" prop="userphone" required>
          <el-input v-model="phoneForm.userphone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('phoneForm')">提交</el-button>
          <el-button @click="resetForm('phoneForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "safe",
  data() {
    var checkOldpass = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('密码不能为空'));
      } else {
        callback()
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.new_pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
      if (!value) {
        return callback(new Error('电话号码不能为空'))
      }
      setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,实际输入的数字总是识别成字符串
        // 所以在前面加了一个+实现隐式转换
        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('电话号码格式不正确'))
          }
        }
      }, 100)
    };
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
      id: '',
      userID:'',
      ruleForm: {
        old_pass: '',
        new_pass: '',
        checkPass: ''
      },
      rules: {
        old_pass: [
          {validator: checkOldpass, trigger: 'blur'}
        ],
        new_pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ],
        userphone: [
          { validator: checkPhone, trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ]
      },
      emailForm: {
        usermail: ''
      },
      phoneForm: {
        userphone: ''
      },
      infoForm: {
        age: '',
        sex: '男'
      }
    }
  },
  created() {
    this.getParams()
    this.userID = this.user.userID
  },
  computed:{
    ...mapState({
      user:state => state.user
    })
  },
  methods: {
    getParams() {
      this.id = this.$route.query.id
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.id == 0) {
            let passform = {
              userID: this.userID,
              old_password:this.ruleForm.old_pass,
              new_password:this.ruleForm.new_pass
            }
            this.changeInfo(passform,'modifypass','ruleForm')
          } else if(this.id == 1) {
            this.infoForm.userID = this.userID
            this.changeInfo(this.infoForm,'updateprofile','infoForm')
          }else if(this.id == 2) {
            this.emailForm.userID = this.userID
            this.changeInfo(this.emailForm,'updateprofile','emailForm')
          }else {
            this.phoneForm.userID = this.userID
            this.changeInfo(this.phoneForm,'updateprofile','phoneForm')
          }
        } else {
          return false;
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    changeInfo(form,rou,formName){
      let that = this
      this.axios.post('/admin/users/'+rou,form,{
        token:true
      }).then(res=>{
        if (res.data.code != '200') {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
          this.resetForm(formName)
        } else {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          this.resetForm(formName)
          if(rou === 'modifypass') {
            that.changRoute()
          }else {
            that.changRoute1()
          }
        }
      })
    },
    changRoute(){
      // 清除状态和存储
      this.$store.commit('logout')
      const loading = this.$loading({
        lock: true,
        text: '页面将在3秒后自动跳转到登录页面',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.1)'
      });
      setTimeout(() => {
        this.$router.push({path: "/login"});
        loading.close();
      }, 3000);
    },
    changRoute1(){
      this.$router.push({
        path: "/profile/update"
      })
    }
  },
  watch: {
    '$route': 'getParams'
  }
}
</script>

<style scoped>
.box {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
