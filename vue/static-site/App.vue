<script setup lang="ts">
import { RouterView } from "vue-router";

const title = import.meta.env.VITE_APP_TITLE;
</script>

<template>
  <v-app>
    <v-app-bar dense color="primary" :elevation="2">
      <v-app-bar-title>
        <RouterLink class="text-decoration-none text-white" to="/">{{ title }}</RouterLink>
      </v-app-bar-title>

      <v-btn variant="text" prepend-icon="mdi-home" to="/">Home</v-btn>
      <v-btn variant="text" prepend-icon="mdi-information" to="/about">About</v-btn>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped></style>
