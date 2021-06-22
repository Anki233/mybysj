<template>
  <div>
    <h2 class="allTitle">武汉纺织大学毕业设计选题系统</h2>
    <div class="ban"></div>
    <div id="login-container">
      <div class="login-title">
        登录
      </div>
      <div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账号" prop="userID">
            <el-input type="text" v-model="ruleForm.userID" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" show-password v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <div class="link">
          <div class="link-left linkpo" @click="forgetpass()">忘记密码？</div>
          <div class="link-right linkpo" @click="goto()">注册账号</div>
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
        if (this.ruleForm.password !== '') {
          this.$refs.ruleForm.validateField('password');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        userID: '',
        password: '',
      },
      rules: {
        userID: [
          {validator: validatePass, trigger: 'blur'}
        ],
        password: [
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
          this.axios.post('/admin/login',this.ruleForm).then(res=>{
            if (res.data.code != '200'){
              return this.$message({
                message:res.data.msg,
                type:'error'
              })
            }else {
              // 存储到vuex中
              let data = res.data.data
              // 存储到本地存储
              this.$store.commit('login',data)
              window.sessionStorage.setItem('rules',JSON.stringify(data.rules))
              this.$message({
                message:'登录成功',
                type:'success'
              })
              this.$router.push({path: "/"})
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
    forgetpass() {
      this.$message({
        message: '请联系管理员！',
        type: 'warning'
      })
    },
    goto() {
      this.$router.push('/register')
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
#login-container {
  width: 400px;
  min-height: 320px;
  background: #e5e9f2;
  position: absolute;
  left: 70%;
  top: 50%;
  margin-left: -220px;
  margin-top: -170px;
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
  justify-content: space-between;
  font-size: 12px;
  color: #2e82ff;
}

.linkpo {
  cursor: pointer;
}

.link-left {
  padding-left: 32px;
}
</style>
