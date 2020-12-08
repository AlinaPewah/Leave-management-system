<template>
       <v-row  class= "d-flex flex-column justify-center" >
         <v-col cols="12" sm="10" md="7">

       <h2>Reigster An Employee</h2>
         </v-col>
         <v-col cols="12" sm="10" md="7">

         <Reigster/>
         </v-col>
       </v-row>
</template>
<script>
// import PlotForm from '../../components/PlotForm.vue';
import Reigster from '../../components/Signup.vue';

export default {
  components: {
    Reigster,
  },
  data: () => ({
    text: 'PlotForm',
  }),
};
</script>
