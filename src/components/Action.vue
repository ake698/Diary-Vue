<template>
<div>
     <el-container>
<el-page-header @back="goBack" content="文章管理">
</el-page-header>
    <el-main>
<el-form ref="dairyForm" :model="form"  label-width="80px">
  <el-form-item label="文章标题" prop="title" :rules="[{required:true,message:'不能为空！'}]">
    <el-input v-model="form.title"></el-input>
  </el-form-item>
<!-- <el-form-item label="文章作者" prop="username" :rules="[{required:true,message:'不能为空！'}]">
    <el-input v-model="form.username"></el-input>
  </el-form-item> -->
  <!-- <el-form-item label="文章内容" prop="content" :rules="[{required:true,message:'不能为空！'}]">
    <el-input v-model="form.content" type="textarea"></el-input>
  </el-form-item> -->
  <Editor v-model="form.content" :isClear="isClear" @change="change"></Editor>
 <el-form-item  label="是否公开">
    <el-switch style="right:45%" v-model="form.isPublic" @change="setPublic"></el-switch>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" round @click="saveDairy" >{{btn}}</el-button>
    <el-button round @click="resetForm">重置</el-button>
  </el-form-item>

</el-form>
    </el-main>
<el-footer>Code By ShiQing</el-footer>
     </el-container>
 </div>
</template>

<script>
  import Editor from './common/Editor'
  export default {
    name: 'Index',
    components:{Editor},
    data () {
      return {
        form:{
          title:"",
          username:"",
          content:"",
          isPublic:true
          },
        btn:"立即创建",
        id:0,
        isClear: false,
        detail:""
      }
    },
    mounted: function () {
      this.loadParams()
    },
    methods: {
      goBack(){
        history.go(-1);
      },
      setPublic(){
        this.isPublic = !this.isPublic
        console.log(this.isPublic)
      },
      change(val){
          console.log(val)
          this.form.content = val
      },
      loadParams(){
        this.id = this.$route.query.uid
        var id = this.id
        if(id != undefined && id != ""){
          this.getDairy();
        }
      },
      getDairy(){
        this.$axios.get('/api/diary/'+this.id).then(resp => {
          if(resp.status == 200){
            var fd = this.form
            fd.title = resp.data.title
            fd.username = resp.data.username
            fd.content = resp.data.content
            fd.isPublic = resp.data.isPublic
            this.btn = "立即更新"
          }
        })
      },
      resetForm(formName) {
        this.$refs['dairyForm'].resetFields();
        this.form.content = ""
      },

      saveDairy(){
        this.$refs['dairyForm'].validate(
          (valid) => {
            if(valid){
              if(this.form.content.length < 6){
                this.$message({
                    message: "请填写日记内容！",
                    type: 'error'
                  });
                return;
              }
              var id = this.id
              if(id != undefined && id != ""){
                this.modifyDairy()
              }else{
                this.createDairy()
              }
            }else{
              return false;
            }
          }
        )

      },
      createDairy(){
        this.$axios.post('/api/diary/',
        {
          // "username":this.form.username,
          "title":this.form.title,
          "content":this.form.content,
          "ispublic":this.form.isPublic
        }
        ).then(resp=>{
          console.log(resp)
          if(resp && resp.status === 201){
            this.$message({
              message: "添加成功！！！",
              type: 'success'
            });
            this.$router.push("/index")
          }
        })
      },
      modifyDairy(){
        this.$axios.put('/api/diary/'+this.id,
        {
          // "username":this.form.username,
          "title":this.form.title,
          "content":this.form.content,
          "ispublic":this.form.isPublic
        }
        ).then(resp=>{
          console.log(resp)
          if(resp && resp.status === 201){
            this.$message({
              message: "修改成功！！！",
              type: 'success'
            });
            this.$router.push("/index")
          }
        })
      }

    }
  }
</script>
<style scoped>

  .cover {
    width: 115px;
    height: 172px;
    margin-bottom: 7px;
    overflow: hidden;
    cursor: pointer;
  }

  img {
    width: 115px;
    height: 172px;
    /*margin: 0 auto;*/
  }

  .title {
    font-size: 14px;
    text-align: left;
  }

  .username {
    color: #333;
    width: 102px;
    font-size: 13px;
    margin-bottom: 6px;
    text-align: left;
  }

  .abstract {
    display: block;
    line-height: 17px;
  }

  .el-icon-delete {
    cursor: pointer;
    float: right;
  }

  .switch {
    display: flex;
    position: absolute;
    left: 780px;
    top: 25px;
  }

  a {
    text-decoration: none;
  }

  a:link, a:visited, a:focus {
    color: #3377aa;
  }

</style>

