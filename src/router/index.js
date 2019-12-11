import Vue from 'vue'
import Router from 'vue-router'
import FrameWork from '@/components/framework/SiderBar.vue'
import Project from '@/components/Project.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Project',
      component: Project
    },
     {
      path: '/framework',
      name: 'FrameWork',
      component: FrameWork
    },
  ]
})
