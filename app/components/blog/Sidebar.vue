<template>
        <!--        <div class="mb-6">-->
        <!--                <h1 class="font-semibold text-2xl mb-2 text-gray-800">我的博客</h1>-->
        <!--                <p class="text-md text-gray-600">-->
        <!--                        一个简单的博客网站，主要分享前端开发和生活日常等内容。项目开源地址：-->
        <!--                        <a-->
        <!--                            class="text-blue-400 break-all"-->
        <!--                            href="https://github.com/DCSCDF" target="_blank">https://github.com/DCSCDF</a>-->
        <!--                        。-->
        <!--                </p>-->
        <!--        </div>-->


        <!--        <div class="mb-6">-->
        <!--                <h2 class="mb-2 text-gray-700 text-lg font-semibold">全局搜索</h2>-->
        <!--                <a-input-search-->
        <!--                    v-model:value="searchValue"-->
        <!--                    class="max-w-lg"-->
        <!--                    placeholder="检索内容"-->
        <!--                    @search="handleSearch"-->
        <!--                />-->
        <!--                <p class="text-sm mt-2 text-gray-600">支持检索标题、简介、分类。</p>-->
        <!--        </div>-->


        <aside class="w-full lg:w-80 space-y-10 mt-10 lg:mt-0">
                <!-- Search Component -->
                <div class="space-y-4">
                        <!--                        <div class="relative">-->
                        <!--                                <input-->
                        <!--                                    v-model="searchValue"-->
                        <!--                                    class="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-outline-variant"-->
                        <!--                                    placeholder="分类、关键词、标签......" type="text"-->
                        <!--                                    @keyup.enter="handleSearch"/>-->
                        <!--                                <span-->
                        <!--                                    class="material-symbols-outlined absolute right-3 top-2.5 text-secondary/40 pointer-events-none"-->
                        <!--                                ><SearchOutlined/></span>-->
                        <!--                        </div>-->
                        <!--                        <label class="text-[0.7rem] uppercase tracking-[0.15em] font-bold text-secondary-dim px-1">-->
                        <!--                                搜索文章内容-->
                        <!--                        </label>-->
                        <div class="relative group">
                                                <span
                                                    class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors"
                                                    data-icon="search"><SearchOutlined/></span>
                                <input
                                    v-model="searchValue"
                                    class="w-full pl-11 pr-10 py-3 border border-outline-variant/15 rounded-md text-sm focus:ring-2 focus:ring-primary/10 focus:bg-white transition-all outline-none placeholder:text-outline"
                                    placeholder="分类、关键词、标签......"
                                    type="text" @keyup.enter="handleSearch"/>
                                <button
                                    v-if="searchValue"
                                    class="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant hover:text-primary transition-colors"
                                    type="button"
                                    @click="clearSearch"
                                >
                                        <CloseCircleFilled/>
                                </button>
                        </div>
                </div>
                <!-- About Section -->
                <div class="p-1">
                        <h3 class="text-[0.7rem] font-bold tracking-[0.15em] uppercase text-secondary/50 mb-4">
                                关于作者
                        </h3>
                        <div class="space-y-4">
                                <img
                                    class="w-16 h-16 rounded-lg object-cover bg-slate-100 transition-all duration-500"
                                    data-alt="Portrait of a male technical editorial curator"
                                    src="https://avatars.githubusercontent.com/u/75759503?v=4"/>

                                <p class="text-[13px] text-secondary leading-relaxed">
                                        从2021年开始接触前端开发，正在迭代自己的博客项目。从事过影视行业、建模CG渲染等，现在主要目标是全栈开发。
                                </p>
                                <div class="flex gap-4 pt-2">
                                        <QqOutlined/>
                                        <GithubOutlined/>
                                </div>
                        </div>
                </div>

                <category-list/>

        </aside>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {useArticleStore} from '~/stores/articleStore';
import CategoryList from "~/components/blog/sidebar/CategoryList.vue";
import {CloseCircleFilled} from '@ant-design/icons-vue';

// Pinia store
const articleStore = useArticleStore();

// 搜索关键词
const searchValue = ref('');

// 搜索处理
const handleSearch = () => {
        articleStore.search(searchValue.value);
};

// 清空搜索
const clearSearch = () => {
        searchValue.value = '';
        articleStore.search('');
};
</script>

<style scoped>

</style>