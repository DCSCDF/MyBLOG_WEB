<template>
        <div class="mb-6">
                <h1 class="font-semibold text-2xl mb-2 text-gray-800">我的博客</h1>
                <p class="text-md text-gray-600">
                        一个简单的博客网站，主要分享前端开发和生活日常等内容。项目开源地址：
                        <a
                            class="text-blue-400 break-all"
                            href="https://github.com/DCSCDF" target="_blank">https://github.com/DCSCDF</a>
                        。
                </p>
        </div>


        <div class="mb-6">
                <h2 class="mb-2 text-gray-700 text-lg font-semibold">全局搜索</h2>
                <a-input-search
                    v-model:value="searchValue"
                    class="max-w-lg"
                    placeholder="检索内容"
                    @search="handleSearch"
                />
                <p class="text-sm mt-2 text-gray-600">支持检索标题、简介、分类。</p>
        </div>


        <!--        <div class="mb-4">-->
        <!--                <h2 class="mb-2 text-gray-800 text-lg">分类</h2>-->
        <!--                <a-tag :bordered="false">Tag 1</a-tag>-->
        <!--                <a-tag :bordered="false">Tag 1</a-tag>-->
        <!--                <a-tag :bordered="false">Tag 1</a-tag>-->
        <!--                <a-tag :bordered="false">Tag 1</a-tag>-->
        <!--        </div>-->


        <!--        <div class="mb-6 w-full overflow-x-auto">-->
        <!--                <img-->
        <!--                    alt=""-->
        <!--                    class="w-full h-full object-cover rounded-lg pointer-events-none select-none"-->
        <!--                    draggable="false"-->
        <!--                    src="https://raw.githubusercontent.com/DCSCDF/DCSCDF/main/github-metrics.svg">-->
        <!--        </div>-->


        <!--        <div class="mb-6 relative">-->
        <!--                <img alt="" class="w-full rounded-lg" src="../../assets/images/github_bg.png">-->
        <!--                <div class="absolute top-4 left-4 right-4">-->
        <!--                        <h2 class="font-black text-white text-xl mb-2">GitHub</h2>-->
        <!--                        <p class="text-white/80 text-sm">Visit my GitHub profile</p>-->
        <!--                        <img alt="" src="https://raw.githubusercontent.com/DCSCDF/DCSCDF/main/github-metrics.svg">-->
        <!--                </div>-->

        <!--        </div>-->

</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {useArticleStore} from '~/stores/articleStore'; // Pinia store

// Pinia store
const articleStore = useArticleStore();

// 搜索关键词
const searchValue = ref('');

// 搜索处理
const handleSearch = () => {
        articleStore.search(searchValue.value);
};
</script>

<style scoped>

</style>