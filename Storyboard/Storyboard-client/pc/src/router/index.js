import Vue from "vue";
import vueRouter from "vue-router";

Vue.use(vueRouter);

import home from "@/pages/home";
import storyboard from "@/pages/storyboard";
import index from "@/router-views/index";
import error from "@/router-views/error";
import mobile from "@/router-views/mobile";
const router = new vueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: home,
      children: [
        {
          path: "",
          component: index
        },
        {
          path: "mobile",
          component: mobile
        },
        {
          path: "error/:code",
          component: error
        }
      ]
    },
    {
      path: "/storyboard",
      component: storyboard
    },
    {
      path: "*",
      redirect: "/error/404"
    }
  ]
});

export default router;
