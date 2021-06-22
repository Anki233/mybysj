<template>
  <div>
    <h2 class="allTitle">武汉纺织大学毕业设计选题系统</h2>
    <div class="ban"></div>
    <div id="register-container">
      <div class="login-title">
        注册
      </div>
      <div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账号" prop="userID">
            <el-input type="text" v-model="ruleForm.userID" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input placeholder="请输入密码" show-password v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPassword">
            <el-input placeholder="请输入密码" show-password v-model="ruleForm.checkPassword"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="username">
            <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="usermail">
            <el-input type="mail" v-model="ruleForm.usermail" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="userphone">
            <el-input type="text" v-model="ruleForm.userphone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="我想成为">
            <el-radio v-model="ruleForm.user_role" label="0">学生</el-radio>
            <el-radio v-model="ruleForm.user_role" label="1">教师</el-radio>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <div class="link">
          <div class="link-right" @click="goback()">已有账号，去登录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账户'));
      } else {
        if (this.ruleForm.pass !== '') {
          this.$refs.ruleForm.validateField('pass');
        }
        callback();
      }
    };
    var validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPassword');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        userID: '',
        password: '',
        checkPassword: '',
        username: '',
        usermail: '',
        userphone: '',
        user_role: '0'
      },
      rules: {
        userID: [
          {validator: validatePass, trigger: 'blur'}
        ],
        password: [
          {validator: validatePass1, trigger: 'blur'}
        ],
        checkPassword: [
          {validator: validatePass2, trigger: 'blur'}
        ]
      },
      isLogin: false
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post('/admin/register', this.ruleForm).then(res => {
            if (res.data.code != '200') {
              return this.$message({
                message: res.data.msg,
                type: 'error'
              })
            } else {
              this.$message({
                message: '注册成功',
                type: 'success'
              })
              this.resetForm('ruleForm')
              this.$router.push({path: "/login"})
            }
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goback() {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
html {
  height: 100vh;
}
.ban{
  background: url("../assets/ban.jpg") center center no-repeat;
  background-size: 100% 100%;
  width: 100vw;
  height: 70vh;
  position: relative;
  top: 20px;
  right: 0;
  left: 0;
}
.allTitle {
  margin-top: 30px;
  text-align: center;
  font-size: 28px;
}
#register-container {
  width: 400px;
  min-height: 372px;
  background: #e5e9f2;
  position: absolute;
  left: 78%;
  top: 5%;
  margin-left: -220px;
  border-radius: 10px;
  padding-top: 40px;
  padding-right: 40px;
  box-shadow: 0 0 30px #eee;
}

.login-title {
  height: 50px;
  font-size: 22px;
  text-align: center;
  color: #a8a0b7;
  margin: auto;
}

.link {
  display: flex;
  justify-content: flex-end;
  font-size: 12px;
  color: #2e82ff;
  margin-bottom: 20px;
}

.link-right {
  cursor: pointer;
}
</style>
