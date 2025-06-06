/* 路由配置文件 index.ts */
import { createWebHistory, createRouter } from 'vue-router';
import { isLogin } from '@/utils';
import { useUserInfo } from '@/store/user';
 
// 定义路由配置
const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/',
        name: 'Layout',
        component: () => import('@/views/Layout.vue'),
        children: [
            {
                path: '/recommend',
                name: 'Recommend',
                meta: {
                    requireAuth: true,
                },
                component: () => import('@/views/Recommend.vue')
            },
            {
                path: '/like',
                name: 'Like',
                meta: {
                    requireAuth: true,
                },
                component: () => import('@/views/Like.vue')
            },
            {
                path: '/comment',
                name: 'Comment',
                component: () => import('@/views/Comments.vue')
            },
            {
                path: '/musicShop',
                name: 'MusicShop',
                component: () => import('@/views/MusicShop.vue')
            },
            {
                path: '/videoDetail',
                name: 'videoDetail',
                component: () => import('@/views/videoDetail.vue'),
            },
            {
                path: '/local',
                name: 'Local',
                component: () => import('@/views/Local.vue'),
            }
        ]
    }
]
 
// 创建路由实例
const router = createRouter({
    history: createWebHistory(),    // 导航历史记录模式
    routes
});

router.beforeEach(async(to, from, next) => {
    if(!to.meta.requireAuth) {
        next();
    } else {
        const res = await isLogin();
        if(res === 301) {
            next('login');
        }else {
            const { setUserInfo } = useUserInfo();
            setUserInfo();
            next();
        }
    }
})
 
// 导出实例
export default router;