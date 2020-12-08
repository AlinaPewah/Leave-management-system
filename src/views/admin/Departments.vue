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
        <dep-list/>
      </template>
    </layout>
  </div>
</template>

<script>
import layout from '../../components/Layout.vue';
import DepList from '../../components/DepList.vue';

export default {
  components: {
    layout,
    DepList,
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
    model: 0,
  }),
  methods: {
    logout() {
      this.$store.dispatch('adminLogout');
    },
  },
};
</script>
