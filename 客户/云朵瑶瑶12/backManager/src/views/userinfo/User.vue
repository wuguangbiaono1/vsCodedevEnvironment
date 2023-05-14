<template>
  <div style="width: 100%;">

    <el-row>
      <el-col :span="4" style="min-width: 260px">
        <el-card class="box-card" shadow="always"  >
          <div slot="header" class="clearfix" style=" padding: 0px">
            <h2>用户信息</h2>
          </div>

          <div class="text item" style="margin: auto;text-align: center">
             <img style="width: 80px;border-radius: 50%;border: 1px solid #eee" :src="user.avatar">
          </div>

          <div class="text item">
            <div>用户名：{{user.nickName}}</div>
          </div>
          <div class="text item">
            <div>账号：{{user.userName}}</div>
          </div>
          <div class="text item">
            <div>年龄：{{user.age}}</div>
          </div>
          <div class="text item">
            <div>性别：{{user.sex == 0 ? '女':'男'}}</div>
          </div>
          <div class="text item">
            <div>邮箱：{{user.email}}</div>
          </div>
          <div class="text item">
            <div>角色：<el-tag size="mini"  >{{user.roleName}}</el-tag> </div>
          </div>
        </el-card>

      </el-col>




    </el-row>


  </div>

</template>

<script>
export default {
  name: "users",
  data() {
    return {
      user:{

      }
    }
  },
  mounted() {
    this.$nextTick(()=>{
      let user = window.localStorage.getItem("cookbook_UserInfo");
      this.user = JSON.parse(user);
    })
  },

  methods: {

  }
}
</script>

<style scoped>
>>> .el-card__header{
  padding: 10px;
}
>>> .el-card__body{
  padding: 10px;
}

>>> .el-card__body .item{
  padding : 10px 0;
  border-bottom: 1px solid #eee;
}
</style>
