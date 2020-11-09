<template>
    <el-submenu v-if="item.children && item.children.length" :index="navIndex"> 
        <!-- 创建父级菜单 -->
        <template slot="title"><i class="el-icon-menu"></i>{{ item.meta.title}}</template>
        <!-- 创建子菜单 -->
        <nav-item v-for="(subItem,i) in item.children" :key="navIndex+'-'+i" :navIndex="navIndex+'-'+i" :item="subItem"></nav-item>
    </el-submenu>

    <el-menu-item v-else-if="item.meta" :index="item.path" :route="{path: item.path}"><i class="el-icon-document"></i>{{ item.meta.title}}</el-menu-item>
</template>

<script>
    export default {
        name: 'NavItem',
        props: ['item','navIndex']
    }
</script>