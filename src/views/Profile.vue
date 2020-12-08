<template>
  <layout
  :links="links"
  :model="model">
    <template v-slot:logout>
      <v-list-item
      @click="logout"
      >
        <v-list-item-content
          class="text-secondary"
        >
          Logout
        </v-list-item-content>
      </v-list-item>
    </template>
    <template v-slot:body>
      <div>
        <user-profile :user="user"/>

      </div>
    </template>
  </layout>
</template>
<script>
import { mapGetters } from 'vuex';
import layout from '../components/Layout.vue';
import UserProfile from '../components/UserProfile.vue';

export default {
  components: {
    layout,
    UserProfile,
  },
  data: () => ({
    links: [
      {
        text: 'Profile',
        to: '/profile',
      },
    ],
    model: 0,
  }),
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
  },
};
</script>
