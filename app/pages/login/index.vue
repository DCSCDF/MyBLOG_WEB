<template>


        <a-card class="w-60 mx-auto">
                <p>Redirecting to login...</p>
        </a-card>


</template>


<script lang="ts" setup>
import {onMounted} from 'vue'
import {useRoute} from 'vue-router'
import {authApi} from '~/api/user/authApi'

const route = useRoute()

onMounted(async () => {
        const code = route.query.code as string
        const redirectUrl = route.query.redirect_url as string

        if (code && redirectUrl) {
                try {
                        const result = await authApi.getToken(code)
                        if (result && result.data) {
                                localStorage.setItem('token', result.data)
                        }
                } catch (error) {
                        console.error('获取token失败:', error)
                }

                // 存储token后再执行跳转
                window.location.href = decodeURIComponent(redirectUrl)
                return
        }

        window.location.href = `http://localhost:5173/login`
})
</script>

