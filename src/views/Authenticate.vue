<template>
    <div >
        <v-row  justify="center">
            <v-col cols="12" sm="10" md="4"  >
              <Login/>
            </v-col>
        </v-row>

    </div>
</template>
<script>

import Login from '../components/Login.vue';

export default {
  name: 'Authenticate',
  components: {
    Login,
  },
  data: () => ({
    re: false,
  }),
  computed: {
    isNewUser() {
      return this.$store.state.isNewUser;
    },
  },
  methods: {
    toggleComponent() {
      this.re = false;
      this.$store.dispatch('isNewUser', !this.isNewUser);
    },
  },
};
</script>
