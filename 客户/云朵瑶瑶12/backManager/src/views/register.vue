<template>
  <div class="login-container">
    <el-form ref="dataForm"
             :model="dataForm"
             :rules="registerRules"
             class="login-form"
             autocomplete="on"
             label-position="left">
      <div class="title-container">
        <img src="../assets/image/logo3.png"
             width="60" />
        <span class="title"
              style="color:red;">用户注册</span>

      </div>

      <el-form-item prop="userName">
        <span class="svg-container">
          <i class="el-icon-user-solid"></i>
        </span>
        <el-input ref="userName"
                  v-model="dataForm.userName"
                  placeholder="请输入用户名"
                  name="usernmae"
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
                    v-model="dataForm.passWord"
                    :type="passWordType"
                    placeholder="请输入密码"
                    name="passWord"
                    clearable
                    tabindex="2"
                    @keyup.native="checkCapslock"
                    @blur="capsTooltip = false" />
          <span class="show-pwd"
                @click="showPwd">
          </span>
        </el-form-item>
      </el-tooltip>

      <el-tooltip v-model="capsTooltip"
                  content="键盘大写已锁定"
                  placement="right"
                  manual>
        <el-form-item prop="twoPassword">
          <span class="svg-container">
            <i class="el-icon-suitcase-1"></i>
          </span>
          <el-input :key="passWordType"
                    ref="passWord"
                    v-model="dataForm.twoPassword"
                    :type="passWordType"
                    placeholder="请输入密码"
                    name="twoPassword"
                    clearable
                    tabindex="2"
                    @keyup.native="checkCapslock"
                    @blur="capsTooltip = false" />
          <span class="show-pwd"
                @click="showPwd">
          </span>
        </el-form-item>
      </el-tooltip>

      <el-form-item prop="email">
        <span class="svg-container">
          <i class=" el-icon-message"></i>
        </span>

        <el-input ref="email"
                  v-model="dataForm.email"
                  placeholder="输入邮箱"
                  name="email"
                  type="text"
                  tabindex="3"
                  clearable />
      </el-form-item>

      <el-form-item class="passWord_tip">
        <span class="lose_passWord_tip"
              @click="$router.push('/')">已有账号?返回登录</span>
      </el-form-item>

      <el-button :loading="loading"
                 type="primary"
                 style="width:100%;height:40px;margin-bottom:30px;"
                 @click.native.prevent="handleRegister"
                 @keyup.enter.native="submitRegister()">注册</el-button>
    </el-form>
    <el-dialog :visible.sync="dialogVisible"
               width="350px"
               :close-on-click-modal="false"
               :show-close="false">
      <slide-verify ref="slideblock"
                    @again="onAgain"
                    @fulfilled="onFulfilled"
                    @success="onSuccess"
                    @fail="onFail"
                    @refresh="onRefresh"
                    :accuracy="accuracy"
                    :slider-text="text"
                    :w="weightMobie"></slide-verify>
      <div class="loginValidTip">{{msg}}</div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { register } from "../api/register";
export default {
  name: "Register",
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
      dataForm: {
        userName: "",
        passWord: "",
        twoPassword: "",
        captchaCode: "",
        sex: "",
        age: null,
      },
      registerRules: {
        userName: [
          { required: true, trigger: "blur", validator: validateuserName },
        ],
        passWord: [
          { required: true, trigger: "blur", validator: validatepassWord },
        ],
        twoPassword: [
          { required: true, trigger: "blur", message: "请再次输入密码" },
        ],
        email: [{ required: true, trigger: "blur", message: "请输入邮箱" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
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
        _self.submitRegister();
      }
    };

    if (this._isMobile() != null) {
      this.weightMobie = 266;
    } else {
      this.weightMobie = 310;
    }
  },
  mounted() {
    if (this.dataForm.userName === "") {
      this.$refs.userName.focus();
    } else if (this.dataForm.passWord === "") {
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
      this.handleRegister();
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
    submitRegister() {
      this.handleRegister();
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
    handleRegister() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          if (this.dataForm.passWord != this.dataForm.twoPassword) {
            this.$message({
              message: "两次密码输入不一致！",
              type: "error",
            });
            return;
          }
          this.dataForm.roleId = 2;
          register(this.dataForm)
            .then((res) => {
              if (res.data.code == 20000) {
                this.$message({
                  message: res.data.message,
                  type: "success",
                });
                this.$router.push("/");
              } else {
                this.$message({
                  message: res.data.message,
                  type: "error",
                });
              }
            })
            .catch(() => {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
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

  .el-form-item:nth-child(-n + 5) {
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
    width: 350px;
    max-width: 100%;
    min-height: 20px;
    padding-top: 160px;
    margin: 0px auto;
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

    .set-language {
      color: #0aa58e;
      position: absolute;
      border: 1px dashed #0aa58e;
      border-radius: 4px;
      top: 20px;
      font-size: 15px;
      right: 0px;
      cursor: pointer;
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
