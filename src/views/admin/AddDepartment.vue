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
        <add-dep />
      </template>
    </layout>
  </div>
</template>

<script>
import layout from '../../components/Layout.vue';
import AddDep from '../../components/AddDep.vue';

export default {
  components: {
    layout,
    AddDep,
  },
  data: () => ({
    links: [
      {
        text: 'All',
        to: '/admin/departments',
      },
      {
        text: 'Add Department',
        to: '/admin/add_department',
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
