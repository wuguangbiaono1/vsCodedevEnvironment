<template>
  <div style="width: 100%;background-color: #fff;height: 100%;padding: 20px  ">
    <el-row>
      <el-col :span="12"><div style="width:400px;height: 400px " id="echartsView" >

      </div></el-col>
      <el-col :span="12"> <div style="width:400px;height: 400px " id="user" >  </div></el-col>
    </el-row>



  </div>

</template>

<script>
import {adminNewsDelete, adminNewsList, adminNewsPost} from "@/api/mews/news";
import * as echarts from 'echarts';
import {wdUser, wdUserq} from "@/api/user";
export default {
  name: "echartsView",
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
            server: 'http://localhost:7070/upload/img-web', // 上传图片地址
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
    this.$nextTick(()=>{
      this.echartsView();
      this.user();

    })

  },
  methods: {
    echartsView(){
      wdUserq().then(res=>{
        console.log(res.data )
        let title =[];
        let titleList =[];
        if (res.data.length !=0){
          res.data.forEach(item=>{
            let _json ={value: item.count, name: item.q};
            title.push(item.q)
            titleList.push(_json);
          })

        }
        let chartDom = document.getElementById('echartsView');
        let myChart = echarts.init(chartDom);
        let option = {
          title: {
            text: '菜谱用户',
            subtext: '搜索数据统计',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: title
          },
          series: [
            {
              name: '搜索次数',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data:titleList,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        option && myChart.setOption(option);

      }).catch(err=>{

      })

    },
    user(){
      wdUser().then(res=>{
        console.log(res.data)

        let chartDom = document.getElementById('user');
        let myChart = echarts.init(chartDom);
        let option = {
          title: {
            text: '用户数量',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}  '
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['用户']
          },
          series: [
            {
              name: '搜索次数',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: res.data, name: '用户'},
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        option && myChart.setOption(option);

      }).catch(err=>{

      })

    },

    fileSuccess(response, file, fileList) {
      console.log(response, file, fileList);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submitForm() {

      adminNewsPost(this.form).then(res=>{
        this.$message({
          type: 'success',
          message: '更新成功!'
        });
        this.dialogConfig.open = false;
        this.form = {};
        this.loadList();
      }).catch(err=>{
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

        adminNewsDelete({id:form.id}).then(res=>{

          console.log(res)
          if (res.data){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }else {
            this.$message({
              type: 'error',
              message: '删除失败!'+err
            });
          }
          this.loadList();

        }).catch(err=>{
          this.$message({
            type: 'error',
            message: '删除失败!'+err
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
      console.log(this.queryParams)
      adminNewsList(this.queryParams)
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
