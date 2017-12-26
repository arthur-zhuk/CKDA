<template>
  <v-app>
    <v-navigation-drawer app stateless hide-overlay :mini-variant.sync="mini" v-model="drawer" fixed>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile>
            <v-list-tile-avatar>
              <img src="./assets/CKDALogo.png" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title class="title">
                CKDA
              </v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.native.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
       <v-list dense class="pt-0">
        <v-list-tile :to="{path: '/' + item.route}" v-for="item in items" :key="item.title" @click="">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid>
        <router-view>
        </router-view>
      </v-container>
    </v-content>
    <v-footer app>Created by <a href="www.twitter.com/ug02fast">@ug02fast</a></v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      drawer: true,
      mini: true,
      right: null,
      items: [
        { title: 'Attributes', icon: 'dashboard', route: 'attributes' },
        { title: 'Data Crunching', icon: 'dashboard', route: 'datacrunch' },
        { title: 'About', icon: 'question_answer', route: 'about' },
      ],
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
