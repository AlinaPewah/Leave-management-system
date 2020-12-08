import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#152338', // #E53935
        secondary: colors.amber.darken2, // #FFCDD2
        accent: colors.indigo.base, // #3F51B5
      },
    },
  },
});
// red darken-1
