import Vue from 'vue';
import Vuetify from 'vuetify';
import VueAnalytics from 'vue-analytics';
import Router from 'vue-router';
import Attributes from '@/components/Attributes';
import DataCrunch from '@/components/DataCrunch';
import About from '@/components/About';

Vue.use(Router);
Vue.use(Vuetify);
Vue.use(VueAnalytics, {
  id: 'UA-88421727-2',
});

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
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    { path: '*', redirect: '/' },
  ],
});
