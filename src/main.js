import Vue from 'vue';
import axios from 'axios';
// import VueHtml2Canvas from 'vue-html2canvas';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import Notifications from './components/NotificationPlugin';

// Vue.use(VueHtml2Canvas);
Vue.config.productionTip = false;
Vue.use(Notifications);
new Vue({
  router,
  store,
  vuetify,
  created() {
    const userString = localStorage.getItem('user');
    const adminString = localStorage.getItem('admin');
    if (userString) {
      const userData = JSON.parse(userString);
      this.$store.commit('SET_USER_DATA', userData);
    }
    if (adminString) {
      const adminData = JSON.parse(adminString);
      this.$store.commit('SET_ADMIN_DATA', adminData);
    }
    //
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        console.log(error.response);
        if (error.response.status === 401) {
          this.$store.dispatch('logout');
          this.$store.dispatch('adminLogout');
          this.$router.push('/');
        }
        return Promise.reject(error);
      },
    );
  },
  render: (h) => h(App),
}).$mount('#app');
