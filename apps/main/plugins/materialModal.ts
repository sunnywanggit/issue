import { App } from 'vue';
const { installLineStyle } = require('lt-material-modal');

export default defineNuxtPlugin((nuxtApp) => {
    installLineStyle(nuxtApp.vueApp as unknown as App);
    // installVxe(nuxtApp.vueApp as unknown as App);
    // installLayLoad(nuxtApp.vueApp as unknown as App);
});
