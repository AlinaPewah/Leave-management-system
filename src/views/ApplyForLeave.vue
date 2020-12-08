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
        <leave-form/>
      </template>
    </layout>
  </div>
</template>

<script>
import layout from '../components/Layout.vue';
import LeaveForm from '../components/ApplyForLeave.vue';

export default {
  components: {
    layout,
    LeaveForm,
  },
  data: () => ({
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
    model: 1,
  }),
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
  },
};
</script>
