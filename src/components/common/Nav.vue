<template>
    <el-menu
      :default-active="activerouter"
      router
      mode="horizontal"
      background-color="white"
      text-color="#222"
      active-text-color="red"
      style="min-width: 1300px">
      <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
        {{ item.navItem }}
      </el-menu-item>
      <!-- <a href="#nowhere" style="color: #222;float: right;padding: 20px;">更多功能</a> -->
      <!-- <i class="el-icon-menu" style="float:right;font-size: 45px;color: #222;padding-top: 8px"></i> -->
      <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold">日记-记录美好生活</span>


  <el-submenu index="100" style="float:right;margin-right:3%">
    <template slot="title"><el-avatar :size="50" :src="avatar"></el-avatar></template>
    <el-dropdown-item icon="el-icon-user">你好，{{navName}}</el-dropdown-item>
    <el-dropdown-item :divided="true" ></el-dropdown-item>
    <el-menu-item @click="logout">注销</el-menu-item>
    <el-menu-item @click="open">修改密码</el-menu-item>
    <el-menu-item @click="avatardia">更换头像</el-menu-item>
  </el-submenu>

  <!--弹出修改密码框框-->
  <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
  <el-form ref="passwordForm">
    <el-form-item label="原始密码">
        <el-input type="password"  placeholder="请输入原始密码" v-model="passwordForm.oldpassword"/>
    </el-form-item>
    <el-form-item label="新密码">
        <el-input type="password"  placeholder="请输入新密码" v-model="passwordForm.newpassword"/>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="udpPassword">确 定</el-button>
  </div>
</el-dialog>

  <!--弹出上传框框-->
  <el-dialog title="修改头像" :visible.sync="avatarVisible">
  <el-form ref="passwordForm">
        <ImgUpload @onUpload="uploadImg" @upload="updateAvatar" ref="imgUpload"></ImgUpload>
  </el-form>

</el-dialog>
    </el-menu>

</template>

<script>
  import ImgUpload from './ImgUpload'
  export default {
    name: 'NavMenu',
    components:{ImgUpload},
    data () {
      return {
        navList: [
          {name: '/index', navItem: '日记动态'},
          {name: '/mydiary', navItem: '我的日记'},
          {name: '/manager', navItem: '管理日记'},
          {name: '/about', navItem: '关于我们'}
        ],
        avatar:"",
        avatarVisible: false,
        activerouter:"/index",
        navName:"BigUser",
        dialogFormVisible: false,
        passwordForm: {
          oldpassword: '',
          newpassword: ''
        },

      }
    },
    mounted() {
    // 页面手动刷新指定路由
    //获取地址栏中的路由，设置elementui中的导航栏选中状态
    let defaultMenu = window.location.href.split("/")[3]
    this.activerouter = "/" + defaultMenu;
    this.navName = this.$store.state.username
    this.loadAvatar()
    // console.log(this.activerouter)
    },
    methods:{
      logout(){
        this.$store.commit("logout")
        window.location.reload()
      },
      open(){
        this.passwordForm.newpassword = ""
        this.passwordForm.oldpassword = ""
        this.dialogFormVisible = true
      },
      //头像修改弹出
      avatardia(){
        this.avatarVisible = true
      },
      uploadImg(){
        this.$refs.imgUpload.$refs.upload.submit()
        this.avatarVisible = false
      },
      updateAvatar(val){
        this.avatar = val
      },
      loadAvatar(){
        this.avatar = this.$store.state.avatar
      },
      udpPassword(){
        if(this.passwordForm.newpassword.length < 6 || this.passwordForm.oldpassword.length < 6){
          return;
        }
        this.$axios.put("/api/user",{
            oldpassword:this.passwordForm.oldpassword,
            newpassword:this.passwordForm.newpassword
          }).then(resp => {
            this.dialogFormVisible = false
            this.$message({
              message: '修改密码成功！',
              type: 'success'
            });
          }).catch(err => {
            this.$message({
              message: err.response.data.msg,
              type: 'error'
            });
          })
        },

    }
}
</script>

<style scoped>
  a{
    text-decoration: none;
  }

  span {
    pointer-events: none;
  }
</style>

