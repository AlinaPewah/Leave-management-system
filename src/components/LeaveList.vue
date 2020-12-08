<template>
<div>
      <slot name="header"></slot>
    <v-card>
        <v-list two-line>
      <v-list-item-group
        v-model="selected"
        active-class="pink--text"
      >
        <template v-for="(item, index) in items" @click="dialog = true">
          <v-list-item :key="item.name">
            <template>
               <v-list-item-avatar left>
                  <img

                    alt="Avatar"
                    :src="`/img/${item.emp_id.profile_pic}`"
                  >
                </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title ><h3>{{item.emp_id.name}} {{item.emp_id.surname}}</h3>

                </v-list-item-title>
                <v-list-item-title >
                  {{item.emp_id.designation}}
<br>
                </v-list-item-title>
                  <br>
                <v-list-item-subtitle
                  class="text--primary"
                >{{item.type}} <br></v-list-item-subtitle>
                  <br>
                <v-list-item-subtitle >
                  {{item.leaveDays}} day(s) requested | from
                  {{item.start.substr(0,10)}} to {{item.end.substr(0,10)}}
<br>
                </v-list-item-subtitle>
                <br>
                <v-list-item-subtitle >Has {{item.emp_id.days}} leave days available

                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>

                 <v-chip
                  pill
                  color="primary"
                > {{item.status}}</v-chip><br>
                <v-chip
                  pill
                > {{item.priority}} Priority</v-chip><br>
                <v-icon
                  v-if="admin && item.status === 'Pending'"
                  color="grey lighten-1"
                  @click="editItem(item)"
                >
                 mdi-pencil
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
              <span class="headline">Approve / Reject {{editedItem.emp_id.surname}}'s Application

              </span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                    label="Employee Name"
                    :value="editedItem.emp_id.name+' '+editedItem.emp_id.surname"
                    :disabled="true"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                    v-model="editedItem.priority"
                    label="Application's Priority"
                    :disabled="true"
                    ></v-text-field>
                  </v-col>
                   <v-col cols="12" sm="6" md="4">
                    <v-text-field
                    v-model="editedItem.emp_id.days"
                    label="Available Days"
                    :disabled="true"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                    v-model="editedItem.leaveDays"
                    label="Requested Days"
                    :disabled="true"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                     <v-menu
                      bottom
                      origin="center center"
                      transition="scale-transition"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="primary"
                          dark
                          v-bind="attrs"
                          v-on="on"
                        >
                         View Supporting Docs
                        </v-btn>
                      </template>

                      <v-list>
                         <v-list-item
                         v-if="editedItem.documents.length<1"
                        >
                          <v-list-item-title>No documents uploaded</v-list-item-title>
                        </v-list-item>
                        <v-list-item
                        v-else
                          v-for="(item, i) in editedItem.documents"
                          :key="i"
                          target="_blank"
                          :href="`/document/${item.pathname}`"
                          link
                        >
                          <v-list-item-title>{{ item.name }}</v-list-item-title>
                        </v-list-item>

                      </v-list>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                  <v-select
                  v-model="editedItem.status"
                  :items="statuses"
                  label="Update Status"
                  solo></v-select>
                  </v-col>
                  <v-col cols="12">
                    There is {{same_designation(editedItem.emp_id.designation)}}
                    employee(s) in the same position({{editedItem.emp_id.designation}})
                    who are still active.
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
                  </v-col>-->
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close()">Cancel</v-btn>
              <v-btn color="blue darken-1"
              text
              @click="save()">
                Update</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-card>
    <!-- <single-leave :dialog="dialog"/> -->
</div>
</template>
<script>
import axios from 'axios';
// import SingleLeave from './SingleLeave.vue';

export default {
  components: {
    // SingleLeave,
  },
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
    dialog: false,
    editedItem: {
      status: '',
      type: 'Sick Leave',
      start: '20/10/2020',
      end: '04/11/2020',
      emp_id: {},
      documents: [],
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
    same_designation(designation) {
      const sd = this.items.filter((i) => i.emp_id.designation === designation
      && i.emp_id.active === 1);
      return sd.length;
    },
    close() {
      this.dialog = false;
      // this.$v.$reset();
      this.$nextTick(() => {
        // this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },

    save() {
      // this.$v.$touch();
      const a = false;
      if (a) {
        this.status = 'ERROR';
      } else {
        this.loading = true;

        axios
          .post(`/leave/${this.editedItem.status}`, {
            ...this.editedItem,
          })
          .then(({ data }) => {
            this.$store.dispatch('leaves');
            if (this.editedIndex > -1) {
              Object.assign(this.items[this.editedIndex], this.editedItem);
            } else {
              this.items.push(this.editedItem);
            }
            this.loading = false;
            this.dialog = false;
            console.log(data);
            this.close();
          }).catch((err) => {
            console.log(err);
            this.editedIndex = -1;
            this.dialog = false;
          });
      }
    },
  },
};
</script>
