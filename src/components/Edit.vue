/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
<template>
  <v-data-table
    :headers="headers"
    :items="users"
    hide-default-footer
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>My Details</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">

          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                    v-model="first_name"
                    :error-messages="firstNameErrors"
                    :counter="21"
                    label="First Name"
                    required
                    @input="$v.first_name.$touch()"
                    @blur="$v.first_name.$touch()"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                    v-model="last_name"
                    :error-messages="lastNameErrors"
                    :counter="21"
                    label="Last Name"
                    required
                    @input="$v.last_name.$touch()"
                    @blur="$v.last_name.$touch()"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                  <v-text-field
                  :disabled="true"
                  v-model="email"
                  label="Email"
                  ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                    v-model="contact"
                    :error-messages="contactErrors"
                    :counter="15"
                    label="Contact Number"
                    type="number"
                    required
                    @input="$v.contact.$touch()"
                    @blur="$v.contact.$touch()"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                <v-text-field
                v-model="address"
                label="Physical Address"
                :error-messages="addressErrors"
                :counter="100"
                type="address"
                required
                @input="$v.address.$touch()"
                @blur="$v.address.$touch()"
                ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1"
              text
              @click="save({first_name, last_name, email,contact, address})">
                Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>

    </template>
    <!-- <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template> -->
  </v-data-table>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';
import axios from 'axios';

export default {
  mixins: [validationMixin],
  validations: {
    first_name: { required, maxLength: maxLength(10) },
    last_name: { required, maxLength: maxLength(10) },
    contact: { required },
    address: { required },
  },
  data: () => ({
    loading: false,
    dialog: false,
    first_name: '',
    last_name: '',
    email: '',
    contact: null,
    address: '',
    headers: [
      { text: 'First Name', value: 'first_name' },
      { text: 'Last Name', value: 'last_name' },
      { text: 'Email', value: 'email' },
      { text: 'Contact', value: 'contact' },
      { text: 'Physical Address', value: 'address', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      first_name: '',
      last_name: '',
      email: '',
      contact: '',
      address: '',
    },

  }),

  computed: {
    formTitle() {
      return 'Edit Persnal Details';
    },
    user() {
      return this.$store.state.user;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.last_name.$dirty) return errors;
      if (!this.$v.last_name.maxLength) errors.push('Last Name must be at most 10 characters long');
      if (!this.$v.last_name.required) errors.push('Last Name is required.');
      return errors;
    },
    firstNameErrors() {
      const errors = [];
      if (!this.$v.first_name.$dirty) return errors;
      if (!this.$v.first_name.maxLength) errors.push('First Name must be at most 10 characters long');
      if (!this.$v.first_name.required) errors.push('First Name is required.');
      return errors;
    },
    contactErrors() {
      const errors = [];
      if (!this.$v.contact.$dirty) return errors;
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

  watch: {
    dialog(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.users = [
        {
          first_name: this.user.first_name,
          last_name: this.user.last_name,
          email: this.user.email,
          contact: this.user.contact,
          address: this.user.address,
        },

      ];
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);

      this.first_name = item.first_name;
      this.last_name = item.last_name;
      this.email = item.email;
      this.contact = item.contact;
      this.address = item.address;
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.$v.$reset();
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      });
    },

    save(eddited) {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.status = 'ERROR';
      } else {
        this.loading = true;
        if (this.editedIndex > -1) {
          Object.assign(this.users[this.editedIndex], eddited);
        } else {
          this.users.push(this.editedItem);
        }
        this.close();
        axios
          .post('/self/edit', {
            id: this.user.id,
            ...eddited,
          })
          .then(({ data }) => {
            this.loading = false;
            console.log(data);
          });
      }
    },
  },
};
</script>
