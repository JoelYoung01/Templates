<script setup lang="ts"></script>

<template>
  <v-container class="d-flex flex-column align-center">
    <h1>Home</h1>
    <p class="mb-6">Welcome to the Home page</p>

    <v-card>
      <v-card-title>About Page</v-card-title>
      <v-card-text>The about page contains details about this app.</v-card-text>
      <v-card-actions>
        <v-btn variant="text" to="/about">Go to About Page</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
