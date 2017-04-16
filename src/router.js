import Vue from "vue";
import Router from "vue-router";

import Schedule from "@/components/Schedule";
import Teacher from "@/components/Teacher";

import Class from "@/components/Class";
import ClassFull from "@/components/ClassFull";

import NotFound from "@/components/NotFound";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Schedule
    },
    {
      path: "/school/:link",
      name: "school",
      component: Schedule
    },
    {
      path: "/teacher/:id",
      name: "teacher",
      component: Teacher
    },
    {
      path: "/class/:id",
      name: "class",
      component: ClassFull
    },
    {
      path: "*",
      component: NotFound
    }
  ]
});