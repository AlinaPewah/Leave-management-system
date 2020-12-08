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
        <h3>My History</h3>
          <user-list :items="leaves"/>
      </template>
    </layout>
  </div>
</template>

<script>
import axios from 'axios';
import layout from '../components/Layout.vue';
import UserList from '../components/UserList.vue';

export default {
  components: {
    layout,
    UserList,
  },
  data: () => ({
    leaves: [],
    links: [
      {
        text: 'Leave History',
        to: '/leave_history',
      },
      {
        text: 'Apply',
        to: '/apply_for_leave',
      },
    ],
    model: 0,
  }),
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  async created() {
    /* eslint-disable no-underscore-dangle */
    const { data } = await axios.get(`/leave/${this.user.id}`).catch((err) => console.log(err));
    if (!data) return;
    this.leaves = data;
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
  },
};
</script>
