import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueClipboard from 'vue-clipboard2'
import mavonEditor from 'mavon-editor'
import VCharts from 'v-charts'
import 'v-charts/lib/pie.common'
import * as echarts from 'echarts';//引入echarts
import 'mavon-editor/dist/css/index.css'
import SlideVerify from 'vue-monoplasty-slide-verify';  //滑动验证
Vue.use(SlideVerify)

Vue.use(VueClipboard);
Vue.use(mavonEditor)
Vue.use(ElementUI);
Vue.use(VCharts)
Vue.prototype.$echarts = echarts //挂载在原型，组件内使用直接this.$echarts调用

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
