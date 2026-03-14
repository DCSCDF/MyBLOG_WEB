<template>


        <div class="flex justify-center pt-20 flex-col">

                <a-spin size="large"/>
                <p class="mx-auto mt-3 text-gray-600">Loading...</p>
        </div>


</template>


<script lang="ts" setup>
import {onMounted} from 'vue'
import {useRoute} from 'vue-router'
import {authApi} from '~/api/user/authApi'

const route = useRoute()

onMounted(async () => {
        const code = route.query.code as string
        const redirectUrl = route.query.redirect_url as string
        const logout = route.query.logout as string

        // 处理 logout 参数
        if (logout === 'true') {
                localStorage.removeItem('token')
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
                        const result = await authApi.getToken(code)
                        console.log('获取token成功:', result.data.token)
                        if (result && result.data.token) {
                                localStorage.setItem('token', result.data.token)
                        }
                } catch (error) {
                        console.error('获取token失败:', error)
                        localStorage.removeItem('token')
                }

                // 存储token后再执行跳转
                window.location.href = decodeURIComponent(redirectUrl)
                return
        }

        window.location.href = `http://localhost:5173/login`
})
</script>

