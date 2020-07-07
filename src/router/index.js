import { createRouter, createWebHashHistory } from 'vue-router'
import Trying from '@/views/trying'
import Tryend from '@/views/tryend'
import TryingDetail from '@/views/trying-detail'
import TryendDetail from '@/views/tryend-detail'
import ApplyList from '@/views/applys-list'
import WinnerList from '@/views/winner-list'

const routes = [
  {
    path: '/',
    redirect: '/trying'
  },
  {
    path: '/trying',
    component: Trying,
    children: [
      {
        path: ':id',
        component: TryingDetail
      }
    ]
  },
  {
    path: '/tryend',
    component: Tryend,
    children: [
      {
        path: ':id',
        component: TryendDetail
      }
    ]
  },
  {
    path: '/applys-list/:id',
    name: 'applys-list',
    component: ApplyList
  },
  {
    path: '/winner-list/:id',
    name: 'winner-list',
    component: WinnerList
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
