<template>
        <footer class="mt-10">
                <a-divider/>
                <div class="pb-6 bg-white flex flex-col md:flex-row md:justify-between ">
                        <div class="flex flex-col md:mx-10">
                                <div class="my-auto mx-8">
                                        <h1 class="text-xl font-black mb-4">{{ siteName || 'MyBlog' }}</h1>
                                        <p class="text-gray-600">© 2026 All rights reserved.</p>
                                        <p v-if="recordNumber" class="text-gray-500 text-sm mt-2">{{ recordNumber }}</p>
                                </div>
                        </div>
                        <div class="my-4 md:my-0"></div>
                        <div class="flex flex-row md:mx-10">
                                <div class="my-auto flex gap-4 mx-8 md:mx-10">
                                </div>
                        </div>
                </div>
        </footer>
</template>

<script lang="ts" setup>
defineProps<{
        siteName?: string
        recordNumber?: string
}>()
</script>

<style scoped>

</style>