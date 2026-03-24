<template>
        <div class="my-20"></div>
        <div class="mx-auto max-w-4xl w-auto px-4 md:px-8">

                <!-- 加载状态 -->
                <div v-if="loading" class="animate-pulse">
                        <div class="h-8 w-48 bg-gray-200 rounded mb-4"></div>
                        <div class="h-12 w-3/4 bg-gray-200 rounded mb-6"></div>
                        <div class="flex gap-4 mb-8">
                                <div class="h-4 w-24 bg-gray-200 rounded"></div>
                                <div class="h-4 w-32 bg-gray-200 rounded"></div>
                                <div class="h-4 w-20 bg-gray-200 rounded"></div>
                        </div>
                        <div class="space-y-3">
                                <div class="h-4 w-full bg-gray-200 rounded"></div>
                                <div class="h-4 w-5/6 bg-gray-200 rounded"></div>
                                <div class="h-4 w-4/5 bg-gray-200 rounded"></div>
                                <div class="h-4 w-full bg-gray-200 rounded"></div>
                                <div class="h-4 w-3/4 bg-gray-200 rounded"></div>
                        </div>
                </div>

                <!-- 错误状态 -->
                <div v-else-if="error" class="text-center py-20">
                        <div class="text-6xl mb-4">404</div>
                        <div class="text-xl text-gray-500 mb-6">{{ error }}</div>
                        <button
                            class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                            @click="goHome"
                        >
                                返回首页
                        </button>
                </div>

                <!-- 文章详情 -->
                <article v-else class="bg-white/80 backdrop-blur-sm rounded-xl p-6 md:p-10 shadow-sm">
                        <!-- 文章头部信息 -->
                        <header class="mb-8 pb-6 border-b border-outline-variant/15">
                                <!-- 分类和标签 -->
                                <div class="flex items-center gap-3 mb-4">
                                        <span v-if="article.categoryName"
                                              class="text-xs uppercase tracking-widest font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                                                {{ article.categoryName }}
                                        </span>
                                        <span v-if="article.isTop"
                                              class="text-xs uppercase tracking-widest font-bold text-red-500 bg-red-50 px-3 py-1 rounded-full">
                                                置顶
                                        </span>
                                </div>

                                <!-- 标题 -->
                                <h1 class="text-2xl md:text-4xl font-bold text-on-background mb-4 leading-tight">
                                        {{ article.title }}
                                </h1>

                                <!-- 作者和时间 -->
                                <div class="flex flex-wrap items-center gap-4 text-sm text-on-surface-variant">
                                        <div class="flex items-center gap-2">
                                                <!--                                                <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">-->
                                                <!--                                                        <span class="text-primary font-medium">{{ authorInitial }}</span>-->
                                                <!--                                                </div>-->
                                                <span>{{ article.authorNickname }}</span>
                                        </div>
                                        <span class="flex items-center gap-1">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                     viewBox="0 0 24 24">
                                                        <path
                                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"></path>
                                                </svg>
                                                {{ formatDate(article.createTime) }}
                                        </span>
                                        <span class="flex items-center gap-1">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                     viewBox="0 0 24 24">
                                                        <path
                                                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"></path>
                                                </svg>
                                                {{ article.commentCount }} 评论
                                        </span>
                                </div>

                                <!-- 标签 -->
                                <div v-if="article.tags" class="mt-4 flex flex-wrap gap-2">
                                        <span
                                            v-for="tag in articleTags"
                                            :key="tag"
                                            class="text-xs px-2 py-1 bg-surface-container-low text-on-surface-variant rounded"
                                        >
                                                {{ tag }}
                                        </span>
                                </div>
                        </header>

                        <!-- 封面图 -->
                        <div v-if="article.coverImage" class="mb-8 rounded-lg overflow-hidden">
                                <img
                                    :alt="article.title"
                                    :src="article.coverImage"
                                    class="w-full h-64 md:h-80 object-cover"
                                />
                        </div>

                        <!-- 文章内容 -->
                        <div class="prose-sm max-w-none dark:prose-invert
                        prose-h1:text-3xl prose-h1:mb-6 prose-h1:border-b prose-h1:pb-4 prose-h1:border-gray-200 dark:prose-h1:border-gray-700
                        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                        prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:my-4
                        prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-600
                        prose-blockquote:pl-4
                        prose-blockquote:italic
                        prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4
                        prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-4
                        prose-li:text-gray-700 dark:prose-li:text-gray-300
                        prose-li:my-1
                        break-words hyphenate
                        prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:underline hover:prose-a:text-blue-800 dark:hover:prose-a:text-blue-300
                        prose-img:rounded-md prose-img:shadow-lg prose-img:mx-auto prose-img:my-8
                        prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:text-gray-700 dark:prose-code:text-gray-300
                        prose-pre:rounded-md prose-pre:p-0 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:text-gray-700 dark:prose-pre:text-gray-300
                        prose-pre:overflow-x-auto prose-pre:whitespace-pre-wrap prose-pre:word-break-break-word
                        prose-table:rounded-md prose-table:shadow-sm prose-table:overflow-hidden
                        prose-table:border-collapse prose-table:w-full prose-table:my-6
                        prose-table:border prose-table:border-gray-200 dark:prose-table:border-gray-700
                        prose-th:p-3 prose-th:text-left prose-th:border-b prose-th:border-gray-200 dark:prose-th:border-gray-700
                        prose-th:bg-gray-900/5 dark:prose-th:bg-gray-800/30 prose-th:text-gray-700 dark:prose-th:text-gray-300
                        prose-td:p-3 prose-td:border-b prose-td:border-gray-200 dark:prose-td:border-gray-700
                        prose-td:bg-gray-50/60 dark:prose-td:bg-gray-800/20 prose-td:text-gray-700 dark:prose-td:text-gray-300
                        line-numbers">

                                <vue3-markdown-it :source="article.content"/>
                        </div>

                        <!-- 文章底部 -->
                        <footer class="mt-12 pt-6 border-t border-outline-variant/15">
                                <div class="flex items-center justify-between">
                                        <button
                                            class="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors"
                                            @click="goHome"
                                        >
                                                <svg class="w-5 h-5" fill="none" stroke="currentColor"
                                                     viewBox="0 0 24 24">
                                                        <path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke-linecap="round"
                                                              stroke-linejoin="round" stroke-width="2"></path>
                                                </svg>
                                                返回首页
                                        </button>
                                        <!--                                        <div class="flex gap-2">-->
                                        <!--                                                <button-->
                                        <!--                                                    :class="isLiked ? 'text-red-500' : 'text-on-surface-variant'"-->
                                        <!--                                                    class="p-2 rounded-lg hover:bg-surface-container-low transition-colors"-->
                                        <!--                                                    @click="handleLike"-->
                                        <!--                                                >-->
                                        <!--                                                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">-->
                                        <!--                                                                <path-->
                                        <!--                                                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>-->
                                        <!--                                                        </svg>-->
                                        <!--                                                </button>-->
                                        <!--                                        </div>-->
                                </div>
                        </footer>
                </article>

                <!-- 评论区占位 -->
                <div v-if="!loading && !error" class="mt-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
                        <article-comment-list :blog-id="article.id"/>
                </div>
        </div>
</template>

<script lang="ts" setup>
import {computed, onMounted, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {articleApi} from '~/api/article/articleApi.js';
// @ts-ignore
import Vue3MarkdownIt from 'vue3-markdown-it'

import 'highlight.js/styles/monokai.css';
// 标记为客户端渲染
definePageMeta({
        ssr: false
});

// 文章数据
const article = ref<any>(null);
const loading = ref(true);
const error = ref<string | null>(null);
// const isLiked = ref(false);

// 路由和路由跳转
const route = useRoute();
const router = useRouter();

// // 计算作者昵称首字母
// const authorInitial = computed(() => {
//         if (!article.value?.authorNickname) return '?';
//         return article.value.authorNickname.charAt(0).toUpperCase();
// });

// 解析标签
const articleTags = computed(() => {
        if (!article.value?.tags) return [];
        return article.value.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean);
});


// 格式化日期
const formatDate = (dateStr: string) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}年${month}月${day}日`;
};

// 获取文章详情
const fetchArticleDetail = async () => {
        loading.value = true;
        error.value = null;

        try {
                const id = Number(route.params.id);
                if (isNaN(id)) {
                        error.value = '无效的文章ID';
                        return;
                }

                const result = await articleApi.getPublicArticleDetail(id);

                if (result && result.success && result.data) {
                        article.value = result.data;
                } else {
                        error.value = result?.errorMsg || '文章不存在或已下架';
                }
        } catch (err: any) {
                console.error('获取文章详情失败:', err);
                error.value = err.message || '获取文章详情失败，请稍后重试';
        } finally {
                loading.value = false;
        }
};

// 返回首页
const goHome = () => {
        router.push('/');
};

// // 点赞
// const handleLike = () => {
//         isLiked.value = !isLiked.value;
//         message.success(isLiked.value ? '点赞成功' : '已取消点赞');
// };

// 组件挂载时获取文章详情
onMounted(() => {
        fetchArticleDetail();
});
</script>
