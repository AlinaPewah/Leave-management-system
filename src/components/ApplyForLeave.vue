<template>
  <v-card raised outlined>
    <v-container>
      <v-row>
        <v-col cols="12"><h1>Apply for leave</h1></v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-model="firstName"
            label="First Name"
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-model="lastName"
            label="Last Name"
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="3">
          <v-select
            v-model="type"
            :items="leaves"
            label="Leave Type"
            solo
          ></v-select>
        </v-col>
        <v-col cols="12" sm="12" md="3">
          <v-select
            v-model="priority"
            :items="priorities"
            label="Priority"
            solo
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dates"
                label="Leave Dates"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                :hint="`from ${moment(dates[0]).format('ddd, hA')}`"
                persistent-hint
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dates"
              no-title
              range
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-textarea
            solo
            name="input-7-1"
            label="Reason"
            auto-grow
          ></v-textarea>
        </v-col>
        <v-col cols="12" sm="6" md="6"> </v-col>
        <v-overlay :value="loading">
          <v-progress-linear indeterminate size="64"></v-progress-linear>
        </v-overlay>
        <v-btn :disabled="loading" class="mr-4" @click="submit" type="submit"
          >Apply</v-btn
        >
        <!-- <v-btn @click="clear">clear</v-btn> -->
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, minLength, email } from 'vuelidate/lib/validators';
import axios from 'axios';
import moment from 'moment';

export default {
  mixins: [validationMixin],

  validations: {
    firstName: { required, minLength: minLength(2) },
    lastName: { required, minLength: minLength(2) },
    email: { required, email },
    password: { required, minLength: minLength(8) },
    contact: { required, minLength: minLength(10) },
    address: { required },
  },

  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu2: false,
    loading: false,
    status: null,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contact: '',
    address: '',
    type: '',
    priority: '',
    dates: ['2020-10-10', '2020-10-20'],
    priorities: ['Low', 'Medium', 'High'],
    leaves: [
      'Sick Leave',
      'Paid Leave',
      'Maternity leave',
      'Paternity leave',
      'Special leave',
      'Compesate',
    ],
  }),

  computed: {
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      if (!this.$v.lastName.minLength) errors.push('Last Name must be at most 10 characters long');
      if (!this.$v.lastName.required) errors.push('Last Name is required.');
      return errors;
    },
    firstNameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      if (!this.$v.firstName.minLength) errors.push('First Name must be at least 10 characters long');
      if (!this.$v.firstName.required) errors.push('First Name is required.');
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      if (!this.$v.email.email) errors.push('Must be valid e-mail');
      if (!this.$v.email.required) errors.push('E-mail is required');
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      if (!this.$v.password.minLength) errors.push('Password must be at least 8 characters long');
      if (!this.$v.password.required) errors.push('Password is required.');
      return errors;
    },
    contactErrors() {
      const errors = [];
      if (!this.$v.contact.$dirty) return errors;
      if (!this.$v.contact.minLength) errors.push('Contact  must be at least 10 characters long');
      if (!this.$v.contact.required) errors.push('Contact Number is required');
      return errors;
    },
    addressErrors() {
      const errors = [];
      if (!this.$v.address.$dirty) return errors;
      if (!this.$v.address.required) errors.push('Physical Address is required');
      return errors;
    },
    user() {
      return this.$store.state.user;
    },
  },
  created() {
    this.firstName = this.user.name;
    this.lastName = this.user.surname;
  },
  methods: {
    moment,
    submit() {
      // this.$v.$touch();
      const a = false;
      if (a) {
        this.status = 'ERROR';
      } else {
        this.loading = true;
        this.status = null;
        axios
          .post('/leave/apply', {
            emp_id: this.user.id,
            type: this.type,
            start: this.dates[0],
            end: this.dates[1],
            priority: this.priority,
          })
          .then(() => {
            this.notifyVue(
              'You have successfully applied',
              'Applied',
              'success',
            );
            this.$router.push({ name: 'profile' });
          })
          .catch((err) => {
            this.loading = false;
            this.status = err.response.status;
            // eslint-disable-next-line eqeqeq
            if (this.status == 404) {
              this.notifyVue('Invalid data submitted', 'Invalid', 'error');
              // eslint-disable-next-line eqeqeq
            } else if (this.status == 500) {
              this.notifyVue('Internal Server Error', 'Error', 'error');
              // eslint-disable-next-line eqeqeq
            } else if (this.status == 409) {
              this.notifyVue(
                'A user already exist with those credentials',
                'Duplicate',
                'error',
              );
            } else {
              this.notifyVue('An Unexpected Error Ocurred', 'Uknown', 'error');
            }
          });
        // this.$store.dispatch('register', {});
        // this.$router.push({ name: 'home' });
      }
    },
    clear() {
      this.$v.$reset();
      this.name = '';
      this.email = '';
    },
    notifyVue(message, title, type) {
      this.$notifications.notify({
        message,
        title,
        horizontalAlign: 'center',
        verticalAlign: 'bottom',
        type,
        color: 'primary',
      });
    },
  },
};
</script>
