<template>
<div>
      <!-- <template>
      <v-item-group>
        <v-container>
          <v-row>
            <v-col
              v-for="n in 3"
              :key="n"
              cols="12"
              md="4"
            >
              <v-item v-slot:default="{ active, toggle }">
                <v-card
                :color="active ? 'primary' : 'secondary'"
                  dark
                  @click="toggle"
                  height="100px"
                  width="250px"
                >
                  <v-scroll-y-transition>
                    <div
                      v-if="active"
                      class="display-3 flex-grow-1 text-center"
                    >
                      Active
                    </div>
                  </v-scroll-y-transition>
                </v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>
    </template> -->
    <template>
    <v-item-group>
      <v-container>
        <v-row>
           <v-col
            cols="12"
            md="4"
          >
              <v-card

              >
        <v-card-title>Leave Requests</v-card-title>
                  <v-card-text>
                    <div>{{leaves.length}} Leave Requests handed in.</div>
                  </v-card-text>
                  <v-divider class="mx-4"></v-divider>
                  <v-card-title> Request Statuses</v-card-title>
                  <v-card-text>
                    <v-chip-group
                      v-model="selection"
                      active-class="deep-purple accent-4 white--text"
                      column
                    >
                      <v-chip>{{pending}} Pending</v-chip>

                      <v-chip>{{approved}} Approved</v-chip>

                      <v-chip>{{rejected}} Rejected</v-chip>

                      <v-chip>{{cancelled}}  Cancelled</v-chip>
                    </v-chip-group>
                  </v-card-text>
              </v-card>
          </v-col>
           <v-col
            cols="12"
            md="4"
          >
              <v-card

              >
            <v-card-title>Employees</v-card-title>
                  <v-card-text>
                    <div><h1>{{employees.length}}</h1> employees in this department</div>
                  </v-card-text>
                  <v-divider class="mx-4"></v-divider>
                  <v-card-title> Employees Statuses</v-card-title>
                  <v-card-text>
                    <v-chip-group
                      v-model="selection"
                      active-class="deep-purple accent-4 white--text"
                      column
                    >
                      <v-chip>{{active}} Active</v-chip>

                      <v-chip>{{employees.length - active}} On Leave</v-chip>
                    </v-chip-group>
                  </v-card-text>
              </v-card>
          </v-col>
          <!-- <v-col
            cols="12"
            md="4"
          >
              <v-card
                raised
              >
              <v-card-title>Leave Requests</v-card-title>
                  <v-card-text>
                    <div></div>
                  </v-card-text>
                  <v-divider class="mx-4"></v-divider>
                  <v-card-title> Request Statuses</v-card-title>
                  <v-card-text>
                    <v-chip-group
                      v-model="selection"
                      active-class="deep-purple accent-4 white--text"
                      column
                    >
                      <v-chip>{{pending}} Pending</v-chip>

                      <v-chip>{{approved}} Approved</v-chip>

                      <v-chip>{{rejected}} Rejected</v-chip>

                      <v-chip>{{cancelled}}  Cancelled</v-chip>
                    </v-chip-group>
                  </v-card-text>
              </v-card>
          </v-col> -->

        </v-row>
        <v-row>
          <leave-list :items="leaves">
            <template v-slot:header>
              <h3>Latest Leave Requests</h3>
            </template>
          </leave-list >
        </v-row>
      </v-container>
    </v-item-group>
  </template>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import LeaveList from '../../components/LeaveList.vue';

export default {
  components: {
    LeaveList,
  },
  data: () => ({
    model: null,
  }),
  computed: {
    ...mapGetters(['leaves', 'employees']),
    rejected() {
      const rj = this.leaves.filter((l) => l.status === 'Rejected');
      return rj.length;
    },
    pending() {
      const pd = this.leaves.filter((l) => l.status === 'Pending');
      return pd.length;
    },
    approved() {
      const ap = this.leaves.filter((l) => l.status === 'Approved');
      return ap.length;
    },
    cancelled() {
      const cn = this.leaves.filter((l) => l.status === 'Cancelled');
      return cn.length;
    },
    active() {
      const at = this.employees.filter((e) => e.active === 1);
      return at.length;
    },
  },
  async created() {
    if (!this.leaves.length) this.$store.dispatch('leaves');

    if (!this.employees.length) this.$store.dispatch('employees');
    // const { data } = await axios.get('/leave').catch((err) => console.log(err));
    // if (data) this.leaves = data;

    // const response = await axios.get('/employees').catch((err) => console.log(err));
    // if (response) this.employees = response.data;
  },
  mounted() {
    axios.get('').then(
      ({ data }) => {
        this.loading = false;
        this.houses = data;
      },
    )
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });

    axios.get('/').then(
      ({ data }) => {
        this.loading = false;
        this.plots = data;
      },
    )
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  },
};
</script>
