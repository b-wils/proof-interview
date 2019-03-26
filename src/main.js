import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import ProofEditor from './components/ProofEditor.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vuetify)

const routes = [
  { path: '/', component: ProofEditor },
  {path: '/:fileSlug', component: ProofEditor, props: true}
]

const router = new VueRouter({
  routes
})

new Vue({
 router,
 render: h => h(App)
}).$mount('#app')
