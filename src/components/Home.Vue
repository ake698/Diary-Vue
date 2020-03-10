<template>
  <div>
    <!--用来展示navMenu中的页面 HTML是不区分大小写的，所以vue会把你的驼峰命名修改为kebab-case命名，实际上都是nav-menu-->
    <!-- <nav-menu class="nav-menu"></nav-menu> -->
    <Nav class="nav-menu"></Nav>
    <router-view/>
  </div>
</template>

<script>
  import Nav from './common/Nav'
  export default {
    name: 'Home',
    components : {Nav}
  }
</script>

<style>
.nav-menu {
    /*margin-bottom: 40px;*/
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.05);
  }
</style>
