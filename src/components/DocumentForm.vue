<template>
<v-card
  elevation="2"
>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
           <v-file-input
              v-model="file"
              placeholder="Upload your document"
              label="File input"
              :rules="fileRules"
              prepend-icon="mdi-paperclip"
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
            </v-file-input>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
           <v-autocomplete
            v-model="leave"
            :items="cleaves"
            :rules="leaveRules"
            label="Select Leave"
            item-text="name"
              item-value="_id"
          ></v-autocomplete>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="upload"
    >
      Upload
    </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
  </v-card>
</template>
<script>
import axios from 'axios';

export default {
  props: {
    leaves: {
      type: Array,
      default: () => ([]),
    },
  },
  data: () => ({
    valid: false,
    name: '',
    nameRules: [
      (v) => !!v || 'Name is required',
    ],
    file: null,
    fileRules: [
      (v) => !!v.name || 'File is Required',
    ],
    leave: '',
    leaveRules: [
      (v) => !!v || 'Leave is required',
    ],
  }),
  computed: {
    getLeaves() {
      return JSON.stringify(this.file);
    },
    emp_id() {
      /* eslint-disable no-underscore-dangle */
      const l = this.leaves.find((cl) => cl._id === this.leave);
      if (l) return l.emp_id._id;
      return '';
    },
    cleaves() {
      /* eslint-disable no-underscore-dangle */
      return this.leaves.map((l) => ({ name: `${l.type} | ${l.leaveDays} day(s) (${l.start.substr(0, 10)} to ${l.end.substr(0, 10)})`, _id: l._id }));
    },
  },
  methods: {
    async upload() {
      const formData = new FormData();

      formData.append('document', this.file);
      formData.append('leave_id', this.leave);
      formData.append('emp_id', this.emp_id);
      formData.append('name', this.name);

      const response = await axios
        .post('/upload/document/', formData, {
          headers: {
            crossdomain: true,
            'Content-Type': 'undefined',
          },
        }).catch((err) => {
          console.log(err);
          this.$notifications.notify(
            {
              message: 'Document Not Uploaded',
              title: 'Not Saved',
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
          message: 'Document Uploaded',
          title: 'Saved',
          horizontalAlign: 'center',
          verticalAlign: 'bottom',
          type: 'success',
          color: 'primary',
        },
      );
      console.log(response);
    },
  },
};
</script>
