// Vuetify
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import { createVuetify, type ThemeDefinition } from "vuetify";
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'

const MainTheme: ThemeDefinition = {
  dark: false,
  colors: {
    // Add color overrides here
  },
  variables: {
    // Add variable overrides here
  }
};

const vuetify = createVuetify({
  theme: {
    defaultTheme: "MainTheme",
    themes: {
      MainTheme
    }
  }
});

export default vuetify;
