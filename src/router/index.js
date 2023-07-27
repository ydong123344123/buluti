import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/login.vue"),
  },
  {
    path: "/index",
    name: "index",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/index.vue"),
    children: [
      {
        path: "/users",
        name: "users",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/users.vue"),
      },
      {
        path: "/roles",
        name: "roles",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/roles.vue"),
      },
      {
        path: "/rights",
        name: "rights",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/rights.vue"),
      },
      {
        path: "/goods",
        name: "goods",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/goods.vue"),
      },
      {
        path: "/params",
        name: "params",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/params.vue"),
      },
      {
        path: "/categories",
        name: "categories",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/categories.vue"),
      },
      {
        path: "/orders",
        name: "orders",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/orders.vue"),
      },
      {
        path: "/reports",
        name: "reports",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/reports.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
