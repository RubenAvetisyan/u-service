import { defineStore } from '@pinia/nuxt';

export const useServices = defineStore('services', {
    state: () => ({
        services: {},
    }),
});
