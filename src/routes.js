import Home from './views/Home.vue'
import Login from './views/Login.vue'
import NotFound from './views/NotFound.vue'
import Batchplan from './views/Batchplan.vue'
import rigid_summary from './views/rigid_Summary.vue'
import followup from './views/followup.vue'
import Rigid_child from './views/rigid_child.vue'
import List from './views/List.vue'
import NotStarted from "./views/NotStarted.vue"
import Anothernot1 from "./views/Anothernot1.vue"
import ChangePassword from "./components/ChangePassword.vue"

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  { path: '/home', component: Home, meta: { title: 'Home' } },
  {
    meta: {
      title: 'Login',
      formScreen: true
    },
    path: '/',
    name: 'login',
    component: Login
  },
  {
    meta: {
      title: 'batchplan',
    },
    path: `/batchplan`,
    name: 'batchplan',
    component: Batchplan
  },
  {
    meta: {
      title: 'rigid_summary',
    },
    path: `/rigid_summary`,
    name: 'rigid_summary',
    component: rigid_summary
  },
  {
    meta: {
      title: 'FollowUp',
    },
    path: `/batchfollowup`,
    name: 'BatchFollowUp',
    component: followup
  },
  {
    meta: {
      title: 'NotStarted',
    },
    path: `/notstarted`,
    name: 'FollowupNotStarted',
    component: NotStarted
  },
  {
    meta: {
      title: 'Home',
    },
    path: `/home`,
    name: 'Home',
    component: Home
  },
  {
    meta: {
      title: 'RigidSummaryDetails',
    },
    path:`/rigid_child/:id&:types&:count&:date1&:date2&:mode`,
    name: 'Rigid_Child',
    component: Rigid_child
  },
  {
    meta: {
      title: 'List',
    },
    path: `/list`,
    name: 'List',
    component:List
  },
  {
    meta: {
      title: 'Anothernot1',
    },
    path: `/notstart1/:id&:types&:redirect`,
    name: 'Anothernot1',
    component:Anothernot1
  },
  {
    meta: {
      title: 'ChangePassword',
      
    },
    path: '/change_password',
    name: 'ChangePassword',
    component: ChangePassword
  },
  { path: '/:path(.*)', component: NotFound },
]
