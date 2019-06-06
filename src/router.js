import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import PageCenter from './views/PageCenter.vue'

import OrderList from '@/views/order/orderList.vue'
import ManualOrder from '@/views/order/manualOrder.vue'
import ImportNewSKU from '@/views/productCenter/baseData/ImportNewSKU.vue'
import CategoryConf from '@/views/productCenter/baseData/CategoryConf.vue'
import ImportCateAttrs from '@/views/productCenter/baseData/ImportCateAttrs.vue'
import FinancialConfirm from '@/views/financialCenter/FinancialConfirm.vue'

import PageNotFound from '@/views/PageNotFound.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/pageCenter',
      name: 'pageCenter',
      component: PageCenter,
      children: [{
        path:'bossorderListsub',
        name:'bossorderListsub',
        component: OrderList},
        {
          path:'bossaddmanualorder',
          name:'bossaddmanualorder',
          component: ManualOrder},
        {
          path:'bosscommodityAddSKU',
          name:'bosscommodityAddSKU',
          component: ImportNewSKU},
        {
          path:'bossmodityClassificationsub',
          name:'bossmodityClassificationsub',
          component: CategoryConf},
        {
          path:'bossClassAttr',
          name:'bossClassAttr',
          component: ImportCateAttrs},
        {
          path:'bosscheckPaymentBill',
          name:'bosscheckPaymentBill',
          component: FinancialConfirm},
      ]
    },
    {
      path: '**',
      name: 'pageNotFound',
      component: PageNotFound
    },
  ]
})
