<template>
  <div class="index_container">
    <el-container>
      <el-aside>
        <div class="logo">
          <span class="round">Eye</span> 菜谱程序管理系统
        </div>
        <el-menu :router="true"
                 :default-active="$route.name">
          <template >
            <el-menu-item v-for="(item,index) in routerList"
                          :index="item.name"
                          :route="item.name"
                          :key="item.name">
              <i :class="item.meta.icon"></i>
              <span>{{item.meta.title}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header class="header"
                   style="text-align: right; font-size: 15px;padding-right:50px;">
          <span style="margin-right: 15px">欢迎您，{{userName}}</span>
          <el-dropdown>
            <i class="el-icon-setting"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleOpenUpdateWord()">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="handleExit()">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <transition name="component-fade"
                      mode="out-in">
            <router-view />
          </transition>
        </el-main>
      </el-container>
    </el-container>

    <el-dialog title="修改密码"
               :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="旧密码"
                      prop="oldPassword">
          <el-input v-model="ruleForm.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码"
                      prop="newPassword">
          <el-input v-model="ruleForm.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="重复新密码"
                      prop="towPassword">
          <el-input v-model="ruleForm.towPassword"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="handleUpdateWord">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import router from "../router/index";
import { updatePass } from "../api/user";

export default {
  components: {},
  mounted() {
     let routerArr = router.options.routes[2].children;
    let roles = JSON.parse(localStorage.getItem("cookbook_UserInfo")).roleName;
    for (let i = 0; i < routerArr.length; i++) {
      if (routerArr[i].meta.roles.indexOf(roles) > -1) {
        this.routerList.push(routerArr[i]);
      }
    }
  },
  data() {
    return {
      routerList: [],
      userName: JSON.parse(localStorage.getItem("cookbook_UserInfo")).userName,
      ruleForm: {
        oldPassword: "",
        newPassword: "",
        towPassword: "",
      },
      rules: {
        oldPassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
        ],
        towPassword: [
          { required: true, message: "请重复新密码", trigger: "blur" },
        ],
      },
      dialogFormVisible: false,
    };
  },
  methods: {
    handleExit() {
      this.$confirm("是否退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$router.push("/");
          localStorage.removeItem("cookbook_UserInfo")
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },

    // 修改密码弹窗
    handleOpenUpdateWord() {
      this.dialogFormVisible = true;
    },

    // 修改密码提交
    handleUpdateWord() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          if (this.ruleForm.newPassword != this.ruleForm.towPassword) {
            this.$message({
              type: "error",
              message: "两次密码输入不一致",
            });
            return;
          }
          this.ruleForm.userName = this.userName;
          updatePass(this.ruleForm).then((res) => {
            if (res.data.code == 20000) {
              this.$message({
                type: "success",
                message: "修改成功",
              });
              this.resetForm();
              this.dialogFormVisible = false;
            } else {
              this.$message({
                type: "error",
                message: res.data.message,
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    resetForm() {
      this.$refs["ruleForm"].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  background-color: #5f59b6;
  color: #fff;
  height: 80px;
  text-align: center;
  line-height: 80px;
  border-right: none;
  cursor: pointer;
  .round {
    display: inline-block;
    margin-right: 3px;
    width: 40px;
    line-height: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 20px;
    background-color: #d07119;
  }
}
.index_container {
  height: 100%;
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.2s ease;
}
.component-fade-enter, .component-fade-leave-to
		/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  height: 80px !important;
  text-align: center;
  line-height: 80px;
}
.el-container {
  width: 100%;
  height: 100%;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  width: 230px !important;

  line-height: 200px;
  &::-webkit-scrollbar {
    display: none !important;
  }
}

.el-main {
  background-color: #e9eef3;
  height: 100%;
  &::-webkit-scrollbar {
    display: none !important;
  }
}
.el-menu {
  height: calc(100% - 80px);
}
.el-menu-item i {
  // color: #fff;
}
</style>