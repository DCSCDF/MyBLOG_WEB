<template>
        <!-- TopNavBar (Shared Component) -->
        <nav
            :class="isVisible || isMenuOpen ? 'translate-y-0' : '-translate-y-full'"
            class="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] md:max-w-2xl max-w-xl rounded-full px-4 py-2 border border-gray-200/50 dark:border-gray-700/50 bg-white/70 backdrop-blur-md flex items-center justify-between z-50 shadow-[0_8px_32px_rgba(22,119,255,0.04)] transition-transform duration-300"
            data-allow-mismatch
        >
                <div class="text-lg font-bold tracking-tighter text-gray-900 px-3 flex items-center ">
                        <img alt="" height="30" src="../assets/images/白猫.svg" width="30">
                        <!--					<span v-if="siteName" class="mx-2 text-base">{{ siteName }}</span>-->
                </div>
                <div class="hidden md:flex items-center gap-8">
                        <NuxtLink v-for="(item, index) in menu"
                                  :key="index"
                                  :to="item.link"
                                  class="text-gray-500 hover:text-blue-500 transition-colors font-['Plus_Jakarta_Sans'] text-sm font-medium tracking-tight cursor-pointer"
                                  data-allow-mismatch>
                                {{ item.name }}
                        </NuxtLink>
                        <!-- 分类选择下拉 (仅文章列表页面显示) -->
                        <div v-if="showCategoryDropdown" class="category-dropdown">
                                <button
                                    class="category-dropdown-trigger text-gray-500 hover:text-blue-500 transition-colors font-['Plus_Jakarta_Sans'] text-sm font-medium tracking-tight cursor-pointer"
                                    @click="toggleDropdown"
                                >
                                        {{ currentCategoryName }}
                                        <span class="dropdown-arrow">▼</span>
                                </button>
                                <div v-if="isDropdownOpen" class="category-dropdown-menu">
                                        <div
                                            :class="{ active: !selectedCategoryId }"
                                            class="dropdown-item"
                                            @click="selectCategory(undefined)"
                                        >
                                                全部分类
                                        </div>
                                        <div
                                            v-for="category in categoryList"
                                            :key="category.id"
                                            :class="{ active: selectedCategoryId === category.id }"
                                            class="dropdown-item"
                                            @click="selectCategory(category.id)"
                                        >
                                                {{ category.name }}
                                        </div>
                                </div>
                        </div>
                </div>
                <div class="flex items-center gap-2">
                        <Search/>
                        <!-- 用户登录状态 (仅客户端渲染) -->
                        <ClientOnly fallback="<!-- user-auth-section -->" fallback-tag="div">
                                <div v-if="userInfo" class="hidden md:flex items-center gap-2">
                                        <a-avatar
                                            :size="40"
                                            :src="userInfo.avatarUrl || undefined"
                                            :style="{ backgroundColor: userInfo.avatarUrl ? undefined : '#1890ff' }"
                                            class="cursor-pointer hover:opacity-80 transition-opacity"
                                            @click="navigateTo('/login')">
                                                {{ userInfo.nickname?.[0] || userInfo.username?.[0] || '?' }}
                                        </a-avatar>
                                </div>
                                <NuxtLink
                                    v-else
                                    class="hidden md:flex p-2 text-md px-5 text-white rounded-full bg-gradient-to-b text-sm from-gray-600 to-gray-900 shadow-[inset_0_1px_1px_0px_rgba(255,255,255,0.25),0_3px_3px_0px_rgba(0,0,0,0.15)]"
                                    to="/login">
                                        登陆
                                </NuxtLink>
                        </ClientOnly>
                        <div class="mx-2 flex md:hidden">
                                <button class="flex items-center cursor-pointer" @click="toggleMenu">
                                        <MenuOutlined :style="{ fontSize: '18px' }"/>
                                </button>
                        </div>
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
                                          :key="index" :to="item.link"
                                          class="mb-4 mx-6 text-xl font-black cursor-pointer"
                                          data-allow-mismatch>
                                        {{ item.name }}
                                </NuxtLink>
                                <ClientOnly fallback="<!-- mobile-user-auth-section -->" fallback-tag="div">
                                        <div v-if="userInfo">
                                                <NuxtLink class="mb-4 mx-6 text-xl font-black cursor-pointer"
                                                          to="/login">
                                                        用户中心 - {{ userInfo.nickname || userInfo.username }}
                                                </NuxtLink>
                                        </div>
                                        <NuxtLink v-else class="mb-4 mx-6 text-xl font-black cursor-pointer"
                                                  to="/login">
                                                登陆
                                        </NuxtLink>
                                </ClientOnly>
                                <!-- 移动端分类选择 (仅文章列表页面显示) -->
                                <div v-if="showMobileCategory" class="mb-4 mx-6">
                                        <div class="text-xl font-black mb-2">选择分类</div>
                                        <div class="flex flex-col gap-2 px-3 border-l-2 border-gray-300">
                                                <div
                                                    :class="{ 'text-blue-500 font-bold': !selectedCategoryId }"
                                                    class="text-base cursor-pointer"
                                                    @click="selectCategory(undefined)"
                                                >
                                                        全部分类
                                                </div>
                                                <div
                                                    v-for="category in categoryList"
                                                    :key="category.id"
                                                    :class="{ 'text-blue-500 font-bold': selectedCategoryId === category.id }"
                                                    class="text-base  cursor-pointer"
                                                    @click="selectCategory(category.id)"
                                                >
                                                        {{ category.name }}
                                                </div>
                                        </div>
                                </div>


                        </div>
                </div>
        </transition>
</template>

<script lang="ts" setup>
import {authApi} from '~/api/user/authApi'
import {categoryApi} from '~/api/category/categoryApi'
import Search from "~/components/blog/Search.vue";

defineProps<{
        siteName?: string
}>()

const route = useRoute()

// 分类列表
const categoryList = ref<any[]>([])
const selectedCategoryId = ref<number | undefined>(undefined)
const isDropdownOpen = ref(false)

// 本地存储键名
const STORAGE_KEY = 'selectedCategoryId'

// 从本地存储读取选中的分类
const loadSelectedCategory = () => {
        if (import.meta.client) {
                const stored = localStorage.getItem(STORAGE_KEY)
                if (stored) {
                        selectedCategoryId.value = stored === 'all' ? undefined : Number(stored)
                }
        }
}

// 保存选中的分类到本地存储
const saveSelectedCategory = (categoryId: number | undefined) => {
        if (import.meta.client) {
                if (categoryId === undefined) {
                        localStorage.setItem(STORAGE_KEY, 'all')
                } else {
                        localStorage.setItem(STORAGE_KEY, categoryId.toString())
                }
        }
}

// 获取当前选中的分类名称
const currentCategoryName = computed(() => {
        if (!selectedCategoryId.value) return '全部分类'
        const category = categoryList.value.find(c => c.id === selectedCategoryId.value)
        return category?.name || '全部分类'
})

// 获取分类列表
const fetchCategoryList = async () => {
        try {
                const result = await categoryApi.getCategoryList()
                if (result && result.data) {
                        categoryList.value = result.data || []
                }
        } catch (error) {
                console.error('获取分类列表失败:', error)
        }
}

// 切换下拉菜单
const toggleDropdown = () => {
        isDropdownOpen.value = !isDropdownOpen.value
}

// 选中分类 - 使用路由跳转更新 URL query 参数
const selectCategory = (categoryId: number | undefined) => {
        selectedCategoryId.value = categoryId
        saveSelectedCategory(categoryId)
        isDropdownOpen.value = false
        // 通过路由跳转触发服务端重新获取数据
        navigateTo({
                path: '/',
                query: categoryId ? {categoryId: categoryId.toString()} : {}
        }, {replace: true})
}

// 是否显示分类下拉菜单（仅在文章列表页面显示）
const showCategoryDropdown = computed(() => {
        return route.path === '/' || route.path === ''
})

// 移动端是否显示分类选择
const showMobileCategory = computed(() => {
        return route.path === '/' || route.path === ''
})

// 点击其他地方关闭下拉菜单
const closeDropdown = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        if (!target.closest('.category-dropdown')) {
                isDropdownOpen.value = false
        }
}

// 监听其他标签页的分类变化
const handleCategoryStorageChange = (e: StorageEvent) => {
        if (e.key === STORAGE_KEY) {
                loadSelectedCategory()
        }
}

const menu = ref([
        {
                name: "主页",
                link: "/"
        },
        {
                name: "友情链接",
                link: "/friendsLink"
        },
        // {
        //         name: "MyBlog",
        //         link: "/"
        // }
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

// 检查是否有可用的 token
const hasToken = (): boolean => {
        if (typeof window === 'undefined') return false

        // 根据 remember 值决定从哪里读取 token
        const isRemember = localStorage.getItem('remember') === 'true'

        if (isRemember) {
                return !!localStorage.getItem('token')
        } else {
                return !!(sessionStorage.getItem('token') || localStorage.getItem('token'))
        }
}

// 同步 localStorage token 到 sessionStorage（跨标签页共享）
const syncTokenFromLocalStorage = () => {
        // 只在 remember=false 且 sessionStorage 没有 token 时同步
        const isRemember = localStorage.getItem('remember') === 'true'
        if (isRemember) return

        const localToken = localStorage.getItem('token')
        const sessionToken = sessionStorage.getItem('token')

        if (localToken && !sessionToken) {
                sessionStorage.setItem('token', localToken)
        }
}

// 处理其他标签页的登录状态变化
const handleStorageChange = (event: StorageEvent) => {
        const triggerKeys = ['token', 'login_status', 'session_login_trigger', 'logout_trigger']

        if (event.key && triggerKeys.includes(event.key)) {
                if (event.key === 'logout_trigger') {
                        // 登出事件，清除用户状态
                        userInfo.value = null
                        sessionStorage.removeItem('token')
                } else if (event.newValue === null && event.key === 'token') {
                        // token 被清除，用户登出
                        userInfo.value = null
                } else if (event.key === 'login_status' || event.key === 'session_login_trigger') {
                        // 登录触发器事件，先同步 token，再重新获取用户信息
                        syncTokenFromLocalStorage()
                        if (hasToken()) {
                                fetchUserProfile()
                        }
                }
        }
}

// 处理页面可见性变化
const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
                // 页面重新可见时，检查 token 是否存在
                if (hasToken()) {
                        fetchUserProfile()
                } else {
                        userInfo.value = null
                }
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
        window.addEventListener('storage', handleStorageChange)
        window.addEventListener('storage', handleCategoryStorageChange)
        document.addEventListener('visibilitychange', handleVisibilityChange)
        document.addEventListener('click', closeDropdown)
        // 初始化时同步 localStorage token 到 sessionStorage
        syncTokenFromLocalStorage()
        fetchUserProfile()
        fetchCategoryList()
        loadSelectedCategory()
})

onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('storage', handleStorageChange)
        window.removeEventListener('storage', handleCategoryStorageChange)
        document.removeEventListener('visibilitychange', handleVisibilityChange)
        document.removeEventListener('click', closeDropdown)
})

</script>

<style scoped>
/* 分类选择下拉样式 */
.category-dropdown {
        position: relative;
}

.category-dropdown-trigger {
        display: flex;
        align-items: center;
        gap: 4px;
        background: none;
        border: none;
        padding: 0;
}

.dropdown-arrow {
        font-size: 10px;
        transition: transform 0.2s;
}

.category-dropdown-menu {
        position: absolute;
        top: 100%;
        left: 0;
        margin-top: 8px;
        min-width: 120px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        padding: 4px 0;
        z-index: 100;
}

.dropdown-item {
        padding: 8px 12px;
        cursor: pointer;
        font-family: 'Plus_Jakarta_Sans', sans-serif;
        font-size: 14px;
        font-weight: 500;
        color: #64748b;
        transition: all 0.2s;
}

.dropdown-item:hover {
        background: #f1f5f9;
        color: #3b82f6;
}

.dropdown-item.active {
        color: #3b82f6;
        font-weight: 600;
}
</style>