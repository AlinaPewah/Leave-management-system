<template>
<v-row
          class="text-secondary">
<v-col cols="12" sm="12" md="3">

  <!-- <v-card
    class="mx-auto"
    max-width="500"
  > -->
    <v-list>
      <v-list-item-group v-model="model">
        <!-- <v-col cols="3" sm="3" md="12"> -->

        <v-list-item
          v-for="(item, i) in links"
          :key="i"
          @click="router.push(item.to)"
        >
          <!-- <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon> -->
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- </v-col> -->
      </v-list-item-group>
        <v-divider></v-divider>
        <v-list-item-group>

        <slot name="logout"></slot>
        </v-list-item-group>
    </v-list>
  <!-- </v-card> -->
</v-col>
<v-col cols="12" sm="12" md="9"
          class="text-secondary">
<slot name="body"></slot>
</v-col>
</v-row>
</template>

<script>
export default {
  props: {
    links: {
      type: Array,
      default: () => [],
    },
    model: {
      type: Number,
      default: () => 0,
    },
  },
  computed: {
    router() {
      return this.$router;
    },
  },
};
</script>
