import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '~/views/HomeView.vue';
import RedirectView from '~/views/RedirectView.vue';
import UserView from '~/views/UserView.vue';

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/mine',
      name: 'user',
      component: UserView,
    },
    {
      path: '/:target',
      name: 'redirector',
      props: true,
      component: RedirectView,
    },
  ],
});
