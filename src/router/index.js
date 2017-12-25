import Vue from 'vue';
import Vuetify from 'vuetify';
import Router from 'vue-router';
import HomePage from '@/components/HomePage';

Vue.use(Router);
Vue.use(Vuetify);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
  ],
});
