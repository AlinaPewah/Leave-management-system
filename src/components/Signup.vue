<template>
<v-card
raised
outlined
>

<v-container>
  <v-row>
    <v-col cols="12" sm="6" md="6">
     <v-text-field
      v-model="firstName"
      :error-messages="firstNameErrors"
      label="First Name"
      required
      @input="$v.firstName.$touch()"
      @blur="$v.firstName.$touch()"
    ></v-text-field>
    </v-col>
    <v-col cols="12" sm="6" md="6">
     <v-text-field
      v-model="lastName"
      :error-messages="lastNameErrors"
      label="Last Name"
      required
      @input="$v.lastName.$touch()"
      @blur="$v.lastName.$touch()"
    ></v-text-field>
    </v-col>
     <v-col cols="12" sm="12" md="3">
      <v-select
      v-model="title"
      :items="titles"
      label="Designation"
      solo></v-select>
    </v-col>
    <v-col cols="12" sm="6" md="6">
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    </v-col>
    <v-col cols="12" sm="6" md="6">
    <v-text-field
      v-model="password"
      :error-messages="passwordErrors"
      label="Password"
      type="password"
      required
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
    ></v-text-field>
    </v-col>
    <v-col cols="12" sm="6" md="6">
    <v-text-field
      v-model="contact"
      :error-messages="contactErrors"
      label="Contact Number"
      type="number"
      required
      @input="$v.contact.$touch()"
      @blur="$v.contact.$touch()"
    ></v-text-field>
    </v-col>
    <v-col cols="12" sm="6" md="6">
    <v-text-field
      v-model="address"
      :error-messages="addressErrors"
      :counter="100"
      label="Physical Address"
      type="address"
      required
      @input="$v.address.$touch()"
      @blur="$v.address.$touch()"
    ></v-text-field>
    </v-col>
    <v-overlay :value="loading">
      <v-progress-linear indeterminate size="64"></v-progress-linear>
    </v-overlay>
    <v-btn
    :disabled="loading"
    class="mr-4"
    @click="submit"
    type="submit"
    >submit</v-btn>
    <!-- <v-btn @click="clear">clear</v-btn> -->
</v-row>
</v-container>
</v-card>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, minLength, email } from 'vuelidate/lib/validators';

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
    loading: false,
    status: null,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contact: '',
    address: '',
    title: '',
    titles: [
      'Labourer',
      'Senior Labourer',
      'Senior Workhand',
      'Forest Ranger',
      'Technician',
      'Senior Technician',
      'Chief Technicia',
      'Principal',
      'Forester',
      'Senior Forester',
      'Chief Forester',
      'Deputy Director',
      'Director',
      'Deputy Minister',
      'Minister',
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
  },

  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.status = 'ERROR';
      } else {
        this.loading = true;
        this.status = null;
        this.$store
          .dispatch('register', {
            name: this.firstName,
            surname: this.lastName,
            email: this.email,
            contact: this.contact,
            designation: this.title,
            addressOne: this.address,
            password: this.password,
          })
          .then(() => {
            this.loading = false;
            this.notifyVue('Employee successfully signed up', 'Registered', 'success');
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
              this.notifyVue('A user already exist with those credentials', 'Duplicate', 'error');
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
      this.$notifications.notify(
        {
          message,
          title,
          horizontalAlign: 'center',
          verticalAlign: 'bottom',
          type,
          color: 'primary',
        },
      );
    },
  },
};
</script>
