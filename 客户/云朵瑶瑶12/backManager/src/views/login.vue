<template>
  <div class="login-container">
    <el-form ref="loginForm"
             :model="loginForm"
             :rules="loginRules"
             class="login-form"
             autocomplete="on"
             label-position="left">
      <div class="title-container">
        <img src="../assets/image/logo3.png"
             width="60" />
        <span class="title">菜谱程序管理系统</span>
      </div>

      <el-form-item prop="userName">
        <span class="svg-container">
          <i class="el-icon-user-solid"></i>
        </span>
        <el-input ref="userName"
                  v-model="loginForm.userName"
                  placeholder="请输入用户名"
                  name="u_id"
                  type="text"
                  tabindex="1"
                  autocomplete="on"
                  clearable />
      </el-form-item>

      <el-tooltip v-model="capsTooltip"
                  content="键盘大写已锁定"
                  placement="right"
                  manual>
        <el-form-item prop="passWord">
          <span class="svg-container">
            <i class="el-icon-suitcase-1"></i>
          </span>
          <el-input :key="passWordType"
                    ref="passWord"
                    v-model="loginForm.passWord"
                    :type="passWordType"
                    placeholder="请输入密码"
                    name="passWord"
                    tabindex="2"
                    clearable
                    autocomplete="on"
                    @keyup.native="checkCapslock"
                    @blur="capsTooltip = false"
                    @keyup.enter.native="handleLogin" />
          <span class="show-pwd"
                @click="showPwd">
          </span>
        </el-form-item>
      </el-tooltip>

      <!-- <el-form-item class="passWord_tip">
        <span class="lose_passWord_tip"
              @click="$router.push({name: 'register'})">注册账号</span>
      </el-form-item> -->

      <el-button :loading="loading"
                 type="primary"
                 style="width:100%;height:40px;margin-bottom:30px;"
                 @click.native.prevent="handleLogin"
                 @keyup.enter.native="loginEnter()">登录</el-button>
    </el-form>
    <!-- <el-dialog :visible.sync="dialogVisible"
               width="350px"
               :close-on-click-modal="false"
               :show-close="false">
      <slide-verify ref="slideblock"
                    @again="onAgain"
                    @fulfilled="onFulfilled"
                    @success="onSuccess"
                    @fail="onFail"
                    :imgs=""
                    @refresh="onRefresh"
                    :accuracy="accuracy"
                    :slider-text="text"
                    :w="weightMobie"></slide-verify>
      <div class="loginValidTip">{{msg}}</div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import { login } from "../api/login";

export default {
  name: "Login",
  data() {
    const validateuserName = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入您的用户名"));
      } else {
        callback();
      }
    };
    const validatepassWord = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入您的密码"));
      } else if (value.length < 6) {
        callback(new Error("亲，密码长度至少6位以上哦!"));
      } else {
        callback();
      }
    };

    return {
      loginForm: {
        userName: "",
        passWord: "",
        captchaCode: "",
      },
      loginRules: {
        userName: [
          { required: true, trigger: "blur", validator: validateuserName },
        ],
        passWord: [
          { required: true, trigger: "blur", validator: validatepassWord },
        ],
      },
      remenberMe: false,
      passWordType: "passWord",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      svg: null,
      msg: "",
      dialogVisible: false,
      text: "滑动滑块对齐缺口",
      // 精确度小，可允许的误差范围小；为1时，则表示滑块要与凹槽完全重叠，才能验证成功。默认值为5
      accuracy: 5,
      validFlag: false,
      // 适配移动端 宽度
      weightMobie: null,
    };
  },

  created() {
    // 回车登录事件挂载再dom创建的时候
    var _self = this;
    document.onkeydown = function (e) {
      if (window.event == undefined) {
        var key = e.key;
      } else {
        var key = window.event.keyCode;
      }
      if (key == 13 || key == 100) {
        _self.loginEnter();
      }
    };

    if (this._isMobile() != null) {
      this.weightMobie = 266;
    } else {
      this.weightMobie = 310;
    }
  },
  mounted() {
    if (this.loginForm.userName === "") {
      this.$refs.userName.focus();
    } else if (this.loginForm.passWord === "") {
      this.$refs.passWord.focus();
    }
  },

  methods: {
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
    closeDialog() {
      this.loading = false;
      this.dialogVisible = false;
      this.$refs.slideblock.reset();
    },
    onSuccess(times) {
      console.log("验证通过，耗时 " + times + "毫秒");
      this.msg = "验证成功, 耗时" + `${(times / 1000).toFixed(1)}s`;
      this.validFlag = true;
      this.handleLogin();
    },
    onFail() {
      console.log("验证不通过");
      this.msg = "";
      this.validFlag = false;
    },
    onRefresh() {
      console.log("点击了刷新小图标");
      this.msg = "";
      this.validFlag = false;
    },
    onFulfilled() {
      console.log("刷新成功啦！");
      this.validFlag = false;
    },
    onAgain() {
      console.log("检测到非人为操作的哦！");
      this.msg = "重新尝试一下";
      this.validFlag = false;
      // 刷新
      this.$refs.slideblock.reset();
    },
    // 检查是否大写锁定
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },

    // 回车登录
    loginEnter() {
      this.handleLogin();
    },
    showPwd() {
      if (this.passWordType === "passWord") {
        this.passWordType = "";
      } else {
        this.passWordType = "passWord";
      }
      this.$nextTick(() => {
        this.$refs.passWord.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // this.dialogVisible = true;
          this.loading = true;

          // if (this.validFlag) {
            login(this.loginForm)
              .then((res) => {
                if (res.data.code == 20000) {
                  window.localStorage.setItem(
                "cookbook_UserInfo",
                JSON.stringify(res.data.data[0])
              );
                  this.$message({
                    message: "登录成功",
                    type: "success",
                  });
                  this.$router.push("/index");
                  this.loading = false;
                } else {
                  this.$nextTick(() => {
                   // this.$refs.slideblock.reset();
                    this.validFlag = false;
                    this.msg = "";
                    this.$message({
                    message: res.data.message,
                    type: "error",
                  });
                  });
                  this.loading = false;
                }
              })
              .catch(() => {
                this.$nextTick(() => {
                  this.$refs.slideblock.reset();
                  this.validFlag = false;
                  this.msg = "";
                });
                this.loading = false;
              });
        //   }
        // } else {
        //   console.log("error submit!!");
        //   this.loading = false;
        //   return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
// 登录输入框颜色
$cursor: rgba(0, 0, 0, 0.65);

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  width: 100%;
  height: 100vh;
  background: url(../assets/image/background.svg);
  background-size: cover;
  .el-input {
    display: inline-block;
    width: 84%;
    vertical-align: middle;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 30px 12px 15px;

      caret-color: $cursor;
      &:-webkit-autofill {
        // 提示框颜色
        box-shadow: 0 0 0px 1000px #fff inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item:nth-child(-n + 3) {
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 450px;
    max-width: 100%;
    min-height: 20px;
    padding-top: 160px;
    margin: 100px auto;
    overflow: hidden;
  }

  button {
    background-color: #59a9f3;
    border-color: #59a9f3;
    &:hover {
      background-color: #2e8feb;
      border-color: #2e8feb;
    }
  }
  .el-form-item {
    margin-bottom: 28px;
  }
  .passWord_tip {
    margin-bottom: 15px;
    .save_passWord_tip {
      float: left;
    }
    .lose_passWord_tip {
      color: orange;
      float: right;
      cursor: pointer;
    }
  }
  .svg-container {
    padding: 0px 5px 0px 10px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    margin-bottom: 25px;
    img {
      margin: 0 0 0 20px;
    }

    .title {
      width: 400px;
      position: absolute;
      font-size: 26px;
      color: #59a9f3;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      // margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }


  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
.loginValidTip {
  font-size: 14px;
  color: #0aa58e;
  padding-top: 5px;
}

@media screen and (max-width: 500px) {
  .el-dialog__wrapper .el-dialog {
    width: 300px !important;
    .el-dialog__body {
      padding: 10px 20px !important;
      .el-form-item__label {
        width: 68px !important;
      }
      .el-select,
      .el-input {
        width: 180px !important;
      }
    }
  }
}

.dialog-footer .el-button {
  color: #fff;
}

.footer {
  position: absolute;
  width: 100%;
  height: 60px;
  background-color: #eaebec;
  bottom: 0;
  left: 50%;
  opacity: 0.8;
  transform: translateX(-50%);
  .copy {
    line-height: 60px;
    text-align: center;
    a {
      font-size: 14px;
      color: #333;
      padding-right: 10px;
    }
  }
}
</style>
