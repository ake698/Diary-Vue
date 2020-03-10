<template>
  <div style="margin-top: 40px">
    <!--<el-button @click="adddata()">添加文章</el-button>-->
    <div class="datas-area">
      <el-card style="text-align: left" v-loading="loading">
        <div v-for="data in datas" :key="data.id" style="padding-top:40px">
          <div style="float:left;width:85%;height: 150px;overflow:hidden">
            <router-link class="data-link" :to="{path:'diary',query:{uid: data.id}}"><span style="font-size: 20px"><strong>{{data.title}}</strong></span><strong style="float:right"><span>{{data.user.username}}</span></strong></router-link>
            <el-divider content-position="left">{{data.createTime}}</el-divider>
            <router-link class="data-link" :to="{path:'diary',query:{uid: data.id}}">
              <!-- <p>{{data.content}}</p> -->
              <div v-html="data.content"></div>
              </router-link>
          </div>
          <el-image
            style="margin:18px 0 0 30px;width:100px;height: 100px"
            :src="'http://localhost:5000' + data.user.avatar"
            fit="cover"></el-image>
          <el-divider></el-divider>
        </div>

           <el-row style="text-align:center">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="pageInfo.pageIndex"
              :page-size="pageInfo.pageSize"
              :total="pageInfo.total">
            </el-pagination>
            </el-row>
      </el-card>
    </div>

  </div>
</template>

<script>
export default {
  name: 'datas',
  data () {
    return {
      datas: [],
      loading:true,
      pageInfo:{
        pageSize:5,
        pageIndex:1,
        total:0
      }
    }
  },
  mounted () {
    this.loadDiary()
  },
  methods: {
    loadDiary () {
      this.$axios.get('api/diary',{
        params:{
          "pagesize":this.pageInfo.pageSize,
          "pageindex":this.pageInfo.pageIndex
        }
      }).then(resp => {
        var diaries = resp.data.diaries
        this.pageInfo = resp.data.pageDto
        diaries.forEach(element => {
          element.createTime = element.createTime.replace("T"," ");
        });
        this.datas=diaries;
        // console.log(resp.data.length)
        if(diaries.length > 0){
          this.loading = false;
        }else{
          this.$message({
            message: "好可惜，暂时没有人公开日记！",
            showClose: true,
            type: 'warning'
          });
        }
      })
    },

    handleCurrentChange(currentPage){
      this.pageInfo.pageIndex = currentPage;
      this.loadDiary()
    }


  }
}
</script>

<style scoped>
  .datas-area {
    width: 990px;
    height: 750px;
    margin-left: auto;
    margin-right: auto;
  }

  .data-link {
    text-decoration: none;
    color: #606266;
  }

  .data-link:hover {
    color: #409EFF;
  }
</style>

