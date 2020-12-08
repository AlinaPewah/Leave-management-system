<template>
  <div>
    <layout
    :links="links"
    :model="model">
    <template v-slot:logout>
      <v-list-item
      @click="logout">
        <v-list-item-content>
          Logout
        </v-list-item-content>
      </v-list-item>
    </template>
      <template v-slot:body>
        <emp-list
        :items="employees"
        >
        <template v-slot:header>
        <h3>employees</h3>
        </template>
        </emp-list>
      </template>
    </layout>
  </div>
</template>

<script>
// import axios from 'axios';
import { mapGetters } from 'vuex';
import layout from '../../components/Layout.vue';
import EmpList from '../../components/EmpList.vue';

export default {
  components: {
    layout,
    EmpList,
  },
  data: () => ({
    links: [
      {
        text: 'All',
        to: '/admin/employees',
      },
      {
        text: 'Add Employee',
        to: '/admin/add_employee',
      },
    ],
    model: 0,
  }),
  async created() {
    if (!this.employees.length) this.$store.dispatch('employees');
    // const { data } = await axios.get('/employees').catch((err) => console.log(err));
    // console.log(data);
    // if (!data) return;
    // this.employees = data;
    // console.log(data);
  },
  computed: {
    ...mapGetters(['employees']),
  },
  methods: {
    logout() {
      this.$store.dispatch('adminLogout');
    },
  },
};
</script>
