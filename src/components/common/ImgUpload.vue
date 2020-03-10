<template>
  <el-upload
    name="avatar"
    class="img-upload"
    ref="upload"
    action="http://localhost:5000/api/avatar"
    :auto-upload="false"
    :on-preview="handlePreview"
    :headers="headers"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    multiple
    :limit="1"
    :on-exceed="handleExceed"
    :file-list="fileList"
    >
    <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
  </el-upload>
</template>

<script>
  export default {
    name: 'ImgUpload',
    data () {
      return {
        avatar: "/static/default.jpg",
        fileList: [],
        headers:{
          "Authorization":"aa"
        },
      }
    },
    mounted(){
      this.headers["Authorization"] = "Bearer " + this.$store.state.token
    },
    methods: {
      handleRemove (file, fileList) {
      },
      handlePreview (file) {
      },
      handleExceed (files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      handleSuccess (response) {
        this.$message.success('上传成功')
        this.avatar = response.count
        this.$store.commit('avatarChange',response.count)
        this.clear()
        this.$emit("upload",this.$store.state.avatar)
      },
      submitUpload(){
        this.$emit('onUpload')
      },
      clear () {
        this.$refs.upload.clearFiles()
      }
    }
  }
</script>
