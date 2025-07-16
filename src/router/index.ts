/* 路由配置文件 index.ts */
import { createWebHistory, createRouter } from 'vue-router';
import { useUserInfo } from '@/store/user';
import { getUserDetail, userRefresh } from '@/api/user';
import { usePlayList } from '@/store/play';
import { storeToRefs } from 'pinia';
 
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
            },
            {
                path: '/mv',
                name: 'Movie',
                component: () => import('@/views/Movie.vue'),
            },
            {
                path: '/settings',
                name: 'Settings',
                component: () => import('@/views/Setting.vue'),
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
        // 判断是否登录
        const { data } = await userRefresh();
        if(data.result === 301) {
            next('login');
        }else {
            const { userInfo, setUserInfo } = useUserInfo();
            if(JSON.stringify(userInfo)=='{}'){
                const { data } = await getUserDetail();
                setUserInfo(data.data);
            }
            next();
        }
    }
})
 
// 导出实例
export default router;