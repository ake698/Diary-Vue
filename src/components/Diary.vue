<template>
<div>
<el-card style="margin-top:4%">
     <!-- <el-container> -->

    <!-- <el-main v-loading="loading"> -->
      <h2>{{form.title}}</h2>
      <h3>{{form.user.username}}</h3>
      <p>{{form.createTime}}</p>
      <hr><br><br>
      <div v-html="form.content"></div>

    <!-- </el-main> -->

     <!-- </el-container> -->
</el-card>
<el-footer style="margin-top:20%"><a href="#" @click="back()">返回</a></el-footer>
 </div>
</template>

<script>
  export default {
    name: 'Index',
    data () {
      return {
        form:{
          },
          id:0,
          loading:true
      }
    },
    mounted: function () {
      this.loadParams()
      this.loading = false
    },
    methods: {
      back(){
        history.go(-1)
      },
      loadParams(){
        this.id = this.$route.query.uid
        var id = this.id
        if(id != undefined && id != ""){
          this.getDairy();
        }else{
          this.$router.push("/index")
        }

      },
      getDairy(){
        this.$axios.get('/api/diary/'+this.id).then(resp => {
          if(resp.status == 200){
            this.form = resp.data
            // var fd = this.form
            // fd.title = resp.data.title
            // fd.author = resp.data.author
            // fd.content = resp.data.content
             this.form.createTime = resp.data.createTime.replace("T"," ")
          }
        }).catch(err => {
            this.$message({
                message: "没有权限查看！！！",
                type: 'error'
              });
            this.$router.push("/index")
        })
      },
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

  .author {
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

