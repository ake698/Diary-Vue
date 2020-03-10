<template>
<div>
     <el-container>
<el-main>
    <el-table
    :data="datas"
    v-loading="loading"
    stripe
    style="width: 100%">
    <el-table-column
      prop="id"
      label="ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="180">
    </el-table-column>
    <el-table-column
      prop="user.username"
      label="作者">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="创建时间">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini" type="info" icon="el-icon-mouse" round
          @click="into(scope.$index, scope.row)">查看</el-button>
        <el-button
          size="mini" icon="el-icon-edit" round
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger" icon="el-icon-delete" round
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-row style="text-align:center;margin-top:50px">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="pageInfo.pageIndex"
        :page-size="pageInfo.pageSize"
        :total="pageInfo.total">
      </el-pagination>
    </el-row>
</el-main>
<el-footer><el-button
           type="primary" round
          @click="add">添加日记</el-button></el-footer>
     </el-container>
 </div>
</template>

<script>
  export default {
    name: 'Index',
    data () {
      return {
        datas:[],
        loading:true,
        pageInfo:{
          pageSize:5,
          pageIndex:1,
          total:0
        }
      }
    },
    mounted: function () {
      this.loadDiary()
    },
    methods: {
      loadDiary () {
        this.$axios.get('/api/diary/user',{
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
        })
        this.loading = false;
      },
      //页码改变
      handleCurrentChange(currentPage){
        this.pageInfo.pageIndex = currentPage;
        this.loadDiary()
      },
      handleEdit(index,row){
        this.$router.push({path:'/action',query:{uid:row.id}})
      },
      //删除
      handleDelete(index,row){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.delete('/api/diary/'+row.id).then(resp=>{
          if(resp.status == 200){
              this.$message({
                type: 'success',
                showClose: true,
                message: '删除成功!'
              });
              this.loadDiary ()
          }
        })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });


      },
      into(index,row){
        this.$router.push({path:'/diary',query:{uid:row.id}})
      },
      add(){
        this.$router.push("/action")
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

