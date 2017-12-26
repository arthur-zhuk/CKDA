<template>
  <div id="app">
    <v-app light>
      <v-layout row justify-center>
        <v-flex xs12>
          <h2 class="pb-5 text-xs-center">Crypto Kitty Data Analyzer</h2>
        </v-flex>
      </v-layout>
      <v-layout row justify-center>
        <v-avatar
          :tile="false"
          :size="'60px'"
          class="grey lighten-4"
        >
          <img class="logo" src="./assets/CKDALogo.png">
        </v-avatar>
      </v-layout>
      <router-view/>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
    };
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.logo {
  width: 200px;
}
</style>
