<template>
  <v-container>
      <v-card flat>
    <v-row>
        <v-col
        cols="12" sm="12" md="6"
        >
        <v-img

          :src="require('../assets/forest.jpg')"
        >
        </v-img>
        </v-col>

        <v-col
        cols="12" sm="12" md="6"

        >
        <v-row><h3>Department of forestry |  Leave Management System</h3></v-row>
       This is an automated Web-based leave management system
       for the forestry department which helps cut down paperwork,
       streamline the leave application process and will increase
       work efficiency and productivity among all employees.
       <br/>Using
       this leave system the management /admin will be able to generate
       error free leave reports and analyze to make decisions regarding
       leave affairs.
       <p></p>
       <p v-if="!admin">

       Admin Login
       <v-btn text @click="router.push('/admin')">Admin</v-btn>
       </p>
       <p v-if="!user">

       Employees login
       <v-btn text @click="router.push('/authenticate')">Employees</v-btn>
       </p>
        </v-col>
        </v-row>
      </v-card>
  </v-container>
</template>
<script>
import axios from 'axios';

export default {
  components: {

  },
  data: () => ({

  }),
  computed: {
    user() {
      return this.$store.state.user;
    },
    admin() {
      return this.$store.state.admin;
    },
    router() {
      return this.$router;
    },
  },
  mounted() {
    axios.get('/houses').then(
      ({ data }) => {
        this.loading = false;
        this.houses = data;
      },
    )
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });

    axios.get('/plots').then(
      ({ data }) => {
        this.loading = false;
        this.plots = data;
      },
    )
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  },
};
</script>
