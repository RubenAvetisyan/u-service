import { defineStore } from '@pinia/nuxt';

export const useNavigationLinks = defineStore('navigationLinks', {
  state: () => ({
    links: {},
  }),
});
