import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import User from './components/User'
import UserAuth from './components/UserAuth'
import Inventory from './components/Inventory.vue'
import Buy from './components/Buy'
import Sell from './components/Sell'
import BuyHistorial from './components/BuyHistorial'
import SellHistorial from './components/SellHistorial'

const routes = [{
    path: '/',
    name: 'root',
    component: App
    },
    {
        path: '/user/auth',
        name: "user_auth",
        component: UserAuth
    },
    {
        path: '/user/:username',
        name: "user",
        component: User
    },
    {
        path: '/inventory/:username',
        name: "inventory",
        component: Inventory
    },
    {
        path: '/buy/:username',
        name: "buy",
        component: Buy
    },
    {
        path: '/sell/:username',
        name: "sell",
        component: Sell
    },
    {
        path: '/buyHistorial/:username',
        name: "buyHistorial",
        component: BuyHistorial
    },
    {
        path: '/sellHistorial/:username',
        name: "sellHistorial",
        component: SellHistorial
    },
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_UR),
    routes
})
export default router