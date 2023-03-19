import { defineStore } from '@pinia/nuxt';

export const useSidebar = defineStore('sidebar', {
  state: () => ({
    isHidden: false,
  }),
});
