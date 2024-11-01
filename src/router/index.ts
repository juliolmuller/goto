import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '~/views/HomeView.vue';
import RedirectView from '~/views/RedirectView.vue';

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/:target',
      name: 'redirector',
      props: true,
      component: RedirectView,
    },
  ],
});
