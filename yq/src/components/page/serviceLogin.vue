<template>
  <div class="login-wrap">
    <div class="login-con">
      <div class="ms-login">
        <el-radio-group
          class="choice-usertype"
          v-model="ruleForm.usertype"
          @change="choiceUsertype"
        >
          <el-radio-button label="7">运营端</el-radio-button>
          <el-radio-button label="3">机构端</el-radio-button>
        </el-radio-group>
        <!-- <div class="ms-logo"></div> -->
        <div class="ms-title">
          <!-- 欢迎登录
          <span>{{["物业管理后台","小区管理后台"][this.ruleForm.usertype-2||0]}}</span>-->
          账号登录
        </div>
        
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="0px"
          class="demo-ruleForm"
          @keyup.enter.native="submitForm('ruleForm')"
        >
          <el-form-item prop="username" class="flex">
            <!-- <div class="username-icon"></div> -->
            <input
              v-model.trim="ruleForm.username"
              class="login-input input-username"
              autocomplete="off"
              placeholder="请输入账号"
            >
          </el-form-item>
          <el-form-item prop="password" class="flex">
            <!-- <div class="password-icon"></div> -->
            <input
              type="password"
              class="login-input input-password"
              autocomplete="off"
              placeholder="请输入密码"
              v-model.trim="ruleForm.password"
            >
          </el-form-item>
          <el-form-item prop="isRemember">
            <span class="flex-between">
              <el-checkbox v-model.trim="ruleForm.isRemember">记住密码</el-checkbox>
              <!-- <el-button type="text" size="normal" @click="forgetPWD()">忘记密码</el-button> -->
            </span>
          </el-form-item>
          <div class="login-btn">
            <el-button type="primary" v-focus @click="submitForm('ruleForm')">登 录</el-button>
          </div>
        </el-form>
        <!-- <span class="sys-version">当前版本:{{webversion}}</span> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/services/axios";
import api from "@/services/api";

export default {
  data: function() {
    return {

      webversion: "1.1",
      ruleForm: {
        username: "",
        password: "",
        isRemember: "",
        usertype: "3"
      },
      items: [],
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  mounted() {
    document.getElementById("systemTitle").innerHTML = "保定市莲池区新冠核酸检测信息管理平台";
  },
  created() {
    let companyInfo = JSON.parse(localStorage.getItem("companyInfo"));

    if (companyInfo) {
      this.ruleForm = Object.assign(this.ruleForm, companyInfo);
    }
  },
  methods: {
    choiceUsertype(value) {
      this.ruleForm.usertype = value;
    },
        validate(formName) {
            return new Promise((resolve, reject) => {
                this.$refs[formName].validate((valid) => {
                    if(valid){
                        resolve()
                    }
                });
            })

        },
        submitForm(formName) {
            this.validate(formName).then(() => {
                axios.post({
                    url: api.login,
                    data: {
                        username: this.ruleForm.username,
                        password: this.ruleForm.password,
                        usertype: this.ruleForm.usertype,
                }
                }).then(res => {
                    if(res.code == 0){

                        localStorage.setItem('userinfo', JSON.stringify(res.data));
                        localStorage.setItem('userid', res.data.userid );
                        localStorage.setItem('userremark', res.data.remark );


                        //usertype 1:统一支付平台,2:统一支付卫生院端,3:救护管理员
                        if(res.data.usertype == 1) {
                            this.$router.push('/admin/paystat');
                        }else if(res.data.usertype == 2) {
                            this.$router.push('/wsy/paystat');
                        }else if(res.data.usertype == 3) {
                            this.$router.push('/jhyy/orderlist');
                        }else if(res.data.usertype == 7) {
                            localStorage.setItem('userbusiness', res.data.business );
                            this.$router.push('/serviceorg/orglist');
                        }

                    }else{
                        this.$notify.error({
                            title: '错误',
                            message: res.message
                        });
                    }
                })
            })
        }


  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function(el) {
        el.focus();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "static/css/base.scss";
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background: #f0f0f0;
  .login-con {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    background: url("/static/img/login-logo2.png") no-repeat center center / 100vw
        100vh,
      #1c2344;
  }
}
.ms-logo {
  position: absolute;
  top: 50%;
  margin-top: -200px;
  width: 400px;
  height: 64px;
  background: url("/static/img/login-logo.png") no-repeat center center / auto
    64px;
}
.ms-title {
  position: absolute;
  top: 50%;
  width: 400px;
  margin-top: -100px;
  // text-align: center;
  font-size: 26px;
  letter-spacing: 3px;
  color: #302d2d;
  span {
    color: $baseColor;
  }
}
.demo-ruleForm {
  margin-top: 180px;
}
.ms-login {
  width: 506px;
  height: 675px;
  background-color: #ffffff;
  margin-left: 66%;
  padding: 40px;
  box-sizing: border-box;
  border-radius: 5px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 50px rgba(130, 183, 235, 0.25);
  position: relative;
}
.login-input {
  background: #fff;
  border: solid 2px #a1a1a1;
  border-radius: 5px;
  box-shadow: none;
  padding: 0 20px 0 20px;
  width: 400px !important;
  height: 58px !important;
  transition: all 0.3s ease 0s;
  color: #a1a1a1;
  font-size: 20px;
  font-weight: normal;
  box-sizing: border-box;
}
input::-webkit-input-placeholder {
  color: #c0c4cc;
}
input:-ms-input-placeholder {
  color: #c0c4cc;
}
input::placeholder {
  color: #c0c4cc;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  height: 60px;
  width: 400px;
  font-size: 18px;
  border-radius: 5px;
  box-sizing: border-box;
  color: #fff;
  background-color: #00d1b2;
  box-shadow: 0px 5px 5px rgba(66, 102, 252, 0.15);
  border: none;
  text-transform: capitalize;
  transition: all 0.5s ease 0s;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex {
  display: flex;
}
.username-icon {
  height: 20px;
  width: 20px;
  position: absolute;
  top: 15px;
  left: 20px;
  background: url("/static/img/username_icon.png") no-repeat center center /
    20px 20px;
}
.password-icon {
  height: 20px;
  width: 20px;
  position: absolute;
  top: 15px;
  left: 20px;
  background: url("/static/img/password_icon.png") no-repeat center center /
    20px 20px;
}

@media screen and (max-width: 1550px) {
  .ms-login {
    transform: scale(0.7);
  }
}
.sys-version {
  position: fixed;
  left: 50%;
  bottom: calc(80vw / 19.8);
  font-size: 12px;
  color: #999;
}
.toWebsite {
  position: absolute;
  top: calc(535vh / 10.8);
  left: calc(256vw / 19.2);
  width: 150px;
  height: 50px;
  background-image: linear-gradient(90deg, #6ae078 0%, #5ac167 100%),
    linear-gradient(#f5a623, #f5a623);
  background-blend-mode: normal, normal;
  border-radius: 6px;
  font-family: PingFang-SC-Medium;
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 50px;
  text-align: center;
  letter-spacing: 2px;
  color: #ffffff;
  cursor: pointer;
}

</style>