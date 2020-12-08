<template>
<div>
      <slot name="header"></slot>
    <v-card>
        <v-list two-line>
      <v-list-item-group
        v-model="selected"
        active-class="pink--text"
      >
        <template v-for="(item, index) in items">
          <v-list-item :key="item.name">
            <template>
              <v-list-item-content>
                <v-list-item-title >{{item.emp_id.name}} {{item.emp_id.surname}}

                </v-list-item-title>
                  <br/>
                <v-list-item-subtitle
                  class="text--primary"
                >{{item.type}} </v-list-item-subtitle>
                  <br/>
                <v-list-item-subtitle >{{item.start.substr(0,10)}} to {{item.end.substr(0,10)}}

                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>

                 <v-chip
                  pill
                  color="primary"
                > {{item.status}}</v-chip>
                <v-icon
                  v-if=" item.status === 'Pending'"
                  color="red lighten-1"
                  @click="cancel(item)"
                >
                 mdi-delete
                </v-icon>

              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider
            v-if="index < items.length - 1"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
    <v-dialog v-model="dialog" max-width="500px">

          <v-card>
            <v-card-title>
              <span class="headline">Update Status</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                    v-model="editedItem.name"
                    label="Name"
                    required
                    :disabled="true"
                    ></v-text-field>
                  </v-col>
                  <!-- <v-col cols="12" sm="6" md="4">
                    <v-text-field
                    v-model="last_name"
                    label="Last Name"
                    required
                    ></v-text-field>
                  </v-col> -->
                  <v-col cols="12" sm="6" md="4">
                  <v-select
                  v-model="editedItem.status"
                  :items="statuses"
                  label="Update Status"
                  solo></v-select>
                  </v-col>
                  <!-- <v-col cols="12" sm="6" md="4">
                    <v-text-field
                    v-model="contact"
                    required
                    ></v-text-field>
                  </v-col> -->
                  <!-- <v-col cols="12" sm="6" md="4">
                <v-text-field
                v-model="address"
                label="Physical Address"

                required
                ></v-text-field>
                  </v-col>
                </v-row> -->
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1"
              text
              @click="save()">
                Update</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-card>
</div>
</template>
<script>
import axios from 'axios';

export default {
  props: {
    items: {
      type: Array,
      default: () => ([]),
    },
  },
  data: () => ({
    // status: 'Pending',
    // type: 'Sick Leave',
    // date: '20/10/2020 to 04/11/2020',
    // name: 'Ali Connors',
    statuses: ['Approve', 'Reject'],
    editedIndex: -1,
    selected: 2,
    editedItem: {
      status: '',
      type: 'Sick Leave',
      start: '20/10/2020',
      end: '04/11/2020',
      name: 'Ali Connors',
    },

  }),
  watch: {
    dialog(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.close();
    },
  },
  computed: {
    admin() {
      return this.$store.state.admin;
    },
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = { ...item };

      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.$v.$reset();
      this.$nextTick(() => {
        // this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },

    cancel(item) {
      // this.$v.$touch();
      const a = false;
      if (a) {
        this.status = 'ERROR';
      } else {
        this.loading = true;
        this.editedIndex = this.items.indexOf(item);
        this.editedItem = { ...item, status: 'Cancelled' };
        axios
          .post('/leave/cancel', {
            ...item,
          })
          .then(({ data }) => {
            if (this.editedIndex > -1) {
              Object.assign(this.items[this.editedIndex], this.editedItem);
            } else {
              this.items.push(this.editedItem);
            }
            this.loading = false;
            console.log(data);
            this.close();
          }).catch((err) => {
            console.log(err);
            this.editedIndex = -1;
          });
      }
    },
  },
};
</script>
