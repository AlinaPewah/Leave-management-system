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
        <h3>Upload Supporting Documents</h3>
          <document-form
          :leaves="leaves"/>
      </template>
    </layout>
  </div>
</template>

<script>
import axios from 'axios';
import layout from '../components/Layout.vue';
import DocumentForm from '../components/DocumentForm.vue';

export default {
  components: {
    layout,
    DocumentForm,
  },
  data: () => ({
    leaves: [],
    links: [

      {
        text: 'Upload Document',
        to: '/upload_for_leave',
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
