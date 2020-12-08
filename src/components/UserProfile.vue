<template>
<div>
  <v-row>
    <v-col
        class="d-flex text-center"
      >
        <v-scroll-y-transition mode="out-in">

          <v-card

            class="pt-6 mx-0"
            width="95%"
            max-width="700"
          >
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="12" md="8">

              <v-avatar
                v-if="user.profile_pic"
                size="194"
              >
                <v-img
                  :src="`/img/${user.profile_pic}`"
                  class="mb-6"
                ></v-img>
              </v-avatar>
               <v-form
               max-width="30%"
               v-model="valid">
                    <v-file-input
                        v-model="file"
                        placeholder="Change Pic"
                        label="Image input"
                        :rules="fileRules"
                        prepend-icon="mdi-camera"

                      >
                      <template v-slot:selection="{ text }">
                        <v-chip
                          small
                          label
                          color="primary"
                        >
                          {{ text }}
                        </v-chip>
                      </template>
                    </v-file-input></v-form>
                     <v-btn
                        :disabled="!valid"
                        :loading="isUpdating"
                        color="green lighten-1"
                        depressed
                        @click="update_profile"
                      >
                        <v-icon left>
                          mdi-update
                        </v-icon>
                        Change Now
                      </v-btn>
                </v-col>
                <v-col cols="12" sm="12" md="4">

              <h3 class="headline mb-2">
                {{ user.name }}
              </h3>
              <div class="blue--text mb-2">
                {{ user.email }}
              </div>
              <div class="blue--text subheading font-weight-bold">
                {{ user.surname }}
              </div>
              </v-col>
              </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-row
              class="text-left"
              tag="v-card-text"
            >
              <v-col
                class="text-right mr-4 mb-2"
                tag="strong"
                cols="5"
              >
                Designation:
              </v-col>
              <v-col>{{ user.designation }}</v-col>
              <v-col
                class="text-right mr-4 mb-2"
                tag="strong"
                cols="5"
              >
                Work Status
              </v-col>
              <v-col>
                <a

                  target="_blank"
                >{{ user.active ===1 ? 'Active' : 'On Leave' }}</a>
              </v-col>
              <v-col
                class="text-right mr-4 mb-2"
                tag="strong"
                cols="5"
              >
                Phone:
              </v-col>
              <v-col>{{ user.phone }}</v-col>
            </v-row>
          </v-card>
        </v-scroll-y-transition>
      </v-col>
  </v-row>
  <!-- <v-card

    :loading="isUpdating"
  >
    <template v-slot:progress>
      <v-progress-linear
        absolute
        color="green lighten-3"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>
    <v-img
      max-height="400"
      contain
      :src="`/img/${user.profile_pic}`"
    >
      <v-row>
        <v-col
          class="text-right"
          cols="12"
        >
          <v-menu
            bottom
            left
            transition="slide-y-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-camera</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item >
                <v-list-item-content>
                  <v-list-item-title>
                    <v-form v-model="valid">
                    <v-file-input
                        v-model="file"
                        placeholder="Upload Pic"
                        label="Image input"
                        :rules="fileRules"
                        prepend-icon="mdi-camera"
                      >
                      <template v-slot:selection="{ text }">
                        <v-chip
                          small
                          label
                          color="primary"
                        >
                          {{ text }}
                        </v-chip>
                      </template>
                    </v-file-input></v-form></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <v-row
          class="pa-4"
          align="center"
          justify="center"
        >
          <v-col class="text-center">
            <h2 class="headline">
              {{ user.name }} {{user.surname}}
            </h2>
            <span class="grey--text text--lighten-1">{{ user.email }}</span>
          </v-col>
        </v-row>
      </v-row>
    </v-img>
    <v-form>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              :disabled="true"
              filled
              color="blue-grey lighten-2"
              label="Status"
              :value="user.active? 'Active': 'On Leave'"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="user.days"
              :disabled="true"
              filled
              color="blue-grey lighten-2"
              label="Available Leaves Days"
            ></v-text-field>
          </v-col>
           <v-col cols="12">
            <v-autocomplete
              v-model="friends"
              :disabled="isUpdating"
              :items="people"
              filled
              chips
              color="blue-grey lighten-2"
              label="Select"
              item-text="name"
              item-value="name"
              multiple
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="remove(data.item)"
                >
                  <v-avatar left>
                    <v-img :src="data.item.avatar"></v-img>
                  </v-avatar>
                  {{ data.item.name }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-avatar>
                    <img :src="data.item.avatar">
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                    <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-switch
        v-model="autoUpdate"
        :disabled="isUpdating"
        class="mt-0"
        color="green lighten-2"
        hide-details
        label="Auto Update"
      ></v-switch>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!valid"
        :loading="isUpdating"
        color="blue-grey darken-3"
        depressed
        @click="update_profile"
      >
        <v-icon left>
          mdi-update
        </v-icon>
        Update Now
      </v-btn>
    </v-card-actions>
  </v-card> -->
  </div>
</template>
<script>
import axios from 'axios';

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    const srcs = {
      1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
      3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
      4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
      5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
    };

    return {
      valid: false,
      file: null,
      fileRules: [
        (v) => !!v || 'Image is required',
      ],
      autoUpdate: true,
      friends: ['Sandra Adams', 'Britta Holt'],
      isUpdating: false,
      name: 'Midnight Crew',
      people: [
        { header: 'Group 1' },
        { name: 'Sandra Adams', group: 'Group 1', avatar: srcs[1] },
        { name: 'Ali Connors', group: 'Group 1', avatar: srcs[2] },
        { name: 'Trevor Hansen', group: 'Group 1', avatar: srcs[3] },
        { name: 'Tucker Smith', group: 'Group 1', avatar: srcs[2] },
        { divider: true },
        { header: 'Group 2' },
        { name: 'Britta Holt', group: 'Group 2', avatar: srcs[4] },
        { name: 'Jane Smith ', group: 'Group 2', avatar: srcs[5] },
        { name: 'John Smith', group: 'Group 2', avatar: srcs[1] },
        { name: 'Sandra Williams', group: 'Group 2', avatar: srcs[3] },
      ],
      title: 'The summer breeze',
    };
  },
  computed: {
    fileSelected() {
      if (this.file || this.file.name) return true;
      return false;
    },
  },

  watch: {
    isUpdating(val) {
      if (val) {
        /* eslint-disable no-return-assign */
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    },
  },

  methods: {
    remove(item) {
      const index = this.friends.indexOf(item.name);
      if (index >= 0) this.friends.splice(index, 1);
    },
    async update_profile() {
      if (!this.file.name) {
        return;
      }
      const formData = new FormData();

      formData.append('propic', this.file);
      formData.append('emp_id', this.user.id);

      const response = await axios
        .post('/upload/img/', formData, {
          headers: {
            crossdomain: true,
            'Content-Type': 'undefined',
          },
        }).catch((err) => {
          console.log(err);
          this.$notifications.notify(
            {
              message: 'Not Uploaded',
              title: 'Not Update',
              horizontalAlign: 'center',
              verticalAlign: 'bottom',
              type: 'Error',
              color: 'primary',
            },
          );
        });

      if (!response) return;

      this.$notifications.notify(
        {
          message: 'Uploaded',
          title: 'Update',
          horizontalAlign: 'center',
          verticalAlign: 'bottom',
          type: 'success',
          color: 'primary',
        },
      );
      this.$store.dispatch('set_img', response.data.profile_pic);
    },
  },
};
</script>
