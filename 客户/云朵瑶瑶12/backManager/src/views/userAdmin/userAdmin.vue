<template>
  <div class="user_admin">
    <div class="query">
      <el-card class="box-card">
        <el-input v-model="queryParams.name" clearable placeholder="请输入要搜索的用户名"  style="width:250px;margin-right:10px;" />
        <el-button size="medium"  type="primary" @click="handleGetUserList()">搜索
        </el-button>
        <el-button size="medium" type="primary"  @click="handleAddUserDialog()">添加用户 </el-button>
      </el-card>
    </div>
    <div class="table_data">
      <el-table :data="tableData"  style="width: 100%;">
        <el-table-column align="center" fixed label="ID" prop="id" width="80" />
        <el-table-column  fixed label="微信openId"  prop="openId" width="260" />
        <el-table-column align="center"  fixed label="用户名" prop="userName" width="100" />
        <el-table-column align="center"  label="角色权限" width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.roleId == 1"
                    type="warning">
              {{ scope.row.roleId | roles }}
            </el-tag>
            <el-tag v-if="scope.row.roleId == 2"
                    type="success">
              {{ scope.row.roleId | roles }}
            </el-tag>
            <el-tag v-if="scope.row.roleId == 3">
              {{ scope.row.roleId | roles }}
            </el-tag>
            <el-tag v-if="scope.row.roleId == 4">
              {{ scope.row.roleId | roles }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="年龄"  prop="age" width="60" />
        <el-table-column align="center"  label="性别"  prop="sex" width="60"  >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.sex == 0"  type="success">
              女
            </el-tag>
            <el-tag v-if="scope.row.sex == 1"   type="danger">
              男
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="头像" width="180">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.avatar == null || scope.row.avatar.length==0"
                    type="success">暂无图片
            </el-tag>
            <el-image v-else
                      :preview-src-list="srcList"
                      :src="scope.row.avatar"
                      fit='fill'
                      style="width:80px;"
                      @click="showImg(scope.row.avatar)">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column align="center" label="邮箱"  prop="email" width="200" />
        <el-table-column align="center"  label="账号状态"  >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status == 0"
                    type="success">
              正常
            </el-tag>
            <el-tag v-if="scope.row.status == 1"
                    type="danger">
              禁用
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="最近登录时间" prop="loginTime" width="200">
        </el-table-column>
        <el-table-column align="center" label="操作" width="300">
          <template slot-scope="scope">
            <el-button size="small" type="primary"  @click="handleUpdateDialog(scope.row)">编辑
            </el-button>
            <el-button size="small" type="danger"  @click="handleDel(scope.row)">删除
            </el-button>
            <el-button v-if="scope.row.roleId > 1 && scope.row.id != userInfo.id && scope.row.status == 0" size="small"
                       type="warning" @click="handleBans(scope.row)">禁用该用户
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination :current-page.sync="queryParams.page"
                     :page-size="queryParams.size"
                     :pager-count="5"
                     :total="queryParams.total"
                     class="pageClass"
                     layout="prev, pager, next, jumper,total"
                     @current-change="handleCurrentChange">
      </el-pagination>
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%">
      <el-form ref="ruleForm" :model="dataForm" :rules="rules" class="demo-ruleForm" label-width="100px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="dataForm.userName"  clearable></el-input>
        </el-form-item>
        <el-form-item v-if="dialogTitle != '修改用户'" label="密码" prop="passWord">
          <el-input v-model="dataForm.passWord" clearable show-passWord></el-input>
        </el-form-item>
        <el-form-item v-if="dialogTitle != '添加用户'" label="微信openId">
          <el-input v-model="dataForm.openId"  disabled></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="dataForm.age"  clearable oninput="value=value.replace(/[^\d]/g,'')"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"  prop="email">
          <el-input v-model="dataForm.email"  clearable></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="dataForm.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传头像">
          <el-upload :before-upload="handleBeforeUpload"
                     :file-list="fileList"
                     :limit="1"
                     :on-remove="handleRemove"
                     :on-success="handleUploadSuccess"
                     action="http://127.0.0.1:12501/upload/img"
                     class="upload-demo"
                     list-type="picture">
            <el-button size="small"
                       type="primary">点击上传
            </el-button>
          </el-upload>
        </el-form-item>

        <el-form-item label="权限选择"
                      prop="roleId">
          <el-select v-model="dataForm.roleId"
                     placeholder="权限选择">
            <el-option v-for="item in roleOption"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="handleCancelDialog">取 消</el-button>
        <el-button type="primary"
                   @click="handleSubimitDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserAllList,
  getRoleList,
  addUser,
  updateInfo,
  deleteUser,
  bansUser,
  getUserBySearch,
} from "../../api/userAdmin/userAdmin";

export default {
  data() {
    return {
      tableData: [],
      // 查询参数
      queryParams: {
        name: "",
        // 当前页
        page: 1,
        // 每页几条
        size: 10,
        // 总条目数
        total: 0,
      },
      srcList: [],
      // 对话框标题
      dialogTitle: "添加用户",
      dialogVisible: false,
      // 表单数据
      dataForm: {
        userName: "",
        passWord: "",
        sex: "",
        age: "",
        email: "",
        roleId: "",
        openId: '',
        status: 0,
      },
      roleOption: [],
      fileList: [],
      // 上传文件类型
      fileType: ["jpg", "jpeg", "png"],
      rules: {
        userName: [{required: true, message: "输入用户名", trigger: "blur"}],
        passWord: [{required: true, message: "输入密码", trigger: "blur"}],
        age: [{required: true, message: "输入密码", trigger: "blur"}],
        email: [{required: true, message: "输入邮箱", trigger: "blur"}],
        sex: [{required: true, message: "请选择性别", trigger: "change"}],
        roleId: [{required: true, message: "请选择年级", trigger: "change"}],
      },
    };
  },
  filters: {
    roles(val) {
      switch (val) {
        case 1:
          return "管理员";
        case 2:
          return "菜谱分享者";
        case 3:
          return "普通用户";
        default:
          break;
      }
    },
  },
  computed: {
    userInfo() {
      return JSON.parse(localStorage.getItem("cookbook_UserInfo"))
    }
  },

  mounted() {
    this.handleGetUserList();
    this.handleGetRoleList();
  },
  methods: {
    handleRemove(file, fileList) {
      this.fileList = fileList;
      this.dataForm.avatar = "";
    },
    handleUploadSuccess(response, file, fileList) {
      this.fileList = fileList;
      this.dataForm.avatar = this.fileList[0].response.data;
    },

    // 上传前校检格式和大小
    handleBeforeUpload(file) {
      // 校检文件类型
      if (this.fileType) {
        let fileExtension = "";
        if (file.name.lastIndexOf(".") > -1) {
          fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
        }
        const isTypeOk = this.fileType.some((type) => {
          if (file.type.indexOf(type) > -1) return true;
          if (fileExtension && fileExtension.indexOf(type) > -1) return true;
          return false;
        });
        if (!isTypeOk) {
          this.$message.error(
            `文件格式不正确, 请上传${this.fileType.join("/")}格式文件!`
          );
          return false;
        }
      }
    },
    // 预览大图 表格里
    showImg(url) {
      if (url.length > 0) {
        let arr = [];
        arr.push(url);
        this.srcList = arr;
      }
    },
    // 当前页改变
    handleCurrentChange() {
      this.handleGetUserList();
    },
    handleGetRoleList() {
      getRoleList().then((res) => {
        this.roleOption = res.data.data;
      });
    },
    handleGetUserList() {
      const data = {
        queryTip: this.queryParams.name,
        page: this.queryParams.page,
        size: this.queryParams.size,
      };
      getUserAllList(data).then((res) => {
        let data = res.data.data.content;
        this.queryParams.total = res.data.data.totalElements;
        this.tableData = data;
      });
    },


    // 弹窗
    handleAddUserDialog() {

      this.dialogVisible = true;
      this.dialogTitle = "添加用户";
      this.fileList = [];
      this.dataForm = {
        userName: "",
        passWord: "",
        sex: "",
        avatar: '',
        age: "",
        email: "",
        roleId: "",
        openId: '',
        status: 0,
      };
      this.$refs["ruleForm"].resetFields();
    },
    // 关闭弹窗
    handleCancelDialog() {
      this.dialogVisible = false;
      this.$refs["ruleForm"].resetFields();
    },

    // 添加用户方法
    handleSubimitDialog() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          if (this.dialogTitle == "添加用户") {
            addUser(this.dataForm).then((res) => {
              if (res.data.code == 20000) {
                this.$message({
                  message: res.data.message,
                  type: "success",
                });
                this.fileList = [];
                this.dialogVisible = false;
                this.handleGetUserList();
              }
            });
          } else {
            updateInfo(this.dataForm).then((res) => {
              if (res.data.code == 20000) {
                this.$message({
                  message: res.data.message,
                  type: "success",
                });
                this.fileList = [];
                this.dialogVisible = false;
                this.handleGetUserList();
              }
            });
          }
        } else {

        }
      });
    },

    // 删除用户
    handleDel(row) {
      this.$confirm("是否删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteUser(row.id).then((res) => {
            if (res.data.code == 20000) {
              this.$message({
                message: res.data.message,
                type: "success",
              });
              this.handleGetUserList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    // 禁用
    handleBans(row) {
      this.$confirm("是否禁用该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const data = {
            id: row.id,
            status: 1
          }
          bansUser(data).then((res) => {
            if (res.data.code == 20000) {
              this.$message({
                message: res.data.message,
                type: "success",
              });
              this.handleGetUserList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },

    // 更改用户弹窗
    handleUpdateDialog(row) {
      this.dataForm = {
        id: row.id,
        userName: row.userName,
        sex: row.sex+"",
        avatar: row.avatar,
        age: row.age,
        openId: row.openId,
        email: row.email,
        roleId: row.roleId,
        status: row.status,
      };
      console.log( this.dataForm)
      this.fileList = [];
      if (row.avatar && row.avatar.length > 0) {
        this.fileList.push({
          url: row.avatar,
        });
      }
      this.dialogVisible = true;
      this.dialogTitle = "修改用户";
    },
  },
};
</script>

<style lang="scss" scoped>
.user_admin {
  width: 100%;

  .query {
    margin-bottom: 10px;

    .box-card {
      justify-content: flex-end;
      align-items: center;
      padding-right: 20px;
      display: flex;
      height: 70px;
    }
  }

  .table_data {
    background-color: #fff;

    .pageClass {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
