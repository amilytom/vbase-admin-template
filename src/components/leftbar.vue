<template>
<div class="sys-nav">
  <el-menu router ref="navbar" :default-active="defActive" menu-trigger="click" @select="selectMenu" @open="openMenu" @close="closeMenu" unique-opened>
    <nav-item v-for="(item, n) in navList" :item="item" :navIndex="String(n)" :key="n"></nav-item>
  </el-menu>
  <div v-show="navBgShow" class="full-screen-navBg" @click.self="closeAll"></div>
</div>
</template>

<script>
import NavItem from '../components/navitem'
import {
  navlist
} from '../router/module/navlist.js'

export default {
  data() {
    return {
      navBgShow: false,
      navList: navlist
    }
  },
  computed: {
    defActive() {
      return this.$route.path
    },
  },
  watch: {
    // 当通过TagNav来激活页面时也执行一次selectMenu
    $route() {
      let path = this.$route.path
      //console.log(path);
      let indexPath = this.$refs.navbar.items[path].indexPath
      //console.log(this) 
      //console.log(indexPath);
      this.selectMenu(path, indexPath)
    }
  },
  methods: {
    // eslint-disable-next-line
    selectMenu(index, indexPath) {
      /**
       * 在选择父级菜单时自动关闭其下所有子菜单
       * 选择时获取点击菜单的父级index，并计算得到该index在已打开菜单中的索引值，
       * 关闭位于当前打开菜单中该索引值之后的全部菜单
       */
      let openedMenus = this.$refs.navbar.openedMenus
      let openMenuList
      // 如果点击的是二级菜单，则获取其后已经打开的菜单
      if (indexPath.length > 1) {
        let parentPath = indexPath[indexPath.length - 2]
        openMenuList = openedMenus.slice(openedMenus.indexOf(parentPath) + 1)
      } else {
        openMenuList = openedMenus
      }

      // 关闭菜单
      openMenuList = openMenuList.reverse()
      openMenuList.forEach((ele) => {
        this.$refs.navbar.closeMenu(ele)
      })
      // if(this.navMode == 'horizontal'){
      //     this.navBgShow = false
      // }
    },
    openMenu() {
      //console.log(this)
      //console.log(this.$router.options) 
      // if(this.navMode == 'horizontal'){
      //     this.navBgShow = true
      // }
    },
    closeMenu() {
      // if(this.navMode == 'horizontal'){
      //     this.navBgShow = false
      // }
    },
    closeAll() {
      console.log("背景遮罩图")
      let openMenu = this.$refs.navbar.openedMenus.concat([])
      openMenu = openMenu.reverse()
      openMenu.forEach((ele) => {
        this.$refs.navbar.closeMenu(ele)
      })
      // if(this.navMode == 'horizontal'){
      //     this.navBgShow = false
      // }
    }
  },
  components: {
    NavItem
  }
}
</script>

<style scoped>
.sys-nav {
  position: absolute;
  top: 60px;
  bottom: 0;
  left: 0;
  width: 200px;
  background-color: #f4f4f4;
  border-right: 1px solid #ccc;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
}

.sys-nav .el-menu {
  background-color: #f4f4f4;
}

.sys-nav .el-menu:focus {
  outline: none;
  background-color: rgba(82, 186, 181, 0.38);
}
</style>
