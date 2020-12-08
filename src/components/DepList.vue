<template>
  <v-card
    class="mx-auto"
    max-width="400"
    tile
  >
<h3>Departments</h3>
    <v-list-item v-for="item in items"
    :key="item.name"
    three-line>
      <v-list-item-content>
        <v-list-item-title>{{item.name}}</v-list-item-title>
        <v-list-item-subtitle>
          {{item.short_name}}
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          {{item.code}}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>
<script>
// import _ from 'lodash';

export default {
  data: () => ({
    items: [
      {
        name: 'Human Resource',
        short_name: 'HR',
        code: 'HR100',
      },
      {
        name: 'Information Technology',
        short_name: 'IT',
        code: 'IT200',
      },
      {
        name: 'Sales',
        short_name: 'SL',
        code: 'SL300',
      },
    ],
  }),
  computed: {
    // filteredItems() {
    //   return _.orderBy(this.items.filter((item) => item.title.toLowerCase()
    //     .includes(this.search.toLowerCase())
    //     || item.action.toLowerCase().includes(this.search.toLowerCase())
    //     || item.headline.toLowerCase().includes(this.search.toLowerCase())
    //     || item.subtitle.toLowerCase().includes(this.search.toLowerCase())), 'headline');
    // },
  },
};
</script>
