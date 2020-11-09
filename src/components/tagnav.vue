<template>
<div class="tag-nav">
  <scroll-bar ref="scrollBar">
    <router-link ref="tag" class="tag-nav-item" :class="isActive(item) ? 'cur' : ''" v-for="(item, index) in tagNavList" :to="item.path" :key="index">
      {{item.title}}
      <span class='el-icon-close' @click.prevent.stop="closeTheTag(item, index)"></span>
    </router-link>
  </scroll-bar>
</div>
</template>

<script>
import ScrollBar from './ScrollBar'

export default {
  data() {
    return {
      defaultPage: '/main',
    }
  },
  computed: {
    tagNavList() {
      //console.log(this)
      //console.log(this.$store)
      return this.$store.state.tagNav.openedPageList
    }
  },
  mounted() {
    // 首次加载时将默认页面加入缓存
    this.addTagNav()
  },
  watch: {
    $route() {
      this.addTagNav()
      //this.scrollToCurTag()
    }
  },
  methods: {
    addTagNav() {
      // 如果需要缓存则必须使用组件自身的name，而不是router的name
      this.$store.commit("tagNav/addTagNav", {
        //name: this.$router.getMatchedComponents()[1].name,
        name: this.$route.name,
        path: this.$route.path,
        title: this.$route.meta.title
      })
    },
    isActive(item) {
      return item.path === this.$route.path
    },
    closeTheTag(item, index) {
      // 当关闭当前页面的Tag时，则自动加载前一个Tag所属的页面
      // 如果没有前一个Tag，则加载默认页面
      this.$store.commit("tagNav/removeTagNav", item)
      if (this.$route.path == item.path) {
        if (index) {
          this.$router.push(this.tagNavList[index - 1].path)
        } else {
          this.$router.push(this.defaultPage)
          if (this.$route.path == this.defaultPage) {
            this.addTagNav()
          }
        }
      }
    },
    scrollToCurTag() {
      this.$nextTick(() => {
        for (let item of this.$refs.tag) {
          if (item.to === this.$route.path) {
            this.$refs.scrollBar.scrollToCurTag(item.$el)
            break
          }
        }
      })
    }
  },
  components: {
    ScrollBar
  }
}
</script>

<style scoped>
.tag-nav {
  position: absolute;
  top: 0;
  width: 100%;
  height: 53px;
  padding: 10px;
  background: #fff;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 1px 2px #f2f2f2;
  box-sizing: border-box;
}

.tag-nav .tag-nav-item {
  display: inline-block;
  position: relative;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  margin-right: 10px;
  border: 1px solid rgba(82, 186, 181, 0.2);
  border-radius: 4px;
  background-color: rgba(82, 186, 181, 0.1);
  text-decoration: none;
}

.tag-nav .tag-nav-item span {
  width: 16px;
  height: 16px;
  line-height: 16px;
  border-radius: 50%;
  text-align: center;
  vertical-align: middle;
  transition: all .3s ease;
  -webkit-transform-origin: 100% 50%;
  -ms-transform-origin: 100% 50%;
  transform-origin: 100% 50%;
  font-size: 12px;
  color: #52bab5;
}

.tag-nav .cur {
  background-color: #52bab5;
  color: #fff;
}

.tag-nav .cur span {
  color: #fff;
}
</style>
