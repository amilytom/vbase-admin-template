const navlist = [
  {
    path: "/intro",
    name: "Introduce",
    component: () => import("@/components/introduce.vue"),
    meta: { title: "系统首页" }
  },
  {
    path: "/table",
    name: "Table",
    component: () => import("@/components/table.vue"),
    meta: { title: "表格样式" }
  }
];

export { navlist };
