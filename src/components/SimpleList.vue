<template>
  <v-card
    class="mx-auto"
    max-width="400"
    tile
  >
<h3>Employees</h3>
    <v-list-item v-for="item in items"
    :key="item.id"
    three-line>
      <v-list-item-content>
        <v-list-item-title>{{item.name}}</v-list-item-title>
        <v-list-item-subtitle>
          {{item.deprtment}}
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          {{item.id}}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>
<script>
import _ from 'lodash';

export default {
  data: () => ({
    items: [
      {
        name: 'Jonh Doe',
        deprtment: 'SL',
        id: 'SL300002',
      },
      {
        name: 'Jonh Dane',
        deprtment: 'HR',
        id: 'HR100003',
      },
      {
        name: 'Jonh Jonh',
        deprtment: 'IT',
        id: 'IT200004',
      },
    ],
  }),
  computed: {
    filteredItems() {
      return _.orderBy(this.items.filter((item) => item.title.toLowerCase()
        .includes(this.search.toLowerCase())
                    || item.action.toLowerCase().includes(this.search.toLowerCase())
                    || item.headline.toLowerCase().includes(this.search.toLowerCase())
                    || item.subtitle.toLowerCase().includes(this.search.toLowerCase())), 'headline');
    },
  },
};
</script>
