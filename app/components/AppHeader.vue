<template>
        <!-- TopNavBar (Shared Component) -->
        <nav
            :class="['fixed top-4 left-1/2 -translate-x-1/2 w-[95%] md:max-w-4xl max-w-xl  rounded-full px-4 py-2 border  border-slate-200/50 dark:border-slate-700/50 bg-white/70 backdrop-blur-md flex items-center justify-between z-50 shadow-[0_8px_32px_rgba(22,119,255,0.04)]',
            isVisible || isMenuOpen ? 'translate-y-0' : '-translate-y-full' ]"

        >
                <div class="text-lg font-bold tracking-tighter text-slate-900 px-3 flex items-center">
                        <img alt="" height="30" src="../assets/images/白猫.svg" width="30">
                        <!--                        <h1 class="mx-2">MYBLOG</h1>-->
                </div>
                <div class="hidden md:flex items-center gap-8">
                        <a v-for="(item, index) in menu"
                           :key="index"
                           class="text-slate-500 hover:text-blue-500 transition-colors font-['Plus_Jakarta_Sans'] text-sm font-medium tracking-tight"
                           @click="navigateTo(item.link)">
                                {{
                                        item.name
                                }}
                        </a>
                </div>
                <!-- 已登录：显示头像和用户名 -->
                <div v-if="userInfo" class="hidden md:flex items-center gap-2">
                        <a-avatar
                            :size="40"
                            :src="userInfo.avatarUrl || undefined"
                            :style="{ backgroundColor: userInfo.avatarUrl ? undefined : '#1890ff' }"
                            class="cursor-pointer hover:opacity-80 transition-opacity"
                            @click="navigateTo('/login')">
                                {{ userInfo.nickname?.[0] || userInfo.username?.[0] || '?' }}
                        </a-avatar>
                        <!--                                                <span class="text-sm font-medium">{{userInfo.nickname || userInfo.username}}</span>-->
                </div>
                <!--                <button-->
                <!--                    class="bg-primary text-on-primary px-5 py-2 rounded-full text-sm font-semibold tracking-tight hover:bg-primary-dim transition-all active:scale-95">-->
                <!--                        登陆-->
                <!--                </button>-->
                <NuxtLink
                    v-else
                    class="hidden md:flex p-2 text-md px-5 text-white rounded-full bg-gradient-to-b text-sm
                                                           from-gray-600 to-gray-900 shadow-[inset_0_1px_1px_0px_rgba(255,255,255,0.25),0_3px_3px_0px_rgba(0,0,0,0.15)]"
                    to="/login">
                        登陆
                </NuxtLink>
                <div class="mx-4 flex md:hidden">
                        <button class="flex items-center" @click="toggleMenu">
                                <MenuOutlined :style="{ fontSize: '18px' }"/>
                        </button>
                </div>
        </nav>


        <!--        <header :class="[-->
        <!--            'sticky top-0 left-0 right-0 z-40 duration-300 flex justify-center transition-transform',-->
        <!--            isVisible || isMenuOpen ? 'translate-y-0' : '-translate-y-full'-->
        <!--        ]">-->
        <!--                <div-->
        <!--                    class="my-4 w-full max-w-4xl mx-4 md:mx-12 bg-white/90 rounded-full backdrop-blur-md-->
        <!--                    shadow-[0_0px_0.34px_0.34px_rgba(30,45,82,0.06),0.34px_0.34px_0.34px_0px_rgba(30,45,82,0.2)] opacity-100 mix-blend-plus-lighter">-->
        <!--                        <div class="p-2 flex justify-between flex-row">-->
        <!--                                <div class="mx-4 flex h-10">-->
        <!--                                        <div class="flex items-center">-->
        <!--                                                <img alt="" height="30" src="../assets/images/白猫.svg" width="30">-->
        <!--                                        </div>-->
        <!--                                        <div class="hidden md:flex items-center gap-2 mx-4">-->
        <!--                                                <a-button v-for="(item, index) in menu" :key="index"-->
        <!--                                                          type="text"-->
        <!--                                                          @click="navigateTo(item.link)">-->
        <!--                                                        {{ item.name }}-->
        <!--                                                </a-button>-->
        <!--                                        </div>-->
        <!--                                </div>-->
        <!--                                <div class="flex items-center gap-2 mx-1 ">-->
        <!--                                        &lt;!&ndash; 已登录：显示头像和用户名 &ndash;&gt;-->
        <!--                                        <div v-if="userInfo" class="hidden md:flex items-center gap-2">-->
        <!--                                                <a-avatar-->
        <!--                                                    :size="40"-->
        <!--                                                    :src="userInfo.avatarUrl || undefined"-->
        <!--                                                    :style="{ backgroundColor: userInfo.avatarUrl ? undefined : '#1890ff' }"-->
        <!--                                                    class="cursor-pointer hover:opacity-80 transition-opacity"-->
        <!--                                                    @click="navigateTo('/login')">-->
        <!--                                                        {{ userInfo.nickname?.[0] || userInfo.username?.[0] || '?' }}-->
        <!--                                                </a-avatar>-->
        <!--                                                &lt;!&ndash;                                                <span class="text-sm font-medium">{{userInfo.nickname || userInfo.username}}</span>&ndash;&gt;-->
        <!--                                        </div>-->
        <!--                                        &lt;!&ndash; 未登录：显示登陆按钮 &ndash;&gt;-->
        <!--                                        <NuxtLink-->
        <!--                                            v-else-->
        <!--                                            class="hidden md:flex p-2 text-md px-6 text-white rounded-full bg-gradient-to-b-->
        <!--                                           from-gray-600 to-gray-900 shadow-[inset_0_1px_1px_0px_rgba(255,255,255,0.25),0_3px_3px_0px_rgba(0,0,0,0.15)]"-->
        <!--                                            to="/login">-->
        <!--                                                登陆-->
        <!--                                        </NuxtLink>-->


        <!--                                        <div class="mx-4 flex md:hidden">-->
        <!--                                                <button class="flex items-center" @click="toggleMenu">-->
        <!--                                                        <MenuOutlined :style="{ fontSize: '18px' }"/>-->
        <!--                                                </button>-->
        <!--                                        </div>-->
        <!--                                </div>-->
        <!--                        </div>-->
        <!--                </div>-->
        <!--        </header>-->

        <transition
            enter-active-class="transition-opacity duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-300"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0">
                <div v-if="isMenuOpen" class="md:hidden fixed w-full h-full bg-white z-30">
                        <div class="mt-28 flex flex-col">
                                <NuxtLink v-for="(item, index) in menu"
                                          :key="index" class="mb-4 mx-6 text-xl font-black "
                                          type="text"
                                          @click="navigateTo(item.link)">
                                        {{ item.name }}
                                </NuxtLink>

                                <div v-if="userInfo">
                                        <NuxtLink class="mb-4 mx-6 text-xl font-black " to="/login">
                                                用户中心 - {{ userInfo.nickname || userInfo.username }}
                                        </NuxtLink>
                                </div>
                                <NuxtLink v-else class="mb-4 mx-6 text-xl font-black " to="/login">
                                        登陆
                                </NuxtLink>


                        </div>
                </div>
        </transition>
</template>

<script lang="ts" setup>

import {authApi} from '~/api/user/authApi'

const menu = ref([
        {
                name: "主页",
                link: "/"
        },
        {
                name: "友情链接",
                link: "/123"
        },
        {
                name: "MyBlog",
                link: "/"
        }
])

const isMenuOpen = ref(false)
const isVisible = ref(true)
const lastScrollY = ref(0)
const userInfo = ref<{
        id: number
        username: string
        nickname: string
        email: string
        avatarUrl: string | null
} | null>(null)

const fetchUserProfile = async () => {
        try {
                const result = await authApi.profile()
                if (result.data) {
                        userInfo.value = result.data
                }
        } catch (error) {
                console.log('获取用户信息失败，用户未登录')
                userInfo.value = null
        }
}

const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value
}

const handleScroll = () => {
        const currentScrollY = window.scrollY

        // 只有下滑超过 ~px 才启动隐藏逻辑
        if (currentScrollY > 10000000) {
                // 下滑时隐藏
                if (currentScrollY > lastScrollY.value) {
                        isVisible.value = false
                }
                // 上滑时显示
                else if (currentScrollY < lastScrollY.value) {
                        isVisible.value = true
                }
        } else {
                // 滚动距离小于 ~px 时始终显示
                isVisible.value = true
        }

        lastScrollY.value = currentScrollY
}

onMounted(() => {
        window.addEventListener('scroll', handleScroll)
        fetchUserProfile()
})

onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll)
})

</script>