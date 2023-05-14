<template>
  <div style="width: 100%;">
    <div class="query">
      <el-card class="box-card">
        <el-input v-model="queryParams.q" clearable placeholder="咨询标题" style="width:250px;margin-right:10px;"/>
        <el-button size="medium" type="primary" @click="loadList()">搜索</el-button>
      </el-card>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID" width="50"/>
      <el-table-column prop="cookname" label="菜谱名称"/>
      <el-table-column prop="season" label="适合的时节推荐"/>
      <el-table-column prop="weather" label="适合的天气推荐"/>
      <el-table-column align="center" label="菜谱图片封面">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.img == null "
                  type="success">暂无图片
          </el-tag>
          <el-image v-else :src="scope.row.img" fit='fill' style="width:80px;">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="mainMaterials" label="菜谱主料"/>
      <el-table-column prop="subMaterials" label="菜谱辅料"/>
      <el-table-column prop="difficulty" label="烹饪难度"/>
      <el-table-column prop="cookTime" label="烹饪时间"/>
      <el-table-column prop="readNum" label="点击量"/>
      <el-table-column prop="hot" label="是否排前面"/>
      <el-table-column align="center" label="操作" width="300">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="edit(scope.row)">编辑
          </el-button>
          <el-button size="small" type="danger" @click="del(scope.row)">删除
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
                   @current-change="loadList">
    </el-pagination>


    <el-dialog :title="dialogConfig.title" :visible.sync="dialogConfig.open" width="800px" append-to-body>
      <el-form ref="ruleForm" :model="form" :rules="form" class="demo-ruleForm" label-width="100px"   label-position="left">
        <el-form-item label="菜谱名称:" prop="cookname">
          <el-input v-model="form.cookname" clearable></el-input>
        </el-form-item>
        <el-form-item label="适合的时节推荐:" prop="season">
          <el-input v-model="form.season" clearable></el-input>
        </el-form-item>
        <el-form-item label="适合的天气推荐:" prop="weather">
          <el-input v-model="form.weather" clearable></el-input>
        </el-form-item>
        <el-form-item label="封面:" prop="userName">
          <el-upload action="http://127.0.0.1:12501/upload/img-web" name="file" :limit="1" list-type="picture-card"
                     :file-list="files"
                     :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="fileSuccess">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" append-to-body>
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>


        <el-form-item label="菜谱主料:" prop="mainMaterials">
          <el-input v-model="form.mainMaterials" clearable type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="菜谱辅料:" prop="subMaterials">
          <el-input v-model="form.subMaterials" clearable type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="烹饪难度:" prop="difficulty">
          <el-input v-model="form.difficulty"  type="name" ></el-input>
        </el-form-item>

        <el-form-item label="烹饪时间:" prop="cookTime">
          <el-input v-model="form.cookTime" clearable></el-input>
        </el-form-item>
        <el-form-item label="点击量:" prop="readNum">
          <el-input v-model="form.readNum" clearable></el-input>
        </el-form-item>
        <el-form-item label="是否排前面:" prop="hot">
          <el-select v-model="form.hot" placeholder="请选择">
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>
        <div><h5>资讯内容：</h5></div>
        <div style="border: 1px solid #ccc;">
          <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editor"
            :defaultConfig="toolbarConfig"
            :mode="mode"
          />
          <Editor
            style="height: 500px; overflow-y: hidden;"
            v-model="form.step"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="onCreated"
          />
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogConfig.open = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>

      </span>
    </el-dialog>
  </div>

</template>

<script>
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {
  adminCookBookDelete,
  adminCookBookList,
  adminCookBookPost,
  adminNewsDelete,
  adminNewsList,
  adminNewsPost
} from "@/api/mews/news";

export default {
  components: {Editor, Toolbar},
  name: "news",
  data() {
    return {
      dialogConfig: {
        title: "编辑咨询",
        open: false
      },
      form: {},
      editor: null,
      html: '<p>hello</p>',
      toolbarConfig: {},
      editorConfig: {
        placeholder: '请输入内容...',
        // 菜单配置
        MENU_CONF: {
          uploadImage: {
            server: 'http://127.0.0.1:12501/upload/img-web', // 上传图片地址
            fieldName: 'file',
          },
          insertImage: {
            checkImage(src, alt, href) {
              if (src.indexOf('http') !== 0) {
                return '图片网址必须以 http/https 开头';
              }
              return true;
            },
          },
        },
      },
      mode: 'default', // or 'simple'
      queryParams: {
        q: "",
        // 当前页
        page: 1,
        // 每页几条
        pageSize: 10,
        // 总条目数
        total: 0,
      },
      tableData: [],
      files: [{url: 'http://192.168.1.101:7070/img/10e0d3bb-b302-4367-96e0-5094c409977e.png'}],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  mounted() {

  },
  created() {
    this.loadList();
  },
  methods: {
    fileSuccess(response, file, fileList) {
         console.log(response, file, fileList);
         this.form.img = response.data.url
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submitForm() {

      adminCookBookPost(this.form).then(res => {
        this.$message({
          type: 'success',
          message: '更新成功!'
        });
        this.dialogConfig.open = false;
        this.form = {};
        this.loadList();
      }).catch(err => {
        this.$message({
          type: 'success',
          message: '更新失败!'
        });
        this.dialogConfig.open = false;
        this.form = {};
        this.loadList();
      })
      console.log(this.form)
    },
    edit(rows) {
      this.files = [];
      let form = JSON.parse(JSON.stringify(rows));
      this.dialogConfig.open = true;
      this.form = form;
      this.html = form.content;
      let _json = {
        url: form.img
      }
      this.files.push(_json);
      console.log(form)
    },
    del(rows) {
      let form = JSON.parse(JSON.stringify(rows));
      this.$confirm('确认删除么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        adminCookBookDelete({id: form.id}).then(res => {

          console.log(res)
          if (res.data) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!' + err
            });
          }
          this.loadList();

        }).catch(err => {
          this.$message({
            type: 'error',
            message: '删除失败!' + err
          });
          this.loadList();
        });


      }).catch(() => {

      });
      console.log(form)
    },
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },

    loadList() {
      adminCookBookList(this.queryParams)
        .then(res => {
          console.log(res.data)
          this.tableData = res.data.content;
          this.queryParams.total = res.data.totalElements;
        })
        .catch(err => {

        })
    }
  }
}
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style scoped>

</style>
