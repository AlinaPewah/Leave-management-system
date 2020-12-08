/* eslint-disable max-len */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    isNewUser: false,
    leaves: [],
    employees: [],
    admin: null,
  },
  getters: {
    leaves: (state) => state.leaves,
    employees: (state) => state.employees,
    user: (state) => state.user,
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      if (!userData) return;
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common.Authorization = `Bearer ${
        userData.token
      }`;
      state.user = userData.user;
    },
    SET_ADMIN_DATA(state, adminData) {
      localStorage.setItem('admin', JSON.stringify(adminData));
      axios.defaults.headers.common.Authorization = `Bearer ${
        adminData.token
      }`;
      state.admin = adminData.user;
    },
    SET_USER_HISTORY(state, history) {
      localStorage.setItem('userHistory', JSON.stringify(history));

      state.userHistory = history;
    },
    LOGOUT() {
      localStorage.removeItem('user');
      localStorage.removeItem('userHistory');
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    },
    ADMIN_LOGOUT() {
      localStorage.removeItem('admin');
      // localStorage.removeItem('userHistory');
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    },
    IS_NEW_USER(state, isNewUser) {
      state.isNewUser = isNewUser;
    },
    SET_EMPLOYEES(state, employees) {
      state.employees = employees;
    },
    SET_LEAVES(state, leaves) {
      state.leaves = leaves;
    },
    SET_IMG(state, img) {
      state.user.profile_pic = img;
    },
  },
  actions: {
    register({ commit }, credentials) {
      return axios
        .post('/signup', credentials)
        .then(({ data }) => {
          commit('SET_USER_DATA', null);
          console.log(data);
        });
    },
    login({ commit }, credentials) {
      return axios
        .post('/login', credentials)
        .then(({ data }) => {
          commit('SET_USER_DATA', data);
          // console.log(data);
        });
    },
    set_img({ commit }, img) {
      commit('SET_IMG', img);
    },
    adminLogin({ commit }, credentials) {
      return axios
        .post('/a/login', credentials)
        .then(({ data }) => {
          commit('SET_ADMIN_DATA', data);
        });
    },
    leaves({ commit }) {
      return axios
        .get('/leave')
        .then(({ data }) => {
          commit('SET_LEAVES', data);
        });
    },
    employees({ commit }) {
      return axios
        .get('/employees')
        .then(({ data }) => {
          commit('SET_EMPLOYEES', data);
        });
    },
    logout({ commit }) {
      commit('LOGOUT');
    },
    adminLogout({ commit }) {
      commit('ADMIN_LOGOUT');
    },
    isNewUser({ commit }, isNewUser) {
      commit('IS_NEW_USER', isNewUser);
    },
  },
  modules: {
  },
});
