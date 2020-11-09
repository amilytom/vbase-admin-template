<template>
<div class="wrapper">
  <header-bar></header-bar>
  <left-bar></left-bar>
  <div class="sys-section">
    <tag-nav></tag-nav>
    <transition name="fade-transform" mode="out-in">
      <div class="sys-main">
        <router-view></router-view>
      </div>
    </transition>
  </div>
</div>
</template>

<script>
import HeaderBar from '../components/headbar'
import LeftBar from '../components/leftbar'
import TagNav from '../components/tagnav'

export default {
  data() {
    return {

    }
  },
  components: {
    HeaderBar,
    LeftBar,
    TagNav
  }
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

.wrapper .sys-section {
  position: absolute;
  top: 60px;
  left: 200px;
  width: calc(-100%);
}

.wrapper .sys-section .sys-main {
  position: relative;
  top: 53px;
  left: 0px;
  padding: 10px;
}
</style>
