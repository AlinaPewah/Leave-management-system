<template>
  <v-app>

    <v-app-bar
      app
      class="primary"
      dark
    >

      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          @click="router.push({name:'home'})"
          src="./assets/frestry.jpg"
          transition="scale-transition"
          width="140"
        />
        <v-toolbar-title>

        <h1 class="text-secondary">Leave Management System</h1>
        </v-toolbar-title>
        <v-divider
        v-if="admin"
        class="mx-4"
        vertical></v-divider>
        <h4 v-if="admin" class="text-secondary">Administrator</h4>
        <!-- <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        /> -->
        <!-- {{admin}} -->
      </div>

      <v-spacer></v-spacer>
        <!-- <v-btn
                v-if="!user && noL"
                @click="$router.push({ name: 'authenticate' })"
            text
                color=""
              >
                <span class="mr-2">Login</span>
                <v-icon>mdi-login</v-icon>
              </v-btn> -->
       <template v-if="user || admin"  v-slot:extension>
        <v-tabs centered center-active>
          <v-tab v-for="r in mainRoutes"
          :key="r.to"
          class="text-secondary"
          @click="router.push(r.to)">{{r.text}}</v-tab>

        </v-tabs>
      </template>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <notifications></notifications>
        <v-row justify="center">
          <v-col cols="12">
            <br/>

            <v-transition appear name="main" mode="out-in">
            <router-view/>
            </v-transition>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <!-- <Footer/> -->
  </v-app>
</template>

<script>
// import Footer from './components/Footer.vue';

export default {
  name: 'App',

  components: {
    // Footer,
  },

  data: () => ({
    //
    mini: true,
    drawer: false,
    a: null,
    routes: [
      {
        p: true, a: true, u: false, text: 'Dashboard', to: '/admin',
      },
      {
        p: true, a: false, u: true, text: 'Profile', to: '/profile',
      },
      {
        p: true, a: false, u: true, text: 'My Leave', to: '/leave_history',
      },
      {
        p: true, a: false, u: true, text: 'Upload Documents', to: '/upload_for_leave',
      },
      {
        p: true, a: true, u: false, text: 'Leave Management', to: '/admin/all_leave',
      },
      // {
      //   p: true, a: true, u: false, text: 'Departments', to: '/admin/departments',
      // },
      {
        p: true, a: true, u: false, text: 'Employees', to: '/admin/employees',
      },

    ],
  }),
  updated() {
    const adminReg = new RegExp('^/admin/?(w+)?');
    this.a = !this.$router.history.current.path.match(adminReg);
    // console.log(this.$router.history.current.path);
    // console.log(this.$router.history);
  },
  computed: {
    router() {
      return this.$router;
    },
    user() {
      return this.$store.state.user;
    },
    admin() {
      return this.$store.state.admin;
    },
    r() {
      return this.$router.history.current.path;
    },
    noL() {
      const adminReg = new RegExp('^/admin/?(w+)?');
      return this.a === null ? !this.$router.history.current.path.match(adminReg) : this.a;
    },
    mainRoutes() {
      const arr = this
        .routes
        .filter(

          (route) => {
            let yes = false;
            if (this.user && !route.a) {
              yes = true;
            } else if (this.admin && route.a) {
              yes = true;
            } else if (!((this.admin && route.a) || !(route.u && this.user))) {
              yes = true;
            } return yes;
          },
        );

      return arr;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
    alogout() {
      this.$store.dispatch('adminLogout');
    },
  },
};
</script>
<style scoped>
.text-secondary{
  color: #aa9628 !important;
}
</style>
