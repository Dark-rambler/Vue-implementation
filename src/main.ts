import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el CSS de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importa el JS de Bootstrap

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
