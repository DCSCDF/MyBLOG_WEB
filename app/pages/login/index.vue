<template>


        <div class="flex justify-center mt-52 flex-col">

                <a-spin size="large"/>
                <p class="mx-auto mt-3 my-32 text-gray-600">Loading...</p>
        </div>


</template>


<script lang="ts" setup>
import {onMounted} from 'vue'
import {useRoute} from 'vue-router'
import {authApi} from '~/api/user/authApi'

const route = useRoute()
const config = useRuntimeConfig()

onMounted(async () => {
        const code = route.query.code as string
        const redirectUrl = route.query.redirect_url as string
        const logout = route.query.logout as string
        // 获取remember参数，默认为false（会话存储）
        const remember = route.query.remember === 'true'

// 处理 logout 参数
        if (logout === 'true') {
                localStorage.removeItem('token')
                sessionStorage.removeItem('token')
                localStorage.removeItem('login_status')
                localStorage.removeItem('session_login_trigger')
                // 触发登出通知
                localStorage.setItem('logout_trigger', Date.now().toString())
                localStorage.removeItem('logout_trigger')
                window.location.href = '/'
                return
        }

        // 处理 back 参数，直接跳转到主页
        if (route.query.back === 'true') {
                window.location.href = '/'
                return
        }

        if (code && redirectUrl) {
                try {
                        const result = await authApi.getToken(code, remember)
                        console.log('获取token成功:', result.data.token)

                        // 严格的 token 存储检查
                        if (result && result.data.token) {
                                const token = result.data.token

                                // 登录时清除两个存储位置，确保只保留最新的 token
                                localStorage.removeItem('token')
                                sessionStorage.removeItem('token')

                                // 根据remember参数决定存储位置
                                if (remember) {
                                        localStorage.setItem('token', token)
                                } else {
                                        sessionStorage.setItem('token', token)
                                }

                                // 严格验证：确保 token 已正确存储
                                const storedToken = remember
                                        ? localStorage.getItem('token')
                                        : sessionStorage.getItem('token')

                                // 验证存储位置正确
                                const wrongStorageToken = remember
                                        ? sessionStorage.getItem('token')
                                        : localStorage.getItem('token')

                                // 三重检查：存储成功、token 匹配、存储位置正确
                                if (storedToken !== token) {
                                        console.error('Token 存储失败，阻止跳转')
                                        return
                                }
                                if (wrongStorageToken === token) {
                                        console.error('Token 存储位置错误，阻止跳转')
                                        return
                                }

                                // 同时记录 remember 值到 localStorage，方便后续判断从哪个存储读取 token
                                localStorage.setItem('remember', remember.toString())

                                // 触发 storage 事件通知其他标签页
                                // 使用 login_status 作为事件 key，因为 sessionStorage 变化不会触发其他标签页的 storage 事件
                                if (remember) {
                                        localStorage.setItem('login_status', Date.now().toString())
                                } else {
                                        // 对于 sessionStorage，需要通过一个共享的 key 来触发
                                        localStorage.setItem('session_login_trigger', Date.now().toString())
                                }

                                console.log('Token 存储验证通过，开始跳转')
                        } else {
                                console.error('获取 token 失败，阻止跳转')
                                return
                        }
                } catch (error) {
                        console.error('获取token失败:', error)
                        localStorage.removeItem('token')
                        sessionStorage.removeItem('token')
                        localStorage.removeItem('login_status')
                        localStorage.removeItem('session_login_trigger')
                        localStorage.removeItem('remember')
                        return
                }

                // 所有检查通过后再执行跳转
                window.location.href = decodeURIComponent(redirectUrl)
                return
        }

        const webBase = config.public.webBase;
        window.location.href = `${webBase}/login`
})
</script>

