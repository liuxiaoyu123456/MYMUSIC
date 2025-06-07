import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";
import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

library.add(fas, far, fab)

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .use(pinia)
  .use(createVuestic({
    config: {
        colors: {
            variables: {
                primary: '#2c82e0'
            }
        },
    }
  })).mount('#app')
