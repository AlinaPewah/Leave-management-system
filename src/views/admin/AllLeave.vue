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
        <h3>Latest Leaves</h3>
        <leave-list :items="leaves"/>
      </template>
    </layout>
  </div>
</template>

<script>
// import axios from 'axios';
import { mapGetters } from 'vuex';
import layout from '../../components/Layout.vue';
import LeaveList from '../../components/LeaveList.vue';

export default {
  components: {
    layout,
    LeaveList,
  },
  data: () => ({
    links: [
      {
        text: 'All',
        to: '/admin/lall_leave',
      },
      {
        text: 'Pending',
        to: '/admin/pending_leave',
      },
      {
        text: 'Approved',
        to: '/admin/approved_leave',
      },
      {
        text: 'Rejected',
        to: '/admin/rejected_leave',
      },
    ],
    model: 0,
  }),
  computed: {
    ...mapGetters(['leaves']),
  },
  async created() {
    if (!this.leaves.length) this.$store.dispatch('leaves');
    // const { data } = await axios.get('/leave').catch((err) => console.log(err));
    // if (!data) return;
    // this.leaves = data;
  },
  methods: {
    logout() {
      this.$store.dispatch('adminLogout');
    },
  },
};
</script>
