import Vue from 'vue';
import Vuetify from 'vuetify';
import Router from 'vue-router';
import Attributes from '@/components/Attributes';
import DataCrunch from '@/components/DataCrunch';

Vue.use(Router);
Vue.use(Vuetify);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Attributes',
      component: Attributes,
    },
    {
      path: '/attributes',
      name: 'Attributes',
      component: Attributes,
    },
    {
      path: '/datacrunch',
      name: 'DataCrunch',
      component: DataCrunch,
    },
    { path: '*', redirect: '/' },
  ],
});
