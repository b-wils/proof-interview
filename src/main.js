import Vue from 'vue'
import App from './App.vue'
import ProofEditor from './components/ProofEditor.vue'
import FileEditor from './components/FileEditor.vue'
import VueRouter from 'vue-router'



Vue.config.productionTip = false

Vue.use(VueRouter)

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
