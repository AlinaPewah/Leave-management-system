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
        <add/>
      </template>
    </layout>
  </div>
</template>

<script>
import layout from '../../components/Layout.vue';
import add from './Add.vue';

export default {
  components: {
    layout,
    add,
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
    model: 1,
  }),
  methods: {
    logout() {
      this.$store.dispatch('adminLogout');
    },
  },
};
</script>
