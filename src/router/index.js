import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Profile from '../views/Profile.vue';
import UserLeave from '../views/Leave.vue';
import Upload from '../views/Upload.vue';
import Authenticate from '../views/Authenticate.vue';

// import Application from '../views/Application.vue';
import ApplyForLeave from '../views/ApplyForLeave.vue';

import AdminHome from '../views/admin/Home.vue';
import AdminRouter from '../views/admin/Router.vue';
// import AdminAdd from '../views/admin/Add.vue';
// import AdminApplications from '../views/admin/Applications.vue';
import AddDepartment from '../views/admin/AddDepartment.vue';
import Departments from '../views/admin/Departments.vue';
import AddEmployee from '../views/admin/AddEmployee.vue';
import Employees from '../views/admin/Employees.vue';
import AllLeave from '../views/admin/AllLeave.vue';
import Approved from '../views/admin/Approved.vue';
import Pending from '../views/admin/Pending.vue';
import Rejected from '../views/admin/Rejected.vue';

import AdminAuthenticate from '../views/admin/Authenticate.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
  },
  {
    path: '/leave_history',
    name: 'myLeave',
    component: UserLeave,
  },
  {
    path: '/apply_for_leave',
    name: 'apply',
    component: ApplyForLeave,
  },
  {
    path: '/upload_for_leave',
    name: 'upload',
    component: Upload,
  },
  {
    path: '/authenticate',
    name: 'authenticate',
    component: Authenticate,
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminRouter,
    children: [
      {
        path: 'authenticate',
        name: 'adminAuthenticate',
        component: AdminAuthenticate,
      },
      {
        path: 'add_department',
        name: 'addDepartment',
        component: AddDepartment,
      },
      {
        path: 'departments',
        name: 'departments',
        component: Departments,
      },
      {
        path: '/',
        name: 'adminHome',
        component: AdminHome,
      },
      {
        path: 'add_employee',
        name: 'addEmployee',
        component: AddEmployee,
      },
      {
        path: 'employees',
        name: 'employees',
        component: Employees,
      },
      {
        path: 'all_leave',
        name: 'leave',
        component: AllLeave,
      },
      {
        path: 'approved_leave',
        name: 'approved',
        component: Approved,
      },
      {
        path: 'pending_leave',
        name: 'pending',
        component: Pending,
      },
      {
        path: 'rejected_leave',
        name: 'rejected',
        component: Rejected,
      },

    ],
  },
  {
    path: '*',
    redirect: {
      name: 'home',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // redirect to login page if user is not logged in and trying to access a restricted page
  // console.log(to.name);
  // if (to.path === from.path) return next(false);
  const publicPages = ['/authenticate', '/admin/authenticate', '/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  const loggedInAdimn = localStorage.getItem('admin');
  const adminReg = new RegExp('^/admin/?(w+)?');
  if (authRequired && to.path.match(adminReg) && !loggedInAdimn) {
    return next('/admin/authenticate');
  }
  if (authRequired && !loggedIn && !loggedInAdimn) {
    return next('/authenticate');
  }
  if (loggedInAdimn && !to.path.match(adminReg)) {
    // console.log(from);
    if (from.path.match(adminReg)) return next(false);
    return next('/admin/');
  }

  return next();
});
export default router;
