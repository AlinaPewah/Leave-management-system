<template>
<v-card
raised
outlined
>
<v-container fluid>
  <form >
      <h2>Employee Login</h2>

    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="password"
      :error-messages="passwordErrors"
      label="Password"
      type="password"
      required
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
    ></v-text-field>

    <v-overlay :value="loading">
      <v-progress-linear indeterminate size="64"></v-progress-linear>
    </v-overlay>
    <v-btn :disabled="loading"
    type="submit"
    color="primary"
    class="mr-4"
    @click="submit">submit</v-btn>
    <!-- <v-btn @click="clear;" text>clear</v-btn> -->
    <br />
    <!-- <p @click="router.push({name:'reset'})"><a>Forgot password?</a></p> -->
  </form>
</v-container>

</v-card>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';

export default {
  mixins: [validationMixin],

  validations: {
    password: { required },
    email: { required, email },
  },

  data: () => ({
    loading: false,
    status: null,
    password: '',
    email: '',
  }),

  computed: {
    router() {
      return this.$router;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      if (!this.$v.password.required) errors.push('Password is required.');
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      if (!this.$v.email.email) errors.push('Must be valid e-mail');
      if (!this.$v.email.required) errors.push('E-mail is required');
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
          .dispatch('login', {
            email: this.email,
            password: this.password,
          })
          .then(() => {
            this.notifyVue('You have successfully logged in', 'Authenticated', 'success');
            this.$router.push({ name: 'profile' });
          })
          .catch((err) => {
            this.loading = false;
            this.status = err.response.status;
            // eslint-disable-next-line eqeqeq
            if (this.status == 404) {
              this.notifyVue('Email or password is incorrect', 'Invalid', 'error');
              console.log(err);
              // eslint-disable-next-line eqeqeq
            } else if (this.status == 500) {
              this.notifyVue('Internal Server Error', 'Error', 'error');
            } else {
              this.notifyVue('An Unexpected Error Ocurred', 'Uknown', 'error');
            }
          });
      }
    },
    clear() {
      this.$v.$reset();
      this.password = '';
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
